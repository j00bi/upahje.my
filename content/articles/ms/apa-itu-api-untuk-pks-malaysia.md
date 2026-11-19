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

API ialah satu cara yang dipersetujui antara dua perisian untuk bertukar data apabila diminta, tanpa ada orang perlu menyalinnya secara manual. Bagi perniagaan kecil di Malaysia, bezanya begini: sama ada staf menaip pesanan dari marketplace ke dalam spreadsheet, atau kedai anda sendiri menghantar pesanan itu terus ke sistem kurier.

## API sebenarnya buat apa untuk perniagaan saya?

API membawa satu maklumat yang sudah ditetapkan antara dua sistem, apabila diminta, dalam bentuk yang kedua-dua pihak sudah sepakat. MDN menyebutnya sebagai kontrak antara aplikasi yang menawarkan API itu dengan apa-apa yang memanggilnya ([MDN, disemak 19 Nov 2026](https://developer.mozilla.org/en-US/docs/Glossary/API)).

- Laman anda tempah kurier sebaik pesanan dibayar, bukan staf salin pesanan ke portal kurier.
- Gerbang pembayaran panggil laman anda dan tandakan pesanan sebagai dibayar, bukan seseorang buka aplikasi bank untuk sahkan pindahan.
- Bot WhatsApp tanya sistem inventori anda dahulu sebelum menjawab, bukan balasan ditulis selepas semak stok secara manual.
- Alat perakaunan tarik invois dari kedai anda, bukan invois ditaip semula.

## Apa beza API model terbuka dengan model tertutup?

API model tertutup ialah API yang anda boleh panggil tetapi tidak boleh hoskan sendiri. API model terbuka ialah API yang fail modelnya boleh dimuat turun dan dijalankan pada perkakasan yang anda kawal.

| Apa yang menentukan | API model tertutup | API model terbuka |
| --- | --- | --- |
| Di mana model berjalan | Pelayan pembekal | Pelayan anda, atau hos yang anda pilih |
| Boleh dapatkan model | Tidak. Anda hanya dapat katalog dan kadar setiap token | Ya. Anda muat turun pemberat model |
| Apa yang mengawal penggunaan | Terma perkhidmatan pembekal | Lesen model: Apache 2.0, MIT, atau lesen khusus pembekal |
| Apa yang anda bayar | Token atau panggilan, tiada bayaran bila tiada orang guna | Kuasa pengiraan dan hos setiap bulan, tambah orang untuk menjalankannya |
| Siapa boleh tukar model di bawah anda | Pembekal boleh, dalam polisi penghentian mereka | Hanya apabila anda sendiri kemas kini |
| Data anda keluar dari premis | Biasanya ya | Tidak semestinya |

Setakat 19 November 2026, katalog Mistral sendiri menyenaraikan ketiga-tiga bentuk lesen ini sebelah menyebelah: Mistral Small 4 dan model Ministral 3 di bawah Apache 2.0, Z.ai GLM 5.3 dan DeepSeek V4.1 Flash di bawah MIT, dan Mistral Large 4 di bawah "Mistral Ecosystem Open Weight License" yang khusus ([dokumentasi Mistral, disemak 19 Nov 2026](https://docs.mistral.ai/models)). Pembekal tertutup pula menerbitkan katalog model dan kadar, bukan pemberat model ([katalog model OpenAI, disemak 19 Nov 2026](https://developers.openai.com/api/docs/models)).

## Patut mula dengan yang mana?

Bayar ikut panggilan tidak kos apa-apa bila penggunaan sifar. Pelayan kos setiap bulan walaupun tiada orang guna. Kiraan itu yang menjadikan API tertutup lebih murah untuk permulaan kebanyakan perniagaan kecil. Model terbuka hanya menang apabila penggunaan bulanan cukup tinggi untuk mengalahkan kos mesin, dan ada orang di pihak anda yang tahu menjalankannya. Bagi kebanyakan PKS Malaysia, syarat kedua itulah yang menentukan.

## Berapa kos untuk orang sambungkan API di Malaysia?

Tiada penanda aras awam untuk kadar kerja integrasi API di Malaysia setakat November 2026. Sebut harga berubah ikut berapa banyak endpoint, sama ada integrasi menulis data atau baca sahaja, cara pengesahan berfungsi, apa patut berlaku bila panggilan gagal, dan betapa bersepah data sedia ada anda. Harga yang diberi sebelum lima soalan itu dijawab masih anggaran.

## Macam mana saya nak nilai harga kerja ini sendiri?

1. Senaraikan setiap sistem yang perlu berhubung dengan sistem mana, dan arah mana.
2. Asingkan kerja baca sahaja daripada kerja yang menulis data atau menggerakkan wang.
3. Tanya apa berlaku bila panggilan gagal. Pesanan hilang tanpa bunyi ialah hasil yang paling mahal.
4. Minta harga tetap bagi setiap integrasi, bukan anggaran ikut jam.
5. Tanya apa jadi kepada kod dan kredensial bila kerja tamat.

## Berapa bil bulanan selepas ia berjalan?

Pembekal menerbitkan kadar mereka, jadi bil bulanan boleh dikira, bukan diagak. Kadar standard OpenAI untuk model kecil semasa, GPT-6 Luna, ialah USD 0.10 setiap juta token input dan USD 0.50 setiap juta token output ([harga OpenAI, disemak 19 Nov 2026](https://developers.openai.com/api/docs/pricing)). Bot FAQ WhatsApp yang mengendalikan 3,000 mesej sebulan, kira-kira 600 token masuk dan 200 token keluar setiap mesej, menelan sekitar USD 0.48 sebulan untuk token sahaja. Tambah kos hos kalau integrasi berjalan atas pelayan anda sendiri, dan tambah kadar tukaran yang kad anda kenakan, yang tidak termasuk dalam angka ini. Penyelenggaraan juga masuk dalam bil ini, sebab versi model yang dihentikan akan memberhentikan integrasi sehingga seseorang membaikinya.

## Macam mana saya tahu saya perlukan API atau cukuplah buat manual?

Kalau kerja itu berlaku beberapa kali sehari dan kesilapannya murah dibaiki, buat manual sahaja. API mula berbaloi apabila jumlah kerja atau kos kesilapan melepasi garis itu. Tiada penanda aras awam yang menetapkan garis itu, jadi ini penilaian kami: garisnya sekitar titik apabila seseorang membuang lebih sejam sehari untuk kerja salin-menyalin, atau apabila satu pesanan yang terlepas kosnya melebihi yuran pembekal sebulan. Bawah daripada itu, seorang staf sambilan yang teliti lebih murah dan lebih boleh diharap.

## Apa yang perlu saya tetapkan sebelum bayar orang buat kerja ini?

Tetapkan tiga perkara secara bertulis sebelum bayaran.

1. Skop. Sistem mana, endpoint mana, baca atau tulis.
2. Tingkah laku bila gagal. Cuba semula, masuk baris gilir, atau beri amaran. Diam sahaja tidak boleh diterima untuk apa-apa yang melibatkan wang atau pesanan.
3. Jalan keluar. Anda dapat kod dan persekitaran ujian yang berfungsi, bukan sistem yang berjalan atas akaun orang lain.

## FAQ

### Perlu saya ada pelayan sendiri untuk guna API?

Tidak. API tertutup hanya perlukan sambungan internet dan satu skrip atau aplikasi kecil. Anda perlukan pelayan hanya kalau anda hoskan model terbuka sendiri.

### Selamat ke bagi kunci API saya kepada freelancer?

Bukan kunci utama anda. Keluarkan kunci berasingan untuk integrasi itu dengan had perbelanjaan, jangan hantar melalui WhatsApp atau e-mel, dan batalkan pada hari terakhir kerja. Kunci yang dibatalkan tidak merugikan apa-apa. Kunci yang bocor boleh merugikan seluruh akaun anda.

### Apa jadi kalau pembekal ubah atau tutup API mereka?

Integrasi berhenti berfungsi sehingga dikemas kini. Tempoh itu ditentukan pembekal: OpenAI menerbitkan garis masa penghentian yang dipautkan dari halaman harga mereka ([disemak 19 Nov 2026](https://developers.openai.com/api/docs/pricing)). Pastikan integrasi nipis supaya boleh dihalakan ke pembekal lain.

### Berapa lama integrasi pertama mengambil masa?

Satu endpoint baca sahaja mengambil masa sekitar sehari untuk pembangun yang cekap. Apa-apa yang menggerakkan wang atau menulis data mengambil masa seminggu, sebahagian besarnya untuk menguji apa yang berlaku bila panggilan gagal. Tiada set data awam untuk tempoh di Malaysia, jadi ini anggaran kerja.

---

**Baca seterusnya:** [ruang definisi](/ms/articles/category/definitions).
