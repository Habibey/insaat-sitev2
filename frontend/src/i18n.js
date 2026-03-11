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
      "ekip_baslik": "Araştırma Ekibimiz",
    
     "hero_baslik": "Modern İnşaat Mühendisliği ve Hesaplamalı Modelleme",
      "hero_altbaslik": "İleri matematiksel algoritmalar ve 3D geodezik analiz yöntemleri ile geleceğin dayanıklı ve yenilikçi yapılarını tasarlıyoruz.",
      "cta_uygulamalar": "Uygulamaları Keşfet",
      "cta_ekip": "Araştırma Ekibimiz",
      "ozellik_1_baslik": "Hesaplamalı Mekanik",
      "ozellik_1_metin": "Karmaşık düğüm ve çubuk sistemlerinin yüksek doğrulukla 3 boyutlu analizi.",
      "ozellik_2_baslik": "Akademik Vizyon",
      "ozellik_2_metin": "Alanında uzman kadromuzla uluslararası standartlarda mühendislik projeleri.",
      "ozellik_3_baslik": "Açık Kaynak Araçlar",
      "ozellik_3_metin": "Sektör profesyonelleri ve öğrenciler için web tabanlı hızlı modelleme arayüzleri."
    }
  },
  
  
  en: {
    translation: {
      "anasayfa": "Home",
      "uygulamalar": "Applications",
      "ekip": "Academic Team",
      "hakkimizda": "About Us",
      "dil_degistir": "TR",
      "ekip_baslik": "Our Research Team",

      "hero_baslik": "Modern Civil Engineering & Computational Modeling",
      "hero_altbaslik": "Designing the resilient and innovative structures of the future using advanced mathematical algorithms and 3D geodesic analysis methods.",
      "cta_uygulamalar": "Explore Applications",
      "cta_ekip": "Our Research Team",
      "ozellik_1_baslik": "Computational Mechanics",
      "ozellik_1_metin": "High-accuracy 3D analysis of complex node and member systems.",
      "ozellik_2_baslik": "Academic Vision",
      "ozellik_2_metin": "Engineering projects at international standards with our expert staff.",
      "ozellik_3_baslik": "Open Source Tools",
      "ozellik_3_metin": "Fast, web-based modeling interfaces for industry professionals and students."
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