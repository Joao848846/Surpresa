document.addEventListener("DOMContentLoaded", () => {
  const containerTelas = document.querySelector(".container-telas");
  const telas = document.querySelectorAll(".tela");
  const numTelas = telas.length;
  let telaAtual = 0;
  let touchStartX = 0;

  // Função para mostrar a tela atual
  function mostrarTela(index) {
    if (index >= 0 && index < numTelas) {
      containerTelas.style.transform = `translateX(-${index * 100}%)`;
      telaAtual = index;
    }
  }

  // Navegação por swipe (arrastar)
  containerTelas.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  containerTelas.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX - touchEndX;

    if (deltaX > 50) {
      // Deslizou para a esquerda
      mostrarTela(telaAtual + 1);
    } else if (deltaX < -50) {
      // Deslizou para a direita
      mostrarTela(telaAtual - 1);
    }
  });

  // Lógica da Tela 2 (Easter Egg)
  const coracaoEasterEgg = document.getElementById("coracao-easter-egg");
  const perguntaEasterEgg = document.getElementById("pergunta-easter-egg");
  const mensagemAcerto = document.getElementById("mensagem-acerto");
  const respostas = document.querySelectorAll("#pergunta-easter-egg .resposta");

  if (coracaoEasterEgg) {
    coracaoEasterEgg.addEventListener("click", () => {
      coracaoEasterEgg.style.display = "none";
      document.querySelector(".tela-easter-egg .texto-toque").style.display =
        "none";
      perguntaEasterEgg.style.display = "flex";
      perguntaEasterEgg.style.flexDirection = "column";
      perguntaEasterEgg.style.alignItems = "center";
    });
  }

  respostas.forEach((resposta) => {
    resposta.addEventListener("click", () => {
      if (resposta.dataset.resposta === "correta") {
        perguntaEasterEgg.style.display = "none";
        mensagemAcerto.style.display = "block";
      } else {
        alert("Resposta incorreta! Tente novamente.");
      }
    });
  });

  // Lógica da Tela 3 (Música)
  const audioPlayer = document.getElementById("audio-player");
  const playBtn = document.getElementById("play-btn");
  const pauseBtn = document.getElementById("pause-btn");

  if (playBtn && pauseBtn && audioPlayer) {
    playBtn.addEventListener("click", () => {
      audioPlayer.play();
      playBtn.style.display = "none";
      pauseBtn.style.display = "inline-block";
    });

    pauseBtn.addEventListener("click", () => {
      audioPlayer.pause();
      pauseBtn.style.display = "none";
      playBtn.style.display = "inline-block";
    });
  }

  // Lógica da Tela 4 (Contagem Regressiva)
  const contagemRegressivaElement = document.getElementById(
    "contagem-regressiva"
  );
  const dataAniversario = new Date("2025-05-22T00:00:00-03:00"); // Ajuste o timezone se necessário

  function atualizarContagem() {
    const agora = new Date();
    const diferenca = dataAniversario.getTime() - agora.getTime();

    if (diferenca > 0) {
      const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));
      contagemRegressivaElement.textContent = `Faltam ${dias} dias...`;
    } else {
      contagemRegressivaElement.textContent = "Feliz Aniversário, meu amor!";
      // Aqui você pode adicionar lógica para mostrar a Tela 5 automaticamente no dia
    }
  }

  atualizarContagem();
  setInterval(atualizarContagem, 1000 * 60 * 60); // Atualiza a cada hora

  // Lógica da Tela 5 (Mensagem Final - a ser exibida no dia 22)
  const mensagemAniversarioElement = document.getElementById(
    "mensagem-aniversario"
  );

  function exibirMensagemFinal() {
    const hoje = new Date();
    const aniversario = new Date("2025-05-22T00:00:00-03:00");

    if (hoje.toDateString() === aniversario.toDateString()) {
      const mensagem = `Meu amor, neste dia tão especial...\n\n[SUA MENSAGEM AQUI]\n\nCom todo o meu amor,\nSeu esposo.`;
      mensagemAniversarioElement.textContent = mensagem;
    } else {
      mensagemAniversarioElement.textContent =
        "Aguardando o dia especial... ❤️";
    }
  }

  exibirMensagemFinal();
});
