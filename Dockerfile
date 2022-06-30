FROM node:alpine
COPY . .
WORKDIR /Task17_bot2
RUN npm ci
CMD ["npm", "start"]
