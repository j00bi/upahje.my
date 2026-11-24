---
title: "Jangan tulis semula laman anda. Tulis semula 5% itu."
description: "Dua repo MIT lima hari selang, 11,327 bintang, nasihat bertentangan untuk aplikasi lambat. Perselisihan itu menunjukkan pembetulan mana yang diperlukan."
slug: tulis-semula-lima-peratus
translationKey: rewrite-the-five-percent
format: teardown
reader: all
date: 2026-11-23
updated: 2026-11-23
author: "Husni Ahmad"
category: buying-guides
tags: [teardown, prestasi, rust, malaysia]
canonical: https://upahje.my/ms/articles/tulis-semula-lima-peratus
draft: true
changelog:
  - date: 2026-11-23
    note: "Mula diterbitkan."
sources:
  - title: "rust-anything, repositori dan README (MIT)"
    url: "https://github.com/erkamyaman/rust-anything"
    checked: 2026-11-23
  - title: "fast-anything, repositori dan README (MIT)"
    url: "https://github.com/EL4CTEO/fast-anything"
    checked: 2026-11-23
---

# Jangan tulis semula laman anda. Tulis semula 5% itu.

Dua repositori diterbitkan lima hari selang membawa 11,327 bintang antara keduanya dan memberi nasihat bertentangan. Satu berkata pindahkan seluruh aplikasi ke Rust, sekeping demi sekeping. Satu lagi berkata pindahkan hanya 5% yang lambat. Kedua-duanya MIT. Kedua-duanya betul, dan yang menentukan pilihan anda bukanlah stack anda.

## Dua repo MIT, lima hari selang, berhujah pembetulan bertentangan

`rust-anything` dicipta pada 16 November 2026 dan mempunyai 8,516 bintang. Penerangannya janji tentang keseluruhan aplikasi: tulis semula dalam Rust sekeping demi sekeping, disemak terhadap tingkah laku asal. README-nya menuntut satu pindahan: Prettier, "19x faster", dengan "15,861 of 17,224 recorded runs" dalam Rust dan setiap larian byte-identical.

`fast-anything` dicipta pada 21 November 2026 dengan 2,811 bintang. Penerangannya menentang skop repo pertama: jangan tulis semula dalam Rust, tulis semula 5% yang lambat, pindahkan fungsi panas, buktikan tingkah laku sama.

Kedua-duanya berselisih tentang skop, iaitu tempat wang pergi.

## Satu pindahkan seluruh aplikasi; satu lagi pindahkan satu fungsi

`rust-anything` merekod apa yang aplikasi anda lakukan, kemudian agent pengekodan anda menulis pengganti Rust sekeping demi sekeping, dan setiap keping disemak terhadap rekod itu sebelum keping seterusnya bermula.

`fast-anything` memprofil aplikasi yang sedang berjalan, menyusun fungsi mengikut masa dan kemudahan dipindahkan, merekod sehingga 500 panggilan sebenar bagi satu fungsi yang dipilih, menerbitkan kes tepi daripada panggilan itu, dan memainkannya semula. Tiada apa diaktifkan sehingga setiap kes sepadan, float dalam 1e-9, ralat di tempat asal meralat. Perekod dalam sumbernya dihadkan pada 500 panggilan; demo README-nya menunjukkan pindahan salah ditangkap oleh "148 of 500" panggilan yang direkod.

Tiada satu pun repo dijalankan untuk artikel ini. Angkanya milik mereka; mekanismenya kelihatan dalam sumber dan README.

## Ujiannya ialah sama ada kelambatan itu satu fungsi atau setiap permintaan

Satu soalan menentukan kem, dan soalan itu bukan "besar mana aplikasinya".

Jika sepuluh permintaan melalui fungsi yang sama, anda ada masalah 5% yang menyamar sebagai masalah seluruh aplikasi. Profil, pindahkan fungsi itu, buktikan kesetaraan, hantar. Selebihnya aplikasi kekal di tempatnya, jadi radius letupan itu satu fungsi dan pembatalannya satu flag.

Jika setiap bahagian aplikasi sama-sama sederhana, fungsi panas tidak bersembunyi; ada empat puluh daripadanya, masing-masing lambat dengan margin yang sama. Itu masalah tulis semula, dan memindahkan satu fungsi akan menggerakkan angkanya hampir tiada.

| Gejala anda | Kem yang padan | Bukti yang diterbitkan | Apa yang rosak jika salah pilih |
| --- | --- | --- | --- |
| Satu endpoint, satu skrip, satu transformasi imej mendominasi masa jalan | fast-anything | 500 panggilan direkod dimainkan semula setiap pindahan; 148 daripada 500 menangkap satu pindahan salah | Tiada, jika fungsi itu tulen. Jika ia menyentuh I/O, ia akan menolak dan anda kehilangan sehari |
| Laluan kod yang sama muncul dalam setiap permintaan | fast-anything, digunakan dua kali | Pengesahan 500 panggilan yang sama, setiap fungsi | Anda betulkan titik panas pertama dan yang kedua muncul; dua pindahan, bukan satu |
| Setiap skrin terasa lambat, tiada titik panas tunggal | rust-anything | 15,861 daripada 17,224 larian direkod dalam Rust, setiap larian byte-identical | Berbulan-bulan memindahkan, langkah kompil dalam gelung, dan tulis semula yang masih separuh siap |
| Bahagian lambat itu query atau aset yang tidak dioptimumkan | kedua-duanya tidak | — | Anda memindahkan kod di sekeliling masalah pangkalan data dan pangkalan data kekal lambat |

Baris terakhir itulah yang pembeli selalu tersalah. Halaman 4 saat boleh jadi satu imej hero yang tidak dimampatkan, dan tiada jumlah Rust akan menyentuhnya.

## Bagi laman PKS, jawapannya 5% itu

Pendapat saya, dinyatakan sekali: bagi laman perniagaan kecil Malaysia, perkara yang lambat hampir selalu satu imej, satu query, atau satu skrip yang menyekat, dan tindak balas yang betul ialah betulkan itu dan berhenti. Pindahan penuh ke Rust ialah keputusan untuk pasukan yang ada bajet profiling dan proses pelepasan. Bagi kedai dengan laman lima halaman dan senarai produk, kerangka sebelas ribu bintang bukanlah kekangannya.

Kesorotan itu lebih penting daripada pendapatnya. Sebelum anda menerima sebut harga untuk membina semula, tanya fungsi atau query mana yang lambat, dan angka apa yang dihasilkannya. Pembangun yang tidak dapat menamakannya sedang memberi sebut harga untuk tulis semula, dan tulis semula tiada tarikh tamat.

## Ukur tiga perkara sebelum percaya mana-mana kem

Tiga angka, dan mana-mana satu boleh menghantar anda pulang tanpa projek.

1. **Largest contentful paint** bagi halaman produk anda pada profil 4G yang dihadkan. Jika elemennya imej hero, pembetulannya imej, bukan bahasa.
2. **Query paling lambat dalam log pangkalan data anda** bagi satu minggu biasa. Jika satu query mengambil saat dan yang lain milisaat, anda telah jumpa 5% itu.
3. **Aset terbesar yang dimuat turun halaman**, mengikut saiz bait. Imej 2 MB pada laman lima halaman ialah pembetulan lima minit yang mengalahkan tulis semula.

Tiga angka itu kosnya tiada dan mengambil masa satu petang. Ia juga memberi anda perkataan untuk menolak jawapan yang mahal.

## Tulis semula tiada tarikh tamat; pindahan lima peratus ada

Asimetri itulah keseluruhan keputusan. Pindahan seluruh aplikasi tamat apabila modul terakhir disemak, iaitu tarikh yang tiada siapa boleh janjikan pada permulaan. Pindahan satu fungsi tamat apabila panggilan yang direkod sepadan, iaitu syarat, bukan jadual.

Jika kelambatan anda satu fungsi, ambil pindahan kecil. Jika ia di merata tempat, nilaikan tulis semula dengan jujur, termasuk bulan-bulan ia berjalan. Kesilapan mahal ialah membeli pembetulan besar untuk masalah kecil.

---

**Baca seterusnya**

[Kos kerja automasi di Malaysia, daripada harga yang diterbitkan](https://upahje.my/ms/articles/kos-automasi-malaysia-harga-diterbitkan)

[Lagi tentang membeli automasi](https://upahje.my/ms/articles/category/buying-guides)
