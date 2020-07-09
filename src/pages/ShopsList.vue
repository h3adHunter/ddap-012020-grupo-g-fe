<template>
  <v-container id="shops">
    <v-row dense>
      <v-col cols="12"  v-if="!account.user">
        <v-card
          color="#0f0f0f"
          dark
          raised>

          <v-card-title class="headline">{{$t('buy_from_home')}}</v-card-title>
          <v-card-subtitle>{{$t('buy_from_home2')}}</v-card-subtitle>

          <v-card-actions>
            <v-btn text to="/register">{{$t('not_registered_yet')}}</v-btn>
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
import { mapState } from 'vuex'

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
        },
        error => {
          this.$store.dispatch('alert/error', error, { root: true });
        }
      );
  },
  computed: {
    ...mapState({
      account: state => state.account
    })
  },
  methods: { 
    handleShopDetail(shop) {
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