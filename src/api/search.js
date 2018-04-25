import axios from 'axios'
import {params} from "@/api/params";

export function getSearchResult(text) {
  let data = {
    aggr: 0,
    catZhida: 1,
    flag: 1,
    format: 'json',
    g_tk: 5381,
    ie: 'utf - 8',
    inCharset: 'utf - 8',
    n: 20,
    needNewCode: 1,
    notice: 0,
    outCharset: 'utf - 8',
    p: 1,
    perpage: 20,
    platform: 'h5',
    remoteplace: 'txt.mqq.all',
    sem: 1,
    t: 0,
    uin: 0,
    w: text,
    zhidaqu: 1,
  }

  return axios.get('/api/search', {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

export function getHotKey() {
  let data = params
  return axios.get('/api/hotkey', {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
