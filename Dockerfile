FROM node:18 

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3001

CMD ["node", "dist/index.js"]