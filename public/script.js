function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// NavbarScrollllllllllllllllllllllllllllllll

let lastScrollY = window.scrollY;
const navbar = document.querySelector("header"); // Pega o header

window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY && window.scrollY > 50) {
        // Rolando para baixo: adiciona a classe para ocultar o header
        navbar.classList.add("hidden");
        navbar.classList.remove("shadow");
    } else if (window.scrollY < lastScrollY) {
        // Rolando para cima: remove a classe de ocultação e adiciona a sombra
        navbar.classList.remove("hidden");
      
    }
    lastScrollY = window.scrollY;
});

// Carroselllllllllllllllllllllllllllll


const carousel = document.querySelector(".carousel");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentIndex = 0;
let interval;

/** Atualiza a posição do carrossel e dos indicadores */
function updateCarousel(index) {
    carousel.style.transform = `translateX(-${index * 100}%)`;
    
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

/** Avança para o próximo slide */
function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel(currentIndex);
}

/** Volta para o slide anterior */
function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel(currentIndex);
}

/** Reseta o timer e mantém o efeito automático */
function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 3000);
}

/** Adiciona eventos aos botões */
nextBtn.addEventListener("click", () => {
    nextSlide();
    resetInterval();
});

prevBtn.addEventListener("click", () => {
    prevSlide();
    resetInterval();
});

/** Adiciona eventos aos indicadores */
dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
        currentIndex = parseInt(e.target.dataset.index);
        updateCarousel(currentIndex);
        resetInterval();
    });
});

/** Inicia o carrossel automático */
interval = setInterval(nextSlide, 3000);

// VALIDA CPFFFFFFFFFFFFFFFFF

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0, resto;

    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf[10]);
}


// FORMULARIOOOOOOOOOOOOOOOOOOOOOOOOOOO


document.addEventListener("DOMContentLoaded", function () {
    const formAdocao = document.getElementById("meuFormulario");
  
    if (formAdocao) {
        formAdocao.addEventListener("submit", function (event) {
            event.preventDefault();
    

            const cpf = document.getElementById("cpf").value;
            const mensagem = document.getElementById("mensagem");

            if (validarCPF(cpf)) {
                mensagem.textContent = "Enviado com sucesso!";
                mensagem.style.color = "green";
            } else {
                mensagem.textContent = "CPF inválido.";
                mensagem.style.color = "red";
            }
        });
    }
});


document.getElementById("cpf").addEventListener("input", function (e) {
    let cpf = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

    if (cpf.length > 11) cpf = cpf.slice(0, 11); // Limita a 11 dígitos

    // Formata visualmente: 000.000.000-00
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    e.target.value = cpf;
});

const telefoneInput = document.getElementById("telefone");

// Formata e impede letras
telefoneInput.addEventListener("input", function (e) {
    let tel = e.target.value.replace(/\D/g, ""); // Remove não-números

    // Limita a 11 dígitos
    if (tel.length > 11) tel = tel.slice(0, 11);

    // Aplica a formatação visual
    if (tel.length <= 10) {
        tel = tel.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
        tel = tel.replace(/^(\d{2})(\d{1})(\d{4})(\d{0,4})/, "($1) $2 $3-$4");
    }

    e.target.value = tel;
});

// LOGINNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN

let isLoggedIn = false;

function loginSection() {
    if (!isLoggedIn) {
        document.getElementById('loginModal').style.display = 'block';
    } else {
        document.getElementById('logoutModal').style.display = 'block';
    }
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('loginMessage').textContent = '';
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
}

function closeLogoutModal() {
    document.getElementById('logoutModal').style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById('loginEmail').value.trim().toLowerCase();
        const password = document.getElementById('loginPassword').value;

        const validEmail = "teste@teste";
        const validPassword = "teste";

        const message = document.getElementById('loginMessage');

        if (email === validEmail && password === validPassword) {
            message.style.color = "green";
            message.textContent = "Login bem-sucedido!";
            isLoggedIn = true;

            setTimeout(() => {
                closeLoginModal();
                updateLoginButton();
            }, 1000);
        } else {
            message.style.color = "red";
            message.textContent = "Email ou senha incorretos.";
        }
    });
    }
});


function confirmLogout() {
    isLoggedIn = false;
    updateLoginButton();
    closeLogoutModal();
}


// Atualizar botão de login também no drawer
function updateLoginButton() {
    const loginBtn = document.getElementById('loginBtn');
    const drawerLoginBtn = document.getElementById('drawerLoginBtn');

    if (isLoggedIn) {
        loginBtn.textContent = "Sair";
        drawerLoginBtn.textContent = "Sair";
    } else {
        loginBtn.textContent = "Login";
        drawerLoginBtn.textContent = "Login";
    }
}


// DRAWERRRRRRRRRRR

function toggleDrawer() {
    const drawer = document.getElementById("drawerMenu");
    const overlay = document.getElementById("drawerOverlay");

    const isOpen = drawer.style.display === "flex";

    if (isOpen) {
        drawer.style.display = "none";
        overlay.style.display = "none";
    } else {
        drawer.style.display = "flex";
        overlay.style.display = "block";
    }
}

function closeDrawer() {
    document.getElementById("drawerMenu").style.display = "none";
    document.getElementById("drawerOverlay").style.display = "none";
}
