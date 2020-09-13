import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "./store/store"

import ProductList from './components/product/ProductList'
import ProductDetails from './components/product/ProductDetails'
import ProductProccess from "./components/product/ProductProccess"
import Auth from './components/auth/Auth'
import Cart from './components/product/ShoppingCart'

Vue.use(VueRouter);

export const router = new VueRouter({
    routes : [
        {
            path : "/",
            component : Auth
            
        },
        {
            path : "/urun-listesi",
            component : ProductList,
            beforeEnter(to, from, next){
                if(store.getters.isAuthenticated){
                    next();
                } else {
                    next("/");
                }
            }
        },
        {
            path : "/urun-listesi:product",
            name : "urun-detay",
            component : ProductDetails,
            beforeEnter(to, from, next){
                if(store.getters.isAuthenticated){
                    next();
                } else {
                    next("/");
                }
            }
        },
        {
            path : "/urun-ekleme",
            component : ProductProccess,
        },
        {
            path : "/sepet",
            name : "sepet",
            component : Cart,
            beforeEnter(to, from, next){
                if(store.getters.isAuthenticated){
                    next();
                } else {
                    next("/");
                }
            }
        },
        { path : "*", redirect : "/"  }
    ],
    mode : "history"
})