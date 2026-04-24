import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'; // EKSİK OLAN KÖPRÜ BURASI

const resources = {
  tr: {
    translation: {
      "nav_uygulamalar": "Uygulamalar",
      "nav_ekip": "Ekip",
      "nav_hakkimizda": "Hakkımızda",
      "nav_arastirma": "Araştırma",
      "nav_iletisim": "İletişim",
      "hero_tag": "Araştırma Grubu — Yapı Mühendisliği",
      "hero_title_em": "Tarihi Yapılar için",
      "hero_desc": "Yapısal sağlık izleme teknolojileri, tarihi yapı restorasyon projeleri, 3D baskı yapı sistemleri ve yaşam döngüsü değerlendirme analizleri alanında akademik araştırma ve ticari mühendislik hizmetleri.",
      "btn_araclar": "Mühendislik Araçları",
      "btn_arastirma": "Araştırma Alanları",
      "mq_1": "Yapısal Sağlık İzleme",
      "mq_2": "Tarihi Yapı Restorasyonu",
      "mq_3": "3D Baskı Yapı Elemanları",
      "mq_4": "Yaşam Döngüsü Analizi",
      "mq_5": "Çelik Yapı Sistemleri",
      "mq_6": "Performans Değerlendirme",
      "sec_research_label": "Araştırma Alanları",
      "sec_research_title": "Disiplinlerarası Mühendislik Araştırması",
      "res_1_title": "Tarihi Yapı Restorasyonu",
      "res_1_desc": "Tarihi yapıların belgelenmesi, hasar tespiti, rölöve alımı ve restorasyon projelerinin hazırlanması.",
      "res_2_title": "Yapısal Sağlık İzleme",
      "res_2_desc": "Sensör tabanlı gerçek zamanlı yapı izleme sistemleri, titreşim analizi ve akıllı yapı teknolojileri.",
      "res_3_title": "3D Baskı Yapı Sistemleri",
      "res_3_desc": "Seramik, harç ve beton 3D yazıcılar ile yapı elemanı üretimi ve LEGO tipi bağlantı elemanları.",
      "sec_apps_label": "Mühendislik Araçları",
      "sec_apps_title": "Online Hesaplama Uygulamaları",
      "badge_free": "Ücretsiz",
      "app_all_title": "Tüm Uygulamalar",
      "app_all_desc": "Mühendislik hesaplama araçlarımızın tamamını görmek için tıklayın.",
      "app_beam_title": "Kiriş Analizi",
      "app_beam_desc": "Basit ve sürekli kirişlerde kesme kuvveti ve moment diyagramı hesabı.",
      "app_geo_title": "Geometrik Özellikler",
      "app_geo_desc": "2D geometrik şekillerin alan, ağırlık merkezi ve atalet momenti analizi.",
      "app_sec_title": "Bileşik Kesit (Steiner)",
      "app_sec_desc": "I, T, U, L çelik profillerinin atalet momentlerinin Steiner teoremi ile hesabı.",
      "sec_team_label": "Araştırma Ekibi",
      "sec_team_title": "Akademik Kadro",
      "sec_contact_label": "İletişim",
      "sec_contact_title": "Proje & İşbirliği Teklifi",
      "contact_address": "Adres",
      "contact_address_val": "İnşaat Mühendisliği Bölümü",
      "contact_email": "E-posta",
      "form_name": "Ad Soyad",
      "form_msg": "Mesaj",
      "btn_send": "Mesaj Gönder",
      "footer_copy": "© 2026 HISTECH-SHM Araştırma Grubu · Tüm hakları saklıdır.",
      "ekip_baslik": "Ekip Üyelerimiz"
    }
  },
  en: {
    translation: {
      "nav_uygulamalar": "Applications",
      "nav_ekip": "Team",
      "nav_hakkimizda": "About Us",
      "nav_arastirma": "Research",
      "nav_iletisim": "Contact",
      "hero_tag": "Research Group — Structural Engineering",
      "hero_title_em": "For Historical Structures",
      "hero_desc": "Academic research and commercial engineering services in structural health monitoring technologies, historical building restoration projects, 3D printing structural systems, and life cycle assessment analysis.",
      "btn_araclar": "Engineering Tools",
      "btn_arastirma": "Research Areas",
      "mq_1": "Structural Health Monitoring",
      "mq_2": "Historical Building Restoration",
      "mq_3": "3D Printed Structural Elements",
      "mq_4": "Life Cycle Assessment",
      "mq_5": "Steel Structure Systems",
      "mq_6": "Performance Evaluation",
      "sec_research_label": "Research Areas",
      "sec_research_title": "Interdisciplinary Engineering Research",
      "res_1_title": "Historical Building Restoration",
      "res_1_desc": "Documentation of historical buildings, damage assessment, surveying, and preparation of restoration projects.",
      "res_2_title": "Structural Health Monitoring",
      "res_2_desc": "Sensor-based real-time structural monitoring systems, vibration analysis, and smart structure technologies.",
      "res_3_title": "3D Printing Structural Systems",
      "res_3_desc": "Production of structural elements with ceramic, mortar, and concrete 3D printers and LEGO-type connections.",
      "sec_apps_label": "Engineering Tools",
      "sec_apps_title": "Online Calculation Applications",
      "badge_free": "Free",
      "app_all_title": "All Applications",
      "app_all_desc": "Click to see all of our engineering calculation tools.",
      "app_beam_title": "Beam Analysis",
      "app_beam_desc": "Calculation of shear force and moment diagrams in simple and continuous beams.",
      "app_geo_title": "Geometric Properties",
      "app_geo_desc": "Area, center of gravity, and moment of inertia analysis of 2D geometric shapes.",
      "app_sec_title": "Composite Section (Steiner)",
      "app_sec_desc": "Calculation of moments of inertia for I, T, U, L steel profiles using Steiner's theorem.",
      "sec_team_label": "Research Team",
      "sec_team_title": "Academic Staff",
      "sec_contact_label": "Contact",
      "sec_contact_title": "Project & Collaboration Proposal",
      "contact_address": "Address",
      "contact_address_val": "Department of Civil Engineering",
      "contact_email": "E-mail",
      "form_name": "Full Name",
      "form_msg": "Message",
      "btn_send": "Send Message",
      "footer_copy": "© 2026 HISTECH-SHM Research Group · All rights reserved.",
      "ekip_baslik": "Our Team Members"
    }
  }
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "tr", // Başlangıç dili Türkçe
    fallbackLng: "en", // Bulamazsa İngilizceye dön
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;