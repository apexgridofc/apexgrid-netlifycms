// Funções JavaScript para o site da Apex Grid - Versão 2

// Esperar pelo carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos os componentes
    initHeader();
    initScrollAnimations();
    initMobileMenu();
    initWhatsAppTooltip();
    
    // Se existirem elementos específicos, inicializar suas funcionalidades
    if (document.querySelector('.depoimentos-slider')) {
        initDepoimentosSlider();
    }
    
    if (document.querySelector('#contato-form')) {
        initContatoForm();
    }
});

// Função para inicializar o comportamento do header
function initHeader() {
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Verificar posição inicial do scroll
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
    
    // Adicionar classe active ao link de navegação atual
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentLocation = window.location.pathname;
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation === linkPath || 
            (linkPath !== '/' && currentLocation.includes(linkPath))) {
            link.classList.add('active');
        }
    });
}

// Função para inicializar o menu mobile
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!mobileToggle || !navMenu) return;
    
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });
}

// Função para inicializar animações de scroll
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (!fadeElements.length) return;
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
}

// Função para inicializar o tooltip do WhatsApp
function initWhatsAppTooltip() {
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    if (!whatsappFloat) return;
    
    // Mostrar tooltip após 3 segundos na página
    setTimeout(() => {
        const tooltip = whatsappFloat.querySelector('.whatsapp-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
            tooltip.style.transform = 'translateX(0)';
            
            // Esconder após 5 segundos
            setTimeout(() => {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
                tooltip.style.transform = 'translateX(10px)';
            }, 5000);
        }
    }, 3000);
}

// Função para inicializar o slider de depoimentos
function initDepoimentosSlider() {
    // Esta função seria implementada com uma biblioteca como Swiper ou Slick
    // Para este exemplo, vamos simular um slider básico
    const slider = document.querySelector('.depoimentos-slider');
    const cards = slider.querySelectorAll('.depoimento-card');
    let currentIndex = 0;
    
    // Esconder todos os cards exceto o primeiro
    cards.forEach((card, index) => {
        if (index !== 0) {
            card.style.display = 'none';
        }
    });
    
    // Criar botões de navegação
    const prevButton = document.createElement('button');
    prevButton.classList.add('slider-prev');
    prevButton.innerHTML = '&larr;';
    
    const nextButton = document.createElement('button');
    nextButton.classList.add('slider-next');
    nextButton.innerHTML = '&rarr;';
    
    slider.appendChild(prevButton);
    slider.appendChild(nextButton);
    
    // Adicionar estilos aos botões
    const buttonStyle = `
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: var(--primary-color);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        z-index: 10;
        transition: all 0.3s ease;
    `;
    
    prevButton.style.cssText = buttonStyle + 'left: -20px;';
    nextButton.style.cssText = buttonStyle + 'right: -20px;';
    
    // Adicionar eventos aos botões
    prevButton.addEventListener('click', () => {
        cards[currentIndex].style.display = 'none';
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        cards[currentIndex].style.display = 'block';
    });
    
    nextButton.addEventListener('click', () => {
        cards[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % cards.length;
        cards[currentIndex].style.display = 'block';
    });
}

// Função para inicializar o formulário de contato
function initContatoForm() {
    const form = document.querySelector('#contato-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar formulário
        const nome = form.querySelector('#nome').value;
        const email = form.querySelector('#email').value;
        const mensagem = form.querySelector('#mensagem').value;
        
        if (!nome || !email || !mensagem) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        // Simular envio do formulário
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        
        // Simular atraso de envio
        setTimeout(() => {
            // Aqui seria a lógica de envio real
            alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
            
            // Resetar formulário
            form.reset();
            
            // Restaurar botão
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }, 1500);
    });
}

// Função para contador de estatísticas (usado na seção Sobre)
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (!statNumbers.length) return;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-count'));
                let currentValue = 0;
                const duration = 2000; // 2 segundos
                const increment = Math.ceil(finalValue / (duration / 16));
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        target.textContent = finalValue + '+';
                        clearInterval(counter);
                    } else {
                        target.textContent = currentValue + '+';
                    }
                }, 16);
                
                counterObserver.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
}

// Função para adicionar Google Analytics
function initGoogleAnalytics(trackingId) {
    // Esta função seria implementada com o código real do Google Analytics
    console.log(`Google Analytics inicializado com ID: ${trackingId}`);
}
