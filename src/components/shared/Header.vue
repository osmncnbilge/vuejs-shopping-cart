<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <router-link tag="a" to="/urun-listesi" class="navbar-brand">Ürün Listesi</router-link>
      <ul class="navbar-nav">
        <router-link tag="li" to="/urun-ekleme" class="nav-item" :class="isAdminClass">
          <a class="nav-link">
            Ürün Ekleme
            <span class="sr-only">(current)</span>
          </a>
        </router-link>
      </ul>
      <ul class="navbar-nav ml-auto">
        <router-link tag="li" to="/sepet" class="nav-item">
          <a class="nav-link">
            Sepet
            <span class="sr-only">(current)</span>
          </a>
        </router-link>
        <li class="nav-item" :class="logOutClass">
          <a @click.prevent="logout()" class="nav-link" href="#">Çıkış Yap</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
      localStorage.removeItem("cartProducts");
    },
  },
  computed: {
    logOutClass() {
      return {
        "d-none": !this.$store.getters.isAuthenticated,
      };
    },
    isAdminClass() {
      return {
        "d-none": !this.$store.getters.isAdminAuthenticated,
      };
    },
  },
};
</script>
<style>
</style>