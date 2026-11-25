---
title: "Bot dagangan ialah masalah data yang memakai pakaian model"
description: "Sembilan simbol, 17.9 minit masa GPU dan RM0.58 kos pengkomputeran menghasilkan model yang membuat satu keputusan bagi setiap syiling. Model bukan masalahnya."
slug: realiti-bot-dagangan-malaysia
translationKey: trading-bot-reality-malaysia
format: perspective
reader: owner
date: 2026-11-25
updated: 2026-11-25
author: "UpahJe Desk"
category: side-income
tags: [side-income, dagangan, pembelajaran-pengukuhan, malaysia]
cardFigure: "17.9 minit, USD 0.14, satu keputusan"
canonical: https://upahje.my/ms/articles/realiti-bot-dagangan-malaysia
draft: false
opinion: true
changelog:
  - date: 2026-11-25
    note: "Mula diterbitkan."
sources:
  - title: "Binance, titik akhir sejarah kadar pendanaan yang digunakan untuk tetingkap enam bulan (jadual tidak dibaca: halaman fi dan pendanaan memulangkan 202 kosong)"
    url: "https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Get-Funding-Rate-History"
    checked: 2026-11-25
  - title: "Binance, titik akhir lilin KLINE yang digunakan untuk siri harga"
    url: "https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints"
    checked: 2026-11-25
---

# Bot dagangan ialah masalah data yang memakai pakaian model

Ejen pembelajaran pengukuhan yang dilatih pada sembilan simbol FX dan mata wang kripto menamatkan larian penuhnya dalam 17.9 minit pada masa GPU sewaan, dengan kos USD 0.14. Selepas itu ia membuat tepat satu keputusan bagi setiap simbol, berulang kali: tahan, atau jual, mengikut mana yang ditemui kecerunan ganjaran dahulu. Hasil itu bukan pepijat latihan. Ia jawapan jujur kepada soalan yang salah dibentuk, dan ia hasil yang dicapai oleh kebanyakan projek bot selepas setahun membeli perkakasan yang lebih baik.

## Bahagian murah ialah latihan

Sembilan simbol, 17.9 minit, USD 0.14. Pada kadar H100 SXM tersenarai Runpod, USD 4.39 sejam, larian sepanjang itu berharga kurang daripada secawan kopi, dan senarai lebih murah bagi kad yang sama ada di tempat lain. Pengkomputeran bukan kekangan dan tidak lagi sejak bertahun-tahun. Sesiapa yang berkata botnya perlukan GPU lebih besar sedang menerangkan masalah data yang belum didiagnosisnya.

Kekangan sebenarnya ialah model tidak boleh mempelajari kelebihan yang tiada dalam data yang diberi. Beri ia enam bulan lilin minit dan ia akan mempelajari bentuk enam bulan lilin minit itu, termasuk setiap kemalangan yang kebetulan berlaku dalam bulan-bulan tersebut.

## Apa yang keruntuhan itu sebenarnya katakan

Dasar yang mengeluarkan tindakan sama bagi setiap input telah menemui dasar paling rendah varians yang ada. Dalam siri pasaran yang kebanyakan detiknya kelihatan serupa, itu sering langkah rasional: isyarat ganjaran hampir tidak membezakan satu tindakan daripada yang lain, jadi kecerunan menetap pada pemalar paling selamat.

Penyelesaiannya bukan rangkaian lebih besar atau larian lebih panjang. Ia sama ada ganjaran yang memisahkan keputusan baik daripada buruk pada resolusi yang anda benar-benar dagangkan, atau penerimaan bahawa isyarat itu terlalu nipis untuk dasar yang dipelajari dan peraturan lebih wajar diletakkan di situ. Kedua-dua jawapan lebih murah daripada GPU lain, dan kedua-duanya lebih sukar diterima.

## Bahagian yang berkesan ialah aritmetik

Di mana kajian yang sama menghasilkan kelebihan yang boleh digunakan, kaedahnya bukan model. Ia peraturan yang ditakrifkan dan diukur merentasi enam bulan data kadar pendanaan: apabila kadar pendanaan berada di atas persentil ke-90 sendiri, tempoh berikutnya menghasilkan kadar menang 60 hingga 70 peratus pada 55 hingga 77 mata asas bagi setiap tempoh pegangan, dengan fi venue dan kos pendanaan dikenakan dan bukan diandaikan hilang.

Keputusan itu mempunyai empat sifat yang tidak diberikan oleh rangkaian neural. Ia boleh dijelaskan dalam satu ayat. Ia boleh diukur pada sampel. Ia gagal secara jelas apabila rejim berubah. Dan ia boleh disemak oleh seseorang yang tidak mempercayai anda.

## Empat pintu sebelum strategi diberi wang

Backtest bukan bukti. Ini pintu yang digunakan sebelum strategi dibenarkan melepasi kertas:

1. **Kadar menang melebihi 50 peratus** pada tetingkap penuh, bukan pada bulan terbaik.
2. **Faktor keuntungan melebihi 1.2**, supaya kemenangan cukup besar untuk bertahan satu siri kekalahan.
3. **Sekurang-kurangnya 20 dagangan**, kerana sepuluh dagangan ialah anekdot dengan carta.
4. **Bertahan sepanjang tetingkap**, termasuk bulan-bulan strategi itu tidak berbuat apa-apa.

Tambah pengukuran susutan — berapa lama kelebihan itu bertahan, bukan sekadar sama ada ia muncul — dan strategi yang lulus keempat-empatnya masih hanya calon. Dagangan kertas datang selepas itu, dan ia bukan pilihan, kerana gelinciran dan pengisian ialah tempat backtest mati.

## Apa kosnya kepada pengendali kecil

Bajet jujur untuk bot yang mungkin berkesan bukan langganan. Ia bulan-bulan kerja data sebelum dagangan pertama: mendapatkan siri harga bersih, memodelkan fi di venue yang anda benar-benar akan gunakan, dan menulis rangka ujian pengesahan yang menghalang anda daripada menggunakan versi yang kelihatan bagus pada bulan Mac.

Kebanyakan projek melangkau itu dan membeli model sebagai gantinya. Itulah sebabnya ia berakhir dengan carta yang naik pada masa lalu dan akaun langsung yang tidak.

## Di mana untuk mula, jika anda mula

1. Pilih satu instrumen dan satu peraturan yang boleh dinyatakan dalam satu ayat.
2. Dapatkan enam bulan data daripada API venue itu sendiri, bukan daripada tangkapan skrin.
3. Kenakan fi dan pendanaan sebelum anda melihat hasilnya, bukan selepasnya.
4. Tulis keempat-empat pintu sebelum anda melihat angka, supaya anda tidak boleh mengalihkannya kemudian.
5. Dagang kertas selama sebulan, dan rekod pengisian dan bukan harga.

Bot itu bahagian mudah untuk dibina dan paling mudah untuk disalah anggap. Kerja yang menentukan sama ada ia menjana wang berlaku sebelum satu pesanan pun dihantar, dalam hamparan yang kebanyakan orang langkau kerana ia tidak seseronok gelung latihan.

---

**Read next**

[H100 yang sama disewa RM11.89 sejam, atau RM7.12](https://upahje.my/ms/articles/kos-sewa-gpu-malaysia)

[Lebih banyak panduan pendapatan sampingan](https://upahje.my/ms/glossary)
