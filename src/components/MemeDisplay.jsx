import { useState, useEffect } from 'react'

export default function MemeDisplay({ imageUrl, imgRef }) {
  const [status, setStatus] = useState('empty')

  useEffect(() => {
    if (imageUrl) {
      setStatus('loading')
    } else {
      setStatus('empty')
    }
  }, [imageUrl])

  function handleImageLoad() {
    setStatus('loaded')
  }

  function handleImageError() {
    setStatus('error')
  }

  return (
    <div className="display-area" id="displayArea">
      {status === 'empty' && (
        <div className="placeholder">
          <span className="cat-art">🐱</span>
          <p>Tu meme aparecerá aquí</p>
        </div>
      )}

      {status === 'loading' && <div className="spinner" />}

      {status === 'error' && (
        <div className="error-state">
          <span className="emoji-big">😴</span>
          <p>¡El gato se fue a dormir! Intenta de nuevo.</p>
        </div>
      )}

      {imageUrl && (
        <img
          ref={imgRef}
          src={imageUrl}
          alt="Cat meme"
          crossOrigin="anonymous"
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ display: status === 'loaded' ? 'block' : 'none' }}
        />
      )}
    </div>
  )
}
