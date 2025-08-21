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

  // CSS стилі з повною ізоляцією через батьківський клас
  const CSS = `
    /* Сброс стилів для віджета */
    .gewurz-widget-container * {
      box-sizing: border-box !important;
      margin: 0 !important;
      padding: 0 !important;
      border: none !important;
      outline: none !important;
      background: none !important;
      font-family: inherit !important;
      font-size: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
      color: inherit !important;
      text-decoration: none !important;
      list-style: none !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      transform: none !important;
      transition: none !important;
      animation: none !important;
      opacity: 1 !important;
      visibility: visible !important;
      display: block !important;
      position: static !important;
      top: auto !important;
      left: auto !important;
      right: auto !important;
      bottom: auto !important;
      width: auto !important;
      height: auto !important;
      min-width: 0 !important;
      min-height: 0 !important;
      max-width: none !important;
      max-height: none !important;
      overflow: visible !important;
      z-index: auto !important;
    }

    .gewurz-widget-container {
      position: fixed !important;
      bottom: 20px !important;
      right: 20px !important;
      z-index: 2147483647 !important;
      font-family: 'Lato', -apple-system, BlinkMacSystemFont, sans-serif !important;
      font-size: 14px !important;
      line-height: 1.4 !important;
      color: #333 !important;
      direction: ltr !important;
      text-align: left !important;
      width: auto !important;
      height: auto !important;
      margin: 0 !important;
      padding: 0 !important;
      border: none !important;
      background: none !important;
      display: block !important;
      float: none !important;
      clear: none !important;
      overflow: visible !important;
      transform: none !important;
      top: auto !important;
      left: auto !important;
    }

    .gewurz-widget-container .gewurz-chat-button {
      position: static !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 41px !important;
      height: 41px !important;
      border-radius: 50% !important;
      background: transparent !important;
      border: none !important;
      cursor: pointer !important;
      box-shadow: none !important;
      transition: all 0.3s ease !important;
      overflow: hidden !important;
      padding: 0 !important;
      margin: 0 !important;
      top: auto !important;
      left: auto !important;
      right: auto !important;
      bottom: auto !important;
      transform: none !important;
      float: none !important;
      clear: none !important;
      vertical-align: baseline !important;
      z-index: 2147483647 !important;
    }

    .gewurz-widget-container .gewurz-chat-button:hover {
      transform: scale(1.05) !important;
    }

    .gewurz-widget-container .gewurz-chat-button img {
      width: 41px !important;
      height: 41px !important;
      border-radius: 50% !important;
      object-fit: cover !important;
      background: transparent !important;
      display: block !important;
      border: none !important;
      outline: none !important;
    }

    .gewurz-widget-container .gewurz-notification-dot {
      position: absolute !important;
      top: -2px !important;
      right: -2px !important;
      width: 16px !important;
      height: 16px !important;
      background: #ff4757 !important;
      border-radius: 50% !important;
      transform: scale(0) !important;
      transition: transform 0.3s ease !important;
      display: block !important;
    }

    .gewurz-widget-container .gewurz-notification-dot.show {
      transform: scale(1) !important;
    }

    .gewurz-widget-container .gewurz-chat-modal {
      position: fixed !important;
      bottom: 100px !important;
      right: 20px !important;
      width: 400px !important;
      height: 522px !important;
      background: transparent !important;
      border: 1.76px solid #336C4D !important;
      border-radius: 16px !important;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2) !important;
      transform: scale(0.8) translateY(20px) !important;
      opacity: 0 !important;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
      overflow: hidden !important;
      display: block !important;
      z-index: 2147483646 !important;
    }

    .gewurz-widget-container .gewurz-chat-modal.open {
      transform: scale(1) translateY(0) !important;
      opacity: 1 !important;
    }

    .gewurz-widget-container .gewurz-chat-header {
      position: absolute !important;
      top: 10px !important;
      right: 10px !important;
      background: transparent !important;
      color: #FFFFFF !important;
      padding: 0 !important;
      display: flex !important;
      justify-content: flex-end !important;
      align-items: flex-start !important;
      height: 40px !important;
      z-index: 10 !important;
      margin: 0 !important;
      border: none !important;
    }

    .gewurz-widget-container .gewurz-chat-header h3 {
      display: none !important;
    }

    .gewurz-widget-container .gewurz-close-button {
      position: static !important;
      background: none !important;
      border: none !important;
      color: #FFFFFF !important;
      font-size: 20px !important;
      cursor: pointer !important;
      padding: 0 !important;
      border-radius: 0 !important;
      width: 34px !important;
      height: 29px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      transition: opacity 0.2s !important;
      font-weight: normal !important;
      margin: 0 !important;
      outline: none !important;
      font-family: inherit !important;
    }

    .gewurz-widget-container .gewurz-close-button:hover {
      opacity: 0.8 !important;
    }

    .gewurz-widget-container .gewurz-chat-iframe {
      position: static !important;
      width: 100% !important;
      height: 522px !important;
      border: none !important;
      background: transparent !important;
      display: block !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    .gewurz-widget-container .gewurz-spinner-overlay {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      background: rgba(0, 56, 54, 0.8) !important;
      backdrop-filter: blur(8px) !important;
      -webkit-backdrop-filter: blur(8px) !important;
      border-radius: 16px !important;
      z-index: 5 !important;
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      height: 100% !important;
    }

    .gewurz-widget-container .gewurz-spinner {
      width: 40px !important;
      height: 40px !important;
      border: 3px solid rgba(219, 197, 157, 0.3) !important;
      border-top: 3px solid #DBC59D !important;
      border-radius: 50% !important;
      animation: gewurz-spin 1s linear infinite !important;
      display: block !important;
      margin: 0 !important;
      padding: 0 !important;
      background: transparent !important;
    }

    @keyframes gewurz-spin {
      0% { transform: rotate(0deg) !important; }
      100% { transform: rotate(360deg) !important; }
    }

    @keyframes gewurz-pulse {
      0%, 100% { transform: scale(1) !important; }
      50% { transform: scale(1.05) !important; }
    }

    .gewurz-widget-container .gewurz-pulse {
      animation: gewurz-pulse 1s ease-in-out 3 !important;
    }

    /* Мобільна версія з врахуванням safe area */
    @media screen and (max-width: 768px) {
      .gewurz-widget-container {
        bottom: 16px !important;
        right: 16px !important;
      }

      .gewurz-widget-container .gewurz-chat-button {
        width: 72px !important;
        height: 72px !important;
        z-index: 2147483647 !important;
      }

      .gewurz-widget-container .gewurz-chat-button img {
        width: 72px !important;
        height: 72px !important;
      }

      .gewurz-widget-container .gewurz-close-button {
        width: 34px !important;
        height: 29px !important;
        font-size: 20px !important;
      }

      .gewurz-widget-container .gewurz-chat-modal {
        position: fixed !important;
        top: 20px !important;
        left: 10px !important;
        right: 10px !important;
        bottom: 100px !important;
        width: calc(100vw - 20px) !important;
        height: calc(100vh - 120px) !important;
        height: calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 120px) !important;
        max-width: calc(100vw - 20px) !important;
        max-height: calc(100vh - 120px) !important;
        max-height: calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 120px) !important;
        border-radius: 16px !important;
        transform: translateY(100vh) !important;
        border: 1px solid #336C4D !important;
        margin: 0 !important;
        padding: 0 !important;
        padding-top: env(safe-area-inset-top) !important;
        padding-bottom: env(safe-area-inset-bottom) !important;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3) !important;
        z-index: 2147483646 !important;
        background: transparent !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
      }

      .gewurz-widget-container .gewurz-chat-modal.open {
        transform: translateY(0) !important;
        opacity: 1 !important;
      }

      .gewurz-widget-container .gewurz-chat-iframe {
        width: 100% !important;
        height: 100% !important;
        max-width: 100% !important;
        max-height: 100% !important;
        border: none !important;
        border-radius: 16px !important;
        margin: 0 !important;
        padding: 0 !important;
        position: static !important;
        top: auto !important;
        left: auto !important;
        box-shadow: none !important;
      }

      .gewurz-widget-container .gewurz-chat-header {
        position: absolute !important;
        top: calc(env(safe-area-inset-top) + 10px) !important;
        right: 10px !important;
        z-index: 2147483648 !important;
        background: rgba(0, 0, 0, 0.3) !important;
        border-radius: 50% !important;
        width: 34px !important;
        height: 34px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }

      .gewurz-widget-container .gewurz-spinner-overlay {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        width: 100% !important;
        height: 100% !important;
        border-radius: 16px !important;
        background: rgba(0, 56, 54, 0.9) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        backdrop-filter: blur(8px) !important;
        -webkit-backdrop-filter: blur(8px) !important;
        z-index: 10 !important;
        margin: 0 !important;
        padding: 0 !important;
      }
    }

    /* Додаткові мобільні стилі для дуже маленьких екранів */
    @media screen and (max-width: 480px) {
      .gewurz-widget-container .gewurz-chat-iframe {
        width: calc(100vw - 16px) !important;
        height: calc(100vh - 32px) !important;
        height: calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 32px) !important;
        margin: 8px !important;
        top: calc(env(safe-area-inset-top) + 8px) !important;
        left: 8px !important;
        border-radius: 16px !important;
      }

      .gewurz-widget-container .gewurz-spinner-overlay {
        top: calc(env(safe-area-inset-top) + 8px) !important;
        left: 8px !important;
        width: calc(100vw - 16px) !important;
        height: calc(100vh - 32px) !important;
        height: calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 32px) !important;
        border-radius: 16px !important;
      }
    }

    /* Стилі для старих браузерів що не підтримують dvh */
    @supports not (height: 100dvh) {
      @media screen and (max-width: 768px) {
        .gewurz-widget-container .gewurz-chat-modal {
          height: 100vh !important;
          max-height: 100vh !important;
        }
        
        .gewurz-widget-container .gewurz-chat-iframe {
          height: calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 40px) !important;
          max-height: calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 40px) !important;
        }
        
        .gewurz-widget-container .gewurz-spinner-overlay {
          height: calc(100vh - 40px) !important;
        }
      }
    }
  `;

  // Додаємо стилі в head з timestamp для уникнення кешування
  const styleEl = document.createElement('style');
  styleEl.id = 'gewurz-widget-styles-' + Date.now();
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  // Завантажуємо шрифти якщо їх немає
  if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700&family=Lato:wght@300;400;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
  }

  // Перевіряємо і додаємо правильний viewport meta для мобільних
  let viewportMeta = document.querySelector('meta[name="viewport"]');
  if (viewportMeta) {
    const currentContent = viewportMeta.getAttribute('content');
    if (!currentContent.includes('viewport-fit=cover')) {
      viewportMeta.setAttribute('content', currentContent + ', viewport-fit=cover');
    }
  } else {
    viewportMeta = document.createElement('meta');
    viewportMeta.name = 'viewport';
    viewportMeta.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
    document.head.appendChild(viewportMeta);
  }

  // HTML віджета з батьківським контейнером
  const widgetHTML = `
    <div class="gewurz-widget-container">
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
      this.maxContentCheckAttempts = 20;
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
      
      // Слухаємо повідомлення від чату
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
      
      // Динамічно застосовуємо мобільні стилі через JavaScript
      if (window.innerWidth <= 768) {
        this.applyMobileStyles();
      }
      
      if (!this.isLoaded) {
        this.showSpinner();
        this.chatIframe.src = CONFIG.chatUrl;
        
        this.chatIframe.onload = () => {
          this.checkForContent();
        };
        
        this.isLoaded = true;
      }
    }

    applyMobileStyles() {
      const modal = this.chatModal;
      
      // Застосовуємо стилі прямо через JavaScript
      modal.style.cssText = `
        position: fixed !important;
        top: 20px !important;
        left: 10px !important;
        right: 10px !important;
        bottom: 100px !important;
        width: calc(100vw - 20px) !important;
        height: calc(100vh - 120px) !important;
        max-width: calc(100vw - 20px) !important;
        max-height: calc(100vh - 120px) !important;
        border-radius: 16px !important;
        border: 1px solid #336C4D !important;
        transform: translateY(0) !important;
        opacity: 1 !important;
        transition: all 0.3s ease !important;
        overflow: hidden !important;
        display: block !important;
        z-index: 2147483646 !important;
        background: transparent !important;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3) !important;
        margin: 0 !important;
        padding: 0 !important;
      `;
      
      // Стилі для iframe
      const iframe = this.chatIframe;
      iframe.style.cssText = `
        width: 100% !important;
        height: 100% !important;
        border: none !important;
        border-radius: 16px !important;
        margin: 0 !important;
        padding: 0 !important;
        position: static !important;
        display: block !important;
      `;
      
      console.log('Mobile styles applied');
    }

    closeChat() {
      this.isOpen = false;
      this.chatModal.classList.remove('open');
      
      // Скидаємо inline стилі
      if (window.innerWidth <= 768) {
        this.chatModal.style.cssText = '';
        this.chatIframe.style.cssText = '';
      }
    }

    showSpinner() {
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
        const iframeDoc = this.chatIframe.contentDocument || this.chatIframe.contentWindow.document;
        const messages = iframeDoc.querySelector('.message-container');
        const chatHistory = iframeDoc.querySelector('#chat-history');
        
        if (messages || (chatHistory && chatHistory.children.length > 0)) {
          console.log('Chat content found, hiding spinner');
          this.hideSpinner();
          return;
        }
        
        if (this.contentCheckAttempts >= this.maxContentCheckAttempts) {
          console.log('Max attempts reached, hiding spinner anyway');
          this.hideSpinner();
          return;
        }
        
        setTimeout(() => {
          this.checkForContent();
        }, 500);
        
      } catch (error) {
        console.log('Cannot access iframe content, attempt', this.contentCheckAttempts);
        
        if (this.contentCheckAttempts >= this.maxContentCheckAttempts) {
          this.hideSpinner();
          return;
        }
        
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
