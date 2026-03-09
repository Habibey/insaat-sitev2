import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Sabit kelimelerimizin çevirileri
const resources = {
  tr: {
    translation: {
      "anasayfa": "Anasayfa",
      "uygulamalar": "Uygulamalar",
      "ekip": "Akademik Ekibimiz",
      "hakkimizda": "Hakkımızda",
      "dil_degistir": "EN",
      "ekip_baslik": "Araştırma Ekibimiz"
    }
  },
  
  en: {
    translation: {
      "anasayfa": "Home",
      "uygulamalar": "Applications",
      "ekip": "Academic Team",
      "hakkimizda": "About Us",
      "dil_degistir": "TR",
      "ekip_baslik": "Our Research Team"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "tr", // Başlangıç dili Türkçe
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;