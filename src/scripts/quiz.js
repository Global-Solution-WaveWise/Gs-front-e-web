    const form = document.getElementById("quizForm");
    const resultado = document.getElementById("resultado");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let total = 0;
      for (let i = 1; i <= 10; i++) {
        const radios = form[`p${i}`];
        let responded = false;
        for (const radio of radios) {
          if (radio.checked) {
            total += parseInt(radio.value);
            responded = true;
          }
        }
        if (!responded) {
          alert(`Responda a pergunta ${i}.`);
          return;
        }
      }

      let nivel = "";
      if (total <= 6) nivel = "Baixo risco";
      else if (total <= 14) nivel = "Risco Moderado";
      else nivel = "Alto Risco";

      resultado.innerText = `Resultado: ${nivel} (${total} pontos)`;
    });

    // Carrossel de Imagens
    let slideIndex = 0;
    const slides = document.querySelectorAll(".carousel-slide");

    function mostrarSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });
    }

    function mudarSlide(direcao) {
      slideIndex = (slideIndex + direcao + slides.length) % slides.length;
      mostrarSlide(slideIndex);
    }