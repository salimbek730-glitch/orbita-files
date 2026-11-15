const $ = (id) => document.getElementById(id);
let toastTimer;
function toast(message){
  const el = $('toast'); el.textContent = message; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(()=>el.classList.remove('show'),2200);
}

const quotes = [
  ['Katta natijalar kichik qadamlardan boshlanadi.','— NOVA fikri'],
  ['Har bir mutaxassis bir paytlar yangi boshlovchi bo‘lgan.','— Esda tut'],
  ['Mukammal bo‘lishni kutma, boshlashdan boshla.','— Bugungi eslatma'],
  ['Qiziqish — yangi kashfiyotlarning boshlanishi.','— NOVA fikri']
];
let quoteIndex = 0;
function newQuote(){
  quoteIndex = (quoteIndex + 1) % quotes.length;
  $('quoteText').textContent = quotes[quoteIndex][0];
  $('quoteAuthor').textContent = quotes[quoteIndex][1];
}
$('quoteBtn').addEventListener('click', newQuote);
$('surpriseBtn').addEventListener('click', ()=>{
  newQuote(); newColors(); newIdea(); toast('Yangi ilhom tayyor! ✨');
});

$('themeBtn').addEventListener('click', ()=>{
  document.body.classList.toggle('light');
  $('themeBtn').textContent = document.body.classList.contains('light') ? '☾' : '☼';
});

let seconds = 300, timerInterval = null;
function renderTimer(){
  $('timer').textContent = `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;
}
$('timerStart').addEventListener('click', ()=>{
  if(timerInterval){clearInterval(timerInterval);timerInterval=null;$('timerStart').textContent='Davom etish';return;}
  if(seconds<=0) seconds=300;
  $('timerStart').textContent='Pauza';
  timerInterval=setInterval(()=>{
    seconds--; renderTimer();
    if(seconds<=0){clearInterval(timerInterval);timerInterval=null;$('timerStart').textContent='Qayta boshlash';toast('Ajoyib! Diqqat vaqti tugadi 🎉');}
  },1000);
});
$('timerReset').addEventListener('click', ()=>{
  clearInterval(timerInterval);timerInterval=null;seconds=300;renderTimer();$('timerStart').textContent='Boshlash';
});

function randomHex(){return '#'+Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');}
function newColors(){
  const colors=[randomHex(),randomHex(),randomHex()];
  $('swatches').innerHTML=colors.map(c=>`<span style="--swatch:${c}" title="${c}"></span>`).join('');
}
$('colorBtn').addEventListener('click',newColors);

const ideas=[
  'O‘zing yoqtirgan mavzu haqida mini veb-sahifa yarat.',
  'Bir haftalik maqsadlaring uchun oddiy reja tuz.',
  'Do‘stingga foydali bo‘ladigan kichik kalkulyator yasab ko‘r.',
  'Bugun o‘rgangan 3 ta yangi narsangni yozib qo‘y.',
  'Xonang yoki ish joying uchun yangi tartib g‘oyasini top.',
  'O‘zingning kelajakdagi loyihang uchun nom va logo o‘yla.'
];
function newIdea(){ $('ideaText').textContent=ideas[Math.floor(Math.random()*ideas.length)]; }
$('ideaBtn').addEventListener('click',newIdea);

const noteInput=$('noteInput'), savedNote=$('savedNote'), saveStatus=$('saveStatus');
try{
  const existing=localStorage.getItem('nova-note');
  if(existing){noteInput.value=existing;savedNote.textContent=existing;savedNote.classList.remove('hidden');}
}catch(e){saveStatus.textContent='Saqlash brauzer sozlamalariga bog‘liq';}
$('saveNote').addEventListener('click',()=>{
  const value=noteInput.value.trim();
  if(!value){toast('Avval qayd yozing 🙂');return;}
  try{localStorage.setItem('nova-note',value);savedNote.textContent=value;savedNote.classList.remove('hidden');saveStatus.textContent='Saqlandi ✓';toast('Qayd saqlandi!');}
  catch(e){toast('Brauzerda saqlash imkoni bo‘lmadi.');}
});
renderTimer();
