/*===============================*/
/* SECTION HERO - EFEITO BACKGROUND */
/*===============================*/

const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function nextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}

// Inicia o slideshow (muda a cada 4 segundos)
setInterval(nextSlide, 4000);

// Ativa a primeira imagem
slides[0].classList.add('active');
