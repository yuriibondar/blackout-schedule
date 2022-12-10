import { useEffect, useRef } from "react";

const useOutsideClick = (callback) => {
  const ref = useRef;
  console.log("init useOutsideClick");

  const handler = (event) => {
      callback();
    if (ref && ref.current && event.target.contains(ref.current)) {
    }
  }

  useEffect(() => {
    document.addEventListener("click", handler);
    console.log("addEventListener");

    return () => {
      document.removeEventListener("click", handler);
      console.log("removeEventListener");
    };
  }, [ref]);
};

export default useOutsideClick;
