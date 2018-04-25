import axios from 'axios'
import {params} from "@/api/params";

export function getRank() {
  let data = Object.assign({}, params, {
    data: {
      "toplist": {"module": "music.web_toplist_svr", "method": "get_toplist_index", "param": {}}
    }
  })

  return axios.get('/api/rank', {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

export function getRankDetail(date, id) {
  let data = Object.assign({}, params, {
    date: date,
    page: 'detail',
    song_begin: 0,
    song_num: 30,
    topid: id,
    tpl: 3,
    type: 'top',
  })

  return axios.get('/api/rankdetail', {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
