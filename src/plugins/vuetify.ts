/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import {createVuetify} from 'vuetify'
import {es} from "vuetify/locale";
import DateFnsAdapter from '@date-io/date-fns'
import esEs from 'date-fns/locale/es'
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
  },
  locale: {locale: 'es', fallback: 'es', messages: {es}},
  date: {
    adapter: DateFnsAdapter,
    locale: {
      es: esEs,
    },
  },
})
