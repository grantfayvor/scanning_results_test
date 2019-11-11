FROM node:10.16.2
WORKDIR /app
COPY . /app
RUN yarn install && \
  yarn build
EXPOSE 3000
ENV NAME GuardRails.io
ENV NODE_ENV production
CMD ["yarn", "run", "serve"]