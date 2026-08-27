const products = [
  {id:'tent10',name:'Cort 10 × 5 m',category:'Corturi',price:1000,unit:' / eveniment',meta:'50 m²',image:'WhatsApp Image 2026-08-26 at 10.07.28.jpeg',tags:['wedding','corporate','party'],capacity:40,area:50,type:'tent'},
  {id:'tent40',name:'Cort complet pentru 40 persoane',category:'Corturi',price:2500,unit:' / eveniment',meta:'Mese + iluminat + mochetă',image:'WhatsApp Image 2026-08-26 at 10.01.56.jpeg',tags:['wedding','corporate','party'],capacity:40,type:'package'},
  {id:'pavilion',name:'Pavilion simplu',category:'Corturi',price:200,unit:' / eveniment',meta:'3 × 3 m',image:'WhatsApp Image 2026-08-26 at 10.07.28.jpeg',tags:['wedding','party'],type:'pavilion'},
  {id:'pavilionPremium',name:'Pavilion premium',category:'Corturi',price:400,unit:' / eveniment',meta:'4 × 3 m',image:'WhatsApp Image 2026-08-26 at 10.07.28.jpeg',tags:['wedding','party'],type:'pavilion'},
  {id:'chairs',name:'Mese + scaune + veselă',category:'Mese & scaune',price:30,unit:' / scaun',meta:'Mesele și vesela incluse',image:'WhatsApp Image 2026-08-26 at 10.01.56.jpeg',perGuest:true,tags:['wedding','corporate','party'],type:'seating'},
  {id:'cocktail',name:'Masă înaltă cocktail',category:'Mese & scaune',price:100,unit:' / masă',meta:'Masă pentru socializare',image:'WhatsApp Image 2026-08-26 at 10.01.57.jpeg',tags:['party','corporate'],type:'cocktail'},
  {id:'slide',name:'Tobogan gonflabil',category:'Distracție',price:600,unit:' / eveniment',meta:'6 × 4 × 7 m',image:'WhatsApp Image 2026-08-26 at 10.02.15.jpeg',tags:['kids','party'],type:'kids'},
  {id:'castle',name:'Tobogan castel',category:'Distracție',price:300,unit:' / eveniment',meta:'3 × 3 m',image:'WhatsApp Image 2026-08-26 at 10.02.23.jpeg',tags:['kids','party'],type:'kids'},
  {id:'bubble',name:'Bubble House Balloon',category:'Distracție',price:400,unit:' / eveniment',meta:'Atracție foto & joacă',image:'WhatsApp Image 2026-08-26 at 10.02.20.jpeg',tags:['kids','party'],type:'kids'},
  {id:'fridge',name:'Vitrină frigorifică verticală',category:'Echipamente',price:250,unit:' / eveniment',meta:'Băuturi & produse reci',image:'WhatsApp Image 2026-08-26 at 10.01.55.jpeg',tags:['wedding','corporate','party'],type:'fridge'},
  {id:'heater',name:'Aerotermă verticală',category:'Echipamente',price:200,unit:' / eveniment',meta:'Încălzire pentru exterior',image:'WhatsApp Image 2026-08-26 at 10.07.23.jpeg',tags:['wedding','corporate','party'],type:'heater'},
  {id:'redcarpet',name:'Covor roșu',category:'Decor',price:200,unit:' / bucată',meta:'15 × 1 m',image:'WhatsApp Image 2026-08-26 at 10.01.55 (4).jpeg',tags:['wedding','corporate','party'],type:'decor'},
  {id:'flowers',name:'Arcadă cu flori',category:'Decor',price:300,unit:' / eveniment',meta:'Decor floral',image:'WhatsApp Image 2026-08-26 at 10.01.55 (2).jpeg',tags:['wedding','party'],type:'decor'},
  {id:'projector',name:'Proiector Epson 4K',category:'Audio / video',price:200,unit:' / eveniment',meta:'Proiecții & prezentări',image:'WhatsApp Image 2026-08-26 at 10.07.20.jpeg',tags:['wedding','corporate','party'],type:'av'},
  {id:'dj',name:'Mixer DJ',category:'Audio / video',price:500,unit:' / eveniment',meta:'Setup DJ',image:'WhatsApp Image 2026-08-26 at 10.07.22.jpeg',tags:['wedding','party'],type:'av'},
  {id:'foodSignature',name:'Meniu Complet',category:'Mâncare',price:12500,unit:' / meniu',meta:'50–60 persoane • proțap + grill + aperitiv rece + platouri de fructe',image:'food/MCP.jpeg',tags:['wedding','party','corporate'],type:'food',guests:'50–60'},
  {id:'foodGrill',name:'Meniu Festin',category:'Mâncare',price:9000,unit:' / meniu',meta:'50–60 persoane • porc + oaie + grill + garnituri',image:'food/WhatsApp Image 2026-08-26 at 12.25.38.jpeg',tags:['wedding','party','corporate'],type:'food',guests:'50–60'},
  {id:'foodEssential',name:'Meniu Tradițional',category:'Mâncare',price:7500,unit:' / meniu',meta:'50–60 persoane • porc SAU oaie + grill + garnituri',image:'food/WhatsApp Image 2026-08-26 at 12.25.37.jpeg',tags:['wedding','party','corporate'],type:'food',guests:'50–60'},
  {id:'fruitbarAperitiv',name:'Fruitbar / Aperitiv',category:'Fruitbar / Aperitiv',price:3000,unit:' / eveniment',meta:'Fără număr de persoane',image:'food/ap0.jpeg',tags:['wedding','party','corporate'],type:'service'}
];

const state={step:1,eventType:'party',guests:40,date:'',location:'',venue:'outdoor',season:'summer',style:'balanced',selected:{},recommendations:[],hasOptimized:false};
const categories=['Toate','Mâncare','Fruitbar / Aperitiv',...new Set(products.map(p=>p.category).filter(c=>c!=='Mâncare'&&c!=='Fruitbar / Aperitiv'))];
const labels={wedding:'Nuntă',kids:'Petrecere copii',corporate:'Corporate',party:'Petrecere privată'};
const venueLabels={outdoor:'În aer liber',indoor:'În interior',mixed:'Mixt'};
const seasonLabels={spring:'Primăvară',summer:'Vară',autumn:'Toamnă',winter:'Iarnă'};
const money=n=>new Intl.NumberFormat('ro-RO',{style:'currency',currency:'RON',maximumFractionDigits:0}).format(n);
const getProduct=id=>products.find(p=>p.id===id);
const entries=()=>Object.entries(state.selected).filter(([,q])=>q>0).map(([id,q])=>({product:getProduct(id),qty:q}));
const total=()=>entries().reduce((s,{product,qty})=>s+product.price*qty,0);
const ceilDiv=(a,b)=>Math.max(1,Math.ceil(a/b));

function buildPlan(){
  const g=Math.max(1,Number(state.guests)||1), type=state.eventType, plan=[];
  const add=(id,qty,reason,priority='recommended')=>{if(qty>0)plan.push({id,qty,reason,priority});};

  // Core seating: price is per chair, while tables and tableware are included.
  add('chairs',g,`${g} invitați → câte un loc la masă pentru fiecare persoană.`,'essential');

  // Coverage logic based on the supplier's current inventory.
  if(state.venue!=='indoor'){
    if(g<=40) add('tent40',1,'Soluție completă pentru până la 40 persoane: mese, iluminat și mochetă.','recommended');
    else add('tent10',ceilDiv(g,40),`${g} invitați → aproximativ ${ceilDiv(g,40)} module de 50 m² pentru o configurație de bază.`,'recommended');
  }

  // Food menus are currently fixed offers for 50–60 people only.
  // We do not scale them automatically until the supplier gives us rules for larger/smaller groups.
  if(g>=50 && g<=60){
    if(state.style==='premium') add('foodSignature',1,'Meniul complet pentru 50–60 persoane, cu aperitiv rece și platouri de fructe.','recommended');
    else if(state.style==='social') add('foodGrill',1,'Meniu pentru 50–60 persoane, construit în jurul preparatelor la grill.','recommended');
    else add('foodEssential',1,'Meniu pentru 50–60 persoane, cu porc sau oaie și preparate la grill.','optional');
  }

  if(type==='kids'){
    add('slide',1,'Atracție principală pentru copii.','recommended');
    if(g>=25) add('bubble',1,'Extra activitate și zonă foto pentru petreceri mai mari.','optional');
  }
  if(type==='wedding'){
    add('flowers',1,'Punct decorativ pentru intrare sau zona foto.','recommended');
    add('redcarpet',1,'Potrivit pentru acces, ceremonie sau zona foto.','optional');
    if(g>=60) add('cocktail',Math.max(2,Math.round(g/30)),'Zone de socializare între mese.','optional');
    add('fridge',1,'Pentru băuturi și produse reci.','recommended');
    add('dj',1,'Pentru muzică și petrecere.','optional');
  }
  if(type==='party'){
    add('fridge',1,'Practic pentru băuturi și servire.','recommended');
    if(g>=50) add('cocktail',2,'Creează o zonă de socializare separată de mesele principale.','optional');
    add('dj',1,'Opțiune pentru muzică și atmosferă.','optional');
  }
  if(type==='corporate'){
    add('projector',1,'Potrivit pentru prezentări, video și conținut de brand.','recommended');
    add('fridge',1,'Pentru băuturi și catering.','recommended');
    if(g>=50) add('cocktail',Math.max(2,Math.round(g/30)),'Zone de networking.','optional');
  }

  if(state.season==='autumn'||state.season==='winter') add('heater',state.venue==='indoor'?1:Math.max(1,ceilDiv(g,40)),`Pentru ${seasonLabels[state.season].toLowerCase()}, recomandăm o soluție de încălzire.`,'recommended');
  if(state.season==='spring' && state.venue!=='indoor') add('heater',1,'Seara poate fi rece; o aerotermă este o rezervă utilă.','optional');
  if(state.style==='premium'){
    if(type!=='corporate') add('flowers',1,'Alege un accent vizual premium pentru zona foto.','recommended');
    add('pavilionPremium',1,'Pavilion premium pentru o zonă separată de lounge / welcome.','optional');
  }
  if(state.style==='social' && g>=30) add('cocktail',Math.max(2,Math.round(g/25)),'Mai multe mese înalte pentru socializare și networking.','recommended');
  return plan;
}

function renderStep(){
  document.querySelectorAll('.config-step').forEach(el=>el.classList.toggle('active',Number(el.dataset.step)===state.step));
  document.querySelectorAll('.step-dot').forEach(el=>el.classList.toggle('active',Number(el.dataset.step)<=state.step));
  document.querySelector('#prevBtn').disabled=state.step===1;
  document.querySelector('#nextBtn').textContent=state.step===2?'Vezi oferta →':'Continuă →';
  updateSummary();
  if(state.step===2){renderConfiguratorCatalog();}
}

function updateSummary(){
  const list=entries(), box=document.querySelector('#configSummary');
  box.innerHTML=list.length?list.map(({product,qty})=>`<div class="summary-item"><span>${product.name} × ${qty}</span><span class="summary-item-right"><strong>${money(product.price*qty)}</strong><button class="summary-remove" type="button" data-remove="${product.id}" aria-label="Șterge ${product.name}" title="Șterge">×</button></span></div>`).join(''):'<p class="empty-summary">Încă nu ai ales echipamente.</p>';
  document.querySelectorAll('[data-remove]').forEach(btn=>btn.onclick=()=>{delete state.selected[btn.dataset.remove];state.hasOptimized=true;updateSummary();renderConfiguratorCatalog();});
  document.querySelector('#configTotal').textContent=money(total());
  document.querySelector('#summaryGuests').textContent=state.guests?`${state.guests} persoane`:'—';
  document.querySelector('#summaryDate').textContent=state.date?new Date(state.date+'T12:00:00').toLocaleDateString('ro-RO'):'—';
  document.querySelector('#summaryLocation').textContent=state.location||'—';
}

function renderRecommendations(){
  state.recommendations=buildPlan();
  const essential=state.recommendations.filter(x=>x.priority==='essential'), rec=state.recommendations.filter(x=>x.priority!=='essential');
  const render=(x)=>{const p=getProduct(x.id), current=state.selected[x.id]||0;return `<article class="recommendation ${current>=x.qty?'added':''}"><div class="rec-image"><img src="assets/${p.image}" alt="${p.name}"></div><div class="rec-copy"><div><span class="rec-badge">${x.priority==='essential'?'NECESAR':x.priority==='recommended'?'RECOMANDAT':'OPȚIONAL'}</span><b>${p.name}</b><small>${x.reason}</small></div><div class="rec-actions"><strong>${money(p.price*x.qty)}</strong><button data-apply="${p.id}" data-qty="${x.qty}">${current>=x.qty?'Adăugat ✓':'Adaugă'}</button></div></div></article>`};
  document.querySelector('#recommendations').innerHTML=`<div class="plan-title"><div><p class="step-label">PLAN INTELIGENT</p><h4>Am construit un punct de plecare pentru ${state.guests} invitați.</h4></div><button id="rebuildPlan" class="mini-button">Recalculează ↻</button></div><div class="recommendation-grid">${essential.map(render).join('')}${rec.map(render).join('')}</div>`;
  document.querySelectorAll('[data-apply]').forEach(btn=>btn.onclick=()=>{state.selected[btn.dataset.apply]=Number(btn.dataset.qty);state.hasOptimized=true;renderRecommendations();renderConfiguratorCatalog();updateSummary();});
  document.querySelector('#rebuildPlan').onclick=()=>{state.selected={};state.hasOptimized=false;renderRecommendations();renderConfiguratorCatalog();updateSummary();};
}

function renderConfiguratorCatalog(filter='Toate'){
  const active=document.querySelector('#configFilters')?.dataset.active||filter;
  document.querySelector('#configFilters').dataset.active=active;
  document.querySelector('#configFilters').innerHTML=categories.map(c=>`<button class="filter ${c===active?'active':''}" data-cat="${c}">${c}</button>`).join('');
  const list=active==='Toate'?[...products].sort((a,b)=>(a.type==='food'?0:1)-(b.type==='food'?0:1)):products.filter(p=>p.category===active);
  document.querySelector('#configProducts').innerHTML=list.map(p=>{const q=state.selected[p.id]||0;return `<article class="config-product" data-open-product="${p.id}" tabindex="0" role="button" aria-label="Vezi detalii ${p.name}"><div class="cp-image"><img src="assets/${p.image}" alt="${p.name}"></div><div class="cp-body"><small>${p.category}</small><h3>${p.name}</h3><p>${p.meta}</p><div class="cp-bottom"><strong>${money(p.price)}<small>${p.unit}</small></strong><div class="qty"><button type="button" data-minus="${p.id}" aria-label="Scade ${p.name}">−</button><b>${q}</b><button type="button" data-plus="${p.id}" aria-label="Adaugă ${p.name}">+</button></div></div></div></article>`}).join('');
  document.querySelectorAll('[data-open-product]').forEach(card=>{card.onclick=e=>{if(e.target.closest('.qty'))return;openProduct(card.dataset.openProduct)};card.onkeydown=e=>{if((e.key==='Enter'||e.key===' ')&&!e.target.closest('.qty')){e.preventDefault();openProduct(card.dataset.openProduct)}}});
  document.querySelectorAll('[data-plus]').forEach(b=>b.onclick=e=>{e.stopPropagation();changeQty(b.dataset.plus,1)});
  document.querySelectorAll('[data-minus]').forEach(b=>b.onclick=e=>{e.stopPropagation();changeQty(b.dataset.minus,-1)});
}
function changeQty(id,delta){state.selected[id]=Math.max(0,(state.selected[id]||0)+delta);if(!state.selected[id])delete state.selected[id];state.hasOptimized=true;renderConfiguratorCatalog();updateSummary();}

const foodDetails={
  foodSignature:{title:'Meniu Complet',subtitle:'Meniu complet pentru 50–60 persoane',intro:'O experiență completă de barbecue și servire la eveniment, cu preparate live, aperitiv rece și platouri de fructe.',sections:[
    ['Carne & grill',['Porc 65–70 kg','Oaie 30–35 kg','10 cocoșei','14 frigărui de 56 cm cu piept de pui și legume','Jumări','Șorici','Cârnați plini de carne, afumați în timpul evenimentului']],
    ['Legume, garnituri & sosuri',['Ananas','Grapefruit','Ardei roșu, galben și verde','Ardei kapia','Vinete','Dovlecei','Sos de usturoi cu smântână','Sos roșu napoletan','Murături asortate în saramură','Castraveciori în oțet, calibru 3–6','Gogoșari roșii tăiați în oțet','Cartofi românești','Ulei','Lipii','Cărbuni']],
    ['Platouri cu fructe',['Struguri rose și albi','Ananas','Pepene roșu','Mango','Pepene galben','Afine','Căpșuni','Cireșe','Portocale','Kiwi','Fistic','Alune','Migdale']],
    ['Aperitiv rece tip bufet',['Trandafir de salam crud uscat','Trandafir de salam picant','Mușchi crud uscat','Pastramă din piept de pui','Salam în crustă de cașcaval','Șunculiță țărănească','Chorizo','Jamon Serrano','Șuncă Praga','Cârnați sticks','Roșii cherry','Castraveți','Măsline verzi și kalamata','Telemea','Cașcaval','Cașcaval afumat','Cheddar','Brânză Brie','Mozzarella']]
  ]},
  foodGrill:{title:'Meniu Festin',subtitle:'Meniu pentru 50–60 persoane',intro:'Un meniu axat pe preparate la proțap și grill, cu garnituri, sosuri, murături și servire pentru eveniment.',sections:[
    ['Carne & grill',['Porc 65–70 kg','Oaie 30–35 kg','10 cocoșei','14 frigărui de 56 cm cu piept de pui și legume','Jumări','Șorici','Cârnați plini de carne, afumați în timpul evenimentului']],
    ['Legume, garnituri & sosuri',['Ananas','Grapefruit','Ardei roșu, galben și verde','Ardei kapia','Vinete','Dovlecei','Sos de usturoi cu smântână','Sos roșu napoletan','Murături asortate în saramură','Castraveciori în oțet, calibru 3–6','Gogoșari roșii tăiați în oțet','Cartofi românești','Ulei','Lipii','Cărbuni']]
  ]},
  foodEssential:{title:'Meniu Tradițional',subtitle:'Meniu pentru 50–60 persoane',intro:'Varianta esențială pentru un eveniment cu preparate consistente la grill și bucătărie live.',sections:[
    ['Carne & grill',['Porc 65–70 kg SAU oaie 30–35 kg','10 cocoșei','14 frigărui de 56 cm cu piept de pui și legume','Jumări','Șorici','Cârnați plini de carne, afumați în timpul evenimentului']],
    ['Legume, garnituri & sosuri',['Ananas','Grapefruit','Ardei roșu, galben și verde','Ardei kapia','Vinete','Dovlecei','Sos de usturoi cu smântână','Sos roșu napoletan','Murături asortate în saramură','Castraveciori în oțet, calibru 3–6','Gogoșari roșii tăiați în oțet','Cartofi românești','Ulei','Lipii','Cărbuni']]
  ]},
  fruitbarAperitiv:{title:'Fruitbar / Aperitiv',subtitle:'Aperitiv rece + platouri de fructe',intro:'',gallery:{main:'food/ap0.jpeg',images:['food/ap1.jpeg','food/ap2.jpeg','food/ap3.jpeg','food/ap4.jpeg']}}
};
function openProduct(id){
  const p=getProduct(id); if(!p)return;
  const modal=document.querySelector('#productModal');
  if(p.type==='food' || id==='fruitbarAperitiv'){
    const d=foodDetails[id];
    const isFruitbar=id==='fruitbarAperitiv';
    const gallery=d.gallery;
    const galleryHtml=gallery?`<div class="food-gallery"><div class="food-main-photo"><img src="assets/${gallery.main}" alt="${d.title}"></div><div class="food-photo-grid">${gallery.images.map((img,i)=>`<img src="assets/${img}" alt="${d.title} ${i+1}" loading="lazy">`).join('')}</div></div>`:'';
    modal.querySelector('.modal-content').innerHTML=`<button class="modal-close" aria-label="Închide">×</button><div class="food-modal-grid"><div class="food-modal-image"><img src="assets/${p.image}" alt="${p.name}"></div><div class="food-modal-copy"><p class="eyebrow">${isFruitbar?'FRUITBAR / APERITIV':'MÂNCARE • 50–60 PERSOANE'}</p><h2>${d.title}</h2><p class="food-modal-subtitle">${d.subtitle}</p><div class="food-modal-price">${money(p.price)} <small>/ ${isFruitbar?'eveniment':'meniu'}</small></div>${d.intro?`<p class="food-modal-intro">${d.intro}</p>`:''}${galleryHtml}${d.sections?`<div class="food-detail-sections">${d.sections.map(([title,items])=>`<section><h3>${title}</h3><ul>${items.map(i=>`<li>${i}</li>`).join('')}</ul></section>`).join('')}</div>`:''}<button class="button button-dark modal-add" data-modal-add="${p.id}">Adaugă în configurator →</button></div></div>`;
  }else{
    modal.querySelector('.modal-content').innerHTML=`<button class="modal-close" aria-label="Închide">×</button><div class="generic-modal"><img src="assets/${p.image}" alt="${p.name}"><div><p class="eyebrow">${p.category}</p><h2>${p.name}</h2><p>${p.meta}</p><strong>${money(p.price)}${p.unit}</strong><button class="button button-dark modal-add" data-modal-add="${p.id}">Adaugă în configurator →</button></div></div>`;
  }
  modal.hidden=false;document.body.classList.add('modal-open');
  modal.querySelector('.modal-close').onclick=closeProduct;
  modal.querySelector('.modal-add').onclick=()=>{state.selected[p.id]=(state.selected[p.id]||0)+1;updateSummary();closeProduct();document.querySelector('#configurator').scrollIntoView({behavior:'smooth'});};
}
function closeProduct(){const m=document.querySelector('#productModal');m.hidden=true;document.body.classList.remove('modal-open');}
function renderCatalog(filter='Toate'){
  const list=filter==='Toate'?[...products].sort((a,b)=>{const rank=p=>p.type==='food'?0:(p.category==='Fruitbar / Aperitiv'?1:2);return rank(a)-rank(b)}):products.filter(p=>p.category===filter);
  const filterBox=document.querySelector('#catalogFilters');
  filterBox.innerHTML=categories.map(c=>`<button class="filter ${c===filter?'active':''}" data-catalog-cat="${c}">${c}</button>`).join('');
  document.querySelector('#productGrid').innerHTML=list.map(p=>`<article class="product ${p.type==='food'?'food-card':''}" data-product-id="${p.id}"><div class="product-img"><img loading="lazy" src="assets/${p.image}" alt="${p.name}">${p.type==='food'?'<span class="food-badge">MENIU 50–60 PERS.</span>':''}</div><div class="product-info"><div class="product-cat">${p.category}</div><div class="product-name">${p.name}</div><div class="product-bottom"><span class="product-meta">${p.meta}</span><span class="product-price">${money(p.price)}${p.unit}</span></div><button class="catalog-details" data-open-product="${p.id}">${p.type==='food'?'Vezi meniul complet':'Vezi detalii'} <span>↗</span></button></div></article>`).join('');
  document.querySelectorAll('[data-open-product]').forEach(b=>b.onclick=e=>{e.stopPropagation();openProduct(b.dataset.openProduct)});
  document.querySelectorAll('[data-catalog-cat]').forEach(b=>b.onclick=()=>renderCatalog(b.dataset.catalogCat));
}


function validateStep(){
  if(state.step===1 && (!state.guests||state.guests<1)){alert('Introdu un număr de invitați.');return false;}
  if(state.step===1 && !state.date){alert('Alege data evenimentului.');return false;}
  if(state.step===1 && !state.location.trim()){alert('Introdu localitatea evenimentului.');return false;}
  return true;
}

function generateFinal(){
  state.recommendations=buildPlan();
  document.querySelectorAll('.config-step').forEach(el=>el.classList.remove('active'));
  document.querySelector('#finalStep').classList.add('active');
  document.querySelector('#prevBtn').disabled=false;
  document.querySelector('#nextBtn').style.display='none';
  renderQuoteSummary();
}

function renderQuoteSummary(){
  const wrap=document.querySelector('#quotePlan');
  wrap.innerHTML=entries().length?`<div class="quote-plan-head"><span>${labels[state.eventType]} · ${state.guests} persoane</span><strong>${money(total())}</strong></div>${entries().map(({product,qty})=>`<div class="quote-plan-item"><span>${product.name}</span><span>${qty} × ${money(product.price)} = <b>${money(product.price*qty)}</b></span></div>`).join('')}`:'<p>Nu ai adăugat încă echipamente. Poți reveni la pasul 4.</p>';
}

const EVENTA_EMAIL='roberttone27@gmail.com';
const EVENTA_WHATSAPP='40740841943';
function quoteText(){
  const lines=[
    'EVENTA — CERERE DE OFERTĂ',
    '',
    `Invitați: ${state.guests||'-'}`,
    `Data: ${state.date||'-'}`,
    `Localitate: ${state.location||'-'}`,
    '',
    'OFERTA / PLANUL SELECTAT:'
  ];
  entries().forEach(({product,qty})=>lines.push(`• ${product.name} — ${qty} × ${money(product.price)} = ${money(product.price*qty)}`));
  lines.push('',`TOTAL ESTIMAT: ${money(total())}`,'','Vă rugăm să confirmați disponibilitatea și oferta finală.');
  return lines.join('\n');
}
function sendQuoteByEmail(){
  // Emailul nu mai este folosit pentru trimiterea cererii.
  sendQuoteByWhatsApp();
}
function sendQuoteByWhatsApp(){
  const form=document.querySelector('#quoteForm');
  const fd=form?new FormData(form):null;
  const contact=[];
  if(fd){
    const name=String(fd.get('name')||'').trim();
    const phone=String(fd.get('phone')||'').trim();
    const email=String(fd.get('email')||'').trim();
    const message=String(fd.get('message')||'').trim();
    if(name) contact.push(`Nume: ${name}`);
    if(phone) contact.push(`Telefon: ${phone}`);
    if(email) contact.push(`Email: ${email}`);
    if(message) contact.push(`Mesaj: ${message}`);
  }
  const text=quoteText()+(contact.length?'\n\nDATE CLIENT:\n'+contact.join('\n'):'');
  window.open(`https://wa.me/${EVENTA_WHATSAPP}?text=${encodeURIComponent(text)}`,'_blank','noopener');
}
function addWhatsAppButton(){
  if(document.querySelector('#eventaWhatsapp'))return;
  const btn=document.createElement('a');
  btn.id='eventaWhatsapp';btn.href=`https://wa.me/${EVENTA_WHATSAPP}`;btn.target='_blank';btn.rel='noopener';btn.setAttribute('aria-label','Contactează EVENTA pe WhatsApp');
  btn.innerHTML='<span class="wa-icon">◉</span><span>WhatsApp</span>';
  btn.style.cssText='position:fixed;right:22px;bottom:22px;z-index:90;display:flex;align-items:center;gap:9px;padding:13px 17px;border-radius:999px;background:#1f1f1c;color:#fff;text-decoration:none;font:600 12px/1 Arial,sans-serif;box-shadow:0 8px 25px rgba(0,0,0,.18);';
  document.body.appendChild(btn);
}

function init(){
  renderCatalog();renderConfiguratorCatalog();updateSummary();addWhatsAppButton();
  document.querySelectorAll('.event-choice').forEach(b=>b.onclick=()=>{state.eventType=b.dataset.type;document.querySelectorAll('.event-choice').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');});
  document.querySelector('#guests').oninput=e=>{state.guests=Math.max(1,Number(e.target.value)||0);updateSummary();};
  document.querySelector('#eventDate').oninput=e=>{state.date=e.target.value;updateSummary();};
  document.querySelector('#location').oninput=e=>{state.location=e.target.value;updateSummary();};
  document.querySelector('#configFilters').onclick=e=>{if(e.target.dataset.cat){document.querySelector('#configFilters').dataset.active=e.target.dataset.cat;renderConfiguratorCatalog(e.target.dataset.cat);}};
  document.querySelector('#nextBtn').onclick=()=>{if(!validateStep())return;if(state.step<3){state.step++;renderStep();}else generateFinal();};
  document.querySelector('#prevBtn').onclick=()=>{if(state.step>1){state.step--;document.querySelector('#nextBtn').style.display='inline-flex';document.querySelector('#finalStep').classList.remove('active');renderStep();}};
  document.querySelector('#productModal').addEventListener('click',e=>{if(e.target.id==='productModal')closeProduct();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeProduct();});
  document.querySelector('#quoteForm').onsubmit=e=>{e.preventDefault();sendQuoteByWhatsApp();document.querySelector('#formSuccess').hidden=false;document.querySelector('#submitQuote').textContent='WhatsApp deschis ✓';};
  renderStep();
}
document.addEventListener('DOMContentLoaded',init);
