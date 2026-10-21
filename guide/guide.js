// A tab left open across midnight must not continue to show an ended offer.
function expireOffers() {
  const today = new Intl.DateTimeFormat('sv-SE', {timeZone:'Asia/Seoul'}).format(new Date());
  document.querySelectorAll('[data-sale-end]').forEach(product => {
    if (product.dataset.saleEnd && product.dataset.saleEnd < today) {
      const notice = document.createElement('p');
      notice.textContent = '판매 기간이 종료된 상품입니다. 현재 상품은 상담으로 확인해 주세요.';
      product.replaceWith(notice);
    }
  });
}
expireOffers();
document.addEventListener('visibilitychange', expireOffers);
setInterval(expireOffers, 60000);

const carousel = document.querySelector('.intro-carousel');
if (carousel) {
  const track = carousel.querySelector('.carousel-track');
  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  // Shuffle only the introduction on each load (Fisher–Yates).
  for (let i = slides.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [slides[i], slides[j]] = [slides[j], slides[i]];
  }
  slides.forEach((slide, index) => {
    slide.setAttribute('aria-label', `${index + 1} / ${slides.length}`);
    const img = slide.querySelector('img');
    img.loading = index < 3 ? 'eager' : 'lazy';
    img.fetchPriority = index === 0 ? 'high' : 'auto';
    track.appendChild(slide);
  });
  track.scrollLeft = 0;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  const update = () => {
    current = slides.reduce((best, slide, i) => Math.abs(slide.offsetLeft - slides[0].offsetLeft - track.scrollLeft) < Math.abs(slides[best].offsetLeft - slides[0].offsetLeft - track.scrollLeft) ? i : best, 0);
    carousel.querySelector('.carousel-count').textContent = `${String(current + 1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
  };
  const move = (direction) => {
    const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
    const next = direction > 0 && atEnd ? 0 : direction < 0 && current === 0 ? slides.length - 1 : Math.max(0, Math.min(slides.length - 1, current + direction));
    track.scrollTo({left:slides[next].offsetLeft - slides[0].offsetLeft,behavior:motion.matches?'instant':'smooth'});
  };
  carousel.querySelector('.carousel-controls').hidden = false;
  carousel.querySelector('[data-slide-prev]').addEventListener('click', () => {move(-1);});
  carousel.querySelector('[data-slide-next]').addEventListener('click', () => {move(1);});
  track.addEventListener('scroll',update,{passive:true});
  track.addEventListener('keydown', event => {if(['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();move(event.key==='ArrowRight'?1:-1);}});
  setInterval(()=>{const r=carousel.getBoundingClientRect();if(!motion.matches&&!document.hidden&&r.bottom>0&&r.top<innerHeight)move(1);},4500);
}
