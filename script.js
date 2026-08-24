const header = document.querySelector('[data-header]');
const progress = document.querySelector('[data-page-progress]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const config = window.SITE_CONFIG || {};
const hero = document.querySelector('.hero-community');
const heroMotionMedia = hero?.querySelector('.hero-motion-media');

if (hero && heroMotionMedia && !reduceMotion) {
  hero.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * -8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -6;
    heroMotionMedia.style.setProperty('--hero-x', `${x.toFixed(2)}px`);
    heroMotionMedia.style.setProperty('--hero-y', `${y.toFixed(2)}px`);
  }, { passive: true });

  hero.addEventListener('pointerleave', () => {
    heroMotionMedia.style.setProperty('--hero-x', '0px');
    heroMotionMedia.style.setProperty('--hero-y', '0px');
  });
}

document.querySelectorAll('[data-consult]').forEach((link) => {
  if (!config.consultationUrl) return;
  link.href = config.consultationUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

document.querySelectorAll('[data-phone]').forEach((link) => {
  if (!config.phone) {
    link.addEventListener('click', (event) => event.preventDefault());
    return;
  }
  link.href = `tel:${config.phone.replace(/[^0-9+]/g, '')}`;
  link.removeAttribute('aria-disabled');
});

const main = document.querySelector('main');
const whySection = document.querySelector('#why');
const trainingSection = document.querySelector('#training');
const proofSection = document.querySelector('#training-proof');
const spaceSection = document.querySelector('#space');
const coachesSection = document.querySelector('#coaches');
if (main && whySection && trainingSection && proofSection && spaceSection && coachesSection) {
  whySection.after(trainingSection);
  trainingSection.after(proofSection);
  proofSection.after(spaceSection);
  spaceSection.after(coachesSection);
  const reviewsSection = document.querySelector('.member-reviews');
  if (reviewsSection) {
    reviewsSection.id = 'reviews';
    reviewsSection.classList.add('section', 'section-dark');
    coachesSection.after(reviewsSection);
  }
}

if (trainingSection) {
  const trainingCta = document.createElement('a');
  trainingCta.className = 'inline-training-cta';
  trainingCta.dataset.consult = '';
  trainingCta.dataset.event = 'pt_consultation';
  trainingCta.href = config.consultationUrl || '#visit';
  trainingCta.target = config.consultationUrl ? '_blank' : '';
  trainingCta.rel = config.consultationUrl ? 'noopener noreferrer' : '';
  trainingCta.textContent = '내 운동 목적에 맞는 수업 상담하기 →';
  trainingSection.append(trainingCta);
}

const facilityRail = document.querySelector('.facility-rail');
if (facilityRail && window.SPACE_GALLERY?.length) {
  const filters = document.createElement('div');
  filters.className = 'space-filters';
  filters.setAttribute('aria-label', '공간 카테고리');
  filters.innerHTML = [['all','ALL'],['weight','WEIGHT'],['care','PRIVATE CARE'],['shower','SHOWER']].map(([key,label], index) => `<button type="button" class="${index === 0 ? 'is-active' : ''}" data-filter="${key}">${label}</button>`).join('');
  facilityRail.before(filters);
  const renderSpaces = (filter = 'all') => {
    const items = window.SPACE_GALLERY.filter((item) => filter === 'all' || item.category === filter);
    facilityRail.innerHTML = items.map((item, index) => `<figure class="facility-card"><img src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async"><figcaption>${item.label}<span>${String(index + 1).padStart(2, '0')}</span></figcaption></figure>`).join('');
  };
  filters.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    filters.querySelectorAll('button').forEach((item) => item.classList.toggle('is-active', item === button));
    renderSpaces(button.dataset.filter);
  });
  renderSpaces();
}

const coachList = document.querySelector('[data-coach-list]');
const coachDialog = document.querySelector('[data-coach-dialog]');
const coachDialogContent = document.querySelector('[data-dialog-content]');
(window.TRAINERS || []).forEach((coach, index) => {
  const card = document.createElement('article');
  card.className = 'coach-card';
  const coachImages = coach.images.map((image) => `<img src="${image.src}" alt="${image.alt}" width="${image.width}" height="${image.height}" loading="lazy">`).join('');
  card.innerHTML = `<div class="coach-media">${coachImages}</div><div><p class="eyebrow">1986 COACH</p><h3>${coach.name}</h3><div class="coach-tags">${coach.specialties.map((item) => `<span>${item}</span>`).join('')}</div><button type="button" data-coach-index="${index}">코칭 방식 보기 →</button></div>`;
  coachList?.append(card);
});

coachList?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-coach-index]');
  if (!button || !coachDialog || !coachDialogContent) return;
  const coach = window.TRAINERS[Number(button.dataset.coachIndex)];
  coachDialogContent.innerHTML = `<p class="eyebrow">COACHING PHILOSOPHY</p><h2>${coach.name}</h2><p>${coach.philosophy}</p><h3>수업에서 중요하게 보는 것</h3><ul>${coach.education.map((item) => `<li>${item}</li>`).join('')}</ul>`;
  coachDialog.showModal();
});
document.querySelector('[data-dialog-close]')?.addEventListener('click', () => coachDialog?.close());
coachDialog?.addEventListener('click', (event) => { if (event.target === coachDialog) coachDialog.close(); });

const syncPageState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);

  if (heroMotionMedia && !reduceMotion) {
    heroMotionMedia.style.setProperty('--hero-scroll', `${Math.min(window.scrollY * 0.08, 18).toFixed(2)}px`);
  }

  const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollRange > 0 ? Math.min(window.scrollY / scrollRange, 1) : 0;
  progress?.style.setProperty('transform', `scaleX(${ratio})`);
};

syncPageState();
window.addEventListener('scroll', syncPageState, { passive: true });
window.addEventListener('resize', syncPageState, { passive: true });

const revealGroups = [
  '.section-index',
  '.section-heading, .why-feature, .space-copy, .area-diagram, .member-reviews-head, .facility-archive-head, .facility-video, .training-intro, .training-main-visual, .assessment-heading, .assessment-feature, .trainer-culture, .experience-feature, .continuity-feature, .weekly-letter-head, .weekly-letter-gallery, .member-voice, .visit-copy, .visit-media, .faq-layout',
  '.principle, .member-review-card, .training-flow li, .assessment-card, .experience-list article, .continuity-track li'
];

const revealTargets = document.querySelectorAll(revealGroups.join(','));
revealTargets.forEach((element, index) => {
  element.setAttribute('data-reveal', '');
  if (element.matches('.principle, .member-review-card, .training-flow li, .assessment-card, .experience-list article, .continuity-track li')) {
    element.style.setProperty('--reveal-delay', `${(index % 4) * 70}ms`);
  }
});

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealTargets.forEach((element) => element.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px' });

  revealTargets.forEach((element) => revealObserver.observe(element));
}

const navLinks = [...document.querySelectorAll('.desktop-nav a[href^="#"]')];
const navSections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver((entries) => {
    const current = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!current) return;
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${current.target.id}`);
    });
  }, { rootMargin: '-30% 0px -55%', threshold: [0, 0.25, 0.6] });

  navSections.forEach((section) => navObserver.observe(section));
}

if (!reduceMotion) {
  const depthImages = [...document.querySelectorAll('.training-main-visual img, .visit-visual img')];
  let ticking = false;

  const syncDepth = () => {
    depthImages.forEach((image) => {
      const rect = image.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const centerOffset = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      image.style.setProperty('--motion-y', `${Math.max(-10, Math.min(10, centerOffset * -16))}px`);
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(syncDepth);
  }, { passive: true });
  syncDepth();
}

const centerVideo = document.querySelector('.facility-video video');
if (centerVideo && 'IntersectionObserver' in window) {
  const videoObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      centerVideo.play().catch(() => {});
    } else {
      centerVideo.pause();
    }
  }, { threshold: 0.35 });
  videoObserver.observe(centerVideo);
}

const horizontalRails = document.querySelectorAll(
  '.member-review-grid, .facility-rail, .assessment-gallery, .weekly-letter-gallery'
);

horizontalRails.forEach((rail) => {
  rail.tabIndex = 0;
  const progressTrack = document.createElement('div');
  const progressThumb = document.createElement('span');
  progressTrack.className = 'rail-progress';
  progressTrack.setAttribute('aria-hidden', 'true');
  progressTrack.append(progressThumb);
  rail.insertAdjacentElement('afterend', progressTrack);

  const syncRailProgress = () => {
    const trackWidth = 72;
    const maxScroll = rail.scrollWidth - rail.clientWidth;
    const thumbWidth = maxScroll > 0
      ? Math.max(16, trackWidth * (rail.clientWidth / rail.scrollWidth))
      : trackWidth;
    const ratio = maxScroll > 0 ? rail.scrollLeft / maxScroll : 0;
    progressThumb.style.width = `${thumbWidth}px`;
    progressThumb.style.transform = `translateX(${(trackWidth - thumbWidth) * ratio}px)`;
  };

  rail.addEventListener('scroll', syncRailProgress, { passive: true });
  rail.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    rail.scrollBy({
      left: (event.key === 'ArrowRight' ? 1 : -1) * rail.clientWidth * 0.82,
      behavior: reduceMotion ? 'auto' : 'smooth'
    });
  });
  window.addEventListener('resize', syncRailProgress, { passive: true });
  syncRailProgress();
});

const faqItems = document.querySelectorAll('.accordion details');
faqItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    faqItems.forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});
