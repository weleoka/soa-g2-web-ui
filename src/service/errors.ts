/*
EA & SOA Group 2 HT2020

Because of the big complications in extending Error in Javascript we fake the process
and can use custom named error hack by including name attribute in returned object.
 */

/* Wrapper for async to handle errors  by always resolving promise */

export const handle = promise => {
  return promise
    .then(data => [data, undefined])
    .catch(error => Promise.resolve([undefined, error]));
};

export class ApiResponseError extends Error {
  status: string;
  statusText: string;

  constructor(apiRes, message) {
    super(message);
    this.name = "ApiResponseError";
    this.status = apiRes.status;
    this.statusText = apiRes.statusText;
    this.message = message;
  }

  toJSON() {
    return {
      error: {
        name: this.name,
        message: this.message,
        stacktrace: this.stack
      }
    };
  }
}

/* A more general error from API calls which may occur during request stages */
export class ApiError extends Error {
  constructor(message) {
    super(message);
    this.name = "ApiError";
    this.message = message;
  }

  toJSON() {
    return {
      error: {
        name: this.name,
        message: this.message,
        stacktrace: this.stack
      }
    };
  }
}

export class AxiosError extends Error {
  constructor(message) {
    super(message);
    this.name = "AxiosError";
    this.message = message;
  }

  toJSON() {
    return {
      error: {
        name: this.name,
        message: this.message,
        stacktrace: this.stack
      }
    };
  }
}

export class MappingError extends Error {
  constructor(message) {
    super(message);
    this.name = "MappingError";
    this.message = message;
  }
}
/*
USed for bubbling errors of the nature where there has been API call but the
response is unexpected.
 */
/*
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

/!* A more general error from API calls which may occur during request stages *!/
export function ApiError(customText?: string) {
  throw {
    name: "ApiResponseError",
    customText: customText
  };
}
*/
