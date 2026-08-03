// Traducciones españolas de las guías — rellenadas por pase de traducción.
// Clave = id de la guía (cf. GUIDE_SLUGS). Una guía ausente aquí queda
// simplemente no disponible en español (filtrada automáticamente).
import type { GuideL10n } from "./guides";

export const guidesEs: Record<string, GuideL10n> = {
  "chauffage-appoint-economique": {
    title:
      "Calefactor de bajo consumo: calienta una habitación pequeña sin disparar la factura",
    metaDescription:
      "¿Cuánto cuesta de verdad un calefactor por hora? Cálculo sencillo, potencia según la superficie, seguridad y errores que debes evitar.",
    intro:
      "Calentar toda la casa para una sola habitación ocupada es la forma más cara de no pasar frío. Un calefactor bien elegido hace justo lo contrario: calienta el sitio donde estás, mientras estás allí. Aquí tienes cómo calcular lo que cuesta de verdad, elegir la potencia adecuada y esquivar las trampas.",
    sections: [
      {
        title: "El coste real por hora: un cálculo de 10 segundos",
        paragraphs: [
          "La fórmula cabe en una línea: potencia (en kW) × horas de uso × precio del kWh. Un calefactor de 1.200 W usado 3 horas cada tarde, con el kWh en torno a 0,25 €, cuesta 1,2 × 3 × 0,25 = 0,90 € por tarde. Unos 27 € al mes — por una habitación realmente caliente, en las horas en las que estás en ella.",
          "La comparación que importa: subir la calefacción central 2 grados para toda la casa cuesta típicamente entre 3 y 5 veces más que calentar de forma puntual la habitación ocupada. El calefactor no es económico «por naturaleza» — lo es porque calienta poco espacio y poco tiempo.",
          "La regla de oro que se deriva de ahí: un calefactor sirve como complemento, habitación por habitación, sesión por sesión. Si lo dejas funcionando 24 h al día en un salón grande y mal aislado, el cálculo se vuelve en tu contra.",
        ],
      },
      {
        title: "Qué potencia para qué superficie",
        paragraphs: [
          "El orden de magnitud estándar: calcula unos 100 W por m² en una habitación con aislamiento normal. A un despacho o dormitorio de 10 a 15 m² le bastan de 1.000 a 1.500 W — no tiene sentido apuntar más alto: un aparato sobredimensionado se enciende y se apaga sin parar y no aporta ningún confort extra.",
          "La tecnología cerámica (PTC) tiene una ventaja concreta en espacios pequeños: alcanza la temperatura en unas decenas de segundos y se autorregula — la resistencia cerámica reduce por sí sola su consumo al acercarse a su temperatura objetivo. Es la elección correcta para sesiones cortas y repetidas, exactamente el uso de despacho o dormitorio.",
          "Desde 2018, la normativa europea (ecodiseño ErP) exige a los calefactores eléctricos una regulación electrónica de la temperatura. Un modelo con termostato electrónico no es un capricho: es lo que evita calentar más de lo necesario, y es obligatorio para poder venderse legalmente en Europa.",
        ],
      },
      {
        title: "Seguridad: las dos protecciones innegociables",
        paragraphs: [
          "Apagado por sobrecalentamiento y apagado por vuelco. Estas dos protecciones deben figurar negro sobre blanco en la ficha técnica. Un calefactor sobre un escritorio o cerca de una cama sin sensor de vuelco es un riesgo, no un ahorro.",
          "Las reglas de uso son las mismas sea cual sea el aparato: nunca cubierto, nunca pegado a un tejido, nunca enchufado a una regleta ya cargada (1.200 W es la mitad de lo que soporta una regleta estándar) y nada de funcionamiento prolongado sin supervisión.",
        ],
      },
      {
        title: "Los errores que salen caros",
        paragraphs: [
          "Calentar una habitación con las ventanas abiertas o muy mal aislada: el aparato funciona a pleno rendimiento sin parar y el coste se dispara. Cinco minutos de ventilación con las ventanas abiertas de par en par y luego cerradas ganan a una ventana entreabierta de forma permanente.",
          "Elegir un aparato infradimensionado «para ahorrar»: uno de 500 W en 20 m² funciona sin alcanzar nunca la temperatura de consigna — consumes sin confort. Mejor la potencia correcta usada durante menos tiempo.",
          "Descuidar la colocación: en el suelo o sobre el escritorio, con el flujo de aire orientado hacia ti, no hacia la puerta. El calor de un termoventilador es direccional — esa es su fuerza en un puesto de trabajo, siempre que lo orientes bien.",
        ],
      },
    ],
  },
  "choisir-gants-chauffants": {
    title:
      "Guantes calefactables: USB, batería, niveles — cómo elegir sin equivocarte",
    metaDescription:
      "¿USB 5 V, pilas o batería de 7,4 V? Autonomía real, zonas de calor, cuidados: la guía honesta para elegir unos guantes calefactables.",
    intro:
      "No todos los «guantes calefactables» calientan igual — y la diferencia depende casi por completo de la alimentación. Esta guía explica lo que hace realmente cada tipo, qué mirar en una ficha de producto y para qué uso tiene sentido cada opción.",
    sections: [
      {
        title: "La alimentación lo decide todo",
        paragraphs: [
          "USB 5 V con cable: los guantes se conectan a una powerbank guardada en el bolsillo. Es la solución más sencilla y asequible. El calor es suave — piensa en «fondo de calor permanente» más que en «radiador en las manos». Ideal para la oficina fría, los paseos urbanos y las manos sensibles al frío.",
          "Compartimento de pilas: un alojamiento integrado en la muñeca alimenta las zonas de calor. Un escalón por encima del 5 V en intensidad, sin cable que estorbe. La autonomía depende de las pilas — cuenta con usar recargables.",
          "Batería de litio de 7,4 V: es la categoría que calienta fuerte, la de los motoristas y los deportes de invierno. Prevé un presupuesto claramente superior — por debajo de cierto precio, un guante «de 7,4 V» normalmente no lo es. Si un anuncio barato promete un calor intenso, esa es la primera señal de alarma.",
        ],
      },
      {
        title: "Autonomía real: las cifras que hay que conocer",
        paragraphs: [
          "Con una powerbank de 10.000 mAh, unos guantes USB aguantan en la práctica de 3 a 6 horas según el nivel de calor elegido. Nivel máximo = autonomía dividida entre dos respecto al nivel suave: la mayoría de los usuarios encuentra su equilibrio en el nivel intermedio.",
          "El tiempo de calentamiento, en cambio, es corto en todos los casos: el calor se nota entre los 30 segundos y los 2 minutos. Lo que varía entre gamas es el techo de temperatura, no la velocidad.",
        ],
      },
      {
        title: "Qué comprobar en la ficha de producto",
        paragraphs: [
          "Las zonas de calor: palma + parte superior de los dedos es la configuración eficaz — el dorso de la mano y los dedos son lo primero que sufre. Algunos modelos de entrada solo calientan el dorso de la mano: calor real muy limitado.",
          "Índice táctil para seguir usando el teléfono, tejido hidrófugo para la llovizna (hidrófugo ≠ impermeable: ningún guante calefactable de consumo debe sumergirse en agua) y lavado a mano una vez desconectado el cable o la batería.",
          "Niveles de calor: con tres basta. Más es marketing; menos te deja sin posición de «ahorro de autonomía».",
        ],
      },
      {
        title: "Para qué uso, qué elección",
        paragraphs: [
          "Oficina fría, trayectos a pie, manos frías crónicas: USB 5 V, presupuesto contenido y autonomía cómoda con powerbank. Scooter y bici con frío: pilas o 7,4 V según el presupuesto — y zonas de calor que cubran bien los dedos. Moto en invierno y deportes de montaña: 7,4 V sin dudarlo — es el precio del calor real a -5 °C.",
        ],
      },
    ],
  },
  "plaid-chauffant-guide": {
    title:
      "Manta eléctrica de sofá: consumo real, seguridad y criterios que importan",
    metaDescription:
      "¿Cuánto consume una manta eléctrica? ¿Es segura para quedarse dormido? ¿Se puede lavar? La guía honesta antes de comprar una manta calefactable.",
    intro:
      "La manta eléctrica de sofá es el objeto más rentable del invierno: calienta a la persona, no la habitación. Pero entre los modelos que no se pueden lavar, los que nunca se apagan y las potencias de fantasía, hay mucho que filtrar. Esto es lo que de verdad importa.",
    sections: [
      {
        title: "El consumo: unos céntimos por tarde",
        paragraphs: [
          "Una manta eléctrica consume típicamente en torno a 100 W — es decir, a 0,25 €/kWh, unos 0,025 € por hora y 8 céntimos por una tarde de 3 horas. Un mes de uso diario cuesta menos de 2,50 €. Es entre 10 y 15 veces menos que un calefactor, porque el calor va directamente sobre ti en lugar de calentar el aire.",
          "El cálculo que se deriva es sencillo: bajar el termostato del salón 2 grados e instalarte bajo una manta eléctrica es uno de los mejores intercambios confort/factura del invierno.",
        ],
      },
      {
        title: "Seguridad: las dos funciones innegociables",
        paragraphs: [
          "Primero, el apagado automático: una buena manta se apaga sola pasado un tiempo (típicamente 3 horas). Es lo que permite quedarse dormido debajo sin darle vueltas. Un modelo sin apagado automático no tiene sitio en un sofá.",
          "Después, la protección contra el sobrecalentamiento: el elemento calefactor debe cortarse si un punto de la manta se calienta de forma anormal (una manta doblada, por ejemplo). En los productos serios, de eso se encarga un sensor doble (PTC + NTC).",
          "Y por último, lo básico: enchufe europeo de 220–240 V y marcado CE con un certificado real detrás — para una manta eléctrica, la norma aplicable es la EN 60335-2-17. Un logo CE impreso sin certificado no protege a nadie.",
        ],
      },
      {
        title: "Lavable a máquina: el criterio que lo decide todo",
        paragraphs: [
          "Una manta de sofá vive en el sofá: acabará llevándose café, migas y pelos de gato. Si no puede ir a la lavadora, termina hecha una bola en un armario antes de febrero.",
          "El mecanismo que hay que comprobar: un controlador desmontable. Se desconecta el mando y el textil va a la lavadora a 30 °C, centrifugado suave, sin secadora. Si la ficha de producto no menciona claramente el controlador desmontable, da la manta por no lavable.",
        ],
      },
      {
        title: "Tamaño y tejido: lo que cambia el confort",
        paragraphs: [
          "El formato de 130 × 180 cm es el buen estándar de sofá: lo bastante grande para cubrirte de los pies a los hombros, lo bastante compacto para seguir siendo una manta de sofá y no una de cama. Por debajo de 120 cm de ancho, te pasas la tarde recolocándotela sobre las piernas.",
          "En cuanto al tejido, la franela de doble cara (o franela + sherpa) conserva el calor claramente mejor entre dos ciclos de calentamiento que un polar fino — la manta sigue caliente incluso apagada, lo que permite calentar de forma intermitente y consumir todavía menos.",
        ],
      },
    ],
  },
  "gilet-chauffant-guide": {
    title:
      "Chaleco calefactable: zonas, autonomía real, tallas — la guía sin marketing",
    metaDescription:
      "¿Cuántas zonas de calor necesitas de verdad? ¿Por qué la autonomía anunciada es falsa? ¿Qué talla pedir? Guía honesta del chaleco calefactable USB.",
    intro:
      "El chaleco calefactable es la prenda calefactable más eficaz: calienta el tronco y el cuerpo redistribuye. Pero también es la categoría donde el marketing más exagera — zonas contadas con generosidad, autonomías irreales, tallas engañosas. Pongamos las cifras en su sitio.",
    sections: [
      {
        title: "Las zonas de calor: la ubicación importa más que el número",
        paragraphs: [
          "Las fichas anuncian 9, 21 y a veces 28 «zonas». En la práctica, lo que cuenta está en otra parte: la espalda y la zona lumbar deben quedar cubiertas (es donde el calor relaja y se difunde), el cuello es un plus real con mucho frío, y las secciones controlables por separado (delante / detrás) evitan achicharrarte el pecho para tener la espalda caliente.",
          "Un chaleco con 6 zonas bien situadas y controlables gana a uno con 28 microzonas conectadas todas al mismo botón.",
        ],
      },
      {
        title: "La autonomía real (y por qué las fichas mienten)",
        paragraphs: [
          "Las «8 a 10 horas» de los anuncios corresponden al nivel mínimo, a menudo con una sola zona activa. En uso real con una powerbank de 10.000 mAh, cuenta con unas 3 horas a plena potencia — más en modo medio o eco. Suficiente para un trayecto, un partido o una sesión de trabajo en una habitación fría; no para un día entero de esquí.",
          "Dos detalles que lo cambian todo: la powerbank casi nunca va incluida (presupuesta 15–25 € extra) y el calentamiento es claramente más potente con una powerbank capaz de entregar 20 W que con un modelo antiguo de 10 W.",
        ],
      },
      {
        title: "Tallas: la regla de la talla de más",
        paragraphs: [
          "La práctica totalidad de los chalecos calefactables del mercado usa tallaje asiático: pide una talla por encima de tu talla EU habitual — una M pide una L, una L pide una XL. Es la primera causa de devolución de la categoría.",
          "La buena prueba al recibirlo: el chaleco debe quedar pegado al cuerpo (el calor se transmite por contacto) pero dejar sitio para una capa fina debajo. Demasiado ajustado, comprime las zonas de calor; demasiado holgado, el calor se pierde.",
        ],
      },
      {
        title: "Cuidados y vida útil",
        paragraphs: [
          "Un chaleco de grafeno se lava a máquina en frío, con programa delicado, sin centrifugado fuerte y sin secadora — tras sacar la powerbank del bolsillo. No retuerzas nunca el textil: ese es el gesto que rompe las pistas calefactoras.",
          "Al guardarlo en primavera, dóblalo sin aplastar las zonas de calor y almacena la powerbank cargada a la mitad: es la pieza que más rápido envejece.",
        ],
      },
    ],
  },
  "pieds-froids-guide": {
    title:
      "Pies fríos: plantillas calefactables o zapatillas calefactables, qué elegir según tu caso",
    metaDescription:
      "¿Pies helados fuera, en la oficina o en casa? Plantillas calefactables vs zapatillas calefactables: autonomía, usos, límites — la comparativa honesta.",
    intro:
      "Los pies son la extremidad que el cuerpo sacrifica primero cuando tiene frío: la circulación se ralentiza en ellos para proteger el tronco. Resultado: puedes tener calor en todo el cuerpo y los dedos de los pies helados. Existen dos respuestas calefactables — y no sirven en absoluto para el mismo momento.",
    sections: [
      {
        title: "Fuera y en movimiento: las plantillas calefactables",
        paragraphs: [
          "En cuanto llevas zapatos — caminar, obra, estadio, caza, esquí — la única opción que funciona es la plantilla calefactable con batería integrada. Los modelos recientes alojan la batería en la propia plantilla: sin caja en el tobillo, sin cable, y con un mando a distancia para cambiar de nivel sin descalzarte.",
          "La autonomía honesta: de 3 a 7 horas según el nivel. Las «9 horas» de los anuncios corresponden al nivel mínimo. Y una advertencia de fábrica que hay que tomarse en serio: la plantilla se recorta a tu talla únicamente por las líneas marcadas — nunca en la zona del elemento calefactor.",
        ],
      },
      {
        title: "En casa: las zapatillas calefactables",
        paragraphs: [
          "En interior, la zapatilla calefactable es más sencilla y más cómoda: calor en la parte delantera del pie, interior suave que conserva la temperatura y alimentación USB sin batería que gestionar. Es la solución del teletrabajo, de la noche frente a la tele y de las plantas bajas frías.",
          "Su límite es su fuerza: enchufada, no llega muy lejos. Para moverte por casa, elige un modelo con cable desmontable que conserve el calor acumulado durante unas decenas de minutos.",
        ],
      },
      {
        title: "Los errores que lo estropean todo",
        paragraphs: [
          "Lavar una plantilla calefactable: el agua — e incluso una sudoración muy abundante — daña el elemento calefactor. El cuidado correcto es un paño húmedo por la superficie, nunca la inmersión.",
          "Superponer dos pares de calcetines gruesos: comprime el pie, ralentiza aún más la circulación y aísla el pie… de la plantilla calefactable. Un solo par de calcetines de calidad, y el calor pasa.",
          "Esperar a tener los pies helados para encender: la calefacción sirve para mantener los pies calientes, no para recalentar unos pies ya fríos a través de las durezas del pie. Se enciende al salir de casa, no una hora después.",
        ],
      },
    ],
  },
  "chauffe-mains-guide": {
    title:
      "Calientamanos recargable: autonomía real, avión y cómo elegir bien",
    metaDescription:
      "mAh inflados, autonomía real, normas en el avión, calientamanos vs guantes calefactables: la guía honesta del calientamanos eléctrico recargable.",
    intro:
      "El calientamanos recargable ha sustituido a los sobres desechables: unos segundos para calentar, cientos de ciclos y, a menudo, una función de powerbank de regalo. Pero la categoría tiene sus trampas — capacidades infladas, autonomías teóricas y unas normas de transporte que pocas fichas mencionan.",
    sections: [
      {
        title: "Autonomía: las cifras reales",
        paragraphs: [
          "Un calientamanos serio aguanta de 4 a 8 horas en el nivel alto — las «15 horas» de los anuncios corresponden al nivel mínimo de un modelo de doble batería. Tres niveles entre 45 y 55 °C bastan: por encima, ya no puedes sostener el objeto en la mano.",
          "Desconfía de las capacidades anunciadas: los «10.000 mAh» a 8 € suelen ser 5.000 mAh reales. El formato doble magnético — dos unidades separables, una por bolsillo — es el más polivalente: calor en ambos lados mientras caminas y un solo bloque que recargar.",
        ],
      },
      {
        title: "En avión: cabina sí, bodega no",
        paragraphs: [
          "Es una batería de litio: viaja obligatoriamente en cabina, nunca en una maleta facturada. La regla vale para todos los aparatos con batería integrada. En la práctica: llévalo en el bolso o en el bolsillo del abrigo, y sin problema hasta 100 Wh — un calientamanos suele tener entre 15 y 40.",
          "En el mismo capítulo de seguridad: no compres la gama de entrada a 3–4 €. La categoría está bajo una vigilancia real de los reguladores, y la diferencia de precio está precisamente en el chip de control de temperatura y en la calidad de la celda.",
        ],
      },
      {
        title: "¿Calientamanos o guantes calefactables?",
        paragraphs: [
          "No se excluyen: se complementan. El calientamanos gana cuando las manos deben quedar libres y descubiertas de forma intermitente: fotos, carrito del bebé, espera en la parada del bus, oficina helada. Los guantes ganan en uso continuo al aire libre: bici, scooter, senderismo.",
          "El combo más eficaz con mucho frío: guantes calefactables puestos y calientamanos en los bolsillos para las pausas — que además hace de fuente de energía de emergencia para el teléfono.",
        ],
      },
    ],
  },
};
