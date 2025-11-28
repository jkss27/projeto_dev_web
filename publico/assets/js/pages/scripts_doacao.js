const form = document.getElementById('doacao_type_form');
const fotoInput = document.getElementById('foto');
const uploadArea = document.getElementById('upload_area');
const preview = document.getElementById('foto_preview');
const removeBtn = document.getElementById('foto_remove');
const fotoErr = document.getElementById('foto_errormsg');
const doacaoTypeErr = document.getElementById('doacao_type_errormsg');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const escolhido = document.querySelector('input[name="doacao_type"]:checked');
        
        if (!escolhido) {
            if (doacaoTypeErr) {
                doacaoTypeErr.classList.add('visible');
            }
            return;
        } else {
            if (doacaoTypeErr) {
                doacaoTypeErr.classList.remove('visible');
            }
            alert('Doação registrada! Obrigado pela sua contribuição.');
        }
    });
}

if (uploadArea) {
    uploadArea.addEventListener('click', function() {
        if (fotoInput) {
            fotoInput.click();
        }
    });
    
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        
        if (e.dataTransfer.files.length > 0) {
            if (fotoInput) {
                fotoInput.files = e.dataTransfer.files;
                const event = new Event('change');
                fotoInput.dispatchEvent(event);
            }
        }
    });
}

if (fotoInput) {
    fotoInput.addEventListener('change', function() {
        if (preview) {
            preview.innerHTML = '';
            preview.classList.remove('active');
        }
        if (fotoErr) {
            fotoErr.textContent = '';
            fotoErr.classList.remove('visible');
        }
        if (removeBtn) {
            removeBtn.classList.remove('active');
        }
        
        const file = this.files[0];
        if (!file) {
            return;
        }
        
        const tamanhoMaximo = 5 * 1024 * 1024; // 5MB em bytes
        if (file.size > tamanhoMaximo) {
            if (fotoErr) {
                fotoErr.textContent = 'Arquivo muito grande. O tamanho máximo é 5MB.';
                fotoErr.classList.add('visible');
            }
            this.value = '';
            return;
        }
        
        const img = document.createElement('img');
        img.classList.add('preview-image');
        img.alt = 'Prévia da imagem da doação';
        img.src = URL.createObjectURL(file);
        
        if (preview) {
            preview.appendChild(img);
            preview.classList.add('active');
        }
        
        if (removeBtn) {
            removeBtn.classList.add('active');
        }
    });
}

if (removeBtn) {
    removeBtn.addEventListener('click', function() {
        if (fotoInput) {
            fotoInput.value = '';
        }
        
        if (preview) {
            preview.innerHTML = '';
            preview.classList.remove('active');
        }
        
        if (fotoErr) {
            fotoErr.textContent = '';
            fotoErr.classList.remove('visible');
        }
        
        this.classList.remove('active');
    });
}

const radioInputs = document.querySelectorAll('input[name="doacao_type"]');
for (let i = 0; i < radioInputs.length; i++) {
    radioInputs[i].addEventListener('change', function() {
        if (doacaoTypeErr) {
            doacaoTypeErr.classList.remove('visible');
        }
    });
}

