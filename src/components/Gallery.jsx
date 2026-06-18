export default function Gallery({ items, onReload, onClear }) {
  return (
    <section className="container gallery-section">
      <div className="gallery-header">
        <h3>🖼️ Memes recientes</h3>
        <button className="btn btn-small btn-outline" onClick={onClear}>
          🗑️ Limpiar
        </button>
      </div>
      <div className="gallery-grid" id="galleryGrid">
        {items.length === 0 ? (
          <div className="gallery-empty">Aún no hay memes generados.</div>
        ) : (
          items.map((url, i) => (
            <div className="gallery-item" key={url + i}>
              <img src={url} alt="Meme thumbnail" loading="lazy" />
              <div className="overlay">
                <button className="btn btn-small btn-primary" onClick={() => onReload(url)}>
                  🔄 Recargar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
