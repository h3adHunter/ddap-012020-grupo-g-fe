<template>
    <div id="app">
      <div id="nav">
        <Navbar></Navbar>
      </div>
      <div id="main-panel">
        <div class="col-sm-6 offset-sm-3" style="{ height: 0px; position: absolute; z-index: 1000; }">
          <b-alert
            :show="alert.show"
            dismissible
            @dismissed="clearAlert"
            @dismiss-count-down="countDownChanged"
            :variant="alert.type">
            {{alert.message}}
          </b-alert>
        </div>
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from './components/Navbar.vue'

export default {
  name: 'app',
  data() {
    return {
      dismissCountDown: 0,
      interval: ""
    }
  },
  components:{
    'Navbar': Navbar
  },
  mounted() {
    this.interval = setInterval(() => {
        if (this.dismissCountDown > 0)
          this.dismissCountDown--
    }, 1000);
  },
  computed: {
    ...mapState({
      alert: state => state.alert
    }),
    isShowingAlert() {
      return this.alert.show
    }
  },
  methods: {
    // ...mapActions({ clearAlert: 'alert/clear' }),
    clearAlert() {
      this.alert.show = false
      this.dismissCountDown = 0
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.alert.dismissSecs
    }
  },
  watch: {
    dismissCountDown(newValue) {
      if (newValue === 0)
        this.clearAlert()
    },
    isShowingAlert() {
      if (this.alert.show)
        this.showAlert()
    }
  }  
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
