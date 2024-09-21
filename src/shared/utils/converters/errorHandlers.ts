export const isNetworkError = (error: any) => {
  return error?.code && error?.code === "ERR_NETWORK";
};
