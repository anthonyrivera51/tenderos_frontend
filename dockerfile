# Use an official Node.js LTS (Long Term Support) image as base
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
ENV PORT=3002

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn build

# Stage 2: Serve the production build with a small, efficient Node.js server
FROM node:lts-alpine

WORKDIR /app

# Install only production dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile --production

# Copy the build output from the previous stage
COPY --from=build /app/.next ./.next

# Expose the port Next.js runs on
EXPOSE 3002

# Run the Next.js application
CMD ["yarn", "start"]