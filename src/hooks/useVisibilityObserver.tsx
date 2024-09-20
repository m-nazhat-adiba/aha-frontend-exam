import React, { useEffect } from "react";

interface ObserverProps {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  reference: React.MutableRefObject<HTMLElement | null>;
}

const useVisibilityObserver = ({ setter, reference }: ObserverProps) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setter(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    if (reference.current) {
      observer.observe(reference.current);
    }

    return () => {
      if (reference.current) {
        observer.unobserve(reference.current);
      }
    };
  }, []);
};

export default useVisibilityObserver;
