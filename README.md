# KaijuNoExRyori
# KaijuNoExRyori

KaijuNoExRyori je jednoduchá a zábavná hra pre deti aj dospelých, kde kŕmite Godzillu rôznymi jedlami a sledujete jej vtipné reakcie. Hra je vhodná na učenie, zábavu aj oddych.

## Funkcie
- Kŕmenie Godzilly rôznymi jedlami (ovocie, zelenina, sladkosti, nápoje...)
- Výber farby Godzilly (zelená, červená, modrá)
- Vtipné animácie a hlášky
- Počítadlo nakŕmení a výťažku
- Manuálne vynulovanie štatistík
- Zvukové efekty (mňam, fuj, mľasknutie)


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
