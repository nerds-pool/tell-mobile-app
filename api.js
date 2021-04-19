import axios from "axios";
import { getValueFor, save } from "./helpers/sec-storage";

const Http = axios.create({
  baseURL: "https://tell-lk.netlify.app/.netlify/functions/api",
  timeout: 10000,
});

// Request interceptor to add the auth token header to requests
Http.interceptors.request.use(
  async (config) => {
    const signToken = await getValueFor("signToken");
    if (signToken) {
      config.headers["Authorization"] = `Bearer ${signToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to refresh token on token expired error
Http.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error("Error at response interceptor:", error);
    const originalReq = error.config;
    let refToken = await getValueFor("refToken");

    if (refToken && error.response.status === 401 && !originalReq._retry) {
      originalReq._retry = true;
      const res = await Http.post("/auth/refresh", {
        refreshToken: refToken,
      });

      if (res.status === 200) {
        await save("signToken", res.data.result.signToken);
        await save("refToken", res.data.result.refToken);
        return Http(originalReq);
      }
    }
    return Promise.reject(error);
  }
);

const api = {
  post: {
    postSignup: (body) => Http.post("/auth/signup", body),
    postActivate: (body) => Http.post("/auth/activate", body),
    postSignin: (signinbody) => Http.post("/auth/signin", signinbody),
    postAddComplaint: (body) => Http.post("/complaints/new", body),
    postImage: (body) => (config) => Http.post("/file/add", body, config),
    postRefresh: (body) => Http.post("/auth/refresh", body),
    postProfileUpdate: (body) => Http.post("", body),
    postComment: (body) => Http.post("", body),
  },

  get: {
    getPostList: (userId) => Http.get(`/complaints/get/all/${userId}`),
    getUserPostList: (userId) => Http.get(`/complaints/get/my/${userId}`),
    getReport: () => Http.get("/complaints/report"),
    filterData: () => Http.get("/complaints/meta"),
  },

  patch: {
    upvote: (body) => Http.patch("/complaints/update/upvote", body),
    comment: (body) => Http.patch("/complaints/update/comment", body),
  },

  delete: {},
};

export default api;
