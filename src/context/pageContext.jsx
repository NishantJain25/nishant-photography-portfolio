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
import debounce from "../util/debounce";

const PageContext = createContext({
  lenis: null,
});

export const PageProvider = ({ children }) => {
  const [lenis, setLenis] = useState();
  
  const reqIdRef = useRef();
  
  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 5,
    });

    setLenis(lenis);


    let lastHeight = 0
    let hideNav = false
 
    lenis.on('scroll', ({scroll}) => {
        debounce(() => (lastHeight = scroll))();
        
        if(lastHeight < scroll && scroll > 160 && !hideNav && document.querySelector(".nav:hover") == null){
            document.body.classList.add('hide-header')
            hideNav = true
        }

        if(lastHeight >= scroll && scroll > 160 && hideNav){
            document.body.classList.remove('hide-header')
            hideNav = false
        }
    })

    return () => {
      lenis.destroy();
      setLenis(null);
      
    };
  }, []);

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
  )
};


export default function usePage() {
    return useContext(PageContext)
}