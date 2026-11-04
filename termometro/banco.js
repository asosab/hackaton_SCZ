/* Banco de datos — Pulso Ciudadano
   Relevamiento real (oct–nov 2026).
   Fuentes:
   - Facebook público: captions y engagement leídos en embeds de reels y
     posts (RÚA vía rua.com.bo, Red Uno, PST, Palabra de Vecino,
     Noticiero Vecinal, GAMSC). Comentarios FB citados del relevamiento
     manual del proyecto.
   - YouTube: comentarios de videos y transmisiones en vivo de medios
     cruceños (Unitel, Monitoreo Gamscz, Red Uno, PAT, Gigavisión,
     Página Siete, Bolivisión, PST) — la misma conversación que corre
     en Facebook.
   Regla del proyecto: cero nombres de personas; comentarios
   anonimizados y parafraseados. Las cifras son el engagement medido
   en las publicaciones reales. */

/* ── publicaciones reales con engagement medido ── */
const BANCO_POSTS = [
  /* Facebook — ordenamiento Los Pozos / Los Cachis */
  { src: 'RÚA (FB)', tipo: 'reel', tema: 'pozos', fecha: '2026-10-19',
    texto: 'La acera no es depósito — operativo de ordenamiento en Los Pozos',
    reacciones: '41,6 mil', comentarios: '2,8 mil', compartidos: '1,4 mil' },
  { src: 'Red Uno (FB)', tipo: 'post', tema: 'pozos', fecha: '2026-10-17',
    texto: 'Operativo en Los Pozos deja 34 arrestados y busca recuperar espacios públicos',
    reacciones: '2 mil', comentarios: '353', compartidos: '73' },
  { src: 'Noticiero Vecinal (FB)', tipo: 'post', tema: 'pozos', fecha: '2026-10-30',
    texto: 'La Ramada: caos gremial tras operativo de control',
    reacciones: '14', comentarios: '1', compartidos: '92' },

  /* Facebook — transporte / micros */
  { src: 'PST (FB)', tipo: 'post', tema: 'micros', fecha: '2026-11-02',
    texto: 'Inspección a micros tras vencer el plazo de refacción',
    reacciones: '8,8 mil', comentarios: '1,3 mil', compartidos: '536' },
  { src: 'PST (FB)', tipo: 'post', tema: 'micros', fecha: '2026-11-02',
    texto: 'Inspección a micros (versión en página oficial)',
    reacciones: '342', comentarios: '89', compartidos: '15' },

  /* Facebook — inseguridad */
  { src: 'Palabra de Vecino (FB)', tipo: 'post', tema: 'inseguridad', fecha: '2026-10-31',
    texto: 'Asalto a joyería en mall, noche de Halloween',
    reacciones: '86', comentarios: '11', compartidos: '25' },
  { src: 'RÚA (FB)', tipo: 'reel', tema: 'inseguridad', fecha: '2026-10-21',
    texto: 'Vecino sorprende a menores de edad que le robaron la moto en Santa Cruz',
    reacciones: '9,1 mil', comentarios: '1,3 mil', compartidos: '2 mil' },
  { src: 'RÚA (FB)', tipo: 'reel', tema: 'inseguridad', fecha: '2026-10-19',
    texto: 'Operaban de noche y apuñalaron a tres personas para robarles: FELCC desarticula banda',
    reacciones: '6,8 mil', comentarios: '590', compartidos: '1,1 mil' },
  { src: 'RÚA (FB)', tipo: 'reel', tema: 'inseguridad', fecha: '2026-10-21',
    texto: 'Delincuentes de 15 y 16 años planeaban trasladar la moto robada hasta Ivirgazama',
    reacciones: '8,7 mil', comentarios: '187', compartidos: '443' },
  { src: 'RÚA (FB)', tipo: 'reel', tema: 'inseguridad', fecha: '2026-10-16',
    texto: 'Le robaron su moto en Santa Cruz: víctima sorprende a los delincuentes',
    reacciones: '2,2 mil', comentarios: '80', compartidos: '210' },
  { src: 'RÚA (FB)', tipo: 'reel', tema: 'inseguridad', fecha: '2026-10-18',
    texto: 'Ataque con arma blanca en inmediaciones del mercado Germán Moreno',
    reacciones: '1,4 mil', comentarios: '85', compartidos: '179' },
  { src: 'RÚA (FB)', tipo: 'reel', tema: 'inseguridad', fecha: '2026-10-17',
    texto: 'Cerrajero acuchillado afuera de un local: reconoció a quienes lo apuñalaron',
    reacciones: '787', comentarios: '46', compartidos: '103' },
  { src: 'RÚA (FB)', tipo: 'reel', tema: 'inseguridad', fecha: '2026-10-18',
    texto: 'Conductor ebrio que desfiguró el rostro a una abuelita queda detenido',
    reacciones: '726', comentarios: '18', compartidos: '110' },
  { src: 'RÚA (FB)', tipo: 'reel', tema: 'inseguridad', fecha: '2026-10-15',
    texto: '«Grupículo de pelaus sin oficio»: pandillas protagonizaron enfrentamiento',
    reacciones: '494', comentarios: '34', compartidos: '60' },

  /* Facebook — otros temas medidos */
  { src: 'GAMSC (FB)', tipo: 'post', tema: 'cables', fecha: '2026-10-29',
    texto: 'Denuncia robo masivo de cables que afecta el alumbrado público',
    reacciones: '≤11', comentarios: '≤1', compartidos: '—' },
  { src: 'GAMSC (FB)', tipo: 'post', tema: 'dengue', fecha: '2026-10-25',
    texto: 'Fumigación contra el dengue en distritos y cementerios',
    reacciones: '≤16', comentarios: '≤4', compartidos: '≤4' },
  { src: 'Emacruz (FB)', tipo: 'post', tema: 'basura', fecha: '2026-09-30',
    texto: 'Comunicados institucionales de recolección',
    reacciones: '214–416', comentarios: '17–59', compartidos: '83–187' },

  /* YouTube — medios cruceños (vistas reales medidas) */
  { src: 'Unitel Bolivia (YT)', tipo: 'video', tema: 'pozos', fecha: '2026-10-17',
    texto: 'Alcaldía cruceña despliega operativo en Los Pozos para recuperar aceras',
    vistas: '8,1 mil', comentarios: '12' },
  { src: 'Popu Stream (YT)', tipo: 'video', tema: 'pozos', fecha: '2026-10-19',
    texto: '¡Agredieron a Mamén Saavedra en Los Pozos!',
    vistas: '10,7 mil', comentarios: '19' },
  { src: 'Unitel Bolivia (YT)', tipo: 'video', tema: 'inseguridad', fecha: '2026-10-12',
    texto: 'Asaltan joyería ubicada en un centro comercial de la av. Busch',
    vistas: '6 mil', comentarios: '4' },
  { src: 'Unitel Bolivia (YT)', tipo: 'video', tema: 'pozos', fecha: '2026-10-18',
    texto: 'Ambulantes volvieron a ocupar el antiguo mercado La Ramada',
    vistas: '4,4 mil', comentarios: '6' },
  { src: 'Unitel Bolivia (YT)', tipo: 'video', tema: 'micros', fecha: '2026-11-02',
    texto: 'Micreros cobran Bs 3,50 pese a que la ley aún no lo autoriza',
    vistas: '—', comentarios: '10' },
  { src: 'EN VIVO FANS (YT)', tipo: 'video', tema: 'pozos', fecha: '2026-10-20',
    texto: 'Astutas pícaras roban en peso del producto: control de balanzas con el alcalde',
    vistas: '—', comentarios: '24' },
  { src: 'Unitel Bolivia (YT)', tipo: 'video', tema: 'lluvias', fecha: '2026-06-10',
    texto: 'Lluvia intensa deja calles inundadas y anegadas en Santa Cruz',
    vistas: '—', comentarios: '0' },
  { src: 'Página Siete (YT)', tipo: 'video', tema: 'lluvias', fecha: '2026-06-12',
    texto: 'Casas y calles de Santa Cruz amanecen inundadas tras intensa lluvia',
    vistas: '—', comentarios: '24' },
];

/* ── transmisiones en vivo detectadas ──
   Canales que emiten operativos, noticiarios y monitoreo municipal. */
const BANCO_LIVES = [
  { canal: 'Monitoreo Gamscz', plataforma: 'yt', fecha: '2026-10-17', tema: 'pozos',
    titulo: 'Manuel Saavedra: operativos municipales y policiales en Los Pozos (transmisión)' },
  { canal: 'Monitoreo Gamscz', plataforma: 'yt', fecha: '2026-10-17', tema: 'pozos',
    titulo: 'Municipio interviene los alrededores del mercado Los Pozos (transmisión)' },
  { canal: 'Monitoreo Gamscz', plataforma: 'yt', fecha: '2026-10-08', tema: 'lluvias',
    titulo: 'Cada que llueve en Santa Cruz los barrios Los Vallecitos quedan bajo agua' },
  { canal: 'Monitoreo Gamscz', plataforma: 'yt', fecha: '2026-10-03', tema: 'micros',
    titulo: 'El pasaje de micro a Bs 3,50 en Santa Cruz (transmisión)' },
  { canal: 'Monitoreo Gamscz', plataforma: 'yt', fecha: '2026-10-03', tema: 'micros',
    titulo: 'Ya los micros cobran la nueva tarifa (transmisión)' },
  { canal: 'Monitoreo Gamscz', plataforma: 'yt', fecha: '2026-10-05', tema: 'micros',
    titulo: 'Municipio oficializa tarifa del transporte público en Bs 3,50' },
  { canal: 'Monitoreo Gamscz', plataforma: 'yt', fecha: '2026-10-03', tema: 'micros',
    titulo: 'Ciudadanía cuestiona los Bs 3,50 (transmisión)' },
  { canal: 'Red Uno', plataforma: 'yt+fb', fecha: '2026-10-16', tema: 'pozos',
    titulo: 'Notivisión Meridiano en vivo — cobertura de los operativos' },
  { canal: 'Red Uno', plataforma: 'yt+fb', fecha: '2026-10-05', tema: 'varios',
    titulo: 'Notivisión Central en vivo' },
  { canal: 'Unitel', plataforma: 'yt+fb', fecha: '2026-11-03', tema: 'varios',
    titulo: 'La Noticia del Momento — en vivo' },
  /* Páginas que transmiten en vivo por Facebook (relevamiento manual) */
  { canal: 'RÚA', plataforma: 'fb', fecha: 'oct 2026', tema: 'inseguridad',
    titulo: 'Coberturas en vivo de hechos policiales y operativos' },
  { canal: 'Palabra de Vecino', plataforma: 'fb', fecha: 'oct 2026', tema: 'varios',
    titulo: 'Transmisiones en vivo de eventos sociales y denuncias vecinales' },
  { canal: 'GAMSC / alcaldía', plataforma: 'fb', fecha: 'oct–nov 2026', tema: 'pozos',
    titulo: 'Lives del alcalde durante operativos de ordenamiento' },
  { canal: 'PST', plataforma: 'fb', fecha: 'nov 2026', tema: 'micros',
    titulo: 'Cobertura de la inspección a micros (post viral 8,8 mil)' },
];

/* ── cronología real de eventos — base para replay ── */
const BANCO_EVENTOS = [
  { fecha: '2026-10-16', tema: 'pozos', zona: 'centro',
    evento: 'Operativo Plan Alto Impacto en Los Pozos: 33–34 arrestados, 3 guardias heridos, camioneta edil dañada' },
  { fecha: '2026-10-17', tema: 'pozos', zona: 'centro',
    evento: 'Intervención a Los Cachis con ~150 funcionarios; el alcalde anuncia procesos contra compradores de artículos robados' },
  { fecha: '2026-10-19', tema: 'pozos', zona: 'centro',
    evento: 'El alcalde es agredido durante el control; El Arenal queda como base de operaciones permanentes' },
  { fecha: '2026-10-21', tema: 'pozos', zona: 'centro',
    evento: 'Séptimo día de operativos: coordinación con Fiscalía contra venta de objetos robados' },
  { fecha: '2026-10-30', tema: 'pozos', zona: 'centro',
    evento: 'Un presunto gendarme municipal es grabado robando mercadería en La Ramada' },
  { fecha: '2026-10-03', tema: 'micros', zona: 'toda la ciudad',
    evento: 'Los micros empiezan a cobrar Bs 3,50 antes de la gaceta oficial' },
  { fecha: '2026-10-05', tema: 'micros', zona: 'toda la ciudad',
    evento: 'Municipio oficializa la tarifa transitoria de Bs 3,50; 60 días para registrar unidades' },
  { fecha: '2026-10-27', tema: 'micros', zona: 'toda la ciudad',
    evento: 'Paro de transporte confirmado por un día; los pasajeros pagan hasta Bs 6 o usan apps' },
  { fecha: '2026-11-03', tema: 'micros', zona: 'sur',
    evento: 'Inspección en parada de la línea 19 (Villa 1ro de Mayo): 30 unidades revisadas, una retirada; arranca censo de ~12.000 micros' },
  { fecha: '2026-10-12', tema: 'inseguridad', zona: 'norte',
    evento: 'Asalto a joyería en centro comercial de la av. Busch, en horario de mall' },
  { fecha: '2026-10-31', tema: 'inseguridad', zona: 'norte',
    evento: 'Otro atraco a joyería en mall en noche de Halloween; detienen a una empleada por presunta complicidad' },
  { fecha: '2026-10-29', tema: 'cables', zona: 'oeste',
    evento: 'Alcaldía denuncia robo masivo de cables que afecta alumbrado y semáforos; habilita línea gratuita de denuncia' },
  { fecha: '2026-10-08', tema: 'lluvias', zona: 'este',
    evento: 'Lluvias dejan barrios Los Vallecitos bajo el agua; se abre zanja para bajar el nivel' },
  { fecha: '2026-11-03', tema: 'pozos', zona: 'centro',
    evento: 'Operativo de Interpol en alojamientos de la zona de Los Pozos: dos mujeres aprehendidas con sustancias' },
  { fecha: '2026-10-20', tema: 'pozos', zona: 'este',
    evento: 'Denuncian ~70 ha avasalladas en el Jardín Botánico y casetas de concreto en áreas comunes del mercado nuevo Los Pozos' },
];

/* ── comentarios reales anonimizados, por tema y tono ── */
const BANCO_COMENTARIOS = [
  /* — pozos: apoyo al ordenamiento — */
  { topic: 'pozos', tone: 'apoyo', net: 'yt', text: 'Ya hay orden, antes no se podía pasar: era un kilombo ahí' },
  { topic: 'pozos', tone: 'apoyo', net: 'yt', text: 'Orden para todos, y los corruptos a Chonchocoro' },
  { topic: 'pozos', tone: 'apoyo', net: 'fb', text: 'La acera es para que camine la gente, no para sacar la mercadería' },
  { topic: 'pozos', tone: 'apoyo', net: 'yt', text: 'Bien Mamén, es hora de ordenar los espacios públicos' },
  { topic: 'pozos', tone: 'apoyo', net: 'fb', text: 'Este alcalde sí que trabaja, ojalá hubiera más así' },
  { topic: 'pozos', tone: 'apoyo', net: 'yt', text: 'En todos los mercados deberían hacerse estos controles' },
  { topic: 'pozos', tone: 'apoyo', net: 'fb', text: 'Ya está haciendo obras, miren el micropavimento de la Banzer' },
  { topic: 'pozos', tone: 'apoyo', net: 'yt', text: 'Tienen que darle protección al alcalde y a su familia, urgente' },
  { topic: 'pozos', tone: 'apoyo', net: 'fb', text: 'Merecen clausura inmediata los que alteran las balanzas' },
  { topic: 'pozos', tone: 'apoyo', net: 'yt', text: 'Los comerciantes legales pagan impuestos; los de la acera, ni un peso' },
  /* — pozos: escepticismo y selectividad — */
  { topic: 'pozos', tone: 'escepticismo', net: 'fb', text: 'Pan y circo: el tolderío de La Ramada sigue y ahí la acera también es comercio' },
  { topic: 'pozos', tone: 'escepticismo', net: 'yt', text: 'Se corre la voz cuando viene la inspección; apenas sale el concejal todo vuelve' },
  { topic: 'pozos', tone: 'escepticismo', net: 'fb', text: 'Mamén es puro bla bla bla, obras nada' },
  { topic: 'pozos', tone: 'escepticismo', net: 'fb', text: 'Confiscan la balanza arreglada y en cuanto se va el inspector la vuelven a mañar' },
  { topic: 'pozos', tone: 'escepticismo', net: 'fb', text: 'Con los peces gordos se baja la pollera; con los micreros sí hay mano dura' },
  { topic: 'pozos', tone: 'escepticismo', net: 'yt', text: 'Se hace al guapo con los de abajo; con los de cuello blanco ni ahí llega' },
  { topic: 'pozos', tone: 'escepticismo', net: 'fb', text: 'El alcalde mismo lo dijo: hacen esto y se quedan para siempre' },
  { topic: 'pozos', tone: 'escepticismo', net: 'fb', text: 'Del Plan Alto Impacto, 9 de 34 detenidos estaban en situación de calle: orden o castigo?' },
  /* — pozos: enojo y defensa de comerciantes — */
  { topic: 'pozos', tone: 'enojo', net: 'fb', text: 'La gente humilde necesita vender, vive del día y no llega ni al mínimo' },
  { topic: 'pozos', tone: 'enojo', net: 'yt', text: 'Alcalde, ahora da empleo a la gente a la que le quitas el pan de la boca' },
  { topic: 'pozos', tone: 'enojo', net: 'yt', text: 'Antes vendían y abastecían a sus hijos; en los mercados nuevos no se vende nada' },
  { topic: 'pozos', tone: 'enojo', net: 'fb', text: 'Los gendarmes municipales son iguales que los paco ladrones' },
  { topic: 'pozos', tone: 'enojo', net: 'yt', text: 'Los pollos al aire libre, qué ignorancia; que los retiren, multen y cierren el negocio una semana' },
  /* — pozos: burlas y denuncias — */
  { topic: 'pozos', tone: 'burla', net: 'yt', text: 'Mamén = Mamón' },
  { topic: 'pozos', tone: 'burla', net: 'yt', text: 'Saavedra es un payaso' },
  { topic: 'pozos', tone: 'burla', net: 'tt', text: 'Mamén va preso o va presidente, depende de quién leas' },
  { topic: 'pozos', tone: 'denuncia', net: 'fb', text: 'Un gendarme grabado robando mercadería en La Ramada, y a quién le creés' },
  { topic: 'pozos', tone: 'denuncia', net: 'fb', text: 'Los dirigentes gremiales son dueños de los negocios informales y controlan todo' },
  { topic: 'pozos', tone: 'denuncia', net: 'yt', text: 'Todos tienen alteradas las balanzas; qué casualidad que nunca es a favor del cliente' },
  { topic: 'pozos', tone: 'denuncia', net: 'fb', text: 'Casetas de concreto en áreas comunes del mercado nuevo Los Pozos, lo denunció la concejal' },
  { topic: 'pozos', tone: 'denuncia', net: 'fb', text: 'Avasallan como 70 hectáreas del Jardín Botánico y nadie controla', geo: 'Jardín Botánico' },
  { topic: 'pozos', tone: 'denuncia', net: 'yt', text: 'Informales y tercos: venden donde sea, ya se reocupó todo' },
  { topic: 'pozos', tone: 'denuncia', net: 'fb', text: 'En el mercado Fortaleza Sur las balanzas están adulteradas y la carne carísima', geo: 'Fortaleza' },
  /* — micros: escepticismo — */
  { topic: 'micros', tone: 'escepticismo', net: 'yt', text: 'Está acordado pero no autorizado aún; se pasan la ley por donde quieren' },
  { topic: 'micros', tone: 'escepticismo', net: 'yt', text: 'Compromiso no sirve de nada, tiene que ser vinculante' },
  { topic: 'micros', tone: 'escepticismo', net: 'yt', text: '20 años de subvención, los dueños se llenaron de micros y no quieren apretarse el cinturón' },
  { topic: 'micros', tone: 'escepticismo', net: 'fb', text: 'Los chapistas tardan dos semanas por piso; el 20% no llegó al plazo y no es excusa' },
  { topic: 'micros', tone: 'escepticismo', net: 'yt', text: '3,50 me parece bien, pero con movilidades nuevas como en otras ciudades, no estas latas' },
  /* — micros: denuncia — */
  { topic: 'micros', tone: 'denuncia', net: 'yt', text: 'A la tercera edad les siguen cobrando 3,50; reclamé y nada' },
  { topic: 'micros', tone: 'denuncia', net: 'yt', text: 'Solo el 20% de los micros paga impuestos en la ciudad, el resto lo hace en otro municipio' },
  { topic: 'micros', tone: 'denuncia', net: 'yt', text: 'El censo debería registrar quiénes trabajan con diésel, gasolina, gas o eléctricos' },
  { topic: 'micros', tone: 'denuncia', net: 'fb', text: 'Cobraban 3,50 desde antes de que saliera la gaceta oficial' },
  /* — micros: enojo — */
  { topic: 'micros', tone: 'enojo', net: 'yt', text: 'Bs 3 ya era caro, ahora es re caro: la nueva alcaldía igual o peor que la anterior' },
  { topic: 'micros', tone: 'enojo', net: 'yt', text: '3,50 y encima te llevan parado, que dicen?' },
  { topic: 'micros', tone: 'enojo', net: 'yt', text: 'Los políticos con sueldo jugoso no sienten el dieselazo; ellos no usan transporte público' },
  { topic: 'micros', tone: 'enojo', net: 'yt', text: 'Ayer caminé todo para trabajar y encima gasté en Yango; ni transporte había' },
  { topic: 'micros', tone: 'enojo', net: 'fb', text: 'Los ciudadanos también marchamos, pero para abuchear a los transportistas' },
  { topic: 'micros', tone: 'enojo', net: 'yt', text: 'Pagar 3 ya era demasiado por lo que dan; que el alcalde no apoye este tongo' },
  /* — micros: burlas y propuestas — */
  { topic: 'micros', tone: 'burla', net: 'yt', text: 'El eterno sindicalero: mejoró el servicio o las condiciones de los choferes? Nada' },
  { topic: 'micros', tone: 'burla', net: 'yt', text: 'Este dirigente es millonario, tiene su full vagoneta' },
  { topic: 'micros', tone: 'apoyo', net: 'yt', text: 'Que obliguen conversión a gas o buses eléctricos como en Cochabamba y listo' },
  { topic: 'micros', tone: 'apoyo', net: 'yt', text: 'Que exijan pago con tarjeta y sueldo fijo para choferes, como en otros países' },
  { topic: 'micros', tone: 'apoyo', net: 'yt', text: 'Que la alcaldía ponga buses eléctricos: mejora el tráfico y no el caos actual' },
  /* — inseguridad — */
  { topic: 'inseguridad', tone: 'burla', net: 'yt', text: 'Como en GTA 5' },
  { topic: 'inseguridad', tone: 'burla', net: 'yt', text: 'Sobrevive y correr a los chicharones, nada más sabe la policía' },
  { topic: 'inseguridad', tone: 'enojo', net: 'yt', text: 'Y la policía? esos no sirven para nada' },
  { topic: 'inseguridad', tone: 'enojo', net: 'yt', text: 'Pena de muerte para estos ladrones, pero ya' },
  { topic: 'inseguridad', tone: 'enojo', net: 'fb', text: 'Doce ataques armados en semanas y la policía dice crimen organizado, y la prevención?' },
  { topic: 'inseguridad', tone: 'denuncia', net: 'fb', text: 'Vecinos quemaron la casa del presunto asesino: la gente ya hace justicia sola', geo: 'Pampa de la Isla' },
  { topic: 'inseguridad', tone: 'escepticismo', net: 'yt', text: 'Bien hecho dicen unos, pero ya no hay evidencia' },
  { topic: 'inseguridad', tone: 'denuncia', net: 'wa', text: 'Ojo por el mercado Germán Moreno, ataque con cuchillo esta mañana', geo: 'Germán Moreno' },
  { topic: 'inseguridad', tone: 'denuncia', net: 'wa', text: 'Menores de edad robando motos, los sorprendieron y eran de 15 y 16' },
  { topic: 'inseguridad', tone: 'denuncia', net: 'wa', text: 'Apuñalaron a tres de noche para robarles; desarticularon la banda por suerte' },
  { topic: 'inseguridad', tone: 'denuncia', net: 'fb', text: 'Atracan a plena luz en la Pampa y la familia tiene que pedir ayuda porque nadie viene', geo: 'Pampa de la Isla' },
  /* — lluvias / anegamiento — */
  { topic: 'lluvias', tone: 'denuncia', net: 'yt', text: 'Cada que llueve los barrios Los Vallecitos quedan bajo el agua', geo: 'Vallecitos' },
  { topic: 'lluvias', tone: 'denuncia', net: 'yt', text: 'Casas y calles amanecieron inundadas, el canal de drenaje se desbordó' },
  { topic: 'lluvias', tone: 'denuncia', net: 'fb', text: 'Valle Hermoso sigue anegado por el desborde del río, calles intransitables', geo: 'Valle Hermoso' },
  { topic: 'lluvias', tone: 'denuncia', net: 'yt', text: 'Llovió horas sin parar y el drenaje no dio abasto otra vez' },
  { topic: 'lluvias', tone: 'apoyo', net: 'fb', text: 'Abrieron una zanja en Los Vallecitos para bajar el nivel del agua', geo: 'Vallecitos' },
  { topic: 'lluvias', tone: 'apoyo', net: 'fb', text: 'La estación hidrológica del Piraí ya marca el pico, bien que la instalaron' },
  { topic: 'lluvias', tone: 'escepticismo', net: 'yt', text: 'Santa Cruz está construida sobre un lecho de río, esto va a seguir pasando' },
  /* — cables — */
  { topic: 'cables', tone: 'denuncia', net: 'yt', text: 'Desmantelaron una red de robo de cables y baterías en el centro' },
  { topic: 'cables', tone: 'enojo', net: 'fb', text: 'Robo masivo de cables: barrios enteros a oscuras por el cobre' },
  { topic: 'cables', tone: 'denuncia', net: 'wa', text: 'Semáforo apagado otra vez en el 5to anillo, seguro cables; un accidente esperando', geo: '5to anillo' },
  /* — dengue — */
  { topic: 'dengue', tone: 'apoyo', net: 'fb', text: 'Fumigación en distritos y cementerios, ojalá pasen también por el mercado' },
  { topic: 'dengue', tone: 'denuncia', net: 'wa', text: 'Destrucción de criaderos en los distritos ayuda más que la fumigación de siempre' },
];

/* ── integración con la simulación ──
   El banco engrosa el ruido de fondo: se carga después de data.js y
   antes de app.js. Sin nombres ni identificadores (regla del proyecto). */
(function () {
  if (typeof NETS !== 'undefined' && !NETS.yt) NETS.yt = 'YT';
  if (typeof BG_FEED !== 'undefined' && typeof BANCO_COMENTARIOS !== 'undefined') {
    BANCO_COMENTARIOS.forEach(function (c) {
      BG_FEED.push({ topic: c.topic, tone: c.tone, net: c.net, text: c.text, geo: c.geo });
    });
  }
  var st = document.createElement('style');
  st.textContent = '.net-yt{color:#fca5a5;border-color:#7f2f2f}';
  document.head.appendChild(st);
})();
