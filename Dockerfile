FROM node:10

EXPOSE 4000 4466

COPY . /var/www/
WORKDIR /var/www/

RUN cd /var/www  && \
 yarn && \
 yarn start

CMD npm run deploy
