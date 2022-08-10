FROM node:14.17-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY .npmrc ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build


EXPOSE 3002
CMD ["npm", "start"]
