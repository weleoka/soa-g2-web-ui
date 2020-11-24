import axios from 'axios';
/*
export default {
  myAxios: (a: AxiosInstance) => {
    return axios.create({
      baseURL: `http://api.pearson.com/v2/dictionaries`,
      withCredentials: false,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}
*/

const instance = axios.create({
  //baseURL: `http://localhost:8080/api/`,
  baseURL: process.env.VUE_APP_MIDDLEWARE_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

// Add a request interceptor.
// Read at https://auralinna.blog/post/2019/global-http-request-and-response-handling-with-the-axios-interceptor/
instance.interceptors.request.use(
    function(config) {
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    },
);

export default instance;



/*
const myAxios = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 3000,
  headers: { "X-Custom-Header": "foobar" }
});
*/

