FROM node:18.13.0

RUN mkdir -p /usr/src/walk_ein

ENV TELEGRAM_TOKEN

WORKDIR /usr/src/walk_ein


COPY package.json /usr/src/walk_ein
COPY yarn.lock /usr/src/walk_ein

RUN yarn install

COPY . /usr/src/walk_ein

RUN yarn build
CMD ["yarn", "start"]


