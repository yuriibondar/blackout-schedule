import { useEffect, useRef } from "react";

const useOutsideClick = (callback) => {
  const ref = useRef();

  const handler = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [ref]);

  return ref;
};

export default useOutsideClick;
