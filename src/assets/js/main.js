'use strict'

window.onload= function () {

   
    

/* ------------------------------------------------*/
/* ----- Menu Principal------------------------*/
/* ------------------------------------------------*/

const menu = document.querySelector(".menu");
const toggle = document.querySelector(".toggle");
const items = document.querySelectorAll(".item");


/* Menu desplegable en el caso de que la resolucion se de moviles */
function toggleMenu() {
    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        toggle.innerHTML = "&#9776;";
    } else {
        menu.classList.add("active");
        toggle.innerHTML = "&#9776;";
    }
}

/* Activa el submenu */
function toggleItem() {
    if (this.classList.contains("submenu-active")) {
        this.classList.remove("submenu-active");
    } else if (menu.querySelector(".submenu-active")) {
        menu.querySelector(".submenu-active").classList.remove("submenu-active");
        this.classList.add("submenu-active");
    } else {
        this.classList.add("submenu-active");
    }
}

/* Cierra el submenu */
function closeSubmenu(e) {
    let isClickInside = menu.contains(e.target);

    if (!isClickInside && menu.querySelector(".submenu-active")) {
        menu.querySelector(".submenu-active").classList.remove("submenu-active");
    }
}
/* Event Listeners */

    
    toggle.addEventListener("click", toggleMenu, false);
    for (let item of items) {
        if (item.querySelector(".submenu")) {
            item.addEventListener("click", toggleItem, false);
        }
        item.addEventListener("keypress", toggleItem, false);
    }
    document.addEventListener("click", closeSubmenu, false);
   




/* ------------------------------------------------*/
/* ----- Slider pagina de Inicio -------------------*/
/* ------------------------------------------------*/

//Variables generales Slider

var slideIndex = 0;
var slides = document.getElementsByClassName("sliderSection");
//Configurar intervalos de tiempo
var conf_time;
//Tiempo en milisegundos
var time_slider = 5000;


//Muestra el indice
showSlides(slideIndex);
//Slider automatico
automaticSlides();



//---------------------------------------------------
//Puntos del slider
const dot = document.querySelectorAll('.dot')


//Recorre cada punto del slider y realiza una accion si se realiza click en alguno de ellos
for (let i = 0; i < dot.length; i++) {
    dot[i].addEventListener("click", function () {

        //Asigna la posicion actual
        slideIndex = i + 1
        //Asigna la posicion para mostrar el slider
        showSlides(slideIndex)
        //Limpia en tiempo es decir deja sin efecto el intervalo de tiempo
        clearInterval(conf_time)
        //Retoma el slider automatico una vez que se asigna la posicion
        conf_time = setInterval(automaticSlides, time_slider);

    });

}


//----------------------------------------------------

//Botones previo y siguiente
var prev = document.querySelector('.prev')
var next = document.querySelector('.next')

try {
    prev.addEventListener('click', previousSlide)
    next.addEventListener('click', nextSlide)
} catch (error) {

}

function previousSlide() {

    slideIndex--
    if (slideIndex <= 0) {
        slideIndex = 3
    }
    showSlides(slideIndex)
    clearInterval(conf_time)
    conf_time = setInterval(automaticSlides, time_slider);

}


function nextSlide() {
    slideIndex++

    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    showSlides(slideIndex)
    clearInterval(conf_time)

    conf_time = setInterval(automaticSlides, time_slider);
}



//-------------------------------------------------------
//Slides

//-----------------------------------------------------
function showSlides(n) {
    try {

        var i;
        //Conseguir elemento con la clase dot
        var dots = document.getElementsByClassName("dot");

        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    } catch (error) {
    }

}


function automaticSlides() {

    if (slideIndex > slides.length) { slideIndex = 1 }
    slideIndex++;
    showSlides(slideIndex)
    clearInterval(conf_time)
    conf_time = setInterval((automaticSlides), time_slider); // Change image every 8 seconds
}


/* ------------------------------------------------*/
/* ----- Nav tabs de sponsors ---------------------*/
/* ------------------------------------------------*/

var tablinks = document.querySelectorAll(".tablinks")

var tabcontent = document.querySelectorAll(".tabcontent")


for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].addEventListener("click", function () {

        //DEfinicion de mostrar contenido y color de fondo por defecto
        for (let i = 0; i < tabcontent.length; i++) {
            tablinks[i].style.background = "#ffae00";
            tabcontent[i].style.display = "none";
            tablinks[i].style.color = "#303335";
        }

        tablinks[i].style.color = "#ffae00";
        tablinks[i].style.background = "#303335";
        document.getElementById(tabcontent[i].id).style.display = "block"
        document.getElementById(tabcontent[i].id).style.overflow = "auto"
    })
}


//------------------ Collapse Sponsors

var collapSegmentInfo = document.getElementsByClassName("collapSegmentInfo");
var contentSegment = document.querySelectorAll(".contentSegment");


for (let indexSegment = 0; indexSegment < collapSegmentInfo.length; indexSegment++) {


    collapSegmentInfo[indexSegment].addEventListener("click", function () {

        //Insertar la clase active al elemento collapSegmentInfo
        this.classList.toggle("active");

        contentSegment[indexSegment].style.display = "block"

        if (!this.classList.contains("active")) {
            contentSegment[indexSegment].style.display = "none"
        }







        //Ocultar el contenido si se hace click fuera del elemento

        document.addEventListener('click', function (event) {
            var isClickInsideButton = collapSegmentInfo[indexSegment].contains(event.target);

            var isClickInsideContent = (contentSegment[indexSegment].contains(event.target));

            //Si los 2 elementos no son marcados con click y si es clickeado fuera de los elementos se realiza lo siguiente


            if (!isClickInsideButton && !isClickInsideContent) {

                contentSegment[indexSegment].style.display = "none"
                //Remueve la clase active  
                collapSegmentInfo[indexSegment].classList.remove("active")

            }

        });
    });

}

}
