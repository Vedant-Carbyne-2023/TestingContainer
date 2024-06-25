FROM node

WORKDIR /app/outward-inventory

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8006

CMD ["npm", "start"]