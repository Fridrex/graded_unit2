/**
 * @file utils.js
 * @description Utility constants for managing page transition animations with motion/react.
 * These constants are used across various components to ensure consistent animation behavior.
 */

/**
 * @constant pageVariants
 * @description Defines the animation variants (initial, in, out states) for page transitions.
 * - `initial`: The state of the component before it enters or after it exits (opacity 0).
 * - `in`: The state of the component when it is visible (opacity 1).
 * - `out`: The state of the component as it is exiting (opacity 0).
 * @type {object}
 */
export const pageVariants = {
  initial: {
    opacity: 0, // Start with opacity 0 (invisible)
  },
  in: {
    opacity: 1, // Animate to opacity 1 (fully visible)
  },
  out: {
    opacity: 0, // Animate to opacity 0 (invisible) when exiting
  },
};

/**
 * @constant pageTransition
 * @description Defines the transition properties for page animations.
 * - `type`: 'tween' provides a smooth animation between states.
 * - `ease`: 'easeInOut' function for the timing of the animation, making it start and end smoothly.
 * - `duration`: The length of the animation in seconds.
 * @type {object}
 */
export const pageTransition = {
  type: 'tween', // Type of animation (smooth transition)
  ease: 'easeInOut', // Easing function for the animation
  duration: 0.6, // Duration of the transition in seconds
};
