        const menuToggle = document.getElementById('menu_toggle');
        const navBar = document.querySelector('nav.nav_bar');
        if (menuToggle && navBar) {
            menuToggle.onclick = function() {
                this.classList.toggle('active');
                navBar.classList.toggle('active');
            };
        }

        const loginInput = document.getElementById('login_input');
        const loginLabel = document.getElementById('loginLabel');
        let currentMode = 'email';
        document.querySelectorAll('.mode_btn').forEach(btn => {
            btn.onclick = function() {
                document.querySelectorAll('.mode_btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentMode = this.getAttribute('data-mode');
                if (currentMode === 'cpf') {
                    loginLabel.textContent = 'CPF *';
                    loginInput.placeholder = '000.000.000-00';
                    loginInput.value = '';
                    VMasker(loginInput).maskPattern('999.999.999-99');
                } else {
                    loginLabel.textContent = 'E-mail *';
                    loginInput.placeholder = 'seunome@exemplo.com';
                    loginInput.value = '';
                    VMasker(loginInput).unMask();
                }
            };
        });

        const mostrarSenha = document.getElementById('mostrar_senha');
        if (mostrarSenha) {
            mostrarSenha.onclick = function() {
                const senha = document.getElementById('senha');
                if (!senha) return;
                if (senha.type === 'password') {
                    senha.type = 'text';
                    this.classList.remove('fa-eye');
                    this.classList.add('fa-eye-slash');
                } else {
                    senha.type = 'password';
                    this.classList.remove('fa-eye-slash');
                    this.classList.add('fa-eye');
                }
            };
        }

        const recoveryWindow = document.getElementById('janela_recuperacao');
        const stepRecovery = document.getElementById('recuperacao');
        const stepCode = document.getElementById('codigo_recuperacao');
        const stepNewPassword = document.getElementById('nova_senha_step');

        function showStep(step) {
            if (stepRecovery) stepRecovery.style.display = step === 1 ? 'block' : 'none';
            if (stepCode) stepCode.style.display = step === 2 ? 'block' : 'none';
            if (stepNewPassword) stepNewPassword.style.display = step === 3 ? 'block' : 'none';
        }

        const linkEsqueceu = document.getElementById('esqueceu_senha');
        if (linkEsqueceu && recoveryWindow) {
            linkEsqueceu.onclick = () => {
                recoveryWindow.classList.add('active');
                showStep(1);
            };
        }
        const botaoFechar = document.getElementById('botao_fechar');
        if (botaoFechar && recoveryWindow) {
            botaoFechar.onclick = () => recoveryWindow.classList.remove('active');
        }
        if (recoveryWindow) {
            recoveryWindow.onclick = (e) => { if (e.target === recoveryWindow) recoveryWindow.classList.remove('active'); };
        }

        const recoveryInput = document.getElementById('recovery_input');
        const recoveryLabel = document.getElementById('recovery_label');
        let recoveryMode = 'email';
        document.querySelectorAll('.recovery_mode_btn').forEach(btn => {
            btn.onclick = function() {
                document.querySelectorAll('.recovery_mode_btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                recoveryMode = this.getAttribute('data_recovery');
                if (recoveryMode === 'phone') {
                    recoveryLabel.textContent = 'Telefone *';
                    recoveryInput.placeholder = '(00) 0 0000-0000';
                    recoveryInput.value = '';
                    VMasker(recoveryInput).maskPattern('(99) 9 9999-9999');
                } else {
                    recoveryLabel.textContent = 'E-mail *';
                    recoveryInput.placeholder = 'seunome@exemplo.com';
                    recoveryInput.value = '';
                    VMasker(recoveryInput).unMask();
                }
            };
        });

        const enviarCodigoBtn = document.getElementById('enviar_codigo_btn');
        if (enviarCodigoBtn) {
            enviarCodigoBtn.onclick = () => {
                if (recoveryInput.value.trim() === '') {
                    alert('Por favor, preencha o campo.');
                    return;
                }
                const sentTo = document.getElementById('sentTo');
                if (sentTo) sentTo.textContent = recoveryInput.value;
                showStep(2);
            };
        }

        const digits = [
            document.getElementById('digito_1'),
            document.getElementById('digito_2'),
            document.getElementById('digito_3'),
            document.getElementById('digito_4')
        ].filter(Boolean);

        digits.forEach((d, i) => {
            d.oninput = () => { if (d.value.length === 1 && i < digits.length - 1) digits[i + 1].focus(); };
            d.onkeydown = (e) => { if (e.key === 'Backspace' && d.value === '' && i > 0) digits[i - 1].focus(); };
        });

        const botaoCodigo = document.getElementById('botao_codigo');
        if (botaoCodigo) {
            botaoCodigo.onclick = () => {
                const code = digits.map(d => d.value).join('');
                const err = document.getElementById('codigo_errormsg');
                if (code === '1898') {
                    err && err.classList.remove('visible');
                    showStep(3);
                } else {
                    err && err.classList.add('visible');
                }
            };
        }

        const mudarSenhaBotao = document.getElementById('mudar_senha_botao');
        if (mudarSenhaBotao) {
            mudarSenhaBotao.onclick = () => {
                const newPassInput = document.getElementById('nova_senha');
                const confPassInput = document.getElementById('confirmar_senha');
                if (!newPassInput || !confPassInput) return;
                const newPass = newPassInput.value;
                const confPass = confPassInput.value;
                const err1 = document.getElementById('new_password_errormsg');
                const err2 = document.getElementById('confirm_password_errormsg');
                let valid = true;
                if (newPass.length < 8) { err1.classList.add('visible'); valid = false; } else { err1.classList.remove('visible'); }
                if (newPass !== confPass) { err2.classList.add('visible'); valid = false; } else { err2.classList.remove('visible'); }
                if (valid) {
                    alert('Senha alterada com sucesso!');
                    recoveryWindow.classList.remove('active');
                    recoveryInput.value = '';
                    digits.forEach(d => d.value = '');
                    newPassInput.value = '';
                    confPassInput.value = '';
                    showStep(1);
                }
            };
        }

        const mostrarNovaSenha = document.getElementById('mostrar_nova_senha');
        if (mostrarNovaSenha) {
            mostrarNovaSenha.onclick = function() {
                const novaSenhaInput = document.getElementById('nova_senha');
                if (!novaSenhaInput) return;
                if (novaSenhaInput.type === 'password') {
                    novaSenhaInput.type = 'text';
                    this.classList.remove('fa-eye');
                    this.classList.add('fa-eye-slash');
                } else {
                    novaSenhaInput.type = 'password';
                    this.classList.remove('fa-eye-slash');
                    this.classList.add('fa-eye');
                }
            };
        }

        const mostrarConfirmarSenha = document.getElementById('mostrar_confirmar_senha');
        if (mostrarConfirmarSenha) {
            mostrarConfirmarSenha.onclick = function() {
                const confirmarSenhaInput = document.getElementById('confirmar_senha');
                if (!confirmarSenhaInput) return;
                if (confirmarSenhaInput.type === 'password') {
                    confirmarSenhaInput.type = 'text';
                    this.classList.remove('fa-eye');
                    this.classList.add('fa-eye-slash');
                } else {
                    confirmarSenhaInput.type = 'password';
                    this.classList.remove('fa-eye-slash');
                    this.classList.add('fa-eye');
                }
            };
        }

        const form = document.querySelector('form');
        if (form) {
            form.onsubmit = (e) => {
                e.preventDefault();
                const login = document.getElementById('login_input');
                const senha = document.getElementById('senha');
                const err1 = document.getElementById('login_errormsg');
                const err2 = document.getElementById('senha_errormsg');
                let valid = true;
                if (login.value.trim() === '') { err1.classList.add('visible'); valid = false; } else { err1.classList.remove('visible'); }
                if (senha.value.trim() === '') { err2.classList.add('visible'); valid = false; } else { err2.classList.remove('visible'); }
                if (valid) window.location.href = 'minhas_doacoes.html';
            };
        }