import axios from 'axios'
import {params} from "@/api/params";

export function getSongUrl(mid) {
  let data = Object.assign({}, params, {
    cid: '205361747',
    filename: `C400${mid}.m4a`,
    guid: '3016883910',
    songmid: mid,
    uin: 0,
  })

  return axios.get('/api/songurl', {
    params: data
  }).then(res => {
    if (res.data.code === 0) {
      let data = res.data.data.items[0]
      let url = `http://dl.stream.qqmusic.qq.com/${data.filename}?vkey=${data.vkey}&guid=3016883910&uin=0&fromtag=66`
      return Promise.resolve(url)
    }
  })
}
