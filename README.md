# KaijuNoExRyori

## Zvukové efekty

Vytvor priečinok `sounds` v koreňovom adresári projektu a vlož doň tieto zvukové súbory:

- `mnam.mp3` (napr. mňam efekt)
- `fuj.mp3` (napr. fuj efekt)
- `masknutie.mp3` (napr. zvuk zahryznutia)

Zvuky môžu byť stiahnuté z bezplatných knižníc (napr. freesound.org, mixkit.co, pixabay.com/sound-effects/). Názvy súborov musia byť presne ako vyššie, aby ich aplikácia našla.

## Spustenie aplikácie

1. Nainštaluj závislosti:
   ```bash
   npm install
   ```
2. Spusti aplikáciu:
   ```bash
   npm start
   ```

## Spustenie cez Docker

1. Vytvor Docker image:
   ```bash
   docker build -t kaijunoexryori .
   ```
2. Spusti aplikáciu s X11 forwardingom (Linux):
   ```bash
   docker run -it --rm \
     -e DISPLAY=$DISPLAY \
     -v /tmp/.X11-unix:/tmp/.X11-unix \
     -v $(pwd)/sounds:/app/sounds \
     kaijunoexryori
   ```
   - Pre Windows/Mac použi XQuartz alebo VcXsrv na X11 server.
   - Priečinok `sounds` pripoj ako volume, aby boli zvuky dostupné.

**Poznámka:**
- Electron aplikácie potrebujú X11 server na zobrazenie GUI v Dockeri.
- Ak chceš len backend alebo CLI, Dockerfile vieš upraviť podľa potreby. 