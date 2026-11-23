---
title: "Google Business Profile: medan yang menentukan sama ada anda muncul"
description: "Google mendokumenkan peraturan nama, peraturan kategori, waktu operasi, kawasan perkhidmatan dan apa yang mencetuskan penggantungan. Apa yang patut PKS betulkan dahulu, dan empat medan yang menyebabkan profil dihadkan."
slug: medan-google-business-profile
translationKey: google-business-profile-fields
date: 2026-11-23
updated: 2026-11-23
author: "UpahJe Desk"
category: buying-guides
tags: [marketing, google-business-profile, carian-setempat, malaysia]
canonical: https://upahje.my/ms/articles/medan-google-business-profile
draft: false
sources:
  - title: "Google, garis panduan mewakili perniagaan anda di Google"
    url: "https://support.google.com/business/answer/3038177"
    checked: 2026-11-23
  - title: "Google, perniagaan kawasan perkhidmatan"
    url: "https://support.google.com/business/answer/3038163"
    checked: 2026-11-23
  - title: "Google, baiki profil yang digantung atau dilumpuhkan"
    url: "https://support.google.com/business/answer/4569145"
    checked: 2026-11-23
  - title: "Google, rayuan kandungan dan sekatan profil perniagaan"
    url: "https://support.google.com/business/answer/13597551"
    checked: 2026-11-23
  - title: "Google, rujukan API Business Profile (sumber locations)"
    url: "https://developers.google.com/my-business/reference/rest/v4/accounts.locations"
    checked: 2026-11-23
---

# Google Business Profile: medan yang menentukan sama ada anda muncul

Peraturan Google sendiri yang menentukan, dan ia khusus. Nama anda mesti nama yang pelanggan guna dalam dunia sebenar, anda dapat satu profil bagi setiap perniagaan, dan kategori mesti menerangkan perniagaan dan bukan kata kuncinya. Salah pada tiga perkara itu, profil boleh dihadkan. Betulkannya, dan selebihnya ialah mengisi medan yang didokumenkan.

## Apa yang Google semak dahulu?

Empat perkara, dan semuanya peraturan perkataan, bukan tetapan teknikal.

| Apa yang Google dokumenkan | Apa maksudnya untuk profil anda |
| --- | --- |
| "Your name should reflect your business's real-world name, as used consistently on your storefront, website, stationery, and as known to customers." | Tiada kata kunci dalam nama. "Kedai Kasut Ali" ialah nama; "Kedai Kasut Ali Murah KL Best" ialah pelanggaran |
| "Use as few categories as possible to describe your overall core business from the provided list." | Kategori menjawab "perniagaan ini IALAH…", jadi ia kedai kasut, bukan "kedai kasut berhampiran dengan parkir" |
| "Do not use categories solely as keywords or to describe attributes of your business." | Atribut ada medan sendiri. Menggunakannya sebagai kategori itulah yang membawa kepada sekatan |
| "There should only be one profile per business, as this can cause problems with how your information displays on Google Maps and Search." | Dua profil untuk satu kedai, biasanya dicipta dua orang, ialah masalah yang didokumenkan, bukan taktik pertumbuhan |

Keempat-empatnya dipetik daripada halaman garis panduan Google, dibaca 23 November 2026.

## Bagaimana pula alamat, atau tiada alamat langsung?

Perniagaan kawasan perkhidmatan dan kedai fizikal ialah dua konfigurasi berbeza, dan Google mendokumenkan kedua-duanya.

Sumber location membawa `address` dan `serviceArea`, dan perniagaan kawasan perkhidmatan mengurus kawasan dan bukan kedai. Contoh Google sendiri ialah jenama penghantaran sahaja yang beroperasi dari dapur kongsi, yang "must hide their address and add service areas to that specific brand". Jika anda menghantar dan tiada kaunter untuk pelanggan masuk, profil kedai itulah ketidakserasian yang patut dibetulkan dahulu.

## Medan mana yang wajar diisi bulan ini?

Waktu operasi dan sub-sumber yang didokumenkan Google, mengikut urutan ia mengubah keputusan pelanggan.

1. **Waktu biasa** — `regularHours` pada sumber location. Waktu yang salah menghasilkan ulasan bintang satu yang berbunyi "tutup sedangkan kata buka".
2. **Waktu khas** — `specialHours`, untuk cuti umum dan minggu anda tutup kerana urusan keluarga. Malaysia ada cuti umum yang cukup banyak, jadi membiarkan medan ini kosong menjamin sekurang-kurangnya satu kunjungan yang tersalah.
3. **Waktu tambahan** — `moreHours`, untuk jabatan atau perkhidmatan dalam premis yang sama, seperti kaunter workshop yang waktunya berbeza daripada ruang jualan.
4. **Atribut** — diurus sebagai sub-sumber melalui `getAttributes` / `updateAttributes`. Di sinilah "ada parkir" dan "boleh masuk kerusi roda" diletakkan, bukan dalam kategori.
5. **Foto dan media** — `accounts.locations.media`, dengan kandungan tertakluk kepada polisi kandungan larangan Google.
6. **Post** — `accounts.locations.localPosts`, berguna untuk tawaran yang ada tarikh luput dan bukan maklumat kekal.
7. **Soal jawab** — `accounts.locations.questions` dengan `answers`, iaitu medan yang paling banyak dibiarkan diisi orang lain.
8. **Balasan ulasan** — `accounts.locations.reviews`, permukaan API bagi apa yang pelanggan sebenarnya baca.

Semua itu didokumenkan dalam rujukan API Business Profile Google, dibaca 23 November 2026. Nama API itu penting walaupun anda tidak menulis kod: itulah medan yang borang di laman web sedang sunting.

## Apa yang menggantungkan profil, dan apa yang perlu dibuat?

Google mendokumenkan proses penggantungan dan rayuannya, dan halaman rayuan mengandungi ayat yang perlu dibaca sebelum apa-apa.

Profil yang digantung diurus melalui "Fix suspended or disabled profiles", yang meminta hamparan ID Business Profile berserta dokumen sokongan seperti pendaftaran perniagaan, lesen atau sijil cukai, atau bil utiliti. Bagi sekatan kandungan, halaman rayuan menyatakan: "If you haven't verified your Business Profile, content associated with your Business Profile might not appear across Google. Before you submit an appeal, check your verification status."

Ayat itu sebabnya pengesahan mesti kekal semasa. Rayuan yang difailkan sebelum pengesahan selesai ialah rayuan yang tersekat.

## Apa yang tidak dapat kami sahkan?

Google tidak menerbitkan apa-apa pada halaman ini tentang cara profil disusun dalam carian setempat, jadi artikel ini tidak membuat dakwaan tentang faktor susunan selain medan yang didokumenkan. Beberapa ID pusat bantuan memulangkan "Sorry, this page can't be found" semasa pusingan ini, jadi hanya halaman yang Google sendiri pautkan atau yang ditemui imbasan dipetik. Tiada juga angka yang diterbitkan untuk tempoh pengesahan atau rayuan.

## Apa yang patut dibuat minggu ini?

Lima tindakan, tiada satu pun memerlukan agensi.

1. **Baca nama perniagaan anda sendiri** terhadap peraturan dunia sebenar, dan betulkannya dalam profil, bukan dalam direktori.
2. **Pastikan hanya ada satu profil** untuk perniagaan itu, termasuk yang seseorang cipta bertahun-tahun lalu dan terlupa.
3. **Tentukan kedai atau kawasan perkhidmatan**, dan pastikan alamat serta kawasan perkhidmatan sepadan dengan keputusan itu.
4. **Isi waktu biasa dan waktu khas** untuk dua bulan cuti umum akan datang.
5. **Semak status pengesahan** dan simpan dokumen yang membuktikan perniagaan anda wujud, kerana penggantungan akan memintanya.

## Cuba sendiri

Versi paling kecil ialah audit, bukan integrasi: buka profil anda, dan pergi medan demi medan terhadap halaman garis panduan Google, tandakan setiap satu sebagai didokumenkan-dan-betul, didokumenkan-tetapi-salah, atau kosong.

Anda perlukan halaman garis panduan, profil anda sendiri, dan sejam lapang. Kosnya tiada. Yang menggigit ialah sesetengah pembetulan mencetuskan pengesahan semula, jadi tukar nama dan kategori paling akhir, selepas yang lain betul, dan jangan mengubahnya lagi pada minggu yang sama.

**Baca seterusnya**

[Apa yang AI agent boleh dan tidak boleh buat untuk PKS Malaysia](https://upahje.my/ms/articles/apa-yang-agent-boleh-buat)

[Lagi tentang membeli automasi](https://upahje.my/ms/articles/category/buying-guides)

## FAQ

### Patutkah saya letak kata kunci dalam nama perniagaan?

Tidak. Peraturan Google ialah nama seperti digunakan dalam dunia sebenar dan dikenali pelanggan, dan meletakkan kata kunci ialah cara yang didokumenkan untuk membawa profil kepada sekatan.

### Kedai atau kawasan perkhidmatan, jika saya buat kedua-duanya?

Satu profil, dengan alamat jika pelanggan boleh masuk, dan kawasan perkhidmatan untuk tempat anda bergerak. Peraturan Google ialah perniagaan yang ada kedai tidak menggunakan tetapan kawasan-perkhidmatan-sahaja untuk menyembunyikannya.

### Bolehkah saya ada dua profil untuk dua cawangan?

Dua cawangan sebenar di dua alamat ialah dua perniagaan pada pandangan profil. Dua profil untuk satu cawangan itulah masalah yang didokumenkan.

### Berapa lama rayuan mengambil masa?

Google tidak menerbitkan tempoh pada halaman yang dibaca untuk artikel ini. Yang diterbitkannya ialah urutan: selesaikan pengesahan dahulu, kemudian rayu.
