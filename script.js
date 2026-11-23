(() => {
  const opening = document.getElementById('opening');
  const startButton = document.getElementById('start-mission');
  const experience = document.getElementById('experience');
  const soundButton = document.getElementById('sound-toggle');
  const soundLabel = document.getElementById('sound-label');
  const themeMusic = document.getElementById('theme-music');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let musicPlaying = false;

  function updateMusicButton(state) {
    const labels = {
      playing: ['Música activada', 'Silenciar música', 'true'],
      paused: ['Música apagada', 'Reproducir música', 'false'],
      blocked: ['Toca para activar', 'Reproducir música', 'false'],
      unavailable: ['Música no disponible', 'Reintentar música', 'false'],
    };
    const [label, ariaLabel, pressed] = labels[state];
    soundLabel.textContent = label;
    soundButton.setAttribute('aria-label', ariaLabel);
    soundButton.setAttribute('aria-pressed', pressed);
  }

  async function startMusic() {
    try {
      await themeMusic.play();
      musicPlaying = true;
      updateMusicButton('playing');
      return true;
    } catch (error) {
      musicPlaying = false;
      updateMusicButton(error.name === 'NotAllowedError' ? 'blocked' : 'unavailable');
      return false;
    }
  }

  function stopMusic() {
    themeMusic.pause();
    musicPlaying = false;
    updateMusicButton('paused');
  }

  themeMusic.addEventListener('error', () => {
    musicPlaying = false;
    updateMusicButton('unavailable');
  });

  const showSections = () => {
    experience.inert = false;
    experience.removeAttribute('aria-hidden');
    experience.classList.add('is-active');
    opening.hidden = true;
    document.getElementById('inicio').setAttribute('tabindex', '-1');
    document.getElementById('inicio').focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' });
    initializeReveals();
  };

  startButton.addEventListener('click', () => {
    if (!musicPlaying) void startMusic();
    startButton.disabled = true;
    opening.classList.add('is-leaving');
    window.setTimeout(showSections, reducedMotion ? 0 : 520);
  });

  function initializeReveals() {
    const items = document.querySelectorAll('.reveal');
    if (reducedMotion || !('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          instance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -35px 0px' });
    items.forEach((item) => observer.observe(item));
  }

  soundButton.addEventListener('click', () => {
    if (musicPlaying) {
      stopMusic();
      return;
    }
    void startMusic();
  });

  void startMusic();
})();
