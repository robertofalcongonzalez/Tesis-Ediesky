<template>
  <v-app>
    <AppSidebar/>
    <v-main>
      <v-card tile flat class="fill-height">
        <v-card-text>
        <router-view />
      </v-card-text>
      </v-card>
    </v-main>

<!--    <AppFooter />-->
  </v-app>
</template>

<script lang="ts" setup>
  //
</script>
