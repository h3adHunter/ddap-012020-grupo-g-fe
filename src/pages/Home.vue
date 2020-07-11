<template>
    <div align="center">
        <Map/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Map from '../components/Map.vue'
import { profileService } from '../services/profile.service'

export default {
  name: 'Home',
  data() {
    return {

    }
  },
  async created() {
    if (this.account.status.loggedIn) {
      setTimeout( function() { 
        profileService.getById(this.account.user._id)
          .then(
            profile => {
              if (!profile.address) {
                this.$store.dispatch('alert/warning', this.$t('profile_incomplete'), { root: true })
                setTimeout( function() { this.$router.push('/profile') }.bind(this), 3000)
              }
            },
            error => {
              this.$store.dispatch('alert/error', error, { root: true });
            }
          );
      }.bind(this), 3000)
    }
  },
  mounted() {},
  computed: {
    ...mapState({
      account: state => state.account
    })
  },
  methods: {
  },
  components: {
    Map
  }
}
</script>
