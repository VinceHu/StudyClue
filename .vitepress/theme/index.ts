import DefaultTheme from 'vitepress/theme'
import Analytics from './components/Analytics.vue'
import './colors.css'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(Analytics)
    })
  }
}

import { h } from 'vue'
