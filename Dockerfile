FROM node:8-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --silent
COPY . .
EXPOSE 80
RUN npm run build
RUN npm install http-server -g --silent
CMD http-server -p 80 build/