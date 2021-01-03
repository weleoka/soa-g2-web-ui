/*
EA & SOA Group 2 HT2020

Because of the big complications in extending Error in Javascript we fake the process
and can use custom named error hack by including name attribute in returned object.
 */

/* Wrapper for async to handle errors  by always resolving promise */
import { AxiosResponse } from "axios";

export const handle = promise => {
  return promise
    .then(data => [data, undefined])
    .catch(error => Promise.resolve([undefined, error]));
};

/*
USed for bubbling errors of the nature where there has been API call but the
response is unexpected.
 */
export function throwApiResponseError(
  apiRes: AxiosResponse,
  customText?: string
) {
  throw {
    name: "ApiResponseError",
    status: apiRes.status,
    statusText: apiRes.statusText,
    customText: customText
  };
}

/* A more general error from API calls which may occur during request stages */
export function throwApiError(customText?: string) {
  throw {
    name: "ApiResponseError",
    customText: customText
  };
}
