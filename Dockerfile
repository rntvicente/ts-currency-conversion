FROM node:18-alpine as builder
WORKDIR /opt/currency-conversion-api
COPY . /opt/currency-conversion-api
RUN npm ci
RUN npm run clean
RUN npm run build

FROM node:18-alpine  
RUN apk --no-cache add ca-certificates
WORKDIR /opt/currency-conversion-api
COPY --from=builder /opt/currency-conversion-api .
CMD ["node", "--require", "./dist/src/infra/server/intrumention.js", "./dist/src/main.js"]
