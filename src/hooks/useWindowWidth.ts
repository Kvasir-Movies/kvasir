import { useEffect, useState } from "react";

function getWidth() {
  return window.innerWidth;
}

export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(getWidth());

  function handleResize() {
    setWindowWidth(getWidth());
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
}
