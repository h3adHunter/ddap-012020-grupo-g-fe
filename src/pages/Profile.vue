<template>
  <b-overlay :show="loading" rounded="sm">
    <div id="profile">
      <div id="user">
        <h1>Perfil</h1>
        <p>
          Completá con tus datos personales
        </p>
        <b-form data-vv-scope="userForm" id="userForm" @submit.prevent="handleUpdateProfile">
          <b-row>
            <b-col sm="6">
              <b-form-group
                label="Nombre"
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
                label="Apellido"
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
            label="Número de telefono"
            label-for="userPhoneNbr"
            :invalid-feedback="errors.first('Celular')"
            :state="!submitted && errors.has('Celular')">
            <b-form-input 
              id="userPhoneNbr" 
              name="Celular"
              type="text" 
              v-model="form.user.phoneNbr" 
              v-validate="{ regex: '^([0-9]+)$' }"
              placeholder="Idealmente un celular" 
              autocomplete="off">
            </b-form-input>
          </b-form-group>

          <b-form-group
            label="Dirección del domicilio"
            label-for="address"
            :invalid-feedback="errors.first('Direccion')"
            :state="!submitted && errors.has('Direccion')">
            <b-form-input 
              id="address" 
              name="Direccion"
              type="text" 
              v-model="form.user.address" 
              v-validate="'required'"
              placeholder="Av. Mitre 1234" 
              autocomplete="off">
            </b-form-input>
          </b-form-group>
          
          <b-button 
            id="update-button" 
            type="submit">
            Guardar
          </b-button>

        </b-form>
      </div>
      <div id="shop">
        <h1>Comercio</h1>
        <p>
          Completá con los datos de tu comercio
        </p>
        <b-card id="shopCard" no-body>
          <b-tabs 
            card 
            v-model="tabIndex"
            content-class="mt-3">
            <b-tab 
              title="Información"
              :title-link-class="linkClass(0)">
              <b-form  data-vv-scope="shopForm" id="shopForm" @submit.prevent="handleUpdateShop">
                <b-form-group
                  label="Nombre del comercio"
                  label-for="shopName"
                  :invalid-feedback="errors.first('NombreComercio')"
                  :state="!submitted && errors.has('NombreComercio')">
                  <b-form-input 
                    id="shopName"
                    name="NombreComercio" 
                    type="text" 
                    v-model="form.shop.name"
                    placeholder="p. ej Mi panaderia" 
                    autocomplete="off">
                  </b-form-input>
                </b-form-group>

                <b-form-group
                  label="Email de contacto"
                  label-for="shopEmail"
                  :invalid-feedback="errors.first('EmailComercio')"
                  :state="!submitted && errors.has('EmailComercio')">
                  <b-form-input 
                    id="email" 
                    name="EmailComercio"
                    type="text" 
                    v-model="form.shop.email" 
                    v-validate="'required|email'"
                    placeholder="mipanaderia@gmail.com" 
                    autocomplete="off">
                  </b-form-input>
                </b-form-group>

                <b-form-group
                  label="Número de teléfono"
                  label-for="shopPhoneNbr"
                  :invalid-feedback="errors.first('CelularComercio')"
                  :state="!submitted && errors.has('CelularComercio')">
                  <b-form-input 
                    id="shopPhoneNbr" 
                    name="CelularComercio"
                    type="text" 
                    v-model="form.shop.phoneNbr" 
                    v-validate="{ regex: '^([0-9]+)$' }"
                    placeholder="Idealmente un celular" 
                    autocomplete="off">
                  </b-form-input>
                </b-form-group>
                
                <b-form-group
                  label="Dirección del comercio"
                  label-for="shopAddress"
                  :invalid-feedback="errors.first('DireccionComercio')"
                  :state="!submitted && errors.has('DireccionComercio')">
                  <b-form-input 
                    id="shopAddress" 
                    name="DireccionComercio"
                    type="text" 
                    v-model="form.shop.address" 
                    v-validate="'required'"
                    placeholder="Av. Mitre 1234" 
                    autocomplete="off">
                  </b-form-input>
                </b-form-group>

                <b-button 
                  id="update-button" 
                  type="submit">
                  Guardar
                </b-button>
              </b-form>
            </b-tab>
            <b-tab 
              title="Horarios"
              :title-link-class="linkClass(1)">

            </b-tab>
            <b-tab 
              title="Métodos de pago"
              :title-link-class="linkClass(2)">
              
            </b-tab>
            <b-tab 
              title="Delivery"
              :title-link-class="linkClass(3)">
              
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
        }
      },
      profile: null,
      shop: null,
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
          },
          error => {
            this.$store.dispatch('alert/warning', 'Aún no tenes un comercio', { root: true });
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
                this.$store.dispatch('alert/success', 'Perfil actualizado correctamente', { root: true });
              },
              error => {
                this.$store.dispatch('alert/error', error, { root: true });
              }
				    )
        } else {
          this.$store.dispatch('alert/error', "Nos faltan algunos datos", { root: true });
        }
        this.loading = false
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
                  this.$store.dispatch('alert/success', 'Comercio actualizado correctamente', { root: true });
                },
                error => {
                  this.$store.dispatch('alert/error', error, { root: true });
                }
              )
          } else {
            shopService.add({ profile_id: this.profile._id, ...this.form.shop})
              .then(
                () => {
                  this.$store.dispatch('alert/success', 'Comercio creado correctamente', { root: true });
                },
                error => {
                  this.$store.dispatch('alert/error', error, { root: true });
                }
              )
          }
        } else {
          this.$store.dispatch('alert/error', "Nos faltan algunos datos", { root: true });
        }
        this.loading = false
      })
    },
    linkClass(index) {      
      if (this.tabIndex === index) {
        return ['border-gray bg-transparent text-white']
      } else {
        return ['border-gray bg-gray text-muted']
      }
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
</style>