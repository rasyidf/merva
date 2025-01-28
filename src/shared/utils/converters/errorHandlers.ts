export const isNetworkError = (error: any) => {
  return error?.code && error?.code === "ERR_NETWORK";
};

export const isTimeoutError = (error: any) => {
  return error?.code && error?.code === "ERR_NETWORK_TIMEOUT";
};