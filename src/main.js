// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import VueClipboard from 'vue-clipboard2'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.use(VueClipboard)
  Vue.use(Buefy)
  Vue.component('Layout', DefaultLayout)
}
