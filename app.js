/* =========================================================
   DÍA DE LAS FLORES AMARILLAS
   De parte de Gudi Escalante
   APP.JS
========================================================= */

"use strict";


/* =========================================================
   01. CONFIGURACIÓN GENERAL
========================================================= */

const NS =
    "http://www.w3.org/2000/svg";


const body =
    document.body;


const intro =
    document.getElementById(
        "intro"
    );


const startButton =
    document.getElementById(
        "startButton"
    );


const bouquet =
    document.getElementById(
        "bouquet"
    );


const stemsLayer =
    document.getElementById(
        "stemsLayer"
    );


const leavesLayer =
    document.getElementById(
        "leavesLayer"
    );


const budsLayer =
    document.getElementById(
        "budsLayer"
    );


const flowersLayer =
    document.getElementById(
        "flowersLayer"
    );


const stars =
    document.getElementById(
        "stars"
    );


const bokehLayer =
    document.getElementById(
        "bokehLayer"
    );


let experienceStarted =
    false;


let petalTimer =
    null;


let foregroundPetalTimer =
    null;


let ambientParticleTimer =
    null;


/* =========================================================
   02. SVG DE LAS ABEJAS
========================================================= */

function getBeeSVG(){

    return `

        <svg
            viewBox="0 0 100 70"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >

            <!-- ALAS -->

            <ellipse
                class="bee-wing"
                cx="44"
                cy="22"
                rx="24"
                ry="13"
                fill="rgba(225,242,255,.70)"
                stroke="rgba(255,255,255,.60)"
                stroke-width="2"
                transform="rotate(-25 44 22)"
            />


            <ellipse
                class="bee-wing right"
                cx="65"
                cy="20"
                rx="23"
                ry="12"
                fill="rgba(225,242,255,.62)"
                stroke="rgba(255,255,255,.52)"
                stroke-width="2"
                transform="rotate(25 65 20)"
            />


            <!-- CUERPO -->

            <ellipse
                cx="53"
                cy="42"
                rx="28"
                ry="18"
                fill="#ffc927"
            />


            <!-- FRANJAS -->

            <path
                d="
                    M38 27
                    Q32 42
                    39 56
                "
                fill="none"
                stroke="#34250c"
                stroke-width="7"
            />


            <path
                d="
                    M53 24
                    Q48 42
                    54 59
                "
                fill="none"
                stroke="#34250c"
                stroke-width="7"
            />


            <path
                d="
                    M68 27
                    Q64 42
                    69 55
                "
                fill="none"
                stroke="#34250c"
                stroke-width="6"
            />


            <!-- CABEZA -->

            <circle
                cx="23"
                cy="42"
                r="13"
                fill="#34250c"
            />


            <!-- OJO -->

            <circle
                cx="17"
                cy="38"
                r="2.7"
                fill="#ffffff"
            />


            <circle
                cx="17"
                cy="38"
                r="1.2"
                fill="#111111"
            />


            <!-- ANTENAS -->

            <path
                d="
                    M18 30
                    Q9 17
                    4 20
                "
                fill="none"
                stroke="#34250c"
                stroke-width="2"
                stroke-linecap="round"
            />


            <path
                d="
                    M26 29
                    Q25 15
                    34 13
                "
                fill="none"
                stroke="#34250c"
                stroke-width="2"
                stroke-linecap="round"
            />


            <!-- AGUIJÓN -->

            <path
                d="
                    M80 40
                    L94 44
                    L80 48
                    Z
                "
                fill="#34250c"
            />

        </svg>

    `;

}


/* =========================================================
   03. INSERTAR ABEJAS
========================================================= */

document
    .querySelectorAll(
        ".bee"
    )
    .forEach(
        bee => {

            bee.innerHTML =
                getBeeSVG();

        }
    );


/* =========================================================
   04. CREAR ESTRELLAS
========================================================= */

function createStars(){

    if(
        !stars
    ){
        return;
    }


    stars.innerHTML =
        "";


    const starCount =

        window.innerWidth < 500

        ? 65

        : 115;


    for(
        let i = 0;
        i < starCount;
        i++
    ){

        const star =
            document.createElement(
                "span"
            );


        star.className =
            "star";


        star.style.left =
            Math.random() * 100
            + "%";


        star.style.top =
            Math.random() * 78
            + "%";


        star.style.setProperty(
            "--star-size",

            (
                .8
                +
                Math.random() * 1.8
            )
            + "px"
        );


        star.style.setProperty(
            "--star-time",

            (
                1.8
                +
                Math.random() * 3
            )
            + "s"
        );


        star.style.setProperty(
            "--star-delay",

            (
                Math.random() * 2
            )
            + "s"
        );


        stars.appendChild(
            star
        );

    }

}


createStars();


/* =========================================================
   05. CREAR BOKEH
========================================================= */

function createBokeh(){

    if(
        !bokehLayer
    ){
        return;
    }


    bokehLayer.innerHTML =
        "";


    const bokehCount =

        window.innerWidth < 500

        ? 8

        : 15;


    for(
        let i = 0;
        i < bokehCount;
        i++
    ){

        const light =
            document.createElement(
                "span"
            );


        light.className =
            "bokeh";


        const size =

            15
            +
            Math.random() * 45;


        light.style.width =
            size
            + "px";


        light.style.height =
            size
            + "px";


        light.style.left =
            Math.random() * 100
            + "%";


        light.style.top =

            (
                45
                +
                Math.random() * 50
            )
            + "%";


        light.style.setProperty(
            "--bokeh-time",

            (
                4
                +
                Math.random() * 5
            )
            + "s"
        );


        light.style.setProperty(
            "--bokeh-x",

            (
                Math.random() * 40
                -
                20
            )
            + "px"
        );


        bokehLayer.appendChild(
            light
        );

    }

}


createBokeh();


/* =========================================================
   06. DATOS DE LAS FLORES
========================================================= */

const flowerData = [

    {
        x:145,
        y:355,
        scale:.64,
        delay:1.75,
        tilt:-17,
        perspective:.82
    },

    {
        x:205,
        y:282,
        scale:.76,
        delay:1.90,
        tilt:14,
        perspective:.90
    },

    {
        x:270,
        y:215,
        scale:.88,
        delay:2.05,
        tilt:-11,
        perspective:.94
    },

    {
        x:335,
        y:160,
        scale:.98,
        delay:2.20,
        tilt:8,
        perspective:1
    },

    {
        x:402,
        y:120,
        scale:1.06,
        delay:2.35,
        tilt:-5,
        perspective:1
    },

    {
        x:470,
        y:108,
        scale:1.12,
        delay:2.50,
        tilt:4,
        perspective:1
    },

    {
        x:540,
        y:145,
        scale:1.01,
        delay:2.65,
        tilt:-8,
        perspective:.98
    },

    {
        x:610,
        y:205,
        scale:.91,
        delay:2.80,
        tilt:11,
        perspective:.93
    },

    {
        x:680,
        y:275,
        scale:.79,
        delay:2.95,
        tilt:-14,
        perspective:.88
    },

    {
        x:747,
        y:355,
        scale:.64,
        delay:3.10,
        tilt:17,
        perspective:.80
    },

    {
        x:320,
        y:290,
        scale:.76,
        delay:2.95,
        tilt:-13,
        perspective:.86
    },

    {
        x:445,
        y:265,
        scale:.88,
        delay:3.10,
        tilt:5,
        perspective:.94
    },

    {
        x:565,
        y:292,
        scale:.75,
        delay:3.25,
        tilt:13,
        perspective:.84
    }

];


/* =========================================================
   07. MENSAJES SECRETOS DE LAS FLORES
========================================================= */

const flowerMessages = [

    "Que nunca te falten motivos para sonreír 🌻",

    "Que tus días siempre tengan un poco de color ✨",

    "Que sigas brillando a tu manera 💛",

    "Que nunca dejes de disfrutar los pequeños momentos 🌼",

    "Que la alegría siempre encuentre el camino hacia ti ✨",

    "Que conserves siempre esa esencia que te hace especial 🌻",

    "Que cada sueño encuentre una razón para florecer 💫",

    "Que siempre encuentres belleza en los pequeños detalles 🌼",

    "Que nunca te falte una buena energía para continuar 💛",

    "Que guardes muchos momentos bonitos en tu vida ✨",

    "Que la vida te sorprenda con cosas bonitas 🌻",

    "Que hoy tengas una razón más para sonreír 💛",

    "Feliz Día de las Flores Amarillas 🌻"

];


/* =========================================================
   08. CREAR TALLOS
========================================================= */

function createStem(
    data,
    index
){

    const path =
        document.createElementNS(
            NS,
            "path"
        );


    const startX =

        450
        +
        (
            Math.random() * 16
            -
            8
        );


    const startY =
        665;


    const control1X =

        startX
        +
        (
            data.x
            -
            startX
        )
        * .16
        +
        (
            Math.random() * 50
            -
            25
        );


    const control1Y =

        515
        +
        Math.random() * 45;


    const control2X =

        data.x
        +
        (
            Math.random() * 80
            -
            40
        );


    const control2Y =

        data.y
        +
        125
        +
        Math.random() * 70;


    path.setAttribute(

        "d",

        `
        M ${startX} ${startY}

        C
        ${control1X} ${control1Y},
        ${control2X} ${control2Y},
        ${data.x} ${data.y}
        `

    );


    path.setAttribute(
        "class",
        "stem"
    );


    path.style.animationDelay =

        (
            .2
            +
            index * .075
        )
        + "s";


    stemsLayer.appendChild(
        path
    );


    createLeaves(
        startX,
        startY,
        data,
        index
    );

}


/* =========================================================
   09. CREAR HOJAS
========================================================= */

function createLeaves(
    startX,
    startY,
    data,
    index
){

    const amount =

        index % 3 === 0

        ? 2

        : 1;


    for(
        let i = 0;
        i < amount;
        i++
    ){

        const t =

            .38
            +
            i * .18
            +
            Math.random() * .07;


        const x =

            startX
            +
            (
                data.x
                -
                startX
            )
            * t;


        const y =

            startY
            +
            (
                data.y
                -
                startY
            )
            * t;


        const direction =

            (
                index
                +
                i
            )
            % 2 === 0

            ? -1

            : 1;


        const width =

            50
            +
            Math.random() * 23;


        const height =

            16
            +
            Math.random() * 11;


        const endX =

            x
            +
            width * direction;


        const leaf =
            document.createElementNS(
                NS,
                "path"
            );


        leaf.setAttribute(

            "d",

            `
            M ${x} ${y}

            C
            ${x + 18 * direction}
            ${y - height},

            ${endX - 15 * direction}
            ${y - height},

            ${endX}
            ${y}

            C
            ${endX - 20 * direction}
            ${y + height},

            ${x + 15 * direction}
            ${y + height},

            ${x}
            ${y}

            Z
            `

        );


        leaf.setAttribute(
            "class",
            "leaf"
        );


        leaf.style.animationDelay =

            (
                1.05
                +
                index * .08
                +
                i * .15
            )
            + "s";


        leavesLayer.appendChild(
            leaf
        );

    }

}


/* =========================================================
   10. CREAR FLOR
========================================================= */

function createFlower(
    data,
    index
){

    /* -----------------------------------------------------
       GRUPO DE POSICIÓN
    ----------------------------------------------------- */

    const positionGroup =
        document.createElementNS(
            NS,
            "g"
        );


    positionGroup.setAttribute(
        "class",
        "flower-position"
    );


    positionGroup.setAttribute(

        "transform",

        `
        translate(
            ${data.x}
            ${data.y}
        )

        rotate(
            ${data.tilt}
        )

        scale(
            ${data.scale}
            ${data.scale * data.perspective}
        )
        `

    );


    /* -----------------------------------------------------
       GRUPO DE LA FLOR
    ----------------------------------------------------- */

    const flower =
        document.createElementNS(
            NS,
            "g"
        );


    flower.setAttribute(
        "class",
        "flower"
    );


    flower.style.animationDelay =
        data.delay
        + "s";


    /* -----------------------------------------------------
       PÉTALOS EXTERIORES
    ----------------------------------------------------- */

    const outerCount =
        20;


    for(
        let i = 0;
        i < outerCount;
        i++
    ){

        const petal =
            document.createElementNS(
                NS,
                "ellipse"
            );


        const variation =

            Math.sin(
                i * 2.31
            )
            * 3;


        petal.setAttribute(
            "class",
            "petal"
        );


        petal.setAttribute(
            "cx",
            "0"
        );


        petal.setAttribute(
            "cy",
            -48 + variation
        );


        petal.setAttribute(
            "rx",
            16 + (i % 3)
        );


        petal.setAttribute(
            "ry",
            39 + (i % 4)
        );


        petal.setAttribute(
            "transform",
            `rotate(${i * 18})`
        );


        flower.appendChild(
            petal
        );

    }


    /* -----------------------------------------------------
       PÉTALOS MEDIOS
    ----------------------------------------------------- */

    for(
        let i = 0;
        i < 16;
        i++
    ){

        const petal =
            document.createElementNS(
                NS,
                "ellipse"
            );


        petal.setAttribute(
            "class",
            "petal middle"
        );


        petal.setAttribute(
            "cx",
            "0"
        );


        petal.setAttribute(
            "cy",
            "-34"
        );


        petal.setAttribute(
            "rx",
            "13"
        );


        petal.setAttribute(
            "ry",
            "30"
        );


        petal.setAttribute(

            "transform",

            `rotate(
                ${i * 22.5 + 11}
            )`

        );


        flower.appendChild(
            petal
        );

    }


    /* -----------------------------------------------------
       PÉTALOS INTERNOS
    ----------------------------------------------------- */

    for(
        let i = 0;
        i < 12;
        i++
    ){

        const petal =
            document.createElementNS(
                NS,
                "ellipse"
            );


        petal.setAttribute(
            "class",
            "petal inner"
        );


        petal.setAttribute(
            "cx",
            "0"
        );


        petal.setAttribute(
            "cy",
            "-23"
        );


        petal.setAttribute(
            "rx",
            "10"
        );


        petal.setAttribute(
            "ry",
            "21"
        );


        petal.setAttribute(
            "transform",
            `rotate(${i * 30})`
        );


        flower.appendChild(
            petal
        );

    }


    /* -----------------------------------------------------
       CENTRO DE LA FLOR
    ----------------------------------------------------- */

    const core =
        document.createElementNS(
            NS,
            "circle"
        );


    core.setAttribute(
        "class",
        "flower-core"
    );


    core.setAttribute(
        "r",
        "31"
    );


    flower.appendChild(
        core
    );


    /* -----------------------------------------------------
       SEMILLAS
    ----------------------------------------------------- */

    for(
        let ring = 1;
        ring <= 4;
        ring++
    ){

        const amount =

            8
            +
            ring * 7;


        for(
            let i = 0;
            i < amount;
            i++
        ){

            const angle =

                Math.PI
                * 2
                / amount
                * i;


            const radius =

                ring
                * 5.8;


            const seed =
                document.createElementNS(
                    NS,
                    "circle"
                );


            seed.setAttribute(
                "class",
                "seed"
            );


            seed.setAttribute(

                "cx",

                Math.cos(
                    angle
                )
                * radius

            );


            seed.setAttribute(

                "cy",

                Math.sin(
                    angle
                )
                * radius

            );


            seed.setAttribute(

                "r",

                ring < 3

                ? "1.9"

                : "1.3"

            );


            flower.appendChild(
                seed
            );

        }

    }


    /* -----------------------------------------------------
       REFLEJO CENTRAL
    ----------------------------------------------------- */

    const highlight =
        document.createElementNS(
            NS,
            "circle"
        );


    highlight.setAttribute(
        "cx",
        "-8"
    );


    highlight.setAttribute(
        "cy",
        "-9"
    );


    highlight.setAttribute(
        "r",
        "5.5"
    );


    highlight.setAttribute(
        "fill",
        "rgba(255,225,120,.28)"
    );


    flower.appendChild(
        highlight
    );


    /* -----------------------------------------------------
       INTERACCIÓN CON LA FLOR
    ----------------------------------------------------- */

    flower.addEventListener(

        "pointerdown",

        event => {

            event.stopPropagation();


            flower.classList.remove(
                "touched"
            );


            /*
             * Fuerza un reflow SVG para poder reiniciar
             * correctamente la animación.
             */

            void flower.getBBox();


            flower.classList.add(
                "touched"
            );


            pollenExplosion(
                event.clientX,
                event.clientY
            );


            showFlowerMessage(
                event.clientX,
                event.clientY,
                flowerMessages[index]
            );


            setTimeout(
                () => {

                    flower.classList.remove(
                        "touched"
                    );

                },
                760
            );

        }

    );


    positionGroup.appendChild(
        flower
    );


    flowersLayer.appendChild(
        positionGroup
    );

}


/* =========================================================
   11. DATOS DE LOS CAPULLOS
========================================================= */

const buds = [

    {
        x:235,
        y:360,
        scale:.72,
        rotate:-35,
        delay:2.4
    },

    {
        x:650,
        y:350,
        scale:.66,
        rotate:32,
        delay:2.7
    },

    {
        x:300,
        y:330,
        scale:.55,
        rotate:-20,
        delay:3
    }

];


/* =========================================================
   12. CREAR CAPULLOS
========================================================= */

function createBud(
    data
){

    const group =
        document.createElementNS(
            NS,
            "g"
        );


    group.setAttribute(
        "class",
        "bud"
    );


    group.setAttribute(

        "transform",

        `
        translate(
            ${data.x}
            ${data.y}
        )

        rotate(
            ${data.rotate}
        )

        scale(
            ${data.scale}
        )
        `

    );


    group.style.animationDelay =
        data.delay
        + "s";


    /* BASE VERDE */

    const base =
        document.createElementNS(
            NS,
            "path"
        );


    base.setAttribute(

        "d",

        `
        M -18 12
        Q 0 32
        18 12
        Q 12 -6
        0 -12
        Q -12 -6
        -18 12
        Z
        `

    );


    base.setAttribute(
        "fill",
        "#4f7d37"
    );


    group.appendChild(
        base
    );


    /* PÉTALOS */

    for(
        let i = 0;
        i < 6;
        i++
    ){

        const petal =
            document.createElementNS(
                NS,
                "ellipse"
            );


        petal.setAttribute(
            "cx",
            "0"
        );


        petal.setAttribute(
            "cy",
            "-12"
        );


        petal.setAttribute(
            "rx",
            "8"
        );


        petal.setAttribute(
            "ry",
            "20"
        );


        petal.setAttribute(
            "transform",
            `rotate(${i * 60})`
        );


        petal.setAttribute(
            "fill",
            "#ffd428"
        );


        group.appendChild(
            petal
        );

    }


    budsLayer.appendChild(
        group
    );

}


/* =========================================================
   13. CONSTRUIR RAMO
========================================================= */

flowerData.forEach(

    (
        flower,
        index
    ) => {

        createStem(
            flower,
            index
        );


        createFlower(
            flower,
            index
        );

    }

);


buds.forEach(
    createBud
);


/* =========================================================
   14. CANVAS
========================================================= */

const canvas =
    document.getElementById(
        "particleCanvas"
    );


const ctx =
    canvas.getContext(
        "2d",
        {
            alpha:true
        }
    );


let viewportWidth =
    window.innerWidth;


let viewportHeight =
    window.innerHeight;


let particles =
    [];


/* =========================================================
   15. AJUSTAR CANVAS
========================================================= */

function resizeCanvas(){

    const dpr =

        Math.min(
            window.devicePixelRatio || 1,
            2
        );


    viewportWidth =
        window.innerWidth;


    viewportHeight =
        window.innerHeight;


    canvas.width =

        Math.round(
            viewportWidth
            * dpr
        );


    canvas.height =

        Math.round(
            viewportHeight
            * dpr
        );


    canvas.style.width =
        viewportWidth
        + "px";


    canvas.style.height =
        viewportHeight
        + "px";


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

}


resizeCanvas();


window.addEventListener(

    "resize",

    resizeCanvas,

    {
        passive:true
    }

);


/* =========================================================
   16. CLASE PARTÍCULA
========================================================= */

class Particle{

    constructor(
        x,
        y,
        burst = false
    ){

        this.x =
            x;


        this.y =
            y;


        this.radius =

            .7
            +
            Math.random() * 2.2;


        this.life =

            burst

            ?

            45
            +
            Math.random() * 45

            :

            100
            +
            Math.random() * 160;


        this.maxLife =
            this.life;


        this.phase =

            Math.random()
            * Math.PI
            * 2;


        if(
            burst
        ){

            const angle =

                Math.random()
                * Math.PI
                * 2;


            const speed =

                .8
                +
                Math.random() * 4;


            this.vx =

                Math.cos(
                    angle
                )
                * speed;


            this.vy =

                Math.sin(
                    angle
                )
                * speed
                -
                1;

        }
        else{

            this.vx =

                (
                    Math.random()
                    -
                    .5
                )
                * .28;


            this.vy =

                -.12
                -
                Math.random() * .38;

        }

    }


    update(){

        this.phase +=
            .035;


        this.x +=

            this.vx
            +
            Math.sin(
                this.phase
            )
            * .05;


        this.y +=
            this.vy;


        this.vx *=
            .995;


        this.life--;

    }


    draw(){

        const alpha =

            Math.max(
                0,
                this.life
                /
                this.maxLife
            );


        ctx.beginPath();


        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =

            `rgba(
                255,
                215,
                65,
                ${alpha}
            )`;


        ctx.shadowBlur =
            12;


        ctx.shadowColor =
            "#ffd42b";


        ctx.fill();


        ctx.shadowBlur =
            0;

    }

}


/* =========================================================
   17. LOOP DE PARTÍCULAS
========================================================= */

function particleLoop(){

    ctx.clearRect(
        0,
        0,
        viewportWidth,
        viewportHeight
    );


    for(
        let i = 0;
        i < particles.length;
        i++
    ){

        particles[i].update();

        particles[i].draw();

    }


    particles =
        particles.filter(

            particle =>
                particle.life > 0

        );


    requestAnimationFrame(
        particleLoop
    );

}


particleLoop();


/* =========================================================
   18. POLEN AMBIENTAL
========================================================= */

function startAmbientParticles(){

    if(
        ambientParticleTimer
    ){
        return;
    }


    const interval =

        window.innerWidth < 500

        ? 135

        : 90;


    ambientParticleTimer =

        setInterval(
            () => {

                if(
                    document.hidden
                ){
                    return;
                }


                const limit =

                    window.innerWidth < 500

                    ? 90

                    : 160;


                if(
                    particles.length > limit
                ){
                    return;
                }


                const x =

                    viewportWidth * .15
                    +
                    Math.random()
                    * viewportWidth
                    * .70;


                const y =

                    viewportHeight * .57
                    +
                    Math.random()
                    * viewportHeight
                    * .38;


                particles.push(

                    new Particle(
                        x,
                        y
                    )

                );

            },
            interval
        );

}


/* =========================================================
   19. EXPLOSIÓN DE POLEN
========================================================= */

function pollenExplosion(
    x,
    y
){

    const count =

        window.innerWidth < 500

        ? 22

        : 36;


    for(
        let i = 0;
        i < count;
        i++
    ){

        particles.push(

            new Particle(
                x,
                y,
                true
            )

        );

    }

}


/* =========================================================
   20. MENSAJE AL TOCAR UNA FLOR
========================================================= */

function showFlowerMessage(
    x,
    y,
    message
){

    const element =
        document.createElement(
            "div"
        );


    element.className =
        "flower-word";


    element.textContent =
        message;


    const safeX =

        Math.max(
            70,
            Math.min(
                viewportWidth - 70,
                x
            )
        );


    const safeY =

        Math.max(
            80,
            y
        );


    element.style.left =
        safeX
        + "px";


    element.style.top =
        safeY
        + "px";


    document.body.appendChild(
        element
    );


    setTimeout(
        () => {

            element.remove();

        },
        1950
    );

}


/* =========================================================
   21. PÉTALOS DE FONDO
========================================================= */

function createFallingPetal(){

    if(
        document.hidden
    ){
        return;
    }


    const petal =
        document.createElement(
            "span"
        );


    petal.className =
        "falling-petal";


    const size =

        9
        +
        Math.random() * 11;


    petal.style.width =
        size
        + "px";


    petal.style.height =
        (
            size * 1.7
        )
        + "px";


    petal.style.left =
        Math.random() * 100
        + "vw";


    document.body.appendChild(
        petal
    );


    const duration =

        6500
        +
        Math.random() * 5000;


    const drift =

        (
            Math.random()
            -
            .5
        )
        *
        Math.min(
            viewportWidth * .45,
            380
        );


    const rotation =

        500
        +
        Math.random() * 700;


    const animation =

        petal.animate(

            [

                {
                    opacity:0,

                    transform:
                        "translate3d(0,-40px,0) rotate(0deg)"
                },

                {
                    opacity:.88,
                    offset:.1
                },

                {
                    opacity:.72,
                    offset:.75
                },

                {
                    opacity:0,

                    transform:
                        `
                        translate3d(
                            ${drift}px,
                            110dvh,
                            0
                        )
                        rotate(
                            ${rotation}deg
                        )
                        `
                }

            ],

            {

                duration:
                    duration,

                easing:
                    "cubic-bezier(.25,.5,.4,1)",

                fill:
                    "forwards"

            }

        );


    animation.onfinish =
        () => {

            petal.remove();

        };

}


/* =========================================================
   22. PÉTALOS DE PRIMER PLANO
========================================================= */

function createForegroundPetal(){

    if(
        document.hidden
    ){
        return;
    }


    const petal =
        document.createElement(
            "span"
        );


    petal.className =
        "foreground-petal";


    const size =

        20
        +
        Math.random() * 25;


    petal.style.width =
        size
        + "px";


    petal.style.height =
        (
            size * 1.75
        )
        + "px";


    petal.style.left =
        Math.random() * 100
        + "vw";


    petal.style.top =
        "-80px";


    document.body.appendChild(
        petal
    );


    const duration =

        8000
        +
        Math.random() * 5000;


    const drift =

        (
            Math.random()
            -
            .5
        )
        *
        Math.min(
            viewportWidth * .6,
            500
        );


    const rotation =

        800
        +
        Math.random() * 600;


    const animation =

        petal.animate(

            [

                {
                    opacity:0,

                    transform:
                        "translate3d(0,-50px,0) rotate(0deg)"
                },

                {
                    opacity:.65,
                    offset:.12
                },

                {
                    opacity:.5,
                    offset:.75
                },

                {
                    opacity:0,

                    transform:
                        `
                        translate3d(
                            ${drift}px,
                            115dvh,
                            0
                        )
                        rotate(
                            ${rotation}deg
                        )
                        `
                }

            ],

            {

                duration:
                    duration,

                easing:
                    "linear",

                fill:
                    "forwards"

            }

        );


    animation.onfinish =
        () => {

            petal.remove();

        };

}


/* =========================================================
   23. INICIAR LLUVIA DE PÉTALOS
========================================================= */

function startPetalRain(){

    if(
        petalTimer
    ){
        return;
    }


    const backgroundDelay =

        window.innerWidth < 500

        ? 900

        : 650;


    petalTimer =

        setInterval(
            createFallingPetal,
            backgroundDelay
        );


    foregroundPetalTimer =

        setInterval(
            createForegroundPetal,
            3800
        );

}


/* =========================================================
   24. EXPLOSIÓN INICIAL
========================================================= */

function initialCelebration(){

    const centerX =
        viewportWidth / 2;


    const centerY =
        viewportHeight * .55;


    const amount =

        window.innerWidth < 500

        ? 30

        : 55;


    for(
        let i = 0;
        i < amount;
        i++
    ){

        setTimeout(
            () => {

                particles.push(

                    new Particle(

                        centerX
                        +
                        (
                            Math.random() * 160
                            -
                            80
                        ),

                        centerY
                        +
                        (
                            Math.random() * 80
                            -
                            40
                        ),

                        true

                    )

                );

            },
            i * 12
        );

    }

}


/* =========================================================
   25. INICIAR EXPERIENCIA
========================================================= */

function startExperience(){

    if(
        experienceStarted
    ){
        return;
    }


    experienceStarted =
        true;


    startButton.disabled =
        true;


    /*
     * Oculta la pantalla inicial.
     */

    intro.classList.add(
        "hide"
    );


    /*
     * Después de la transición comienza
     * toda la experiencia.
     */

    setTimeout(
        () => {

            body.classList.add(
                "started"
            );


            startAmbientParticles();


            /*
             * Pequeña celebración de polen
             * mientras aparece el ramo.
             */

            setTimeout(
                initialCelebration,
                1700
            );


            /*
             * Los pétalos empiezan después
             * de que las flores aparecen.
             */

            setTimeout(
                startPetalRain,
                3100
            );

        },
        420
    );

}


/* =========================================================
   26. BOTÓN PRINCIPAL
========================================================= */

startButton.addEventListener(
    "click",
    startExperience
);


/* =========================================================
   27. PARALLAX
========================================================= */

let targetX =
    0;


let targetY =
    0;


let currentX =
    0;


let currentY =
    0;


const finePointer =

    window.matchMedia(
        "(pointer:fine)"
    );


function updatePointer(
    event
){

    if(
        !experienceStarted
        ||
        !finePointer.matches
    ){
        return;
    }


    targetX =

        event.clientX
        /
        viewportWidth
        -
        .5;


    targetY =

        event.clientY
        /
        viewportHeight
        -
        .5;

}


document.addEventListener(

    "pointermove",

    updatePointer,

    {
        passive:true
    }

);


/* =========================================================
   28. MOVIMIENTO NATURAL DEL RAMO
========================================================= */

function bouquetMotion(){

    if(
        experienceStarted
    ){

        currentX +=

            (
                targetX
                -
                currentX
            )
            * .045;


        currentY +=

            (
                targetY
                -
                currentY
            )
            * .045;


        /*
         * Oscilación lenta para evitar
         * que el ramo se sienta rígido.
         */

        const breeze =

            Math.sin(
                performance.now()
                * .00065
            )
            * .45;


        bouquet.style.transform =

            `
            rotateY(
                ${currentX * 3.2}deg
            )

            rotateX(
                ${-currentY * 1.8}deg
            )

            rotate(
                ${breeze}deg
            )

            translate3d(
                ${currentX * 5}px,
                ${currentY * 3}px,
                0
            )
            `;

    }


    requestAnimationFrame(
        bouquetMotion
    );

}


bouquetMotion();


/* =========================================================
   29. POLEN AL TOCAR LA ESCENA
========================================================= */

document.addEventListener(

    "pointerdown",

    event => {

        if(
            !experienceStarted
        ){
            return;
        }


        const target =
            event.target;


        /*
         * Si tocó una flor, esa flor ya
         * genera su propia explosión.
         */

        if(
            target.closest
            &&
            target.closest(
                ".flower"
            )
        ){
            return;
        }


        const count =

            window.innerWidth < 500

            ? 5

            : 8;


        for(
            let i = 0;
            i < count;
            i++
        ){

            particles.push(

                new Particle(
                    event.clientX,
                    event.clientY,
                    true
                )

            );

        }

    },

    {
        passive:true
    }

);


/* =========================================================
   30. CONTROL DE VISIBILIDAD
========================================================= */

document.addEventListener(

    "visibilitychange",

    () => {

        /*
         * Cuando el usuario cambia de pestaña,
         * reducimos las partículas almacenadas.
         */

        if(
            document.hidden
        ){

            particles =
                particles.slice(
                    0,
                    30
                );

        }

    }

);


/* =========================================================
   31. AJUSTES AL CAMBIAR TAMAÑO
========================================================= */

let resizeTimer =
    null;


window.addEventListener(

    "resize",

    () => {

        clearTimeout(
            resizeTimer
        );


        resizeTimer =

            setTimeout(
                () => {

                    /*
                     * No reconstruimos el ramo porque
                     * el SVG ya es completamente escalable.
                     * Solo actualizamos elementos ambientales.
                     */

                    createStars();

                    createBokeh();

                },
                250
            );

    },

    {
        passive:true
    }

);


/* =========================================================
   FIN
   DÍA DE LAS FLORES AMARILLAS 🌻
   De parte de Gudi Escalante
========================================================= */