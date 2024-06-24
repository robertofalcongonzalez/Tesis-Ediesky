<script setup lang="ts">
const drawer = ref(false)
</script>

<template>
  <v-app-bar flat color="secondary" :elevation="2">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Simulaciones</v-app-bar-title>
  </v-app-bar>
  <v-navigation-drawer v-model:rail="drawer" color="secondary" permanent>
    <v-list mandatory :item-value="$route.name">
      <v-list-item :to="{ path: '/simulations/' }">
        <template v-slot:prepend>
          <v-icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <path fill="currentColor"
                    d="M0 0v16h8.7l5.3-6V0zm2 2h10v7H7v5H2zm8.45 9L9 12.64V11zM18 16v16h8.7l5.3-6V16zm2 2h10v7h-5v5h-5zm8.45 9L27 28.64V27z"/>
              <path fill="currentColor"
                    d="M5 18H3c0 6.075 4.925 11 11 11h2v-2h-2a9 9 0 0 1-9-9M18 3h-2v2h2a9 9 0 0 1 9 9h2c0-6.075-4.925-11-11-11"
                    class="ouiIcon__fillSecondary"/>
            </svg>
          </v-icon>
        </template>


        <v-list-item-title>Simulaciones</v-list-item-title>
      </v-list-item>
      <v-list-item :to="{ path: '/amortizations/' }">
        <template v-slot:prepend>
          <v-icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 14">
              <path fill="currentColor" fill-rule="evenodd"
                    d="M1.5 0A1.5 1.5 0 0 0 0 1.5v6A1.5 1.5 0 0 0 1.5 9h11A1.5 1.5 0 0 0 14 7.5v-6A1.5 1.5 0 0 0 12.5 0zm6.125 1.454a.625.625 0 1 0-1.25 0v.4a1.532 1.532 0 0 0-.15 3.018l1.197.261a.39.39 0 0 1-.084.773h-.676a.39.39 0 0 1-.369-.26a.625.625 0 0 0-1.178.416c.194.55.673.965 1.26 1.069v.415a.625.625 0 1 0 1.25 0V7.13a1.641 1.641 0 0 0 .064-3.219L6.492 3.65a.281.281 0 0 1 .06-.556h.786a.388.388 0 0 1 .369.26a.625.625 0 1 0 1.178-.416a1.64 1.64 0 0 0-1.26-1.069zM2.75 3.75a.75.75 0 1 1 0 1.5a.75.75 0 0 1 0-1.5m8.5 0a.75.75 0 1 1 0 1.5a.75.75 0 0 1 0-1.5M4.5 9.875c.345 0 .625.28.625.625v2a.625.625 0 1 1-1.25 0v-2c0-.345.28-.625.625-.625m5.625.625a.625.625 0 1 0-1.25 0v2a.625.625 0 1 0 1.25 0zm-2.5.75a.625.625 0 1 0-1.25 0v2a.625.625 0 1 0 1.25 0z"
                    clip-rule="evenodd"/>
            </svg>
          </v-icon>
        </template>
        <v-list-item-title>Amortizaciones</v-list-item-title>
      </v-list-item>
      <v-list-item :to="{ path: '/users/' }">
        <template v-slot:prepend>
          <v-icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 15 15">
              <path fill="currentColor"
                    d="M5.5 0a3.499 3.499 0 1 0 0 6.996A3.499 3.499 0 1 0 5.5 0m-2 8.994a3.5 3.5 0 0 0-3.5 3.5v2.497h11v-2.497a3.5 3.5 0 0 0-3.5-3.5zm9 1.006H12v5h3v-2.5a2.5 2.5 0 0 0-2.5-2.5"/>
              <path fill="currentColor" d="M11.5 4a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5"/>
            </svg>
          </v-icon>
        </template>
        <v-list-item-title>Usuarios</v-list-item-title>
      </v-list-item>
      <v-list-item :to="{ path: '/settings/' }">
        <template v-slot:prepend>
          <v-icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M10.825 22q-.675 0-1.162-.45t-.588-1.1L8.85 18.8q-.325-.125-.612-.3t-.563-.375l-1.55.65q-.625.275-1.25.05t-.975-.8l-1.175-2.05q-.35-.575-.2-1.225t.675-1.075l1.325-1Q4.5 12.5 4.5 12.337v-.675q0-.162.025-.337l-1.325-1Q2.675 9.9 2.525 9.25t.2-1.225L3.9 5.975q.35-.575.975-.8t1.25.05l1.55.65q.275-.2.575-.375t.6-.3l.225-1.65q.1-.65.588-1.1T10.825 2h2.35q.675 0 1.163.45t.587 1.1l.225 1.65q.325.125.613.3t.562.375l1.55-.65q.625-.275 1.25-.05t.975.8l1.175 2.05q.35.575.2 1.225t-.675 1.075l-1.325 1q.025.175.025.338v.674q0 .163-.05.338l1.325 1q.525.425.675 1.075t-.2 1.225l-1.2 2.05q-.35.575-.975.8t-1.25-.05l-1.5-.65q-.275.2-.575.375t-.6.3l-.225 1.65q-.1.65-.587 1.1t-1.163.45zm1.225-6.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5"/>
            </svg>
          </v-icon>
        </template>
        <v-list-item-title>Ajustes</v-list-item-title>
      </v-list-item>
      <v-list-item :to="{ path: '/login/' }">
        <template v-slot:prepend>
          <v-icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M9 2h9c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2v-2h2v2h9V4H9v2H7V4c0-1.1.9-2 2-2"/>
              <path fill="currentColor" d="M10.09 15.59L11.5 17l5-5l-5-5l-1.41 1.41L12.67 11H3v2h9.67z"/>
            </svg>
          </v-icon>
        </template>
        <v-list-item-title>Salir</v-list-item-title>
      </v-list-item>
    </v-list>

  </v-navigation-drawer>
</template>

<style scoped lang="sass">

</style>
