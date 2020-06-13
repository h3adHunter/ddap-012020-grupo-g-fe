<template>
  <v-container id="shops">
    <v-row dense>
      <v-col cols="12">
        <v-card
          color="#0f0f0f"
          dark
          raised>

          <v-card-title class="headline">Compra y vende desde tu casa, registrate ahora</v-card-title>
          <v-card-subtitle>Navegá a través de los comercios o crea el tuyo. Agrega productos a tu changuito, hace tu pedido y recibilo en la puerta de tu casa.</v-card-subtitle>

          <v-card-actions>
            <v-btn text to="/register">¿Todavía no te registraste?</v-btn>
          </v-card-actions>
          
        </v-card>
      </v-col>

      <v-col
        v-for="(shop, index) in shops"
        :key="index"
        cols="12">
        <v-card
          :color="shop.color"
          dark
          raised
          @click="handleShopDetail(shop)">
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
    </v-row>
  </v-container>
</template>

<script>
import { shopService } from '../services/shop.service';

export default {
  name: 'Login',
  data() {
    return {
      shops: [],
      loading: false
    }
  },
  created() {
    shopService.getAll()
      .then(
        shops => {
          this.shops = shops
          console.log(shops)
        },
        error => {
          this.$store.dispatch('alert/error', error, { root: true });
        }
      );
  },
  computed: { },
  methods: { 
    handleShopDetail(shop) {
      console.log(shop)
      this.$router.push({ path: `/shops/${shop._id}` })
    }
  }
}
</script>

<style scoped>
div#shops {
  align-items: center;
  background-color: #e2e2e5;
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>