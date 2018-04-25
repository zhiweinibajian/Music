import axios from 'axios'
import {params} from "@/api/params"

export function getSinger() {
  let data = Object.assign({}, params, {
    channel: 'singer',
    key: 'all_all_all',
    page: 'list',
    pagenum: 1,
    pagesize: 100,
  })

  return axios.get('/api/singer', {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

export function getSingerDetail(mid) {
  let data = Object.assign({}, params, {
    begin: 0,
    num: 30,
    order: 'listen',
    singermid: mid,
    songstatus: 1,
  })

  return axios.get('/api/singerdetail', {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
