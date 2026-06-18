export function buildUrl({ text, tags, fontSize, fontColor, type, filter, width, noCache } = {}) {
  let url = 'https://cataas.com/cat'

  if (tags && tags.length > 0) {
    url += '/' + tags.join(',')
  }

  if (text && text.trim()) {
    url += '/says/' + encodeURIComponent(text.trim())
  }

  const params = new URLSearchParams()
  if (fontSize && fontSize != 30) params.set('fontSize', fontSize)
  if (fontColor && fontColor !== '#ffffff') params.set('fontColor', fontColor.replace('#', ''))
  if (type) params.set('type', type)
  if (filter) params.set('filter', filter)
  if (width) params.set('width', width)
  if (noCache) params.set('_t', Date.now())

  const qs = params.toString()
  if (qs) url += '?' + qs

  return url
}

export async function downloadMeme(imageUrl) {
  if (!imageUrl) return
  try {
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = blobUrl
    a.download = 'cat-meme-' + Date.now() + '.jpg'
    a.click()
    URL.revokeObjectURL(blobUrl)
  } catch {
    window.open(imageUrl, '_blank')
  }
}

export function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
