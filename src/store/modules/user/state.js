import persistent from 'src/utils/persistent'

export default function () {
  return {
    // persistent
    // 从 sessionStorage 里面读取部分信息，并进行预处理
    user_type: persistent.userGet('user_type', sessionStorage) || 'user',
    // 从 localStorage 里面读取部分信息，并进行预处理
    name: persistent.userGet('name') || '',
    language: persistent.userGet('language') || 'zh-hans',
    token: persistent.userGet('token') || '',
  }
}
