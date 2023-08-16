class CaixaDaLanchonete {

  // Inicialização do cardápio
  constructor() {
    this.itensList = [
      { codigo: 'cafe', valor: 3.00 },
      { codigo: 'chantily', valor: 1.50 },
      { codigo: 'suco', valor: 6.20 },
      { codigo: 'sanduiche', valor: 6.50 },
      { codigo: 'queijo', valor: 2.00 },
      { codigo: 'salgado', valor: 7.25 },
      { codigo: 'combo1', valor: 9.50 },
      { codigo: 'combo2', valor: 7.50 }
    ];
  }

  // Função para validar os métodos de pagamento
  validarMetodoPagamento(metodoDePagamento) {
    const metodosValidos = ['dinheiro', 'credito', 'debito'];
    return metodosValidos.includes(metodoDePagamento);
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    if (itens.length === 0) {
      return 'Não há itens no carrinho de compra!';
    }

    let valorCompra = 0;
    const itensSelecionados = {};

    for (const item of itens) {
      const [codigo, quantidadeStr] = item.split(',');
      const quantidade = parseInt(quantidadeStr);

      const itemEncontrado = this.itensList.find(itemList => itemList.codigo === codigo);
      if (!itemEncontrado) {
        return 'Item inválido!';
      }

      if (quantidade === 0) {
        return 'Quantidade inválida!';
      }
      
      if (itemEncontrado.codigo === 'chantily' && !itensSelecionados['cafe']) {
        return 'Item extra não pode ser pedido sem o principal';
      }

      if (itemEncontrado.codigo === 'queijo' && !itensSelecionados['sanduiche'] && !itensSelecionados['combo1'] && !itensSelecionados['combo2']) {
        return 'Item extra não pode ser pedido sem o principal';
      }

      itensSelecionados[itemEncontrado.codigo] = true;

      valorCompra += itemEncontrado.valor * quantidade;
    }

    const DESCONTO_DINHEIRO = 0.05;
    const ACRESCIMO_CREDITO = 0.03;

    if (!this.validarMetodoPagamento(metodoDePagamento)) {
      return 'Forma de pagamento inválida!';
    }

    switch (metodoDePagamento) {
      case 'dinheiro':
        valorCompra *= (1 - DESCONTO_DINHEIRO);
        break;
      case 'credito':
        valorCompra *= (1 + ACRESCIMO_CREDITO);
        break;
      case 'debito':
        break;
    }

    return 'R$ ' + valorCompra.toFixed(2).replace('.', ',');
  }
}

export { CaixaDaLanchonete };
