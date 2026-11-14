import {
  ARROWS,
  CELLS,
  CHAKRAS,
  SNAKES,
  WIN_CELL,
  boardGrid,
  cellById,
  chakraOf,
} from '../data/board'

type Props = {
  position: number
  selected: number | null
  onSelect: (id: number) => void
}

export function Board({ position, selected, onSelect }: Props) {
  const grid = boardGrid()

  return (
    <div className="board-shell">
      <div className="board-legend">
        {CHAKRAS.map((c) => (
          <span key={c.id} className="board-legend-item" style={{ ['--c' as string]: c.color }}>
            {c.name}
          </span>
        ))}
      </div>
      <div className="board" role="grid" aria-label="Доска Лилы, 72 клетки">
        {grid.map((row, ri) => (
          <div className="board-row" key={ri} role="row">
            {row.map((id) => {
              const cell = cellById(id)
              const chakra = chakraOf(id)
              const isHere = position === id
              const isSel = selected === id
              const hasArrow = Boolean(ARROWS[id])
              const hasSnake = Boolean(SNAKES[id])
              return (
                <button
                  type="button"
                  key={id}
                  role="gridcell"
                  className={[
                    'cell',
                    `cell--${cell.kind}`,
                    isHere ? 'cell--here' : '',
                    isSel ? 'cell--sel' : '',
                    id === WIN_CELL ? 'cell--goal' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  style={{
                    ['--chakra' as string]: chakra.color,
                    ['--soft' as string]: chakra.soft,
                  }}
                  onClick={() => onSelect(id)}
                  title={`${id}. ${cell.name}`}
                >
                  <span className="cell-num">{id}</span>
                  <span className="cell-name">{cell.name}</span>
                  {hasArrow ? <span className="cell-mark cell-mark--up" aria-hidden>↑{ARROWS[id]}</span> : null}
                  {hasSnake ? <span className="cell-mark cell-mark--down" aria-hidden>↓{SNAKES[id]}</span> : null}
                  {isHere ? <span className="token" aria-label="Ты здесь" /> : null}
                </button>
              )
            })}
          </div>
        ))}
      </div>
      <p className="board-hint">
        {CELLS.length} клеток · стрелы вверх · змеи вниз · цель — {WIN_CELL}
      </p>
    </div>
  )
}
