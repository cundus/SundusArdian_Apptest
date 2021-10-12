import axios from "axios";

export const API = axios.create({
  baseURL: "https://simple-contact-crud.herokuapp.com",
});
