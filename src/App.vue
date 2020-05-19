<template>
    <div id="app">
      <div id="nav">
        <Navbar></Navbar>
      </div>
      <div id="main-panel">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'app',
  components:{
    'Navbar': Navbar
  },
  computed: {},
  methods: {},
  watch: {} 
}
</script>

<style>
#app {
  overflow-x: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #161a1f;
}

#main-panel {
  min-height: 89vh;
  width: 100%;
  background-color: #e2e2e5;
}
</style>
