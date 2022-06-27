import i18n from "i18n-js";
import * as Localization from "expo-localization";
import en from "./en.json";
import pl from "./pl.json";

i18n.translations = {
  en,
  pl,
};

i18n.fallbacks = true;
i18n.locale = Localization.locale;

export function t(name) {
  return i18n.t(name);
}
