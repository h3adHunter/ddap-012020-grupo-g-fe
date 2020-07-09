<template>
  <v-container id="shopDetail">
    <v-row dense>
      <v-col
        cols="12">
        <v-card
          v-if="shop"
          :color="shop.color"
          dark
          raised>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div style="width: 100%;">
              <v-card-title
                class="headline"
                v-text="shop.name">
              </v-card-title>

              <v-card-subtitle v-text="shop.shop_category"></v-card-subtitle>
              <v-card-text>
                <v-row
                  align="center"
                  class="mx-0"
                >
                  <div class="mr-2">{{shop.address}}</div>
                  <v-rating
                    :value="shop.rating"
                    color="#fcbe12"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>
                </v-row>

                <div>{{shop.desc}}</div>
              </v-card-text>
            </div>

            <v-avatar
              class="m-3"
              size="125"
              tile>
              <v-img :src="shop.picUrl"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
      
      <v-col
        cols="12">
        <v-card
          color="#ffffff"
          dark
          raised>
          <v-row 
            class="m-2">
            <v-col
              v-for="(product, i) in products" 
              :key="i" 
              cols="3">
              <v-card
                class="m-1 product-card"
                color="#eeeeee"
                dark
                raised>
                <div 
                  class="center-container">
                  <v-avatar
                    class="m-3"
                    size="125px"
                    round>
                    <v-img :src="product.picUrl"></v-img>
                  </v-avatar>
                </div>
                
                <v-card-title
                  class="title"
                  v-text="product.name">
                </v-card-title>
                
                <v-card-text>
                  <v-row
                    class="brand"
                    align="center">
                    <v-col align="start" cols="6">
                      <div>{{$t('brand')}}: {{product.brand}}</div>
                      <div>{{$t('stock')}}: {{product.stock}}</div>
                    </v-col>
                    <v-col align="end" cols="6">
                      <v-chip
                        :color="shop.color"
                        text-color="#ffffff">
                        $ {{product.price}}
                      </v-chip>
                    </v-col>
                  </v-row>
                  <v-row v-if="product.stock === 0">
                    <v-col align="start">
                      <v-chip
                        color="#ff0000"
                        text-color="#ffffff">
                        Sin stock
                      </v-chip>
                    </v-col>
                  </v-row>
                  <v-row v-if="product.stock > 0">
                    <v-col align="start" cols="7">
                      <b-form-input v-model="product.quantity" type="number"></b-form-input>
                    </v-col>
                    <v-col align="end" cols="2">
                      <b-button :disabled="product.quantity === '0'" variant="info" @click="addProduct(product)">
                        <v-icon color="#ffffff">{{ icons.addCart }}</v-icon>
                      </b-button>
                    </v-col>
                  </v-row>
                  
                </v-card-text>
                
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { shopService } from '../services/shop.service';
import { productService } from '../services/product.service';
import { mdiCartPlus } from '@mdi/js'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      icons: {
        addCart: mdiCartPlus
      },
      shop: null,
      products: [],
      loading: false
    }
  },
  created() {
    shopService.getById(this.$route.params.shopId)
      .then(
        shop => {
          this.shop = shop
          productService.getByShopId(shop._id)
            .then(
              products => {
                this.products = products.map( product => {
                  return {
                    ...product,
                    quantity: '0'
                  }
                })
              },
              error => {
                this.$store.dispatch('alert/error', error, { root: true });
              }
            );
        },
        error => {
          this.$store.dispatch('alert/error', error, { root: true });
        }
      );
  },
  computed: { 
    
  },
  methods: { 
    ...mapActions('cart', ['addProduct']),
    handleAddToCart(product) {
      console.log(product)
    }
  }
}
</script>

<style scoped>
div#shopDetail {
  align-items: center;
  background-color: #e2e2e5;
  display: flex;
  justify-content: center;
  width: 100%;
}

.center-container {
  align-items: center;
  display: flex;
  justify-content: center;
}

.product-card {
  color: #000000;
}

.title {
  padding: 0px 16px;
}

.brand {
  color: #555555 !important;
}

.stock {
  color: #555555;
}

.price {
  color: #000000;
}
</style>