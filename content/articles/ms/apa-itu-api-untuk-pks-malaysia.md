---
title: "Apa itu API, dijelaskan untuk pemilik perniagaan kecil Malaysia"
description: "API ialah kontrak antara dua sistem untuk bertukar data tanpa manusia menyalinnya. Apa maknanya bagi PKS, beza model terbuka dan tertutup, serta kos sebenar menyambungkannya."
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
  - title: "MDN Web Docs — API (Glosari)"
    url: "https://developer.mozilla.org/en-US/docs/Glossary/API"
    checked: 2026-11-19
  - title: "Mistral AI — Models overview (katalog model terbuka dan lesen)"
    url: "https://docs.mistral.ai/models"
    checked: 2026-11-19
  - title: "OpenAI — Harga API (kadar setiap juta token)"
    url: "https://developers.openai.com/api/docs/pricing"
    checked: 2026-11-19
  - title: "OpenAI — Katalog model API"
    url: "https://developers.openai.com/api/docs/models"
    checked: 2026-11-19
---

# Apa itu API, dijelaskan untuk pemilik perniagaan kecil Malaysia

API ialah satu cara yang dipersetujui antara dua perisian untuk bertukar data apabila diminta, tanpa ada orang perlu menyalinnya secara manual. Bagi perniagaan kecil di Malaysia, bezanya begini: sama ada staf menaip pesanan dari marketplace ke dalam spreadsheet, atau kedai anda sendiri menghantar pesanan itu terus ke sistem kurier.

## API sebenarnya buat apa untuk perniagaan saya?

API membawa satu maklumat yang sudah ditetapkan antara dua sistem, apabila diminta, dalam bentuk yang kedua-dua pihak sudah sepakat. MDN menyebutnya sebagai kontrak antara aplikasi yang menawarkan API itu dengan apa-apa yang memanggilnya ([MDN, disemak 19 Nov 2026](https://developer.mozilla.org/en-US/docs/Glossary/API)).

Dalam operasi harian PKS Malaysia, kontrak itu menggantikan langkah-langkah ini:

- **Pesanan.** Laman anda tempah kurier sebaik pesanan dibayar, bukan staf salin pesanan ke portal kurier.
- **Bayaran.** Gerbang pembayaran panggil laman anda dan tandakan pesanan sebagai dibayar, bukan seseorang buka aplikasi bank untuk sahkan pindahan.
- **Stok.** Bot WhatsApp tanya sistem inventori anda dahulu sebelum menjawab, bukan balasan ditulis selepas semak stok secara manual.
- **Perakaunan.** Alat perakaunan tarik invois dari kedai anda, bukan invois ditaip semula.

Benang yang sama: API membuang satu langkah manusia yang wujud semata-mata kerana dua sistem tidak boleh bercakap. Ia tidak menjadikan mana-mana sistem itu lebih pintar.

## Apa beza API model terbuka dengan model tertutup?

API model tertutup ialah API yang anda boleh panggil tetapi tidak boleh hoskan sendiri; API model terbuka pula API yang fail modelnya boleh dimuat turun dan dijalankan pada perkakasan yang anda kawal.

Enam perbezaan menentukan pilihan, ikut urutan kepentingannya kepada pemilik perniagaan:

1. **Di mana model berjalan.** Tertutup: pelayan pembekal. Terbuka: pelayan anda, atau hos yang anda pilih.
2. **Boleh atau tidak anda dapatkan model itu.** Tertutup: tidak, anda hanya dapat katalog dan kadar setiap token. Terbuka: ya, anda muat turun pemberat model.
3. **Apa yang mengawal penggunaan.** Tertutup: terma perkhidmatan pembekal. Terbuka: lesen model — Apache 2.0, MIT, atau lesen khusus pembekal.
4. **Apa yang anda bayar.** Tertutup: token atau panggilan, dan tiada bayaran bila tiada orang guna. Terbuka: kuasa pengiraan dan hos setiap bulan, tambah orang untuk menjalankannya.
5. **Siapa boleh tukar model di bawah anda.** Tertutup: pembekal boleh, dalam polisi penghentian mereka. Terbuka: hanya apabila anda sendiri kemas kini.
6. **Data anda keluar dari premis atau tidak.** Tertutup: biasanya ya. Terbuka: tidak semestinya.

Setakat 19 November 2026, katalog Mistral sendiri menyenaraikan ketiga-tiga bentuk lesen ini sebelah menyebelah: Mistral Small 4 dan model Ministral 3 di bawah Apache 2.0, Z.ai GLM 5.3 dan DeepSeek V4.1 Flash di bawah MIT, dan Mistral Large 4 di bawah "Mistral Ecosystem Open Weight License" yang khusus ([dokumentasi Mistral, disemak 19 Nov 2026](https://docs.mistral.ai/models)). Pembekal tertutup pula menerbitkan katalog model dan kadar, bukan pemberat model ([katalog model OpenAI, disemak 19 Nov 2026](https://developers.openai.com/api/docs/models)).

Tiada satu pun lebih baik secara umum. API tertutup lebih murah bila jumlah penggunaan anda kecil, sebab anda bayar ikut panggilan dan tidak bayar apa-apa bila tiada orang guna. Model terbuka hanya menang apabila penggunaan bulanan anda cukup tinggi untuk mengalahkan kos pelayan, dan apabila ada orang yang tahu menjalankannya — dan bagi kebanyakan PKS Malaysia, bahagian itu yang menentukan.

## Berapa kos untuk orang sambungkan API di Malaysia?

Ada dua bil, bukan satu: kos bina, dibayar sekali kepada manusia, dan kos jalan, dibayar setiap bulan kepada pembekal.

**Kos bina.** Tiada penanda aras awam untuk kadar yang dikenakan pembangun Malaysia khusus untuk kerja integrasi API setakat November 2026. Yang boleh diperhatikan ialah sebut harga berubah mengikut faktor yang sama setiap kali: berapa banyak endpoint, sama ada perlu akses tulis atau baca sahaja, cara pengesahan berfungsi, apa patut berlaku bila panggilan gagal, dan betapa bersepah data sedia ada anda. Sebab itu harga ditentukan, sebut harga yang datang sebelum soalan-soalan ini ditanya masih anggaran, bukan harga.

**Kos jalan.** Yang ini boleh dikira tepat, sebab pembekal menerbitkan kadarnya. Menggunakan kadar standard OpenAI untuk model kecil semasa, GPT-6 Luna, pada USD 0.10 setiap juta token input dan USD 0.50 setiap juta token output ([harga OpenAI, disemak 19 Nov 2026](https://developers.openai.com/api/docs/pricing)), bot FAQ WhatsApp yang mengendalikan 3,000 mesej sebulan — kira-kira 600 token masuk dan 200 token keluar setiap mesej — menelan sekitar USD 0.48 sebulan untuk token sahaja. Kos hos dan masa pembangun berasingan, dan kadar tukaran yang anda sebenarnya bayar ditentukan oleh kad anda, bukan oleh angka ini.

**Bil yang selalu terlupa.** Penyelenggaraan. Bila pembekal hentikan sesuatu versi model, integrasi anda berhenti berfungsi, dan pembaikannya tidak percuma.

Untuk menilai harga kerja ini sendiri, buat ini sebelum minta sebut harga:

1. Senaraikan setiap sistem yang perlu berhubung dengan sistem mana, dan arah mana.
2. Asingkan kerja baca sahaja daripada apa-apa yang menulis data atau menggerakkan wang.
3. Tanya apa berlaku bila panggilan gagal — pesanan hilang tanpa bunyi ialah hasil yang paling mahal.
4. Minta harga tetap bagi setiap integrasi, bukan anggaran ikut jam.
5. Tanya apa jadi kepada kod dan kredensial bila kerja tamat.

## Macam mana saya tahu saya perlukan API atau cukuplah buat manual?

Kalau kerja itu berlaku beberapa kali sehari dan kesilapannya murah dibaiki, teruskan buat manual; API mula berbaloi apabila jumlah kerja atau kos kesilapan melepasi garis itu.

Bahagian ini penilaian kami, bukan penanda aras yang diterbitkan: titik persilangannya biasanya apabila seseorang membuang lebih sejam sehari untuk kerja salin-menyalin, atau apabila satu pesanan yang terlepas kosnya melebihi yuran pembekal sebulan. Bawah daripada itu, seorang staf sambilan yang teliti adalah sistem yang lebih murah dan lebih boleh diharap.

## Apa yang perlu saya tetapkan sebelum bayar orang buat kerja ini?

Lima perkara perlu dipersetujui secara bertulis sebelum bayaran, ikut urutan ini:

1. **Skop.** Sistem mana, endpoint mana, baca atau tulis.
2. **Pemilikan kredensial.** Kunci API milik akaun anda, bukan akaun pembangun. Cipta kunci berasingan untuk setiap integrasi, dengan had perbelanjaan, dan batalkan bila kerja tamat. Kunci API itu kata laluan.
3. **Tingkah laku bila gagal.** Cuba semula, masuk baris gilir, atau beri amaran. Diam sahaja tidak boleh diterima untuk apa-apa yang melibatkan wang atau pesanan.
4. **Jalan keluar.** Anda dapat kod dan persekitaran ujian yang berfungsi, bukan sekadar sistem yang berjalan atas akaun orang lain.
5. **Penghentian versi.** Siapa kemas kini integrasi bila pembekal tarik balik versi itu, dan pada harga berapa.

## FAQ

### Perlu saya ada pelayan sendiri untuk guna API?

Tidak. Guna API tertutup hanya perlukan sambungan internet dan satu skrip atau aplikasi kecil. Anda perlukan pelayan hanya kalau anda hoskan model terbuka sendiri.

### Apa jadi kalau pembekal ubah atau tutup API mereka?

Integrasi anda berhenti berfungsi sehingga dikemas kini. Tempohnya ditentukan pembekal, bukan anda — OpenAI contohnya menerbitkan garis masa penghentian yang dipautkan dari halaman harga mereka ([disemak 19 Nov 2026](https://developers.openai.com/api/docs/pricing)). Pertahanan praktikalnya ialah pastikan integrasi nipis supaya boleh dihalakan ke pembekal lain.

### Selamat ke bagi kunci API saya kepada freelancer?

Bukan kunci utama anda. Keluarkan kunci berasingan untuk integrasi itu dengan had perbelanjaan, jangan hantar melalui WhatsApp atau e-mel, dan batalkan pada hari terakhir kerja. Kunci yang dibatalkan tidak merugikan apa-apa; kunci yang bocor boleh merugikan seluruh akaun anda.

### Berapa lama integrasi pertama mengambil masa?

Untuk satu endpoint baca sahaja, pembangun yang cekap perlukan sekitar sehari. Apa-apa yang menggerakkan wang atau menulis data perlukan seminggu, sebahagian besarnya untuk menguji apa yang berlaku bila panggilan gagal. Tiada set data awam untuk tempoh di Malaysia, jadi anggaplah angka ini anggaran kerja, bukan ukuran.

---

**Baca seterusnya:** [ruang definisi](/ms/articles/category/definitions).
