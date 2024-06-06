FROM node

WORKDIR /app/workorder

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8001

CMD ["npm", "start"]