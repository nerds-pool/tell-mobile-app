import axios from "axios";

const Http = axios.create({
  baseURL: "https://tell-lk.netlify.app/.netlify/functions/api/",
});

const api = {
  postSignup: (body) => Http.post("auth/signup", body),
  postSignin: (signinbody) => Http.post("auth/signin", signinbody),
};

export default api;
