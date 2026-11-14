type Props = {
  value: number | null
  spinning?: boolean
  onRoll: () => void
  disabled?: boolean
  label?: string
}

const PIP_MAP: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
}

export function Dice({ value, spinning, onRoll, disabled, label }: Props) {
  const pips = value && !spinning ? PIP_MAP[value] : []

  return (
    <div className="dice-wrap">
      <button
        type="button"
        className={`dice ${spinning ? 'dice--spin' : ''}`}
        onClick={onRoll}
        disabled={disabled || spinning}
        aria-label={label ?? 'Бросить кубик'}
      >
        <span className="dice-face">
          {Array.from({ length: 9 }, (_, i) => (
            <span
              key={i}
              className={`pip ${pips.includes(i) ? 'pip--on' : ''}`}
            />
          ))}
        </span>
      </button>
      {label ? <p className="dice-label">{label}</p> : null}
    </div>
  )
}
