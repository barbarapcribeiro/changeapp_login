// Dados de usuários de exemplo (em produção, isso viria de uma API)
const users = [
    { username: 'admin', password: 'admin123', role: 'admin', name: 'Administrador' },
    { username: 'manager', password: 'manager123', role: 'manager', name: 'Gerente' },
    { username: 'user', password: 'user123', role: 'user', name: 'Usuário' }
];

// Elementos do DOM
const loginForm = document.getElementById('loginForm');
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

// Toggle mostrar/ocultar senha
togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});

// Função para mostrar erro
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    errorMessage.style.animation = 'shake 0.5s ease-in-out';
}

// Função para ocultar erro
function hideError() {
    errorMessage.style.display = 'none';
}

// Função de validação de login
function validateLogin(username, password) {
    return users.find(user => user.username === username && user.password === password);
}

// Função para salvar sessão do usuário
function saveUserSession(user) {
    const sessionData = {
        username: user.username,
        role: user.role,
        name: user.name,
        loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('userSession', JSON.stringify(sessionData));
    sessionStorage.setItem('isLoggedIn', 'true');
}

// Event listener do formulário de login
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    hideError();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Validação básica
    if (!username || !password) {
        showError('Por favor, preencha todos os campos.');
        return;
    }
    
    // Simular delay de autenticação
    const loginBtn = document.querySelector('.login-btn');
    const originalText = loginBtn.innerHTML;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';
    loginBtn.disabled = true;
    
    setTimeout(() => {
        const user = validateLogin(username, password);
        
        if (user) {
            saveUserSession(user);
            
            // Salvar "lembrar-me" se marcado
            if (rememberMe) {
                localStorage.setItem('rememberUser', username);
            } else {
                localStorage.removeItem('rememberUser');
            }
            
            // Sucesso - redirecionar para dashboard
            window.location.href = 'dashboard.html';
        } else {
            showError('Usuário ou senha incorretos.');
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
        }
    }, 1000);
});

// Verificar se há usuário salvo para "lembrar-me"
window.addEventListener('load', function() {
    const rememberedUser = localStorage.getItem('rememberUser');
    if (rememberedUser) {
        document.getElementById('username').value = rememberedUser;
        document.getElementById('rememberMe').checked = true;
    }
    
    // Se já estiver logado, redirecionar
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'dashboard.html';
    }
});

// Animação de shake para erros
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

