const products=[
 {id:1,name:'Daily Glow Vitamin C',category:'Vitamins',price:399,oldPrice:499,rating:'★ 4.9',tag:'BESTSELLER',description:'A simple daily vitamin C supplement.',image:'photo-1608248543803-ba4f8c70ae0b'},
 {id:2,name:'Calm Mind Magnesium',category:'Vitamins',price:549,oldPrice:null,rating:'★ 4.8',tag:'FEEL GOOD',description:'An easy addition to your evening routine.',image:'photo-1607619056574-7b8d3ee536b2'},
 {id:3,name:'Everyday SPF 50',category:'Personal care',price:449,oldPrice:599,rating:'★ 4.9',tag:'DAILY FAVOURITE',description:'Lightweight broad-spectrum daily sun protection.',image:'photo-1556229010-6c3f2c9ca5f8'},
 {id:4,name:'Gentle Hand Cream',category:'Personal care',price:249,oldPrice:null,rating:'★ 4.7',tag:'LITTLE LUXURY',description:'A pocket-friendly moisturising hand cream.',image:'photo-1608248543803-ba4f8c70ae0b'},
 {id:5,name:'First Aid Essentials Kit',category:'First aid',price:699,oldPrice:799,rating:'★ 4.9',tag:'READY WHEN YOU ARE',description:'Useful basics for your home first-aid shelf.',image:'photo-1603398938378-e54eab446dde'},
 {id:6,name:'Plant Protein Blend',category:'Vitamins',price:799,oldPrice:null,rating:'★ 4.8',tag:'PLANT POWER',description:'A plant-based protein powder for everyday smoothies.',image:'photo-1579722821273-0f6c7d44362f'},
 {id:7,name:'Soothing Aloe Gel',category:'Personal care',price:299,oldPrice:null,rating:'★ 4.8',tag:'COOL & CALM',description:'A cooling gel for a refreshing skin-care step.',image:'photo-1601049541289-9b1b7bbbfe19'},
 {id:8,name:'Daily D3 + K2',category:'Vitamins',price:349,oldPrice:399,rating:'★ 4.9',tag:'EVERYDAY ESSENTIAL',description:'A convenient vitamin D3 and K2 combination.',image:'photo-1571781926291-c477ebfd024b'},
 {id:9,name:'Hydration Electrolytes',category:'Vitamins',price:299,oldPrice:null,rating:'★ 4.7',tag:'ON THE GO',description:'Single-serve hydration mix for busy days.',image:'photo-1550583724-b2692b85b150'},
 {id:10,name:'Soft Cotton Bandages',category:'First aid',price:129,oldPrice:null,rating:'★ 4.8',tag:'HOME FIRST AID',description:'Flexible everyday bandages for your first-aid drawer.',image:'photo-1603398938378-e54eab446dde'},
 {id:11,name:'Nourishing Lip Balm',category:'Personal care',price:179,oldPrice:null,rating:'★ 4.8',tag:'POCKET FAVOURITE',description:'A simple balm to keep close throughout the day.',image:'photo-1608248543803-ba4f8c70ae0b'},
 {id:12,name:'Gentle Sleep Tea',category:'Vitamins',price:399,oldPrice:null,rating:'★ 4.6',tag:'WIND DOWN',description:'A caffeine-free herbal tea for your evening ritual.',image:'photo-1576091160399-112ba8d25d1d'}
];
const pageLoader=document.createElement('div');pageLoader.className='page-loader';pageLoader.setAttribute('role','status');pageLoader.setAttribute('aria-label','Loading Stackly');pageLoader.innerHTML='<img src="stackly_.webp" alt=""><span class="page-loader-track"><i></i></span><small>Thoughtful care, on its way</small>';document.body.append(pageLoader);window.setTimeout(()=>{pageLoader.classList.add('is-hidden');window.setTimeout(()=>pageLoader.remove(),250)},2000);
const $=s=>document.querySelector(s);let selectedCategory=new URLSearchParams(location.search).get('category')||'All';let cart={};try{cart=JSON.parse(localStorage.getItem('wellnest-cart')||'{}')||{}}catch{cart={}}let toastTimer;
const announcement=$('.announcement');if(announcement)announcement.innerHTML='Thoughtful essentials, delivered with care <span aria-hidden="true">·</span> <a href="services.html">How Stackly works <span aria-hidden="true">→</span></a>';
const headerActions=$('.site-header .header-actions'),headerAccount=headerActions?.querySelector('a[href="login.html"]'),headerHelp=headerActions?.querySelector('.header-help[href="contact.html"]');if(headerHelp)headerHelp.href='create-account.html';if(headerAccount&&!headerAccount.classList.contains('header-help')){headerAccount.className='header-help';headerAccount.removeAttribute('aria-label');headerAccount.textContent='Sign in';const helpLink=document.createElement('a');helpLink.className='header-help';helpLink.href='create-account.html';helpLink.textContent='Need help?';headerActions.insertBefore(helpLink,headerAccount)}
const rupees=n=>'₹'+Number(n).toLocaleString('en-IN');
function renderProducts(){const grid=$('#product-grid');if(!grid)return;const search=$('#search-input');const sort=$('#sort-select');const query=(search?.value||'').trim().toLowerCase();let list=products.filter(p=>(selectedCategory==='All'||p.category===selectedCategory)&&`${p.name} ${p.category}`.toLowerCase().includes(query));if(sort?.value==='price-low')list.sort((a,b)=>a.price-b.price);if(sort?.value==='price-high')list.sort((a,b)=>b.price-a.price);if($('#results-count'))$('#results-count').textContent=`${list.length} thoughtful finds`;if($('#empty-state'))$('#empty-state').hidden=!!list.length;grid.innerHTML=list.map(p=>`<article class="product-card"><div class="product-art"><span class="product-tag">${p.tag}</span><img loading="lazy" src="assets/${p.image}.webp" alt="${p.name}"><button class="quick-add" data-add="${p.id}" aria-label="Add ${p.name} to bag">+</button></div><div class="product-info"><span class="product-category">${p.category}</span><span class="product-rating">${p.rating}</span><h3>${p.name}</h3><p class="product-description">${p.description}</p><div class="product-price">${rupees(p.price)} ${p.oldPrice?`<del>${rupees(p.oldPrice)}</del>`:''}</div></div></article>`).join('');document.querySelectorAll('.filter-pill').forEach(el=>el.classList.toggle('selected',el.dataset.category===selectedCategory))}
function renderCart(){const itemList=$('#cart-items');if(!itemList)return;const items=Object.entries(cart).filter(([,q])=>q>0);const count=items.reduce((n,[,q])=>n+q,0);const total=items.reduce((n,[id,q])=>n+(products.find(p=>p.id===Number(id))?.price||0)*q,0);if($('#cart-count'))$('#cart-count').textContent=count;if($('#drawer-count'))$('#drawer-count').textContent=`(${count})`;if($('#cart-total'))$('#cart-total').textContent=rupees(total);if($('#cart-empty'))$('#cart-empty').style.display=count?'none':'block';if($('#drawer-foot'))$('#drawer-foot').style.display=count?'block':'none';itemList.innerHTML=items.map(([id,q])=>{const p=products.find(x=>x.id===Number(id));if(!p)return '';return `<article class="cart-item"><img src="assets/${p.image}.webp" alt=""><div><h3>${p.name}</h3><span class="item-price">${rupees(p.price)}</span><div class="quantity"><button data-qty="${id}" data-delta="-1" aria-label="Remove one">−</button><span>${q}</span><button data-qty="${id}" data-delta="1" aria-label="Add one">+</button></div></div><button class="remove-item" data-remove="${id}" aria-label="Remove ${p.name}">×</button></article>`}).join('');const left=Math.max(0,499-total);if($('#delivery-message'))$('#delivery-message').textContent=left?`You're ${rupees(left)} away from free delivery`:'Lovely! Your delivery is on us.'}
function saveCart(){localStorage.setItem('wellnest-cart',JSON.stringify(cart));renderCart()}function showToast(message){const toast=$('#toast');if(!toast)return;toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2200)}
function addToCart(id){cart[id]=(cart[id]||0)+1;saveCart();showToast(`${products.find(p=>p.id===id)?.name||'Item'} added to your bag`)}
function startHeroSlideshow(){const slides=[...document.querySelectorAll('.home-hero-visual .hero-slide')];if(slides.length<2||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;let active=0;window.setInterval(()=>{slides[active].classList.remove('is-active');active=(active+1)%slides.length;slides[active].classList.add('is-active')},5000)}
function openCart(){const drawer=$('#cart-drawer'),overlay=$('#overlay');if(!drawer||!overlay)return;drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');overlay.classList.add('open');document.body.style.overflow='hidden'}function closeCart(){const drawer=$('#cart-drawer'),overlay=$('#overlay');drawer?.classList.remove('open');drawer?.setAttribute('aria-hidden','true');overlay?.classList.remove('open');document.body.style.overflow=''}
document.addEventListener('click',e=>{
  if(document.body.classList.contains('not-found-page'))return;
  const imageLink=e.target.closest('a[href]');
  if(imageLink?.querySelector('img')&&!imageLink.matches('.brand,.footer-brand-logo,.dashboard-brand,.dashboard-page-card')){e.preventDefault();e.stopImmediatePropagation();return}
},true);
const salemMapLink=$('.ct-location-copy a');
if(salemMapLink)salemMapLink.href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('MMR Complex, Chinna Thirupathi, Salem, Tamil Nadu 636008, India');
document.querySelectorAll('.ct-branch-grid article a').forEach(mapLink=>{mapLink.href='404.html';mapLink.removeAttribute('target')});
document.querySelectorAll('.footer-contact').forEach(contact=>{if(contact.querySelector('a[href^="tel:"]'))return;const phone=document.createElement('a');phone.href='tel:+919565437865';phone.textContent='+91 95654 37865';phone.setAttribute('aria-label','Call Stackly at +91 95654 37865');contact.insertBefore(phone,contact.querySelector('p'))});
const contactInfo=$('.ct-contact-info');if(contactInfo&&!contactInfo.querySelector('a[href^="tel:"]')){const phone=document.createElement('a');phone.className='ct-info-card';phone.href='tel:+919565437865';phone.innerHTML='<span class="ct-info-icon" aria-hidden="true">☎</span><span><small>PHONE</small><b>+91 95654 37865</b><em>Call our support team</em></span><span class="ct-arrow" aria-hidden="true">↗</span>';contactInfo.insertBefore(phone,contactInfo.querySelector('.ct-info-card')?.nextElementSibling)}
$('#search-input')?.addEventListener('input',renderProducts);$('#sort-select')?.addEventListener('change',renderProducts);$('#reset-filters')?.addEventListener('click',()=>{if($('#search-input'))$('#search-input').value='';selectedCategory='All';renderProducts()});
document.addEventListener('click',e=>{const add=e.target.closest('[data-add]');if(add){addToCart(Number(add.dataset.add));return}const pill=e.target.closest('.filter-pill');if(pill?.dataset.category){selectedCategory=pill.dataset.category;renderProducts();return}const qty=e.target.closest('[data-qty]');if(qty){const id=qty.dataset.qty;cart[id]=Math.max(0,(cart[id]||0)+Number(qty.dataset.delta));if(!cart[id])delete cart[id];saveCart();return}const remove=e.target.closest('[data-remove]');if(remove){delete cart[remove.dataset.remove];saveCart()}});
function setNavigationOpen(open){const nav=$('.main-nav'),toggle=$('#menu-toggle');nav?.classList.toggle('show',open);toggle?.setAttribute('aria-expanded',String(open));toggle?.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu')}
const mainNavigation=$('.main-nav'),accountLink=$('.account-btn')||$('.header-help[href="login.html"]');if(mainNavigation){mainNavigation.id=mainNavigation.id||'primary-navigation';mainNavigation.setAttribute('aria-label','Main navigation')}const menuToggle=$('#menu-toggle');menuToggle?.setAttribute('aria-expanded','false');if(mainNavigation)menuToggle?.setAttribute('aria-controls',mainNavigation.id);
if(mainNavigation&&accountLink){const mobileAccountLink=document.createElement('a');mobileAccountLink.className='mobile-nav-account';mobileAccountLink.href=accountLink.getAttribute('href');mobileAccountLink.textContent='Sign in';mainNavigation.append(mobileAccountLink)}
const needHelpLink=$('.site-header .header-help[href="create-account.html"]');if(mainNavigation&&needHelpLink){const mobileHelpLink=document.createElement('a');mobileHelpLink.className='mobile-nav-account';mobileHelpLink.href=needHelpLink.href;mobileHelpLink.textContent='Need help?';mainNavigation.append(mobileHelpLink)}
$('#open-cart')?.addEventListener('click',openCart);$('#close-cart')?.addEventListener('click',closeCart);$('#overlay')?.addEventListener('click',closeCart);$('#checkout-btn')?.addEventListener('click',()=>showToast('Checkout is ready to connect to your payment service.'));$('#menu-toggle')?.addEventListener('click',()=>setNavigationOpen(!$('.main-nav')?.classList.contains('show')));document.querySelectorAll('.main-nav a').forEach(link=>link.addEventListener('click',()=>setNavigationOpen(false)));document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeCart();setNavigationOpen(false)}});
$('#newsletter-form')?.addEventListener('submit',e=>{e.preventDefault();const email=$('#email-input'),message=$('#newsletter-message');if(!email?.value.trim()){email?.setCustomValidity('Please enter your email address.');email?.reportValidity();return}email.setCustomValidity('');if(!email.checkValidity()){email.reportValidity();return}if(message)message.textContent='You’re on the list. Check your inbox for a little welcome treat.';email.value='';showToast('Thanks for joining the Stackly community!')});
$('#email-input')?.addEventListener('input',e=>e.currentTarget.setCustomValidity(''));
$('#contact-form')?.addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget,required=[...form.querySelectorAll('[required]')],firstInvalid=required.find(field=>!field.value.trim()||(field.type==='email'&&!field.checkValidity()));if(firstInvalid){firstInvalid.setCustomValidity(!firstInvalid.value.trim()?'Please complete this field.':'Please enter a valid email address.');firstInvalid.reportValidity();firstInvalid.focus();return}required.forEach(field=>field.setCustomValidity(''));if($('#contact-message'))$('#contact-message').textContent='Thanks for reaching out. Your note is ready for our care team.';form.reset();showToast('Your message has been received.')});
$('#contact-form [required]')&&document.querySelectorAll('#contact-form [required]').forEach(field=>field.addEventListener('input',()=>field.setCustomValidity('')));
document.querySelectorAll('.faq-list details').forEach(item=>{const summary=item.querySelector('summary');if(summary&&!summary.querySelector('span'))summary.insertAdjacentHTML('beforeend','<span>＋</span>')});startHeroSlideshow();renderProducts();renderCart();

// Login and account creation preview interactions
const loginRoles=document.querySelectorAll('[data-login-role]');
loginRoles.forEach(button=>button.addEventListener('click',()=>{
  const role=button.dataset.loginRole;
  loginRoles.forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active))});
  const label=$('#login-email-label'),email=$('#login-email'),prompt=$('#login-mode-prompt'),status=$('#login-status'),heading=$('#login-heading'),intro=$('#login-intro');
  const admin=role==='admin';
  if(label)label.textContent=admin?'Work email':'Email address';
  if(email)email.placeholder=admin?'staff@stackly.example':'you@example.com';
  if(prompt)prompt.hidden=admin;
  if(heading)heading.textContent=admin?'Staff sign in':'Welcome back';
  if(intro)intro.textContent=admin?'Use your assigned Stackly staff account to continue.':'Sign in to continue to your account.';
  if(status)status.textContent=admin?'Admin and staff accounts are managed by Stackly.':'Sign-in is a front-end preview; authentication is not connected yet.';
}));
$('#toggle-password')?.addEventListener('click',e=>{const input=$('#login-password');if(!input)return;const visible=input.type==='password';input.type=visible?'text':'password';e.currentTarget.textContent=visible?'Hide':'Show';e.currentTarget.setAttribute('aria-label',visible?'Hide password':'Show password')});
const loginEmailFromUrl=new URLSearchParams(location.search).get('email');if(loginEmailFromUrl&&$('#login-email'))$('#login-email').value=loginEmailFromUrl;
const loginPasswordIsValid=value=>value.length>=8&&/[A-Z]/.test(value)&&/[a-z]/.test(value)&&/[0-9]/.test(value)&&/[^A-Za-z0-9\s]/.test(value);
const loginPasswordMessage='Password must be 8+ characters and include uppercase, lowercase, a number, and a special character.';
$('#login-password')?.addEventListener('input',e=>{const password=e.currentTarget,valid=loginPasswordIsValid(password.value),error=$('#login-password-error');if(valid){password.setAttribute('aria-invalid','false');if(error)error.textContent=''}else if(password.getAttribute('aria-invalid')==='true'&&error)error.textContent=loginPasswordMessage});
$('#login-form')?.addEventListener('submit',e=>{e.preventDefault();const password=$('#login-password'),status=$('#login-status'),error=$('#login-password-error');if(!password||!loginPasswordIsValid(password.value)){if(password){password.setAttribute('aria-invalid','true');password.focus()}if(error)error.textContent=loginPasswordMessage;if(status)status.textContent='Please check your password.';return}password.setAttribute('aria-invalid','false');if(error)error.textContent='';const role=document.querySelector('[data-login-role].active')?.dataset.loginRole||'customer';const email=$('#login-email')?.value||'';localStorage.setItem('stackly-demo-session',JSON.stringify({role,email}));location.href='dashboard.html'});
$('#toggle-create-password')?.addEventListener('click',e=>{const input=$('#create-password');if(!input)return;const visible=input.type==='password';input.type=visible?'text':'password';e.currentTarget.textContent=visible?'Hide':'Show';e.currentTarget.setAttribute('aria-label',visible?'Hide password':'Show password')});
$('#toggle-confirm-password')?.addEventListener('click',e=>{const input=$('#create-confirm-password');if(!input)return;const visible=input.type==='password';input.type=visible?'text':'password';e.currentTarget.textContent=visible?'Hide':'Show';e.currentTarget.setAttribute('aria-label',visible?'Hide confirm password':'Show confirm password')});
const createForm=$('#create-account-form');
const createName=$('#create-name'),createNumber=$('#create-number'),createEmail=$('#create-email'),createPassword=$('#create-password'),createConfirm=$('#create-confirm-password'),createTerms=$('#create-terms');
createName?.addEventListener('input',()=>{createName.value=createName.value.replace(/[^\p{L}\s]/gu,'')});
createNumber?.addEventListener('input',()=>{createNumber.value=createNumber.value.replace(/\D/g,'').slice(0,10)});
createForm?.addEventListener('submit',e=>{
  e.preventDefault();
  const status=$('#create-account-status');
  const errors={name:'',number:'',email:'',password:'',confirm:'',terms:''};
  const name=createName.value.trim(),number=createNumber.value.trim(),email=createEmail.value.trim(),password=createPassword.value;
  if(!name)errors.name='Please enter your name.';
  else if(!/^\p{L}+(?:\s+\p{L}+)*$/u.test(name))errors.name='Please use letters only for your name.';
  if(!number)errors.number='Please enter your phone number.';
  else if(!/^\d{10}$/.test(number))errors.number='Please enter a 10-digit phone number.';
  if(!email)errors.email='Please enter your email address.';
  else if(!/^[^\s@]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/.test(email))errors.email='Please enter a valid email address.';
  if(!password)errors.password='Please enter a password.';
  else if(password.length<8||!/[A-Z]/.test(password)||!/[a-z]/.test(password)||!/[0-9]/.test(password)||!/[^A-Za-z0-9]/.test(password))errors.password='Password must be 8+ characters and include uppercase, lowercase, a number, and a special character.';
  if(!createConfirm.value)errors.confirm='Please confirm your password.';
  else if(password!==createConfirm.value)errors.confirm='Your passwords do not match.';
  if(!createTerms.checked)errors.terms='Please accept the terms to continue.';
  const fields={name:createName,number:createNumber,email:createEmail,password:createPassword,confirm:createConfirm,terms:createTerms};
  let firstInvalid=null;
  Object.entries(errors).forEach(([key,message])=>{
    const field=fields[key],error=$(`#create-${key}-error`);
    if(error)error.textContent=message;
    if(field){field.setAttribute('aria-invalid',String(!!message));if(message&&!firstInvalid)firstInvalid=field}
  });
  if(firstInvalid){if(status)status.textContent='Please review the highlighted fields.';firstInvalid.focus();return}
  if(status)status.textContent='Details validated. Taking you to sign in…';
  const submit=createForm.querySelector('[type="submit"]');if(submit)submit.disabled=true;
  window.setTimeout(()=>{location.href=`login.html?email=${encodeURIComponent(email)}`},500);
});
const dashboardRoot=$('#dashboard-root');
if(dashboardRoot){
  let session={role:'customer',email:''};try{session={...session,...JSON.parse(localStorage.getItem('stackly-demo-session')||'{}')}}catch{}
  const admin=session.role==='admin';const email=session.email||'Stackly customer';
  const hour=new Date().getHours();const dayGreeting=hour<12?'Good morning':hour<17?'Good afternoon':'Good evening';
  const emailName=(session.email||'').split('@')[0].replace(/[._-]+/g,' ').trim();
  const greetingName=emailName?emailName.replace(/\b\w/g,char=>char.toUpperCase()):'there';
  document.body.classList.toggle('dashboard-admin',admin);
  if($('#dashboard-greeting'))$('#dashboard-greeting').textContent=`${dayGreeting}, ${greetingName}`;
  if($('#dashboard-subtitle'))$('#dashboard-subtitle').textContent=admin?'Here’s a clear view of your Stackly store today.':'Your everyday care, all together in one place.';
  if($('#dashboard-welcome-kicker'))$('#dashboard-welcome-kicker').textContent=admin?'STORE WORKSPACE':'YOUR STACKLY SPACE';
  const primaryAction=$('#dashboard-primary-action');if(primaryAction){primaryAction.href='shop.html';primaryAction.innerHTML=admin?'Open product catalogue <span>→</span>':'Continue shopping <span>→</span>'}
  if($('#dashboard-role'))$('#dashboard-role').textContent=admin?'ADMIN & STAFF PREVIEW':'CUSTOMER ACCOUNT';
  if($('#dashboard-user-name'))$('#dashboard-user-name').textContent=email;
  document.querySelectorAll('[data-admin-only]').forEach(el=>el.hidden=!admin);
  document.querySelectorAll('[data-customer-only]').forEach(el=>el.hidden=admin);
  document.addEventListener('click',e=>{
    if(!document.body.classList.contains('dashboard-page'))return;
    const navLink=e.target.closest('.dashboard-nav a[href]');
    if(navLink){
      e.preventDefault();
      const target=(navLink.getAttribute('href')||'').split('?')[0];
      const overview=$('.dashboard-content'),pageView=$('#dashboard-page-view');
      document.querySelectorAll('.dashboard-nav a').forEach(item=>item.classList.toggle('selected',item===navLink));
      if(target==='dashboard.html'){
        if(pageView)pageView.hidden=true;
        if(overview)overview.hidden=false;
        return;
      }
      const views={
        'shop.html':{title:admin?'Store catalogue':'Shop essentials',kicker:admin?'CATALOGUE WORKSPACE':'THOUGHTFUL EVERYDAY FINDS',intro:admin?'Review the Stackly assortment, understand each range, and use the product catalogue to browse current items.':'Browse everyday wellness, personal care, and first-aid essentials. Choose a category that fits the routine or need you have in mind.',cards:[['VITAMINS & WELLNESS','Daily supplements and wellness basics','Find vitamins, hydration products, and simple additions to everyday routines. Check product labels and ask a healthcare professional when you are unsure what is right for you.'],['PERSONAL CARE','Comfortable care for daily routines','Explore skin, body, sun-care, and personal-care essentials chosen for regular use. Compare product details and directions before adding a new step.'],['FIRST AID','Practical home and travel basics','Browse bandages and useful first-aid basics for a home kit or travel bag. For urgent or serious injuries, seek professional medical care.']],detailsTitle:admin?'Catalogue overview':'A thoughtful way to browse',detailsIntro:admin?'Use the product ranges below to review how the catalogue is organized.':'Start with what you need, then review the product information before choosing.',details:[['01','Choose a category','Start with wellness, personal care, or first aid to narrow the range.'],['02','Review product information','Check ingredients, directions, warnings, and pack details on each item.'],['03','Build your everyday kit','Keep frequently used essentials easy to find and replace items as needed.']]},
        'contact.html':{title:admin?'Customer support':'Get support',kicker:admin?'SUPPORT WORKSPACE':'WE’RE HERE TO HELP',intro:admin?'Find Stackly support details and a clear path for helping customers with common product, order, and service questions.':'Questions about a product, order, or service? Choose a contact method and share a few details so our team can point you in the right direction.',cards:[['CALL US','+91 95654 37865','Monday–Saturday, 9:00 am–6:00 pm. Phone support is best for a quick question or help finding the right service.'],['EMAIL','hello@stackly.example','Send a note any time. Include a way for the team to reply and avoid sending sensitive medical or payment information.'],['VISIT','Salem, Tamil Nadu','Our Salem branch is listed on the Contact page along with map details. Ask the team about local services before visiting.']],detailsTitle:admin?'Support checklist':'How to get help',detailsIntro:admin?'A few clear details help the team resolve customer questions more efficiently.':'A little context helps us route your question to the right place.',details:[['PRODUCT','Name the item','Include the product name and the question you have about its details or use.'],['ORDER','Share a reference','For order questions, include the order reference if available. Never include card numbers or passwords.'],['SERVICE','Tell us your location','Availability can vary by branch, so mention your city when asking about a local service.']]},
        'journal.html':{title:admin?'Editorial workspace':'The Stackly Journal',kicker:admin?'CONTENT & EDUCATION':'GOOD NOTES, NOW AND THEN',intro:admin?'Review the educational themes used across Stackly. Keep content practical, clearly sourced, and distinct from diagnosis or individual treatment advice.':'Useful reads for everyday wellbeing, personal care, and building steady routines. These short guides are general information, not a substitute for individual medical advice.',cards:[['EVERYDAY WELLNESS','Small habits that fit real life','A practical look at making a simple routine easier to repeat, from keeping essentials visible to choosing one manageable daily habit.'],['PERSONAL CARE','A thoughtful daily routine','How to review product directions, introduce new personal-care products gradually, and pause use if irritation occurs.'],['FIRST AID','Prepared for the little surprises','A starter checklist for keeping common first-aid basics organized and knowing when a situation needs professional care.']],detailsTitle:admin?'Editorial review themes':'More to explore',detailsIntro:admin?'Use these checks when preparing or reviewing educational material.':'Pick a topic and build your everyday care knowledge one useful note at a time.',details:admin?[['ACCURACY','Check claims and sources','Keep health statements accurate, appropriately qualified, and supported by reliable references.'],['CLARITY','Use plain language','Explain unfamiliar terms and organize information so readers can find the practical takeaway.'],['BOUNDARIES','Keep advice in scope','Make clear that general content does not replace guidance from a qualified healthcare professional.']]:[['WELLNESS','Make routines manageable','Small, consistent steps can be easier to maintain than a complicated plan. Adapt routines to your needs and seek qualified guidance for health concerns.'],['PERSONAL CARE','Read the label first','Product directions, ingredients, and warnings matter. If you have a known sensitivity, review the label carefully before use.'],['SAFETY','Know when to ask for help','General articles cannot diagnose or treat a condition. Contact a qualified healthcare professional when symptoms are concerning or persistent.']]}
      };
      const view=views[target];
      if(!view||!pageView)return;
      if(overview)overview.hidden=true;
      pageView.hidden=false;
      pageView.innerHTML=`<section class="dashboard-view-card"><span class="dashboard-kicker">${view.kicker}</span><h1>${view.title}</h1><p>${view.intro}</p><div class="dashboard-metrics dashboard-workspace-cards">${view.cards.map(([label,title,copy])=>`<article class="dashboard-metric"><div><small>${label}</small><h2>${title}</h2><p>${copy}</p></div></article>`).join('')}</div><section class="dashboard-pages-section dashboard-workspace-details"><div class="dashboard-pages-heading"><div><span class="dashboard-kicker">MORE INFORMATION</span><h2>${view.detailsTitle}</h2><p>${view.detailsIntro}</p></div><span class="dashboard-panel-mark">✦</span></div><div class="dashboard-pages-grid">${view.details.map(([label,title,copy])=>`<article class="dashboard-page-card dashboard-workspace-detail"><div class="dashboard-page-card-copy"><small>${label}</small><b>${title}</b><span>${copy}</span></div></article>`).join('')}</div></section></section>`;
      pageView.scrollTop=0;
      return;
    }
    const signOut=e.target.closest('#dashboard-signout');
    if(signOut){
      e.preventDefault();
      localStorage.removeItem('stackly-demo-session');
      location.href='login.html';
      return;
    }
    const control=e.target.closest('a[href],button');if(!control)return;
    e.preventDefault();
    location.href='404.html';
  });
}
