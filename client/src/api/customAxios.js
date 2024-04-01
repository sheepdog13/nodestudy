import axios from "axios";

let baseUrl = "";

if (process.env.NODE_ENV === "development") {
  // 로컬 환경일 때 baseUrl 설정
  baseUrl = "http://localhost:4000";
} else {
  // 배포 환경일 때 baseUrl 설정
  baseUrl = "https://nodestudy-34u2.onrender.com";
}

export const customAxios = axios.create({
  baseURL: `${baseUrl}`,

  // 서버와 클라이언트가 다른 도메인일 경우 필수
  withCredentials: true,
});
