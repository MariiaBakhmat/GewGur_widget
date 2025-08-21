(function() {
  'use strict';
  
  if (window.GewurzChatLoaded) return;
  window.GewurzChatLoaded = true;

 
  const CONFIG = {
    chatUrl: 'https://mariiabakhmat.github.io/GewGur_widget/chat.html',
    iconUrl: 'https://github.com/MariiaBakhmat/GewGur_widget/raw/main/Group%20112.webp',
    showNotificationAfter: 0, 
    position: 'bottom-right'      
  };

  // CSS стилі - точно по Фігмі
  const CSS = `
    .gewurz-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 2147483647;
      font-family: 'Lato', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .gewurz-chat-button {
      width: 41px;
      height: 41px;
      border-radius: 50%;
      background: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: none;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .gewurz-chat-button:hover {
      transform: scale(1.05);
    }

    .gewurz-chat-button img {
      width: 41px;
      height: 41px;
      border-radius: 50%;
      object-fit: cover;
      background: transparent;
    }

    .gewurz-notification-dot {
      position: absolute;
      top: -2px;
      right: -2px;
      width: 16px;
      height: 16px;
      background: #ff4757;
      border-radius: 50%;
      transform: scale(0);
      transition: transform 0.3s ease;
    }

    .gewurz-notification-dot.show {
      transform: scale(1);
    }

    .gewurz-chat-modal {
      position: fixed;
      bottom: 100px;
      right: 20px;
      width: 400px;
      height: 522px;
      background: transparent;
      border: 1.76px solid #336C4D;
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      transform: scale(0.8) translateY(20px);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      overflow: hidden;
    }

    .gewurz-chat-modal.open {
      transform: scale(1) translateY(0);
      opacity: 1;
    }

    .gewurz-chat-header {
      background: transparent;
      color: #FFFFFF;
      padding: 0;
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      height: 40px;
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 10;
    }

    .gewurz-chat-header h3 {
      display: none;
    }

    .gewurz-close-button {
      background: none;
      border: none;
      color: #FFFFFF;
      font-size: 20px;
      cursor: pointer;
      padding: 0;
      border-radius: 0;
      width: 34px;
      height: 29px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.2s;
      font-weight: normal;
    }

    .gewurz-close-button:hover {
      opacity: 0.8;
    }

    .gewurz-chat-iframe {
      width: 100%;
      height: 522px;
      border: none;
      background: transparent;
    }

    .gewurz-loading {
      padding: 20px;
      height: 100%;
      background: linear-gradient(135deg, #003836, #004240);
    }


    @keyframes gewurz-pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    .gewurz-pulse {
      animation: gewurz-pulse 1s ease-in-out 3;
    }

    /* Мобільна версія - точно по Фігмі */
    @media (max-width: 768px) {
      .gewurz-widget {
        bottom: 16px;
        right: 16px;
      }

      .gewurz-chat-button {
        width: 72px;
        height: 72px;
      }

      .gewurz-chat-button img {
        width: 72px;
        height: 72px;
      }

      .gewurz-close-button {
        width: 7px;
        height: 4px;
        font-size: 12px;
      }

      .gewurz-chat-modal {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        border-radius: 0 !important;
        transform: translateY(100%);
        border: none !important;
      }

      .gewurz-chat-modal.open {
        transform: translateY(0);
      }

      .gewurz-chat-iframe {
        height: 100vh;
      }
    }
  `;

  // Додаємо стилі в head
  const styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  // Завантажуємо шрифти якщо їх немає
  if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700&family=Lato:wght@300;400;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
  }

  // HTML віджета
  const widgetHTML = `
    <div class="gewurz-widget">
      <div class="gewurz-chat-modal" id="gewurz-chat-modal">
        <div class="gewurz-chat-header">
          <button class="gewurz-close-button" id="gewurz-close-chat">✕</button>
        </div>
        <iframe 
          class="gewurz-chat-iframe" 
          id="gewurz-chat-iframe"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
          loading="lazy">
        </iframe>
      </div>
      <button class="gewurz-chat-button" id="gewurz-chat-button" title="Чат з Gewürz Guru">
        <img 
          src="${CONFIG.iconUrl}" 
          alt="Gewürz Guru"
          onerror="this.style.display='none'; this.parentElement.innerHTML='💬';">
        <div class="gewurz-notification-dot" id="gewurz-notification-dot"></div>
      </button>
    </div>
  `;

  // Клас віджета
  class GewurzWidget {
    constructor() {
      this.isOpen = false;
      this.isLoaded = false;
      this.initWidget();
    }

    initWidget() {
      // Створюємо контейнер
      const container = document.createElement('div');
      container.innerHTML = widgetHTML;
      document.body.appendChild(container);

      // Отримуємо елементи
      this.chatButton = document.getElementById('gewurz-chat-button');
      this.chatModal = document.getElementById('gewurz-chat-modal');
      this.closeButton = document.getElementById('gewurz-close-chat');
      this.chatIframe = document.getElementById('gewurz-chat-iframe');
      this.notificationDot = document.getElementById('gewurz-notification-dot');

      this.bindEvents();
      this.scheduleNotification();
      {
    if (event.data.type === 'chat-loaded') {

    }
  });
}
  
    bindEvents() {
      this.chatButton.addEventListener('click', () => this.toggleChat());
      this.closeButton.addEventListener('click', () => this.closeChat());

      // Закриття по кліку поза модалом (тільки десктоп)
      document.addEventListener('click', (e) => {
        if (window.innerWidth > 768 && 
            this.isOpen && 
            !this.chatModal.contains(e.target) && 
            !this.chatButton.contains(e.target)) {
          this.closeChat();
        }
      });

      // Закриття по Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.closeChat();
        }
      });
    }

    toggleChat() {
      this.isOpen ? this.closeChat() : this.openChat();
    }

    openChat() {
      this.isOpen = true;
      this.chatModal.classList.add('open');
      this.hideNotification();
      
      if (!this.isLoaded) {
        // Показуємо скелетон
        this.chatIframe.innerHTML = `
          <div class="gewurz-loading">
            <div class="skeleton-header"></div>
            <div class="skeleton-message-bot"></div>
            <div class="skeleton-message-user"></div>
            <div class="skeleton-message-bot" style="width: 60%;"></div>
            <div class="skeleton-input"></div>
          </div>
        `;
        
        // Завантажуємо чат відразу без затримки
        this.chatIframe.src = CONFIG.chatUrl;
        this.isLoaded = true;
      }
    }

    closeChat() {
      this.isOpen = false;
      this.chatModal.classList.remove('open');
    }

    scheduleNotification() {
      setTimeout(() => {
        if (!this.isOpen) {
          this.showNotification();
        }
      }, CONFIG.showNotificationAfter);
    }

    showNotification() {
      this.notificationDot.classList.add('show');
      this.chatButton.classList.add('gewurz-pulse');
      
      setTimeout(() => {
        this.chatButton.classList.remove('gewurz-pulse');
      }, 3000);
    }

    hideNotification() {
      this.notificationDot.classList.remove('show');
    }
  }

  // Ініціалізація після завантаження DOM
  function initWidget() {
    const widget = new GewurzWidget();

    // Глобальний API
    window.GewurzChat = {
      open: () => widget.openChat(),
      close: () => widget.closeChat(),
      toggle: () => widget.toggleChat(),
      isOpen: () => widget.isOpen,
      config: CONFIG
    };

    // Повідомляємо про готовність
    window.dispatchEvent(new CustomEvent('gewurz-chat-ready'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }

})();

