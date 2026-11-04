/* Datos de la simulación — Pulso Ciudadano
   Comentarios parafraseados del relevamiento real (oct–nov 2026),
   sin nombres ni identificadores. Escenarios 100% ilustrativos. */

const TOPICS = [
  { id: 'pozos',      name: 'ordenamiento Los Pozos', temp: 62, color: '#fbbf24' },
  { id: 'micros',     name: 'micros y tarifa Bs 3,50', temp: 48, color: '#fbbf24' },
  { id: 'inseguridad',name: 'inseguridad ciudadana',  temp: 40, color: '#fb923c' },
  { id: 'lluvias',    name: 'lluvias y anegamiento',  temp: 26, color: '#38bdf8' },
  { id: 'dengue',     name: 'dengue / fumigación',    temp: 14, color: '#34d399' },
  { id: 'cables',     name: 'robo de cables',         temp: 18, color: '#fb923c' },
  { id: 'bacheo',     name: 'plan de bacheo (+)',     temp: 30, color: '#34d399' },
];

const NETS = { fb: 'FB', x: 'X', wa: 'WA', tt: 'TT' };

const SRC_TYPES = {
  vecino: 'VECINO',
  video: 'VIDEO',
  foto: 'FOTO',
  prensa: 'PRENSA BARRIAL',
  camara: 'CÁMARA MUNICIPAL',
};

/* Ruido de fondo: el termómetro respira con esto. topic, tone, text, geo opcional */
const BG_FEED = [
  { topic: 'pozos', tone: 'apoyo',        net: 'fb', text: 'Por fin se puede caminar por la acera del mercado, era imposible pasar' },
  { topic: 'pozos', tone: 'escepticismo', net: 'fb', text: 'Si vinieran a la Villa se desmayan de ver tanto desastre, solo ordenan donde hay cámaras' },
  { topic: 'pozos', tone: 'burla',        net: 'tt', text: 'Ahora los comerciantes odian a Mamén porque pone orden jaja' },
  { topic: 'pozos', tone: 'enojo',        net: 'x',  text: 'Desalojan al que vende en la calle pero los casetas de concreto del mercado nuevo siguen ahí' },
  { topic: 'pozos', tone: 'denuncia',     net: 'fb', text: 'Ya se están reocupando las aceras de La Ramada, la reja no duró ni una semana' },
  { topic: 'micros', tone: 'escepticismo',net: 'fb', text: 'Los talleres llenos hoy, mañana vacíos. Todo es pa pintear nomas' },
  { topic: 'micros', tone: 'enojo',       net: 'x',  text: 'Bs 3,50 pagan por subirse a una lata sin frenos, la inspección es show' },
  { topic: 'micros', tone: 'apoyo',       net: 'fb', text: 'A mi micro lo pararon y le revisaron todo, que sigan así pero todos los días' },
  { topic: 'micros', tone: 'denuncia',    net: 'wa', text: 'Micro sin luz trasera en el cuarto anillo, línea 17, casi nos llevamos puesto un moto' , geo: '4to anillo' },
  { topic: 'inseguridad', tone: 'enojo',  net: 'fb', text: '¿Y los programas de seguridad de la alcaldía? Nada de plan, al contrario, se incrementa' },
  { topic: 'inseguridad', tone: 'denuncia', net: 'wa', text: 'Ojo por el segundo anillo, dos en moto arrebatando mochilas', geo: '2do anillo' },
  { topic: 'inseguridad', tone: 'enojo',  net: 'x',  text: 'Cinco mil policías para todo el departamento. Con razón andan como quieren' },
  { topic: 'lluvias', tone: 'denuncia',   net: 'fb', text: 'Vallecitos otra vez anegado, el agua no baja y los chicos saliendo igual', geo: 'Vallecitos' },
  { topic: 'lluvias', tone: 'escepticismo', net: 'x', text: 'Cada lluvia la misma foto de las mismas calles. El drenaje sigue igual' },
  { topic: 'dengue',  tone: 'apoyo',      net: 'fb', text: 'Fumigaron el cementerio del barrio hoy, ojalá pasen también por el mercado' },
  { topic: 'dengue',  tone: 'denuncia',   net: 'wa', text: 'Por el D-9 hay llantas con agua en el solar abandonado, criadero de zancudos', geo: 'D-9' },
  { topic: 'cables',  tone: 'denuncia',   net: 'fb', text: 'Se robaron los cables del alumbrado del parque, toda la cuadra a oscuras', geo: 'D-6' },
  { topic: 'cables',  tone: 'enojo',      net: 'x',  text: 'Semáforos apagados por robo de cables en el 5to anillo, un accidente esperando' },
  { topic: 'bacheo',  tone: 'apoyo',      net: 'fb', text: 'Por fin taparon el cráter de la radial, dos meses duró' },
  { topic: 'bacheo',  tone: 'burla',      net: 'tt', text: 'El bacheo más rápido de la historia: lo hicieron el día que pasó la comitiva' },
];

/* ── Escenario 1: ataque armado ──
   t = segundos de reloj de simulación desde el disparo.
   Cada paso: feed (post), photo (foto ciudadana), source (suma veracidad),
   status, geo, route, call110, gain. */
/* Coordenadas reales aproximadas (simulación) — centro: Plaza 24 de Septiembre */
const SCZ_CENTER = [-17.7835, -63.1821];

const SC_ASALTO = {
  id: 'asalto',
  title: 'Ataque armado en vía pública',
  place: 'Av. Banzer km 5,5 · zona Norte',
  mapPoint: { x: 118, y: 44 },          /* punto en el mapa de anillos (fallback) */
  loc: [-17.7462, -63.1698],
  topic: 'inseguridad',
  zone: 'norte', stype: 'violencia',
  steps: [
    { t: 0,  kind: 'feed', net: 'wa', tone: 'panico',
      text: 'Están tirando bala por la Banzer, me metí a una tienda, no sé qué pasa',
      geo: 'Av. Banzer' },
    { t: 2,  kind: 'status', status: 'DETECTADO', pattern: 'posible incidente violento — 1 señal' },
    { t: 5,  kind: 'feed', net: 'fb', tone: 'panico',
      text: 'Gente corriendo del estacionamiento del pasaje, algo feo pasó ahí',
      geo: 'Av. Banzer' },
    { t: 6,  kind: 'photo', scene: 'street', label: 'vecina · desde 2do piso · 20:41' },
    { t: 7,  kind: 'source', type: 'vecino', desc: 'post vecino (WA zona norte)', pts: 22, v: 22, geo: 480 },
    { t: 10, kind: 'feed', net: 'tt', tone: 'denuncia',
      text: 'Video: tres sujetos en moto, uno apuntaba. Se fueron hacia el 6to anillo',
      geo: 'Av. Banzer' },
    { t: 11, kind: 'source', type: 'video', desc: 'video ciudadano (TT)', pts: 19, v: 41, geo: 320 },
    { t: 12, kind: 'status', status: 'CORROBORANDO', pattern: 'detonaciones + huida motorizada' },
    { t: 15, kind: 'feed', net: 'fb', tone: 'panico',
      text: 'Mi cuñado estaba ahí, dice que asaltaron el joyería del pasaje a mano armada',
      geo: 'zona Norte' },
    { t: 16, kind: 'photo', scene: 'chaos', label: 'transeúnte · estacionamiento · 20:44' },
    { t: 17, kind: 'source', type: 'foto', desc: 'foto ciudadana + testimonio', pts: 22, v: 63, geo: 210 },
    { t: 20, kind: 'feed', net: 'x', tone: 'denuncia',
      text: 'PRENSA BARRIAL: asalto armado confirmado en pasaje comercial, Av. Banzer km 5,5. Herido en la entrada',
      geo: 'Av. Banzer km 5,5' },
    { t: 21, kind: 'source', type: 'prensa', desc: 'prensa barrial (X)', pts: 15, v: 78, geo: 120 },
    { t: 22, kind: 'status', status: 'ALARMA', pattern: 'arma de fuego + huida motorizada + herido',
      route: { body: 'POLICÍA BOLIVIANA', why: 'patrón: arma de fuego + huida en moto → comando zona norte', sec: 'secundario: SEAC / ambulancia — 1 herido reportado' },
      alarm: true },
    { t: 26, kind: 'photo', scene: 'flashes', label: 'vecino · llegada de patrullas · 20:46' },
    { t: 27, kind: 'source', type: 'camara', desc: 'cámara municipal 4to anillo', pts: 13, v: 91, geo: 60 },
    { t: 28, kind: 'status', status: 'VERIFICADO' },
    { t: 34, kind: 'call110' },
    { t: 38, kind: 'gain', first: '20:41', official: '20:55', mins: 14 },
  ],
};

/* ── Escenario 2: anegamiento ── */
const SC_LLUVIA = {
  id: 'lluvia',
  title: 'Anegamiento con familias aisladas',
  place: 'Valle Hermoso, D-11',
  mapPoint: { x: 66, y: 152 },
  loc: [-17.7598, -63.1455],
  topic: 'lluvias',
  zone: 'este', stype: 'inundación',
  steps: [
    { t: 0,  kind: 'feed', net: 'fb', tone: 'denuncia',
      text: 'El canal de Valle Hermoso se desbordó, el agua ya entró a las casas de la primera cuadra',
      geo: 'Valle Hermoso' },
    { t: 3,  kind: 'status', status: 'DETECTADO', pattern: 'posible emergencia hídrica — 1 señal' },
    { t: 6,  kind: 'photo', scene: 'flood', label: 'vecino · canal desbordado · 20:52' },
    { t: 7,  kind: 'source', type: 'foto', desc: 'foto ciudadana (FB)', pts: 20, v: 20, geo: 500 },
    { t: 9,  kind: 'feed', net: 'wa', tone: 'panico',
      text: 'Hay familias que no pueden salir en la calle 8, el agua llega a la cintura',
      geo: 'Valle Hermoso' },
    { t: 10, kind: 'source', type: 'vecino', desc: '2° reporte vecino (WA)', pts: 21, v: 41, geo: 350 },
    { t: 12, kind: 'status', status: 'CORROBORANDO', pattern: 'desborde + viviendas afectadas + personas aisladas' },
    { t: 15, kind: 'feed', net: 'x', tone: 'denuncia',
      text: 'PRENSA BARRIAL: anegamiento severo en Valle Hermoso D-11, se pide Defensa Civil',
      geo: 'Valle Hermoso D-11' },
    { t: 16, kind: 'source', type: 'prensa', desc: 'prensa barrial (X)', pts: 24, v: 65, geo: 160 },
    { t: 18, kind: 'photo', scene: 'flood2', label: 'vecina · calle 8 · 20:57' },
    { t: 19, kind: 'source', type: 'video', desc: 'segunda fuente visual', pts: 16, v: 81, geo: 90 },
    { t: 20, kind: 'status', status: 'ALARMA', pattern: 'inundación en curso + personas aisladas',
      route: { body: 'DEFENSA CIVIL / SEAC', why: 'patrón: inundación + familias aisladas → rescate y evacuación', sec: 'secundario: Guardia Municipal — cierre de vías aledañas' },
      alarm: true },
    { t: 25, kind: 'source', type: 'camara', desc: 'estación hidrológica Piraí confirma pico', pts: 12, v: 93, geo: 70 },
    { t: 26, kind: 'status', status: 'VERIFICADO' },
    { t: 32, kind: 'call110' },
    { t: 36, kind: 'gain', first: '20:51', official: '21:09', mins: 18 },
  ],
};

const BODIES = {
  'POLICÍA BOLIVIANA': 'Comando departamental — red de emergencias',
  'DEFENSA CIVIL / SEAC': 'Coordinación de emergencias municipales',
  'BOMBEROS': 'Bomberos — red de emergencias',
  'GUARDIA MUNICIPAL': 'Despacho de la Guardia Municipal',
  'TRÁNSITO': 'Dirección de Tránsito y Transporte',
  'SALUD (SEDES)': 'SEDES — vigilancia epidemiológica',
  'ALUMBRADO PÚBLICO': 'Empresa de alumbrado — cuadrillas',
};

/* Zonas de la ciudad sobre el mapa de anillos.
   Wedges anulares: centro (r<24) + 4 cuadrantes N/E/S/O (24..108). */
const ZONES = [
  { id: 'centro', name: 'Centro · casco viejo y mercados', kind: 'circle', r: 24,
    b1: 0, b2: 360,
    temp: 58, topic: 'ordenamiento Los Pozos' },
  { id: 'norte', name: 'Norte · Av. Banzer / Urubó', a1: -135, a2: -45,
    b1: -45, b2: 45,
    temp: 47, topic: 'inseguridad ciudadana' },
  { id: 'este', name: 'Este · Paurito / Valle Hermoso', a1: -45, a2: 45,
    b1: 45, b2: 135,
    temp: 39, topic: 'lluvias y anegamiento' },
  { id: 'sur', name: 'Sur · El Torno / Abasto', a1: 45, a2: 135,
    b1: 135, b2: 225,
    temp: 44, topic: 'micros y tarifa' },
  { id: 'oeste', name: 'Oeste · Pampa de la Isla / El Bajío', a1: 135, a2: 225,
    b1: 225, b2: 315,
    temp: 33, topic: 'robo de cables' },
];

const GEO_ZONE = {
  'Av. Banzer': 'norte', 'zona Norte': 'norte', 'Av. Banzer km 5,5': 'norte',
  '4to anillo': 'norte', '6to anillo': 'norte',
  'Valle Hermoso': 'este', 'Valle Hermoso D-11': 'este', 'Vallecitos': 'este',
  'La Ramada': 'centro', '2do anillo': 'centro', 'mercado': 'centro',
  'D-8': 'oeste', 'D-6': 'oeste', 'radial': 'oeste',
  'D-9': 'sur', '5to anillo': 'sur',
};

/* Casos menores que el sistema deriva solo, en segundo plano.
   Alimentan la estadística mientras corre el demo. */
const CASE_POOL = [
  { type: 'infraestructura', body: 'ALUMBRADO PÚBLICO', zone: 'oeste', geo: 'radial',
    loc: [-17.7960, -63.2180],
    text: 'Poste de alumbrado caído sobre la radial, un carril bloqueado' },
  { type: 'incendio', body: 'BOMBEROS', zone: 'centro', geo: 'mercado',
    loc: [-17.7760, -63.1798],
    text: 'Humo denso saliendo de una caseta del mercado, posible corto' },
  { type: 'robo', body: 'POLICÍA BOLIVIANA', zone: 'sur', geo: 'D-9',
    loc: [-17.8150, -63.1910],
    text: 'Vecinos reportan arrebatos en moto frente al canal del D-9' },
  { type: 'inundación', body: 'DEFENSA CIVIL / SEAC', zone: 'este', geo: 'Vallecitos',
    loc: [-17.7940, -63.1500],
    text: 'El canal sube rápido en Vallecitos, dos casas con agua adentro' },
  { type: 'tránsito', body: 'TRÁNSITO', zone: 'norte', geo: '6to anillo',
    loc: [-17.7310, -63.1810],
    text: 'Choque en el 6to anillo, dos carriles bloqueados sentido norte' },
  { type: 'salud', body: 'SALUD (SEDES)', zone: 'sur', geo: 'D-9',
    loc: [-17.8180, -63.1860],
    text: 'Solar abandonado con llantas y agua estancada: criadero de zancudos' },
  { type: 'infraestructura', body: 'GUARDIA MUNICIPAL', zone: 'centro', geo: 'La Ramada',
    loc: [-17.7915, -63.1815],
    text: 'Reocupación de aceras en La Ramada, comerciantes vuelven a instalar toldos' },
];
