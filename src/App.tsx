import { useEffect, useState, useTransition } from 'react'
import { Board } from './components/Board'
import { CellPanel } from './components/CellPanel'
import { Dice } from './components/Dice'
import { WIN_CELL, cellById } from './data/board'
import {
  acknowledgeExtra,
  beginEntry,
  createInitialState,
  doEntryRoll,
  doPlayRoll,
  setQuestion,
  startQuestion,
  type GameState,
} from './game/engine'
import './App.css'

const SPIN_MS = 520

export default function App() {
  const [game, setGame] = useState<GameState>(createInitialState)
  const [draft, setDraft] = useState('')
  const [selected, setSelected] = useState<number | null>(null)
  const [spinning, setSpinning] = useState(false)
  const [showLearn, setShowLearn] = useState(false)
  const [, startTransition] = useTransition()

  useEffect(() => {
    if (game.position > 0) setSelected(game.position)
  }, [game.position])

  function update(next: GameState) {
    startTransition(() => setGame(next))
  }

  function roll() {
    if (spinning || !game.canRoll) return
    if (game.phase !== 'entry' && game.phase !== 'play') return
    setSpinning(true)
    window.setTimeout(() => {
      setGame((s) => (s.phase === 'entry' ? doEntryRoll(s) : doPlayRoll(s)))
      setSpinning(false)
    }, SPIN_MS)
  }

  function restart() {
    setGame(createInitialState())
    setDraft('')
    setSelected(null)
    setShowLearn(false)
  }

  return (
    <div className="app">
      <header className="top">
        <div>
          <p className="brand">Лила</p>
          <p className="tagline">Современная игра самопознания · 72 клетки · соло с Проводником и Судьёй</p>
        </div>
        <div className="top-actions">
          <button type="button" className="btn ghost" onClick={() => setShowLearn((v) => !v)}>
            {showLearn ? 'Скрыть обучение' : 'Обучение'}
          </button>
          {game.phase !== 'intro' ? (
            <button type="button" className="btn ghost" onClick={restart}>
              Заново
            </button>
          ) : null}
        </div>
      </header>

      {showLearn ? <LearnPanel /> : null}

      {game.phase === 'intro' ? (
        <section className="hero-screen">
          <div className="hero-copy">
            <h1>Игра, которая не даёт ответ за тебя</h1>
            <p>
              Ты формулируешь вопрос. Кубик решает, пускать ли в партию — только шестёрка.
              Дальше Проводник направляет, Судья не даёт врать себе. Стрелы поднимают, змеи
              спускают. Выигрыш — клетка {WIN_CELL}, космическое сознание: связь с душой через
              прожитый путь, не через «угадайку».
            </p>
            <p className="hero-meta">
              Можно играть одной. Партия бывает 10 минут или несколько часов — зависит от того,
              насколько близко ты к своему запросу.
            </p>
            <button type="button" className="btn primary" onClick={() => update(startQuestion(game))}>
              Начать
            </button>
          </div>
          <div className="hero-visual" aria-hidden>
            <div className="orb orb-a" />
            <div className="orb orb-b" />
            <div className="orb-ring" />
          </div>
        </section>
      ) : null}

      {game.phase === 'question' ? (
        <section className="gate">
          <h1>Свой вопрос</h1>
          <p>
            Не загадывай «да/нет». Спроси то, в чём хочешь разобраться: выбор, страх, отношения,
            работа, смысл. Игра пойдёт вокруг этого.
          </p>
          <textarea
            className="q-input"
            rows={4}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Например: почему я откладываю то, что для меня важно?"
          />
          <button
            type="button"
            className="btn primary"
            disabled={draft.trim().length < 8}
            onClick={() => update(beginEntry(setQuestion(game, draft)))}
          >
            К порогу входа
          </button>
        </section>
      ) : null}

      {game.phase === 'entry' || game.phase === 'play' || game.phase === 'won' ? (
        <section className="play">
          <div className="play-main">
            <Board
              position={game.position}
              selected={selected}
              onSelect={setSelected}
            />
          </div>
          <div className="play-side">
            <div className="status-card">
              <p className="status-q">{game.question}</p>
              <p className="status-pos">
                {game.phase === 'entry'
                  ? `Вход · попыток: ${game.entryAttempts} · нужна 6`
                  : game.position > 0
                    ? `Клетка ${game.position}: ${cellById(game.position).name}`
                    : '—'}
              </p>
              {game.phase !== 'won' ? (
                <Dice
                  value={game.lastRoll}
                  spinning={spinning}
                  onRoll={roll}
                  disabled={!game.canRoll}
                  label={
                    game.phase === 'entry'
                      ? 'Бросок на вход (нужна 6)'
                      : game.pendingExtra
                        ? 'Шестёрка — ещё один ход'
                        : 'Бросить кубик'
                  }
                />
              ) : (
                <div className="win-badge">
                  <p>Ты на космическом сознании</p>
                  <button type="button" className="btn primary" onClick={restart}>
                    Новая партия
                  </button>
                </div>
              )}
              {game.pendingExtra && game.phase === 'play' ? (
                <button
                  type="button"
                  className="btn ghost"
                  onClick={() => update(acknowledgeExtra(game))}
                >
                  Понял, кидаю снова
                </button>
              ) : null}
            </div>
            <CellPanel
              cellId={selected}
              voices={game.voices}
              question={game.question}
            />
            <div className="log">
              <h3>Путь</h3>
              <ul>
                {[...game.log].reverse().slice(0, 12).map((item) => (
                  <li key={item.id} className={`log-${item.kind}`}>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}

function LearnPanel() {
  return (
    <section className="learn">
      <h2>Как играется</h2>
      <div className="learn-grid">
        <article>
          <h3>Зачем</h3>
          <p>
            Лила — зеркало. Кубик и клетки не «решают судьбу». Они ставят тебя лицом к слоям
            запроса: тело → эмоции → воля → сердце → речь → ум → дух → связь с душой.
          </p>
        </article>
        <article>
          <h3>Вход</h3>
          <p>
            Формулируешь вопрос. Кидаешь кубик до шести. Пока нет 6 — игра не пускает. Это пауза,
            чтобы уточнить запрос, а не лотерея «повезёт / не повезёт».
          </p>
        </article>
        <article>
          <h3>Проводник и Судья</h3>
          <p>
            Два голоса в одной партии (можно соло). Проводник направляет и держит опору. Судья
            срезает самообман и красивые отговорки. Вместе они ведут тебя по клеткам.
          </p>
        </article>
        <article>
          <h3>Клетки и чакры</h3>
          <p>
            8 рядов по 9 клеток. Низ — физический план (работа, тело, опора). Выше — радость и
            отношения, карма и действие, сердце, горло, сознание, высшее. Без низа «высшее» не
            держится.
          </p>
        </article>
        <article>
          <h3>Стрелы и змеи</h3>
          <p>
            Стрела — подъём (очищение, сострадание, дхарма…). Змея — спуск (зависть, невежество,
            эгоизм…). На каждой клетке читай смысл и вопрос к себе.
          </p>
        </article>
        <article>
          <h3>Победа</h3>
          <p>
            Нужно выйти — клетка {WIN_CELL}, космическое сознание. Проиграть нельзя: можно долго
            кружить, пока не станет ясно. Ход за {WIN_CELL} не засчитывается — нужна точная сумма.
          </p>
        </article>
      </div>
    </section>
  )
}
