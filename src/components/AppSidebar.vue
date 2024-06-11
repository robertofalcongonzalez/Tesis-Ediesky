<script setup lang="ts">
  const drawer = ref(true)
</script>

<template>
  <v-navigation-drawer v-model:model-value="drawer" color="secondary" absolute permanent>
      <v-list mandatory :item-value="$route.name">
        <v-list-item :to="{ path: '/simulations' }">
          <v-list-item-title>Simulaciones</v-list-item-title>
        </v-list-item>
        <v-list-item :to="{ path: '/amortizations' }">
          <v-list-item-title>Amortizaciones</v-list-item-title>
        </v-list-item>
        <v-list-item :to="{ path: '/login' }">
          <v-list-item-title>Salir</v-list-item-title>
        </v-list-item>
      </v-list>

  </v-navigation-drawer>
</template>

<style scoped lang="sass">

</style>
