
<script lang="ts" setup>
  import {definePage} from "unplugin-vue-router/runtime";

  definePage({
    name: 'home',
    path: '/',
    redirect(to) {
        return '/simulations/'
    },
  })
</script>
