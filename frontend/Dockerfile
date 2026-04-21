# 1. AŞAMA: Projeyi derleme (Build)
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. AŞAMA: Nginx ile yayına alma
FROM nginx:alpine
# Bir önceki aşamada derlenen 'dist' klasörünü Nginx'in yayın klasörüne kopyala
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx 80 portunda çalışır
EXPOSE 80

# Nginx'i başlat
CMD ["nginx", "-g", "daemon off;"]