import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { router } from "../router";
import product from "./modules/product";
import shoppingCart from "./modules/shoppingCart";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isAdmin: null,
    token: "",
    fbApiKey: "AIzaSyAzP7QURMCU4wF5OFHFJcl9Q4diMBZZPtQ"
  },
  getters: {
    isAuthenticated(state) {
      return state.token;
    },
    isAdminAuthenticated(state) {
      return state.isAdmin;
    }
  },
  mutations: {
    setAdmin(state) {
      state.isAdmin = true;
    },
    clearAdmin(state) {
      state.isAdmin = "";
    },
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = "";
    }
  },
  actions: {
    initAuth({ commit }) {
      let token = localStorage.getItem("token");
      let Admin = localStorage.getItem("Admin");
      if (Admin) {
        commit("setAdmin");
      }
      if (token) {
        commit("setToken", token);
      }
      router.push("/urun-listesi");
    },
    login({ commit, dispatch, state }, authData) {
      let authLink =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
      if (authData.isUser) {
        authLink =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
      }
      axios
        .post(authLink + state.fbApiKey, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          commit("setToken", res.data.idToken);
          if (res.data.localId == "8fTdrU3sxSS4eaQ29ImNFbkxzWd2") {
            commit("setAdmin");
            localStorage.setItem("Admin", res.data.localId);
          }
          localStorage.setItem("token", res.data.idToken);

          router.push("/urun-listesi");
        });
    },
    logout({ commit, dispatch, state }) {
      commit("clearToken");
      commit("clearAdmin");
      localStorage.removeItem("token");
      localStorage.removeItem("Admin");
      router.push("/");
    }
  },
  modules: {
    product,
    shoppingCart
  }
});

export default store;
