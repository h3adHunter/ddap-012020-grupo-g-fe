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
        <b-nav-item v-if="true">
          <b-button size="sm" variant="outline-info" to="/register">Registrarse</b-button>
        </b-nav-item>
        <b-nav-item v-if="true">
          <b-button size="sm" variant="info" to="/login">Ingresar</b-button>
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

<script lang="ts">
// import { mapState, mapActions } from "vuex";
import IconifyIcon from '@iconify/vue'
import cart from '@iconify/icons-mdi/cart'

export default {
  name: 'Navbar',
  components: {
    IconifyIcon
  },
  computed: {
    // ...mapState({
    //   account: state => state.account
    // })
  },
  data() {
    return {
      icons: {
        cart: cart
      }
    }
  }
}
</script>

<style scoped>
.bd-navbar {
  background: #563d7c;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25),
    inset 0 -1px 5px rgba(0, 0, 0, 0.25) !important;
}
</style>
