/* Wrapper for async to handle errors  by always resolving promise */
export const handle = (promise) => {
  return promise
      .then(data => ([data, undefined]))
      .catch(error => Promise.resolve([undefined, error]));
}

/*
Because of the big complications in extending Error in Javascript we fake the process
and can use these custom error hacks instead...
 */
export function throwApiError(msg: string) {
  throw {
    name: "ApiError",
    message: msg
  };
}
