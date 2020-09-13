<template>
  <div>
    <div class="container main-section" v-if="cartProducts.length > 0">
      <div class="row">
        <div class="col-lg-12 pl-3 pt-3">
          <table class="table table-hover border bg-white">
            <thead>
              <tr>
                <th>Sepet</th>
                <th>Fiyat</th>
                <th style="width:10%;">Adet</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in cartProducts" :key="product.key">
                <td>
                  <div class="row">
                    <div class="col-lg-2 Product-img">
                      <img :src="product.url" alt="..." class="img-responsive" />
                    </div>
                    <div class="col-lg-10">
                      <h4 class="nomargin">{{ product.title }}</h4>
                      <p>{{ product.description }}</p>
                    </div>
                  </div>
                </td>
                <td>{{ product.price | currency }}</td>
                <td data-th="Quantity">
                  <input
                    @change="changeCount(product)"
                    type="number"
                    class="form-control text-center"
                    min="1"
                    v-model="product.count"
                  />
                </td>
                <td class="actions" data-th style="width:10%;">
                  <button class="btn btn-danger btn-sm" @click="removeProduct(product)">
                    <i class="fa fa-trash-o"></i>
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <a
                    href="#"
                    class="btn btn-warning text-white"
                    @click.prevent="goToShoppingList()"
                  >
                    <i class="fa fa-angle-left"></i> Alışverişe Devam Et
                  </a>
                </td>
                <td colspan="2" class="hidden-xs"></td>
                <td class="hidden-xs text-center" style="width:10%;">
                  <strong>{{ getTotalPrice | currency }}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
    <div class="container" v-else>
      <div class="row" style="margin-top : 200px;">
        <div class="col-md-2">
          <i class="fas fa-shopping-cart fa-4x mb-4" style="margin-top : 50px"></i>
        </div>
        <div class="col-md-10">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title my-4">Sepetinizde ürün bulunmamaktadır.</h5>
              <a
                href="#"
                class="btn btn-warning mt-2 btn-block my-4"
                @click.prevent="goToShoppingList()"
              >Alışverişe Başla</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cartProducts: [],
    };
  },
  methods: {
    goToShoppingList() {
      this.$router.push("/urun-listesi");
    },
    removeProduct(product) {
      this.cartProducts.forEach((prd, index) => {
        if (prd === product) {
          this.cartProducts.splice(index, 1);
        }
      });
      localStorage.setItem("cartProducts", JSON.stringify(this.cartProducts));
    },
    changeCount(product) {
      this.cartProducts.forEach((prd) => {
        if (prd.key === product.key) {
          prd.count = product.count;
        }
      });
      localStorage.setItem("cartProducts", JSON.stringify(this.cartProducts));
    },
  },
  computed: {
    getTotalPrice() {
      let totalRrice = 0;
      this.cartProducts.forEach((prd) => {
        totalRrice += parseInt(prd.count) * parseFloat(prd.price);
      });
      if (totalRrice < 0) {
        totalRrice = 0;
      }
      return totalRrice;
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
<style scoped>
body {
  background-color: #f5f5f5;
}
.Product-img img {
  width: 100%;
}
.main-section {
  font-family: "Roboto Condensed", sans-serif;
  margin-top: 100px;
}
</style>