<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-4">
        <img :src="product.url" alt class="img-fluid mb-4" style="height : 400px;" />
      </div>
      <div class="col-md-8">
        <div class="card">
          <div class="container">
            <div class="row">
              <div class="card-body">
                <h5 class="card-title">{{ product.title }}</h5>
                <p class="card-text">{{ product.description }}</p>
              </div>
            </div>
            <hr />
            <div class="row justify-content-end">
              <span class="badge badge-pill badge-danger mr-4 mb-4">{{ product.price | currency }}</span>
            </div>
          </div>
        </div>
        <div class="btn btn-warning mt-2 btn-block" @click="addProductCart(product)">Sepete Ekle</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      product: { ...this.$route.params.product, count: 1 },
      cartProducts: [],
    };
  },
  methods: {
    addProductCart(product) {
      if (this.cartProducts.length == 0) {
        this.cartProducts.push(product);
      } else {
        let tempProduct = this.cartProducts.filter(
          (prd) => prd.key === product.key
        );
        if (tempProduct) {
          this.cartProducts.forEach((prd, index) => {
            if (prd === tempProduct[0]) {
              this.cartProducts.splice(index, 1);
              tempProduct[0].count = parseInt(tempProduct[0].count) + 1;
              this.cartProducts.push(tempProduct[0]);
            }
          });
        }
        if (tempProduct.length === 0) {
          this.cartProducts.push(product);
        }
      }
      localStorage.setItem("cartProducts", JSON.stringify(this.cartProducts));
      this.$router.replace("/sepet");
    },
  },
  created() {
    if (localStorage.getItem("cartProducts") === null) {
      this.cartProducts = [];
    } else {
      this.cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
    }
  },
};
</script>
<style>
</style>