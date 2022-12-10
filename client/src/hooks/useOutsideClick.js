import { useEffect, useRef } from "react";

const useOutsideClick = (callback) => {
  const ref = useRef();
  console.log("init useOutsideClick");

  const handler = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handler);
    console.log("addEventListener");

    return () => {
      document.removeEventListener("click", handler);
      console.log("removeEventListener");
    };
  }, [ref]);

  return ref;
};

export default useOutsideClick;
