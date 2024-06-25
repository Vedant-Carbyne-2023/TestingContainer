FROM node

WORKDIR /app/inward-inventory

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8005

CMD ["npm", "start"]