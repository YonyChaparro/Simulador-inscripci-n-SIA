/* Datos del simulador. En cada inicio de sesión se genera un perfil aleatorio
   (carrera, estudiante, asignaturas, grupos, horarios y cupos) a partir de una
   semilla, de modo que el perfil se mantiene estable durante la sesión.
   Toda la información es ficticia y se puede editar libremente. */

const CONFIG = {
  periodo: '2026-2S',
  inicioLectivo: '2026-08-31',
  finLectivo: '2026-12-12',
  limiteCreditos: 24,
  minimoCreditos: 10,
  versionPortal: '4.4.0',
  versionMatricula: 'v25.4.0',
};

const TIPOLOGIAS = ['Disciplinar optativa', 'Fund. obligatoria', 'Fund. optativa', 'Disciplinar obligatoria'];

/* Asignatura: 'Nombre|créditos|componentes|código'
   componentes: L = laboratorio, T = taller. El código es opcional (se genera). */
const CARRERAS = [
  {
    nombre: 'INGENIERÍA DE SISTEMAS Y COMPUTACIÓN', facultad: 'FACULTAD DE INGENIERÍA', codigoPlan: '2879', base: 2016100, edificios: ['453', '401', '411'],
    'Fund. obligatoria': ['Cálculo en varias variables|4||1000006-B', 'Fundamentos de electricidad y magnetismo|4|LT|1000017-B', 'Ecuaciones diferenciales|4||1000007-B',
      'Probabilidad y estadística fundamental|3||1000013-B', 'Matemáticas discretas II|4', 'Algoritmos|3'],
    'Fund. optativa': ['Fundamentos de oscilaciones, ondas y óptica|4|L|1000020-B', 'Programación lineal|3', 'Métodos numéricos|3'],
    'Disciplinar obligatoria': ['Ingeniería de software I|3', 'Arquitectura de computadores|3', 'Sistemas operativos|3', 'Redes de computadores|3', 'Bases de datos|3', 'Estructuras de datos|3'],
    'Disciplinar optativa': ['Compiladores|3', 'Computación visual|3', 'Comunicaciones|3', 'Inteligencia artificial|3', 'Inteligencia artificial y mini-robots|3',
      'Introducción a la criptografía y a la seguridad de la Información|3', 'Lenguajes de programación|3', 'Microcontroladores|3|L', 'Modelos y simulación|3',
      'Teoría de Codificación|4', 'Computación paralela y distribuida|3'],
  },
  {
    nombre: 'INGENIERÍA CIVIL', facultad: 'FACULTAD DE INGENIERÍA', codigoPlan: '2542', base: 2015200, edificios: ['214', '409', '401'],
    'Fund. obligatoria': ['Cálculo integral|4||1000005-B', 'Álgebra lineal|4||1000003-B', 'Fundamentos de mecánica|4|LT|1000019-B', 'Ecuaciones diferenciales|4||1000007-B',
      'Probabilidad y estadística fundamental|3||1000013-B', 'Geometría descriptiva|3'],
    'Fund. optativa': ['Química básica|3|L|1000024-B', 'Programación de computadores|3', 'Geología para ingenieros|3'],
    'Disciplinar obligatoria': ['Estática|3', 'Mecánica de sólidos|4', 'Análisis estructural I|4', 'Hidráulica|4|L', 'Mecánica de suelos|4|L', 'Topografía|3|L', 'Materiales de construcción|3|L'],
    'Disciplinar optativa': ['Diseño de pavimentos|3', 'Diseño de puentes|3', 'Ingeniería sísmica|3', 'Tratamiento de aguas residuales|3', 'Gestión de proyectos de construcción|3',
      'Ingeniería de tránsito|3', 'Hidrología|3', 'Concreto preesforzado|3', 'Geotecnia vial|3'],
  },
  {
    nombre: 'INGENIERÍA MECÁNICA', facultad: 'FACULTAD DE INGENIERÍA', codigoPlan: '2547', base: 2017400, edificios: ['407', '453', '401'],
    'Fund. obligatoria': ['Cálculo en varias variables|4||1000006-B', 'Ecuaciones diferenciales|4||1000007-B', 'Fundamentos de mecánica|4|LT|1000019-B',
      'Fundamentos de electricidad y magnetismo|4|LT|1000017-B', 'Álgebra lineal|4||1000003-B', 'Dibujo mecánico|3'],
    'Fund. optativa': ['Métodos numéricos|3', 'Química básica|3|L|1000024-B', 'Programación de computadores|3'],
    'Disciplinar obligatoria': ['Termodinámica|4', 'Mecánica de fluidos|4|L', 'Resistencia de materiales|4', 'Dinámica|3', 'Diseño de elementos de máquinas|4',
      'Transferencia de calor|3', 'Procesos de manufactura|3|L'],
    'Disciplinar optativa': ['Refrigeración y aire acondicionado|3', 'Turbomáquinas|3', 'Vibraciones mecánicas|3', 'Energías renovables|3', 'Mecatrónica|3|L',
      'Diseño asistido por computador|3', 'Motores de combustión interna|3', 'Robótica industrial|3', 'Mantenimiento industrial|3'],
  },
  {
    nombre: 'MEDICINA', facultad: 'FACULTAD DE MEDICINA', codigoPlan: '2515', base: 2018300, edificios: ['471', '500', '421'],
    'Fund. obligatoria': ['Bioquímica|4|L', 'Biología celular y molecular|4', 'Anatomía|6|L', 'Histología|4|L', 'Fisiología|6', 'Bioestadística|3'],
    'Fund. optativa': ['Epidemiología básica|3', 'Ética médica|2', 'Comunicación en salud|2'],
    'Disciplinar obligatoria': ['Farmacología|4', 'Patología|4|L', 'Microbiología y parasitología|4|L', 'Semiología|6', 'Medicina interna I|6', 'Inmunología|3'],
    'Disciplinar optativa': ['Medicina del deporte|2', 'Genética clínica|3', 'Salud pública y comunidad|3', 'Neurociencias|3', 'Medicina tropical|2',
      'Cuidados paliativos|2', 'Telemedicina|2', 'Nutrición clínica|3', 'Medicina alternativa y complementaria|2'],
  },
  {
    nombre: 'DERECHO', facultad: 'FACULTAD DE DERECHO, CIENCIAS POLÍTICAS Y SOCIALES', codigoPlan: '2505', base: 2019500, edificios: ['201', '212', '225'],
    'Fund. obligatoria': ['Introducción al derecho|3', 'Teoría del Estado|3', 'Derecho romano|3', 'Historia de las ideas políticas|3', 'Sociología jurídica|3', 'Lógica y argumentación jurídica|3'],
    'Fund. optativa': ['Economía política|3', 'Filosofía del derecho|3', 'Metodología de la investigación sociojurídica|3'],
    'Disciplinar obligatoria': ['Derecho constitucional colombiano|4', 'Derecho civil: personas y familia|3', 'Obligaciones|4', 'Derecho penal general|4', 'Teoría general del proceso|3',
      'Derecho administrativo general|4', 'Derecho laboral individual|3'],
    'Disciplinar optativa': ['Derecho ambiental|3', 'Derechos humanos|3', 'Derecho internacional público|3', 'Derecho comercial|3', 'Criminología|3',
      'Justicia transicional|3', 'Derecho informático|2', 'Derecho agrario|3', 'Derecho tributario|3'],
  },
  {
    nombre: 'ECONOMÍA', facultad: 'FACULTAD DE CIENCIAS ECONÓMICAS', codigoPlan: '2522', base: 2016900, edificios: ['310', '311', '238'],
    'Fund. obligatoria': ['Matemáticas I|4', 'Matemáticas II|4', 'Estadística I|4', 'Estadística II|4', 'Historia económica general|3', 'Introducción a la economía|3'],
    'Fund. optativa': ['Optimización|3', 'Historia del pensamiento económico|3', 'Contabilidad general|3'],
    'Disciplinar obligatoria': ['Microeconomía I|4', 'Microeconomía II|4', 'Macroeconomía I|4', 'Macroeconomía II|4', 'Econometría I|4', 'Economía colombiana|3', 'Teoría monetaria|3'],
    'Disciplinar optativa': ['Economía ambiental|3', 'Economía laboral|3', 'Finanzas públicas|3', 'Economía internacional|3', 'Teoría de juegos|3',
      'Economía del desarrollo|3', 'Economía experimental|3', 'Series de tiempo|3', 'Economía urbana|3'],
  },
  {
    nombre: 'ARQUITECTURA', facultad: 'FACULTAD DE ARTES', codigoPlan: '2501', base: 2015800, edificios: ['314', '303', '217'],
    'Fund. obligatoria': ['Taller de proyectos 1|6', 'Expresión gráfica|3', 'Geometría para arquitectos|3', 'Historia de la arquitectura I|3', 'Teoría de la arquitectura|3', 'Estructuras I|3'],
    'Fund. optativa': ['Fotografía arquitectónica|2', 'Dibujo a mano alzada|2', 'Modelado digital|3'],
    'Disciplinar obligatoria': ['Taller de proyectos 3|6', 'Construcción I|4', 'Instalaciones técnicas|3', 'Urbanismo|3', 'Estructuras II|3', 'Historia de la arquitectura III|3', 'Patrimonio arquitectónico|3'],
    'Disciplinar optativa': ['Diseño bioclimático|3', 'Paisajismo|3', 'Vivienda social|3', 'Arquitectura en guadua|3', 'Metodología BIM|3',
      'Diseño de interiores|3', 'Ciudad y territorio|3', 'Iluminación arquitectónica|2', 'Arquitectura efímera|2'],
  },
  {
    nombre: 'BIOLOGÍA', facultad: 'FACULTAD DE CIENCIAS', codigoPlan: '2512', base: 2017800, edificios: ['421', '426', '451'],
    'Fund. obligatoria': ['Biología celular|4|L', 'Química general|4|L', 'Química orgánica|4|L', 'Matemáticas básicas|4', 'Bioestadística fundamental|3', 'Física para biólogos|3'],
    'Fund. optativa': ['Bioquímica básica|3', 'Introducción a la ecología|3', 'Geología general|3'],
    'Disciplinar obligatoria': ['Genética|4|L', 'Botánica|4|L', 'Zoología de invertebrados|4|L', 'Microbiología general|4|L', 'Fisiología vegetal|3', 'Ecología de poblaciones|3', 'Evolución|3'],
    'Disciplinar optativa': ['Entomología|3|L', 'Herpetología|3', 'Biología marina|3', 'Micología|3|L', 'Biotecnología vegetal|3',
      'Ornitología|3', 'Bioinformática|3', 'Ecología del paisaje|3', 'Primatología|3'],
  },
  {
    nombre: 'PSICOLOGÍA', facultad: 'FACULTAD DE CIENCIAS HUMANAS', codigoPlan: '2520', base: 2015300, edificios: ['212', '229', '225'],
    'Fund. obligatoria': ['Introducción a la psicología|3', 'Procesos psicológicos básicos|4', 'Estadística para psicología|3', 'Neuropsicología básica|3', 'Historia de la psicología|3', 'Métodos de investigación|3'],
    'Fund. optativa': ['Antropología general|3', 'Sociología general|3', 'Filosofía de la mente|3'],
    'Disciplinar obligatoria': ['Psicología del desarrollo|4', 'Psicología social|4', 'Psicometría|4', 'Psicopatología|4', 'Psicología clínica|3', 'Psicología organizacional|3', 'Evaluación psicológica|3'],
    'Disciplinar optativa': ['Psicología del deporte|3', 'Psicología jurídica|3', 'Psicología de la salud|3', 'Neurociencia cognitiva|3', 'Psicología comunitaria|3',
      'Intervención en crisis|3', 'Psicología educativa|3', 'Psicología ambiental|3', 'Psicología del consumidor|3'],
  },
  {
    nombre: 'ESTADÍSTICA', facultad: 'FACULTAD DE CIENCIAS', codigoPlan: '2514', base: 2016500, edificios: ['404', '405', '451'],
    'Fund. obligatoria': ['Cálculo diferencial|4||1000004-B', 'Cálculo integral|4||1000005-B', 'Álgebra lineal|4||1000003-B', 'Cálculo en varias variables|4||1000006-B',
      'Programación de computadores|3', 'Fundamentos de probabilidad|4'],
    'Fund. optativa': ['Ecuaciones diferenciales|4||1000007-B', 'Análisis numérico|3', 'Matemáticas discretas|3'],
    'Disciplinar obligatoria': ['Inferencia estadística|4', 'Modelos lineales|4', 'Muestreo estadístico|4', 'Diseño de experimentos|4', 'Estadística multivariada|4', 'Procesos estocásticos|3', 'Series de tiempo univariadas|3'],
    'Disciplinar optativa': ['Estadística bayesiana|3', 'Minería de datos|3', 'Bioestadística avanzada|3', 'Estadística espacial|3', 'Análisis de supervivencia|3',
      'Aprendizaje estadístico|3', 'Estadística no paramétrica|3', 'Control estadístico de calidad|3', 'Análisis de datos categóricos|3'],
  },
];

const NOMBRES = ['Andrés Felipe', 'María Camila', 'Juan David', 'Laura Valentina', 'Santiago', 'Daniela', 'Sebastián', 'Natalia', 'Carlos Eduardo', 'Valentina',
  'Juan Esteban', 'Paula Andrea', 'Nicolás', 'Sara Sofía', 'Diego Alejandro', 'Mariana', 'Julián', 'Ana María', 'Camilo', 'Luisa Fernanda', 'Mateo', 'Isabella',
  'Felipe', 'Juliana', 'Alejandro', 'Manuela', 'David Santiago', 'Catalina', 'Óscar Iván', 'Gabriela'];
const APELLIDOS = ['Rodríguez', 'Gómez', 'González', 'Martínez', 'García', 'López', 'Hernández', 'Sánchez', 'Ramírez', 'Pérez', 'Díaz', 'Torres', 'Rojas', 'Vargas',
  'Moreno', 'Castro', 'Jiménez', 'Muñoz', 'Ortiz', 'Herrera', 'Suárez', 'Romero', 'Ríos', 'Cárdenas', 'Mendoza', 'Pineda', 'Beltrán', 'Ospina', 'Salcedo', 'Quintero'];

/* Se asignan al generar el perfil */
let ESTUDIANTE = null;
let ASIGNATURAS = [];
let PLANES = [];

/* PRNG determinístico (mulberry32) */
function crearAzar(semilla) {
  let a = semilla >>> 0;
  const r = () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  r.ent = (min, max) => min + Math.floor(r() * (max - min + 1));
  r.uno = (lista) => lista[Math.floor(r() * lista.length)];
  r.mezclar = (lista) => { const l = [...lista]; for (let i = l.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [l[i], l[j]] = [l[j], l[i]]; } return l; };
  return r;
}

const fmtHora = (h) => `${String(h).padStart(2, '0')}:00`;

/* Horario de un grupo según créditos y componentes, sin cruces internos */
function generarSesiones(r, creditos, componentes, edificios) {
  const ed = r.uno(edificios);
  const aula = `${ed}-${r.ent(1, 4)}${String(r.ent(1, 15)).padStart(2, '0')}`;
  const sesiones = [];
  const add = (dia, ini, dur, tipo, salon = aula) => sesiones.push([dia, fmtHora(ini), fmtHora(ini + dur), salon, tipo]);

  if (creditos >= 6) {
    const [d1, d2] = r.uno([[1, 3], [2, 4], [3, 5]]);
    const ini = r.uno([7, 8, 14]);
    add(d1, ini, 4, 'CLASE MAGISTRAL'); add(d2, ini, 4, 'CLASE MAGISTRAL');
  } else if (creditos <= 2) {
    add(r.ent(1, 6), r.uno([7, 9, 11, 14, 16]), 2, 'CLASE MAGISTRAL');
  } else if (creditos === 3 && !componentes && r() < 0.2) {
    add(r.uno([5, 6]), r.uno([7, 8, 14]), 3, 'CLASE MAGISTRAL');
  } else {
    const par = r.uno([[1, 3], [2, 4], [1, 4], [3, 5]]);
    const ini = r.uno([7, 9, 11, 14, 16, 18]);
    par.forEach((d) => add(d, ini, 2, 'CLASE MAGISTRAL'));
    const libres = [1, 2, 3, 4, 5].filter((d) => !par.includes(d));
    const extras = [];
    if (componentes.includes('L')) extras.push(['CLASE LABORATORIO', `${ed}-Lab${r.ent(1, 4)}`]);
    if (componentes.includes('T')) extras.push(['CLASE TALLER', `${ed}-${r.ent(2, 3)}${String(r.ent(1, 15)).padStart(2, '0')}`]);
    if (!extras.length && creditos >= 4) extras.push(['CLASE MAGISTRAL', aula]);
    r.mezclar(libres).slice(0, extras.length).forEach((d, i) => add(d, r.uno([7, 9, 14, 16]), 2, extras[i][0], extras[i][1]));
  }
  return sesiones.map(([dia, inicio, fin, salon, tipo]) => ({ dia, inicio, fin, aula: salon, tipo }));
}

function generarPerfil(semilla) {
  const r = crearAzar(semilla);
  const carrera = r.uno(CARRERAS);
  const nombres = r.uno(NOMBRES);
  const profesor = () => `${r.uno(NOMBRES)} ${r.uno(APELLIDOS)} ${r.uno(APELLIDOS)}`;

  ESTUDIANTE = {
    nombre: `${nombres} ${r.uno(APELLIDOS)} ${r.uno(APELLIDOS)}`,
    nombreCorto: nombres,
    documento: `CC 1.0${r.ent(10, 99)}.${r.ent(100, 999)}.${r.ent(100, 999)}`,
    sede: 'Bogotá',
    facultad: carrera.facultad,
    plan: carrera.nombre,
    codigoPlan: carrera.codigoPlan,
    nivel: 'PREGRADO',
    papa: (3.3 + r() * 1.5).toFixed(1),
    pa: (3.4 + r() * 1.4).toFixed(1),
    avance: `${(25 + r() * 55).toFixed(1).replace('.', ',')}%`,
    criterios: {
      'Causal focalización': `GRUPO ${r.ent(1, 4)}`,
      'Causal': r.uno(['PEAMA/PAES/PAET', 'REGULAR', 'REGULAR', 'REGULAR']),
      'Pbase': '',
      'RII': r.uno(['SI', 'NO']),
      'Edificando': r.uno(['SI', 'NO', 'NO']),
      'Aleatorio': '',
      'IPA': '',
    },
  };
  PLANES = [{ nombre: carrera.nombre, nivel: 'PREGRADO', activo: true }];

  ASIGNATURAS = [];
  let consecutivo = 0;
  TIPOLOGIAS.forEach((tipologia) => {
    let lista = carrera[tipologia];
    // De las optativas disciplinares solo se ofertan algunas en cada periodo
    if (tipologia === 'Disciplinar optativa') lista = r.mezclar(lista).slice(0, r.ent(6, lista.length));
    lista.forEach((def) => {
      const [nombre, cred, componentes = '', codigo] = def.split('|');
      const creditos = Number(cred);
      const sinCupos = r() < 0.2;
      const nGrupos = r.uno([1, 1, 2, 2, 2, 3]);
      const grupos = Array.from({ length: nGrupos }, (_, i) => {
        const capacidad = r.uno([20, 25, 30, 35, 40, 45, 50, 60]);
        const t = r();
        const cupos = sinCupos ? 0 : t < 0.15 ? 0 : t < 0.3 ? r.ent(1, 2) : r.ent(3, Math.min(20, capacidad));
        return {
          numero: i + 1, cupos, capacidad, profesor: profesor(), duracion: 'Semestral', jornada: 'DIURNO',
          sesiones: generarSesiones(r, creditos, componentes, carrera.edificios),
        };
      });
      // Garantiza al menos un grupo con cupos si la asignatura no está marcada sin cupos
      if (!sinCupos && grupos.every((g) => g.cupos === 0)) grupos[0].cupos = r.ent(1, 10);
      const bloqueo = !sinCupos && tipologia.startsWith('Disciplinar') && r() < 0.1
        ? 'No cumple con los prerrequisitos establecidos para cursar la asignatura.' : undefined;
      ASIGNATURAS.push({
        codigo: codigo || String(carrera.base + (consecutivo++) * 7 + 3), nombre, creditos, tipologia, bloqueo, grupos,
      });
    });
  });
  ASIGNATURAS.sort((a, b) => TIPOLOGIAS.indexOf(a.tipologia) - TIPOLOGIAS.indexOf(b.tipologia) || a.nombre.localeCompare(b.nombre, 'es'));
  ASIGNATURAS.forEach((a, i) => { a.id = a.codigo; a.color = i; });
}

const nuevaSemilla = () => Math.floor(Math.random() * 2 ** 31);
