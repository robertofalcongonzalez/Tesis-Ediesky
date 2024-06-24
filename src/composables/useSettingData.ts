import {useSettingStore} from "@/stores/setting";
import {getSettings, saveSettings} from "@/services/settings/setting-service";

export function useSettingData() {
  const settingStore = useSettingStore();

  const getAllSettings = async () => {
    const settings = await getSettings()
    const {saveSetting} = settingStore;
    saveSetting(settings);
    return true
  }

  const saveSetting = async () => {
    await saveSettings(settingStore.setting);
    return true
  }


  return {getAllSettings, saveSetting}
}
