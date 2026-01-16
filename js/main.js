    /**
     * Horizonte Psicoterapia - JavaScript Premium
     * Funcionalidades avançadas para site de clínica psicológica
     */

    // Aguarda o DOM carregar completamente
    document.addEventListener('DOMContentLoaded', function() {
    
    // ========== ATUALIZAR ANO NO FOOTER ==========
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // ========== MENU MOBILE ==========
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        
        // Alterar texto de acessibilidade
        const label = isExpanded ? 'Abrir menu' : 'Fechar menu';
        this.setAttribute('aria-label', label);
        });
    }
    
    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menu');
        }
        });
    });
    
    // ========== HEADER SCROLL EFFECT ==========
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
        header.classList.add('scrolled');
        } else {
        header.classList.remove('scrolled');
        }
    });
    
    // ========== FORMULÁRIO DE CONTATO ==========
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validação básica
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        const privacy = document.getElementById('privacy').checked;
        
        // Validação
        if (!name || !email || !phone || !message || !privacy) {
            showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }
        
        // Validação de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Por favor, insira um e-mail válido.', 'error');
            return;
        }
        
        // Simular envio (em produção, integrar com backend)
        showNotification('Mensagem enviada com sucesso! Entrarei em contato em até 24 horas.', 'success');
        
        // Resetar formulário
        contactForm.reset();
        
        // Rolar para o topo do formulário
        contactForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
    
    // ========== NEWSLETTER FORM ==========
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!email) {
            showNotification('Por favor, insira seu e-mail.', 'error');
            return;
        }
        
        // Simular assinatura
        showNotification('Obrigada por se inscrever! Você receberá nosso próximo conteúdo.', 'success');
        emailInput.value = '';
        });
    }
    
    // ========== ANIMAÇÃO DE STATS ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
            }
        });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => observer.observe(stat));
    }
    
    // ========== SMOOTH SCROLL PARA LINKS INTERNOS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.main-header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
            });
        }
        });
    });
    
    // ========== ATIVAR LINK ATIVO NO MENU ==========
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
            });
        }
        });
    });
    
    // ========== FUNÇÕES AUXILIARES ==========
    
    // Mostrar notificação
    function showNotification(message, type = 'success') {
        // Remover notificação anterior se existir
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
        existingNotification.remove();
        }
        
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" aria-label="Fechar notificação">
            <i class="fas fa-times"></i>
        </button>
        `;
        
        // Adicionar ao body
        document.body.appendChild(notification);
        
        // Mostrar notificação
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Fechar notificação
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
        });
        
        // Auto-fechar após 5 segundos
        setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
        }, 5000);
        
        // Estilos para notificação
        const style = document.createElement('style');
        style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            padding: 1rem 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            max-width: 400px;
            z-index: 9999;
            transform: translateX(150%);
            transition: transform 0.3s ease;
        }
        .notification.show {
            transform: translateX(0);
        }
        .notification-success {
            border-left: 4px solid #28a745;
        }
        .notification-error {
            border-left: 4px solid #dc3545;
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        .notification-content i {
            font-size: 1.25rem;
        }
        .notification-success .notification-content i {
            color: #28a745;
        }
        .notification-error .notification-content i {
            color: #dc3545;
        }
        .notification-close {
            background: none;
            border: none;
            color: #666;
            cursor: pointer;
            font-size: 1rem;
            padding: 0.25rem;
            transition: color 0.2s;
        }
        .notification-close:hover {
            color: #333;
        }
        `;
        
        if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
        }
    }
    
    // Animar contadores
    function animateCounter(element) {
        const target = parseInt(element.textContent.replace('+', ''));
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
        }, 16);
    }
    
    // ========== CARREGAMENTO DE IMAGENS OTIMIZADO ==========
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
            }
        });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ========== VALIDAÇÃO DE TELEFONE ==========
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 11) {
            value = value.substring(0, 11);
        }
        
        // Formatar: (XX) XXXXX-XXXX
        if (value.length > 10) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        } else if (value.length > 6) {
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
        } else if (value.length > 0) {
            value = value.replace(/^(\d{0,2})$/, '($1');
        }
        
        e.target.value = value;
        });
    }
    
    // ========== DARK MODE DETECTION ==========
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    }
    
    // ========== PRELOADER (opcional) ==========
    // Remover após carregamento
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => preloader.remove(), 500);
        }, 500);
        }
    });
    
    console.log('✅ Horizonte Psicoterapia - Site carregado com sucesso!');
    });