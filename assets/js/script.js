const CHIAVE_STORAGE = 'valore-contatore';
let valoreContatore = 0; // numero iniziale

function salvaContatore() {
  try {
    localStorage.setItem(CHIAVE_STORAGE, String(valoreContatore));
  } catch (e) {
    console.warn('Non è stato possibile salvare localStorage:', e);
  }
}

function caricaContatore() {
  try {
    const salvato = localStorage.getItem(CHIAVE_STORAGE);
    if (salvato !== null) {
      const n = Number(salvato);
      if (!Number.isNaN(n)) return n;
    }
  } catch (e) {
    console.warn('Non è stato possibile leggere localStorage:', e);
  }
  return 0;
}

function creaUIContatore(root) {
  const cartellaContatore = document.createElement('section');
  cartellaContatore.className = 'cartella-contatore';

  const titoloContatore = document.createElement('h1'); 
  titoloContatore.textContent = 'Contatore';

  const elementoValore = document.createElement('div');
  elementoValore.className = 'valore-contatore';
  elementoValore.textContent = valoreContatore;

  const contenitorePulsanti = document.createElement('div');
  contenitorePulsanti.className = 'contenitore-pulsanti';

  const pulsanteDiminuisci = document.createElement('button');
  pulsanteDiminuisci.className = 'pulsante pulsante-diminuisci';
  pulsanteDiminuisci.type = 'button';
  pulsanteDiminuisci.textContent = '−';
  pulsanteDiminuisci.setAttribute('aria-label', 'Decrementa il contatore');

  const pulsanteReset = document.createElement('button');
  pulsanteReset.className = 'pulsante pulsante-reset';
  pulsanteReset.type = 'button';
  pulsanteReset.textContent = 'Reset';
  pulsanteReset.setAttribute('aria-label', 'Reimposta il contatore a zero');

  const pulsanteAumenta = document.createElement('button');
  pulsanteAumenta.className = 'pulsante pulsante-aumenta';
  pulsanteAumenta.type = 'button';
  pulsanteAumenta.textContent = '+';
  pulsanteAumenta.setAttribute('aria-label', 'Incrementa il contatore');

  contenitorePulsanti.appendChild(pulsanteDiminuisci);
  contenitorePulsanti.appendChild(pulsanteReset);
  contenitorePulsanti.appendChild(pulsanteAumenta);

  cartellaContatore.appendChild(titoloContatore);
  cartellaContatore.appendChild(elementoValore);
  cartellaContatore.appendChild(contenitorePulsanti);

  root.appendChild(cartellaContatore);

  return { elementoValore, pulsanteDiminuisci, pulsanteAumenta, pulsanteReset };
}


function aggiornaContatore(nuovoValore, elementoValore) {
  valoreContatore = nuovoValore;
  elementoValore.textContent = valoreContatore;
  salvaContatore(); 
}

function incrementa(elementoValore) {
  aggiornaContatore(valoreContatore + 1, elementoValore);
}

function decrementa(elementoValore) {
  aggiornaContatore(valoreContatore - 1, elementoValore);
}

function resetta(elementoValore) {
  aggiornaContatore(0, elementoValore);
}


function inizializza() {
  const root = document.getElementById('root');

  
  valoreContatore = caricaContatore();

  const { elementoValore, pulsanteDiminuisci, pulsanteAumenta, pulsanteReset } = creaUIContatore(root);

  
  pulsanteAumenta.addEventListener('click', () => incrementa(elementoValore));
  pulsanteDiminuisci.addEventListener('click', () => decrementa(elementoValore));
  pulsanteReset.addEventListener('click', () => resetta(elementoValore));

  
  window.addEventListener('keydown', (e) => {
    if (
      e.key === 'ArrowUp' ||
      e.key === '=' || 
      e.key === '+' || 
      e.code === 'NumpadAdd' 
    ) {
      incrementa(elementoValore);
    }

    if (
      e.key === 'ArrowDown' ||
      e.key === '-' ||
      e.code === 'NumpadSubtract'
    ) {
      decrementa(elementoValore);
    }
  });
}

inizializza();
