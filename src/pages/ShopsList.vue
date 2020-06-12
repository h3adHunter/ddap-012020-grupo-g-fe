<template>
  <v-container id="login">
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
        v-for="(item, i) in items"
        :key="i"
        cols="12">
        <v-card
          :color="item.color"
          dark
          raised
          @click="handleShopDetail()">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div style="width: 100%;">
              <v-card-title
                class="headline"
                v-text="item.name">
              </v-card-title>

              <v-card-subtitle v-text="item.shop_category"></v-card-subtitle>
              <v-card-text>
                <v-row
                  align="center"
                  class="mx-0"
                >
                  <div class="mr-2">{{item.address}}</div>
                  <v-rating
                    :value="item.rating"
                    color="#fcbe12"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>
                </v-row>

                <div>{{item.desc}}</div>
              </v-card-text>
            </div>

            <v-avatar
              class="m-3"
              size="125"
              tile>
              <v-img :src="item.picUrl"></v-img>
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
      items: [
        {
          color: '#1F7087',
          picUrl: 'https://media.versionrosario.com/adjuntos/248/imagenes/000/073/0000073472.jpg',
          name: 'Lo de Martín',
          desc: 'Almacén de barrio',
          rating: 4.5,
          shop_category: "Almacén"
        },
        {
          color: '#cf2c29',
          picUrl: 'https://assets.entrepreneur.com/content/3x2/2000/20180523134045-panaderiqa.jpeg?width=700&crop=2:1',
          name: 'Panadería Bugatto',
          desc: 'La mejor panadería de Quilmes',
          rating: 5,
          shop_category: "Panadería"
        },
      ],
      loading: false
    }
  },
  created() {
    shopService.getAll()
      .then(
        shops => {
          this.items = shops
          console.log(shops)
        },
        error => {
          this.$store.dispatch('alert/error', error, { root: true });
        }
      );
  },
  computed: { },
  methods: { 
    handleShopDetail() {
      alert("Holi")
    }
  }
}
</script>

<style scoped>
div#login {
  align-items: center;
  background-color: #e2e2e5;
  display: flex;
  justify-content: center;
  width: 100%;
}

div#login div#description {
  background-color: #ffffff;
  width: 250px;
  padding: 35px;
  text-align: center;
  border-radius: 5px 0px 0px 5px;
  box-shadow: -20px 0px 30px 0px #666
}

div#login div#description h1,
div#login div#description p {
  margin: 0;
}

div#login div#description p {
  font-size: 0.8em;
  color: #5a5a5a;
  margin-top: 10px;
}

@media screen and (max-width: 600px) {
  div#login {
    align-items: unset;
    background-color: unset;
    display: unset;
    justify-content: unset;
  }

  div#login div#description {
    margin: 0 auto;
    max-width: 350px;
    width: 100%;
  }

  div#login div#form {
    border-radius: unset;
    box-shadow: unset;
    width: 100%;
  }
}

.login-button {
  background-color: #ffffff;
  color: #333333;
  cursor: pointer;
  border: none;
  padding: 10px;
  transition: background-color 0.2s ease-in-out;
}

.login-button:hover {
  background-color: #cccccc;
  color: #000000;
}

.register-button {
  background-color: #173541;
  color: #cccccc;
  cursor: pointer;
  border: none;
  padding: 10px;
  transition: background-color 0.2s ease-in-out;
}

.register-button:hover {
  background-color: #cccccc;
  color: #000000;
}


</style>