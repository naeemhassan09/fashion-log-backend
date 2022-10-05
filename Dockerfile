# base image
FROM node:16.13.0-alpine


LABEL org.opencontainers.image.authors="Muhammad Adeel <muhammad.adeel@retailo.co>"

RUN apk --no-cache --update add dumb-init vim nano bash git curl && \
    rm -rf /var/cache/apk/* /tmp && \
    mkdir /tmp && \
    chmod 777 /tmp

# Global installs to non root owned directory and add that to path so they're executable
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH="/home/node/.npm-global/bin:${PATH}"

# Install global Yarn packages:
# - typescript: Run tsc  -p server on docker-compose up
# - nodemon: Run the node server in development mode on docker-compose up
# - concurrently: Run tsc and nodemon in parallel on docker-compose up

RUN npm -g add typescript
RUN npm -g add nodemon
RUN npm -g add concurrently

ARG application_dir=.

# Set the application directory
WORKDIR /usr/src/app

RUN chown node:node /usr/src/app

USER node

# Add all the files needed for yarn install
ADD --chown=node:node $application_dir/package.json \
                      $application_dir/yarn.lock\
                      /usr/src/app/

#ENV GL_NPM_TOKEN=glpat-zPvh2x6f7kVhxyfFhLvT
#RUN npm config set @development-team20:registry=https://gitlab.com/api/v4/packages/npm/
#RUN npm config set '//gitlab.com/api/v4/packages/npm/:_authToken=${GL_NPM_TOKEN}'

# Switch to non-root user and install dependencies
RUN yarn install

## Add files to the container, perform chmod and chown
ADD --chown=node:node $application_dir /usr/src/app/

RUN bash -c 'echo -e ARE you From .env? ${GL_NPM_TOKEN_A}'
RUN yarn run build