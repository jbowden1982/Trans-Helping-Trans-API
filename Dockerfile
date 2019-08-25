FROM node:10

EXPOSE 4000

COPY . /var/www/
WORKDIR /var/www/

RUN cd /var/www  && \
 npm install -g yarn && \
 yarn && \
 yarn global add prisma && \
 prisma init;

CMD cd /var/www && \
    yarn deploy:prod && \
    yarn start
