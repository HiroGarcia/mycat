document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DE UI (Scroll, Drawer, Carrossel) ---
    initializeUI();

    // --- LÓGICA DE AUTENTICAÇÃO (Modal, Login, Cadastro) ---
    initializeAuth();
    
    // --- LÓGICA DO FORMULÁRIO DE ADOÇÃO ---
    initializeAdoptionForm();

    // --- MÁSCARAS DE INPUT (CPF e Telefone) ---
    initializeInputMasks();
});

// #region Funções de UI
function initializeUI() {
    // Scroll Suave para seções
    window.scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    // Efeito do Header ao rolar a página
    const header = document.querySelector("header");
    if (header) {
        let lastScrollY = window.scrollY;
        window.addEventListener("scroll", () => {
            if (window.scrollY > lastScrollY) {
                header.classList.add("hidden");
            } else {
                header.classList.remove("hidden");
            }
            lastScrollY = window.scrollY;
        });
    }

    // Lógica do Carrossel
    const carousel = document.querySelector(".carousel");
    if (carousel) {
        const slides = document.querySelectorAll(".slide");
        const dots = document.querySelectorAll(".dot");
        const prevBtn = document.getElementById("prev");
        const nextBtn = document.getElementById("next");
        let currentIndex = 0;
        let interval = setInterval(nextSlide, 3000);

        function updateCarousel(index) {
            carousel.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach(dot => dot.classList.remove("active"));
            dots[index].classList.add("active");
        }
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel(currentIndex);
        }
        function resetInterval() {
            clearInterval(interval);
            interval = setInterval(nextSlide, 3000);
        }

        nextBtn?.addEventListener("click", () => { nextSlide(); resetInterval(); });
        prevBtn?.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel(currentIndex);
            resetInterval();
        });
        dots.forEach(dot => {
            dot.addEventListener("click", (e) => {
                currentIndex = parseInt(e.target.dataset.index);
                updateCarousel(currentIndex);
                resetInterval();
            });
        });
    }
    
    // Lógica do Drawer (Menu lateral)
    window.toggleDrawer = () => {
        const drawer = document.getElementById("drawerMenu");
        const overlay = document.getElementById("drawerOverlay");
        drawer.style.display = "flex";
        overlay.style.display = "block";
    };
    window.closeDrawer = () => {
        document.getElementById("drawerMenu").style.display = "none";
        document.getElementById("drawerOverlay").style.display = "none";
    };
}
// #endregion

// #region Funções de Autenticação
function initializeAuth() {
    const authModal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginBtn = document.getElementById('loginBtn');
    const drawerLoginBtn = document.getElementById('drawerLoginBtn');

    window.openAuthModal = () => authModal.style.display = 'block';
    window.closeAuthModal = () => {
        authModal.style.display = 'none';
        switchToLogin();
    };
    window.switchToRegister = () => {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        hideMessages();
    };
    window.switchToLogin = () => {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
        hideMessages();
    };
    
    if (loginBtn) loginBtn.onclick = openAuthModal;
    if (drawerLoginBtn) drawerLoginBtn.onclick = openAuthModal;

    loginForm?.addEventListener('submit', handleFormSubmit);
    registerForm?.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const url = form.action;
    const messageDivId = `${form.id}Message`;

    // Validação de senha para cadastro
    if (form.id === 'registerForm') {
        const password = form.querySelector('#registerPassword').value;
        const confirmPassword = form.querySelector('#confirmPassword').value;
        if (password !== confirmPassword) {
            showMessage(messageDivId, 'As senhas não coincidem!');
            return;
        }
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (!response.ok) {
            showMessage(messageDivId, result.message);
        } else {
            if (form.id === 'loginForm') {
                window.location.reload(); // Sucesso no login, recarrega a página
            } else {
                showMessage(messageDivId, result.message, false); // Sucesso no cadastro
                setTimeout(() => switchToLogin(), 2000);
            }
        }
    } catch (error) {
        showMessage(messageDivId, 'Erro de conexão. Tente novamente.');
    }
}

function showMessage(elementId, message, isError = true) {
    const messageDiv = document.getElementById(elementId);
    if (!messageDiv) return;
    messageDiv.textContent = message;
    messageDiv.className = isError ? 'message error' : 'message success';
    messageDiv.style.display = 'block';
}

function hideMessages() {
    document.querySelectorAll('.message').forEach(el => el.style.display = 'none');
}
// #endregion

// #region Funções do Formulário de Adoção
function initializeAdoptionForm() {
    const adoptionForm = document.getElementById('adoptionForm');
    adoptionForm?.addEventListener('submit', async function(event) {
        event.preventDefault();
        const cpfInput = document.getElementById('cpf');
        const messageDiv = document.getElementById('adoptionMessage');
        
        if (!validarCPF(cpfInput.value)) {
            messageDiv.textContent = "CPF inválido.";
            messageDiv.style.color = "red";
            messageDiv.style.display = 'block';
            return;
        }

        const formData = new FormData(adoptionForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/adocao', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (!response.ok) {
                 messageDiv.textContent = result.message || "Ocorreu um erro.";
                 messageDiv.style.color = "red";
            } else {
                 messageDiv.textContent = "Formulário enviado com sucesso!";
                 messageDiv.style.color = "green";
                 adoptionForm.reset(); // Limpa o formulário
            }
            messageDiv.style.display = 'block';
        } catch(err) {
            messageDiv.textContent = "Erro de conexão.";
            messageDiv.style.color = "red";
            messageDiv.style.display = 'block';
        }
    });
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}
// #endregion

// #region Funções de Máscara de Input
function initializeInputMasks() {
    const cpfInput = document.getElementById("cpf");
    cpfInput?.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    });

    const telefoneInput = document.getElementById("telefone");
    telefoneInput?.addEventListener("input", (e) => {
        let v = e.target.value.replace(/\D/g, "");
        v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
        v = v.replace(/(\d)(\d{4})$/, "$1-$2");
        e.target.value = v;
    });
}
// #endregion