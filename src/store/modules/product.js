import { router } from "../../router";
import axios from "axios";

const state = {
  products: []
};

const getters = {
  getProducts(state) {
    return state.products;
  },
  getProduct(state, key) {
    state.products.forEach(product => {
      if (product.key == key) {
        return product;
      }
    });
  }
};

const mutations = {
  updateProductList(state, product) {
    state.products.push(product);
  }
};

const actions = {
  initApp({ commit }) {
    axios
      .get("https://vuejs-shopping-cart-app.firebaseio.com/product.json")
      .then(res => {
        let data = res.data;
        for (let key in data) {
          data[key].key = key;
          commit("updateProductList", data[key]);
        }
      });
  },
  saveProduct({ commit, dispatch }, product) {
    axios
      .post(
        "https://vuejs-shopping-cart-app.firebaseio.com/product.json",
        product
      )
      .then(res => {
        product.key = res.data.name;
        commit("updateProductList", product);
        router.replace("/urun-listesi"); // yer değiştir diyoruz.
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
