FROM node:10

EXPOSE 4000

COPY . /var/www/
WORKDIR /var/www/

RUN cd /var/www  && \
 npm install -g yarn && \
 yarn && \
 yarn global add prisma@1.29.2;

CMD cd /var/www && \
    yarn deploy:prod && \
    yarn generate:prod && \
    yarn start
