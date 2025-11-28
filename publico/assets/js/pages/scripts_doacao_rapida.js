const form = document.getElementById('doacao_rapida_form');
const nomeInput = document.getElementById('nome');
const valorBtns = document.querySelectorAll('.valor_btn');
const valorPersonalizado = document.getElementById('valor_personalizado');
const paymentOptions = document.querySelectorAll('.payment_option');
const pixContainer = document.getElementById('pix_container');
const cartaoContainer = document.getElementById('cartao_container');
const numeroCartaoInput = document.getElementById('numero_cartao');
const validadeInput = document.getElementById('validade');
const cvvInput = document.getElementById('cvv');
const cardBrandIcon = document.getElementById('card_brand_icon');

let valorSelecionado = null;
let metodoSelecionado = null;


for (let i = 0; i < valorBtns.length; i++) {
    valorBtns[i].addEventListener('click', function() {
        for (let j = 0; j < valorBtns.length; j++) {
            valorBtns[j].classList.remove('active');
        }
        
        this.classList.add('active');
        
        valorSelecionado = this.getAttribute('data-valor');
        
        valorPersonalizado.value = '';
        
        esconderErro('valor_erro');
    });
}


valorPersonalizado.addEventListener('input', function() {
    if (this.value) {
        for (let i = 0; i < valorBtns.length; i++) {
            valorBtns[i].classList.remove('active');
        }
        
        valorSelecionado = this.value;
        
        esconderErro('valor_erro');
    } else {
        valorSelecionado = null;
    }
});


for (let i = 0; i < paymentOptions.length; i++) {
    paymentOptions[i].addEventListener('click', function() {
        for (let j = 0; j < paymentOptions.length; j++) {
            paymentOptions[j].classList.remove('active');
        }
        
        this.classList.add('active');
        
        metodoSelecionado = this.getAttribute('data-method');
        
        if (metodoSelecionado === 'pix') {
            pixContainer.classList.add('active');
            cartaoContainer.classList.remove('active');
        } else if (metodoSelecionado === 'cartao') {
            cartaoContainer.classList.add('active');
            pixContainer.classList.remove('active');
        }
    });
}


if (numeroCartaoInput) {
    numeroCartaoInput.addEventListener('input', function(e) {
        let valor = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/g, '');
        
        let valorFormatado = '';
        for (let i = 0; i < valor.length; i++) {
            if (i > 0 && i % 4 === 0) {
                valorFormatado += ' ';
            }
            valorFormatado += valor[i];
        }
        
        e.target.value = valorFormatado;
        
        detectarBandeiraCartao(valor);
        
        esconderErro('cartao_erro');
    });
}


if (validadeInput) {
    validadeInput.addEventListener('input', function(e) {
        let valor = e.target.value.replace(/\D/g, '');
        
        if (valor.length >= 2) {
            valor = valor.substring(0, 2) + '/' + valor.substring(2, 4);
        }
        
        e.target.value = valor;
        
        esconderErro('validade_erro');
    });
}


if (cvvInput) {
    cvvInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
        
        esconderErro('cvv_erro');
    });
}


function detectarBandeiraCartao(numero) {
    if (!cardBrandIcon) {
        return;
    }
    
    const primeiroDigito = numero.charAt(0);
    const primeirosQuatro = numero.substring(0, 4);
    const primeirosDoois = numero.substring(0, 2);
    
    cardBrandIcon.className = 'card_brand_icon';
    
    if (numero.charAt(0) === '4') {
        cardBrandIcon.classList.add('fa-brands');
        cardBrandIcon.classList.add('fa-cc-visa');
    } else if (parseInt(primeirosDoois) >= 51 && parseInt(primeirosDoois) <= 55) {
        cardBrandIcon.classList.add('fa-brands');
        cardBrandIcon.classList.add('fa-cc-mastercard');
    } else if (primeirosDoois === '34' || primeirosDoois === '37') {
        cardBrandIcon.classList.add('fa-brands');
        cardBrandIcon.classList.add('fa-cc-amex');
    } else if (primeirosQuatro === '6011' || primeirosDoois === '65') {
        cardBrandIcon.classList.add('fa-brands');
        cardBrandIcon.classList.add('fa-cc-discover');
    } else if (primeirosQuatro >= '3528' && primeirosQuatro <= '3589') {
        cardBrandIcon.classList.add('fa-brands');
        cardBrandIcon.classList.add('fa-cc-jcb');
    } else if (primeirosQuatro === '5066' || primeirosQuatro === '5067' || primeirosQuatro === '5090' || primeirosQuatro === '6362' || primeirosQuatro === '6363') {
        cardBrandIcon.classList.add('fa-regular');
        cardBrandIcon.classList.add('fa-credit-card');
    } else {
        cardBrandIcon.classList.add('fa-regular');
        cardBrandIcon.classList.add('fa-credit-card');
    }
}


form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let valido = true;
    
    if (nomeInput.value.trim() === '') {
        mostrarErro('nome_erro');
        valido = false;
    }
    
    if (!valorSelecionado || parseFloat(valorSelecionado) <= 0) {
        mostrarErro('valor_erro');
        valido = false;
    }
    
    if (!metodoSelecionado) {
        alert('Por favor, selecione um método de pagamento');
        valido = false;
    }
    
    if (metodoSelecionado === 'cartao' && valido === true) {
        const numeroCartao = numeroCartaoInput.value.replace(/\s/g, '');
        const nomeTitular = document.getElementById('nome_titular').value.trim();
        const validade = validadeInput.value;
        const cvv = cvvInput.value;
        
        if (!numeroCartao || numeroCartao.length < 13 || numeroCartao.length > 19) {
            mostrarErro('cartao_erro');
            valido = false;
        }
        
        if (!nomeTitular || nomeTitular === '') {
            mostrarErro('titular_erro');
            valido = false;
        }
        
        if (!validarValidade(validade)) {
            mostrarErro('validade_erro');
            valido = false;
        }
        
        if (!cvv || cvv.length < 3 || cvv.length > 4) {
            mostrarErro('cvv_erro');
            valido = false;
        }
    }
    
    if (valido === true) {
        let metodoPagamento = '';
        if (metodoSelecionado === 'pix') {
            metodoPagamento = 'PIX';
        } else {
            metodoPagamento = 'Cartão de Crédito';
        }
        
        alert('Doação de R$ ' + valorSelecionado + ' confirmada via ' + metodoPagamento + '!\nObrigado, ' + nomeInput.value + '!');
        window.location.href = 'index.html';
    }
});


function validarValidade(validade) {
    const formatoCorreto = /^\d{2}\/\d{2}$/;
    if (!formatoCorreto.test(validade)) {
        return false;
    }
    
    const partes = validade.split('/');
    const mes = parseInt(partes[0]);
    const ano = parseInt(partes[1]);
    
    if (mes < 1 || mes > 12) {
        return false;
    }
    
    const hoje = new Date();
    const anoAtual = hoje.getFullYear() % 100; // Pega só os dois últimos dígitos do ano
    const mesAtual = hoje.getMonth() + 1; // getMonth() retorna 0-11, então soma 1
    
    if (ano < anoAtual) {
        return false;
    }
    
    if (ano === anoAtual && mes < mesAtual) {
        return false;
    }
    
    return true;
}


function mostrarErro(erroId) {
    const elemento = document.getElementById(erroId);
    if (elemento) {
        elemento.classList.add('visible');
    }
}


function esconderErro(erroId) {
    const elemento = document.getElementById(erroId);
    if (elemento) {
        elemento.classList.remove('visible');
    }
}


if (nomeInput) {
    nomeInput.addEventListener('input', function() {
        esconderErro('nome_erro');
    });
}

