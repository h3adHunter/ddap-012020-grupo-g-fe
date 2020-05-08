<template>
  <div>
    <l-map ref="map" :zoom="zoom" :center="center" style="height: 620px;">
      <l-tile-layer :url="url" :attribution="attribution"> </l-tile-layer>
      <l-marker :lat-lng="marker"></l-marker>
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
      zoom: 14,
      center: L.latLng(-34.72557, -58.2507),
      marker: L.latLng(-34.72557, -58.2507)
    }
  }
}
</script>

<style scoped lang="css">
@import '~leaflet/dist/leaflet.css';
</style>
