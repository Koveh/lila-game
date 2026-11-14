export type ChakraId =
  | 'muladhara'
  | 'svadhisthana'
  | 'manipura'
  | 'anahata'
  | 'vishuddha'
  | 'ajna'
  | 'sahasrara'
  | 'beyond'

export type Cell = {
  id: number
  name: string
  chakra: ChakraId
  kind: 'neutral' | 'light' | 'shadow' | 'plane' | 'goal'
  meaning: string
  reflect: string
}

export type ChakraMeta = {
  id: ChakraId
  name: string
  sanskrit: string
  row: number
  color: string
  soft: string
  focus: string
}

export const CHAKRAS: ChakraMeta[] = [
  {
    id: 'muladhara',
    name: 'Муладхара',
    sanskrit: 'Muladhara',
    row: 1,
    color: '#c45c26',
    soft: '#f3e0d4',
    focus: 'Тело, опора, работа, дом. Насколько ты реально стоишь на ногах.',
  },
  {
    id: 'svadhisthana',
    name: 'Свадхистхана',
    sanskrit: 'Svadhisthana',
    row: 2,
    color: '#d4a017',
    soft: '#f7edd0',
    focus: 'Удовольствие от жизни, отношения, эмоции, поток.',
  },
  {
    id: 'manipura',
    name: 'Манипура',
    sanskrit: 'Manipura',
    row: 3,
    color: '#c9a227',
    soft: '#f5efd4',
    focus: 'Воля, действие, карма, сила выбирать и делать.',
  },
  {
    id: 'anahata',
    name: 'Анахата',
    sanskrit: 'Anahata',
    row: 4,
    color: '#2f7d4a',
    soft: '#dceee3',
    focus: 'Сердце: ясность, служение, добродетель без маски.',
  },
  {
    id: 'vishuddha',
    name: 'Вишуддха',
    sanskrit: 'Vishuddha',
    row: 5,
    color: '#2a6f8f',
    soft: '#d7e8f0',
    focus: 'Горло: слово, правда, выражение себя в мир.',
  },
  {
    id: 'ajna',
    name: 'Аджна',
    sanskrit: 'Ajna',
    row: 6,
    color: '#3d4f8c',
    soft: '#dde2f0',
    focus: 'Сознание, видение, различение света и тени в уме.',
  },
  {
    id: 'sahasrara',
    name: 'Сахасрара',
    sanskrit: 'Sahasrara',
    row: 7,
    color: '#6b4c8a',
    soft: '#ebe3f1',
    focus: 'Связь с высшим: преданность, природа, целое.',
  },
  {
    id: 'beyond',
    name: 'За пределами',
    sanskrit: 'Lokas',
    row: 8,
    color: '#1a1a1a',
    soft: '#ececeb',
    focus: 'Высшие планы. Цель — клетка 68: космическое сознание.',
  },
]

const chakraByRow = (n: number): ChakraId => CHAKRAS[n - 1].id

export const CELLS: Cell[] = [
  { id: 1, name: 'Рождение', chakra: chakraByRow(1), kind: 'plane', meaning: 'Точка входа. Ты уже внутри игры жизни — с вопросом в руках.', reflect: 'Что именно ты хочешь понять про свой запрос прямо сейчас?' },
  { id: 2, name: 'Майя', chakra: chakraByRow(1), kind: 'shadow', meaning: 'Иллюзия: мир видимостей. Легко принять чужой сценарий за свой.', reflect: 'Где ты сейчас смотришь на проблему через чужие ожидания?' },
  { id: 3, name: 'Гнев', chakra: chakraByRow(1), kind: 'shadow', meaning: 'Огонь, который сжигает ясность. Сигнал о нарушенной границе.', reflect: 'На что злишься — и какую границу это защищает?' },
  { id: 4, name: 'Жадность', chakra: chakraByRow(1), kind: 'shadow', meaning: 'Хватать «ещё», будто этого никогда не хватит.', reflect: 'Чего тебе «мало» в этом запросе — и правда ли это?' },
  { id: 5, name: 'Физический план', chakra: chakraByRow(1), kind: 'plane', meaning: 'Тело, деньги на еду, крыша, режим. База всего остального.', reflect: 'Как твоё тело и быт поддерживают (или нет) этот вопрос?' },
  { id: 6, name: 'Заблуждение', chakra: chakraByRow(1), kind: 'shadow', meaning: 'Путаница: факты смешались с страхами и домыслами.', reflect: 'Какой один факт ты принимаешь без проверки?' },
  { id: 7, name: 'Тщеславие', chakra: chakraByRow(1), kind: 'shadow', meaning: 'Игра на публику. Важно «как выгляжу», а не «что есть».', reflect: 'Кому ты хочешь это доказать — и зачем?' },
  { id: 8, name: 'Алчность', chakra: chakraByRow(1), kind: 'shadow', meaning: 'Желание владеть людьми, исходом, контролем.', reflect: 'Где ты пытаешься удержать то, что уже не твоё?' },
  { id: 9, name: 'Чувственный план', chakra: chakraByRow(1), kind: 'plane', meaning: 'Мир ощущений: еда, тело, притяжение, импульс.', reflect: 'Что тело говорит о запросе раньше ума?' },

  { id: 10, name: 'Очищение', chakra: chakraByRow(2), kind: 'light', meaning: 'Смыть лишнее. Стрела вверх — очищение поднимает.', reflect: 'От чего стоит освободиться, чтобы вопрос стал чище?' },
  { id: 11, name: 'Развлечение', chakra: chakraByRow(2), kind: 'neutral', meaning: 'Отвлечение и радость. Может лечить — или прятать.', reflect: 'Ты отдыхаешь — или убегаешь от ответа?' },
  { id: 12, name: 'Зависть', chakra: chakraByRow(2), kind: 'shadow', meaning: 'Чужое кажется доказательством твоей недостаточности.', reflect: 'Чью жизнь ты сравниваешь со своей в этом вопросе?' },
  { id: 13, name: 'Никчёмность', chakra: chakraByRow(2), kind: 'shadow', meaning: 'Ощущение «я ничто». Часто — усталость, не истина.', reflect: 'Где ты обесцениваешь себя раньше, чем попробуешь?' },
  { id: 14, name: 'Астральный план', chakra: chakraByRow(2), kind: 'plane', meaning: 'Сны, образы, тонкие чувства, интуитивные картины.', reflect: 'Какой образ или сон крутится вокруг твоего запроса?' },
  { id: 15, name: 'План фантазии', chakra: chakraByRow(2), kind: 'neutral', meaning: 'Воображение строит миры. Полезно — пока не подменяет жизнь.', reflect: 'Какую красивую историю ты рассказываешь себе вместо шага?' },
  { id: 16, name: 'Ревность', chakra: chakraByRow(2), kind: 'shadow', meaning: 'Страх потери, сравнение, контроль близости.', reflect: 'Чего ты боишься лишиться в связи с этим вопросом?' },
  { id: 17, name: 'Сострадание', chakra: chakraByRow(2), kind: 'light', meaning: 'Мягкость к себе и другим. Сильная стрела вверх.', reflect: 'Как бы ты отнёсся к другу с таким же запросом?' },
  { id: 18, name: 'План радости', chakra: chakraByRow(2), kind: 'plane', meaning: 'Лёгкость без причины. Признак, что энергия течёт.', reflect: 'Где в запросе есть место для радости, а не только борьбы?' },

  { id: 19, name: 'План кармы', chakra: chakraByRow(3), kind: 'plane', meaning: 'Поле причины и следствия. Твои прошлые выборы здесь.', reflect: 'Какой твой прошлый выбор привёл к этому вопросу?' },
  { id: 20, name: 'Благотворительность', chakra: chakraByRow(3), kind: 'light', meaning: 'Отдавать без торга. Стрела к правильному знанию.', reflect: 'Чем ты можешь поделиться — временем, вниманием, ресурсом?' },
  { id: 21, name: 'Искупление', chakra: chakraByRow(3), kind: 'neutral', meaning: 'Признать ошибку и выровнять долг перед собой.', reflect: 'Что пора признать честно, без самобичевания?' },
  { id: 22, name: 'Дхарма', chakra: chakraByRow(3), kind: 'light', meaning: 'Верный путь: делать своё, а не чужое.', reflect: 'Что здесь — твоя настоящая обязанность, а что — чужая?' },
  { id: 23, name: 'Небесный план', chakra: chakraByRow(3), kind: 'plane', meaning: 'Состояние поддержки и расширения после очищения.', reflect: 'Где ты уже получаешь поддержку — и не замечаешь?' },
  { id: 24, name: 'Плохая компания', chakra: chakraByRow(3), kind: 'shadow', meaning: 'Окружение тянет вниз: сплетни, цинизм, давление.', reflect: 'Кто рядом усиливает твою худшую версию?' },
  { id: 25, name: 'Хорошая компания', chakra: chakraByRow(3), kind: 'light', meaning: 'Люди, рядом с которыми ты становишься яснее.', reflect: 'Кого стоит держать ближе в этом вопросе?' },
  { id: 26, name: 'Печаль', chakra: chakraByRow(3), kind: 'shadow', meaning: 'Горе и тяжесть. Если не застревать — печаль очищает.', reflect: 'О чём ты горюешь — и что уже пора отпустить?' },
  { id: 27, name: 'Самоотверженность', chakra: chakraByRow(3), kind: 'light', meaning: 'Служение без театра. Действие ради смысла.', reflect: 'Где ты можешь помочь делу, а не своему имиджу?' },

  { id: 28, name: 'Ясность', chakra: chakraByRow(4), kind: 'light', meaning: 'Сердце видит без тумана. Простая правда.', reflect: 'Какая самая простая правда о запросе тебе уже известна?' },
  { id: 29, name: 'Священный план', chakra: chakraByRow(4), kind: 'plane', meaning: 'То, что для тебя свято: ценности, обеты, смысл.', reflect: 'Какая ценность здесь не negotiable?' },
  { id: 30, name: 'Добродетель', chakra: chakraByRow(4), kind: 'light', meaning: 'Характер в деле: честность, стойкость, мягкая сила.', reflect: 'Какое качество характера сейчас нужно проявить?' },
  { id: 31, name: 'Невежество', chakra: chakraByRow(4), kind: 'shadow', meaning: 'Не знать и не хотеть знать. Змея вниз.', reflect: 'О чём ты сознательно не хочешь узнать правду?' },
  { id: 32, name: 'Правильное знание', chakra: chakraByRow(4), kind: 'light', meaning: 'Знание, которое освобождает, а не давит.', reflect: 'Какое знание уже меняет твой взгляд на запрос?' },
  { id: 33, name: 'Различение', chakra: chakraByRow(4), kind: 'light', meaning: 'Видеть разницу: полезное / вредное, своё / чужое.', reflect: 'Что здесь важно отделить от шума?' },
  { id: 34, name: 'Нейтральность', chakra: chakraByRow(4), kind: 'neutral', meaning: 'Спокойствие без холодности. Не цепляться за исход.', reflect: 'Можешь ли ты отпустить контроль результата на минуту?' },
  { id: 35, name: 'Неправильное знание', chakra: chakraByRow(4), kind: 'shadow', meaning: 'Убеждение, которое звучит умно, но ведёт в тупик.', reflect: 'Какая «умная» мысль о себе уже устарела?' },
  { id: 36, name: 'План аромата', chakra: chakraByRow(4), kind: 'plane', meaning: 'Тонкое восприятие: атмосфера, вкус к жизни.', reflect: 'Какая атмосфера нужна тебе, чтобы решить вопрос?' },

  { id: 37, name: 'План вкуса', chakra: chakraByRow(5), kind: 'plane', meaning: 'Предпочтения, стиль, то, что «твоё по вкусу».', reflect: 'Что в решении было бы по-настоящему в твоём вкусе?' },
  { id: 38, name: 'Чистилище', chakra: chakraByRow(5), kind: 'shadow', meaning: 'Промежуток: старое ушло, новое ещё не село.', reflect: 'Что уже умерло в старой версии тебя — и что ещё нет?' },
  { id: 39, name: 'Ясность сознания', chakra: chakraByRow(5), kind: 'light', meaning: 'Ум тихий и острый. Слово совпадает с делом.', reflect: 'Как бы ты сказал свой запрос одним честным предложением?' },
  { id: 40, name: 'Солнечный план', chakra: chakraByRow(5), kind: 'plane', meaning: 'Яркость, видимость, выход на свет.', reflect: 'Где пора перестать прятаться со своим запросом?' },
  { id: 41, name: 'Лунный план', chakra: chakraByRow(5), kind: 'plane', meaning: 'Мягкость, циклы, ночная мудрость, интуиция.', reflect: 'Что говорит тихая, ночная часть тебя?' },
  { id: 42, name: 'Огненный план', chakra: chakraByRow(5), kind: 'plane', meaning: 'Трансформация через жар. Старое сгорает.', reflect: 'Что готово сгореть, чтобы освободить место?' },
  { id: 43, name: 'План реальности', chakra: chakraByRow(5), kind: 'plane', meaning: 'Как есть. Без розовых и чёрных фильтров.', reflect: 'Каков факт «как есть» — без оценки?' },
  { id: 44, name: 'Положительный интеллект', chakra: chakraByRow(5), kind: 'light', meaning: 'Ум служит жизни: строит мосты, находит пути.', reflect: 'Какой конструктивный шаг ум уже видит?' },
  { id: 45, name: 'Отрицательный интеллект', chakra: chakraByRow(5), kind: 'shadow', meaning: 'Ум-критик: разрушает быстрее, чем создаёт.', reflect: 'Какой внутренний голос сейчас только режет, а не чинит?' },

  { id: 46, name: 'Счастье', chakra: chakraByRow(6), kind: 'light', meaning: 'Состояние целостности, не «награда за успех».', reflect: 'Где счастье уже есть — независимо от ответа на запрос?' },
  { id: 47, name: 'Тапас', chakra: chakraByRow(6), kind: 'neutral', meaning: 'Дисциплина и жар практики. Терпение в огне.', reflect: 'Какую маленькую дисциплину стоит держать неделю?' },
  { id: 48, name: 'Земля', chakra: chakraByRow(6), kind: 'plane', meaning: 'Плотность, терпение, медленный рост.', reflect: 'Что нужно укоренить, а не ускорить?' },
  { id: 49, name: 'Антисоциальность', chakra: chakraByRow(6), kind: 'shadow', meaning: 'Отрыв от людей из злости или гордыни.', reflect: 'Где ты закрываешься так, что себе хуже?' },
  { id: 50, name: 'Преданность', chakra: chakraByRow(6), kind: 'light', meaning: 'Верность пути, делу, любви — без истерики.', reflect: 'Чему ты всё ещё предан — и это правда твоё?' },
  { id: 51, name: 'Эгоизм', chakra: chakraByRow(6), kind: 'shadow', meaning: '«Только я» в центре. Змея к карме.', reflect: 'Где «я» перекрывает слух к другим и к себе?' },
  { id: 52, name: 'Первозданная природа', chakra: chakraByRow(6), kind: 'plane', meaning: 'Пракрити: живая природа до масок. Стрела к цели.', reflect: 'Каким ты был до всех ролей — что от этого осталось?' },
  { id: 53, name: 'Космическое добро', chakra: chakraByRow(6), kind: 'light', meaning: 'Силы, которые собирают и лечат целое.', reflect: 'Что в твоём запросе служит не только тебе?' },
  { id: 54, name: 'Космическое зло', chakra: chakraByRow(6), kind: 'shadow', meaning: 'Силы распада. Не «дьявол» — entropия и разрушение.', reflect: 'Какой разрушительный паттерн пора назвать вслух?' },

  { id: 55, name: 'Раздражительность', chakra: chakraByRow(7), kind: 'shadow', meaning: 'Нервы на поверхности. Порог чувствительности низкий.', reflect: 'Что раздражает — как зеркало скрытой потребности?' },
  { id: 56, name: 'Вайкунтха', chakra: chakraByRow(7), kind: 'plane', meaning: 'План покоя и изобилия сознания.', reflect: 'Где в тебе уже есть покой — даже если вопрос открыт?' },
  { id: 57, name: 'Абсолютный план', chakra: chakraByRow(7), kind: 'plane', meaning: 'Всё, что есть, в одном взгляде. Стрела к абсолюту.', reflect: 'Если бы ответ уже был — каким бы он чувствовался?' },
  { id: 58, name: 'Блаженство', chakra: chakraByRow(7), kind: 'light', meaning: 'Ананда: радость бытия. Можно соскользнуть вниз, если цепляться.', reflect: 'Можешь ли ты быть с радостью без хватки «закрепить»?' },
  { id: 59, name: 'Негативное эго', chakra: chakraByRow(7), kind: 'shadow', meaning: '«Я хуже всех» — тоже эго, только вывернутое.', reflect: 'Где самоуничижение стало удобной ролью?' },
  { id: 60, name: 'Позитивное эго', chakra: chakraByRow(7), kind: 'neutral', meaning: 'Здоровое «я могу». Нужно для действия, опасно как трон.', reflect: 'Где уверенность помогает — и где уже мешает слушать?' },
  { id: 61, name: 'Прана-лока', chakra: chakraByRow(7), kind: 'plane', meaning: 'Жизненная сила. Дыхание, энергия, витальность.', reflect: 'Как твоя энергия отвечает на этот вопрос прямо сейчас?' },
  { id: 62, name: 'Джан-лока', chakra: chakraByRow(7), kind: 'plane', meaning: 'План рождённых существ: связь со всеми формами жизни.', reflect: 'Как твой запрос связан с другими людьми?' },
  { id: 63, name: 'Тапо-лока', chakra: chakraByRow(7), kind: 'plane', meaning: 'План аскезы и внутреннего жара. Змея к майе, если гордиться трудом.', reflect: 'Не превращаешь ли ты усилие в новую маску?' },

  { id: 64, name: 'Сатья-лока', chakra: chakraByRow(8), kind: 'plane', meaning: 'План истины. Ближе к финалу.', reflect: 'Какая истина уже не требует доказательств?' },
  { id: 65, name: 'План сознания', chakra: chakraByRow(8), kind: 'plane', meaning: 'Чистый свидетель. Ты смотришь — и видишь смотрящего.', reflect: 'Кто внутри тебя наблюдает за всей этой игрой?' },
  { id: 66, name: 'План блаженства', chakra: chakraByRow(8), kind: 'light', meaning: 'Глубокая радость без объекта.', reflect: 'Что остаётся, если убрать цель и тревогу?' },
  { id: 67, name: 'План энергии', chakra: chakraByRow(8), kind: 'neutral', meaning: 'Мощь без формы. Змея вниз — если использовать её в гневе.', reflect: 'Куда ты направляешь силу — в ясность или в удар?' },
  { id: 68, name: 'Космическое сознание', chakra: chakraByRow(8), kind: 'goal', meaning: 'Связь с душой. Финиш игры: запрос проживается целиком.', reflect: 'Что ты понял про свой исходный вопрос — одним дыханием?' },
  { id: 69, name: 'Шива-лока', chakra: chakraByRow(8), kind: 'plane', meaning: 'План чистого сознания. Сюда приводит сострадание.', reflect: 'Как выглядит твой запрос с высоты «всё уже целое»?' },
  { id: 70, name: 'План богов', chakra: chakraByRow(8), kind: 'plane', meaning: 'Архетипы сил: храбрость, мудрость, защита.', reflect: 'Какая сила в тебе просится в роль союзника?' },
  { id: 71, name: 'План сияния', chakra: chakraByRow(8), kind: 'light', meaning: 'Свет без усилия. Почти абсолют.', reflect: 'Где ты уже светишь — и не даёшь себе это признать?' },
  { id: 72, name: 'Абсолют', chakra: chakraByRow(8), kind: 'plane', meaning: 'Всё и ничто. Стрела с абсолютного плана. Не цель — горизонт.', reflect: 'Можешь ли ты отпустить даже «победу» в игре?' },
]

/** Стрелы — подъём сознания */
export const ARROWS: Record<number, number> = {
  10: 23,
  17: 69,
  20: 32,
  22: 38,
  26: 46,
  27: 60,
  29: 41,
  30: 40,
  36: 44,
  52: 68,
  57: 72,
  61: 66,
  64: 67,
}

/** Змеи — спуск в тень */
export const SNAKES: Record<number, number> = {
  12: 8,
  16: 4,
  24: 7,
  31: 15,
  34: 12,
  38: 21,
  39: 25,
  45: 17,
  49: 13,
  51: 19,
  54: 35,
  58: 41,
  63: 2,
  67: 3,
  70: 6,
}

export const WIN_CELL = 68

export function cellById(id: number): Cell {
  return CELLS[id - 1]
}

export function chakraOf(id: number): ChakraMeta {
  const cell = cellById(id)
  return CHAKRAS.find((c) => c.id === cell.chakra)!
}

/** Доска 8×9: снизу ряд 1 (1–9 слева направо), сверху ряд 8. Чётные ряды — справа налево (как классика). */
export function boardGrid(): number[][] {
  const rows: number[][] = []
  for (let row = 8; row >= 1; row -= 1) {
    const start = (row - 1) * 9 + 1
    const ids = Array.from({ length: 9 }, (_, i) => start + i)
    if (row % 2 === 0) ids.reverse()
    rows.push(ids)
  }
  return rows
}
