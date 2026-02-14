export class Sumidouro {
  constructor(elementoAlvo = document.body) {
    this.elementoAlvo = elementoAlvo;
    this.caracteresJaApagados = new Set(); // Armazena os caracteres já apagados
  }

  // Método para apagar o próximo caractere único (primeiro as vogais, depois as consoantes)
  apagarProximoCaractereUnico() {
    const walker = document.createTreeWalker(
      this.elementoAlvo, // Utiliza o elemento alvo
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          return node.nodeValue.trim().length > 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      },
      false
    );

    const caracteresEncontrados = new Set();

    // Função para verificar se o caractere é uma vogal
    const ehVogal = (char) => /[aeiouáéíóúãõâêîôûàèìòù]/i.test(char);

    // Função para verificar se o caractere é uma consoante
    const ehConsoante = (char) => /[bcdfghjklmnpqrtvwyxzç]/i.test(char);

    // Coleta todos os caracteres únicos visíveis (sem repetir)
    while (walker.nextNode()) {
      const node = walker.currentNode;
      for (let char of node.nodeValue) {
        const visivel = /\S/.test(char); // ignora espaços
        if (visivel && !this.caracteresJaApagados.has(char)) {
          caracteresEncontrados.add(char);
        }
      }
    }

    const proximos = Array.from(caracteresEncontrados);

    if (proximos.length === 0) {
      console.log("🛑 Nenhum caractere novo para apagar.");
      this.enviarEventoSumiuTudo(); // Envia o evento 'sumiu_tudo' quando não há mais caracteres para apagar
      return this; // Permite encadeamento
    }

    // Primeiro, apaga as vogais
    const proximasVogais = proximos.filter(char => ehVogal(char));
    if (proximasVogais.length > 0) {
      const proximaVogal = proximasVogais[0];
      this.caracteresJaApagados.add(proximaVogal);
      console.log(`✏️ Apagando vogal: "${proximaVogal}"`);
      this.apagarCaractereDaPagina(proximaVogal);
      return this; // Permite encadeamento
    }

    // Depois, apaga as consoantes
    const proximasConsoantes = proximos.filter(char => ehConsoante(char));
    if (proximasConsoantes.length > 0) {
      const proximaConsoante = proximasConsoantes[0];
      this.caracteresJaApagados.add(proximaConsoante);
      console.log(`✏️ Apagando consoante: "${proximaConsoante}"`);
      this.apagarCaractereDaPagina(proximaConsoante);
      return this; // Permite encadeamento
    }

    // Caso não haja vogais ou consoantes, apaga os outros caracteres
    const outrosCaracteres = proximos.filter(char => !ehVogal(char) && !ehConsoante(char));
    if (outrosCaracteres.length > 0) {
      const outroCaractere = outrosCaracteres[0];
      this.caracteresJaApagados.add(outroCaractere);
      console.log(`✏️ Apagando outro caractere: "${outroCaractere}"`);
      this.apagarCaractereDaPagina(outroCaractere);
    }

    return this; // Permite encadeamento
  }

  // Método para apagar um caractere específico de todo o conteúdo do elemento
  apagarCaractereDaPagina(proximoChar) {
    const apagarWalker = document.createTreeWalker(
      this.elementoAlvo, // Utiliza o elemento alvo
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          return node.nodeValue.trim().length > 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      },
      false
    );

    while (apagarWalker.nextNode()) {
      const node = apagarWalker.currentNode;
      const regex = new RegExp(proximoChar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      node.nodeValue = node.nodeValue.replace(regex, ' ');
    }
  }

  // Método para enviar o evento 'sumiu_tudo' quando todos os caracteres forem apagados
  enviarEventoSumiuTudo() {
    const evento = new CustomEvent("sumiu_tudo", {
      detail: { mensagem: "Todos os caracteres foram apagados!" }
    });
    document.dispatchEvent(evento);
    console.log("🚨 Evento 'sumiu_tudo' enviado.");
  }
}
