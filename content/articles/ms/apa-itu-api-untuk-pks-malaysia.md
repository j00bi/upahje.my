---
title: "Apa itu API, dijelaskan untuk pemilik perniagaan kecil Malaysia"
description: "API ialah kontrak antara dua sistem untuk bertukar data tanpa perlu ada orang menyalinnya. Apa maksudnya bagi PKS, beza model terbuka dengan tertutup, dan kos sebenar menyambungkannya."
slug: apa-itu-api-untuk-pks-malaysia
translationKey: what-is-an-api
date: 2026-11-19
updated: 2026-11-19
author: "UpahJe editorial"
category: definitions
tags: [definitions, api, pks, malaysia]
canonical: https://upahje.my/ms/articles/apa-itu-api-untuk-pks-malaysia
draft: false
sources:
  - title: "MDN Web Docs, glosari API"
    url: "https://developer.mozilla.org/en-US/docs/Glossary/API"
    checked: 2026-11-19
  - title: "Mistral AI, gambaran model (katalog model terbuka dan lesen)"
    url: "https://docs.mistral.ai/models"
    checked: 2026-11-19
  - title: "OpenAI, harga API (kadar setiap juta token)"
    url: "https://developers.openai.com/api/docs/pricing"
    checked: 2026-11-19
  - title: "OpenAI, katalog model API"
    url: "https://developers.openai.com/api/docs/models"
    checked: 2026-11-19
---

# Apa itu API, dijelaskan untuk pemilik perniagaan kecil Malaysia

API ialah cara yang dipersetujui antara dua perisian untuk bertukar data apabila diminta, tanpa perlu ada orang menyalinnya secara manual. Bagi perniagaan kecil di Malaysia, beza utamanya jelas: staf menaip pesanan dari marketplace ke dalam spreadsheet, atau sistem kedai anda menghantar pesanan itu terus ke sistem kurier.

![Kedai anda menghantar pesanan kepada API, API menyampaikannya kepada kurier, dan status penghantaran kembali melalui laluan yang sama](/figures/what-is-an-api-ms.svg)
*Satu pesanan, keluar melalui API dan kembali sebagai status.*

## Apakah sebenarnya yang API lakukan untuk perniagaan saya?

API menyampaikan satu maklumat yang ditetapkan antara dua sistem, apabila diminta, dalam bentuk yang telah dipersetujui oleh kedua-dua pihak. MDN menyebutnya kontrak antara aplikasi yang menawarkan API itu dengan apa-apa yang memanggilnya ([MDN, disemak 19 Nov 2026](https://developer.mozilla.org/en-US/docs/Glossary/API)).

- Staf tidak lagi menyalin pesanan ke portal kurier kerana laman anda membuat tempahan kurier sebaik pesanan dibayar.
- Seseorang tidak perlu membuka aplikasi bank untuk mengesahkan pindahan kerana gerbang pembayaran memanggil laman anda dan menandakan pesanan sebagai dibayar.
- Balasan tidak lagi ditulis selepas menyemak stok secara manual kerana bot WhatsApp bertanya kepada sistem inventori anda dahulu.
- Invois tidak perlu ditaip semula kerana alat perakaunan mengambilnya daripada kedai anda.

## Apakah beza antara API model tertutup dengan API model terbuka?

API model tertutup ialah API yang anda boleh panggil, tetapi modelnya tidak boleh anda jalankan sendiri. API model terbuka pula membolehkan fail model dimuat turun dan dijalankan pada perkakasan yang anda kawal.

| Apa yang menentukan | API model tertutup | API model terbuka |
| --- | --- | --- |
| Di mana model berjalan | Server pembekal | Server anda, atau hosting yang anda pilih |
| Cara mendapatkan model | Tidak boleh. Anda hanya dapat katalog dan kadar setiap token | Boleh. Anda muat turun model weights |
| Apa yang mengawal penggunaan | Terma perkhidmatan pembekal | Lesen model: Apache 2.0, MIT, atau lesen khusus pembekal |
| Apa yang anda bayar | Token atau panggilan. Tiada bayaran bila tiada penggunaan | Kos server dan kos pengiraan setiap bulan, tambah orang untuk menjalankannya |
| Siapa boleh menukar model | Pembekal, mengikut dasar penghentian mereka | Hanya anda, apabila anda mengemas kini sendiri |
| Adakah data anda keluar dari premis | Biasanya ya | Tidak semestinya |

Setakat 19 November 2026, katalog Mistral menyenaraikan ketiga-tiga bentuk lesen ini. Mistral Small 4 dan model Ministral 3 berada di bawah Apache 2.0, Z.ai GLM 5.3 dan DeepSeek V4.1 Flash di bawah MIT, dan Mistral Large 4 di bawah "Mistral Ecosystem Open Weight License" yang khusus ([dokumentasi Mistral, disemak 19 Nov 2026](https://docs.mistral.ai/models)). Pembekal tertutup pula menerbitkan katalog model dan kadar, bukan model weights ([katalog model OpenAI, disemak 19 Nov 2026](https://developers.openai.com/api/docs/models)).

## Patut mula dengan yang mana satu?

Bayaran ikut panggilan tidak dikenakan apabila tiada penggunaan. Server pula menelan kos setiap bulan walaupun tiada siapa menggunakannya. Sebab itulah API tertutup lebih murah untuk permulaan kebanyakan perniagaan kecil. Model terbuka hanya menang apabila penggunaan bulanan cukup tinggi untuk melebihi kos mesin, dan ada orang di pihak anda yang tahu menjalankannya. Bagi kebanyakan PKS Malaysia, syarat kedua itulah yang menentukan.

## Berapa kos untuk menyambungkan API di Malaysia?

Tiada penanda aras awam bagi kadar kerja integrasi API di Malaysia setakat November 2026. Sebut harga berubah bergantung pada bilangan endpoint, sama ada integrasi menulis data atau membaca sahaja, cara pengesahan berfungsi, apa yang patut berlaku apabila panggilan gagal, dan betapa bersepahnya data sedia ada anda. Harga yang diberi sebelum lima soalan itu dijawab masih anggaran.

## Bagaimana saya boleh menilai harga kerja ini sendiri?

Penilaian harga bermula sebelum anda minta sebut harga, dengan lima fakta yang menentukan angkanya.

1. Senaraikan sistem yang perlu berhubung, dengan sistem apa, dan ke arah mana.
2. Asingkan kerja membaca sahaja daripada kerja yang menulis data atau memindahkan wang.
3. Tanya apa yang berlaku apabila panggilan gagal. Pesanan yang hilang tanpa sebarang notifikasi ialah hasil yang paling mahal.
4. Minta harga tetap bagi setiap integrasi, bukan anggaran ikut jam.
5. Tanya apa yang berlaku kepada kod dan credentials apabila kerja tamat.

## Berapa bil bulanan selepas sistem berjalan?

Pembekal menerbitkan kadar mereka, jadi bil bulanan boleh dikira, bukan diagak. Kadar standard OpenAI untuk model kecil semasa, GPT-6 Luna, ialah USD 0.10 setiap juta token input dan USD 0.50 setiap juta token output ([harga OpenAI, disemak 19 Nov 2026](https://developers.openai.com/api/docs/pricing)). Bot FAQ WhatsApp yang mengendalikan 3,000 mesej sebulan, kira-kira 600 token masuk dan 200 token keluar setiap mesej, menelan sekitar USD 0.48 sebulan untuk token sahaja. Jika integrasi berjalan pada server anda sendiri, tambah kos hosting. Kadar tukaran mata wang yang dikenakan oleh kad anda juga tidak termasuk dalam angka ini. Penyelenggaraan turut masuk dalam bil ini: apabila pembekal menghentikan sesuatu versi model, integrasi berhenti berfungsi sehingga ada orang membaikinya.

## Bagaimana saya tahu sama ada saya perlu API atau cukup sekadar buat secara manual?

Jika kerja itu berlaku beberapa kali sehari dan kesilapannya murah dibaiki, buat secara manual sahaja. API mula berbaloi apabila jumlah kerja atau kos kesilapan melepasi garis itu. Tiada penanda aras awam yang menetapkan garis itu, jadi ini penilaian kami: garisnya sekitar titik apabila seseorang membuang lebih sejam sehari untuk kerja salin-menyalin, atau apabila kerugian akibat satu pesanan yang terlepas melebihi yuran pembekal sebulan. Jika kurang daripada itu, seorang staf sambilan yang teliti lebih murah dan lebih boleh diharap.

## Apa yang perlu saya tetapkan sebelum membayar seseorang untuk kerja ini?

Tetapkan tiga perkara secara bertulis sebelum bayaran.

1. Skop. Sistem mana, endpoint mana, membaca atau menulis.
2. Tingkah laku apabila gagal. Cuba semula, masuk baris gilir, atau beri amaran. Diam sahaja tidak boleh diterima bagi apa-apa yang melibatkan wang atau pesanan.
3. Jalan keluar. Anda menerima kod dan persekitaran ujian yang berfungsi, bukan sistem yang berjalan pada akaun orang lain.

## FAQ

### Perlu saya ada server sendiri untuk menggunakan API?

Tidak. API tertutup hanya memerlukan sambungan internet dan satu skrip atau aplikasi kecil. Anda memerlukan server hanya jika anda menjalankan model terbuka itu sendiri.

### Adakah selamat memberikan kunci API saya kepada freelancer?

Bukan kunci utama anda. Keluarkan kunci berasingan untuk integrasi itu dengan had perbelanjaan, jangan hantar melalui WhatsApp atau e-mel, dan batalkan pada hari terakhir kerja. Kunci yang dibatalkan tidak merugikan apa-apa. Kunci yang bocor boleh merugikan seluruh akaun anda.

### Apa yang berlaku jika pembekal mengubah atau menutup API mereka?

Integrasi berhenti berfungsi sehingga dikemas kini. Tempoh itu ditentukan pembekal: OpenAI menerbitkan garis masa penghentian yang dipautkan pada halaman harga mereka ([disemak 19 Nov 2026](https://developers.openai.com/api/docs/pricing)). Pastikan integrasi nipis supaya mudah ditukar kepada pembekal lain.

### Berapa lama integrasi pertama mengambil masa?

Satu endpoint yang membaca sahaja mengambil masa sekitar sehari untuk pembangun yang cekap. Sebarang kerja yang memindahkan wang atau menulis data mengambil masa seminggu, sebahagian besarnya untuk menguji apa yang berlaku apabila panggilan gagal. Tiada data awam tentang tempoh di Malaysia, jadi ini anggaran kerja.

---

**Baca seterusnya**

[Definisi, dalam bahasa mudah](https://upahje.my/ms/articles/category/definitions)

[model terbuka atau tertutup](https://upahje.my/ms/articles/model-terbuka-atau-tertutup-pks-malaysia)
