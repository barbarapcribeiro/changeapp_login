// Verificar autenticação
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Carregar informações do usuário
function loadUserInfo() {
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
        const user = JSON.parse(userSession);
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = user.name || user.username;
        }
    }
}

// Função de logout
function logout() {
    sessionStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userSession');
    window.location.href = 'index.html';
}

// Toggle do menu mobile
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticação
    if (!checkAuth()) return;
    
    // Carregar informações do usuário
    loadUserInfo();
    
    // Event listeners
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }
    
    // Fechar sidebar ao clicar fora (mobile)
    document.addEventListener('click', function(e) {
        const sidebar = document.querySelector('.sidebar');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
});
