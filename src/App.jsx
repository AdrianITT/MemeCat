import { useState, useCallback, useRef } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import OptionsPanel from './components/OptionsPanel'
import MemeDisplay from './components/MemeDisplay'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import { buildUrl, downloadMeme, randomFrom } from './utils'
import { SURPRISE_PHRASES, SURPRISE_COLORS, TAGS } from './constants'

const MAX_GALLERY = 6

export default function App() {
  const [text, setText] = useState('Hello, Internet')
  const [fontSize, setFontSize] = useState(30)
  const [fontColor, setFontColor] = useState('#ffffff')
  const [type, setType] = useState('')
  const [filter, setFilter] = useState('')
  const [width, setWidth] = useState('')
  const [selectedTags, setSelectedTags] = useState(['cute'])
  const [gallery, setGallery] = useState([])
  const [imageUrl, setImageUrl] = useState('')
  const [copiedFeedback, setCopiedFeedback] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const generatedUrlRef = useRef('')

  function addToGallery(url) {
    if (!url) return
    setGallery((prev) => {
      if (prev[0] === url) return prev
      const next = [url, ...prev]
      return next.slice(0, MAX_GALLERY)
    })
  }

  function generateMeme(opts = {}) {
    const options = {
      text: opts.text ?? text,
      tags: opts.tags ?? selectedTags,
      fontSize: opts.fontSize ?? fontSize,
      fontColor: opts.fontColor ?? fontColor,
      type: opts.type ?? type,
      filter: opts.filter ?? filter,
      width: opts.width ?? width,
    }

    setIsGenerating(true)
    const url = buildUrl({ ...options, noCache: opts.noCache })
    generatedUrlRef.current = url
    setImageUrl(url)
    addToGallery(url)

    const img = new Image()
    img.onload = () => setIsGenerating(false)
    img.onerror = () => setIsGenerating(false)
    img.src = url
  }

  const handleGenerate = useCallback(() => {
    generateMeme()
  }, [text, fontSize, fontColor, type, filter, width, selectedTags])

  const handleNewCat = useCallback(() => {
    generateMeme({ noCache: true })
  }, [text, fontSize, fontColor, type, filter, width, selectedTags])

  const handleSurprise = useCallback(() => {
    const randTag = randomFrom(TAGS)
    const randFilter = randomFrom(['', 'blur', 'mono', 'negate'])
    const randColor = randomFrom(SURPRISE_COLORS)
    const randFontSize = Math.floor(Math.random() * 41) + 20
    const randText = randomFrom(SURPRISE_PHRASES)

    setText(randText)
    setSelectedTags([randTag])
    setFilter(randFilter)
    setFontColor(randColor)
    setFontSize(randFontSize)
    setType('')

    generateMeme({
      text: randText,
      tags: [randTag],
      filter: randFilter,
      fontColor: randColor,
      fontSize: randFontSize,
      type: '',
    })
  }, [])

  function handleGalleryReload(url) {
    generatedUrlRef.current = url
    setImageUrl(url)
  }

  function handleClearGallery() {
    setGallery([])
  }

  function handleTagToggle(tag) {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) return prev.filter((t) => t !== tag)
      if (prev.length >= 2) return [prev[1], tag]
      return [...prev, tag]
    })
  }

  async function handleCopyUrl() {
    if (!imageUrl) return
    try {
      await navigator.clipboard.writeText(imageUrl)
    } catch {
      // fallback
    }
    setCopiedFeedback(true)
    setTimeout(() => setCopiedFeedback(false), 2000)
  }

  async function handleDownload() {
    await downloadMeme(imageUrl)
  }

  return (
    <>
      <Header />
      <Hero
        text={text}
        onTextChange={setText}
        onGenerate={handleGenerate}
        onNewCat={handleNewCat}
        onSurprise={handleSurprise}
        disabled={isGenerating}
      />
      <main className="container main-content">
        <OptionsPanel
          fontSize={fontSize}
          fontColor={fontColor}
          type={type}
          filter={filter}
          width={width}
          selectedTags={selectedTags}
          onFontSizeChange={setFontSize}
          onFontColorChange={setFontColor}
          onTypeChange={setType}
          onFilterChange={setFilter}
          onWidthChange={setWidth}
          onTagToggle={handleTagToggle}
        />
        <section>
          <MemeDisplay imageUrl={imageUrl} />
          <div className="image-actions">
            <button className="btn btn-small btn-outline" onClick={handleCopyUrl}>
              📋 Copiar URL
            </button>
            <button className="btn btn-small btn-secondary" onClick={handleDownload}>
              ⬇️ Descargar
            </button>
            {copiedFeedback && <span className="feedback-copied">✓ ¡Copiado!</span>}
          </div>
          <div className="url-display">
            <code>{imageUrl || '—'}</code>
          </div>
        </section>
      </main>
      <Gallery
        items={gallery}
        onReload={handleGalleryReload}
        onClear={handleClearGallery}
      />
      <Footer />
    </>
  )
}
