import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useLayoutEffect,
  useRef,
} from "react";
import Lenis from "lenis";

const PageContext = createContext({
  lenis: null,
});

export const PageProvider = ({ children }) => {
  const [lenis, setLenis] = useState();

  const reqIdRef = useRef();

  // Detect if device is low-end - optimized with caching
  const isLowEndDevice = useMemo(() => {
    if (typeof window === "undefined") return false;

    // Cache the result to avoid repeated checks
    const cached = sessionStorage.getItem("isLowEndDevice");
    if (cached !== null) return cached === "true";

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Simple hardware detection
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    const isSlowConnection =
      connection &&
      (connection.effectiveType === "slow-2g" ||
        connection.effectiveType === "2g" ||
        connection.saveData);

    // Check device memory (Chrome only)
    const isLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;

    const result = prefersReducedMotion || isSlowConnection || isLowMemory;
    sessionStorage.setItem("isLowEndDevice", result.toString());
    return result;
  }, []);

  // Optimized Lenis configuration based on device
  const lenisConfig = useMemo(
    () => ({
      duration: isLowEndDevice ? 0.8 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: !isLowEndDevice,
      smoothTouch: false,
      touchMultiplier: 2,
      wheelMultiplier: isLowEndDevice ? 0.8 : 1,
      normalizeWheel: true,
      lerp: isLowEndDevice ? 0.15 : 0.1,
    }),
    [isLowEndDevice]
  );

  useLayoutEffect(() => {
    const lenis = new Lenis(lenisConfig);
    setLenis(lenis);

    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, [lenisConfig]);

  useEffect(() => {
    const animate = (time) => {
      lenis?.raf(time);
      reqIdRef.current = requestAnimationFrame(animate);
    };

    reqIdRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(reqIdRef.current);
  }, [lenis]);

  const memoedValue = useMemo(
    () => ({
      lenis,
    }),
    [lenis]
  );

  return (
    <PageContext.Provider value={memoedValue}>{children}</PageContext.Provider>
  );
};

export default function usePage() {
  return useContext(PageContext);
}
