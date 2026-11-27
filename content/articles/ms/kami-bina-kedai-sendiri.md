---
title: "Satu orang, satu dapur: kedai kami sendiri"
description: "Kami berhenti berhujah dan membina kedai sendiri. husnieats terima pesanan, keluarkan tiket dan rekonsiliasi DuitNow dari infrastruktur kami."
slug: kami-bina-kedai-sendiri
translationKey: we-built-our-own-storefront
format: field-test
reader: owner
date: 2026-11-26
updated: 2026-11-26
author: "UpahJe Desk"
category: buying-guides
audience: publication
tags: [buying-guides, storefront, sme, malaysia]
cardFigure: "Tiga hidangan, satu dapur, sifar platform"
changelog:
  - date: 2026-11-26
    note: "Mula diterbitkan."
canonical: https://upahje.my/ms/articles/kami-bina-kedai-sendiri
sources:
  - title: "Harga Billplz: kadar FPX, kad dan auto-deduct, serta terma penyelesaian"
    url: "https://www.billplz.com/pricing"
    checked: 2026-11-26
  - title: "Keputusan MyCC berhubung foodpanda, 11 September 2023, jalur komisen dalam Jadual 3"
    url: "https://www.mycc.gov.my/"
    checked: 2026-11-26
---

# Satu orang, satu dapur: kami bina kedai sendiri dan jalankannya

Ini bukan hujah menentang platform penghantaran. Ini demonstrasi apa yang seorang manusia kini boleh lakukan tanpanya.

Kami sudah lama menulis tentang kos memiliki kedai sendiri (kadar komisen, fi pembayaran, masalah mencari pelanggan) dan tulisan itu mula terasa seperti nasihat yang belum diuji. Jadi kami bina bendanya. **husnieats** ialah kedai yang berfungsi untuk satu dapur: tiga hidangan, dimasak mengikut pesanan, ambil sendiri di Seksyen 7 atau dihantar oleh penghantar, menerima pesanan sebenar melalui laman yang berjalan atas infrastruktur kami sendiri.

husnieats milik kami; tiada apa-apa lain dalam artikel ini milik kami.

## Apa yang ia sebenarnya buat

Bukan halaman menu dengan pautan WhatsApp. Kedai dengan tiga sistem yang setiap perniagaan perlukan untuk mengambil wang tanpa platform:

**1. Mengambil pesanan.** Menunya tiga hidangan. Buttermilk Chicken RM12.90, Korean Chicken RM13.90, Teh O RM3.50, setiap satu dengan penerangan dan butang Tambah. Pelanggan memilih ambil sendiri atau penghantaran, dan harga penghantaran muncul **sebelum** mereka mengesahkan, bukan selepas.

![Aliran pesanan husnieats: pilih makanan, bayar dengan DuitNow, hantar resit melalui WhatsApp, tiga langkah, tiada platform di tengah](/figures/screens/husnieats-ordering.webp)

**2. Tiket.** Setiap pesanan mendapat tiket pendek yang boleh disebut (A001 hingga A999, kemudian B001) kerana papan dapur dan telefon penghantar kedua-duanya perlukan rujukan yang boleh dijerkapkan merentas bilik. Pautan pelanggan pula menggunakan token rawak berasingan, kerana nombor berturutan boleh diteka dan URL awam tidak boleh begitu.

**3. Rekonsiliasi pembayaran.** Pelanggan mengimbas kod QR DuitNow, membayar jumlah tepat yang dipaparkan pesanan, dan menghantar resit melalui WhatsApp. Seorang manusia memeriksanya, kemudian dapur mula memasak. Itulah keseluruhan tindanan pembayaran: satu kod QR, satu mesej, sepasang mata.

Pesanan dan penghantaran dijejak sebagai dua keadaan berasingan, kerana pesanan ambil sendiri tiada penghantar untuk ditunggu. Dan wang disimpan sebagai sen integer, dibundarkan kepada sepuluh sen terdekat (jumlah terkecil yang muncul pada bil Malaysia) bukan perpuluhan yang terhanyut.

![Menu husnieats pada lebar mudah alih: tiga hidangan, harga, butang tambah. Satu dapur, tiga hidangan, kerana itulah yang boleh dimasak dengan betul mengikut pesanan](/figures/screens/husnieats-menu.webp)

## Pecahan kosnya

Inilah yang ia gantikan. Gerbang pembayaran mengenakan **RM1.25** untuk mengutip RM30 melalui FPX pada pelan percuma, atau RM0.75 pada pelan RM999 setahun. Kad berharga **1.8%**. Itu harga yang diterbitkan, dibaca dari halaman Billplz pada 26 November 2026.

Platform penghantaran mengambil komisen. Grab dan foodpanda tidak menerbitkan kad kadar pedagang, jadi satu-satunya angka yang direkodkan ialah jalur dalam keputusan Suruhanjaya Persaingan berhubung foodpanda pada 11 September 2023: **1–5%, 10–25%, 15–20% dan 15–25%**, bergantung pada perkhidmatan. Pada pesanan RM30, itu antara RM4.50 dan RM7.50.

husnieats tidak membayar **apa-apa per pesanan**. Tiada gerbang, kerana wang bergerak dari bank ke bank melalui QR. Kosnya seorang manusia membaca resit, dan itulah pertukaran yang jujur: pada tiga hidangan dan segelintir pesanan sehari, pemeriksaan manusia lebih murah dan lebih anjal daripada integrasi. Pada lima puluh pesanan sehari ia akan menjadi kesesakan, dan jawapannya ialah gerbang dengan fi per transaksi.

Jadi dakwaannya sempit dan boleh diuji: **mengambil pesanan, mengeluarkan tiket dan merekonsiliasi pembayaran boleh dibina dan dijalankan oleh seorang manusia, pada sebahagian kecil daripada komisen, dengan hanya domain, hos dan telefon.**

## Apa yang ia tidak buat

- **Tiada kad.** Jika pelanggan hanya ada kad, kedai ini tidak dapat mengambil pesanan itu. Itu had sebenar, bukan pilihan reka bentuk.
- **Tiada rangkaian penghantar.** Penghantaran diuruskan, bukan dihantar pada skala.
- **Tiada pasukan.** Pentadbirannya papan pemuka seorang manusia, bukan bilik belakang untuk sepuluh kakitangan.
- **Tiada rekonsiliasi automatik.** Seseorang perlu memadankan resit dengan pesanan. Sistem mempercepatkan; ia tidak menghilangkannya.

Menyebut perkara ini ialah intinya. Demonstrasi yang menyembunyikan tepinya ialah jualan.

## Apa yang diperlukan untuk buat sendiri

Tidak banyak. Empat perkara, tiada satu pun luar biasa:

1. **Tempat untuk meletakkannya.** Domain dan hos. Tindanan di sini sengaja biasa, aplikasi web dan pangkalan data, kedua-duanya boleh dihos sendiri, kerana intinya kebolehulangan, bukan kepintaran.
2. **Cara mengambil wang.** Kod QR DuitNow tiada kos untuk dipaparkan dan tiada kos untuk menerima. Gerbang ialah peningkatan, bukan titik mula.
3. **Saluran untuk resit.** WhatsApp, yang pelanggan anda sudah guna dan sudah percaya.
4. **Disiplin.** Tulis pesanan, periksa bayaran, tanda sedang dimasak, tanda siap. Perisian tidak menghapuskan langkah ini; ia hanya mempercepatkannya.

## Idea yang sama pada skala komersial

husnieats ialah prototaip. **mejamakan** ialah bentuk yang sama dengan perniagaan di belakangnya: operasi penghantaran lauk di KL dan Selangor yang menjalankan laman sendiri, menu mingguan dikurasi mengikut hari, akaun di domain sendiri, "From RM18/meal", penghantaran Isnin hingga Jumaat, dan pelan yang diperbaharui pelanggan, langganan, bukan pesanan sekali. Laman mereka melaporkan 3,000+ keluarga telah dilayani.

Dua contoh, satu kecil dan satu berniaga: seorang individu boleh menegakkan kedai, dan sebuah dapur boleh menjalankannya secara komersial. Kedua-duanya tidak perlukan marketplace di tengah untuk menerima pesanan.

## Mengapa ini lebih penting daripada hujah komisen

Hujah komisen ialah aritmetik, dan aritmetik boleh dibahaskan: platform membawa pelanggan, fi itu membayar jangkauan, dan pada volum rendah matematiknya sering menyebelahi kekal. Baik.

Demonstrasi berbeza. Ia mengatakan keupayaan bukan lagi penghalang. Sepuluh tahun lalu, menerima pesanan dalam talian bermakna sama ada marketplace atau pembangun dan kos lima angka. Hari ini ia bermakna domain, kod QR dan satu hujung minggu, dan satu-satunya yang tinggal ialah bahagian yang tiada perisian boleh jual, iaitu membuat orang berjalan masuk ke pintu.

**Jadi: kedai sudah selesai. Khalayak itulah kerjanya.**

---

**Bacaan lanjut**

[RM1.25 atau 15%: kos checkout sendiri](https://upahje.my/ms/articles/checkout-sendiri-lawan-komisen)

[Kos chatbot WhatsApp: setiap mesej, setiap bulan](https://upahje.my/ms/articles/kos-chatbot-whatsapp-malaysia)
