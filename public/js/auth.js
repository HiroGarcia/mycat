// // Funções para controlar o modal de autenticação
// function openAuthModal() {
//     document.getElementById('authModal').style.display = 'block';
// }

// function closeAuthModal() {
//     document.getElementById('authModal').style.display = 'none';
//     switchToLogin(); // Reseta para o formulário de login
// }

// function switchToRegister() {
//     document.getElementById('loginForm').style.display = 'none';
//     document.getElementById('registerForm').style.display = 'block';
//     hideMessages();
// }

// function switchToLogin() {
//     document.getElementById('registerForm').style.display = 'none';
//     document.getElementById('loginForm').style.display = 'block';
//     hideMessages();
// }

// function showMessage(formId, message, isError = true) {
//     const messageDiv = document.getElementById(`${formId}Message`);
//     messageDiv.textContent = message;
//     messageDiv.className = isError ? 'message error' : 'message success';
//     messageDiv.style.display = 'block';
// }

// function hideMessages() {
//     document.querySelectorAll('.message').forEach(el => el.style.display = 'none');
// }

// // --- Lógica de Envio dos Formulários com Fetch ---

// // LOGIN
// document.getElementById('loginForm').addEventListener('submit', async function(event) {
//     event.preventDefault();
//     const formData = new FormData(this);
//     const data = Object.fromEntries(formData.entries());

//     try {
//         const response = await fetch('/api/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data)
//         });

//         const result = await response.json();

//         if (!response.ok) {
//             showMessage('login', result.message);
//         } else {
//             // Sucesso! Recarrega a página para atualizar o header.
//             window.location.reload();
//         }
//     } catch (error) {
//         showMessage('login', 'Erro de conexão. Tente novamente.');
//     }
// });

// // CADASTRO
// document.getElementById('registerForm').addEventListener('submit', async function(event) {
//     event.preventDefault();
//     const password = document.getElementById('registerPassword').value;
//     const confirmPassword = document.getElementById('confirmPassword').value;

//     if (password !== confirmPassword) {
//         showMessage('register', 'As senhas não coincidem!');
//         return;
//     }

//     const formData = new FormData(this);
//     const data = Object.fromEntries(formData.entries());

//     try {
//         const response = await fetch('/api/register', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data)
//         });

//         const result = await response.json();

//         if (!response.ok) {
//             showMessage('register', result.message);
//         } else {
//             showMessage('register', result.message, false); // Mensagem de sucesso
//             setTimeout(() => {
//                 switchToLogin(); // Muda para a tela de login após 2 segundos
//             }, 2000);
//         }
//     } catch (error) {
//         showMessage('register', 'Erro de conexão. Tente novamente.');
//     }
// });


// // Adiciona o evento de clique ao botão de login no header
// document.addEventListener('DOMContentLoaded', () => {
//     const loginBtn = document.getElementById('loginBtn');
//     if (loginBtn) {
//         loginBtn.onclick = openAuthModal;
//     }
// });