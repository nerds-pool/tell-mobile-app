import axios from "axios";

const Http = axios.create({
  baseURL: "https://tell-lk.netlify.app/.netlify/functions/api/",
});

const api = {
  //POST
  postSignup: (body) => Http.post("auth/signup", body),
  postSignin: (signinbody) => Http.post("auth/signin", signinbody),
  postAddFeed: (addFeedbody) => Http.post("",addFeedbody),

  //GET
  getPost: ()=> Http.get()
  
};

export default api;
