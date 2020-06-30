FROM node:latest

WORKDIR /usr/src/app

COPY userdb . 

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "server.js" ]

LABEL "com.datadoghq.ad.check_names"='["nodejs"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.logs"='[{"source": "nodejs", "service": "user-email-db"}]'
