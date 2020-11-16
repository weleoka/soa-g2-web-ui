// This way of loading axios does not either seem to work.


import { AxiosInstance } from 'axios'
import axios from 'axios';

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


/*
const myAxios = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 3000,
  headers: { "X-Custom-Header": "foobar" }
});
*/

