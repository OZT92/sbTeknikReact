import { SITE } from "../seo/site";

import serviceImg1 from "../img/services/elektrikliElAletleri.png";
import serviceImg2 from "../img/services/isGuvenligi.png";
import serviceImg3 from "../img/services/nalburiye.png";
import serviceImg4 from "../img/services/tesisatMalzemeleri.png";
import serviceImg5 from "../img/services/yapiKimyasallari.png";
import serviceImg6 from "../img/services/yapiMalzemeleri.png";

export const services = [
  {
    id: 1,
    slug: "yapi-malzemeleri",
    title: "Yapı Malzemeleri",
    desc: "Alçı, levha, yalıtım ve tamamlayıcı yapı ürünleri.",
    longDesc:
      "Projeleriniz için alçı, levha, yalıtım ve tamamlayıcı yapı malzemelerinde güvenilir tedarik çözümleri sunuyoruz.",
    imgSrc: serviceImg6,
    schemaImage: `${SITE.baseUrl}/images/services/yapi-malzemeleri.png`,
    items: [
      "Alçı ürünleri",
      "Levha çeşitleri",
      "Yalıtım malzemeleri",
      "Tamamlayıcı yapı ürünleri",
    ],
  },
  {
    id: 2,
    slug: "yapi-kimyasallari",
    title: "Yapı Kimyasalları",
    desc: "Su yalıtımı, yapıştırıcı, derz ve tamir/onarım çözümleri.",
    longDesc:
      "Su yalıtımı, yapıştırıcı, derz dolgu ve tamir-onarım ürünlerinde ihtiyaca uygun profesyonel çözümler sağlıyoruz.",
    imgSrc: serviceImg5,
    schemaImage: `${SITE.baseUrl}/images/services/yapi-kimyasallari.png`,
    items: [
      "Su yalıtım ürünleri",
      "Yapıştırıcılar",
      "Derz dolgu",
      "Tamir ve onarım ürünleri",
    ],
  },
  {
    id: 3,
    slug: "tesisat-malzemeleri",
    title: "Tesisat Malzemeleri",
    desc: "Temiz su, atık su, armatür ve bağlantı ekipmanları.",
    longDesc:
      "Temiz su ve atık su sistemlerinden armatür ve bağlantı ekipmanlarına kadar geniş ürün gamı sunuyoruz.",
    imgSrc: serviceImg4,
    schemaImage: `${SITE.baseUrl}/images/services/tesisat-malzemeleri.png`,
    items: [
      "Temiz su ekipmanları",
      "Atık su ürünleri",
      "Armatürler",
      "Bağlantı ekipmanları",
    ],
  },
  {
    id: 4,
    slug: "nalburiye",
    title: "Nalburiye",
    desc: "El aletleri, bağlantı elemanları ve günlük sarf malzemeler.",
    longDesc:
      "El aletleri, bağlantı elemanları ve günlük kullanım sarf malzemelerinde pratik ve kaliteli ürün seçenekleri sunuyoruz.",
    imgSrc: serviceImg3,
    schemaImage: `${SITE.baseUrl}/images/services/nalburiye.png`,
    items: [
      "El aletleri",
      "Bağlantı elemanları",
      "Sarf malzemeler",
      "Atölye ekipmanları",
    ],
  },
  {
    id: 5,
    slug: "is-guvenligi",
    title: "İş Güvenliği",
    desc: "Kişisel koruyucu donanım ve saha güvenlik ekipmanları.",
    longDesc:
      "Saha güvenliği için kişisel koruyucu donanımlar ve çeşitli güvenlik ekipmanlarıyla işletmelere destek veriyoruz.",
    imgSrc: serviceImg2,
    schemaImage: `${SITE.baseUrl}/images/services/is-guvenligi.png`,
    items: ["Baret", "Eldiven", "Gözlük", "Reflektif ekipmanlar"],
  },
  {
    id: 6,
    slug: "elektrikli-el-aletleri",
    title: "Elektrikli El Aletleri",
    desc: "Profesyonel makineler, aksesuarlar ve sarf ürünleri.",
    longDesc:
      "Profesyonel elektrikli el aletleri, aksesuar ve sarf ürünlerinde ihtiyaçlarınıza uygun tedarik sağlıyoruz.",
    imgSrc: serviceImg1,
    schemaImage: `${SITE.baseUrl}/images/services/elektrikli-el-aletleri.png`,
    items: [
      "Matkaplar",
      "Taşlamalar",
      "Vidalamalar",
      "Aksesuar ve sarf ürünleri",
    ],
  },
];
