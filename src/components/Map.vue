<template>
  <div>
    <l-map ref="map" :zoom="zoom" :zoomSnap="zoomSnap" :center="center" style="height: 690px;">
      <l-tile-layer :url="url" :attribution="attribution"> </l-tile-layer>
      <l-marker v-if="marker" :lat-lng="marker"></l-marker>
    </l-map>
  </div>
</template>

<script>
import L from 'leaflet'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

import { mapState } from 'vuex'
import { profileService } from '../services/profile.service'
import { geoService } from '../services/geo.service'

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      url:
        'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2FpYWNvb3AiLCJhIjoiY2s5YnhjcmsxMDM1aTNocHNmdnJxdm4weSJ9.Qvlrb6CIfWVpJuxIRrBKZA',
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      zoom: 10.5,
      zoomSnap: 0.25,
      center: L.latLng(-34.72557, -58.2507),
      marker: null
    }
  },
  computed: {
    ...mapState({
      account: state => state.account
    })
  },
  created() {
    if (this.account.status.loggedIn) {
      this.$store.dispatch('alert/info', 'Obteniendo tu ubicación...', { root: true })
      setTimeout( function() { 
        profileService.getById(this.account.user._id)
        .then( profile => {
          geoService.getById(profile.geo_id)
            .then( geo => {
              this.center = L.latLng(geo.coordinates[0], geo.coordinates[1])
              this.marker = L.latLng(geo.coordinates[0], geo.coordinates[1])
              setTimeout( function() { 
                for (let i = 0; i < 100; i++) {
                  setTimeout( function() { 
                    this.zoom = this.zoom + 0.05
                  }.bind(this), 25 * i)        
                }
              }.bind(this), 1000)
            })
        })
      }.bind(this), 3000) 
      

    }
  }
}
</script>

<style scoped lang="css">
@import '~leaflet/dist/leaflet.css';
</style>
