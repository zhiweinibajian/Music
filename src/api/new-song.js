import axios from 'axios'
import {params} from "@/api/params";

export function getNewSong() {
  let data = Object.assign({}, params, {
    data: {
      "new_song": {"module": "QQMusic.MusichallServer", "method": "GetNewSong", "param": {"type": 0}}
    }
  })

  return axios.get('/api/newsong', {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
