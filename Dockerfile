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

CMD [ "node", "./build/server.js" ]

EXPOSE 3000
