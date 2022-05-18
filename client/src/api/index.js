import axios from 'axios'

const BASE_URL = 'http://localhost:8080'

const API = axios.create({ baseURL: BASE_URL})

export const fetchJobs = () => API.get(`${BASE_URL}/jobs`)