<template>
  <b-overlay :show="loading" rounded="sm">
    <div id="profile">
      <div id="user">
        <h1>{{$t('profile')}}</h1>
        <p>{{$t('fill_with_your_account_data')}}</p>
        <b-form data-vv-scope="userForm" id="userForm" @submit.prevent="handleUpdateProfile">
          <b-row>
            <b-col sm="6">
              <b-form-group
                :label="$t('name')"
                label-for="firstName"
                :invalid-feedback="errors.first('Nombre')"
                :state="!submitted && errors.has('Nombre')">
                <b-form-input 
                  id="firstName"
                  name="Nombre" 
                  type="text" 
                  v-model="form.user.firstName" 
                  v-validate="'required'"
                  placeholder="Pablo" 
                  autocomplete="off">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group
                :label="$t('surname')"
                label-for="lastName"
                :invalid-feedback="errors.first('Apellido')"
                :stateuser="!submitted && errors.has('Apellido')">
                <b-form-input 
                  id="lastName" 
                  name="Apellido" 
                  type="text" 
                  v-model="form.user.lastName" 
                  v-validate="'required'"
                  placeholder="Neruda" 
                  autocomplete="off">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-form-group
            label="Email"
            label-for="email"
            :invalid-feedback="errors.first('Email')"
            :state="!submitted && errors.has('Email')">
            <b-form-input 
              id="email" 
              name="Email"
              type="text" 
              v-model="form.user.email" 
              v-validate="'required|email'"
              placeholder="pablo.neruda@gmail.com" 
              autocomplete="off">
            </b-form-input>
          </b-form-group>

          <b-form-group
            :label="$t('phone_number')"
            label-for="userPhoneNbr"
            :invalid-feedback="errors.first('Celular')"
            :state="!submitted && errors.has('Celular')">
            <b-form-input 
              id="userPhoneNbr" 
              name="Celular"
              type="text" 
              v-model="form.user.phoneNbr" 
              v-validate="{ regex: '^([0-9]+)$' }"
              :placeholder="$t('phone_number_info')" 
              autocomplete="off">
            </b-form-input>
          </b-form-group>

          <b-form-group
            :label="$t('address')"
            label-for="address"
            :invalid-feedback="errors.first('Direccion')"
            :state="!submitted && errors.has('Direccion')">
            <b-form-input 
              id="address" 
              name="Direccion"
              type="text" 
              v-model="form.user.address" 
              v-validate="'required'"
              :placeholder="$t('address_example')"
              autocomplete="off">
            </b-form-input>
          </b-form-group>
          
          <b-button 
            id="update-button" 
            type="submit">
            {{$t('save')}}
          </b-button>

        </b-form>
      </div>
      <div id="shop">
        <h1>{{$t('shop')}}</h1>
        <p>
          {{$t('fill_with_your_shop_data')}}
        </p>
        <b-card id="shopCard" no-body>
          <b-tabs 
            card 
            v-model="tabIndex"
            content-class="mt-3">
            <b-tab 
              :title="$t('shop_data')"
              :title-link-class="linkClass(0)">
              <b-form  data-vv-scope="shopForm" id="shopForm" @submit.prevent="handleUpdateShop">
                <b-form-group
                  :label="$t('shop_name')"
                  label-for="shopName"
                  :invalid-feedback="errors.first('NombreComercio')"
                  :state="!submitted && errors.has('NombreComercio')">
                  <b-form-input 
                    id="shopName"
                    name="NombreComercio" 
                    type="text" 
                    v-model="form.shop.name"
                    :placeholder="$t('shop_name_example')" 
                    autocomplete="off">
                  </b-form-input>
                </b-form-group>

                <b-form-group
                  :label="$t('shop_email')"
                  label-for="shopEmail"
                  :invalid-feedback="errors.first('EmailComercio')"
                  :state="!submitted && errors.has('EmailComercio')">
                  <b-form-input 
                    id="email" 
                    name="EmailComercio"
                    type="text" 
                    v-model="form.shop.email" 
                    v-validate="'required|email'"
                    :placeholder="$t('email_example')" 
                    autocomplete="off">
                  </b-form-input>
                </b-form-group>

                <b-form-group
                  :label="$t('phone_number')"
                  label-for="shopPhoneNbr"
                  :invalid-feedback="errors.first('CelularComercio')"
                  :state="!submitted && errors.has('CelularComercio')">
                  <b-form-input 
                    id="shopPhoneNbr" 
                    name="CelularComercio"
                    type="text" 
                    v-model="form.shop.phoneNbr" 
                    v-validate="{ regex: '^([0-9]+)$' }"
                    :placeholder="$t('phone_number_info')" 
                    autocomplete="off">
                  </b-form-input>
                </b-form-group>

                <b-form-group
                  :label="$t('shop_address')"
                  label-for="shopAddress"
                  :invalid-feedback="errors.first('DireccionComercio')"
                  :state="!submitted && errors.has('DireccionComercio')">
                  <b-form-input 
                    id="shopAddress" 
                    name="DireccionComercio"
                    type="text" 
                    v-model="form.shop.address" 
                    v-validate="'required'"
                    :placeholder="$t('address_example')" 
                    autocomplete="off">
                  </b-form-input>
                </b-form-group>  

                <b-button 
                  id="update-button" 
                  type="submit">
                  {{$t('save')}}
                </b-button>
              </b-form>
            </b-tab>
            <b-tab 
              :title="$t('time_schedule')"
              :title-link-class="linkClass(1)"> 
              <b-form  data-vv-scope="shopForm" id="shopForm" @submit.prevent="handleUpdateShop">
                <b-form-group
                  :label="$t('time_schedule')"
                  label-for="timeSchedule"
                  :invalid-feedback="errors.first('timeSchedule')"
                  :state="!submitted && errors.has('timeSchedule')">
                  <b-form-input 
                    id="timeSchedule"
                    name="timeSchedule" 
                    type="text" 
                    v-model="form.shop.timeSchedule"
                    :placeholder="$t('shop_url_example')" 
                    autocomplete="off">
                  </b-form-input>
                </b-form-group>

                <b-form-timepicker v-model="form.shop.timeSchedule" locale="en">
                </b-form-timepicker>
                <b-button 
                  id="update-button" 
                  type="submit">
                  {{$t('save')}}
                </b-button>
              </b-form>

            </b-tab>
            <b-tab 
              :title="$t('payment_methods')"
              :title-link-class="linkClass(2)">
              
            </b-tab>
            <b-tab 
              title="Delivery"
              :title-link-class="linkClass(3)">
              
            </b-tab>
            <b-tab 
              :title="$t('extras')"
              :title-link-class="linkClass(1)">
              <b-form  data-vv-scope="shopForm" id="shopForm" @submit.prevent="handleUpdateShop">
                <b-form-group
                  :label="$t('shop_pic_url')"
                  label-for="picUrl"
                  :invalid-feedback="errors.first('picUrl')"
                  :state="!submitted && errors.has('picUrl')">
                  <b-form-input 
                    id="picUrl"
                    name="picUrl" 
                    type="text" 
                    v-model="form.shop.picUrl"
                    :placeholder="$t('shop_url_example')" 
                    autocomplete="off">
                  </b-form-input>
                </b-form-group>

                <b-form-group
                  :label="$t('shop_desc')"
                  label-for="desc"
                  :invalid-feedback="errors.first('desc')"
                  :state="!submitted && errors.has('desc')">
                  <b-form-input 
                    id="desc"
                    name="desc" 
                    type="text" 
                    v-model="form.shop.desc"
                    :placeholder="$t('shop_desc_example')" 
                    autocomplete="off">
                  </b-form-input>
                </b-form-group>

                <b-button 
                  id="update-button" 
                  type="submit">
                  {{$t('save')}}
                </b-button>
              </b-form>
            </b-tab>

            <b-tab 
              :title="$t('products')"
              :title-link-class="linkClass(2)">
              <b-button v-b-modal.addProductModal>{{$t('add_product')}}</b-button>

                <b-modal id="addProductModal"
                 :title="$t('add_product')"
                 @ok="handleOk">
                  <b-form  data-vv-scope="addProductForm" id="addProductForm" @submit.prevent="handleAddProduct">
                    <b-form-group
                      :label="$t('product_name')"
                      label-for="productName"
                      :invalid-feedback="errors.first('NombreProducto')"
                      :state="!submitted && errors.has('NombreProducto')">
                      <b-form-input 
                        id="productName"
                        name="NombreProducto" 
                        type="text" 
                        v-model="form.addProduct.name"
                        v-validate="'required'"
                        autocomplete="off">
                      </b-form-input>
                    </b-form-group>

                    <b-form-group
                      :label="$t('product_brand')"
                      label-for="productBrand"
                      :invalid-feedback="errors.first('MarcaProducto')"
                      :state="!submitted && errors.has('MarcaProducto')">
                      <b-form-input 
                        id="productBrand" 
                        name="MarcaProducto"
                        type="text" 
                        v-model="form.addProduct.brand" 
                        v-validate="'required'"
                        autocomplete="off">
                      </b-form-input>
                    </b-form-group>

                    <b-form-group
                      :label="$t('product_stock')"
                      label-for="productStock"
                      :invalid-feedback="errors.first('StockProducto')"
                      :state="!submitted && errors.has('StockProducto')">
                      <b-form-input 
                        id="productStock" 
                        name="StockProducto"
                        type="text" 
                        v-model="form.addProduct.stock" 
                        v-validate="{ regex: '^([0-9]+)$' }"
                        autocomplete="off">
                      </b-form-input>
                    </b-form-group>

                    <b-form-group
                      :label="$t('product_price')"
                      label-for="productPrice"
                      :invalid-feedback="errors.first('PrecioProducto')"
                      :state="!submitted && errors.has('PrecioProducto')">
                      <b-form-input 
                        id="productPrice" 
                        name="PrecioProducto"
                        type="text" 
                        v-model="form.addProduct.price" 
                        v-validate="{ regex: '^([0-9]+)$' }"
                        autocomplete="off">
                      </b-form-input>
                    </b-form-group>                    

                    <b-form-group
                      :label="$t('product_pic_url')"
                      label-for="productPicUrl"
                      :invalid-feedback="errors.first('ImagenProducto')"
                      :state="!submitted && errors.has('ImagenProducto')">
                      <b-form-input 
                        id="productPicUrl" 
                        name="ImagenProducto"
                        type="text" 
                        v-model="form.addProduct.picUrl" 
                        v-validate="'required'"
                        autocomplete="off">
                      </b-form-input>
                    </b-form-group>  
                  </b-form>
              </b-modal>
              <v-col
                cols="12">
                  
                  <v-row 
                  class="m-2"
                  id="nav-scroller"
                  ref="content"
                  style="position:relative; height:300px; overflow-y:scroll;">
                    <v-col
                      v-for="(product, i) in products" 
                      :key="i" 
                      cols="6">
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
        <!--                 
                        <v-card-subtitle 
                          class="brand"
                          v-text="product.brand">
                        </v-card-subtitle> -->
                        <v-card-text>
                          <v-row
                            class="brand"
                            align="center">
                            <v-col align="start" cols="6">
                              <div>{{product.brand}}</div>
                            </v-col>
                            <v-col align="end" cols="6">
                              <v-chip
                                :color="shop.color"
                                text-color="#ffffff"
                              >
                                $ {{product.price}}
                              </v-chip>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
              </v-col>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </b-overlay>
</template>

<script>
import { mapState } from 'vuex'
import { profileService } from '../services/profile.service'
import { shopService } from '../services/shop.service'
import { productService } from '../services/product.service'

export default {
  name: "Profile",
  data() {
    return {
      form: {
        user: {
          firstName: '',
          lastName: '',
          email: '',
          phoneNbr: '',
          address: ''
        },
        shop: {
          name: '',
          email: '',
          phoneNbr: '',
          address: ''
        },
        addProduct: {
          name: '',
          brand: '',
          stock: '',
          price: '',
          picUrl: '',
          product_category_id: '5ed1c6ebf024a96817940a51',
        }
      },
      profile: null,
      shop: null,
      products: [],
      submitted: false,
      loading: false,
      tabIndex: 0
    };
  },
  created() {
    profileService.getById(this.account.user._id).then( profile => {
      this.profile = profile
      const userData = JSON.parse(JSON.stringify(this.account))      
      this.form.user.firstName = profile.firstName || null
      this.form.user.lastName = profile.lastName || null
      this.form.user.email = userData.user.email || null
      this.form.user.phoneNbr = profile.phoneNbr || null
      this.form.user.address = profile.address || null
      
      shopService.getByProfileId(profile._id)
        .then( 
          shop => {   
            this.shop = shop
            this.form.shop.name = shop.name || null
            this.form.shop.email = shop.email || null
            this.form.shop.phoneNbr = shop.phoneNbr || null
            this.form.shop.address = shop.address || null
            this.form.shop.picUrl = shop.picUrl || null            
            this.form.shop.desc = shop.desc || null
            
            this.refreshProducts()
          },
          () => {
            this.$store.dispatch('alert/warning', this.$t('no_shop_yet'), { root: true });
          }
        )

    })
  },
  computed: {
    ...mapState({
      account: state => state.account
    })
  },
  mounted() {},
  methods: {
		handleUpdateProfile() {
      this.submitted = true
      this.loading = true
      this.$validator.validateAll('userForm').then(valid => {
        if (valid) {
          const userData = JSON.parse(JSON.stringify(this.account))
          profileService.update(userData.user._id, this.form.user)
            .then(
              () => {
                this.loading = false
                this.$store.dispatch('alert/success', this.$t('profile_updated'), { root: true });
              },
              error => {
                this.loading = false
                this.$store.dispatch('alert/error', error, { root: true });
              }
				    )
        } else {
          this.loading = false
          this.$store.dispatch('alert/error', this.$t('missing_data'), { root: true });
        }
      })
    },
    handleUpdateShop() {
      this.submitted = true
      this.loading = true
      this.$validator.validateAll('shopForm').then(valid => {
        if (valid) {
          if (this.shop) {
            shopService.update(this.shop._id, this.form.shop)
              .then(
                () => {
                  this.loading = false
                  this.$store.dispatch('alert/success', 'Comercio actualizado correctamente', { root: true });
                },
                error => {
                  this.loading = false
                  this.$store.dispatch('alert/error', error, { root: true });
                }
              )
          } else {
            shopService.add({ profile_id: this.profile._id, ...this.form.shop})
              .then(
                () => {
                  this.loading = false
                  this.$store.dispatch('alert/success', this.$t('shop_created'), { root: true });
                },
                error => {
                  this.loading = false
                  this.$store.dispatch('alert/error', error, { root: true });
                }
              )
          }
        } else {
          this.loading = false
          this.$store.dispatch('alert/error', this.$t('missing_data'), { root: true });
        }
      })
    },
    linkClass(index) {      
      if (this.tabIndex === index) {
        return ['border-gray bg-transparent text-white']
      } else {
        return ['border-gray bg-gray text-muted']
      }
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      debugger
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleAddProduct()
    },
    handleAddProduct(){
      this.$validator.validateAll('productForm').then(valid => {
        if (valid) {
          productService.add({ shop_id: this.shop._id, ...this.form.addProduct})
            .then(
              () => {
                this.$store.dispatch('alert/success', this.$t('product_created'), { root: true });
                this.$nextTick(() => {
                  this.$bvModal.hide('addProductModal')
                })
                this.refreshProducts()
              },
              error => {
                this.$store.dispatch('alert/error', error, { root: true });
              }
          )
        } else {
          this.$store.dispatch('alert/error', this.$t('missing_data'), { root: true });
        }
      })
    },
    refreshProducts() {
      productService.getByShopId(this.shop._id)
      .then(
        products => {
          this.products = products
          console.log(products)
        },
        error => {
          this.$store.dispatch('alert/error', error, { root: true });
        }
      );          
    }
	}
}
</script>

<style scoped>
div#profile {
  align-items: center;
  background-color: #e2e2e5;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 89vh;
}

div#profile div#user {
  text-align: start;
  background-color: #ffffff;
  color: #161a1f;
  width: 40%;
  padding: 35px;
  border-radius: 5px 0px 0px 5px;
  box-shadow: -20px 0px 30px 0px #666
}

div#profile div#shop {
  text-align: start;
  background-color: #0e1013;
  color: #f3f4f5;
  width: 55%;
  padding: 35px;
  border-radius: 5px 5px 5px 5px;
  box-shadow: 20px 0px 30px 0px #666;
}

div#profile div#shop div#shopCard {
  background: #0e1013;
}

div#profile div#user h1,
div#profile div#user p,
div#profile div#shop h1,
div#profile div#shop p {
  margin: 0;
}

div#profile div#user p,
div#profile div#shop p {
  font-size: 0.8em;
  color: #5a5a5a;
  margin-bottom: 10px;
}

div#profile div#shop input {
  background-color: transparent;
  border: none;
  color: #ecf0f1;
  font-size: 1em;
}

div#profile div#shop ::placeholder {
  color: #bbbbbb;
  opacity: 1;
}

@media screen and (max-width: 1010px) {
  div#profile {
    align-items: unset;
    background-color: unset;
    display: unset;
    justify-content: unset;
  }

  div#profile div#user {
    margin: 0 auto;
    border-radius: 0px 0px 0px 0px;
    box-shadow: 0px 20px 30px 0px #666;
    max-width: 90%;
    width: 100%;
  }

  div#profile div#shop {
    margin: 0 auto;
    border-radius: 0px 0px 0px 0px;
    box-shadow: 0px 20px 30px 0px #666;
    max-width: 90%;
    width: 100%;
  }
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