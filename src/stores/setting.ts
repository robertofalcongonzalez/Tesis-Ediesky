import {defineStore} from "pinia";
import {Ref} from "vue";
import {Setting} from "@/services/settings/types";

export const useSettingStore = defineStore('setting', () => {
  const setting: Ref<Setting> = ref({}  as Setting)
  const saveSetting = (settingFromServer: Setting) => setting.value = settingFromServer;

  return {setting, saveSetting}
})
