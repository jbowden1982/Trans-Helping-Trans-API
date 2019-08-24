FROM node:10

EXPOSE 4000 4466

COPY . /var/www/
WORKDIR /var/www/

RUN cd /var/www  && \
 npm install -g yarn && \
 yarn && \
 yarn global add prisma && \
 yarn deploy

CMD yarn deploy:prod && \
    yarn start
