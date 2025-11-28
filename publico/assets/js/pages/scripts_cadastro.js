window.addEventListener("DOMContentLoaded", () => {

    VMasker(document.getElementById("cpf")).maskPattern("999.999.999-99");

    VMasker(document.getElementById("tel")).maskPattern("(99) 9 9999-9999");

    VMasker(document.getElementById("cep")).maskPattern("99.999-999");

    const primeira_maiuscula = (str) => str.replace(/\b\w/g, c => c.toUpperCase());

    ["nome", "sobrenome"].forEach(id => {
        const input = document.getElementById(id);
        input.addEventListener("input", (e) => {
            e.target.value = primeira_maiuscula(e.target.value);
        });
    });
});

function validar_nao_vazio(v) {
    return v.trim() !== "";
}

function validar_cpf(cpf) {
    const cpf_base = cpf.replace(/\D/g, ""); // apenas números
    const valores_invalidos = [
        "00000000000", "11111111111", "22222222222", "33333333333",
        "44444444444", "55555555555", "66666666666", "77777777777",
        "88888888888", "99999999999"
    ];

    if (valores_invalidos.includes(cpf_base)) return false;

    if (cpf_base.length !== 11) return false;

    if (/^(\d)\1+$/.test(cpf_base)) return false;

    const calc = (len) => {
        let soma = 0;
        for (let i = 0; i < len; i++) {
            soma += parseInt(cpf_base[i]) * (len + 1 - i);
        }
        const resto = (soma * 10) % 11;
        return resto === 10 ? 0 : resto;
    };

    return calc(9) === parseInt(cpf_base[9]) &&
           calc(10) === parseInt(cpf_base[10]);
}

function validar_email(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validar_telefone(tel) {
    tel = tel.replace(/\D/g, "");
    return tel.length === 11;
}

function validar_cep(cep) {
    cep = cep.replace(/\D/g, "");
    return cep.length === 8;
}

document.addEventListener("DOMContentLoaded", () => {
    const input_senha = document.getElementById("senha");
    const mostrar_senha = document.getElementById("mostrar_senha");

    mostrar_senha.addEventListener("click", () => {
        const senha_oculta = input_senha.type === "password";

        if (senha_oculta) {
            input_senha.type = "text";
            mostrar_senha.classList.remove("fa-eye");
            mostrar_senha.classList.add("fa-eye-slash");
        } else {
            input_senha.type = "password";
            mostrar_senha.classList.remove("fa-eye-slash");
            mostrar_senha.classList.add("fa-eye");
        }
    });
});

function validar_senha(s) {
    return s.length >= 8;
}
function validar_confirmacao_senha(s, c) {
    return s === c;
}

function validar_genero(radios) {
    return Array.from(radios).some(r => r.checked);
}

function validar_campo(input, func, msgId) {
    const ok = func(input.value);
    const msg = document.getElementById(msgId);

    if (!ok) {
        msg.classList.add("visible");
        input.focus();
        return false;
    }

    msg.classList.remove("visible");
    return true;
}

function validar_campo_duplo(input1, input2, func, msgId) {
    const ok = func(input1.value, input2.value);
    const msg = document.getElementById(msgId);

    if (!ok) {
        msg.classList.add("visible");
        input1.focus();
        return false;
    }

    msg.classList.remove("visible");
    return true;
}


document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("cadastro_form");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // impede envio automático

        const nome = document.getElementById("nome");
        const sobrenome = document.getElementById("sobrenome");
        const cpf = document.getElementById("cpf");
        const email = document.getElementById("email");
        const tel = document.getElementById("tel");
        const cep = document.getElementById("cep");
        const senha = document.getElementById("senha");
        const confirmar = document.getElementById("conf_senha");
        const generos = document.querySelectorAll("input[name='genero']");

        const v1 = validar_campo(nome, validar_nao_vazio, "nome_errormsg");
        const v2 = validar_campo(sobrenome, validar_nao_vazio, "sobrenome_errormsg");
        const v3 = validar_campo(cpf, validar_cpf, "cpf_errormsg");
        const v4 = validar_campo(email, validar_email, "email_errormsg");
        const v5 = validar_campo(tel, validar_telefone, "tel_errormsg");
        const v6 = validar_campo(cep, validar_cep, "cep_errormsg");
        const v7 = validar_campo(senha, validar_senha, "senha_errormsg");
        const v8 = validar_campo_duplo(senha, confirmar, validar_confirmacao_senha, "confirmacao_errormsg");

        const v9 = validar_genero(generos);
        if (!v9) {
            document.getElementById("genero_errormsg").classList.add("visible");
        } else {
            document.getElementById("genero_errormsg").classList.remove("visible");
        }

        if (v1 && v2 && v3 && v4 && v5 && v6 && v7 && v8 && v9) {
            alert("Formulário enviado com sucesso!");
            this.submit();
        }
    });
});