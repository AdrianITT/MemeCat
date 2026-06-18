export default function Hero({ text, onTextChange, onGenerate, onNewCat, onSurprise, disabled }) {
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      onGenerate()
    }
  }

  return (
    <section className="hero">
      <div className="container">
        <div className="input-row">
          <input
            type="text"
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu texto aquí..."
            autoFocus
          />
        </div>
        <div className="btn-row">
          <button className="btn btn-primary" onClick={onGenerate} disabled={disabled}>
            ✨ Generar Meme
          </button>
          <button className="btn btn-secondary" onClick={onNewCat} disabled={disabled}>
            🎲 Nuevo Gato
          </button>
          <button className="btn btn-orange" onClick={onSurprise} disabled={disabled}>
            🎲 ¡Sorpréndeme!
          </button>
        </div>
      </div>
    </section>
  )
}
