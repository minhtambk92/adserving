FROM node:latest

# Install yarn
RUN apt-get update
RUN apt-get install -y --no-install-recommends curl apt-transport-https
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update
RUN apt-get install -y --no-install-recommends yarn

# Copy application files
COPY . /usr/src/app
WORKDIR /usr/src/app

# Install Node.js dependencies
RUN yarn install

# Build
RUN yarn run build --docker

# ENV vars
ENV NODE_ENV "development"
ENV WEBSITE_HOSTNAME "adserving.manhhailua.com"
ENV DATABASE_URL "mysql://root:bXy3E802rM@45.124.93.190:3307/adserving"

CMD [ "node", "./build/server.js" ]

EXPOSE 3000
