(() => {
  const opening = document.getElementById('opening');
  const startButton = document.getElementById('start-mission');
  const experience = document.getElementById('experience');
  const soundButton = document.getElementById('sound-toggle');
  const soundLabel = document.getElementById('sound-label');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fanfare = [
    [293.66, 0.42], [349.23, 0.38], [440.00, 0.54], [523.25, 0.72],
    [659.25, 0.4], [587.33, 0.38], [466.16, 0.54], [392.00, 0.72],
    [349.23, 0.4], [440.00, 0.38], [523.25, 0.54], [783.99, 0.8],
    [698.46, 0.42], [587.33, 0.4], [523.25, 0.52], [440.00, 0.86],
  ];
  let audioContext;
  let musicPlaying = false;
  let musicLoop;

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

  function playTone(frequency, startAt, duration, volume, type = 'triangle') {
    const oscillator = audioContext.createOscillator();
    const envelope = audioContext.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startAt);
    envelope.gain.setValueAtTime(0.0001, startAt);
    envelope.gain.exponentialRampToValueAtTime(volume, startAt + 0.035);
    envelope.gain.setValueAtTime(volume, startAt + duration * 0.68);
    envelope.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
    oscillator.connect(envelope);
    envelope.connect(audioContext.destination);
    oscillator.start(startAt);
    oscillator.stop(startAt + duration + 0.02);
  }

  function playFanfare() {
    if (!musicPlaying || !audioContext) return;
    const phraseStart = audioContext.currentTime + 0.06;
    let offset = 0;
    fanfare.forEach(([frequency, duration], index) => {
      const noteStart = phraseStart + offset;
      playTone(frequency, noteStart, duration, 0.075);
      if (index % 4 === 0) playTone(frequency / 2, noteStart, duration, 0.022, 'sine');
      offset += duration;
    });
    musicLoop = window.setTimeout(playFanfare, (offset + 0.8) * 1000);
  }

  soundButton.addEventListener('click', async () => {
    if (musicPlaying) {
      musicPlaying = false;
      window.clearTimeout(musicLoop);
      await audioContext.suspend();
      soundLabel.textContent = 'Música apagada';
      soundButton.setAttribute('aria-label', 'Activar música');
      soundButton.setAttribute('aria-pressed', 'false');
      return;
    }

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) throw new Error('Web Audio no disponible');
      audioContext ||= new AudioContext();
      await audioContext.resume();
      musicPlaying = true;
      soundLabel.textContent = 'Música activada';
      soundButton.setAttribute('aria-label', 'Silenciar música');
      soundButton.setAttribute('aria-pressed', 'true');
      playFanfare();
    } catch {
      soundLabel.textContent = 'Música no disponible';
      soundButton.setAttribute('aria-label', 'Música no disponible');
      soundButton.disabled = true;
    }
  });
})();
