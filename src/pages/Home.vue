<template>
    <div align="center">
        <Map/>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Map from '../components/Map.vue'

export default {
  name: 'Home',
  data() {
    return {

    }
  },
  mounted() {
    this.get(this.account.user._id)
  },
  computed: {
    ...mapState({
      account: state => state.account,
      profile: state => state.profile
    })
  },
  methods: {
    ...mapActions('profile', ['get'])
  },
  components: {
    Map
  }
}
</script>
