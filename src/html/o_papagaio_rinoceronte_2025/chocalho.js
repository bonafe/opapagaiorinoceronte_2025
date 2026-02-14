
export class Chocalho {
    constructor() {
      this.ultimaLargura = window.innerWidth;
      this.ultimaAltura = window.innerHeight;
      this.ultimoTempo = performance.now();
      this.timeoutResize = null;
      this.movimentoDetectado = false;
      this.contadorMudancasDirecao = 0;
      this.direcaoLarguraAnterior = 0;
      this.direcaoAlturaAnterior = 0;
      this.ultimoMultiploDisparadoResize = 0;
  
      this.ultimaPosicaoScroll = window.scrollY;
      this.direcaoAnteriorScroll = 0;
      this.contadorMudancasScroll = 0;
      this.ultimoMultiploDisparadoScroll = 0;
  
      this.monitorarResize(); // Inicia o monitoramento de resize
      this.monitorarScroll();  // Inicia o monitoramento de scroll
    }
  
    // Método para monitorar o evento de resize
    monitorarResize() {
      window.addEventListener("resize", () => {
        const agora = performance.now();
        const larguraAtual = window.innerWidth;
        const alturaAtual = window.innerHeight;
        const deltaLargura = larguraAtual - this.ultimaLargura;
        const deltaAltura = alturaAtual - this.ultimaAltura;
        const deltaTempo = agora - this.ultimoTempo;
  
        const direcaoLargura = deltaLargura === 0 ? 0 : deltaLargura > 0 ? 1 : -1;
        const direcaoAltura = deltaAltura === 0 ? 0 : deltaAltura > 0 ? 1 : -1;
  
        if (direcaoLargura !== 0 && direcaoLargura !== this.direcaoLarguraAnterior) {
          this.contadorMudancasDirecao++;
          this.direcaoLarguraAnterior = direcaoLargura;
        }
  
        if (direcaoAltura !== 0 && direcaoAltura !== this.direcaoAlturaAnterior) {
          this.contadorMudancasDirecao++;
          this.direcaoAlturaAnterior = direcaoAltura;
        }
  
        console.log("Delta Largura:", deltaLargura, "Delta Altura:", deltaAltura, "Delta Tempo:", deltaTempo);
        console.log("Contador de mudanças de direção:", this.contadorMudancasDirecao);
  
        if (
          this.contadorMudancasDirecao % 2 === 0 &&
          this.contadorMudancasDirecao !== 0 &&
          this.contadorMudancasDirecao !== this.ultimoMultiploDisparadoResize
        ) {
          this.ultimoMultiploDisparadoResize = this.contadorMudancasDirecao;
          console.log("💥 Disparando evento 'chacoalhou' por resize!");
          document.dispatchEvent(new Event("chacoalhou"));
        }
  
        this.ultimaLargura = larguraAtual;
        this.ultimaAltura = alturaAtual;
        this.ultimoTempo = agora;
      });
    }
  
    // Método para monitorar o evento de scroll
    monitorarScroll() {
      window.addEventListener("scroll", () => {
        const agora = performance.now();
        const posicaoAtual = window.scrollY;
        const delta = posicaoAtual - this.ultimaPosicaoScroll;
        const tempo = agora - this.ultimoTempo;
  
        const direcaoAtual = delta === 0 ? 0 : delta > 0 ? 1 : -1;
  
        if (direcaoAtual !== 0 && direcaoAtual !== this.direcaoAnteriorScroll) {
          this.contadorMudancasScroll++;
          this.direcaoAnteriorScroll = direcaoAtual;
        }
  
        console.log("Scroll Δ:", delta, "Tempo:", tempo, "Mudanças direção:", this.contadorMudancasScroll);
  
        if (
          this.contadorMudancasScroll % 4 === 0 &&
          this.contadorMudancasScroll !== 0 &&
          this.contadorMudancasScroll !== this.ultimoMultiploDisparadoScroll
        ) {
          this.ultimoMultiploDisparadoScroll = this.contadorMudancasScroll;
          console.log("💥 Disparando evento 'chacoalhou' por scroll!");
          document.dispatchEvent(new Event("chacoalhou"));
        }
  
        this.ultimaPosicaoScroll = posicaoAtual;
        this.ultimoTempo = agora;
      });
    }
  }
  