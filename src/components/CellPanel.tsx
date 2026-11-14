import { ARROWS, SNAKES, cellById, chakraOf } from '../data/board'
import type { VoiceLine } from '../data/voices'

type Props = {
  cellId: number | null
  voices: VoiceLine[]
  question: string
}

export function CellPanel({ cellId, voices, question }: Props) {
  if (!cellId) {
    return (
      <aside className="panel">
        <h2 className="panel-title">Клетка</h2>
        <p className="panel-muted">Выбери клетку на доске или сделай ход — здесь откроется смысл.</p>
      </aside>
    )
  }

  const cell = cellById(cellId)
  const chakra = chakraOf(cellId)
  const arrow = ARROWS[cellId]
  const snake = SNAKES[cellId]

  return (
    <aside className="panel">
      <div className="panel-kicker" style={{ color: chakra.color }}>
        {chakra.name} · ряд {chakra.row}
      </div>
      <h2 className="panel-title">
        <span className="panel-id">{cell.id}</span> {cell.name}
      </h2>
      <p className="panel-chakra-focus">{chakra.focus}</p>
      <p className="panel-meaning">{cell.meaning}</p>
      <p className="panel-reflect">
        <strong>Спроси себя.</strong> {cell.reflect}
      </p>
      {arrow ? (
        <p className="panel-link panel-link--up">Стрела → {arrow} ({cellById(arrow).name})</p>
      ) : null}
      {snake ? (
        <p className="panel-link panel-link--down">Змея → {snake} ({cellById(snake).name})</p>
      ) : null}
      {question ? (
        <p className="panel-q">
          Твой вопрос: <em>{question}</em>
        </p>
      ) : null}
      {voices.length > 0 ? (
        <div className="voices">
          {voices.map((v, i) => (
            <p key={`${v.role}-${i}`} className={`voice voice--${v.role}`}>
              {v.text}
            </p>
          ))}
        </div>
      ) : null}
    </aside>
  )
}
