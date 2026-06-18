import { TAGS, IMAGE_TYPES, FILTERS } from '../constants'

export default function OptionsPanel({
  fontSize, fontColor, type, filter, width, selectedTags,
  onFontSizeChange, onFontColorChange, onTypeChange, onFilterChange, onWidthChange,
  onTagToggle,
}) {
  return (
    <aside className="panel" id="optionsPanel">
      <h3>🎨 Personalizar</h3>

      <div className="panel-group">
        <label htmlFor="fontSize">Tamaño de fuente</label>
        <div className="range-row">
          <input
            type="range" id="fontSize" min="10" max="80" value={fontSize}
            onChange={(e) => onFontSizeChange(Number(e.target.value))}
          />
          <span className="range-value">{fontSize}</span>
        </div>
      </div>

      <div className="panel-group">
        <label htmlFor="fontColor">Color del texto</label>
        <input
          type="color" id="fontColor" value={fontColor}
          onChange={(e) => onFontColorChange(e.target.value)}
        />
      </div>

      <div className="panel-group">
        <label htmlFor="imageType">Tipo de imagen</label>
        <select id="imageType" value={type} onChange={(e) => onTypeChange(e.target.value)}>
          {IMAGE_TYPES.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="panel-group">
        <label htmlFor="imageFilter">Filtro</label>
        <select id="imageFilter" value={filter} onChange={(e) => onFilterChange(e.target.value)}>
          {FILTERS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="panel-group">
        <label htmlFor="imageWidth">Ancho (px)</label>
        <input
          type="number" id="imageWidth" placeholder="auto" min="0" value={width}
          onChange={(e) => onWidthChange(e.target.value)}
        />
      </div>

      <div className="panel-group">
        <label>Tags (máx. 2)</label>
        <div className="tags-grid">
          {TAGS.map((tag) => (
            <button
              key={tag}
              className={`tag-chip${selectedTags.includes(tag) ? ' active' : ''}`}
              onClick={() => onTagToggle(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
