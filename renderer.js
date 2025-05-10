const feedBtn = document.getElementById('feedBtn');
const partnerInput = document.getElementById('partnerName');
const partnerDiv = document.getElementById('partner');
const soundMnam = document.getElementById('sound-mnam');
const soundFuj = document.getElementById('sound-fuj');
const soundMlasknutie = document.getElementById('sound-mlasknutie');
const godzilla = document.getElementById('godzilla');
const godzillaMouth = document.getElementById('godzilla-mouth');
const godzillaDigest = document.getElementById('godzilla-digest');
const poop = document.getElementById('poop');

let lastSoundIndex = -1;

// Mapovanie zvukov na typ animácie
const sounds = [soundMnam, soundFuj, soundMlasknutie];
const soundTypes = ['mnam', 'fuj', 'mlasknutie'];

feedBtn.addEventListener('click', () => {
  const name = partnerInput.value.trim();
  if (!name) return;

  partnerDiv.textContent = name;
  partnerDiv.classList.remove('eaten');

  // Vyber zvuk, ktorý nie je rovnaký ako posledný
  let soundIndex;
  do {
    soundIndex = Math.floor(Math.random() * sounds.length);
  } while (soundIndex === lastSoundIndex && sounds.length > 1);
  lastSoundIndex = soundIndex;
  const sound = sounds[soundIndex];
  const soundType = soundTypes[soundIndex];
  sound.currentTime = 0;
  sound.play();

  // Stopni zvuk po 5 sekundách
  setTimeout(() => {
    sound.pause();
    sound.currentTime = 0;
  }, 5000);

  // Fáza 1: Godzilla otvorí ústa
  godzilla.classList.add('open-mouth');
  godzilla.classList.remove('digesting');
  godzillaMouth.style.display = '';
  godzillaDigest.style.display = 'none';
  poop.classList.remove('visible');
  poop.style.display = 'none';

  // Spusti animáciu partnera
  setTimeout(() => {
    partnerDiv.classList.add('eaten');
  }, 400);

  if (soundType === 'fuj' || soundType === 'mlasknutie') {
    // Fáza 2: Godzilla trávi (🤢)
    setTimeout(() => {
      godzilla.classList.remove('open-mouth');
      godzilla.classList.add('digesting');
      godzillaMouth.style.display = 'none';
      godzillaDigest.style.display = '';
    }, 1200);
  } else {
    // Po mňam Godzilla len zavrie ústa, žiadne trávenie
    setTimeout(() => {
      godzilla.classList.remove('open-mouth');
      godzillaMouth.style.display = '';
      godzillaDigest.style.display = 'none';
    }, 1200);
  }

  // Fáza 3: Lajno (💩) sa objaví
  setTimeout(() => {
    godzilla.classList.remove('digesting');
    godzillaDigest.style.display = 'none';
    poop.style.display = '';
    poop.classList.add('visible');
  }, 4000);

  // Po animácii skry meno a lajno, vráť Godzillu do pôvodného stavu
  setTimeout(() => {
    partnerDiv.textContent = '';
    partnerDiv.classList.remove('eaten');
    partnerInput.value = '';
    poop.classList.remove('visible');
    poop.style.display = 'none';
    godzilla.classList.remove('open-mouth', 'digesting');
    godzillaMouth.style.display = '';
    godzillaDigest.style.display = 'none';
  }, 5000); // 5 sekúnd

  // TODO: Tu sa neskôr pridá volanie backendu na uloženie mena
}); 