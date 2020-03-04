const leadingZero = num => (num + '').padStart(2, '0');
const dateStr = (month, day) =>
  `2020-${leadingZero(month)}-${leadingZero(day)}`;
const date = str => {
  const dateParts = str.split('-');
  return new Date(+dateParts[0], dateParts[1] - 1, +dateParts[2]);
};
const oneDayMilliseconds = 24 * 60 * 60 * 1000;
const diffDays = (firstDate, secondDate) =>
  1 + Math.round(Math.abs((firstDate - secondDate) / oneDayMilliseconds));
const task = (id, name, start, end, dependencies = []) => {
  let startDate = date(start);
  let endDate = date(end);
  start === end && endDate.setDate(endDate.getDate() + 1);
  return [
    id,
    name,
    startDate,
    endDate,
    diffDays(endDate, startDate),
    0,
    dependencies.join(),
  ];
};

const tasks = [
  task(
    'PT1',
    'Elección del proyecto y objetivos',
    '2020-02-20',
    '2020-02-24',
    []
  ),
  task('PT2', 'Plantilla de documento', '2020-02-25', '2020-02-25', []),
  task('PT3', 'Redacción de documento', '2020-02-25', '2020-02-26', []),
  task('PT4', 'Captura inicial de requisitos', '2020-02-28', '2020-02-29', []),
  task('PT5', 'Planificación y riesgos', '2020-03-01', '2020-03-02', []),
  task('ANA1', 'Stakeholders identificados', '2020-03-09', '2020-03-09', []),
  task('ANA2', 'Casos de uso UML', '2020-03-09', '2020-03-10', []),
  task('ANA3', 'Diagrama de casos de uso UML', '2020-03-15', '2020-03-16', []),
  task('ANA4', 'Modelo de dominio', '2020-03-17', '2020-03-18', []),
  task('DIS1', 'Diseño de la arquitectura', '2020-03-19', '2020-03-24', []),
  task('DIS2', 'Wireframes', '2020-03-28', '2020-03-30', []),
  task(
    'DIS3',
    'Selección final de tecnologías',
    '2020-03-31',
    '2020-04-01',
    []
  ),
  task(
    'DEV1',
    'Preparar entorno de desarrollo',
    '2020-04-02',
    '2020-04-07',
    []
  ),
  task('DEV2', 'Docker para backend local', '2020-04-13', '2020-04-20', []),
  task('DEV3', 'Preparar datos de ejemplo', '2020-04-21', '2020-04-21', []),
  task('DEV4', 'API backend', '2020-04-22', '2020-04-26', []),
  task(
    'DEV4',
    'Editor online (editor, consola)',
    '2020-04-29',
    '2020-05-04',
    []
  ),
  task('DEV5', 'Ejecutar código de usuario', '2020-05-05', '2020-05-07', []),
  task('DEV6', 'Gestión de desafíos tipo test', '2020-05-08', '2020-05-10', []),
  task('DEV7', 'Gestión de módulos', '2020-05-11', '2020-05-13', []),
  task('DEV8', 'Parte pública', '2020-05-14', '2020-05-20', []),
  task('DEV9', 'Registro y login', '2020-05-21', '2020-05-22', []),
  task(
    'DEV10',
    'Gestión de preguntas tipo test',
    '2020-05-23',
    '2020-05-23',
    []
  ),
  task('DEV11', 'Plan de pruebas', '2020-05-24', '2020-05-25', []),
  task('MEM1', 'Redacción de memoria', '2020-06-01', '2020-06-08', []),
  task('MEM2', 'Presentación', '2020-06-09', '2020-06-09', []),
];
