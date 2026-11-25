---
title: "H100 yang sama disewa RM11.89 sejam, atau RM7.12"
description: "Runpod menyenaraikan H100 SXM pada USD 4.39 sejam dan Vast.ai pada USD 1.73 untuk cip yang sama. Jurang itu model bil dan kapasiti terbiar, bukan perkakasan."
slug: kos-sewa-gpu-malaysia
translationKey: gpu-rental-cost-malaysia
format: comparison
reader: owner
date: 2026-11-25
updated: 2026-11-25
author: "UpahJe Desk"
category: buying-guides
tags: [buying-guides, gpu, pengkomputeran, malaysia]
cardFigure: "RM7.12 hingga RM18.07 untuk sejam H100"
canonical: https://upahje.my/ms/articles/kos-sewa-gpu-malaysia
draft: false
changelog:
  - date: 2026-11-25
    note: "Mula diterbitkan."
sources:
  - title: "Runpod, harga awan GPU (H100 PCIe USD 2.89/jam, H100 SXM USD 4.39/jam, H100 NVL USD 3.19/jam, B200 USD 7.99/jam, RTX A5000 USD 0.27/jam)"
    url: "https://www.runpod.io/pricing"
    checked: 2026-11-25
  - title: "Vast.ai, harga GPU (H100 SXM dari USD 1.73/jam, median USD 2.40/jam; H100 PCIe dari USD 2.31/jam; dibil mengikut saat, tiada minimum jam)"
    url: "https://vast.ai/pricing"
    checked: 2026-11-25
  - title: "Frankfurter, kadar rujukan USD ke MYR 4.1155 bagi 24 November 2026"
    url: "https://api.frankfurter.dev/v1/latest?base=USD&symbols=MYR"
    checked: 2026-11-25
---

# H100 yang sama disewa RM11.89 sejam, atau RM7.12

Nvidia H100 SXM disewa pada USD 4.39 sejam di Runpod dan dari USD 1.73 di Vast.ai. Pada kadar rujukan RM4.1155 sedolar, itu RM18.07 berbanding RM7.12 untuk model kad yang sama. Tiada apa pada perkakasan yang berbeza. Harga berbeza kerana satu pasaran menjual tempahan dan satu lagi menjual mesin orang lain yang kebetulan terbiar.

## Kadar yang dicetak, ditukar

Runpod menetapkan satu harga tetap bagi setiap model. Vast menyiarkan harga lantai dan median, kerana setiap senarai ialah hos berbeza dengan rekod kebolehpercayaan berbeza. Kedua-duanya dipetik dalam dolar seperti dicetak, kemudian dalam ringgit pada kadar 24 November 2026.

| Kad | Runpod, seperti dicetak | Dalam ringgit | Vast dari | Dalam ringgit | Median Vast |
| --- | --- | --- | --- | --- | --- |
| H100 SXM, 80 GB | USD 4.39/jam | RM18.07 | USD 1.73/jam | RM7.12 | USD 2.40/jam |
| H100 PCIe, 80 GB | USD 2.89/jam | RM11.89 | USD 2.31/jam | RM9.51 | USD 2.53/jam |
| H100 NVL, 94 GB | USD 3.19/jam | RM13.13 | USD 2.57/jam | RM10.58 | — |
| B200, 180 GB | USD 7.99/jam | RM32.88 | — | — | — |
| RTX A5000, 24 GB | USD 0.27/jam | RM1.11 | — | — | — |

Baris H100 PCIe yang paling menarik: jurang mengecil daripada 2.5 kali kepada 1.25 kali sebaik sahaja anda membandingkan varian yang sama dan bukan kad perdana. Firma yang meletakkan harga projek berdasarkan kad terpantas di satu platform dan kad termurah di platform lain sedang membandingkan dua produk berbeza.

## Bil mengikut saat ialah tempat wang sebenarnya bergerak

Runpod membil mengikut saat di awan selamatnya, dan Vast membil mengikut saat tanpa minimum jam. Itu lebih penting daripada kadar utama bagi kerja yang siap awal, kerana latihan yang berakhir selepas 18 minit tidak sepatutnya berharga satu jam.

Larian 18 minit pada H100 PCIe dengan RM11.89 sejam berjumlah RM3.57. Larian yang sama dibeli dalam jam penuh berharga RM11.89, dan perbezaan itu merentasi dua puluh eksperimen ialah RM166 berbanding RM714.

## Sewa sebulan berterusan, dalam ringgit

Tiada sesiapa menjalankan H100 tanpa henti untuk melayani perniagaan kecil, tetapi angka bulanan itulah yang menamatkan perdebatan tentang membeli kad. Pada 720 jam:

| Konfigurasi | Sebulan, dalam ringgit |
| --- | --- |
| Vast H100 SXM pada lantai | RM5,126 |
| Vast H100 SXM pada median | RM7,114 |
| Runpod H100 PCIe | RM8,561 |
| Runpod H100 SXM | RM13,010 |
| Runpod B200 | RM23,674 |

Satu kad H100 yang dibeli terus berharga lebih daripada setahun sewa termurah di atas, sebelum bil elektrik, penyejukan, dan fakta bahawa ia ketinggalan zaman sebaik generasi seterusnya keluar. Aritmetik itu seluruh hujah untuk menyewa, dan ia kekal pada setiap baris dalam jadual.

## Apa yang kos senarai murah

Harga lantai di pasaran ialah mesin di pusat data seseorang, dan senarai itu memberitahu anda siapa. Semak tiga perkara sebelum menjalankan apa-apa yang ada tarikh akhir:

1. **Boleh diganggu atau tidak.** Kadar terendah biasanya preemptible, bermakna kerja berhenti apabila hos memerlukan kad itu kembali.
2. **Kelajuan rangkaian.** Kad murah di sebalik pautan perlahan ialah alat yang salah bagi apa-apa yang memindahkan set data.
3. **Pengesahan dan skor kebolehpercayaan.** Hos dengan rekod pendek lebih murah atas sebab tertentu, dan larian 6 jam yang tergendala berharga lebih daripada perbezaan kadar itu.

Harga tetap Runpod membeli kad yang diketahui dan wilayah yang diketahui. Harga lantai Vast membeli kapasiti yang orang lain tidak mahu pada jam itu. Kedua-duanya pembelian yang sah; ia bukan pembelian yang sama.

## Apa yang perlu dibuat sebelum menyewa

1. Letakkan harga varian kad yang sama di kedua-dua platform, bukan kad perdana di satu dan kad bajet di satu lagi.
2. Tukar pada kadar yang boleh dipetik, dan tulis tarikh di sebelahnya, kerana angka ringgit tanpa tarikh ialah khabar angin.
3. Anggarkan larian dalam minit, bukan jam, dan semak sama ada bil mengikut saat.
4. Bagi apa-apa yang ada tarikh akhir, keluarkan kadar preemptible daripada perbandingan sepenuhnya.

Angka ringgit yang penting bagi perniagaan Malaysia bukan kadar sejam, tetapi kos eksperimen yang gagal. Pada RM7 sejam anda mampu tersilap empat kali pada hari Sabtu, dan itu lebih bernilai daripada jaminan mendapat kad terpantas.

---

**Read next**

[Apa yang ejen AI boleh buat untuk perniagaan kecil](https://upahje.my/ms/articles/apa-yang-agent-boleh-buat)

[Lebih banyak panduan pembelian, dengan harga dalam ringgit](https://upahje.my/ms/glossary)
