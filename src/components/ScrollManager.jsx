import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import usePage from "../context/pageContext";

// How long to keep a section in place while a newly opened page loads its content.
const SETTLE_TIME_MS = 3000;

// Scrolls on every navigation: to the section in the URL (like /#contact), or else
// to the top of the page. Going back or forward keeps the browser's own position.
const ScrollManager = () => {
  const { key, pathname, hash } = useLocation();
  const navigationType = useNavigationType();
  const { lenis } = usePage();
  const previousPathname = useRef(null);

  useEffect(() => {
    if (!lenis) return;

    const isSamePage = previousPathname.current === pathname;
    previousPathname.current = pathname;

    const section = hash && document.getElementById(hash.slice(1));
    if (navigationType === "POP" && !section) return;

    if (!section) {
      lenis.scrollTo(0, { immediate: !isSamePage, force: true });
      return;
    }

    const scrollToSection = (immediate) => {
      lenis.resize();
      lenis.scrollTo(section, {
        immediate,
        force: true,
        // Keeps the section's top edge clear of the fixed navbar.
        offset: -(document.querySelector("[data-navbar]")?.offsetHeight ?? 0),
      });
    };

    scrollToSection(!isSamePage);
    if (isSamePage) return;

    // Content above the section can load after this (Selected Works comes from
    // Sanity), pushing it down the page. Follow it until the visitor takes over.
    const observer = new ResizeObserver(() => scrollToSection(true));
    const stop = () => {
      observer.disconnect();
      clearTimeout(timer);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
    const timer = setTimeout(stop, SETTLE_TIME_MS);

    observer.observe(document.body);
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);

    return stop;
  }, [key, pathname, hash, navigationType, lenis]);

  return null;
};

export default ScrollManager;
