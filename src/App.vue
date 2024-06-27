<template>
  <v-app>
    <v-main>
      <v-snackbar close-delay="300" color="#e35555" absolute location="top center" v-model:model-value="appStore.snackBar"
                  :text="appStore.snackBarText"></v-snackbar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import {useAppStore} from "@/stores/app";

  const appStore = useAppStore()
</script>
