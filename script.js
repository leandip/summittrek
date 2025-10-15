let respuestas = {
    duracion: 0,
    dificultad: '',
    paisaje: ''
};
let preguntaActual = 0;
const preguntas = ['pregunta1', 'pregunta2', 'pregunta3'];

// Mapeo de excursiones y sus enlaces (¡Asegúrate de cambiar estos links!)
const excursiones = {
    champaqui: {
        nombre: "Cerro Champaquí",
        descripcion: "¡Tu desafío te espera! Una exigente aventura de 3 días para alcanzar el pico más alto. Dificultad: Media-Alta.",
        link: "https://www.summittrek.com/champaqui" 
    },
    losGigantes: {
        nombre: "Los Gigantes",
        descripcion: "Ideal para un fin de semana activo. Dos días explorando formaciones rocosas únicas. Dificultad: Media.",
        link: "https://www.summittrek.com/los-gigantes" 
    },
    puebloEscondido: {
        nombre: "Pueblo Escondido",
        descripcion: "Una caminata accesible de 2 días a un fascinante pueblo minero abandonado. Dificultad: Baja-Moderada.",
        link: "https://www.summittrek.com/pueblo-escondido" 
    },
    volcanesPocho: {
        nombre: "Volcanes de Pocho",
        descripcion: "Una inmersión de 3 días para descubrir la zona de volcanes extintos. Naturaleza y geología. Dificultad: Baja-Media.",
        link: "https://www.summittrek.com/volcanes-pocho" 
    },
    laCumbrecita: {
        nombre: "Excursiones de 1 Día en La Cumbrecita",
        descripcion: "Perfecto para una escapada rápida. Recorridos de baja a media dificultad en un entorno alpino. ¡Ideal para desconectar!",
        link: "https://www.summittrek.com/la-cumbrecita" 
    },
    fallback: {
         nombre: "Excursión a Medida",
         descripcion: "Tu perfil es único. Contáctanos para armar una aventura personalizada o visita nuestras opciones principales.",
         link: "https://www.summittrek.com/contacto" 
    }
};

// Asigna event listeners a los botones de respuesta
document.addEventListener('DOMContentLoaded', () => {
    // Escuchamos clics en todos los botones que tienen la clase 'btn'
    const botonesRespuesta = document.querySelectorAll('.pantalla .btn');
    botonesRespuesta.forEach(btn => {
        // Solo para los botones con data-score (las preguntas)
        if (btn.hasAttribute('data-score')) {
            btn.addEventListener('click', () => siguientePregunta(btn));
        }
    });

    // Event listener para el botón de reiniciar (en la pantalla de resultado)
    document.getElementById('btn-reiniciar').addEventListener('click', () => {
        window.location.reload();
    });
});


// Función que maneja el inicio del test
function iniciarTest() {
    document.getElementById('bienvenida').style.display = 'none';
    document.getElementById(preguntas[preguntaActual]).style.display = 'flex';
}

// Función que maneja el avance y registro de respuestas
function siguientePregunta(btn) {
    // 1. Guardar la respuesta
    const score = btn.getAttribute('data-score').split(':');
    const tipo = score[0];
    const valor = score[1];

    if (tipo === 'duracion') {
        respuestas.duracion = parseInt(valor);
    } else {
        respuestas[tipo] = valor;
    }

    // 2. Ocultar la pregunta actual
    document.getElementById(preguntas[preguntaActual]).style.display = 'none';

    // 3. Avanzar o mostrar resultado
    preguntaActual++;
    if (preguntaActual < preguntas.length) {
        document.getElementById(preguntas[preguntaActual]).style.display = 'flex';
    } else {
        determinarYMostrarResultado();
    }
}

// Función principal para determinar la excursión
function determinarYMostrarResultado() {
    let resultadoFinal = excursiones.fallback; // Fallback por defecto
    const { duracion, dificultad, paisaje } = respuestas;

    // Regla 1: 1 DÍA
    if (duracion === 1) {
        resultadoFinal = excursiones.laCumbrecita;
    } 
    // Regla 2: 2 DÍAS o 3 DÍAS
    else {
        // PERFIL: ALTA DIFICULTAD / GRANDES PICOS -> CHAMPAQUÍ (3 DÍAS)
        if (dificultad === 'alta' || paisaje === 'picos') {
            resultadoFinal = excursiones.champaqui;
        } 
        // PERFIL: MEDIA DIFICULTAD / ROCAS -> LOS GIGANTES (2 DÍAS)
        else if (dificultad === 'media' || paisaje === 'rocas') {
            resultadoFinal = excursiones.losGigantes;
        } 
        // PERFIL: BAJA DIFICULTAD / HISTÓRICO -> PUEBLO ESCONDIDO (2 DÍAS)
        else if (dificultad === 'baja' || paisaje === 'historico') {
             resultadoFinal = excursiones.puebloEscondido;
        } 
        // PERFIL: PAISAJE GEOLÓGICO (Volcanes de Pocho es 3 días, Baja-Media)
        else if (paisaje === 'geologico') {
             resultadoFinal = excursiones.volcanesPocho;
        }
    }


    // Aplicar los datos al HTML
    document.getElementById('nombre-excursion').textContent = resultadoFinal.nombre;
    document.getElementById('descripcion-excursion').textContent = resultadoFinal.descripcion;
    document.getElementById('link-excursion').href = resultadoFinal.link;

    // Mostrar la pantalla de resultado
    document.getElementById('resultado').style.display = 'flex';
}
