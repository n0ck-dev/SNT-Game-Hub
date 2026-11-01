const slides = document.querySelectorAll('.hero-slider .slide');
let currentSlide = 0;

function nextSlide() {
  if (slides.length === 0) return;
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}

setInterval(nextSlide, 5000);
  <!-- Script JS -->
  const toggle = document.getElementById('toggle');
  const themeText = document.getElementById('theme-text');

  // 1. On vérifie s'il y a déjà un thème enregistré dans le navigateur
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // 2. Application du thème au chargement
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.body.classList.add('dark-theme');
    toggle.checked = true;
    if (themeText) themeText.textContent = 'DARK';
  } else {
    document.body.classList.remove('dark-theme');
    toggle.checked = false;
    if (themeText) themeText.textContent = 'LIGHT';
  }

  // 3. Sauvegarde quand l'utilisateur clique sur le switch
  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark'); // On enregistre "dark"
      if (themeText) themeText.textContent = 'DARK';
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light'); // On enregistre "light"
      if (themeText) themeText.textContent = 'LIGHT';
    }
  });

// API rawg.io
const apiKey = '28b4d5a84d394a729272f6d1c9e24f7d'; // Ta clé RAWG
const url = `https://api.rawg.io/api/games?key=${apiKey}&page_size=5&ordering=-added`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const listElement = document.getElementById('top-games-list');
    listElement.innerHTML = '';

    data.results.forEach((game, index) => {
      // Encode le nom du jeu pour l'intégrer proprement dans l'URL de recherche Reddit
// On ajoute "game" à la fin du nom du jeu pour cibler les discussions de jeux vidéo
	  const searchQuery = encodeURIComponent(game.name + " game");
	  const redditUrl = `https://www.reddit.com/search/?q=${searchQuery}`;

      const li = document.createElement('li');
      li.innerHTML = `
        <span class="rank">#${index + 1}</span>
        <a href="${redditUrl}" target="_blank" rel="noopener noreferrer" class="game-link">
          ${game.name}
        </a>
        <span class="rating">★ ${game.rating}</span>
      `;
      listElement.appendChild(li);
    });
  })
  .catch(error => {
    console.error('Erreur API RAWG :', error);
    document.getElementById('top-games-list').innerHTML = '<li>Impossible de charger le top.</li>';
  });
  
  // --- CONNEXION ---
  
const googleBtn = document.getElementById("google-login-btn");

if (googleBtn) {
  googleBtn.addEventListener("click", () => {
    alert("Connexion réussie avec Google !");
    window.location.href = "../index.html"; // Redirige vers la page d'accueil
  });
}
const tabLogin = document.getElementById("tab-login");
const tabRegister = document.getElementById("tab-register");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

if (tabLogin && tabRegister) {
  tabLogin.addEventListener("click", () => {
    tabLogin.classList.add("active");
    tabRegister.classList.remove("active");
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  });

  tabRegister.addEventListener("click", () => {
    tabRegister.classList.add("active");
    tabLogin.classList.remove("active");
    registerForm.style.display = "block";
    loginForm.style.display = "none";
  });
}

  // --- slider actualitees --- //
const slider = document.getElementById('newsSlider');

if (slider) {
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // Ajuste la vitesse du glisser
    slider.scrollLeft = scrollLeft - walk;
  });
}