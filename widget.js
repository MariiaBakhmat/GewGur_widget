
(function() {
  'use strict';
  
  
  if (window.GewurzChatLoaded) return;
  window.GewurzChatLoaded = true;

 
  const CONFIG = {
    // URL вашого чату
    chatUrl: 'https://mariiabakhmat.github.io/GewGur_widget/chat.html',
    
    
    iconUrl: 'https://github.com/MariiaBakhmat/GewGur_widget/raw/main/Group%20112.webp',
  
    showNotificationAfter: 0, // показати червону крапку через 0 сек (вимкнено)
    position: 'bottom-right'      // позиція віджета
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

    .gewurz-spinner-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 56, 54, 0.8);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border-radius: 16px;
      z-index: 5;
    }

    .gewurz-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(219, 197, 157, 0.3);
      border-top: 3px solid #DBC59D;
      border-radius: 50%;
      animation: gewurz-spin 1s linear infinite;
    }

    @keyframes gewurz-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
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

      .gewurz-spinner-overlay {
        border-radius: 0;
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
      this.contentCheckAttempts = 0;
      this.maxContentCheckAttempts = 20; // 10 секунд максимум
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
      
      // Слухаємо повідомлення від чату (запасний варіант)
      window.addEventListener('message', (event) => {
        if (event.data.type === 'chat-loaded') {
          this.hideSpinner();
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
        // Показуємо спіннер поза iframe
        this.showSpinner();
        
        // Завантажуємо чат
        this.chatIframe.src = CONFIG.chatUrl;
        
        // Додаємо обробник onload для iframe
        this.chatIframe.onload = () => {
          // Починаємо перевіряти контент після завантаження iframe
          this.checkForContent();
        };
        
        this.isLoaded = true;
      }
    }

    closeChat() {
      this.isOpen = false;
      this.chatModal.classList.remove('open');
    }

    showSpinner() {
      // Створюємо спіннер overlay
      const spinnerOverlay = document.createElement('div');
      spinnerOverlay.className = 'gewurz-spinner-overlay';
      spinnerOverlay.id = 'gewurz-spinner-overlay';
      
      const spinner = document.createElement('div');
      spinner.className = 'gewurz-spinner';
      
      spinnerOverlay.appendChild(spinner);
      this.chatModal.appendChild(spinnerOverlay);
    }

    hideSpinner() {
      const spinnerOverlay = document.getElementById('gewurz-spinner-overlay');
      if (spinnerOverlay) {
        spinnerOverlay.remove();
      }
    }

    checkForContent() {
      this.contentCheckAttempts++;
      
      try {
        // Спробуємо доступитися до контенту iframe
        const iframeDoc = this.chatIframe.contentDocument || this.chatIframe.contentWindow.document;
        
        // Шукаємо повідомлення в чаті
        const messages = iframeDoc.querySelector('.message-container');
        const chatHistory = iframeDoc.querySelector('#chat-history');
        
        // Якщо знайшли повідомлення або контент у чаті
        if (messages || (chatHistory && chatHistory.children.length > 0)) {
          console.log('Chat content found, hiding spinner');
          this.hideSpinner();
          return;
        }
        
        // Якщо досягли максимальної кількості спроб
        if (this.contentCheckAttempts >= this.maxContentCheckAttempts) {
          console.log('Max attempts reached, hiding spinner anyway');
          this.hideSpinner();
          return;
        }
        
        // Повторюємо перевірку через 500мс
        setTimeout(() => {
          this.checkForContent();
        }, 500);
        
      } catch (error) {
        // Якщо не можемо доступитися до iframe (CORS, тощо)
        console.log('Cannot access iframe content, attempt', this.contentCheckAttempts);
        
        if (this.contentCheckAttempts >= this.maxContentCheckAttempts) {
          this.hideSpinner();
          return;
        }
        
        // Повторюємо перевірку
        setTimeout(() => {
          this.checkForContent();
        }, 500);
      }
    }

    scheduleNotification() {
      if (CONFIG.showNotificationAfter > 0) {
        setTimeout(() => {
          if (!this.isOpen) {
            this.showNotification();
          }
        }, CONFIG.showNotificationAfter);
      }
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
