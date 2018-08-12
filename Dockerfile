FROM node:8.9-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --silent
COPY . .
EXPOSE 3000
RUN npm run build
RUN npm install http-server -g --silent
CMD http-server -p 3000 build/