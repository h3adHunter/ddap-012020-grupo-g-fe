<template>
  <v-container fill-height fluid id="cart">
    <v-row v-if="!cart.shops" align="center" justify="center" dense>
      <v-col align="center" justify="center" cols="12">
        <v-img class="empty-cart" src="https://cdn.dribbble.com/users/44167/screenshots/4199208/empty-cart-rappi.png"></v-img>
        <v-card-title style="justify-content: center;">No tenés productos en tu carrito aún, es tiempo de abastecerse!</v-card-title>
        <b-button class="shopping-button" size="sm" to="/shops">
            <v-icon >{{ icons.shops }}</v-icon>
            Ir al listado de comercios
          </b-button>
      </v-col>
    </v-row>
      
    <v-row v-if="cart.shops" align="center" justify="center" dense>
      <v-col style="margin-top: 20px; margin-bottom: 15px;" cols="10">
        <b-card-title>Tu carrito</b-card-title>
        <b-card-sub-title>Desliza hacia abajo y encontrarás las opciones para realizar tu compra.</b-card-sub-title>
      </v-col>
      <v-col style="margin-top: 20px; margin-bottom: 15px;" align="end" cols="2">
        <v-icon style="margin-top: 15px; margin-right: 20px;">{{ icons.cart }}</v-icon>
      </v-col>
      <v-card style="width: 100%;" raised>
        <v-col
          cols="12" 
          v-for="(shop, i) in cart.shops" 
          :key="i" >
          <v-card
            v-if="shop"
            :color="shop.color"
            dark
            raised>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div style="width: 100%;">
                <v-card-title
                  v-text="shop.name">
                </v-card-title>

                <v-card-subtitle v-text="shop.shop_category"></v-card-subtitle>
                <v-card-text>
                  <v-row
                    align="center"
                    class="mx-0">
                    <div class="mr-2">{{shop.address}}</div>
                  </v-row>
                </v-card-text>
              </div>

              <v-avatar
                class="m-3"
                size="80"
                tile>
                <v-img :src="shop.picUrl"></v-img>
              </v-avatar>
            </div>
          </v-card>

          <v-card
            color="#ffffff"
            dark
            raised>
            <v-row 
              class="m-2">
              <v-col
                v-for="(product, i) in shop.products" 
                :key="i" 
                cols="6">
                <v-card
                  class="m-1 product-card"
                  color="#eeeeee"
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
                    <v-row align="center">
                      <v-col style="padding-bottom: 0px; padding-top: 0px;" align="start" justify="start" cols="6">
                        <v-label bold>Cant</v-label>
                        <b-form-input v-model="product.quantity" type="number"></b-form-input>
                      </v-col>
                      <v-col style="padding-bottom: 0px; padding-top: 0px;" align="end" justify="start" cols="6">
                        
                        <v-label>Total</v-label>
                        <v-chip
                          style="width: 100%"
                          color="#ffe91f"
                          text-color="#0f0f0f">
                          $ {{calculateTotalPrice(product)}}
                        </v-chip>
                      
                        
                      </v-col>                      
                    </v-row>
                  </v-card-text>
                  
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-card>
      
      <v-container style="background: #f8f8f8; border-radius: 10px; margin-top: 20px;" fluid>
        <v-row style="margin-top: 30px; margin-bottom: 15px;" align="center" cols="12">
          <v-col style="padding-bottom: 0px; padding-top: 0px;" align="start" justify="start" cols="12">
            <b-card-title>Resumen de compra</b-card-title>
            <v-container v-for="(shop, i) in cart.shops" :key="i">
              <v-chip :color="shop.color" text-color="#eeeeee">{{shop.name}}</v-chip>
              <v-card-text v-for="(product, j) in shop.products" :key="j">
                {{buildProductResume(product)}}
              </v-card-text>
            </v-container>
          </v-col>
          <v-row style="padding-bottom: 0px; padding-top: 0px;" align="start" justify="end" cols="12">
            <v-col style="padding-bottom: 0px; padding-top: 0px; padding-left: 35px;">
              <v-label>Total</v-label>
            </v-col>
            <v-col style="padding-bottom: 0px; padding-top: 0px; padding-right: 30px;" align="end">  
              <v-chip
                style="width: 50%"
                color="#ffe91f"
                text-color="#0f0f0f">
                $ {{calculateTotalCartPrice(cart)}}
              </v-chip>
            </v-col>
          </v-row>                      
        </v-row>
      </v-container>

      <v-container fluid>
        <v-row style="margin-top: 30px; margin-bottom: 15px;" align="center" cols="12">
          <v-col style="padding-bottom: 0px; padding-top: 0px;" align="start" justify="start" cols="12">
            <v-card-title>Confirmar tu pedido notificará a cada comercio y se contactarán con vos directamente.</v-card-title>
            <v-card-subtitle>Podrás coordinar con ellos para retirar en el local o solicitar que te lo envien a tu casa.</v-card-subtitle>
          </v-col>
          <v-col style="padding-bottom: 0px; padding-top: 0px;" align="end" justify="start" cols="12">
            <v-btn 
              large 
              class="confirm-button" 
              color="#1b9e17"
              @click="confirmOrder(cart)">
              <v-icon style="margin-right: 10px;">{{ icons.confirm }}</v-icon>
              Confirmar
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      
    </v-row>
  </v-container>
</template>

<script>
import { orderService } from '../services/order.service'
import { profileService } from '../services/profile.service'
import { mdiCart, mdiStore, mdiHandOkay } from '@mdi/js'
import { mapState } from 'vuex'

export default {
  name: 'Cart',
  data() {
    return {
      icons: {
        cart: mdiCart,
        shops: mdiStore,
        confirm: mdiHandOkay
      },
      loading: false
    }
  },
  created() {
    if (this.cart.shops) {
      console.log("Tiene productos en el carrito")
    } else {
      console.log("No tiene productos en el carrito")
    }
  },
  computed: {
    ...mapState({
      cart: state => state.cart,
      account: state => state.account
    })
  },
  methods: { 
    calculateTotalPrice(product) {
      product.totalPrice = product.quantity * product.price
      return product.totalPrice
    },
    calculateTotalCartPrice(cart) {
      cart.totalPrice = cart.shops.reduce( (partialTotalPrice, shop) => {
        return partialTotalPrice + shop.products.reduce( (shopTotal, product) => {
          return shopTotal + product.totalPrice
        }, 0)
      }, 0)
      return cart.totalPrice
    },
    buildProductResume(product) {
      return `${product.quantity} x ${product.name} .................................................................. $ ${product.totalPrice}`
    },
    confirmOrder(cart) {
      profileService.getById(this.account.user._id).then( profile => {
        const orderPayload = {
          profile_id: profile._id,
          cart: cart.shops
        }
        orderService.add(orderPayload)
          .then( () => {
            this.$router.push('/orders')
          })
      })
    }
  }
}
</script>

<style scoped>
div#cart {
  align-items: center;
  background-color: #e2e2e5;
  display: flex;
  justify-content: center;
  width: 100%;
}

.empty-cart {
  margin-top: 80px;
  border-radius: 50%;
  width: 40%;
}

.shopping-button {
  background-color: transparent;
  border-width: 0.1px;
  cursor: pointer;
  border: solid;
  border-color: #666666;
  color: #0f0f0f;
  padding: 10px;
  font-size: 18px;
  transition: background-color 0.2s ease-in-out;
  width: 50%;
}

.shopping-button:hover {
  border-color: #fbff1e00;
  background-color: #0f0f0f;
  color: #ffffff;
}

.center-container {
  align-items: center;
  display: flex;
  justify-content: center;
}

.product-card {
  color: #000000;
}

.product-total {
}

.v-label {
  font-weight: 500;
  font-size: 20px;
  margin-top: 8px !important; 
  margin-right: 7px !important;
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

.confirm-button { 
  color: #ffffff;
}

</style>