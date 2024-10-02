import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

function AnimatedNumber({ value }: { value: number }) {
  let spring = useSpring(value, { stiffness: 100, damping: 20 });
  let display = useTransform(spring, (current) =>
    current.toFixed(1).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

export default AnimatedNumber;
