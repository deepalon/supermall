import axios from 'axios'

export function request(config) {
  const instance  = new axios.create({
    baseURL: 'http://106.54.54.237:8000/api/v1',
    timeout: 2000
  })

  instance.interceptors.request.use(config => {
    // console.log(config);
    return config
  }, error => {
    console.log(error);
  })

  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, err => {
    // console.log(err);
  })

  return instance(config)
}


