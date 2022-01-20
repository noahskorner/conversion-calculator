import { UNIT_TYPE } from "./conversions";

const getKeyFromValue = (value: string) => {
  return Object.entries(UNIT_TYPE).find(([key, val]) => val === value)?.[0];
};

export { getKeyFromValue };
