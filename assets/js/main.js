/*==================== UKAŽ MOBILNÍ MENU PŘI KLIKNUTÍ NA TLAČÍTKO TOGGLE ====================*/
const ukazMenu = (toggleId, navId) => {
   const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId);

   // Ověř, že proměnné existují
   if (toggle && nav) {
      toggle.addEventListener('click', () => {
         // Přidáme třídu 'ukaz-menu' k divu s třídou ".nav__menu"
         nav.classList.toggle('ukaz-menu');
      });
   }
};
ukazMenu('nav-toggle', 'nav-menu');

/*==================== SKRYJ MOBILNÍ MENU ====================*/
const navLink = document.querySelectorAll('.nav__odkaz');

function linkAction() {
   const navMenu = document.getElementById('nav-menu');
   // Když klikneme na každý ".nav__odkaz", skryjeme třídu ".ukaz-menu"
   navMenu.classList.remove('ukaz-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== Při SKROLOVÁNÍ -> Přepínání aktivního linku v MENU  ====================*/
function scrollActive() {
   const scrollY = window.pageYOffset;

   sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 50;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(
         `.nav__polozka a[href="#${sectionId}"]`
      );

      if (navLink) {
         if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.classList.add('aktivni-odkaz');
         } else {
            navLink.classList.remove('aktivni-odkaz');
         }
      }
   });
}


// Získání všech sekcí s atributem ID
const sections = document.querySelectorAll('section[id]');

// Připojíme funkci "scrollActive()" k eventu "skrolnutí"
window.addEventListener('scroll', scrollActive);

/*==================== UKAŽ SCROLL TOP ====================*/
function scrollTop() {
   const scrollTop = document.getElementById('scroll-top');
   // Když zasklolujeme více než 200 z výšky viewportu, přidáme třídu "ukaz-scroll" k elementu s id "#scroll-top"
   if (this.scrollY >= 200) scrollTop.classList.add('ukaz-scroll');
   else scrollTop.classList.remove('ukaz-scroll');
}
window.addEventListener('scroll', scrollTop);

/*==================== SVĚTLÝ/TMAVÝ REŽÍM ====================*/
const zmenaModuTlacitko = document.getElementById('zmena-modu');
const tmavyRezim = 'tmavy-rezim';
const ikonaModu = 'bx-sun';

// Načtení režimu (pokud uživatel vybral)
const vybranyRezim = localStorage.getItem('vybrany-rezim');
const vybranaIkona = localStorage.getItem('vybrana-ikona');

// Aktuální režim, který je, získáme ověřením "body" elementu a jeho třídy ".tmavy-rezim"
const ziskejAktualniRezim = () =>
   document.body.classList.contains(tmavyRezim) ? 'tmavy' : 'svetly';
const ziskejAktualniIkonu = () =>
   zmenaModuTlacitko.classList.contains(ikonaModu) ? 'bx-moon' : 'bx-sun';

// Ověřujeme, zda uživatel dříve zvolil téma
if (vybranyRezim) {
   // Pokud je ověření splněno, zeptáme se, jaký byl režim, abychom věděli, zda jsme aktivovali nebo deaktivovali tmavý režim
   document.body.classList[vybranyRezim === 'tmavy' ? 'add' : 'remove'](
      tmavyRezim
   );
   zmenaModuTlacitko.classList[vybranaIkona === 'bx-moon' ? 'add' : 'remove'](
      ikonaModu
   );
}

// Aktivace / deaktivace režimu ručně pomocí tlačítka
zmenaModuTlacitko.addEventListener('click', () => {
   // Přidat nebo odebrat tmavý režim a ikonu
   document.body.classList.toggle(tmavyRezim);
   zmenaModuTlacitko.classList.toggle(ikonaModu);
   // Uložíme do "localStorage" nastavení vybraného motivu/režimu pro další načtení webu
   localStorage.setItem('vybrany-rezim', ziskejAktualniRezim());
   localStorage.setItem('vybrana-ikona', ziskejAktualniIkonu());
});

/*==================== Přidej styl "zmeni-cv" k "body", aby se vešlo na formát A4 ====================*/
function zmensiCv() {
   document.body.classList.add('zmensi-cv');
}
/*==================== Odstraň osekaný formát z A4 po generování PDF ====================*/
function odstranZmenseni() {
   document.body.classList.remove('zmensi-cv');
}

/*==================== GENERUJ PDF ====================*/
// Proměnné pro práci s generováním PDF
let oblastCv = document.getElementById('oblast-cv');
let resumeButton = document.getElementById('resume-button');

// Html2pdf nastavení možných parametrů
let moznosti = {
   margin: 0,
   filename: 'Bednarski_Petr-CV.pdf',
   image: {
      type: 'jpeg',
      quality: 0.98
   },
   html2canvas: {
      scale: 4
   },
   jsPDF: {
      format: 'a4',
      orientation: 'portrait'
   },
};

// Funkce generujResume s parametry (oblastCV a možnostmi generování)
function generujResume() {
   html2pdf(oblastCv, moznosti);
}


//  Když je kliknuto na tlačítko "Generuj PDF", spustí se 3 oddělené funkce
resumeButton.addEventListener('click', () => {

   // 1. Třída "zmeni-cv" ke přidána k elementu "body", tím se odstraní přebytečné mezery
   zmensiCv();

   // 2. PDF je generováno
   generujResume();

   // 3. Třída ".zmensi-cv" je odstraněna z "body" elementu po 5 sekundách díky "setTimout" funkci
   setTimeout(odstranZmenseni, 5000);
});
