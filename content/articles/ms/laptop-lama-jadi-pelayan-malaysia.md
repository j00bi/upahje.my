---
title: "Laptop lama jadi pelayan hanya selepas anda ukurnya"
description: "Watt melahu, bateri yang bukan UPS, dan tarif yang perlu anda baca sendiri. Aritmetik yang menentukan sama ada mesin percuma itu benar-benar percuma."
slug: laptop-lama-jadi-pelayan-malaysia
translationKey: spare-laptop-home-server-malaysia
format: explainer
reader: owner
date: 2026-11-25
updated: 2026-11-25
author: "UpahJe Desk"
category: definitions
tags: [definitions, hosting-sendiri, perkakasan, malaysia]
cardFigure: "RM79 setahun pada 20W dan 45 sen"
canonical: https://upahje.my/ms/articles/laptop-lama-jadi-pelayan-malaysia
draft: false
changelog:
  - date: 2026-11-25
    note: "Mula diterbitkan."
sources:
  - title: "Tenaga Nasional Berhad, harga dan tarif kediaman (jadual tarif domestik yang dibaca isi rumah untuk kadar setiap kWh sendiri)"
    url: "https://www.tnb.com.my/residential/pricing-tariffs"
    checked: 2026-11-25
  - title: "Ubuntu Server, keperluan sistem dan panduan pemasangan untuk mesin simpanan"
    url: "https://ubuntu.com/server/docs/installation"
    checked: 2026-11-25
  - title: "Tailscale, harga (pelan peribadi, akses berasaskan peranti tanpa membuka port masuk)"
    url: "https://tailscale.com/pricing"
    checked: 2026-11-25
---

# Laptop lama jadi pelayan hanya selepas anda ukurnya

Laptop yang sudah ada dalam laci tidak berharga apa-apa untuk diperoleh, dan itulah sebabnya idea ini menarik: satu perkhidmatan, tiada bayaran bulanan, tiada akaun awan. Perangkapnya ialah "perkakasan percuma" ialah kenyataan tentang harga belian, manakala menjalankan mesin selama setahun ialah kenyataan tentang elektrik, masa hidup dan malam anda sendiri.

Tiada satu pun daripada itu alasan untuk mengelakkannya. Ia alasan untuk membuat empat ukuran sebelum anda menghabiskan satu malam untuknya.

## Apa yang sebenarnya ia tarik

Laptop moden menarik kuasa rendah semasa melahu. Mesin dengan penutup tertutup, tiada output paparan dan satu perkhidmatan mendengar akan berada antara lampu malam dan mentol lampu, dan hanya angka yang meter anda tunjukkan yang dikira.

Label pada blok kuasa tidak memberitahu anda. Ia menyatakan maksimum yang penyesuai boleh beri, bukan apa yang mesin gunakan semasa rehat, dan kedua-duanya berbeza lebih daripada lima kali.

Meter kuasa plug-in berharga kira-kira RM30 di mana-mana kedai perkakasan, dan ia menukar seluruh keputusan daripada perdebatan kepada bacaan. Jalankan laptop pada melahu selama satu jam dengan perkhidmatan hidup, catat angka watt, dan gunakan itu.

## Aritmetik, dengan andaian dinyatakan

Ambil 20 watt semasa melahu, angka munasabah bagi laptop yang menyajikan satu perkhidmatan ringan, dan kadar domestik 45 sen setiap kWh. Kedua-duanya andaian, dan anda patut menggantikan keduanya dengan angka sendiri.

- 20 W selama 24 jam ialah 480 Wh, atau 0.48 kWh sehari.
- Pada 45 sen, itu kira-kira 21.6 sen sehari.
- Sepanjang setahun, 175 kWh, atau kira-kira RM79.

Tukar wattnya dan jawapannya berskala: 40 W menggandakannya kepada kira-kira RM158 setahun, 10 W memotongnya kepada kira-kira RM40. Tarif yang patut anda gunakan tercetak dalam bil anda sendiri, dan TNB menerbitkan jadual domestik jika bil itu tidak cukup jelas.

Bandingkan dengan sewa bulanan termurah yang melakukan kerja yang sama. Instans awan kecil selalunya sekitar RM20 hingga RM40 sebulan, iaitu RM240 hingga RM480 setahun. Laptop menang dari segi wang pada mana-mana watt di atas, dan ia berhenti menang sebaik masa anda dinilai lebih daripada beberapa jam setahun.

## Bateri bukan UPS

Laptop ada bateri terbina dalam, dan mudah untuk menganggapnya perlindungan percuma daripada gangguan bekalan. Ia bukan begitu, atas dua sebab.

Pertama, bateri yang menghabiskan hayatnya pada 100 peratus dan suhu hang merosot cepat, dan bateri kembung dalam mesin yang berjalan tanpa pengawasan ialah risiko kebakaran, bukan gangguan kecil. Kebanyakan laptop membenarkan anda hadkan pengecasan pada 60 hingga 80 peratus dalam firmware, dan mesin hos sendiri patut berbuat begitu.

Kedua, penutupan yang teratur lebih bernilai daripada lima minit masa hidup. Tetapkan mesin untuk menutup apabila bateri sampai ambang, dan anggap bekalan akan terputus semasa anda tiada.

## Apa yang perlu dipasang, dan apa yang perlu dilangkau

1. **Distribusi pelayan, bukan desktop.** Ubuntu Server atau Debian, tanpa sesi grafik. Persekitaran desktop pada mesin tanpa kepala ialah memori yang anda bayar dan permukaan serangan yang tidak anda guna.
2. **Tingkah laku penutup, ditetapkan secara jelas.** Kebanyakan laptop tidur apabila penutup ditutup, iaitu lawan kepada apa yang pelayan patut buat.
3. **Unit `systemd` dengan polisi mula semula**, supaya perkhidmatan yang mati kembali tanpa anda.
4. **Satu jalan masuk, bukan tiga.** Tailscale atau terowong Cloudflare memberi akses jauh tanpa membuka port pada router, dan kedua-duanya tidak perlukan IP statik.
5. **Sandaran yang keluar dari mesin.** Pelayan dengan satu salinan datanya pada satu cakera ialah kerugian yang sudah dijadualkan, walau apa pun masa hidupnya.

Langkau perbualan RAID. Dua cakera dalam laptop jarang, dan sandaran di tempat lain menyelesaikan masalah yang RAID tidak selesaikan.

## Di mana ini berhenti berkesan

Laptop lama ialah jawapan yang betul untuk perkhidmatan peribadi, alat dalaman kecil, atau tempat menjalankan kerja berjadual. Ia jawapan yang salah untuk apa-apa yang pelanggan bergantung padanya, atas tiga sebab yang tidak dapat diperbaiki dengan konfigurasi:

- **Bekalan elektrik dan internet kediaman.** Kedua-duanya gagal, dan tiada satu pun datang dengan SLA.
- **Alamat dinamik.** Terowong menyelesaikan ketercapaian, bukan kebolehpercayaan.
- **Satu mesin, tiada lebihan.** Apabila ia mati, ia mati sehingga anda balik ke rumah.

Jika perkhidmatan itu penting kepada orang lain, RM240 setahun untuk instans kecil ialah bahagian termurah dalam keputusan itu.

## Urutan untuk melakukannya

1. Ukur watt melahu dengan meter, dengan perkhidmatan berjalan.
2. Baca tarif anda sendiri, kemudian kira setahun.
3. Bandingkan dengan instans awan kecil pada beban kerja yang sama.
4. Hadkan pengecasan bateri dan tetapkan ambang penutupan.
5. Pasang distribusi pelayan, tetapkan tingkah laku penutup, dan tambah satu terowong.
6. Halakan sandaran ke storan di luar mesin sebelum anda mempercayainya dengan apa-apa.

Urutan itu mengambil satu malam dan menghasilkan angka, bukan pendapat, dan itulah perbezaan antara hobi dan keputusan.

---

**Read next**

[Colab akan latih model anda. Ia tidak akan hoskan](https://upahje.my/ms/articles/colab-hosting-ai-malaysia)

[Lebih banyak definisi, dijelaskan dengan mudah](https://upahje.my/ms/glossary)
