import { useMemo } from "react";
import { getChaiDataProviders } from "@chaibuilder/runtime";

export const useAllDataProviders = () => {
  return useMemo(() => getChaiDataProviders(), []);
};
