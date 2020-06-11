<template>
  <div>
    <b-navbar class="bd-navbar" type="dark" toggleable="lg">
      <b-navbar-brand to="/">
        <img src="../assets/logo.png" width="150px" />
      </b-navbar-brand>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Buscar comercios"></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Buscar</b-button>
        </b-nav-form>-->
        <b-nav-item>
          <b-button class="shops-button" size="sm" to="/shops">Listado de Comercios</b-button>
        </b-nav-item>
        <b-nav-item v-if="!account.user">
          <b-button class="register-button" size="sm" to="/register">Registrarse</b-button>
        </b-nav-item>
        <b-nav-item v-if="!account.user">
          <b-button class="login-button" size="sm" to="/login">Ingresar</b-button>
        </b-nav-item>
        <b-nav-item v-if="account.user">
          <b-button class="profile-button" size="sm" to="/profile">Perfil</b-button>
        </b-nav-item>
        <b-nav-item v-if="account.user">
          <b-button class="logout-button" size="sm" to="/" @click="handleLogout()">Cerrar sesión</b-button>
        </b-nav-item>
        <!-- <b-nav-item-dropdown right>
                    <template v-slot:button-content>
                        <v-icon>
                            {{mdiAccount}}
                        </v-icon>
                        {{account.user.firstName}}
                    </template>
                    <b-dropdown-item>
                        <router-link to="/account">Mi cuenta</router-link>
                    </b-dropdown-item>
                    <b-dropdown-item>
                        <router-link to="/orders">Mis pedidos</router-link>
                    </b-dropdown-item>
                    <b-dropdown-item>
                        <router-link to="/addresses">Mis direcciones</router-link>
                    </b-dropdown-item>
                    <b-dropdown-item>
                        <router-link to="/login">Cerrar sesión</router-link>
                    </b-dropdown-item>
        </b-nav-item-dropdown>-->
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import IconifyIcon from '@iconify/vue'
import cart from '@iconify/icons-mdi/cart'

export default {
  name: 'Navbar',
  data() {
    return {
      icons: {
        cart: cart
      }
    }
  },
  components: {
    IconifyIcon
  },
  computed: {
    ...mapState({
      account: state => state.account
    })
  },
  methods: {
    ...mapActions('account', ['logout']),
    handleLogout() {
      this.logout()
    }
  }
}
</script>

<style scoped>
.bd-navbar {
  background: #0f0f0f;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25),
    inset 0 -1px 5px rgba(0, 0, 0, 0.25) !important;
}

.login-button {
  background-color: #ffffff;
  color: #333333;
  cursor: pointer;
  border: none;
  padding: 10px;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
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
  width: 100%;
}

.register-button:hover {
  background-color: #cccccc;
  color: #000000;
}

.shops-button {
  background-color: #745d8a;
  color: #ffffff;
  cursor: pointer;
  border: none;
  padding: 10px;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
}

.profile-button {
  background-color: #173541;
  color: #cccccc;
  cursor: pointer;
  border: none;
  padding: 10px;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
}

.logout-button {
  background-color: #7a909900;
  color: #cccccc;
  cursor: pointer;
  border: none;
  padding: 10px;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
}

.logout-button:hover {
  background-color: #cccccc;
  color: #000000;
}


</style>
