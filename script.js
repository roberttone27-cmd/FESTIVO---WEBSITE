const products = [
  {name:"Tobogan gonflabil",category:"Distracție",price:"600 lei",meta:"6 × 4 × 7 m",image:"WhatsApp Image 2026-08-26 at 10.02.15.jpeg"},
  {name:"Tobogan castel",category:"Distracție",price:"300 lei",meta:"3 × 3 m",image:"WhatsApp Image 2026-08-26 at 10.02.20.jpeg"},
  {name:"Mese & scaune cu veselă",category:"Mese & scaune",price:"30 lei / scaun",meta:"Mesele și vesela incluse",image:"WhatsApp Image 2026-08-26 at 10.01.56.jpeg"},
  {name:"Pavilion simplu",category:"Corturi",price:"200 lei",meta:"3 × 3 m",image:"WhatsApp Image 2026-08-26 at 10.07.28.jpeg"},
  {name:"Vitrină frigorifică verticală",category:"Echipamente",price:"250 lei",meta:"Depozitare & servire rece",image:"WhatsApp Image 2026-08-26 at 10.01.55.jpeg"},
  {name:"Arcadă cu flori",category:"Decor",price:"300 lei",meta:"Decor floral",image:"WhatsApp Image 2026-08-26 at 10.01.55 (2).jpeg"},
  {name:"Covor roșu",category:"Decor",price:"200 lei",meta:"15 × 1 m",image:"WhatsApp Image 2026-08-26 at 10.01.55 (4).jpeg"},
  {name:"Mixer DJ",category:"Audio / video",price:"500 lei",meta:"Setup DJ",image:"WhatsApp Image 2026-08-26 at 10.07.22.jpeg"},
  {name:"Aerotermă verticală",category:"Echipamente",price:"200 lei",meta:"Încălzire pentru exterior",image:"WhatsApp Image 2026-08-26 at 10.07.23.jpeg"},
  {name:"Proiector Epson 4K",category:"Audio / video",price:"200 lei",meta:"Proiecții pentru evenimente",image:"WhatsApp Image 2026-08-26 at 10.07.20.jpeg"}
];

const filters = ["Toate", ...new Set(products.map(p => p.category))];
const filtersEl = document.querySelector("#filters");
const grid = document.querySelector("#productGrid");

function render(filter="Toate"){
  filtersEl.innerHTML = filters.map(f => `<button class="filter ${f===filter?'active':''}" data-filter="${f}">${f}</button>`).join("");
  const list = filter==="Toate" ? products : products.filter(p => p.category===filter);
  grid.innerHTML = list.map(p => `
    <article class="product">
      <div class="product-img"><img loading="lazy" src="assets/${p.image}" alt="${p.name}"></div>
      <div class="product-info">
        <div class="product-cat">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-bottom"><span class="product-meta">${p.meta}</span><span class="product-price">${p.price}</span></div>
      </div>
    </article>`).join("");
  document.querySelectorAll(".filter").forEach(btn => btn.addEventListener("click", () => render(btn.dataset.filter)));
}
render();

document.querySelectorAll(".categories a").forEach(a => a.addEventListener("click", () => {
  setTimeout(() => {
    const f = a.dataset.filter;
    if(f) render(f);
  }, 50);
}));

document.querySelector("#quoteForm").addEventListener("submit", e => {
  e.preventDefault();
  document.querySelector("#formNote").textContent = "Perfect — formularul este pregătit. În etapa următoare îl conectăm la WhatsApp / email.";
});
