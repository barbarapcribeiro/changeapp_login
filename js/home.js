// Funcionalidades específicas da home
document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticação
    if (!checkAuth()) return;
    
    // Carregar informações do usuário
    loadUserInfo();
    
    // Adicionar event listeners para os cards de navegação
    const navCards = document.querySelectorAll('.nav-card');
    navCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            navigateToSection(category);
        });
    });
    
    // Adicionar event listeners para os cards de acesso rápido
    const quickCards = document.querySelectorAll('.quick-card');
    quickCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            handleQuickAccess(index);
        });
    });
    
    // Animação de entrada dos cards
    animateCards();
});

// Função para navegar para seções específicas
function navigateToSection(category) {
    // Por enquanto, apenas mostra um alerta
    // Futuramente, pode redirecionar para páginas específicas
    const categoryNames = {
        'fundamentals': 'Vamos falar de Change',
        'methodologies': 'Metodologias de Change',
        'disciplines': 'As disciplinas em Change',
        'stakeholders': 'Gestão de Stakeholders',
        'communication': 'Comunicação',
        'engagement': 'Engajamento',
        'resistance': 'Gestão de Resistências',
        'learning': 'Aprendizagem',
        'impacts': 'Impactos Organizacionais',
        'adoption': 'Adoção e Sustentação',
        'culture': 'Cultura'
    };
    
    const sectionName = categoryNames[category];
    
    // Simulação de navegação
    showNotification(`Navegando para: ${sectionName}`, 'info');
    
    // Aqui você pode adicionar a lógica real de navegação
    // Por exemplo: window.location.href = `pages/${category}.html`;
}

// Função para lidar com acesso rápido
function handleQuickAccess(index) {
    const actions = [
        () => {
            showNotification('Iniciando jornada no Change Management!', 'success');
            // Redirecionar para tutorial ou primeira seção
        },
        () => {
            showNotification('Acessando recursos e templates...', 'info');
            // Redirecionar para página de recursos
        },
        () => {
            showNotification('Entrando em contato com suporte...', 'info');
            // Abrir chat ou formulário de suporte
        }
    ];
    
    if (actions[index]) {
        actions[index]();
    }
}

// Função para mostrar notificações
function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Adicionar estilos se não existirem
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                z-index: 10000;
                min-width: 300px;
                animation: slideInRight 0.3s ease;
            }
            
            .notification-success { border-left: 4px solid #27ae60; }
            .notification-error { border-left: 4px solid #e74c3c; }
            .notification-info { border-left: 4px solid #3498db; }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 16px 20px;
            }
            
            .notification-content i {
                font-size: 1.2rem;
            }
            
            .notification-success .notification-content i { color: #27ae60; }
            .notification-error .notification-content i { color: #e74c3c; }
            .notification-info .notification-content i { color: #3498db; }
            
            .notification-close {
                position: absolute;
                top: 8px;
                right: 8px;
                background: none;
                border: none;
                cursor: pointer;
                color: #999;
                padding: 4px;
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Event listener para fechar
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remover após 4 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 4000);
}

// Função para animar cards na entrada
function animateCards() {
    const cards = document.querySelectorAll('.nav-card');
    
    // Usar Intersection Observer para animar quando visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    });
    
    // Aplicar estilos iniciais e observar cards
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

