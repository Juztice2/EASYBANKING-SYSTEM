import { useEffect, useRef, useState } from "react";

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const directions = {
    up: "translate-y-10",
    down: "-translate-y-10",
    left: "translate-x-10",
    right: "-translate-x-10",
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`
        transition-all
        duration-700
        ease-out
        ${
          visible
            ? "opacity-100 translate-x-0 translate-y-0"
            : `opacity-0 ${directions[direction]}`
        }
      `}
    >
      {children}
    </div>
  );
}