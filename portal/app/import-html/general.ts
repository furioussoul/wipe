import { STYLES_KEY } from "../constants/STRINGS.ts";

/**
 * Returns a boolean indicating whether the current environment is development
 * @returns {boolean} A boolean indicating whether the current environment is development
 */
export const isDevelopment = () => import.meta.env.DEV;

export const getSplitClasses = (classesString: string) => {
  const splitClasses: string[] = classesString.replace(STYLES_KEY, "").split(",");
  return { baseClasses: splitClasses[0], classes: splitClasses[1] };
};
