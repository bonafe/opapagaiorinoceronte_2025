// musica.js
export class Musica {
    #audioContext; // Propriedade privada para o contexto de áudio
    #oscillators; // Array de osciladores ativos
    #volume; // Propriedade privada para o volume
    #formaOnda; // Propriedade privada para a forma de onda
  
    constructor() {
      this.#audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.#oscillators = [];
      this.#volume = 0.5; // Volume inicial
      this.#formaOnda = "sine"; // Forma de onda inicial
    }
  
    // Função para alterar globalmente a forma de onda
    alterarFormaOnda(novaForma) {
      const formasValidas = ["sine", "square", "sawtooth", "triangle"];
      if (formasValidas.includes(novaForma)) {
        this.#formaOnda = novaForma;
        console.log(`Forma de onda alterada para ${novaForma}`);
      } else {
        console.log("Forma de onda inválida! Use 'sine', 'square', 'sawtooth' ou 'triangle'.");
      }
      return this; // Permite encadeamento
    }
  
    // Função para alterar globalmente o volume
    alterarVolume(novoVolume) {
      if (novoVolume >= 0 && novoVolume <= 1) {
        this.#volume = novoVolume;
        console.log(`Volume alterado para ${novoVolume}`);
      } else {
        console.log("Volume inválido! Deve estar entre 0.0 e 1.0.");
      }
      return this; // Permite encadeamento
    }
  
    // Função para tocar uma nota única
    tocarNota(frequencia, duracao, volume = this.#volume, formaOnda = this.#formaOnda) {
      let oscillator = this.#audioContext.createOscillator();
      oscillator.type = formaOnda; // Forma de onda da nota
      oscillator.frequency.setValueAtTime(frequencia, this.#audioContext.currentTime); // Frequência da nota (em Hz)
  
      let gainNode = this.#audioContext.createGain();
      gainNode.gain.setValueAtTime(volume, this.#audioContext.currentTime); // Controle de volume
  
      oscillator.connect(gainNode);
      gainNode.connect(this.#audioContext.destination);
  
      oscillator.start(); // Inicia o oscilador
  
      setTimeout(() => {
        oscillator.stop(); // Para o oscilador após o tempo especificado
      }, duracao);
      return this; // Permite encadeamento
    }
  
    // Função para tocar um acorde (múltiplas notas simultaneamente)
    tocarAcorde(frequencias, duracao, volume = this.#volume, formaOnda = this.#formaOnda) {
      frequencias.forEach(frequencia => {
        let oscillator = this.#audioContext.createOscillator();
        oscillator.type = formaOnda; // Forma de onda do acorde
        oscillator.frequency.setValueAtTime(frequencia, this.#audioContext.currentTime); // Frequência de cada nota do acorde
  
        let gainNode = this.#audioContext.createGain();
        gainNode.gain.setValueAtTime(volume, this.#audioContext.currentTime); // Controle de volume
  
        oscillator.connect(gainNode);
        gainNode.connect(this.#audioContext.destination);
  
        oscillator.start(); // Inicia o oscilador
        this.#oscillators.push(oscillator); // Armazena o oscilador
      });
  
      setTimeout(() => {
        this.#oscillators.forEach(oscillator => oscillator.stop()); // Para cada oscilador no acorde
        this.#oscillators = []; // Limpa o array de osciladores
      }, duracao);
      return this; // Permite encadeamento
    }
  
    // Função para tocar uma melodia (sequência de notas com tempo)
    tocarMelodia() {
      const melodia = [
        { frequencia: 440, duracao: 500 },
        { frequencia: 493.88, duracao: 500 },
        { frequencia: 523.25, duracao: 500 },
        { frequencia: 587.33, duracao: 500 },
        { frequencia: 659.25, duracao: 500 },
        { frequencia: 698.46, duracao: 500 },
        { frequencia: 784.00, duracao: 500 }
      ];
  
      let tempo = 0;
      melodia.forEach(nota => {
        setTimeout(() => {
          this.tocarNota(nota.frequencia, nota.duracao); // Toca cada nota da melodia
        }, tempo);
        tempo += nota.duracao;
      });
      return this; // Permite encadeamento
    }
  
    // Função para parar todas as notas em execução
    pararNotas() {
      this.#oscillators.forEach(oscillator => oscillator.stop());
      this.#oscillators = [];
      return this; // Permite encadeamento
    }
  }
  