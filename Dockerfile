FROM node:22.4.1-bookworm-slim

WORKDIR /usr/src/app

# tini は PID 1 問題対策
# openssl は prisma が使うため
# procps はホットリロードを使うため
# 最後の削除処理はキャッシュを消すため
RUN apt-get update && apt-get -qq install -y --no-install-recommends \
  tini \
  openssl \
  procps \
  && rm -rf /var/lib/apt/lists/*

COPY --chown=node:node package*.json .
RUN npm ci

COPY --chown=node:node . .

USER node
