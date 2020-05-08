<template>
    <div id="app">
      <div id="nav">
        <Navbar></Navbar>
      </div>
      <div class="main-panel">
        <div>
            <b-row>
                <b-col>
                    <!-- <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div> -->
                    <router-view></router-view>
                </b-col>
            </b-row>
        </div>  
      </div>
    </div>
</template>

<script lang="ts">
// import { mapState, mapActions } from 'vuex'
import Navbar from './components/Navbar.vue'


export default {
  name: 'app',
  components:{
    'Navbar': Navbar
  },
  computed: {
    // ...mapState({
    //     alert: state => state.alert
    // })
  },
  methods: {
    // ...mapActions({
    //     clearAlert: 'alert/clear' 
    // })
  },
  watch: {
    // $route (to, from){
    //     // clear alert on location change
    //     this.clearAlert();
    // }
  } 
};
</script>

<style>
#app {
  overflow-x: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* #nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */

#main-panel {
  background-color:#b39cc4;
}
</style>
