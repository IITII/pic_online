import persistent from 'src/utils/persistent'

export default function () {
  return {
    title: persistent.commonGet('title', sessionStorage) || 'Pic Online',
    api_base_url: persistent.commonGet('api_base_url') || process.env.AXIOS_BASE_URL || 'http://localhost:3000/',
    description: persistent.commonGet('description', sessionStorage) || 'Github@IITII',
    background: persistent.commonGet('background', sessionStorage) || '/images/1.webp',
  }
}
