/**
 * @fileoverview Custom hook that observes the visibility of an HTML element using the IntersectionObserver API.
 * This hook monitors when an element enters or leaves the viewport and updates the state accordingly.
 *
 * @param setter - A state setter function to update visibility state based on whether the element is in the viewport.
 * @param reference - A reference to the HTML element to be observed.
 *
 * @example
 * const [isVisible, setIsVisible] = useState(false);
 * const ref = useRef(null);
 *
 * useVisibilityObserver({
 *   setter: setIsVisible,
 *   reference: ref,
 * });
 *
 * <div ref={ref}>Observed content</div>
 */

import React, { useEffect } from 'react';

interface ObserverProps {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  reference: React.MutableRefObject<HTMLElement | null>;
}

export const useVisibilityObserver = ({ setter, reference }: ObserverProps) => {
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
