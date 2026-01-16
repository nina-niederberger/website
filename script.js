// Language translations
let translations = {};

// Load translations
fetch('translations.json')
  .then(response => response.json())
  .then(data => {
    translations = data;
    // Load saved language or default to German
    const savedLang = localStorage.getItem('preferredLanguage') || 'de';
    setLanguage(savedLang);
  });

// Set language
function setLanguage(lang) {
  if (!translations[lang]) return;
  
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
  
  // Update all elements with data-i18n-alt attribute (for image alt texts)
  document.querySelectorAll('[data-i18n-alt]').forEach(element => {
    const key = element.getAttribute('data-i18n-alt');
    if (translations[lang][key]) {
      element.setAttribute('alt', translations[lang][key]);
    }
  });
  
  // Update active button in language menu
  document.querySelectorAll('.language-menu button').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
  
  // Save to localStorage
  localStorage.setItem('preferredLanguage', lang);
  
  // Close menu
  const menu = document.getElementById('language-menu');
  if (menu) {
    menu.classList.remove('active');
  }
}

// Language switcher event
document.addEventListener('DOMContentLoaded', function() {
  const languageSwitcher = document.getElementById('language-switcher');
  const languageMenu = document.getElementById('language-menu');
  
  if (languageSwitcher && languageMenu) {
    // Toggle menu on globe click
    languageSwitcher.addEventListener('click', function(e) {
      e.stopPropagation();
      languageMenu.classList.toggle('active');
    });
    
    // Handle language selection
    languageMenu.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', function(e) {
        e.stopPropagation();
        const lang = this.getAttribute('data-lang');
        setLanguage(lang);
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!languageSwitcher.contains(e.target) && !languageMenu.contains(e.target)) {
        languageMenu.classList.remove('active');
      }
    });
  }
});

const swiper = new Swiper(".swiper", {
  // Optional parameters
  loop: true,

  // Pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: false,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-naechste",
    prevEl: ".swiper-button-vorherige",
  },

  // Enable mousewheel control
  mousewheel: {
    invert: false,
    sensitivity: 1,
    releaseOnEdges: true,
  },

});

// Create tooltip element
const tooltip = document.createElement('div');
tooltip.className = 'image-tooltip';
document.body.appendChild(tooltip);

// Get all swiper slide images
const slideImages = document.querySelectorAll('.swiper-slide img');

slideImages.forEach(img => {
  img.addEventListener('mouseenter', function(e) {
    const altText = this.getAttribute('alt');
    if (altText) {
      tooltip.textContent = altText;
      tooltip.style.display = 'block';
    }
  });

  img.addEventListener('mousemove', function(e) {
    tooltip.style.left = e.pageX + 15 + 'px';
    tooltip.style.top = e.pageY + 15 + 'px';
  });

  img.addEventListener('mouseleave', function() {
    tooltip.style.display = 'none';
  });
});


