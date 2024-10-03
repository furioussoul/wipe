let DEBUG_LOGS: boolean = false;

export const setDebugLogs = (value: boolean) => {
  DEBUG_LOGS = value;
};

export const debugLog = (...args: any) => {
  if (DEBUG_LOGS) {
    console.log(...args);
  }
};
export const debugWarn = (...args: any) => {
  if (DEBUG_LOGS) {
    console.warn(...args);
  }
};

export const debugInfo = (...args: any) => {
  if (DEBUG_LOGS) {
    console.info(...args);
  }
};

export const debugError = (...args: any) => {
  if (DEBUG_LOGS) {
    console.error(...args);
  }
};
