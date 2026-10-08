'use strict';
var S='pop',CURP=null,SZ=0,CUR='',lastFocus=null,first=true;
var DEF_D='AYAL FLOWERS — авторские букеты из свежих цветов. Каталог, цены, доставка в день заказа.';
var $=function(id){return document.getElementById(id)};
function L(p){return MODE==='hash'?'#'+p:p}
function here(){var p=MODE==='hash'?location.hash.replace(/^#/,''):location.pathname;return p.replace(/\/+$/,'')||'/'}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function plural(n,f){var a=n%10,b=n%100;return n+' '+(a===1&&b!==11?f[0]:a>=2&&a<=4&&(b<12||b>14)?f[1]:f[2])}
function tel(){return C.tel.replace(/[^\d+]/g,'')}
function catOf(id){return CATS.filter(function(c){return c[0]===id})[0]}
function cn(id){return catOf(id)[1]}
function getP(id){return P.filter(function(x){return x.id===id})[0]}
function art(p,lbl){
 if(p.img)return '<img src="'+esc(p.img)+'" alt="'+(lbl?esc(p.n):'')+'" loading="'+(lbl?'eager':'lazy')+'" decoding="async">';
 var c=p.col,s='<svg viewBox="0 0 300 300" '+(lbl?'role="img" aria-label="'+esc(p.n)+'"':'aria-hidden="true"')+'><rect width="300" height="300" fill="'+BG[p.id%4]+'"/>';
 [-52,-26,0,26,52].forEach(function(a,i){s+='<ellipse cx="150" cy="112" rx="13" ry="64" fill="'+(i%2?'#6E7B3F':'#55622E')+'" transform="rotate('+a+' 150 190)"/>'});
 [[150,92,36],[104,112,29],[196,112,29],[126,66,25],[176,68,25],[150,138,27],[86,142,20],[214,142,20]].forEach(function(q,i){var col=c[i%3],x=q[0],y=q[1],r=q[2];
  if(p.t==='d'){for(var k=0;k<9;k++)s+='<ellipse cx="'+x+'" cy="'+(y-r*.55)+'" rx="'+r*.24+'" ry="'+r*.55+'" fill="'+col+'" stroke="#0000001a" stroke-width=".6" transform="rotate('+k*40+' '+x+' '+y+')"/>';s+='<circle cx="'+x+'" cy="'+y+'" r="'+r*.22+'" fill="#E2B93B"/>'}
  else s+='<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+col+'"/><circle cx="'+x+'" cy="'+y+'" r="'+r*.7+'" fill="#fff" fill-opacity=".22" stroke="#0000001f" stroke-width=".8"/><circle cx="'+x+'" cy="'+y+'" r="'+r*.42+'" fill="#000" fill-opacity=".1"/><circle cx="'+(x-r*.1)+'" cy="'+(y-r*.1)+'" r="'+r*.18+'" fill="#fff" fill-opacity=".3"/>'});
 return s+'<polygon points="82,172 218,172 166,292 134,292" fill="#F7F3EA"/><polygon points="82,172 152,190 134,292" fill="#E2D7BF"/><polygon points="116,214 184,214 181,230 119,230" fill="#4F5B2A"/></svg>'}
function card(p){return '<a class="card" href="'+L('/product/'+p.id)+'"><div class="im">'+art(p)+(p.hit?'<span class="tag">Хит</span>':'')+'</div><h3>'+p.n+'</h3><small>'+cn(p.cat)+'</small><div class="pr">от '+p.p+' €</div></a>'}
function list(cat){var a=P.filter(function(p){return !cat||p.cat===cat});
 if(S==='lo')a.sort(function(x,y){return x.p-y.p});else if(S==='hi')a.sort(function(x,y){return y.p-x.p});else a.sort(function(x,y){return y.hit-x.hit||x.id-y.id});
 return a.map(card).join('')}
function home(){var pop=P.slice().sort(function(a,b){return b.hit-a.hit||a.id-b.id}).slice(0,8).map(card).join('');
 return '<section class="hero"><div><h1>Цветы, которые говорят <em>вместо слов</em></h1><p>AYAL FLOWERS — авторские букеты из свежих цветов. Выберите в каталоге, нажмите «Заказать» — остальное мы возьмём на себя.</p><div class="btns"><button class="btn" data-act="order">Заказать букет</button><a class="btn o" href="'+L('/catalog')+'">Смотреть каталог</a></div></div><div class="arch">'+art(P[0])+'</div></section>'
 +'<section class="sec"><div class="sh"><h2>Категории</h2></div><div class="cats">'+CATS.map(function(c){return '<a class="cat" href="'+L('/catalog/'+c[0])+'"><i style="background:'+c[2]+'"></i><div><b>'+c[1]+'</b><span>'+plural(P.filter(function(p){return p.cat===c[0]}).length,['букет','букета','букетов'])+'</span></div></a>'}).join('')+'</div></section>'
 +'<section class="sec"><div class="sh"><h2>Популярное</h2><a href="'+L('/catalog')+'">Весь каталог</a></div><div class="g">'+pop+'</div></section>'
 +'<section class="sec"><div class="sh"><h2>Почему AYAL</h2></div><div class="feat"><div class="f"><b>Свежесть</b><p>Цветы приходят небольшими партиями и не лежат на складе.</p></div><div class="f"><b>Ручная сборка</b><p>Каждый букет собирает флорист, а не конвейер.</p></div><div class="f"><b>Фото перед отправкой</b><p>Покажем готовый букет и только потом отправим курьера.</p></div></div></section>'
 +'<section class="sec"><div class="sh"><h2>Как заказать</h2></div><div class="feat"><div class="f"><i>01</i><b>Выберите букет</b><p>Откройте карточку, выберите размер.</p></div><div class="f"><i>02</i><b>Напишите нам</b><p>WhatsApp, Telegram или звонок — как удобнее.</p></div><div class="f"><i>03</i><b>Получите цветы</b><p>Доставим в день заказа или к нужному часу.</p></div></div></section>'
 +'<section class="band"><h2>Подберём букет под повод</h2><button class="btn" data-act="order">Заказать букет</button></section>'}
function catalog(c){CUR=c||'';var n=P.filter(function(p){return !CUR||p.cat===CUR}).length;
 return '<div class="ph"><h1>'+(CUR?cn(CUR):'Каталог')+'</h1></div><div class="chips" style="margin-top:20px"><a class="chip'+(CUR?'':' on')+'" href="'+L('/catalog')+'">Все</a>'+CATS.map(function(x){return '<a class="chip'+(CUR===x[0]?' on':'')+'" href="'+L('/catalog/'+x[0])+'">'+x[1]+'</a>'}).join('')+'</div><div class="bar2"><span>'+plural(n,['букет','букета','букетов'])+'</span><select data-sort aria-label="Сортировка"><option value="pop"'+(S==='pop'?' selected':'')+'>Популярные</option><option value="lo"'+(S==='lo'?' selected':'')+'>Сначала дешевле</option><option value="hi"'+(S==='hi'?' selected':'')+'>Сначала дороже</option></select></div><div class="g" id="grid">'+list(CUR)+'</div>'}
function price(){return Math.round(CURP.p*SZS[SZ][2])}
function product(p){CURP=p;SZ=0;
 var rel=P.filter(function(x){return x.cat===p.cat&&x.id!==p.id}).concat(P.filter(function(x){return x.cat!==p.cat&&x.hit})).slice(0,4).map(card).join('');
 return '<a href="'+L('/catalog/'+p.cat)+'" style="display:inline-block;padding-top:18px;font-size:14px;color:var(--mut)">← '+cn(p.cat)+'</a><div class="pd"><div class="im">'+art(p,1)+'</div><div><h1>'+p.n+'</h1><div class="big" id="pp">'+price()+' €</div><div class="lbl">Размер</div><div class="sz" id="sz">'+SZS.map(function(z,i){return '<button data-act="pick" data-i="'+i+'" aria-pressed="'+(i===SZ)+'">'+z[0]+'<small>'+z[1]+'</small></button>'}).join('')+'</div><div class="lbl">Состав</div><p style="margin:0">'+p.comp+'</p><p style="color:var(--mut)">'+DESC[p.cat]+'</p><div class="lbl">Условия</div><ul><li>Доставка в день заказа</li><li>Открытка с вашим текстом — бесплатно</li><li>Фото букета перед отправкой</li></ul><button class="btn dk" data-act="orderP">Заказать букет</button></div></div>'
 +'<section class="sec"><div class="sh"><h2>Вам может понравиться</h2></div><div class="g">'+rel+'</div></section><div class="bar"><div><small style="color:var(--mut);display:block;line-height:1.2">Итого</small><b id="bp">'+price()+' €</b></div><button class="btn" data-act="orderP">Заказать</button></div>'}
function pick(i){SZ=i;[].forEach.call(document.querySelectorAll('#sz button'),function(b,j){b.setAttribute('aria-pressed',j===i)});$('pp').textContent=$('bp').textContent=price()+' €'}
function orderP(){order('Здравствуйте! Хочу заказать букет «'+CURP.n+'», размер '+SZS[SZ][0]+' ('+price()+' €).')}
function order(t){t=t||'Здравствуйте! Хочу заказать букет.';$('wa').href='https://wa.me/'+C.wa+'?text='+encodeURIComponent(t);$('tg').href='https://t.me/'+C.tg;$('tl').href='tel:'+tel();lastFocus=document.activeElement;$('ov').hidden=false;document.body.classList.add('lock');$('wa').focus()}
function closeO(){$('ov').hidden=true;document.body.classList.remove('lock');if(lastFocus&&lastFocus.focus)lastFocus.focus()}
function about(){return '<div class="tx"><h1>О нас</h1><p>AYAL FLOWERS — небольшая флористическая студия. Мы верим, что хороший букет не нужно объяснять: он говорит сам.</p><h2>Как мы работаем</h2><p>Закупаем цветы небольшими партиями, подбираем сочетания по сезону и собираем каждый букет вручную в фирменной упаковке.</p><h2>Чего хотим</h2><p>Чтобы выбрать и заказать цветы было так же приятно, как их получить: просто, красиво и без лишних шагов.</p><p><button class="btn" data-act="order">Заказать букет</button></p></div>'}
function delivery(){return '<div class="tx"><h1>Доставка</h1><div class="cl"><div>По городу<span>от 7 €</span></div><div>Бесплатно<span>от 80 €</span></div><div>Срочно за 2 часа<span>+10 €</span></div><div>Самовывоз<span>бесплатно</span></div></div><h2>Сроки</h2><p>Заказ до 17:00 доставим в тот же день. Можно выбрать удобное двухчасовое окно.</p><h2>Оплата</h2><p>Онлайн-переводом, картой или наличными курьеру.</p></div>'}
function contacts(){return '<div class="tx"><h1>Контакты</h1><div class="cl"><a href="https://wa.me/'+C.wa+'" target="_blank" rel="noopener">WhatsApp<span>Написать</span></a><a href="https://t.me/'+C.tg+'" target="_blank" rel="noopener">Telegram<span>@'+C.tg+'</span></a><a href="tel:'+tel()+'">Телефон<span>'+C.tel+'</span></a><a href="mailto:'+C.mail+'">E-mail<span>'+C.mail+'</span></a><div>Адрес<span>'+C.addr+'</span></div><div>Часы работы<span>'+C.hours+'</span></div></div></div>'}
function notfound(){return '<div class="tx"><h1>Страница не найдена</h1><p>Такой страницы нет. Загляните в каталог — там много красивых букетов.</p><p><a class="btn" href="'+L('/catalog')+'">Открыть каталог</a></p></div>'}
function foot(){return '<div><b class="serif" style="font-size:24px;letter-spacing:.2em;color:var(--olive)">AYAL FLOWERS</b>Цветы, которые говорят вместо слов.<br>© '+new Date().getFullYear()+'</div><div><b>Разделы</b><a href="'+L('/catalog')+'">Каталог</a><a href="'+L('/about')+'">О нас</a><a href="'+L('/delivery')+'">Доставка</a><a href="'+L('/contacts')+'">Контакты</a></div><div><b>Связь</b><a href="tel:'+tel()+'">'+C.tel+'</a><span>'+C.hours+'</span></div>'}
var PAGES={about:[about,'О нас'],delivery:[delivery,'Доставка'],contacts:[contacts,'Контакты']};
function meta(t,d,bad){document.title=t;$('desc').content=d;$('ogt').content=t;$('ogd').content=d;$('robots').content=bad?'noindex':'index,follow';if(MODE==='path')$('canon').href=location.origin+here()}
function route(){var s=here().split('/').filter(Boolean),h,t='AYAL FLOWERS — авторские букеты',d=DEF_D,bad=false,p;CURP=null;
 if(!s.length)h=home();
 else if(s[0]==='catalog'&&s.length<3&&(!s[1]||catOf(s[1]))){h=catalog(s[1]);t=(s[1]?cn(s[1])+' — ':'')+'Каталог — AYAL FLOWERS';d='Каталог AYAL FLOWERS: '+(s[1]?cn(s[1]).toLowerCase()+', ':'')+'актуальные цены, доставка в день заказа.'}
 else if(s[0]==='product'&&s.length===2&&/^\d+$/.test(s[1])&&(p=getP(+s[1]))){h=product(p);t=p.n+' — AYAL FLOWERS';d=p.n+': '+p.comp+'. От '+p.p+' €. Доставка в день заказа.'}
 else if(s.length===1&&PAGES[s[0]]){h=PAGES[s[0]][0]();t=PAGES[s[0]][1]+' — AYAL FLOWERS'}
 else{h=notfound();t='Страница не найдена — AYAL FLOWERS';bad=true}
 $('app').innerHTML=h;$('ft').innerHTML=foot();meta(t,d,bad);window.scrollTo(0,0);
 $('nav').classList.remove('open');$('bg').setAttribute('aria-expanded','false');
 [].forEach.call(document.querySelectorAll('#nav a'),function(a){a.classList.toggle('on',a.dataset.p===s[0])});
 var on=document.querySelector('.chip.on');if(on)on.parentNode.scrollLeft=Math.max(0,on.offsetLeft-18);
 if(!first)$('app').focus({preventScroll:true});first=false}
function go(p){if(p!==here())history.pushState(null,'',p);route()}
document.addEventListener('click',function(e){
 var el=e.target.closest('[data-act]');
 if(el){var a=el.dataset.act;
  if(a==='order')order();else if(a==='orderP')orderP();else if(a==='close')closeO();else if(a==='pick')pick(+el.dataset.i);
  else if(a==='menu'){var o=$('nav').classList.toggle('open');el.setAttribute('aria-expanded',o)}
  else if(a==='skip'){e.preventDefault();$('app').focus()}
  return}
 if(e.target===$('ov')){closeO();return}
 if(MODE!=='path')return;
 var l=e.target.closest('a[href^="/"]');
 if(l&&!l.target&&!e.metaKey&&!e.ctrlKey&&!e.shiftKey&&e.button===0&&l.getAttribute('href').indexOf('//')!==0){e.preventDefault();go(l.getAttribute('href'))}});
document.addEventListener('change',function(e){if(e.target.hasAttribute('data-sort')){S=e.target.value;$('grid').innerHTML=list(CUR)}});
document.addEventListener('keydown',function(e){if($('ov').hidden)return;
 if(e.key==='Escape')closeO();
 else if(e.key==='Tab'){var f=[].slice.call(document.querySelectorAll('#ov .sheet a,#ov .sheet button')),a=f[0],z=f[f.length-1];
  if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
if(MODE==='hash')[].forEach.call(document.querySelectorAll('a[href^="/"]'),function(a){a.setAttribute('href','#'+a.getAttribute('href'))});
window.addEventListener(MODE==='hash'?'hashchange':'popstate',route);
route();
