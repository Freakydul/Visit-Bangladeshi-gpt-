// ============================================================
// ADMIN IMAGE CONFIG
// Replace values with local image paths or permitted hosted URLs.
// Example: hero: 'assets/images/hero/hero.jpg'
// ============================================================
const IMAGE_CONFIG = {
  hero: 'assets/images/hero/hero.jpg',
  sundarbans: 'assets/images/destinations/sundarbans.jpg',
  river: 'assets/images/experiences/river.jpg',
  tea: 'assets/images/experiences/tea.jpg',
  hills: 'assets/images/experiences/hills.jpg',
  heritage: 'assets/images/experiences/heritage.jpg',
  culture: 'assets/images/culture/culture.jpg',
  craft: 'assets/images/culture/craft.jpg',
  biryani: 'assets/images/food/biryani.jpg',
  pitha: 'assets/images/food/pitha.jpg',
  hilsa: 'assets/images/food/hilsa.jpg'
};

const destinations = [
  {name:'Sundarbans', region:'Khulna • Mangrove forest', desc:'A tidal world of creeks, forest and wildlife.', image:'sundarbans', category:'Nature', big:true},
  {name:"Cox's Bazar", region:'Chattogram • Coast', desc:'Wide horizons and a long shoreline.', category:'Beach', big:false},
  {name:'Sajek Valley', region:'Chattogram • Hills', desc:'Clouds, green ridges and winding roads.', category:'Hills'},
  {name:'Sylhet', region:'Sylhet • Tea country', desc:'Tea gardens, wetlands and slow mornings.', category:'Nature'},
  {name:'Sonargaon', region:'Dhaka • Heritage', desc:'Old capital history and riverside heritage.', category:'Heritage'},
  {name:'Bandarban', region:'Chattogram • Hills', desc:'Forest roads and a very different horizon.', category:'Hills'},
  {name:'Rangamati', region:'Chattogram • Lake & hills', desc:'Water, hills and quiet viewpoints.', category:'Nature'},
  {name:'Dhaka', region:'Dhaka • City', desc:'Markets, food, history and restless energy.', category:'City'},
  {name:'Paharpur', region:'Rajshahi • Archaeology', desc:'A major archaeological site with centuries of history.', category:'Heritage'}
];

const itineraries = [
  {days:'03 days', title:'Dhaka + Sonargaon', text:'A compact introduction to the capital, old quarters and nearby heritage.'},
  {days:'05 days', title:'Sylhet + Srimangal', text:'Tea country, green landscapes and time to wander without rushing.'},
  {days:'07 days', title:'Hills + Coast', text:'Pair the Chattogram hill region with a few slower days by the sea.'},
  {days:'10 days', title:'Bangladesh highlights', text:'A flexible loop connecting city, heritage, nature and coast.'}
];

const fallbackPalette = ['#184438','#6b7551','#b79469','#334f42'];

function loadImageIntoSlot(slot, key){
  const src = IMAGE_CONFIG[key];
  if(!src) return;
  const img = new Image();
  img.loading = 'lazy';
  img.decoding = 'async';
  img.alt = '';
  img.src = src;
  img.onload = () => { slot.appendChild(img); slot.classList.add('has-image'); };
  img.onerror = () => { /* Keep the intentional admin placeholder. */ };
}

document.querySelectorAll('.image-slot[data-image]').forEach(slot => loadImageIntoSlot(slot, slot.dataset.image));

function makeDestinationCard(item){
  const el = document.createElement('article');
  el.className = 'destination-card reveal' + (item.big ? ' big' : '');
  const key = item.image || '';
  const src = key ? IMAGE_CONFIG[key] : '';
  el.innerHTML = `
    <div class="image-slot" style="position:absolute;inset:0" data-image="${key}">
      <div class="image-placeholder" style="background:linear-gradient(135deg,${fallbackPalette[Math.floor(Math.random()*fallbackPalette.length)]},#7a8c70)"><span>ADD PHOTO</span><small>${key ? src : 'set IMAGE_CONFIG'}</small></div>
    </div>
    <div class="destination-info"><div class="tag">${item.region}</div><h3>${item.name}</h3><p>${item.desc}</p></div>`;
  const slot = el.querySelector('.image-slot');
  if(key) loadImageIntoSlot(slot, key);
  return el;
}

const destGrid = document.getElementById('destination-grid');
const filters = ['All', ...new Set(destinations.map(x => x.category))];
const filterRow = document.getElementById('filter-row');
let active = 'All';
function renderFilters(){
  filterRow.innerHTML = filters.map(f => `<button class="${f===active?'active':''}" type="button" data-filter="${f}">${f}</button>`).join('');
  filterRow.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{active=btn.dataset.filter;renderFilters();renderDestinations();}));
}
function renderDestinations(){
  destGrid.innerHTML='';
  const visible = active==='All' ? destinations : destinations.filter(x=>x.category===active);
  visible.forEach(item => destGrid.appendChild(makeDestinationCard(item)));
  observeReveals();
}
renderFilters(); renderDestinations();

const itineraryGrid=document.getElementById('itinerary-grid');
itineraryGrid.innerHTML=itineraries.map((x,i)=>`<article class="itinerary-card reveal"><div class="days">${x.days}</div><h3>${x.title}</h3><p>${x.text}</p><a href="#destinations">Explore route ↗</a></article>`).join('');

function observeReveals(){
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}});
  },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal:not(.is-visible)').forEach(el=>observer.observe(el));
}
observeReveals();

const nav=document.getElementById('site-nav');
const updateNav=()=>nav.classList.toggle('scrolled',window.scrollY>50);
window.addEventListener('scroll',updateNav,{passive:true}); updateNav();

const menuBtn=document.getElementById('menu-btn');
const mobileMenu=document.getElementById('mobile-menu');
menuBtn.addEventListener('click',()=>{
  const open=mobileMenu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded',open?'true':'false');
  mobileMenu.setAttribute('aria-hidden',open?'false':'true');
  document.body.style.overflow=open?'hidden':'';
});
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  mobileMenu.classList.remove('open'); menuBtn.setAttribute('aria-expanded','false'); mobileMenu.setAttribute('aria-hidden','true'); document.body.style.overflow='';
}));

// Gentle hero parallax on pointer-capable devices.
const hero=document.getElementById('hero');
const heroMedia=hero.querySelector('.hero-media');
window.addEventListener('scroll',()=>{
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const y=Math.min(window.scrollY, hero.offsetHeight);
  heroMedia.style.transform=`translateY(${y*0.12}px) scale(1.02)`;
},{passive:true});
