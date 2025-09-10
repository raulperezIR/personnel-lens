// Simple jQuery-like functionality
function $(selector) {
    if (typeof selector === 'string') {
        return document.querySelector(selector);
    } else if (typeof selector === 'function') {
        // Document ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', selector);
        } else {
            selector();
        }
    }
    return selector;
}

// Add event listener helper
Element.prototype.on = function(event, handler) {
    this.addEventListener(event, handler);
    return this;
};

// Add text helper
Element.prototype.text = function(value) {
    if (value !== undefined) {
        this.textContent = value;
        return this;
    }
    return this.textContent;
};

// Add val helper
Element.prototype.val = function(value) {
    if (value !== undefined) {
        this.value = value;
        return this;
    }
    return this.value;
};

// Add fadeIn/fadeOut helpers
Element.prototype.fadeIn = function(duration = 300) {
    this.style.display = 'block';
    this.style.opacity = '0';
    this.style.transition = `opacity ${duration}ms`;
    setTimeout(() => {
        this.style.opacity = '1';
    }, 10);
    return this;
};

Element.prototype.fadeOut = function(duration = 300) {
    this.style.transition = `opacity ${duration}ms`;
    this.style.opacity = '0';
    setTimeout(() => {
        this.style.display = 'none';
    }, duration);
    return this;
};

// Add class helpers
Element.prototype.addClass = function(className) {
    this.classList.add(className);
    return this;
};

Element.prototype.removeClass = function(className) {
    this.classList.remove(className);
    return this;
};

Element.prototype.toggleClass = function(className) {
    this.classList.toggle(className);
    return this;
};

Element.prototype.hasClass = function(className) {
    return this.classList.contains(className);
};

// Add hide/show helpers
Element.prototype.hide = function() {
    this.style.display = 'none';
    return this;
};

Element.prototype.show = function() {
    this.style.display = 'block';
    return this;
};

Element.prototype.toggle = function() {
    if (this.style.display === 'none') {
        this.show();
    } else {
        this.hide();
    }
    return this;
};

// Simple icon replacement
function createIcon(iconName) {
    const iconMap = {
        'check-circle': '✓',
        'menu': '☰',
        'search': '🔍',
        'filter': '⚙',
        'plus': '+',
        'edit': '✎',
        'trash-2': '🗑',
        'arrow-up-down': '↕',
        'arrow-up': '↑',
        'arrow-down': '↓',
        'chevron-left': '←',
        'chevron-right': '→',
        'map-pin': '📍',
        'phone': '📞',
        'mail': '✉',
        'user': '👤',
        'users': '👥',
        'layout-dashboard': '📊',
        'clock': '⏰',
        'file-text': '📄',
        'settings': '⚙',
        'log-out': '↪',
        'bell': '🔔',
        'user-check': '✓',
        'bar-chart-3': '📈'
    };
    
    return iconMap[iconName] || '●';
}

// Replace lucide icons
function replaceIcons() {
    const icons = document.querySelectorAll('[data-lucide]');
    icons.forEach(icon => {
        const iconName = icon.getAttribute('data-lucide');
        icon.textContent = createIcon(iconName);
        icon.style.fontFamily = 'monospace';
        icon.style.display = 'inline-block';
        icon.style.textAlign = 'center';
    });
}

// Initialize icons when DOM is ready
$(function() {
    replaceIcons();
});