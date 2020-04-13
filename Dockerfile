# node 12 LTS
FROM node:12

# Create the directory where we will put the app.
WORKDIR /usr/src/app

# Install the application.
COPY package*.json ./
RUN npm install

# Copy files
COPY . .

EXPOSE 3010

CMD ["npm", "run", "dev"]