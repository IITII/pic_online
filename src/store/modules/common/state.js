import persistent from 'src/utils/persistent'

export default function () {
  return {
    title: persistent.commonGet('title', sessionStorage) || 'Pic Online',
    description: persistent.commonGet('description', sessionStorage) || 'Github@IITII',
    background: persistent.commonGet('background', sessionStorage) || '/images/1.webp',
  }
}
