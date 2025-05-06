/*===============================*/
/* QUESTIONARIO */
/*===============================*/

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('questionarioForm');
  const perguntas = document.querySelectorAll('.pergunta-box');
  const btnProxima = document.querySelectorAll('.btn-proxima');
  const btnAnterior = document.querySelectorAll('.btn-anterior');
  const mensagemConclusao = document.querySelector('.mensagem-conclusao');

  let perguntaAtual = 0;

  // Mostra a primeira pergunta
  mostrarPergunta(perguntaAtual);

  // Event listeners para os botões de próxima
  btnProxima.forEach((btn) => {
    btn.addEventListener('click', function () {
      const perguntaBox = this.closest('.pergunta-box');
      if (validarPergunta(perguntaBox)) {
        perguntaAtual++;
        mostrarPergunta(perguntaAtual);
      }
    });
  });

  // Event listeners para os botões de anterior
  btnAnterior.forEach((btn) => {
    btn.addEventListener('click', function () {
      perguntaAtual--;
      mostrarPergunta(perguntaAtual);
    });
  });

  // Submit do formulário
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Simulação de envio (substituir por AJAX/backend real)
    setTimeout(() => {
      // Esconde todas as perguntas
      perguntas.forEach((pergunta) => {
        pergunta.classList.remove('ativa');
      });

      // Mostra mensagem de conclusão
      mensagemConclusao.classList.add('ativa');

      // Rola para o topo da mensagem
      mensagemConclusao.scrollIntoView({ behavior: 'smooth' });

      // Reseta o formulário (opcional)
      // form.reset();
    }, 1000);
  });

  // Função para mostrar uma pergunta específica
  function mostrarPergunta(index) {
    // Esconde todas as perguntas
    perguntas.forEach((pergunta) => {
      pergunta.classList.remove('ativa');
    });

    // Mostra a pergunta atual
    perguntas[index].classList.add('ativa');

    // Rola para o topo da pergunta
    perguntas[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Função para validar se a pergunta foi respondida
  function validarPergunta(perguntaBox) {
    const inputsObrigatorios = perguntaBox.querySelectorAll('[required]');
    let valido = true;

    inputsObrigatorios.forEach((input) => {
      if (!input.value && !input.checked) {
        input.closest('.opcao').style.color = '#e67e22';
        input.closest('.input-group').querySelector('label').style.color =
          '#e67e22';
        valido = false;
      }
    });

    return valido;
  }

  // Carrossel de marcas (mesmo código da página principal)
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
