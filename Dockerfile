FROM node:10

EXPOSE 4000

COPY . /var/www/
WORKDIR /var/www/

RUN cd /var/www  && \
 npm install -g yarn && \
 yarn && \
 yarn global add prisma;

CMD yarn deploy:prod && \
    yarn start
