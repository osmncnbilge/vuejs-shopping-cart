<template>
    <div class="container">
        <div class="row">
            <router-link
                        v-for="product in getProducts" :key="product.key" 
                        tag="div"
                        class="col-md-3 shadow card my-4 mr-4"
                        style="cursor : pointer; max-width : 250px"
                        :to="{ name : 'urun-detay', params : { product : product}}">
                        <img :src="product.url" alt="" class="card-img-top" style="height : 300px">
                        <div class="cotainer">
                            <div class="row">
                                <div class="card-body">
                                    <h3 class="card-title">{{ product.title }}</h3>
                                    <p class="card-text">{{ product.description }}</p>
                                </div>
                            </div>
                            <div class="row justify-content-end mr-4 mb-4">
                                <span class="badge badge-pill badge-danger">{{ product.price | currency }}</span>
                            </div>
                        </div>
            </router-link>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
     computed : {
      ...mapGetters(["getProducts"])
    }
}
</script>
<style>

</style>