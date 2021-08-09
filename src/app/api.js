import axios from "axios";

/**
 * The instance of our API
 * @type {AxiosInstance}
 */
export const Api = axios.create({
    baseURL:"http://api.exchangeratesapi.io/v1",
})

/**
 * The API key in the format ?access_key=ACCESS KEY
 * @type {string}
 */
export const ApiKey = "?access_key=" + "5538440033d25192c1a8e969b73c1187";

