const feedBtn = document.getElementById('feedBtn');
const partnerInput = document.getElementById('partnerName');
const soundMnam = document.getElementById('sound-mnam');
const soundFuj = document.getElementById('sound-fuj');
const soundMlasknutie = document.getElementById('sound-mlasknutie');
const godzilla = document.getElementById('godzilla');
const godzillaMouth = document.getElementById('godzilla-mouth');
const godzillaDigest = document.getElementById('godzilla-digest');
const poop = document.getElementById('poop');
const feedCount = document.getElementById('feedCount');
const totalEarnings = document.getElementById('totalEarnings');
const donateBtn = document.getElementById('donateBtn');
const foodBelt = document.getElementById('food-belt');
const foodItems = document.querySelectorAll('.food-item');
const funQuote = document.getElementById('funQuote');
const peopleBelt = document.getElementById('people-belt');
const personEmojis = ['👩','👨','🧑','👧','👦','🧔','👱‍♀️','👱‍♂️','🧓','👵','👴'];
const exNameBox = document.getElementById('ex-name');
const resetBtn = document.getElementById('resetBtn');
const colorGreenBtn = document.getElementById('colorGreen');
const colorRedBtn = document.getElementById('colorRed');
const colorBlueBtn = document.getElementById('colorBlue');

let lastSoundIndex = -1;
let clicks = 0;
let earnings = 0;
let peopleTimeout = null;

// Mapovanie zvukov na typ animácie
const sounds = [soundMnam, soundFuj, soundMlasknutie];
const soundTypes = ['mnam', 'fuj', 'mlasknutie'];

const quotes = {
  mnam: [
    'Godzilla: "Mňam, to bola dobrota!"',
    'Godzilla: "Ešte, ešte!"',
    'Godzilla: "Kto mi dá ďalší chod?"',
    'Godzilla: "Toto je lepšie ako sushi v Tokiu!"',
    'Godzilla: "Som hladná ako kaiju!"',
    'Godzilla: "Dnes mám chuť na niečo extra!"',
    'Godzilla: "Kto mi prinesie dezert?"',
    'Godzilla: "To bola hostina!"',
    'Godzilla: "Najlepšie jedlo v meste!"',
  ],
  fuj: [
    'Godzilla: "Au, to ma bolí brucho!"',
    'Godzilla: "Fuj, toto už nechcem!"',
    'Godzilla: "To bola chyba..."',
    'Godzilla: "Kto mi toto podstrčil?"',
    'Godzilla: "Už nikdy viac!"',
    'Godzilla: "To bola pohroma!"',
    'Godzilla: "Radšej by som jedla mrakodrap!"',
  ],
  mlasknutie: [
    'Godzilla: "Au, to ma bolí brucho!"',
    'Godzilla: "To mi nesadlo..."',
    'Godzilla: "Kto mi toto podstrčil?"',
    'Godzilla: "To bola pohroma!"',
    'Godzilla: "Radšej by som jedla mrakodrap!"',
  ]
};

function setRandomQuote(type) {
  const arr = quotes[type] || quotes.mnam;
  const idx = Math.floor(Math.random() * arr.length);
  funQuote.textContent = arr[idx];
}
setRandomQuote('mnam');

// Funkcia na aktualizáciu štatistík
function updateStats() {
  feedCount.textContent = clicks;
  totalEarnings.textContent = earnings.toFixed(2);
}

// Funkcia na uloženie štatistík do localStorage
function saveStats() {
  localStorage.setItem('godzillaClicks', clicks);
  localStorage.setItem('godzillaEarnings', earnings);
}

// Načítanie štatistík pri štarte
function loadStats() {
  clicks = parseInt(localStorage.getItem('godzillaClicks')) || 0;
  earnings = parseFloat(localStorage.getItem('godzillaEarnings')) || 0;
  updateStats();
}

// Inicializácia štatistík
loadStats();

// Kategórie jedál
const healthyFood = [
  '🍎','🍏','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🍈','🍒','🍑','🥭','🍍','🥝','🍅','🥥',
  '🥕','🥦','🌽','🥒','🍆','🥬','🥑','🧄','🧅','🥔','🍠','🍄','🌶️','🥜','🌰'
];
const unhealthyFood = [
  '🍺','🍻','🍷','🥂','🍸','🍹','🍾','🥃','🍶','🍵', // alkohol, nápoje
  '🍩','🍪','🍫','🍬','🍭','🍰','🎂','🧁','🍮','🍧','🍨','🍦','🥮', // sladkosti
  '🍔','🍟','🌭','🍕','🍿','🥓','🥩','🍖','🍗','🥞','🧇','🥪','🥨','🥐','🥯','🍞','🥖','🥤','🧃','🧊'
];
const neutralFood = [
  '🍜','🍝','🍣','🍤','🍚','🍛','🍲','🥘','🍱','🍢','🍡','🥗','🌮','🌯','🥙','🥚','🧀','🥠','🍯','🥛','🍵','🥘','🍲','🍱','🍢','🍡','🍧','🍨','🍦','🥮','🍰','🎂','🧁','🍮','🍭','🍬','🍫','🍩','🍪','🥠','🍯','🥔','🍠','🍄','🌶️','🥜','🌰','🍆','🥬','🥑','🧄','🧅','🥕','🥦','🌽','🥒','🍅','🥥','🍗','🍖','🍤','🍣','🍚','🍛','🍲','🥘','🍱','🍢','🍡','🍧','🍨','🍦','🥮','🍰','🎂','🧁','🍮','🍭','🍬','🍫','🍩','🍪','🥠','🍯','🥪','🥨','🥐','🥯','🍞','🥖','🥤','🧃','🧊','🍺','🍻','🍷','🥂','🍸','🍹','🍾','🥃','🍶','🍵','🥞','🧇','🍔','🍟','🌭','🍕','🍿','🥓','🥩','🍖','🍗'];

// Pole všetkých jedál pre generovanie pásu
const allFoodEmojis = Array.from(new Set([...healthyFood, ...unhealthyFood, ...neutralFood]));

function getFoodReaction(emoji) {
  if (healthyFood.includes(emoji)) return 'mnam';
  if (unhealthyFood.includes(emoji)) return Math.random() > 0.5 ? 'fuj' : 'mlasknutie';
  return ['mnam', 'fuj', 'mlasknutie'][Math.floor(Math.random()*3)];
}

function showPeopleBelt(show) {
  peopleBelt.style.display = show ? 'flex' : 'none';
  if (!show) foodBelt.style.display = 'flex';
}

function generateRandomFoodBelt(count = 18) {
  // Odstráň staré jedlo
  foodBelt.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const emoji = allFoodEmojis[Math.floor(Math.random() * allFoodEmojis.length)];
    const food = document.createElement('div');
    food.className = 'food-item';
    food.textContent = emoji;
    foodBelt.appendChild(food);
  }
  addFoodItemListeners();
  foodBelt.style.display = 'flex';
}

function addFoodItemListeners() {
  foodBelt.querySelectorAll('.food-item').forEach(food => {
    food.onclick = null;
    food.addEventListener('click', () => {
      feedGodzillaWithFood(food);
      // Skry pás s jedlom, vygeneruj nový po animácii
      foodBelt.style.display = 'none';
      setTimeout(() => {
        generateRandomFoodBelt();
        foodBelt.style.display = 'flex';
      }, 7000);
    });
  });
}

function animateGodzillaGrow() {
  godzilla.classList.add('growing');
  setTimeout(() => godzilla.classList.remove('growing'), 1200);
}

function feedGodzillaWithFood(food) {
  // Štandardné kŕmenie jedlom
  clicks++;
  earnings += 0.01;
  updateStats();
  saveStats();
  // Urč reakciu podľa typu jedla
  const emoji = food.textContent;
  const reaction = getFoodReaction(emoji);
  let soundIndex = soundTypes.indexOf(reaction);
  if (soundIndex === -1) soundIndex = 0;
  lastSoundIndex = soundIndex;
  const sound = sounds[soundIndex];
  const soundType = soundTypes[soundIndex];
  sound.currentTime = 0;
  sound.play();
  setTimeout(() => {
    sound.pause();
    sound.currentTime = 0;
  }, 5000);
  godzilla.classList.add('open-mouth');
  godzilla.classList.remove('digesting');
  godzillaMouth.style.display = '';
  godzillaDigest.style.display = 'none';
  poop.classList.remove('visible');
  poop.style.display = 'none';
  setTimeout(() => {
    godzilla.classList.remove('digesting');
    godzillaDigest.style.display = 'none';
    poop.style.display = '';
    poop.classList.add('visible');
  }, 4000);
  setTimeout(() => {
    poop.classList.remove('visible');
    poop.style.display = 'none';
    godzilla.classList.remove('open-mouth', 'digesting');
    godzillaMouth.style.display = '';
    godzillaDigest.style.display = 'none';
  }, 5000);
  animateGodzillaGrow();
  setRandomQuote(soundType);
}

function feedGodzillaWithPerson(person) {
  // Kŕmenie človekom (špeciálna logika, môžeš pridať špeciálne hlášky)
  clicks++;
  earnings += 0.01;
  updateStats();
  saveStats();
  // Použijeme "fuj" alebo "mlasknutie" reakciu
  const soundIndex = Math.random() > 0.5 ? 1 : 2; // 1=fuj, 2=mlasknutie
  const sound = sounds[soundIndex];
  const soundType = soundTypes[soundIndex];
  sound.currentTime = 0;
  sound.play();
  setTimeout(() => {
    sound.pause();
    sound.currentTime = 0;
  }, 5000);
  godzilla.classList.add('open-mouth');
  godzilla.classList.remove('digesting');
  godzillaMouth.style.display = '';
  godzillaDigest.style.display = 'none';
  poop.classList.remove('visible');
  poop.style.display = 'none';
  setTimeout(() => {
    godzilla.classList.remove('open-mouth');
    godzilla.classList.add('digesting');
    godzillaMouth.style.display = 'none';
    godzillaDigest.style.display = '';
  }, 1200);
  setTimeout(() => {
    godzilla.classList.remove('digesting');
    godzillaDigest.style.display = 'none';
    poop.style.display = '';
    poop.classList.add('visible');
  }, 4000);
  setTimeout(() => {
    poop.classList.remove('visible');
    poop.style.display = 'none';
    godzilla.classList.remove('open-mouth', 'digesting');
    godzillaMouth.style.display = '';
    godzillaDigest.style.display = 'none';
  }, 5000);
  animateGodzillaGrow();
  setRandomQuote(soundType);
}

function generatePeopleBelt(name) {
  peopleBelt.innerHTML = '';
  personEmojis.forEach(emoji => {
    const person = document.createElement('div');
    person.className = 'person-item';
    person.innerHTML = `<span class=\"person-emoji\">${emoji}</span>`;
    peopleBelt.appendChild(person);
    person.addEventListener('click', () => {
      feedGodzillaWithPerson(person);
      showPeopleBelt(false);
      foodBelt.style.display = 'flex';
      setTimeout(() => {
        generateRandomFoodBelt();
      }, 7000);
    });
    setTimeout(() => {
      if (person.parentNode) person.parentNode.removeChild(person);
    }, 7000);
  });
  showPeopleBelt(true);
  foodBelt.style.display = 'none';
  setTimeout(() => {
    showPeopleBelt(false);
    foodBelt.style.display = 'flex';
    generateRandomFoodBelt();
  }, 7000);
}

// Pri kliknutí na "Nakŕm Godzillu" (meno ex)
feedBtn.addEventListener('click', () => {
  let name = partnerInput.value.trim();
  name = name.slice(0, 16);
  if (!name) return;
  exNameBox.textContent = `Ex: ${name}`;
  setTimeout(() => { exNameBox.textContent = ''; }, 7000);
  setTimeout(() => { partnerInput.value = ''; }, 7000);
  generatePeopleBelt(name);
});

// Pridanie funkcionality pre tlačidlo darovania
donateBtn.addEventListener('click', () => {
  if (earnings > 0) {
    alert(`Ďakujeme za váš príspevok ${earnings.toFixed(2)}€ na útulok!`);
    earnings = 0;
    updateStats();
    saveStats();
  } else {
    alert('Najprv nakŕmte Godzillu, aby ste mohli prispieť!');
  }
});

// Inicializácia
foodBelt.style.display = 'flex';
generateRandomFoodBelt();
showPeopleBelt(false);

resetBtn.addEventListener('click', () => {
  if (confirm('Naozaj chcete vynulovať štatistiky?')) {
    localStorage.removeItem('godzillaClicks');
    localStorage.removeItem('godzillaEarnings');
    clicks = 0;
    earnings = 0;
    loadStats();
  }
});

function setGodzillaColor(color) {
  godzilla.classList.remove('godzilla-green', 'godzilla-red', 'godzilla-blue');
  godzilla.classList.add('godzilla-' + color);
  // zvýrazni vybranú ikonku
  colorGreenBtn.classList.remove('selected');
  colorRedBtn.classList.remove('selected');
  colorBlueBtn.classList.remove('selected');
  if (color === 'green') colorGreenBtn.classList.add('selected');
  if (color === 'red') colorRedBtn.classList.add('selected');
  if (color === 'blue') colorBlueBtn.classList.add('selected');
}

colorGreenBtn.addEventListener('click', () => setGodzillaColor('green'));
colorRedBtn.addEventListener('click', () => setGodzillaColor('red'));
colorBlueBtn.addEventListener('click', () => setGodzillaColor('blue'));

// Predvolená farba
setGodzillaColor('green'); 