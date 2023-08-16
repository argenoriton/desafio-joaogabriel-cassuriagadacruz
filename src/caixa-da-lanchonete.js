class CaixaDaLanchonete {

  // Inicialização do cardápio
  constructor() {
    this.cardapio = [
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

  // Função para verificar itens de acompanhamento
  isItemExtra(itemCodigo, itens) {
    if (itemCodigo === 'chantily') {
      return !itens.includes('cafe');
    } else if (itemCodigo === 'queijo') {
      return (
        !itens.includes('sanduiche') &&
        !itens.includes('combo1') &&
        !itens.includes('combo2')
      );
    }
    return false;
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    if (itens.length === 0) {
      return 'Não há itens no carrinho de compra!';
    }

    let valorCompra = 0;
    const itensSelecionados = {};
    const listaItens = itens.map(item => item.split(',')[0])

    for (const item of itens) {
      const [codigo, quantidadeStr] = item.split(',');
      const quantidade = parseInt(quantidadeStr);

      const itemEncontrado = this.cardapio.find(itemCardapio => itemCardapio.codigo === codigo);
      if (!itemEncontrado) {
        return 'Item inválido!';
      }

      if (quantidade === 0) {
        return 'Quantidade inválida!';
      }

      if (this.isItemExtra(itemEncontrado.codigo, listaItens)) {
        return 'Item extra não pode ser pedido sem o principal';
      }

      itensSelecionados[itemEncontrado.codigo] = true;

      valorCompra += itemEncontrado.valor * quantidade;
    }

    const desconto_dinheiro = 0.05;
    const acrescimo_credito = 0.03;

    if (!this.validarMetodoPagamento(metodoDePagamento)) {
      return 'Forma de pagamento inválida!';
    }

    switch (metodoDePagamento) {
      case 'dinheiro':
        valorCompra *= (1 - desconto_dinheiro);
        break;
      case 'credito':
        valorCompra *= (1 + acrescimo_credito);
        break;
      case 'debito':
        break;
    }

    return 'R$ ' + valorCompra.toFixed(2).replace('.', ',');
  }
}

export { CaixaDaLanchonete };
