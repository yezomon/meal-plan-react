FROM node:20-alpine

WORKDIR /app

# 필요한 도구 설치
RUN apk add --no-cache git

# 프로젝트 초기화를 위한 파일들 복사
COPY package*.json ./
COPY . .

# Expo CLI 및 필요한 패키지들 설치
RUN npm install -g expo-cli
RUN npm install
RUN npx expo install react-dom react-native-web @expo/metro-runtime

# 포트 설정
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
EXPOSE 8081

# 웹 서버 시작
CMD ["npx", "expo", "start"]