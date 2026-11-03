/* =========================================================
   Santo Rosario — Oraciones, misterios y meditaciones
   ---------------------------------------------------------
   FUENTES (verificadas en octubre de 2026):
   · Señal de la Cruz, Gloria, Ave María, Padre Nuestro, Credo,
     Salve, Bajo tu amparo y nombres de los misterios:
     Compendio del Catecismo de la Iglesia Católica, Apéndice
     «Oraciones comunes» y «Rosario» (vatican.va).
   · Letanías Lauretanas: vatican.va/special/rosary, con las
     invocaciones de 2018 y 2020 (Congregación para el Culto Divino).
   · Estructura del Rosario: vatican.va/special/rosary y la carta
     Rosarium Virginis Mariae (san Juan Pablo II, 2002).
   · Citas bíblicas: Sagrada Biblia de la Universidad de Navarra.
     El texto completo se enlaza en la versión que publica EWTN;
     aquí solo se ofrece la referencia y una síntesis propia,
     porque la traducción tiene derechos de autor (EUNSA).
   · Consagración «Oh Señora mía»: versión de los Marianos de la
     Inmaculada Concepción (amm.org). «Bendita sea tu pureza»: versión
     de es.catholic.net. «Acordaos»: texto tradicional atribuido a san
     Bernardo. De estas tres circulan variantes según el país.
   · Meditaciones y frutos: textos propios de esta app, de tradición
     piadosa; no son texto magisterial.
   ========================================================= */

const ORACIONES = {
  senal: {
    titulo: "Señal de la Cruz",
    texto:
      "Por la señal de la Santa Cruz, de nuestros enemigos líbranos, Señor, Dios nuestro.\n" +
      "En el nombre del Padre y del Hijo y del Espíritu Santo. Amén.",
  },
  senalFinal: {
    titulo: "Señal de la Cruz",
    texto: "En el nombre del Padre y del Hijo y del Espíritu Santo. Amén.",
  },
  apertura: {
    titulo: "Invocación inicial",
    texto:
      "V. Señor, ábreme los labios.\nR. Y mi boca proclamará tu alabanza.\n\n" +
      "V. Dios mío, ven en mi auxilio.\nR. Señor, date prisa en socorrerme.\n\n" +
      "Gloria al Padre, y al Hijo, y al Espíritu Santo.\n" +
      "Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.",
  },
  contricion: {
    titulo: "Acto de contrición",
    texto:
      "Señor mío Jesucristo, Dios y Hombre verdadero, Creador, Padre y Redentor mío; " +
      "por ser Vos quien sois, bondad infinita, y porque os amo sobre todas las cosas, " +
      "me pesa de todo corazón haberos ofendido; también me pesa porque podéis castigarme " +
      "con las penas del infierno. Ayudado de vuestra divina gracia, propongo firmemente " +
      "nunca más pecar, confesarme y cumplir la penitencia que me fuere impuesta. Amén.",
  },
  credo: {
    titulo: "Credo de los Apóstoles",
    texto:
      "Creo en Dios, Padre Todopoderoso, Creador del cielo y de la tierra.\n" +
      "Creo en Jesucristo, su único Hijo, Nuestro Señor, que fue concebido por obra y gracia " +
      "del Espíritu Santo, nació de Santa María Virgen, padeció bajo el poder de Poncio Pilato, " +
      "fue crucificado, muerto y sepultado, descendió a los infiernos, al tercer día resucitó " +
      "de entre los muertos, subió a los cielos y está sentado a la derecha de Dios, Padre " +
      "todopoderoso. Desde allí ha de venir a juzgar a vivos y muertos.\n" +
      "Creo en el Espíritu Santo, la santa Iglesia católica, la comunión de los santos, " +
      "el perdón de los pecados, la resurrección de la carne y la vida eterna. Amén.",
  },
  // `responde: true`: en el modo guía y respuesta, la primera parte (hasta el salto de línea)
  // la dice quien guía y el resto lo responden todos.
  padrenuestro: {
    titulo: "Padre Nuestro",
    responde: true,
    texto:
      "Padre nuestro que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu Reino; " +
      "hágase tu voluntad en la tierra como en el cielo.\n" +
      "Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros " +
      "perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal. Amén.",
    // Variante usada en muchos países de Latinoamérica
    textoLatam:
      "Padre nuestro que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu Reino; " +
      "hágase tu voluntad en la tierra como en el cielo.\n" +
      "Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros " +
      "perdonamos a los que nos ofenden; no nos dejes caer en tentación, y líbranos del mal. Amén.",
  },
  avemaria: {
    titulo: "Ave María",
    responde: true,
    texto:
      "Dios te salve, María, llena eres de gracia; el Señor es contigo. " +
      "Bendita Tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús.\n" +
      "Santa María, Madre de Dios, ruega por nosotros, pecadores, ahora y en la hora de nuestra muerte. Amén.",
  },
  gloria: {
    titulo: "Gloria",
    responde: true,
    texto:
      "Gloria al Padre, y al Hijo, y al Espíritu Santo.\n" +
      "Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.",
  },
  fatima: {
    titulo: "Oración de Fátima",
    texto:
      "Oh Jesús mío, perdona nuestros pecados, líbranos del fuego del infierno, " +
      "lleva al cielo a todas las almas, especialmente a las más necesitadas de tu infinita misericordia.",
  },
  jaculatoria: {
    titulo: "Jaculatoria",
    texto:
      "María, Madre de gracia y Madre de misericordia, en la vida y en la muerte ampáranos, Madre nuestra. Amén.",
  },
  salve: {
    titulo: "Salve",
    texto:
      "Dios te salve, Reina y Madre de misericordia, vida, dulzura y esperanza nuestra; Dios te salve. " +
      "A ti llamamos los desterrados hijos de Eva; a ti suspiramos, gimiendo y llorando en este valle de lágrimas. " +
      "Ea, pues, Señora, abogada nuestra, vuelve a nosotros esos tus ojos misericordiosos; " +
      "y después de este destierro, muéstranos a Jesús, fruto bendito de tu vientre. " +
      "¡Oh, clementísima, oh piadosa, oh dulce Virgen María!\n\n" +
      "V. Ruega por nosotros, Santa Madre de Dios.\n" +
      "R. Para que seamos dignos de alcanzar las promesas y gracias de Nuestro Señor Jesucristo. Amén.",
  },
  bajoTuAmparo: {
    titulo: "Bajo tu amparo",
    texto:
      "Bajo tu amparo nos acogemos, Santa Madre de Dios; no deseches las súplicas que te dirigimos " +
      "en nuestras necesidades; antes bien, líbranos siempre de todo peligro, ¡Oh Virgen gloriosa y bendita!",
  },
  sanMiguel: {
    titulo: "Oración a San Miguel Arcángel",
    texto:
      "San Miguel Arcángel, defiéndenos en la lucha. Sé nuestro amparo contra la perversidad " +
      "y asechanzas del demonio. Que Dios manifieste sobre él su poder, es nuestra humilde súplica. " +
      "Y tú, oh Príncipe de la Milicia Celestial, con el poder que Dios te ha conferido, arroja al " +
      "infierno a Satanás y a los demás espíritus malignos que vagan por el mundo para la perdición " +
      "de las almas. Amén.",
  },
  senoraMia: {
    titulo: "Consagración a la Virgen",
    texto:
      "¡Oh Señora mía! ¡Oh Madre mía! Yo me ofrezco enteramente a ti y, en prueba de mi filial afecto, " +
      "te consagro en este día mis ojos, mis oídos, mi lengua, mi corazón; en una palabra, todo mi ser. " +
      "Ya que soy todo tuyo, oh Madre de bondad, guárdame y defiéndeme como pertenencia y posesión tuya. Amén.",
  },
  acordaos: {
    titulo: "Acordaos",
    texto:
      "Acordaos, oh piadosísima Virgen María, que jamás se ha oído decir que ninguno de los que han acudido " +
      "a vuestra protección, implorando vuestra asistencia y reclamando vuestro socorro, haya sido abandonado " +
      "de vos. Animado con esta confianza, a vos también acudo, oh Madre, Virgen de las vírgenes, y aunque " +
      "gimiendo bajo el peso de mis pecados, me atrevo a comparecer ante vuestra presencia soberana. " +
      "No desechéis, oh Madre de Dios, mis humildes súplicas; antes bien, escuchadlas y acogedlas benignamente. Amén.",
  },
  benditaPureza: {
    titulo: "Bendita sea tu pureza",
    texto:
      "Bendita sea tu pureza y eternamente lo sea, pues todo un Dios se recrea en tan graciosa belleza.\n" +
      "A ti, celestial Princesa, amada Virgen María, te ofrezco en este día alma, vida y corazón.\n" +
      "Mírame con compasión y no me dejes, Madre mía. Amén.",
  },
  oracionFinal: {
    titulo: "Oración final del Rosario",
    texto:
      "Oh Dios, cuyo Hijo unigénito, con su vida, muerte y resurrección, nos ha merecido el premio " +
      "de la salvación eterna, concédenos, te rogamos, que, meditando estos misterios del Santísimo " +
      "Rosario de la Bienaventurada Virgen María, imitemos lo que contienen y alcancemos lo que prometen. " +
      "Por el mismo Cristo nuestro Señor. Amén.",
  },
  oracionLetanias: {
    titulo: "Oración",
    texto:
      "V. Ruega por nosotros, Santa Madre de Dios.\n" +
      "R. Para que seamos dignos de alcanzar las promesas y gracias de Nuestro Señor Jesucristo.\n\n" +
      "Te rogamos nos concedas, Señor Dios nuestro, gozar de continua salud de alma y cuerpo, " +
      "y por la gloriosa intercesión de la bienaventurada siempre Virgen María, vernos libres " +
      "de las tristezas de la vida presente y disfrutar de las alegrías eternas. " +
      "Por Cristo nuestro Señor. Amén.",
  },
};

/* Tres primeras Avemarías: por las virtudes teologales,
   honrando a María en relación con cada Persona de la Santísima Trinidad. */
const TRES_AVES = [
  { virtud: "fe", saludo: "Dios te salve, María, Hija de Dios Padre" },
  { virtud: "esperanza", saludo: "Dios te salve, María, Madre de Dios Hijo" },
  { virtud: "caridad", saludo: "Dios te salve, María, Esposa de Dios Espíritu Santo" },
];

/* Letanías Lauretanas (incluye las invocaciones añadidas por la Santa Sede:
   Madre de la Iglesia, Madre de la misericordia, Madre de la esperanza,
   Consuelo de los migrantes). */
const LETANIAS = [
  {
    respuesta: null,
    lineas: [
      ["Señor, ten piedad", "Señor, ten piedad"],
      ["Cristo, ten piedad", "Cristo, ten piedad"],
      ["Señor, ten piedad", "Señor, ten piedad"],
      ["Cristo, óyenos", "Cristo, óyenos"],
      ["Cristo, escúchanos", "Cristo, escúchanos"],
    ],
  },
  {
    respuesta: "ten piedad de nosotros",
    lineas: [
      "Dios, Padre celestial",
      "Dios, Hijo, Redentor del mundo",
      "Dios, Espíritu Santo",
      "Santísima Trinidad, un solo Dios",
    ],
  },
  {
    respuesta: "ruega por nosotros",
    lineas: [
      "Santa María",
      "Santa Madre de Dios",
      "Santa Virgen de las Vírgenes",
      "Madre de Cristo",
      "Madre de la Iglesia",
      "Madre de la misericordia",
      "Madre de la divina gracia",
      "Madre de la esperanza",
      "Madre purísima",
      "Madre castísima",
      "Madre siempre virgen",
      "Madre inmaculada",
      "Madre amable",
      "Madre admirable",
      "Madre del buen consejo",
      "Madre del Creador",
      "Madre del Salvador",
      "Virgen prudentísima",
      "Virgen digna de veneración",
      "Virgen digna de alabanza",
      "Virgen poderosa",
      "Virgen clemente",
      "Virgen fiel",
      "Espejo de justicia",
      "Trono de la sabiduría",
      "Causa de nuestra alegría",
      "Vaso espiritual",
      "Vaso digno de honor",
      "Vaso de insigne devoción",
      "Rosa mística",
      "Torre de David",
      "Torre de marfil",
      "Casa de oro",
      "Arca de la Alianza",
      "Puerta del cielo",
      "Estrella de la mañana",
      "Salud de los enfermos",
      "Refugio de los pecadores",
      "Consuelo de los migrantes",
      "Consoladora de los afligidos",
      "Auxilio de los cristianos",
      "Reina de los Ángeles",
      "Reina de los Patriarcas",
      "Reina de los Profetas",
      "Reina de los Apóstoles",
      "Reina de los Mártires",
      "Reina de los Confesores",
      "Reina de las Vírgenes",
      "Reina de todos los Santos",
      "Reina concebida sin pecado original",
      "Reina asunta a los Cielos",
      "Reina del Santísimo Rosario",
      "Reina de la familia",
      "Reina de la paz",
    ],
  },
  {
    respuesta: null,
    lineas: [
      ["Cordero de Dios, que quitas el pecado del mundo", "perdónanos, Señor"],
      ["Cordero de Dios, que quitas el pecado del mundo", "escúchanos, Señor"],
      ["Cordero de Dios, que quitas el pecado del mundo", "ten misericordia de nosotros"],
    ],
  },
];

/* Día de la semana (0 = domingo) → misterios que propone la Iglesia */
const MISTERIOS_POR_DIA = ["gloriosos", "gozosos", "dolorosos", "gloriosos", "luminosos", "dolorosos", "gozosos"];

const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

const MISTERIOS = {
  gozosos: {
    nombre: "Misterios Gozosos",
    dias: "Lunes y sábado",
    color: "#f6e7c8",
    lista: [
      {
        titulo: "La Encarnación del Hijo de Dios",
        cita: { ref: "Lc 1, 26-38", texto: "" },
        sintesis:
          "El ángel Gabriel es enviado por Dios a Nazaret, a una virgen llamada María, y al entrar la saluda: " +
          "«Dios te salve, llena de gracia, el Señor es contigo». Le anuncia que concebirá por obra del Espíritu " +
          "Santo al Hijo del Altísimo, y ella responde: «He aquí la esclava del Señor».",
        fruto: "La humildad",
        meditacion:
          "Dios, que es Padre, Hijo y Espíritu Santo, espera la respuesta libre de una joven sencilla. " +
          "En el silencio de Nazaret, el Verbo eterno se hace carne en el seno de María. Su «sí» no nace de " +
          "comprenderlo todo, sino de fiarse por completo. Contempla cómo la grandeza de Dios se abaja hasta " +
          "nosotros y pide a la Virgen que te enseñe a decir «hágase» en lo pequeño de cada día, dejando que " +
          "Cristo crezca en tu vida.",
        profunda: [
          "Nazaret es una aldea pequeña de Galilea, sin fama ni importancia. Allí, en una casa sencilla, vive " +
          "María, una joven desposada con José. Nada hace pensar que en ese lugar vaya a cambiar la historia del " +
          "mundo y, sin embargo, Dios envía a su ángel precisamente allí. Contempla la escena: el saludo " +
          "inesperado, la turbación de María, su silencio atento. «Alégrate, llena de gracia»: Dios la mira con un " +
          "amor que la ha preparado desde siempre y la ha preservado de todo pecado.",
          "Dios no impone su plan: lo propone y espera una respuesta libre. San Bernardo imaginaba a toda la " +
          "humanidad, desde Adán, suplicando a la Virgen que respondiera pronto. María pregunta cómo será, no para " +
          "poner condiciones, sino para entregarse por entero. Y cuando escucha que el Espíritu Santo la cubrirá " +
          "con su sombra, se fía: «He aquí la esclava del Señor; hágase en mí según tu palabra». En ese instante, " +
          "el Hijo eterno del Padre se hace hombre en su seno. Los Padres de la Iglesia vieron en ella a la nueva " +
          "Eva: lo que ató la desobediencia de Eva, lo desató la obediencia de María.",
          "La humildad de María no consiste en pensar poco de sí misma, sino en reconocer que todo es don y dejar " +
          "que Dios actúe. Dios sigue buscando corazones disponibles en lo escondido de cada día: en el trabajo, en " +
          "la familia, en las decisiones que nadie ve. Pregúntate dónde te está pidiendo hoy un «sí» que te cuesta " +
          "dar. Pide a María que te alcance su humildad y su confianza, para que también en ti Cristo tome carne en " +
          "obras de amor.",
        ],
      },
      {
        titulo: "La Visitación de Nuestra Señora a su prima Santa Isabel",
        cita: { ref: "Lc 1, 39-56", texto: "" },
        sintesis:
          "María marcha deprisa a la montaña para servir a Isabel. Al oír su saludo, el niño salta de gozo en el " +
          "seno de Isabel, que, llena del Espíritu Santo, la llama «la madre de mi Señor». María proclama el Magníficat.",
        fruto: "La caridad con el prójimo",
        meditacion:
          "Quien lleva a Jesús no puede quedarse quieto: María se pone en camino para servir. Lleva a Cristo en su " +
          "seno y, con Él, la alegría del Espíritu Santo que hace saltar de gozo a Juan. Su canto, el Magníficat, " +
          "devuelve toda la gloria a Dios. Pide la gracia de ser portador de Cristo para los demás, con un servicio " +
          "discreto y alegre, especialmente hacia quien más lo necesita.",
        profunda: [
          "Apenas el ángel se retira, María se pone en camino y va deprisa a la montaña, a un pueblo de Judea. Son " +
          "varios días de viaje, y lleva en su seno al Hijo de Dios recién concebido. No va a contar su secreto ni " +
          "a buscar admiración: va a servir a su prima Isabel, ya anciana, que espera un hijo desde hace seis " +
          "meses. Contempla el abrazo de las dos mujeres y al niño que salta de gozo en el seno de Isabel.",
          "Donde llega María, llega Jesús: ella es como un sagrario vivo que recorre los caminos. Por eso Juan " +
          "Bautista lo reconoce antes de nacer, e Isabel, llena del Espíritu Santo, exclama: «¡Bendita tú entre las " +
          "mujeres y bendito el fruto de tu vientre!», palabras que repetimos en cada Avemaría. María responde con " +
          "el Magníficat. No habla de sí misma, sino de la grandeza de Dios, que ha mirado la pequeñez de su " +
          "esclava, derriba del trono a los poderosos y enaltece a los humildes.",
          "La verdadera caridad nace de llevar a Cristo dentro: no es solo hacer favores, sino acercar a los demás " +
          "la presencia de Dios. Mira a tu alrededor: ¿quién es hoy tu Isabel? Quizá un familiar enfermo, una " +
          "persona mayor que vive sola o un vecino que pasa por un momento difícil. Pide a María prontitud para " +
          "servir, delicadeza para no humillar a nadie y una alegría que haga de tu ayuda un anuncio de Dios.",
        ],
      },
      {
        titulo: "El Nacimiento del Hijo de Dios",
        cita: { ref: "Lc 2, 1-20", texto: "" },
        sintesis:
          "José y María suben a Belén para el censo. Allí María da a luz a su Hijo y lo recuesta en un pesebre. " +
          "Los ángeles anuncian a los pastores una gran alegría: ha nacido el Salvador, el Mesías, el Señor.",
        fruto: "El desprendimiento y la pobreza de espíritu",
        meditacion:
          "El Creador del universo nace pobre, en un establo, porque no había sitio para ellos. María lo envuelve en " +
          "pañales y lo adora; José custodia en silencio. Los primeros en llegar son los pastores, los sencillos. " +
          "Mira al Niño en brazos de su Madre y deja que desarme tu orgullo. Pide un corazón desprendido, donde " +
          "siempre haya sitio para Jesús.",
        profunda: [
          "Un edicto del emperador obliga a José y a María a viajar a Belén, la ciudad de David. María está a punto " +
          "de dar a luz y no hay sitio para ellos en la posada. Contempla la noche fría, el refugio pobre, el " +
          "pesebre donde comen los animales. Allí, en el lugar más humilde, María da a luz a su Hijo, lo envuelve " +
          "en pañales y lo recuesta. José prepara con un amor inmenso lo poco que tienen.",
          "El que sostiene el universo cabe en los brazos de su Madre. El Verbo eterno, por quien todo fue hecho, " +
          "se hace un niño que necesita ser alimentado y abrigado. Dios elige la pobreza no porque desprecie las " +
          "cosas, sino para enseñarnos dónde está la verdadera riqueza. Los primeros en recibir la noticia son unos " +
          "pastores, gente sencilla y poco estimada, y los ángeles cantan: «Gloria a Dios en las alturas, y en la " +
          "tierra paz a los hombres». Más tarde llegarán los Magos de Oriente, para que todos los pueblos sepan que " +
          "este Niño ha venido para todos.",
          "Belén nos pregunta qué ocupa el lugar de Dios en nuestra vida. A veces el corazón está tan lleno de " +
          "cosas, prisas y preocupaciones que, como en la posada, no queda sitio para Él. El desprendimiento no es " +
          "solo dar lo que sobra, sino vivir con libertad ante lo que se tiene. Pide a María que te ayude a hacer " +
          "de tu corazón un pesebre humilde y limpio, donde Jesús encuentre siempre un lugar, y a reconocerlo en " +
          "los pobres, en quienes Él sigue naciendo.",
        ],
      },
      {
        titulo: "La Presentación de Jesús en el templo",
        cita: { ref: "Lc 2, 22-40", texto: "" },
        sintesis:
          "María y José presentan al Niño en el Templo según la Ley. El anciano Simeón lo toma en brazos y lo " +
          "reconoce como luz de las naciones, y anuncia a María que una espada le atravesará el alma.",
        fruto: "La obediencia y la pureza",
        meditacion:
          "La Sagrada Familia cumple con sencillez la Ley de Dios. Simeón y Ana, que han esperado toda su vida, " +
          "reconocen en un niño pequeño la salvación prometida. María ofrece a su Hijo al Padre y acoge, sin " +
          "comprenderla del todo, la profecía de la espada. Ofrece tú también a Dios lo que eres y lo que amas, " +
          "con la confianza de que en sus manos todo queda a salvo.",
        profunda: [
          "Cuarenta días después del nacimiento, María y José suben al Templo de Jerusalén para cumplir la Ley de " +
          "Moisés: presentar al primogénito al Señor y ofrecer el sacrificio de los pobres, un par de tórtolas o " +
          "dos pichones. Contempla a la Sagrada Familia, perdida entre la multitud, cumpliendo con sencillez lo que " +
          "Dios manda. Nadie se fija en ellos. Solo dos ancianos, Simeón y Ana, movidos por el Espíritu Santo, " +
          "reconocen al Niño.",
          "Simeón toma a Jesús en brazos y bendice a Dios: ya puede morir en paz, porque sus ojos han visto la " +
          "salvación, la luz que alumbra a las naciones. Pero enseguida se dirige a María con una profecía dura: " +
          "este Niño será signo de contradicción, y a ella una espada le atravesará el alma. María ofrece a su Hijo " +
          "al Padre, sabiendo que no le pertenece. Es el comienzo de una entrega que culminará en el Calvario, " +
          "donde ella estará de pie junto a la cruz.",
          "La obediencia de María y José no es sumisión resignada, sino amor que se fía de Dios incluso en los " +
          "detalles pequeños. Y su pureza es la de un corazón que no se reserva nada para sí. Ofrece hoy a Dios lo " +
          "que más amas: tu familia, tus proyectos, tu propia vida. Pide a la Virgen un corazón limpio, que sepa " +
          "obedecer con alegría y que, como Simeón y Ana, aprenda a esperar con perseverancia hasta reconocer al " +
          "Señor que pasa.",
        ],
      },
      {
        titulo: "El Niño Jesús perdido y hallado en el templo",
        cita: { ref: "Lc 2, 41-52", texto: "" },
        sintesis:
          "A los doce años, Jesús se queda en Jerusalén sin que sus padres lo sepan. Tras tres días de angustia lo " +
          "encuentran en el Templo entre los doctores. «¿No sabíais que yo debo estar en las cosas de mi Padre?»",
        fruto: "La búsqueda constante de Dios",
        meditacion:
          "Tres días de búsqueda angustiada, y al fin la alegría del encuentro. María y José no entienden del todo " +
          "la respuesta de Jesús, pero María guarda todas estas cosas en su corazón. Cuando sientas que has perdido " +
          "a Jesús —por el pecado, la tibieza o la oscuridad—, búscalo con la Virgen sin desanimarte: Él está siempre " +
          "en la casa de su Padre, esperándote.",
        profunda: [
          "Como cada año, la familia de Nazaret sube a Jerusalén para la fiesta de la Pascua. Jesús tiene doce " +
          "años. Al volver, María y José creen que va en la caravana con los parientes, pero al final de la jornada " +
          "descubren que no está. Contempla su angustia: regresan a Jerusalén y lo buscan durante tres días. Al " +
          "tercero lo encuentran en el Templo, sentado entre los maestros, escuchándolos y haciéndoles preguntas.",
          "«Hijo, ¿por qué nos has hecho esto? Tu padre y yo te buscábamos angustiados». La respuesta de Jesús son " +
          "sus primeras palabras en el Evangelio: «¿No sabíais que yo debo estar en las cosas de mi Padre?». Así " +
          "revela quién es: el Hijo de Dios, que tiene una misión. María y José no la comprenden del todo y, sin " +
          "embargo, Jesús vuelve con ellos a Nazaret y vive sujeto a ellos. Esos tres días de búsqueda anuncian ya " +
          "los tres días del sepulcro, y la alegría del encuentro anticipa la de la Pascua.",
          "María guarda todas estas cosas en su corazón: no lo entiende todo, pero no deja de meditar. También tú " +
          "pasas por momentos en que Dios parece ausente, porque el pecado, la rutina o el sufrimiento te lo " +
          "esconden. No te quedes quieto: búscalo con María donde Él está, en la oración, en la Palabra, en los " +
          "sacramentos y en la Iglesia. Pide la gracia de no acostumbrarte nunca a vivir lejos de Jesús y de " +
          "alegrarte cada vez que vuelves a encontrarlo.",
        ],
      },
    ],
  },

  luminosos: {
    nombre: "Misterios Luminosos",
    dias: "Jueves",
    color: "#fdf6d8",
    lista: [
      {
        titulo: "El Bautismo de Jesús en el Jordán",
        cita: { ref: "Mt 3, 13-17", texto: "" },
        sintesis:
          "Jesús acude a Juan para ser bautizado. Al salir del agua, se abren los cielos, el Espíritu de Dios " +
          "desciende como una paloma y la voz del Padre dice: «Este es mi Hijo, el amado, en quien me complazco».",
        fruto: "La fidelidad a las promesas del Bautismo",
        meditacion:
          "En el Jordán se manifiesta la Santísima Trinidad: el Padre que habla, el Hijo que se sumerge en las aguas " +
          "y el Espíritu Santo que desciende. Jesús, sin pecado, se pone en la fila de los pecadores. Recuerda tu " +
          "propio Bautismo: también sobre ti el Padre pronunció palabras de amor. Renueva hoy tu fe y pide vivir " +
          "como verdadero hijo de Dios.",
        profunda: [
          "A orillas del Jordán, una multitud acude a Juan para confesar sus pecados y ser bautizada. Entre ellos, " +
          "en silencio, se acerca Jesús. Juan lo reconoce y se resiste: «Soy yo quien necesita ser bautizado por " +
          "ti, ¿y tú vienes a mí?». Jesús insiste, porque así conviene cumplir toda justicia. Contempla al Hijo de " +
          "Dios, que no tiene pecado, haciendo fila con los pecadores y bajando a las aguas como uno más.",
          "Al salir del agua se abren los cielos, el Espíritu Santo desciende sobre Él como una paloma y la voz del " +
          "Padre proclama: «Este es mi Hijo, el amado, en quien me complazco». Es una manifestación de la Santísima " +
          "Trinidad. Jesús no necesitaba purificarse: al entrar en el Jordán santifica las aguas, para que en ellas " +
          "nazcamos a una vida nueva. Al comenzar su misión, carga ya sobre sí los pecados que vendrá a quitar en " +
          "la cruz.",
          "El día de tu Bautismo, el Padre te miró también como a un hijo amado. Fuiste lavado del pecado original, " +
          "recibiste el Espíritu Santo y entraste en la familia de la Iglesia. Tus padres y padrinos renunciaron " +
          "por ti al mal y profesaron la fe; hoy eres tú quien puede renovar esas promesas. Pregúntate si vives " +
          "como hijo de Dios y pide a María, Madre de la Iglesia, la gracia de ser fiel a esa dignidad hasta el " +
          "último día.",
        ],
      },
      {
        titulo: "La autorrevelación de Jesús en las bodas de Caná",
        cita: { ref: "Jn 2, 1-12", texto: "" },
        sintesis:
          "En una boda en Caná falta el vino. María lo advierte y dice a los sirvientes: «Haced lo que Él os diga». " +
          "Jesús convierte el agua en vino; fue su primer signo, y sus discípulos creyeron en Él.",
        fruto: "La confianza en la intercesión de María",
        meditacion:
          "María se da cuenta antes que nadie de la necesidad ajena y la presenta a su Hijo con delicadeza. Sus " +
          "últimas palabras en el Evangelio son un consejo para siempre: «Haced lo que Él os diga». Lleva a la " +
          "Virgen tus carencias, las de tu familia y las del mundo, y disponte a obedecer a Jesús: Él puede " +
          "transformar el agua de tu vida en vino nuevo.",
        profunda: [
          "Hay una boda en Caná de Galilea y la madre de Jesús está allí; también Él ha sido invitado, con sus " +
          "discípulos. En medio de la fiesta ocurre algo que puede arruinar la alegría de los novios: se acaba el " +
          "vino. Nadie parece haberse dado cuenta todavía, pero María sí. Contempla su mirada atenta y su " +
          "discreción: no hace escándalo ni culpa a nadie; simplemente se acerca a su Hijo y le dice: «No tienen " +
          "vino».",
          "Jesús responde que aún no ha llegado su hora, pero María no insiste ni se ofende. Se vuelve a los " +
          "sirvientes con total confianza: «Haced lo que Él os diga». Son sus últimas palabras recogidas en el " +
          "Evangelio, y resumen toda su misión: llevarnos a Jesús. Los sirvientes llenan de agua seis tinajas de " +
          "piedra hasta el borde, y el agua se convierte en un vino excelente. Es el primero de los signos de " +
          "Jesús, y sus discípulos creen en Él. Por la intercesión de su Madre, Cristo manifiesta su gloria.",
          "María sigue atenta a lo que nos falta, muchas veces antes de que nosotros mismos lo notemos. Preséntale " +
          "tus carencias: la alegría que se apagó en tu familia, la paz que falta en tu casa, la fe que se ha " +
          "enfriado. Y escucha su consejo, que vale para cada día: hacer lo que Jesús diga, aunque no entiendas " +
          "cómo va a resolverlo. Pon tu poca agua en sus manos, con obediencia y confianza, y deja que Él la " +
          "transforme en vino nuevo.",
        ],
      },
      {
        titulo: "El anuncio del Reino de Dios invitando a la conversión",
        cita: { ref: "Mc 1, 14-15", texto: "" },
        sintesis:
          "Después del arresto de Juan, Jesús va a Galilea a predicar el Evangelio de Dios: «Se ha cumplido el " +
          "tiempo y está cerca el Reino de Dios; convertíos y creed en el Evangelio».",
        fruto: "La conversión del corazón",
        meditacion:
          "Jesús recorre los caminos anunciando que el Reino ya está aquí, perdonando pecados, sanando enfermos y " +
          "acogiendo a los pequeños. Su llamada es para hoy: convertirse, volver el corazón hacia Dios. Piensa qué " +
          "aspecto de tu vida necesita volver a Él y acércate con confianza a su misericordia, especialmente en el " +
          "sacramento de la Reconciliación.",
        profunda: [
          "Jesús recorre Galilea de pueblo en pueblo: junto al lago, en las sinagogas, por los campos. La gente lo " +
          "sigue porque habla con autoridad y cura a los enfermos. Su mensaje es sencillo y urgente: «Se ha " +
          "cumplido el tiempo y está cerca el Reino de Dios; convertíos y creed en el Evangelio». Contempla a Jesús " +
          "sentado en la montaña enseñando las bienaventuranzas, tocando a los leprosos, comiendo con publicanos y " +
          "pecadores.",
          "El Reino de Dios no es un territorio ni un poder humano: es Dios mismo que se acerca para reinar en los " +
          "corazones con su amor. Jesús lo muestra con signos: los ciegos ven, los cojos andan y a los pobres se " +
          "les anuncia la Buena Noticia. Sobre todo, lo muestra perdonando. Al paralítico que le traen en una " +
          "camilla le dice primero: «Hijo, tus pecados te son perdonados». Y después de resucitar dará a sus " +
          "apóstoles el poder de perdonar en su nombre, para que su misericordia llegue a todos los tiempos.",
          "Convertirse es volver el rostro hacia Dios, cambiar la mirada y el corazón. No es solo dejar algo malo, " +
          "sino dejar que Dios reine en lo que piensas, en lo que dices y en lo que haces. Pregúntate qué parte de " +
          "tu vida todavía no le pertenece. Pide a María un corazón sencillo como el de los pequeños, a quienes " +
          "pertenece el Reino, y la valentía de acercarte al sacramento de la Reconciliación, donde Jesús sigue " +
          "diciendo: «Vete en paz».",
        ],
      },
      {
        titulo: "La Transfiguración",
        cita: { ref: "Lc 9, 28-36", texto: "" },
        sintesis:
          "Jesús sube al monte con Pedro, Santiago y Juan para orar. Su rostro cambia y sus vestidos brillan de " +
          "blancura; aparecen Moisés y Elías, y desde la nube el Padre dice: «Este es mi Hijo, el elegido; escuchadle».",
        fruto: "El deseo de santidad",
        meditacion:
          "En lo alto del monte, la gloria de Dios resplandece en el rostro de Cristo. Los discípulos, que pronto " +
          "verán la cruz, reciben un anticipo de la Resurrección. El Padre nos da un solo mandato: escuchar a su " +
          "Hijo. Busca momentos de oración en lo alto de tu propio monte, deja que su luz te transforme y baja " +
          "después a la vida cotidiana con el corazón renovado.",
        profunda: [
          "Jesús toma consigo a Pedro, Santiago y Juan y sube a un monte para orar. Mientras ora, el aspecto de su " +
          "rostro cambia y sus vestidos se vuelven de una blancura deslumbrante. Aparecen Moisés y Elías, la Ley y " +
          "los Profetas, y hablan con Él de la partida que va a cumplir en Jerusalén. Contempla a los tres " +
          "discípulos, primero vencidos por el sueño y luego despiertos, sobrecogidos ante tanta gloria.",
          "Pedro, sin saber lo que dice, quiere quedarse allí para siempre: «Maestro, ¡qué bien se está aquí!». " +
          "Pero una nube los cubre y se oye la voz del Padre: «Este es mi Hijo, el elegido; escuchadle». Cuando la " +
          "voz cesa, ven a Jesús solo. La Transfiguración prepara a los discípulos para el escándalo de la cruz: el " +
          "rostro que verán desfigurado en la Pasión es el mismo que ahora brilla con la luz de Dios. Y nos muestra " +
          "lo que seremos, porque estamos llamados a participar de su gloria.",
          "La santidad no es un privilegio de unos pocos: es la vocación de todo bautizado, y comienza escuchando a " +
          "Jesús. Necesitas subir cada día a tu monte —un rato de oración, un momento de silencio, la Santa Misa— " +
          "para que su luz te transforme poco a poco. Después hay que bajar a la vida de cada día, con sus " +
          "cansancios y sus cruces, llevando esa luz. Pide a María, que guardaba la Palabra en su corazón, un deseo " +
          "grande de santidad y la perseverancia en la oración.",
        ],
      },
      {
        titulo: "La Institución de la Eucaristía",
        cita: { ref: "Mt 26, 26-29", texto: "" },
        sintesis:
          "Durante la Última Cena, Jesús toma el pan, lo bendice y lo da a sus discípulos: «Tomad y comed: esto " +
          "es mi cuerpo». Luego toma el cáliz: «Esta es mi sangre de la alianza, derramada por muchos».",
        fruto: "El amor a Jesús Sacramentado",
        meditacion:
          "Habiendo amado a los suyos, los amó hasta el extremo. Jesús se queda con nosotros bajo las especies del " +
          "pan y del vino, verdaderamente presente en Cuerpo, Sangre, Alma y Divinidad. María, la primera custodia " +
          "que llevó a Cristo, nos enseña a recibirlo con fe y adoración. Agradece el don de la Eucaristía y renueva " +
          "tu deseo de visitarle y recibirle con un corazón limpio.",
        profunda: [
          "Es la noche antes de su Pasión. Jesús está reunido con los Doce en el Cenáculo para celebrar la Pascua. " +
          "Sabe que ha llegado su hora y, habiendo amado a los suyos, los ama hasta el extremo. Contempla la mesa, " +
          "el pan, la copa de vino, los rostros de los apóstoles. Jesús se ciñe una toalla y les lava los pies; " +
          "después, en un silencio lleno de amor, toma el pan en sus manos.",
          "«Tomad y comed: esto es mi cuerpo». Luego toma el cáliz: «Esta es mi sangre de la alianza, derramada por " +
          "muchos para el perdón de los pecados». No es un simple símbolo ni un recuerdo: Jesús se da a sí mismo y " +
          "anticipa en el sacramento el sacrificio de la cruz. Al mandar «Haced esto en memoria mía», instituye " +
          "también el sacerdocio, para que su ofrenda se renueve en cada Misa. Desde entonces está realmente " +
          "presente bajo las especies del pan y del vino, con su Cuerpo, Sangre, Alma y Divinidad, y se queda en el " +
          "sagrario esperándonos.",
          "María, que llevó a Jesús en su seno, es maestra de amor a la Eucaristía; san Juan Pablo II la llamó " +
          "«mujer eucarística». Pídele que te enseñe a recibir la Comunión con fe y con el alma limpia, a dar " +
          "gracias después y a visitar a Jesús en el sagrario, donde tantas veces está solo. Ofrécele también tus " +
          "distracciones y tus faltas de respeto, y renueva el deseo de amarle cada día más en este sacramento de " +
          "amor.",
        ],
      },
    ],
  },

  dolorosos: {
    nombre: "Misterios Dolorosos",
    dias: "Martes y viernes",
    color: "#ecdff0",
    lista: [
      {
        titulo: "La Oración de Jesús en el Huerto",
        cita: { ref: "Lc 22, 39-46", texto: "" },
        sintesis:
          "En el monte de los Olivos, Jesús se aparta a orar: «Padre, si quieres, aparta de mí este cáliz; pero no " +
          "se haga mi voluntad, sino la tuya». Entra en agonía y su sudor se vuelve como gotas de sangre.",
        fruto: "La conformidad con la voluntad de Dios",
        meditacion:
          "En la noche de Getsemaní, el Hijo eterno siente el peso de todos los pecados del mundo, también los " +
          "tuyos. Los amigos duermen; Él ora con más intensidad. Su abandono en el Padre es total: «no se haga mi " +
          "voluntad, sino la tuya». Acompáñale en su agonía, y en tus propias angustias aprende de Él a orar y a " +
          "confiar, aunque el cáliz sea amargo.",
        profunda: [
          "Después de la Cena, Jesús sale con sus discípulos al monte de los Olivos, a un huerto llamado Getsemaní. " +
          "Es de noche. Pide a Pedro, Santiago y Juan que velen con Él y se aparta un poco, a la distancia de un " +
          "tiro de piedra. Contempla a Jesús postrado en tierra, con el alma triste hasta la muerte. Los amigos que " +
          "le prometieron fidelidad se duermen. Está solo.",
          "Jesús, verdadero Dios y verdadero hombre, siente miedo y angustia ante la Pasión. Ve el peso de todos " +
          "los pecados de la historia, también los tuyos, y el rechazo de tantos por quienes va a morir. Su sudor " +
          "se vuelve como gotas de sangre que caen hasta el suelo. Y en medio de la agonía ora con más intensidad: " +
          "«Padre, si quieres, aparta de mí este cáliz; pero no se haga mi voluntad, sino la tuya». Un ángel del " +
          "cielo lo conforta. Donde Adán dijo «no» en un jardín, Jesús dice «sí» en otro, y nos devuelve la amistad " +
          "con Dios.",
          "Getsemaní nos enseña a orar en la hora de la angustia, cuando no entendemos lo que Dios permite. " +
          "Conformarse con su voluntad no es resignarse con tristeza, sino abandonarse en las manos de un Padre que " +
          "nos ama, aunque el cáliz sea amargo. Presenta a Jesús tus miedos y tus noches oscuras, y acompáñale tú " +
          "también, sin dormirte, en los que hoy sufren. Pide a María que te ayude a decir con su Hijo: «Hágase tu " +
          "voluntad».",
        ],
      },
      {
        titulo: "La Flagelación del Señor",
        cita: { ref: "Jn 19, 1", texto: "" },
        sintesis:
          "Pilato, aun sin encontrar culpa en Jesús, manda azotarlo. El Señor, atado a la columna, recibe en " +
          "silencio los golpes de los soldados.",
        fruto: "La mortificación y la pureza",
        meditacion:
          "El Cuerpo santísimo de Jesús, formado en el seno de María, queda desgarrado por los azotes. Él no " +
          "responde; ofrece su dolor por nosotros. «Por sus llagas hemos sido curados». Contempla tanto amor y pide " +
          "perdón por los pecados que lo hirieron. Ofrece también tus pequeños sacrificios y tus sufrimientos " +
          "unidos a los suyos, por la conversión de los pecadores.",
        profunda: [
          "Pilato no encuentra culpa en Jesús, pero tiene miedo de la multitud y, para contentarla, manda azotarlo. " +
          "Los soldados lo llevan al patio, le quitan la ropa y, según la tradición, lo atan a una columna. " +
          "Contempla al Señor en silencio mientras los látigos desgarran su espalda una y otra vez. No se queja ni " +
          "se defiende. Su sangre cae sobre las piedras.",
          "El profeta Isaías lo había anunciado siglos antes: fue traspasado por nuestras rebeliones, y sus heridas " +
          "nos han curado. En ese Cuerpo, formado en el seno purísimo de María, Jesús repara los pecados que " +
          "cometemos con el nuestro: la sensualidad, la búsqueda desordenada del placer, el desprecio de la " +
          "dignidad del cuerpo propio y ajeno. Cada golpe es una prueba de que no hay herida que su amor no pueda " +
          "curar.",
          "La mortificación cristiana no es desprecio del cuerpo, sino amor que sabe renunciar por algo más grande. " +
          "Son los pequeños sacrificios de cada día: dominar la gula o la pereza, guardar la mirada, aceptar el " +
          "cansancio sin quejarse, ofrecer una enfermedad. Unidos a los dolores de Cristo, tienen un valor inmenso " +
          "para la salvación de las almas. Pide a María, la Virgen purísima, un corazón limpio y la fortaleza para " +
          "cuidar tu cuerpo como templo del Espíritu Santo.",
        ],
      },
      {
        titulo: "La Coronación de espinas",
        cita: { ref: "Mt 27, 27-31", texto: "" },
        sintesis:
          "Los soldados visten a Jesús con un manto de púrpura, le ponen una corona de espinas y una caña en la " +
          "mano, y se burlan de Él arrodillándose: «¡Salve, rey de los judíos!».",
        fruto: "La humildad y el desprecio del mundo",
        meditacion:
          "El Rey del universo es coronado de espinas y tratado como un rey de burla. Jesús acepta la humillación " +
          "para sanar nuestra soberbia y nuestra vanidad. Su realeza no es de este mundo: reina desde el amor que " +
          "se entrega. Pídele que reine de verdad en tus pensamientos y que te libre del afán de aparentar y de " +
          "buscar la aprobación de los demás.",
        profunda: [
          "Después de los azotes, los soldados reúnen a toda la cohorte en el pretorio para burlarse del " +
          "prisionero. Le echan encima un manto de púrpura, trenzan una corona de espinas y se la ponen en la " +
          "cabeza. Le colocan una caña en la mano como si fuera un cetro, se arrodillan ante Él y gritan entre " +
          "risas: «¡Salve, rey de los judíos!». Luego le escupen y le golpean la cabeza con la caña. Contempla el " +
          "rostro de Jesús, ensangrentado y humillado.",
          "Pilato lo presenta después ante la multitud: «He aquí al hombre». Ese hombre coronado de burla es el Rey " +
          "del universo. Jesús había dicho: «Mi reino no es de este mundo». No reina con armas ni con aplausos, " +
          "sino con el amor que se humilla para salvar. Las espinas, que en el Génesis aparecen como fruto del " +
          "pecado, coronan ahora a Aquel que viene a quitar el pecado del mundo. Él soporta el desprecio para sanar " +
          "nuestra soberbia, nuestra vanidad y nuestro afán de ser admirados.",
          "El mundo ofrece coronas que se marchitan: el prestigio, la fama, la opinión de los demás. Cuántas veces " +
          "vivimos pendientes del qué dirán, heridos en el orgullo por una crítica o un olvido. Mira a Jesús " +
          "coronado de espinas y pídele que reine de verdad en tus pensamientos. Pide a María la humildad de " +
          "aceptar las humillaciones sin rencor, la libertad de no buscar aplausos y la alegría de servir sin que " +
          "nadie lo note.",
        ],
      },
      {
        titulo: "Jesús con la Cruz a cuestas camino del Calvario",
        cita: { ref: "Jn 19, 17; Lc 23, 26-32", texto: "" },
        sintesis:
          "Jesús sale cargando con su cruz hacia el Gólgota. Obligan a Simón de Cirene a ayudarle, y le siguen " +
          "mujeres que lloran por Él. «No lloréis por mí; llorad más bien por vosotras y por vuestros hijos».",
        fruto: "La paciencia en las pruebas",
        meditacion:
          "Paso a paso, Jesús avanza con la cruz por las calles de Jerusalén. La tradición del Vía Crucis contempla " +
          "cómo cae y se levanta, y cómo su Madre le sale al encuentro y comparte en silencio su dolor. " +
          "Simón de Cirene, primero obligado, termina ayudando " +
          "por amor. Acepta tu cruz de cada día, sé cireneo para quien sufre a tu lado y camina junto a María detrás " +
          "de su Hijo.",
        profunda: [
          "Condenado a muerte, Jesús sale de la ciudad cargando con su cruz hacia el Calvario. Está agotado por la " +
          "noche sin dormir, por la sangre perdida y por los golpes. Las calles están llenas de gente: unos lo " +
          "insultan, otros miran con curiosidad, algunos lloran. La tradición del Vía Crucis contempla sus caídas y " +
          "el encuentro con su Madre. Contempla la mirada de Jesús y de María cuando se cruzan: no hacen falta " +
          "palabras.",
          "Los soldados obligan a Simón de Cirene, que volvía del campo, a llevar la cruz detrás de Jesús. Lo que " +
          "empezó como una imposición se convirtió para él en una gracia: el Evangelio recuerda los nombres de sus " +
          "hijos, señal probable de que eran conocidos en la primera comunidad cristiana. A las mujeres que lloran " +
          "por Él, Jesús les pide que lloren más bien por ellas y por sus hijos: incluso camino de la cruz piensa " +
          "en los demás. Cargando el madero, carga con nuestras culpas y nos abre el camino de la vida.",
          "«El que quiera venir en pos de mí, que se niegue a sí mismo, tome su cruz cada día y me siga». Tu cruz " +
          "puede ser una enfermedad, un problema familiar, un trabajo difícil, la soledad o tus propios defectos. " +
          "La paciencia no es aguantar con amargura, sino llevar esa cruz con Jesús, sabiendo que no caminas solo. " +
          "Pide a María, que siguió a su Hijo hasta el final, paciencia en las pruebas y un corazón atento para ser " +
          "cireneo de quien sufre a tu lado.",
        ],
      },
      {
        titulo: "La Crucifixión y Muerte de Nuestro Señor",
        cita: { ref: "Lc 23, 33-46; Jn 19, 25-30", texto: "" },
        sintesis:
          "Jesús es crucificado entre dos malhechores. Perdona a quienes le crucifican, promete el paraíso al buen " +
          "ladrón y nos entrega a su Madre: «Ahí tienes a tu madre». Clama: «Padre, en tus manos encomiendo mi espíritu».",
        fruto: "El amor a Dios y la salvación de las almas",
        meditacion:
          "Al pie de la cruz está María, firme en el dolor. Desde el madero, Jesús perdona, promete el paraíso y nos " +
          "la entrega como Madre. Todo está cumplido: el Hijo se ofrece al Padre por amor a cada uno de nosotros. " +
          "Quédate un momento en silencio al pie de la cruz, recibe a María en tu casa como el discípulo amado y " +
          "agradece el precio de tu salvación.",
        profunda: [
          "En el Calvario, los soldados clavan a Jesús en la cruz por las manos y los pies, y la levantan entre dos " +
          "malhechores. Hacia el mediodía, la tierra se cubre de oscuridad. Contempla al Señor suspendido entre el " +
          "cielo y la tierra, con los brazos abiertos como para abrazar al mundo. Al pie de la cruz están María, su " +
          "Madre, algunas mujeres y Juan, el discípulo amado. Muchos se burlan: «A otros salvó; que se salve a sí " +
          "mismo».",
          "Desde la cruz, Jesús pronuncia sus últimas palabras, y cada una revela su amor. Perdona: «Padre, " +
          "perdónalos, porque no saben lo que hacen». Promete al buen ladrón: «Hoy estarás conmigo en el paraíso». " +
          "Nos da a su Madre: «Mujer, ahí tienes a tu hijo»; y al discípulo: «Ahí tienes a tu madre». Clama al " +
          "Padre en su abandono, tiene sed y, al final, dice: «Todo está cumplido», y entrega su espíritu. Un " +
          "soldado le abre el costado con una lanza, y brota sangre y agua, fuente de los sacramentos de la " +
          "Iglesia.",
          "Al pie de la cruz, María une su dolor al de su Hijo y se convierte en Madre de todos nosotros. Ante " +
          "tanto amor, la pregunta es sencilla: ¿qué hago yo por Cristo, que lo ha dado todo por mí? Quédate un " +
          "momento en silencio, mira el crucifijo y da gracias. Pide a María que te enseñe a amar a Dios sobre " +
          "todas las cosas y a desear, como Jesús, la salvación de todas las almas, empezando por las que tienes " +
          "más cerca. Y recíbela en tu casa, como hizo el discípulo amado.",
        ],
      },
    ],
  },

  gloriosos: {
    nombre: "Misterios Gloriosos",
    dias: "Miércoles y domingo",
    color: "#e2eef8",
    lista: [
      {
        titulo: "La Resurrección del Hijo de Dios",
        cita: { ref: "Lc 24, 1-8; Mc 16, 1-7", texto: "" },
        sintesis:
          "Al amanecer del primer día de la semana, las mujeres encuentran el sepulcro vacío. Dos hombres con " +
          "vestidos resplandecientes les dicen: «¿Por qué buscáis entre los muertos al que vive? No está aquí, ha resucitado».",
        fruto: "La fe",
        meditacion:
          "Cristo ha vencido el pecado y la muerte: ¡ha resucitado de verdad! La piedra está corrida y el sepulcro " +
          "vacío. La fe de María, que no se apagó en el Sábado Santo, florece en la alegría pascual. Deja que esta " +
          "victoria ilumine tus tristezas y tus miedos: el Señor vive, camina contigo y te llama a una vida nueva.",
        profunda: [
          "Es el amanecer del primer día de la semana. Unas mujeres van al sepulcro con perfumes para ungir el " +
          "cuerpo de Jesús, preguntándose quién les correrá la piedra. Al llegar, la encuentran ya corrida y el " +
          "sepulcro vacío. Dos hombres con vestidos resplandecientes les dicen: «¿Por qué buscáis entre los muertos " +
          "al que vive? No está aquí, ha resucitado». Contempla su asombro, su temor y la alegría que empieza a " +
          "nacer en ellas.",
          "Cristo ha vencido al pecado y a la muerte. No ha vuelto a la vida de antes, como Lázaro: ha resucitado " +
          "con un cuerpo glorioso que ya no puede morir y que conserva las llagas de la Pasión. Se aparece a María " +
          "Magdalena, a los discípulos de Emaús, a los apóstoles reunidos y a Tomás, que pasa de la duda a la " +
          "confesión más hermosa: «¡Señor mío y Dios mío!». Muchos santos, como san Ignacio de Loyola, contemplan " +
          "que el primer encuentro del Resucitado fue con su Madre, cuya fe no se apagó en el silencio del Sábado " +
          "Santo.",
          "La fe es el don que nos permite creer sin haber visto, como dijo Jesús a Tomás: «Dichosos los que crean " +
          "sin haber visto». La Resurrección cambia el sentido de todo: el dolor, el fracaso y la muerte ya no " +
          "tienen la última palabra. Lleva hoy a Jesús resucitado tus sepulcros cerrados, lo que en ti parece " +
          "muerto o sin esperanza. Pide a María que fortalezca tu fe, que te dé la alegría de la Pascua y que te " +
          "haga testigo de que el Señor vive.",
        ],
      },
      {
        titulo: "La Ascensión del Señor a los Cielos",
        cita: { ref: "Hch 1, 6-11", texto: "" },
        sintesis:
          "Jesús promete a los apóstoles la fuerza del Espíritu Santo para ser sus testigos hasta los confines de la " +
          "tierra. Ante su mirada es elevado y una nube lo oculta. Dos hombres anuncian que volverá del mismo modo.",
        fruto: "La esperanza y el deseo del cielo",
        meditacion:
          "Jesús sube al Padre llevando consigo nuestra humanidad glorificada; donde Él está, esperamos estar " +
          "también nosotros. Antes de partir, confía a los suyos una misión: ser sus testigos. No te quedes mirando " +
          "al cielo con los brazos cruzados: vive con la esperanza puesta en lo alto y los pies en la tierra, " +
          "anunciando con tu vida que Cristo es el Señor.",
        profunda: [
          "Durante cuarenta días después de su Resurrección, Jesús se aparece a sus discípulos y les habla del " +
          "Reino de Dios. Por último, los lleva hacia Betania, al monte de los Olivos. Les promete la fuerza del " +
          "Espíritu Santo para que sean sus testigos hasta los confines de la tierra y, alzando las manos, los " +
          "bendice. Contempla cómo es elevado ante sus ojos hasta que una nube lo oculta, y cómo los apóstoles se " +
          "quedan mirando al cielo.",
          "Jesús no se va para abandonarnos. Sube al Padre llevando consigo nuestra naturaleza humana glorificada: " +
          "en Él, la humanidad entra ya en la gloria de Dios. Está sentado a la derecha del Padre, intercede por " +
          "nosotros y nos prepara un lugar, como prometió: «En la casa de mi Padre hay muchas moradas». Dos hombres " +
          "vestidos de blanco anuncian que volverá del mismo modo. Por eso los apóstoles regresan a Jerusalén con " +
          "gran alegría, no con tristeza.",
          "La esperanza cristiana no es un optimismo vago: es la certeza de que nuestra patria está en el cielo, " +
          "donde Cristo nos espera. Esa esperanza no nos aparta de la tierra, sino que nos da fuerza para trabajar " +
          "en ella y anunciar el Evangelio. Pregúntate si deseas de verdad el cielo o si tu corazón está atado a " +
          "cosas que pasan. Pide a María que te mantenga con la mirada puesta en lo alto y los pies firmes en la " +
          "misión que Dios te ha confiado.",
        ],
      },
      {
        titulo: "La Venida del Espíritu Santo sobre los Apóstoles",
        cita: { ref: "Hch 1, 14; Hch 2, 1-4", texto: "" },
        sintesis:
          "Los apóstoles perseveraban unánimes en la oración con María, la Madre de Jesús. El día de Pentecostés, " +
          "estando todos juntos en un mismo lugar, viene del cielo un ruido como de viento impetuoso y aparecen " +
          "lenguas como de fuego. Todos quedan llenos del Espíritu Santo.",
        fruto: "La docilidad al Espíritu Santo",
        meditacion:
          "En el Cenáculo, la Iglesia naciente persevera en oración junto a María. El Espíritu Santo, Señor y dador " +
          "de vida, desciende como fuego y transforma a hombres temerosos en apóstoles valientes. Invoca al " +
          "Espíritu Santo con la Virgen, Esposa suya: pídele sus dones, que encienda en ti el fuego de su amor y te " +
          "haga dócil a sus inspiraciones.",
        profunda: [
          "Después de la Ascensión, los apóstoles vuelven al Cenáculo. Allí perseveran unánimes en la oración, con " +
          "algunas mujeres y con María, la Madre de Jesús. Todavía son frágiles y temerosos. Contempla a la Virgen " +
          "en medio de ellos, sosteniendo con su fe la esperanza de todos. El día de Pentecostés, de repente, viene " +
          "del cielo un ruido como de viento impetuoso y sobre cada uno se posan lenguas como de fuego.",
          "Todos quedan llenos del Espíritu Santo, el mismo que cubrió a María con su sombra en Nazaret. Aquellos " +
          "hombres temerosos salen a la calle y anuncian con valentía a Cristo resucitado, y cada uno de los " +
          "presentes los oye hablar en su propia lengua: lo que Babel había dividido, el Espíritu lo reúne. Ese " +
          "día, unas tres mil personas reciben el Bautismo. Es el nacimiento de la Iglesia, y el Espíritu Santo " +
          "sigue siendo su alma: la guía, la santifica y reparte sus dones para el bien de todos.",
          "También tú recibiste el Espíritu Santo en el Bautismo y en la Confirmación. Él te habla en la oración, " +
          "en la conciencia, en la Palabra de Dios y por medio de la Iglesia, pero no se impone: espera tu " +
          "docilidad. Pídele sus siete dones —sabiduría, entendimiento, consejo, fortaleza, ciencia, piedad y temor " +
          "de Dios— y que te libre de la tibieza y del miedo. Invócalo junto a María, como los apóstoles en el " +
          "Cenáculo: «Ven, Espíritu Santo, llena los corazones de tus fieles y enciende en ellos el fuego de tu " +
          "amor».",
        ],
      },
      {
        titulo: "La Asunción de Nuestra Señora a los Cielos",
        cita: { ref: "Ap 12, 1; Lc 1, 48-49", texto: "" },
        sintesis:
          "La Escritura contempla a la Mujer vestida de sol y anuncia que todas las generaciones la llamarán " +
          "bienaventurada. La Iglesia proclama como dogma que María, terminado el curso de su vida terrena, fue " +
          "llevada en cuerpo y alma a la gloria celestial.",
        fruto: "La gracia de una buena muerte",
        meditacion:
          "La que llevó en su seno al Autor de la vida no conoció la corrupción del sepulcro. María, Inmaculada, es " +
          "llevada en cuerpo y alma al cielo y nos muestra el destino al que estamos llamados. Ella es signo de " +
          "esperanza cierta y de consuelo para el pueblo de Dios que peregrina. Pídele que te acompañe en la hora de " +
          "tu muerte y que te lleve un día de su mano hasta Jesús.",
        profunda: [
          "Después de Pentecostés, María vive junto al discípulo amado y acompaña con su oración a la Iglesia " +
          "naciente. La Escritura no narra el final de su vida terrena, pero la fe de la Iglesia, celebrada desde " +
          "antiguo en Oriente y en Occidente, contempla su tránsito. Contempla a la Madre de Dios, serena, rodeada " +
          "del cariño de los discípulos, con el deseo de ver de nuevo a su Hijo, que viene a buscarla.",
          "En 1950, el papa Pío XII proclamó como dogma de fe que la Inmaculada Madre de Dios, siempre Virgen, " +
          "terminado el curso de su vida terrena, fue llevada en cuerpo y alma a la gloria celestial. El cuerpo que " +
          "dio carne al Hijo de Dios no conoció la corrupción del sepulcro. María participa de un modo singular en " +
          "la Resurrección de su Hijo: en ella vemos anticipado lo que Dios promete a quienes le son fieles y lo " +
          "que la Iglesia espera llegar a ser.",
          "La Asunción ilumina también nuestra muerte. No es el final, sino el paso al encuentro con Dios, y " +
          "nuestro cuerpo está llamado a resucitar. Por eso, en cada Avemaría pedimos a la Virgen: «ruega por " +
          "nosotros, pecadores, ahora y en la hora de nuestra muerte». Pídele que te ayude a vivir de tal manera " +
          "que estés preparado, que acompañe a tus seres queridos en ese momento y que un día te lleve de su mano " +
          "hasta Jesús.",
        ],
      },
      {
        titulo: "La Coronación de la Santísima Virgen como Reina de Cielos y Tierra",
        cita: { ref: "Ap 12, 1", texto: "" },
        sintesis:
          "Apareció en el cielo una gran señal: una Mujer vestida de sol, con la luna bajo sus pies y sobre su " +
          "cabeza una corona de doce estrellas.",
        fruto: "La perseverancia y la devoción a María",
        meditacion:
          "La Santísima Trinidad corona a María: Hija predilecta del Padre, Madre del Hijo, Esposa del Espíritu " +
          "Santo. Su realeza es de servicio y de misericordia; es Reina porque es Madre. Pon en sus manos tu vida, " +
          "tus intenciones y a quienes amas. Que, por su intercesión, perseveres hasta el final y un día la " +
          "contemples coronada junto a su Hijo.",
        profunda: [
          "El Apocalipsis contempla una gran señal en el cielo: una Mujer vestida de sol, con la luna bajo sus pies " +
          "y una corona de doce estrellas sobre su cabeza. La Iglesia ve en ella también a María, glorificada junto " +
          "a su Hijo. Contempla a la humilde esclava de Nazaret recibida en el cielo por la Santísima Trinidad: el " +
          "Padre, que la eligió como hija predilecta; el Hijo, que nació de ella; el Espíritu Santo, que la cubrió " +
          "con su sombra.",
          "María es Reina porque es la Madre del Rey y porque se asoció como nadie a la obra de la redención. Pero " +
          "su realeza no se parece a la de los poderosos de la tierra: es una realeza de servicio y de " +
          "misericordia. Como la reina madre del antiguo reino de David, que intercedía ante el rey por el pueblo, " +
          "María presenta a su Hijo nuestras súplicas. Por eso la Iglesia la invoca en la Salve como «Reina y Madre " +
          "de misericordia, vida, dulzura y esperanza nuestra».",
          "La perseverancia es la gracia de seguir fieles hasta el final, sin cansarnos de hacer el bien ni de " +
          "volver a empezar después de cada caída. Nadie la alcanza solo: se pide cada día, y María es una Madre " +
          "que no abandona a sus hijos. Pon en sus manos tu vida, tu familia y tus intenciones, y no dejes nunca el " +
          "Rosario. Pídele que, cuando termine tu camino, puedas contemplarla coronada en el cielo y alabar con " +
          "ella a la Santísima Trinidad por toda la eternidad.",
        ],
      },
    ],
  },
};

const ORDINALES = ["Primer", "Segundo", "Tercer", "Cuarto", "Quinto"];
