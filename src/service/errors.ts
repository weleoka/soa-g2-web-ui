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
