document.addEventListener('DOMContentLoaded', function () {
  // Gráfico de Produtos Vendidos
  const ctx = document.getElementById('graficoVendas').getContext('2d');
  const graficoVendas = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [
        'Vestuário',
        'Acessórios',
        'Cosméticos',
        'Decoração',
        'Alimentação',
      ],
      datasets: [
        {
          label: 'Vendas por Categoria',
          data: [420, 380, 290, 210, 150],
          backgroundColor: [
            '#6d573e',
            '#b59b7d',
            '#dacdbe',
            '#a38b6d',
            '#8a6d46',
          ],
          borderColor: ['#45260a', '#6d573e', '#b59b7d', '#6d573e', '#45260a'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#6d573e',
          },
          grid: {
            color: '#dacdbe',
          },
        },
        x: {
          ticks: {
            color: '#6d573e',
          },
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });

  // Mapa de Regiões
  const mapa = L.map('mapaRegioes').setView([-15, -55], 4);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapa);

  // Dados fictícios de regiões
  const regioes = [
    {
      lat: -23.55,
      lng: -46.63,
      nome: 'Sudeste',
      intensidade: 0.9,
      raio: 200000,
    },
    {
      lat: -12.97,
      lng: -38.5,
      nome: 'Nordeste',
      intensidade: 0.7,
      raio: 150000,
    },
    { lat: -3.73, lng: -38.52, nome: 'Norte', intensidade: 0.4, raio: 100000 },
    { lat: -30.03, lng: -51.2, nome: 'Sul', intensidade: 0.6, raio: 140000 },
    {
      lat: -15.6,
      lng: -56.1,
      nome: 'Centro-Oeste',
      intensidade: 0.5,
      raio: 120000,
    },
  ];

  regioes.forEach((regiao) => {
    const cor =
      regiao.intensidade > 0.8
        ? '#6d573e'
        : regiao.intensidade > 0.5
        ? '#b59b7d'
        : '#dacdbe';

    L.circle([regiao.lat, regiao.lng], {
      color: cor,
      fillColor: cor,
      fillOpacity: 0.5,
      radius: regiao.raio,
    })
      .addTo(mapa)
      .bindPopup(
        `<strong>${regiao.nome}</strong><br>${Math.round(
          regiao.intensidade * 100
        )}% das vendas`
      );
  });

  // Contador de Clientes em Tempo Real
  let contadorAtivo = true;
  let clientesBase = 146700;
  const contadorElemento = document.getElementById('contadorClientes');

  function formatarNumero(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function atualizarContador() {
    if (contadorAtivo) {
      clientesBase += 4;
      contadorElemento.textContent = formatarNumero(clientesBase);
    }
  }

  // Inicia o contador
  contadorElemento.textContent = formatarNumero(clientesBase);
  const intervaloContador = setInterval(atualizarContador, 15000);

  // Pausa o contador quando a página não está visível
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      contadorAtivo = false;
    } else {
      contadorAtivo = true;
    }
  });

  // Limpa o intervalo quando a página é fechada
  window.addEventListener('beforeunload', function () {
    clearInterval(intervaloContador);
  });
});
