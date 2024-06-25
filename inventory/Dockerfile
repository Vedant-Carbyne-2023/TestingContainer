FROM node

WORKDIR /app/inventory

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8004
EXPOSE 3004
CMD ["npm", "start"]