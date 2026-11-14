import { ARROWS, SNAKES, WIN_CELL, cellById } from '../data/board'
import {
  linesForArrow,
  linesForCell,
  linesForEntry,
  linesForSnake,
  type VoiceLine,
} from '../data/voices'

export type Phase = 'intro' | 'question' | 'entry' | 'play' | 'won'

export type LogItem = {
  id: string
  kind: 'roll' | 'move' | 'snake' | 'arrow' | 'entry' | 'win' | 'note'
  text: string
}

export type GameState = {
  phase: Phase
  question: string
  position: number
  entryAttempts: number
  lastRoll: number | null
  voices: VoiceLine[]
  log: LogItem[]
  path: number[]
  canRoll: boolean
  pendingExtra: boolean
}

let logSeq = 0
function logId(): string {
  logSeq += 1
  return `l${logSeq}`
}

export function createInitialState(): GameState {
  return {
    phase: 'intro',
    question: '',
    position: 0,
    entryAttempts: 0,
    lastRoll: null,
    voices: [],
    log: [],
    path: [],
    canRoll: true,
    pendingExtra: false,
  }
}

export function rollDie(): number {
  return 1 + Math.floor(Math.random() * 6)
}

export function startQuestion(state: GameState): GameState {
  return { ...state, phase: 'question' }
}

export function setQuestion(state: GameState, question: string): GameState {
  return { ...state, question: question.trim() }
}

export function beginEntry(state: GameState): GameState {
  if (!state.question.trim()) return state
  return {
    ...state,
    phase: 'entry',
    canRoll: true,
    voices: [
      {
        role: 'guide',
        text: 'Проводник: кидай кубик. В игру пускает только шестёрка.',
      },
      {
        role: 'judge',
        text: 'Судья: пока нет шестёрки — уточняй вопрос. Игра сама решает, пускать ли.',
      },
    ],
    log: [
      ...state.log,
      {
        id: logId(),
        kind: 'note',
        text: `Вопрос: ${state.question}`,
      },
    ],
  }
}

export function doEntryRoll(state: GameState): GameState {
  if (state.phase !== 'entry' || !state.canRoll) return state
  const roll = rollDie()
  const attempts = state.entryAttempts + 1
  const entered = roll === 6
  const voices = linesForEntry(attempts, roll, entered)

  if (!entered) {
    return {
      ...state,
      entryAttempts: attempts,
      lastRoll: roll,
      voices,
      canRoll: true,
      log: [
        ...state.log,
        {
          id: logId(),
          kind: 'entry',
          text: `Вход: ${roll} (нужна 6). Попытка ${attempts}.`,
        },
      ],
    }
  }

  const birth = cellById(1)
  return {
    ...state,
    phase: 'play',
    entryAttempts: attempts,
    lastRoll: roll,
    position: 1,
    path: [1],
    voices: [...voices, ...linesForCell(birth, state.question, roll)],
    canRoll: true,
    pendingExtra: false,
    log: [
      ...state.log,
      {
        id: logId(),
        kind: 'entry',
        text: 'Шестёрка! Вход на клетку 1 — Рождение.',
      },
    ],
  }
}

export function doPlayRoll(state: GameState): GameState {
  if (state.phase !== 'play' || !state.canRoll || state.position <= 0) return state

  const roll = rollDie()
  const next = state.position + roll
  const log = [...state.log]
  let voices: VoiceLine[] = []
  const path = [...state.path]
  const pendingExtra = roll === 6

  log.push({
    id: logId(),
    kind: 'roll',
    text: `Кубик: ${roll} (с ${state.position})`,
  })

  if (next > WIN_CELL) {
    voices = [
      {
        role: 'guide',
        text: `Проводник: до космического сознания нужно ровно. С ${state.position} выпало ${roll} — ход не засчитывается.`,
      },
      {
        role: 'judge',
        text: 'Судья: точность важнее жадности до финиша. Жди свой бросок.',
      },
    ]
    return {
      ...state,
      lastRoll: roll,
      voices,
      log,
      canRoll: true,
      pendingExtra: false,
    }
  }

  let position = next
  path.push(position)
  log.push({
    id: logId(),
    kind: 'move',
    text: `Ход на ${position} — ${cellById(position).name}`,
  })

  const snakeTo = SNAKES[position]
  const arrowTo = ARROWS[position]

  if (snakeTo) {
    voices = linesForSnake(position, snakeTo, state.question)
    log.push({
      id: logId(),
      kind: 'snake',
      text: `Змея: ${position} → ${snakeTo} (${cellById(snakeTo).name})`,
    })
    position = snakeTo
    path.push(position)
  } else if (arrowTo) {
    voices = linesForArrow(position, arrowTo, state.question)
    log.push({
      id: logId(),
      kind: 'arrow',
      text: `Стрела: ${position} → ${arrowTo} (${cellById(arrowTo).name})`,
    })
    position = arrowTo
    path.push(position)
  }

  const landed = cellById(position)
  voices = [...voices, ...linesForCell(landed, state.question, roll)]

  if (position === WIN_CELL) {
    log.push({
      id: logId(),
      kind: 'win',
      text: 'Космическое сознание. Игра пройдена.',
    })
    return {
      ...state,
      phase: 'won',
      position,
      lastRoll: roll,
      voices,
      log,
      path,
      canRoll: false,
      pendingExtra: false,
    }
  }

  return {
    ...state,
    position,
    lastRoll: roll,
    voices,
    log,
    path,
    canRoll: true,
    pendingExtra,
  }
}

export function acknowledgeExtra(state: GameState): GameState {
  return { ...state, pendingExtra: false }
}
