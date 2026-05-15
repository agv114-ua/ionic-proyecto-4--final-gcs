FROM node:21-alpine
WORKDIR /app
RUN apk add --update --no-cache bash git npm
RUN npm install -g @ionic/cli@7
EXPOSE 8100
ENTRYPOINT ["/bin/sh", "-c"]
