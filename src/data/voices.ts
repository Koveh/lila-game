import { cellById, chakraOf, type Cell } from './board'

export type VoiceLine = {
  role: 'guide' | 'judge'
  text: string
}

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length]
}

export function linesForCell(cell: Cell, question: string, roll: number): VoiceLine[] {
  const chakra = chakraOf(cell.id)
  const q = question.trim() || 'твой запрос'
  const seed = cell.id * 17 + roll

  const guidePool = [
    `Проводник: на «${cell.name}» смотри мягко. Чакра ${chakra.name}: ${chakra.focus}`,
    `Проводник: клетка говорит — ${cell.meaning} Спроси себя про «${q}»: ${cell.reflect}`,
    `Проводник: ты здесь не случайно. ${chakra.name} просит честности к телу опыта, не к чужой теории.`,
    `Проводник: запиши одну фразу — что изменилось в понимании «${q}» на этой клетке.`,
  ]

  const judgePool = [
    `Судья: не украшай. Где ты врёшь себе про «${q}» именно на «${cell.name}»?`,
    `Судья: ${cell.kind === 'shadow' ? 'Тень названа — не убегай в оправдания.' : 'Свет тоже проверяют: не используешь ли ты его как позу?'}`,
    `Судья: кубик выпал ${roll}. Это не «знак вселенной заменить работу» — это приглашение посмотреть в клетку.`,
    `Судья: если хочешь выйти за 10 минут — ответь коротко. Если путаешься — сиди с клеткой дольше.`,
  ]

  if (cell.kind === 'goal') {
    return [
      {
        role: 'guide',
        text: `Проводник: космическое сознание. Твой вопрос «${q}» не обязан исчезнуть — он должен стать прозрачным.`,
      },
      {
        role: 'judge',
        text: 'Судья: победа — не «правильно ответил». Победа — ты больше не бежишь от того, что увидел.',
      },
    ]
  }

  if (cell.id === 1) {
    return [
      {
        role: 'guide',
        text: `Проводник: рождение в игре. Держи «${q}» как компас, не как приговор.`,
      },
      {
        role: 'judge',
        text: 'Судья: шестёрка пустила тебя. Дальше — ответственность за каждый шаг, не за удачу кубика.',
      },
    ]
  }

  return [
    { role: 'guide', text: pick(guidePool, seed) },
    { role: 'judge', text: pick(judgePool, seed + 3) },
  ]
}

export function linesForEntry(attempt: number, roll: number, entered: boolean): VoiceLine[] {
  if (entered) {
    return [
      {
        role: 'guide',
        text: 'Проводник: шестёрка. Порог открыт. Войди с вопросом — без спектакля.',
      },
      {
        role: 'judge',
        text: 'Судья: игра пускает. Не путай допуск с ответом. Ответ будет клетками.',
      },
    ]
  }
  return [
    {
      role: 'guide',
      text: `Проводник: выпало ${roll}. Покажись вопросу ещё раз — иногда порог ждёт ясности, не силы.`,
    },
    {
      role: 'judge',
      text: `Судья: попытка ${attempt}. Не шестёрка — не вход. Не уговаривай кубик. Уточни вопрос.`,
    },
  ]
}

export function linesForSnake(from: number, to: number, question: string): VoiceLine[] {
  const a = cellById(from)
  const b = cellById(to)
  return [
    {
      role: 'guide',
      text: `Проводник: змея с «${a.name}» на «${b.name}». Спуск — не провал, а урок, который не доучили.`,
    },
    {
      role: 'judge',
      text: `Судья: про «${question || 'запрос'}» — какую привычку ты только что увидел в действии?`,
    },
  ]
}

export function linesForArrow(from: number, to: number, question: string): VoiceLine[] {
  const a = cellById(from)
  const b = cellById(to)
  return [
    {
      role: 'guide',
      text: `Проводник: стрела с «${a.name}» на «${b.name}». Качество этой клетки уже живо в тебе — доверься подъёму.`,
    },
    {
      role: 'judge',
      text: `Судья: не зазнавайся. Подъём по «${question || 'запросу'}» надо удержать делом, не селфи.`,
    },
  ]
}
