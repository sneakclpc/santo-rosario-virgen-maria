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
      },
    ],
  },
};

const ORDINALES = ["Primer", "Segundo", "Tercer", "Cuarto", "Quinto"];
