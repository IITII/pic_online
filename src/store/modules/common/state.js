import persistent from 'src/utils/persistent'

export default function () {
  return {
    title: persistent.commonGet('title') || 'Pic Online',
    api_base_url: (() => {
      let base = persistent.commonGet('api_base_url') || process.env.AXIOS_BASE_URL
      let win = new URL(window.location.href)
      if (base) {
        return base
      } else {
        let local = new URL('http://localhost:3000/')
        if (win.hostname.includes("github")) {
          console.log(`window.location.href contains github, using https`)
          local.protocol = 'https:'
        } else {
          console.log(`set default api to window.location.origin`)
          local.hostname = win.hostname
        }
        return local.origin
      }
    })(),
    description: persistent.commonGet('description') || 'Github@IITII',
    background: persistent.commonGet('background') || '/images/1.webp',
    tool_group_force_right: persistent.commonGet('tool_group_force_right') === 'true',
  }
}
