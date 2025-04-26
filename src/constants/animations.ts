export const containerVariants = {
  hidden: {
    opacity: 0.9,
    x: "-100%",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0.9,
    x: "-100%",
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      when: "afterChildren",
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

export const itemVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.1,
    },
  },
};

export const headingAnimation = {
  hidden: { y: 100 },
  show: {
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 2,
    },
  },
};

export const headingAnimationsProp = {
  variants: headingAnimation,
  initial: "hidden",
  whileInView: "show",
  viewport: {
    once: true,
  },
};
