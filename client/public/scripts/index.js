console.log("¿Qué buscas? Me gusta las papas con chorizo")

const navToggle = document.querySelector(".nav-toggle"),
    navMenu = document.querySelector(".menu"),
    navVideo = document.querySelectorAll(".videos"),
    navSlide = document.querySelector("#car-video"),
    navActive = document.querySelectorAll(".selec"),
    navStop = document.querySelector(".show");
var header = document.querySelector("header");
var tiempo;

const menuScroll = document.querySelectorAll('.menu a[href^="#"]')

menuScroll.forEach(menuLink => {
    menuLink.addEventListener('click', function(){
        navMenu.classList.toggle("menu_visible")

        if(navMenu.classList.contains("menu_visible")){
            navToggle.setAttribute("aria-label", "Cerrar Menú");
        }
        else{
            navToggle.setAttribute("aria-label", "Abrir Menú");
        }
    })
})

//QUITAR TRANSPARENCIA AL HACER SCROLL
window.addEventListener("scroll", function(){
    header.classList.toggle("header_scroll", window.scrollY > 0);
})

// ABRIR Y CERRAR MENÚ
navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("menu_visible")
    
    if(navMenu.classList.contains("menu_visible")){
        navToggle.setAttribute("aria-label", "Cerrar Menú");
    }
    else{
         navToggle.setAttribute("aria-label", "Abrir Menú");
    }
});

//SLIDER DE VIDEOS
let op = 0,
    count = 0,
    img = 100 / navVideo.length;

function move(){
    if(count >= navVideo.length - 1)
    {
        op = 0;
        count = 0;
        navSlide.style.transform = `translate(-${op}%)`;
    }
    else
    {
        op = op + img;
        count++;
        navSlide.style.transform = `translate(-${op}%)`;
    }
    rombos();
}

function move1(){
    if(count >= navVideo.length - 1)
    {
        op = 0;
        count = 0;
        navSlide.style.transform = `translate(-${op}%)`;
    }
    else
    {
        op = op + img;
        count++;
        navSlide.style.transform = `translate(-${op}%)`;
    }
}

function autosliding(){
    tiempo = setInterval(timer, 4000);
    function timer(){
        move()
    }
}

autosliding();

var opacity = document.querySelector('.deg1');
navStop.addEventListener('mouseover', function(){
    opacity.classList.toggle("deg1-1");
    clearInterval(tiempo);
})
navStop.addEventListener('mouseout', function(){
    opacity.classList.toggle("deg1-1");
    autosliding();
});

function rombos(){
    for(var i = 0; i < navActive.length; i++)
    {
        navActive[i].className = navActive[i].className.replace(' active', '');
    }
    navActive[count].className += ' active'
}

function cambio(){
    window.onclick = e => {
        if (e.target.tagName == "path" && e.target.parentElement.parentElement.classList.contains("selec")) {
            e.target.parentElement.parentElement.classList.add('active');
            var videoId = e.target.parentElement.getAttribute('rel');
            if(videoId > count){
                count = videoId;
                if(count >= navVideo.length)
                {
                    op = 0;
                    count = 0;
                    navSlide.style.transform = `translate(-${op}%)`;
                }
                else   
                {
                    op = img*count;
                    navSlide.style.transform = `translate(-${op}%)`;
                }
            }
            else if(videoId == count)
            {
                return;
            }
            else{
                count = videoId;
                if(count >= navVideo.length)
                {
                    op = 0;
                    count = 0;
                    navSlide.style.transform = `translate(-${op}%)`;
                }
                else
                {
                    op = img*count;
                    navSlide.style.transform = `translate(-${op}%)`;
                }
            }
            rombos();
        } 
    }
}

//SLIDE 3D DE PILARES
const pilares = document.querySelector("#pilares-visibles"),
    pilar = document.querySelectorAll(".pilar"),
    next = document.querySelector("#next1"),
    prev = document.querySelector("#prev1");
let actual = 2;

function showPilar(index){
    pilar.forEach((pilar, idx) => {
        if(idx === index){
            pilar.classList.add('no3');
            pilar.classList.remove('no1', 'no2', 'no4', 'no5');
        }else if(idx === index - 1){
            pilar.classList.add('no2');
            pilar.classList.remove('no1', 'no3', 'no4', 'no5');
        }else if(idx === index - 2){
            pilar.classList.add('no1');
            pilar.classList.remove('no2', 'no3', 'no4', 'no5');
        }else if(idx === index + 1){
            pilar.classList.add('no4');
            pilar.classList.remove('no2', 'no3', 'no1', 'no5');
        }else if(idx === index + 2){
            pilar.classList.add('no5');
            pilar.classList.remove('no2', 'no3', 'no4', 'no1');
        }else{
            pilar.classList.remove('no1' ,'no2', 'no3', 'no4', 'no5');
        }
    })
}

function nextPilar(){
    actual = (actual + 1) % pilar.length;
    showPilar(actual);
}
function prevPilar(){
    actual = (actual - 1 + pilar.length) % pilar.length;
    showPilar(actual);
}

showPilar(actual);

document.getElementById('next1').addEventListener('click', nextPilar);
document.getElementById('prev1').addEventListener('click', prevPilar);
const carrusel = document.getElementsByClassName('selec');
for (let i = 0; i < carrusel.length; i++) {
    carrusel[i].addEventListener('click', cambio);
}



