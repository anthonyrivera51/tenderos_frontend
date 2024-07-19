# Set the working directory inside the container
# Stage 1: Build the Next.js application
FROM node:lts-alpine as build

ENV NEXT_PUBLIC_REST_API_ENDPOINT=http://54.89.207.207:9000/api
ENV APPLICATION_MODE=production
ENV NEXT_PUBLIC_AUTH_TOKEN_KEY=AUTH_CRED
# Default Language
ENV NEXT_PUBLIC_DEFAULT_LANGUAGE=en

# Multilang
# Before enabling multilingual make sure your API supports multilingual
ENV NEXT_PUBLIC_ENABLE_MULTI_LANG=false
ENV NEXT_PUBLIC_AVAILABLE_LANGUAGES=en

# API Key for third party service
ENV NEXT_PUBLIC_GOOGLE_MAP_API_KEY=

# pusher config
# 'log', 'pusher', 'null', 'redis'
ENV NEXT_PUBLIC_API_BROADCAST_DRIVER=pusher
# true or false
ENV NEXT_PUBLIC_PUSHER_DEV_MOOD=false
ENV NEXT_PUBLIC_PUSHER_APP_KEY=
ENV NEXT_PUBLIC_PUSHER_APP_CLUSTER=ap2
ENV NEXT_PUBLIC_BROADCAST_AUTH_URL=${NEXT_PUBLIC_REST_API_ENDPOINT}/broadcasting/auth
# Channel name from PHP
ENV NEXT_PUBLIC_STORE_NOTICE_CREATED_CHANNEL_PRIVATE=private-store_notice.created
ENV NEXT_PUBLIC_ORDER_CREATED_CHANNEL_PRIVATE=private-order.created
ENV NEXT_PUBLIC_MESSAGE_CHANNEL_PRIVATE=private-message.created
# Event name from PHP
ENV NEXT_PUBLIC_STORE_NOTICE_CREATED_EVENT=store.notice.event
ENV NEXT_PUBLIC_ORDER_CREATED_EVENT=order.create.event
ENV NEXT_PUBLIC_MESSAGE_EVENT=message.event
# App version

ENV NEXT_PUBLIC_VERSION=11.8.0
ENV PORT=8080

WORKDIR /app

# Copy package.json and yarn.lock (or package-lock.json if using npm)
COPY package.json .
COPY yarn.lock .

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn

# Build the Next.js application
RUN yarn build

# Expose the port Next.js runs on (default: 3000)
EXPOSE 8080

# Command to run the Next.js application
CMD ["yarn", "start"]