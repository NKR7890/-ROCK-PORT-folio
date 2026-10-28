/**
 * ============================================================================
 * NAKSHATRA ATISH MESHRAM — A DARK CINEMATIC DIGITAL IDENTITY
 * Core Interactive Controller: Audio, Canvas Particles, Lightbox & Configurator
 * ============================================================================
 */

(function () {
  'use strict';

  // 1. DOM READY INITIALIZATION
  document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initHeroCanvas();
    initRotatingHeroText();
    initNavigation();
    initAudioManager();
    initArtLightbox();
    initGameDossiers();
    initGarageConfigurator();
    initF1Telemetry();
    initFilters();
    initContactForm();
    initHUDControls();
  });

  // ==========================================================================
  // 1.5 Rotating Hero Identity & Taglines
  // ==========================================================================
  function initRotatingHeroText() {
    const words = document.querySelectorAll('.identity-statement .highlight-word');
    const taglineEl = document.querySelector('.hero-tagline');
    
    // Pulse words in sequence
    let currentWordIdx = 0;
    if (words.length > 0) {
      setInterval(() => {
        words.forEach((w) => {
          w.style.color = 'var(--text-white)';
          w.style.textShadow = 'none';
        });
        const activeWord = words[currentWordIdx];
        if (activeWord) {
          activeWord.style.color = 'var(--crimson-bright)';
          activeWord.style.textShadow = '0 0 15px var(--crimson-glow)';
        }
        currentWordIdx = (currentWordIdx + 1) % words.length;
      }, 1200);
    }

    // Rotate taglines
    const taglines = [
      '"Creating sounds, sketching worlds, and building experiences."',
      '"MUSIC IN MY VEINS. HORSEPOWER IN MY HEAD. WORLDS IN MY MIND."',
      '"BETWEEN SIX STRINGS, FOUR WHEELS, AND INFINITE WORLDS."',
      '"I PLAY STRINGS, DRAW WORLDS, BUILD GAMES, AND CHASE SPEED."',
      '"CREATIVE BY NATURE. OBSESSED WITH MACHINES. LOST IN OTHER WORLDS."'
    ];

    let taglineIdx = 0;
    if (taglineEl) {
      setInterval(() => {
        taglineEl.style.opacity = '0';
        taglineEl.style.transform = 'translateY(8px)';
        taglineEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

        setTimeout(() => {
          taglineIdx = (taglineIdx + 1) % taglines.length;
          taglineEl.textContent = taglines[taglineIdx];
          taglineEl.style.opacity = '1';
          taglineEl.style.transform = 'translateY(0)';
        }, 400);
      }, 4500);
    }
  }

  // ==========================================================================
  // 2. Custom Gritty Cursor
  // ==========================================================================
  function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const dot = document.querySelector('.custom-cursor-dot');
    if (!cursor || !dot || window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    function renderCursor() {
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Hover scale on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .art-item-card, .game-dossier-card, .car-build-card, .color-swatch');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // ==========================================================================
  // 3. Hero Canvas: Ash Embers, Fog & Rain Atmosphere
  // ==========================================================================
  function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(width > 768 ? 65 : 30, 80);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.6,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.8 - 0.2, // Drifting upwards like ember ash
        opacity: Math.random() * 0.6 + 0.2,
        color: Math.random() > 0.3 ? '#ff2a4b' : '#00f0ff',
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.y < 0) {
          p.y = height + 5;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.globalAlpha = 1.0;
      requestAnimationFrame(animateParticles);
    }
    requestAnimationFrame(animateParticles);
  }

  // ==========================================================================
  // 4. Navigation & Scrollspy
  // ==========================================================================
  function initNavigation() {
    const header = document.querySelector('.site-header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Header scroll background toggle
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }

      // ScrollSpy
      let currentSectionId = '';
      sections.forEach((section) => {
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;
        if (window.scrollY >= top && window.scrollY < top + height) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    });

    // Mobile Drawer Toggle
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
      });

      navLinks.forEach((link) => {
        link.addEventListener('click', () => {
          mobileToggle.classList.remove('open');
          navMenu.classList.remove('open');
        });
      });
    }
  }

  // ==========================================================================
  // 5. Audio Manager — "Midnight City" & Real-Time Visualizer
  // ==========================================================================
  function initAudioManager() {
    const audioEl = document.getElementById('bg-audio');
    const hudButtons = document.querySelectorAll('.audio-hud-btn, .btn-play-soundtrack');
    const floatingBar = document.querySelector('.floating-soundtrack-bar');
    const floatingDisc = document.querySelector('.soundtrack-disc');
    const floatingPlayBtn = document.querySelector('#floating-play-btn');
    const timelineSlider = document.querySelector('#audio-timeline');
    const timeDisplay = document.querySelector('#audio-time');
    const visualizerCanvas = document.querySelectorAll('.canvas-visualizer');
    const centerVinyl = document.querySelector('.mc-vinyl-wrap');

    let audioContext = null;
    let analyser = null;
    let audioSource = null;
    let isPlaying = false;
    let animationFrameId = null;

    // Helper to format seconds to mm:ss
    function formatTime(sec) {
      if (isNaN(sec)) return '0:00';
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    function setupWebAudio() {
      if (audioContext) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioCtx();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 64;

        if (audioEl) {
          audioSource = audioContext.createMediaElementSource(audioEl);
          audioSource.connect(analyser);
          analyser.connect(audioContext.destination);
        }
      } catch (e) {
        console.warn('Web Audio setup error:', e);
      }
    }

    function togglePlayback() {
      setupWebAudio();
      if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
      }

      if (!audioEl) return;

      if (isPlaying) {
        audioEl.pause();
        updateUIState(false);
      } else {
        audioEl.play().then(() => {
          updateUIState(true);
        }).catch((err) => {
          console.warn('Audio play prevented:', err);
          // Fallback UI indication
          updateUIState(true);
        });
      }
    }

    function updateUIState(playing) {
      isPlaying = playing;
      hudButtons.forEach((btn) => {
        btn.classList.toggle('playing', playing);
        const textSpan = btn.querySelector('.hud-label');
        if (textSpan) {
          textSpan.textContent = playing ? 'AUDIO: PLAYING' : 'AUDIO: MUTED';
        }
      });

      if (floatingBar) {
        floatingBar.classList.remove('minimized');
      }
      if (floatingDisc) {
        floatingDisc.classList.toggle('spinning', playing);
      }
      if (centerVinyl) {
        centerVinyl.classList.toggle('spinning', playing);
      }
      if (floatingPlayBtn) {
        floatingPlayBtn.textContent = playing ? '❚❚' : '▶';
      }

      if (playing) {
        startVisualizer();
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    }

    // Bind all play triggers
    hudButtons.forEach((btn) => btn.addEventListener('click', togglePlayback));
    if (floatingPlayBtn) floatingPlayBtn.addEventListener('click', togglePlayback);
    if (centerVinyl) centerVinyl.addEventListener('click', togglePlayback);

    // Audio time update
    if (audioEl) {
      audioEl.addEventListener('timeupdate', () => {
        if (!timelineSlider || !timeDisplay) return;
        const current = audioEl.currentTime;
        const duration = audioEl.duration || 36.5;
        timelineSlider.value = (current / duration) * 100;
        timeDisplay.textContent = `${formatTime(current)} / ${formatTime(duration)}`;
      });

      audioEl.addEventListener('ended', () => {
        audioEl.currentTime = 0;
        audioEl.play();
      });
    }

    if (timelineSlider && audioEl) {
      timelineSlider.addEventListener('input', (e) => {
        const pct = e.target.value / 100;
        const duration = audioEl.duration || 36.5;
        audioEl.currentTime = pct * duration;
      });
    }

    // Frequency Visualizer Render Loop
    function startVisualizer() {
      const bufferLength = analyser ? analyser.frequencyBinCount : 32;
      const dataArray = new Uint8Array(bufferLength);

      function draw() {
        animationFrameId = requestAnimationFrame(draw);

        if (analyser) {
          analyser.getByteFrequencyData(dataArray);
        } else {
          // Synthetic frequency pulse if analyser is inactive
          for (let i = 0; i < bufferLength; i++) {
            dataArray[i] = Math.sin(Date.now() * 0.005 + i) * 60 + 80;
          }
        }

        visualizerCanvas.forEach((cvs) => {
          const ctx = cvs.getContext('2d');
          const w = cvs.width;
          const h = cvs.height;
          ctx.clearRect(0, 0, w, h);

          const barCount = 14;
          const barWidth = w / barCount - 1;

          for (let i = 0; i < barCount; i++) {
            const val = dataArray[i * 2] || 0;
            const barHeight = Math.max(2, (val / 255) * h);
            ctx.fillStyle = i % 2 === 0 ? '#ff2a4b' : '#00f0ff';
            ctx.fillRect(i * (barWidth + 1), h - barHeight, barWidth, barHeight);
          }
        });
      }
      draw();
    }
  }

  // ==========================================================================
  // 6. Art Gallery Lightbox
  // ==========================================================================
  function initArtLightbox() {
    const lightboxModal = document.getElementById('art-lightbox-modal');
    if (!lightboxModal) return;

    const modalImg = lightboxModal.querySelector('.lightbox-img');
    const modalTitle = lightboxModal.querySelector('.lightbox-title');
    const modalCategory = lightboxModal.querySelector('.lightbox-category');
    const modalDesc = lightboxModal.querySelector('.lightbox-desc');
    const closeBtn = lightboxModal.querySelector('.modal-close-btn');
    const artCards = document.querySelectorAll('.art-item-card');

    artCards.forEach((card) => {
      card.addEventListener('click', () => {
        const img = card.querySelector('.art-img');
        const title = card.querySelector('.art-overlay-title')?.textContent || 'UNTITLED';
        const category = card.querySelector('.art-overlay-category')?.textContent || 'STUDY';
        const desc = card.getAttribute('data-desc') || card.querySelector('.art-overlay-meta')?.textContent || '';

        if (modalImg && img) modalImg.src = img.src;
        if (modalTitle) modalTitle.textContent = title;
        if (modalCategory) modalCategory.textContent = category;
        if (modalDesc) modalDesc.textContent = desc;

        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // ==========================================================================
  // 7. Gaming Classified Dossiers Modal
  // ==========================================================================
  function initGameDossiers() {
    const gameModal = document.getElementById('game-dossier-modal');
    if (!gameModal) return;

    const modalTitle = gameModal.querySelector('.dossier-modal-title');
    const modalGenre = gameModal.querySelector('.dossier-modal-genre');
    const modalBody = gameModal.querySelector('.dossier-modal-body');
    const closeBtn = gameModal.querySelector('.modal-close-btn');
    const dossierButtons = document.querySelectorAll('.btn-inspect-dossier');

    const dossierData = {
      'nfs-mw': {
        title: 'NEED FOR SPEED: MOST WANTED (2005)',
        genre: 'STREET RACING // ROCKPORT PD // BLACKLIST #1',
        text: `The definitive street racing atmosphere. The aggressive autumn yellow bloom, the whine of the straight-cut gears on the BMW M3 GTR, and the sheer tension of Heat Level 5 pursuits with Cross's Corvette squad. This game taught me how sound design and color grading can turn an arcade racer into a gritty, heart-pounding survival film. Razor took the car; we took the city back.`,
      },
      'vice-city': {
        title: 'GRAND THEFT AUTO: VICE CITY',
        genre: 'NEON NOSTALGIA // SYNTHWAVE // RETRO CRIME',
        text: `1986 Ocean Beach. Driving a Cheetah along the strip under pink and cyan neon lights while Flash FM plays in the background. Vice City is pure mood—a masterclass in building a world around an era's aesthetic, music, and ruthless ambition. Tommy Vercetti's Hawaiian shirt and pastel suits set the benchmark for atmospheric world-building.`,
      },
      'gta4': {
        title: 'GRAND THEFT AUTO IV',
        genre: 'URBAN ISOLATION // GRITTY REALISM // NIKO BELLIC',
        text: `Liberty City felt alive, cold, and indifferent. The heavy physics, grey overcast skies, rain-slicked asphalt of Broker, and Niko's grounded, cynical immigrant journey made GTA IV the most mature, literary game Rockstar ever produced. It proved that video games could capture the melancholy of urban loneliness.`,
      },
      'cyberpunk': {
        title: 'CYBERPUNK 2077',
        genre: 'DYSTOPIAN MEGAPLEX // CYBERNETIC NOIR // NIGHT CITY',
        text: `Night City is the grandest architectural character in gaming history. Towering brutalist megabuildings, rain-drenched neon alleys in Watson, and the brutal collision between flesh and chrome. Beyond the action, it is a deeply existential story about legacy, bodily autonomy, and burning out in glory rather than fading away.`,
      },
      'resident-evil': {
        title: 'RESIDENT EVIL SERIES',
        genre: 'SURVIVAL HORROR // PSYCHOLOGICAL TENSION // BIOHAZARD',
        text: `From the oppressive silence of the Spencer Mansion to the flooded streets of Raccoon City, Resident Evil defined atmospheric dread. It is not just about jump scares; it is the feeling of having four handgun bullets left, hearing footsteps in the dark hallway, and weighing fight against flight. That meticulous pacing informs how I approach dark art and game prototypes.`,
      },
      'gta5': {
        title: 'GRAND THEFT AUTO V',
        genre: 'OPEN-WORLD CHAOS // SUNSET SATIRE // HEIST CINEMA',
        text: `The sheer scale of Los Santos—from the smoggy neon skyline of Vinewood to the desolate sun-bleached expanse of Blaine County. Its multi-protagonist heist structure and cinematic camera transitions captured the feeling of playing through an interactive Michael Mann crime epic.`,
      },
      'wolf-among-us': {
        title: 'THE WOLF AMONG US',
        genre: 'GRAPHIC NOVEL NOIR // FABLETOWN // HARD-BOILED DETECTIVE',
        text: `A neon-noir masterpiece. Billowing cigarette smoke, pouring rain, bruised neon hues, and Bigby Wolf walking the line between protector and monster. Its comic-book halftone shading and gritty detective mystery are a constant reference for my dark drawings and narrative ideas.`,
      },
    };

    dossierButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-game');
        const data = dossierData[key] || {
          title: 'CLASSIFIED ENTRY',
          genre: 'RESTRICTED ARCHIVE',
          text: 'Data unavailable or redacted by operator.',
        };

        if (modalTitle) modalTitle.textContent = data.title;
        if (modalGenre) modalGenre.textContent = data.genre;
        if (modalBody) modalBody.textContent = data.text;

        gameModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeDossier() {
      gameModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeDossier);
    gameModal.addEventListener('click', (e) => {
      if (e.target === gameModal) closeDossier();
    });
  }

  // ==========================================================================
  // 8. Interactive "Build Your Dream Car" Configurator
  // ==========================================================================
  function initGarageConfigurator() {
    const chassisSelect = document.getElementById('cfg-chassis');
    const aeroSelect = document.getElementById('cfg-aero');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const carSvg = document.getElementById('car-render-svg');
    const carBodyColorPath = document.getElementById('car-body-path');
    const carAeroPath = document.getElementById('car-aero-path');
    const specBhp = document.getElementById('cfg-bhp');
    const specZeroSixty = document.getElementById('cfg-060');
    const specWeight = document.getElementById('cfg-weight');
    const revEngineBtn = document.getElementById('btn-rev-engine');

    let currentColor = '#e50914';

    // Color Swatches
    colorSwatches.forEach((swatch) => {
      swatch.addEventListener('click', () => {
        colorSwatches.forEach((s) => s.classList.remove('active'));
        swatch.classList.add('active');
        currentColor = swatch.getAttribute('data-color');
        if (carBodyColorPath) {
          carBodyColorPath.setAttribute('fill', currentColor);
          carBodyColorPath.style.filter = `drop-shadow(0 0 15px ${currentColor}66)`;
        }
      });
    });

    // Chassis specs update
    const chassisSpecs = {
      diablo: { bhp: '492 HP', zero60: '4.1s', weight: '1,575 KG' },
      skyline: { bhp: '620 HP', zero60: '3.4s', weight: '1,490 KG' },
      porsche: { bhp: '450 HP', zero60: '3.7s', weight: '1,380 KG' },
      m3gtr: { bhp: '444 HP', zero60: '3.6s', weight: '1,250 KG' },
    };

    if (chassisSelect) {
      chassisSelect.addEventListener('change', (e) => {
        const spec = chassisSpecs[e.target.value] || chassisSpecs.diablo;
        if (specBhp) specBhp.textContent = spec.bhp;
        if (specZeroSixty) specZeroSixty.textContent = spec.zero60;
        if (specWeight) specWeight.textContent = spec.weight;
      });
    }

    // Aero toggle
    if (aeroSelect && carAeroPath) {
      aeroSelect.addEventListener('change', (e) => {
        if (e.target.value === 'high-wing') {
          carAeroPath.style.display = 'block';
          carAeroPath.setAttribute('d', 'M70 120 H200 L180 140 H90 Z');
        } else if (e.target.value === 'ducktail') {
          carAeroPath.style.display = 'block';
          carAeroPath.setAttribute('d', 'M100 150 H160 L150 160 H110 Z');
        } else {
          carAeroPath.style.display = 'none';
        }
      });
    }

    // Rev Engine Audio FX (Web Audio API Synthesizer)
    if (revEngineBtn) {
      revEngineBtn.addEventListener('click', () => {
        playEngineRevSound();
      });
    }

    function playEngineRevSound() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(250, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.4);
        filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 1.2);

        osc.frequency.setValueAtTime(80, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.4);
        osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 1.2);

        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.3);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 1.3);
      } catch (e) {
        console.warn('Audio rev sound not available');
      }
    }
  }

  // ==========================================================================
  // 9. Formula 1 Telemetry Circuit Switcher
  // ==========================================================================
  function initF1Telemetry() {
    const circuitSelect = document.getElementById('f1-circuit-select');
    const f1LapTime = document.getElementById('f1-lap-time');
    const f1TopSpeed = document.getElementById('f1-top-speed');
    const f1TrackLength = document.getElementById('f1-track-length');
    const f1TrackName = document.getElementById('f1-track-name');

    const circuitData = {
      monza: { name: 'AUTODROMO NAZIONALE MONZA', time: '1:18.887', speed: '354 KM/H', len: '5.793 KM' },
      spa: { name: 'CIRCUIT DE SPA-FRANCORCHAMPS', time: '1:41.252', speed: '335 KM/H', len: '7.004 KM' },
      suzuka: { name: 'SUZUKA INTERNATIONAL RACING COURSE', time: '1:27.064', speed: '320 KM/H', len: '5.807 KM' },
      silverstone: { name: 'SILVERSTONE CIRCUIT', time: '1:24.303', speed: '330 KM/H', len: '5.891 KM' },
      singapore: { name: 'MARINA BAY STREET CIRCUIT', time: '1:35.782', speed: '305 KM/H', len: '4.940 KM' },
    };

    if (circuitSelect) {
      circuitSelect.addEventListener('change', (e) => {
        const c = circuitData[e.target.value] || circuitData.monza;
        if (f1LapTime) f1LapTime.textContent = c.time;
        if (f1TopSpeed) f1TopSpeed.textContent = c.speed;
        if (f1TrackLength) f1TrackLength.textContent = c.len;
        if (f1TrackName) f1TrackName.textContent = c.name;
      });
    }
  }

  // ==========================================================================
  // 10. Filter Bars: Art & Soundtrack Moods
  // ==========================================================================
  function initFilters() {
    // Art Gallery Filters
    const artFilters = document.querySelectorAll('.art-filter-btn');
    const artItems = document.querySelectorAll('.art-item-card');

    artFilters.forEach((btn) => {
      btn.addEventListener('click', () => {
        artFilters.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        artItems.forEach((item) => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });

    // Soundtrack Mood Filters
    const moodChips = document.querySelectorAll('.mood-chip');
    const artistCards = document.querySelectorAll('.artist-card');

    moodChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        moodChips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        const mood = chip.getAttribute('data-mood');

        artistCards.forEach((card) => {
          if (mood === 'all' || card.getAttribute('data-mood') === mood) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ==========================================================================
  // 11. Contact Form Terminal Validation & State
  // ==========================================================================
  function initContactForm() {
    const form = document.getElementById('contact-terminal-form');
    const statusMsg = document.getElementById('contact-status-msg');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('#contact-name')?.value.trim();
      const email = form.querySelector('#contact-email')?.value.trim();
      const message = form.querySelector('#contact-message')?.value.trim();

      if (!name || !email || !message) {
        showStatus('ERROR: ALL FIELDS REQUIRED FOR TRANSMISSION.', true);
        return;
      }

      showStatus('ENCRYPTING & TRANSMITTING PACKET...', false);

      setTimeout(() => {
        showStatus('TRANSMISSION SUCCESSFUL. NAKSHATRA WILL RESPOND PROMPTLY.', false);
        form.reset();
      }, 1200);
    });

    function showStatus(text, isError) {
      if (!statusMsg) return;
      statusMsg.textContent = text;
      statusMsg.style.display = 'block';
      statusMsg.style.color = isError ? '#ff2a4b' : '#00f0ff';
      statusMsg.style.borderColor = isError ? '#ff2a4b' : '#00f0ff';
    }
  }

  // ==========================================================================
  // 12. HUD Settings Controls (Scanlines & Glitch toggles)
  // ==========================================================================
  function initHUDControls() {
    const toggleScanlinesBtn = document.getElementById('btn-toggle-scanlines');
    const scanlines = document.querySelector('.crt-scanlines');

    if (toggleScanlinesBtn && scanlines) {
      toggleScanlinesBtn.addEventListener('click', () => {
        const isOff = scanlines.classList.toggle('disabled');
        toggleScanlinesBtn.textContent = isOff ? 'CRT: OFF' : 'CRT: ON';
      });
    }
  }
})();
