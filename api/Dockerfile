FROM node:10.16.2-jessie-slim
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 9000
ENV NAME GuardRails.io
ENV NODE_ENV production
CMD ["npm", "start"]