<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 offset-3 card my-4 shadow">
                <div class="card-body">
                    <h3>Ürün Ekleme</h3>
                    <hr>
                    <div class="form-group">
                        <label>Ürün Adı</label>
                        <input v-model="product.title" type="text" class="form-control" placeholder="Ürün adını giriniz..">
                    </div>
                    <div class="form-group">
                        <label>Fiyat</label>
                        <input v-model="product.price" type="text" class="form-control" placeholder="Ürün fiyatı giriniz..">
                    </div>
                    <div class="form-group">
                        <label>Resim URL</label>
                        <input v-model="product.url" type="text" class="form-control" placeholder="Ürün Resminin URL'ini giriniz..">
                    </div>
                    <div class="form-group">
                        <label>Açıklama</label>
                        <textarea v-model="product.description" cols="30" rows="5" placeholder="Ürüne ait  bir açıklama giriniz..."
                                class="form-control"></textarea>
                    </div>
                    <hr>
                    <button class="btn btn-primary" :disabled="saveEnabled" @click="saveProduct()">Kaydet</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            product : {
                title : "",
                price : null, 
                url : "",
                description : ""
            },
            saveButtonClicked : false
        }
    },
    methods: {
        saveProduct(){
            this.saveButtonClicked = true; 
            this.$store.dispatch("saveProduct", this.product); 
        }
    },
    computed: {
        saveEnabled(){
            if(this.product.title.length > 0 && this.product.price > 0 && this.product.description.length > 0 && this.product.url.length > 0){
                return false;
            } else {
                return true;
            }
        }
    },
    beforeRouteLeave (to, from, next) {
        if((this.product.title.length > 0 || this.product.price > 0 || this.product.description.length > 0) && !this.saveButtonClicked){
            if(confirm("Kaydedilmemiş veriler var, yine de çıkmak istiyor musunuz?")){
                next();
            } else {
                next(false);
            }
        } else {
            next();
        }
    }
}
</script>
<style>

</style>