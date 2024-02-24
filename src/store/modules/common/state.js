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
        let {protocol, host} = win
        let local = new URL('http://localhost:3000/')
        local.protocol = protocol
        local.host = host
        return local.origin
      }
    })(),
    description: persistent.commonGet('description') || 'Github@IITII',
    background: persistent.commonGet('background') || './images/1.webp',
    tool_group_force_right: persistent.commonGet('tool_group_force_right') === 'true',
    image_shortcut: persistent.commonGet('image_shortcut') !== 'false',
    reload_timeout: parseInt(persistent.commonGet('reload_timeout')) || 300,
    delete_confirm: persistent.commonGet('delete_confirm') !== 'false',
  }
}
