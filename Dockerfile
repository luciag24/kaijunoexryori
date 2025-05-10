# Dockerfile pre KaijuNoExRyori (Electron app)
# Poznámka: Electron potrebuje X11 display server, preto je tento Dockerfile vhodný najmä pre pokročilých alebo na vývoj/testovanie.

FROM node:20-slim

# Nastavíme pracovný adresár
WORKDIR /app

# Skopírujeme package.json a package-lock.json
COPY package*.json ./

# Nainštalujeme závislosti
RUN npm install --omit=dev && npm install electron --save-dev

# Skopírujeme zvyšok aplikácie
COPY . .

# Exponujeme port pre X11 forwarding (voliteľné)
EXPOSE 6000

# Príkaz na spustenie aplikácie
CMD ["npm", "start"]

# Poznámka:
# Na spustenie Electron GUI v Dockeri je potrebné X11 forwarding.
# Príklad spustenia na Linuxe:
#   docker run -it --rm \
#     -e DISPLAY=$DISPLAY \
#     -v /tmp/.X11-unix:/tmp/.X11-unix \
#     -v $(pwd)/sounds:/app/sounds \
#     kaijunoexryori
# Na Windows/Mac odporúčam použiť XQuartz alebo VcXsrv. 