<template>
  <div>
    <b-navbar class="bd-navbar" type="dark" toggleable="sm">
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
          <b-nav-dropdown v-model="$i18n.locale" :text="$t('language')">
            <b-dropdown-item v-for="(lang, i) in langs" :key="`Lang${i}`" @click="handleLang(lang)">
              {{ lang.name }}
            </b-dropdown-item>
              <!-- <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option> -->
          </b-nav-dropdown>
        </b-nav-item>
        <b-nav-item>
          <b-button class="transparent-button" size="sm" to="/">
            <v-icon color="#cccccc">{{ icons.map }}</v-icon>
          </b-button>
        </b-nav-item>
        <b-nav-item>
          <b-button class="transparent-button" size="sm" to="/shops">
            <v-icon color="#cccccc">{{ icons.shops }}</v-icon>
          </b-button>
        </b-nav-item>
        <b-nav-item v-if="!account.user">
          <b-button class="register-button" size="sm" to="/register">{{$t('register')}}</b-button>
        </b-nav-item>
        <b-nav-item v-if="!account.user">
          <b-button class="login-button" size="sm" to="/login">{{$t('login')}}</b-button>
        </b-nav-item>
        <b-nav-item v-if="account.user">
          <b-button class="transparent-button" size="sm" to="/cart">
            <v-icon color="#cccccc">{{ icons.cart }}</v-icon>
          </b-button>
        </b-nav-item>
        <b-nav-item v-if="account.user">
          <b-button class="transparent-button" size="sm" to="/profile">
            <v-icon color="#cccccc">{{ icons.profile }}</v-icon>
          </b-button>
        </b-nav-item>
        <b-nav-item v-if="account.user">
          <b-button class="transparent-button" size="sm" to="/" @click="handleLogout()">{{$t('logout')}}</b-button>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mdiCart, mdiAccount, mdiStore, mdiMapMarker } from '@mdi/js'

export default {
  name: 'Navbar',
  data() {
    return {
      icons: {
        cart: mdiCart,
        shops: mdiStore,
        map: mdiMapMarker,
        profile: mdiAccount
      },
      langs: [
        {
          name: 'English',
          code: 'en'
        },
        {
          name: 'Español',
          code: 'es'
        }]
    }
  },
  components: { },
  computed: {
    ...mapState({
      account: state => state.account
    })
  },
  methods: {
    ...mapActions('account', ['logout']),
    handleLogout() {
      this.logout()
    },
    handleLang(lang){
      this.$i18n.locale = lang.code
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
  background-color: #7a909900;
  color: #cccccc;
  cursor: pointer;
  border: none;
  padding: 10px;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
}

.login-button:hover {
  background-color: #ffffff;
  color: #333333;
}

.register-button {
  background-color: #7a909900;
  color: #cccccc;
  cursor: pointer;
  border: none;
  padding: 10px;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
}

.register-button:hover {
  background-color: #173541;
  color: #cccccc;
}

.transparent-button {
  background-color: #7a909900;
  color: #cccccc;
  cursor: pointer;
  border: none;
  padding: 10px;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
}
/* 
.transparent-button:hover {
  background-color: #cccccc;
  color: #000000;
} */


</style>
