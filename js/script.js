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

/*===============================*/
/* CARROSSEL DE MARCAS */
/*===============================*/

document.addEventListener('DOMContentLoaded', function () {
  const carrossel = document.querySelector('.marcas-carrossel');
  const container = document.querySelector('.marcas-carrossel-container');
  const items = document.querySelectorAll('.marca-item');

  // Duplica os itens para criar o efeito de loop infinito
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    carrossel.appendChild(clone);
  });

  let speed = 0.5; // pixels por frame
  let position = 0;
  let animationId;
  let isPaused = false;

  function animate() {
    if (!isPaused) {
      position -= speed;

      // Quando chegar na metade do carrossel, reseta para o início sem perceber
      if (position <= -carrossel.scrollWidth / 2) {
        position = 0;
      }

      carrossel.style.transform = `translateX(${position}px)`;
    }

    animationId = requestAnimationFrame(animate);
  }

  // Inicia a animação
  animate();

  // Pausa ao passar o mouse
  container.addEventListener('mouseenter', () => {
    isPaused = true;
  });

  container.addEventListener('mouseleave', () => {
    isPaused = false;
  });

  // Limpa a animação quando a página é escondida (otimização)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });
});

/*===============================*/
/* FOOTER */
/*===============================*/

// Atualiza o ano do copyright automaticamente
document.querySelector('.year').textContent = new Date().getFullYear();

// Validação simples do formulário
document
  .querySelector('.contact-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
      alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      this.reset();
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  });
