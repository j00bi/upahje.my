---
title: "Pelanggan simulasi anda kata ya. Yang sebenar pergi."
description: "Dua kajian 2026 tentang pembeli sintetik: bakul seakurat sejarah isi rumah sendiri, dan simulator yang tidak pernah beredar meninggalkan anda."
slug: pelanggan-simulasi-kata-ya
translationKey: simulated-customer-says-yes
format: research
reader: owner
date: 2026-11-26
updated: 2026-11-26
author: "UpahJe Desk"
category: definitions
audience: publication
tags: [ai, research, market-research, malaysia]
cardFigure: "Rintangan 25.1% sebenar, 13.5% simulasi"
changelog:
  - date: 2026-11-26
    note: "Mula diterbitkan."
canonical: https://upahje.my/ms/articles/pelanggan-simulasi-kata-ya
sources:
  - title: "Seeing Like a Shopper: Validating Vision-Language Models as Synthetic Consumers, arXiv 2611.09977"
    url: "https://arxiv.org/abs/2611.09977"
    checked: 2026-11-26
  - title: "Simulated Customers Never Walk Away: Decision Fidelity of LLM User Simulators Measured Against Real Purchase Outcomes, arXiv 2606.20708"
    url: "https://arxiv.org/abs/2606.20708"
    checked: 2026-11-26
  - title: "Twin-2K-500: A dataset for building digital twins of over 2,000 people, arXiv 2505.17479"
    url: "https://arxiv.org/abs/2505.17479"
    checked: 2026-11-26
  - title: "Out of One, Many: Using Language Models to Simulate Human Samples, Argyle et al., Political Analysis"
    url: "https://arxiv.org/abs/2209.06899"
    checked: 2026-11-26
---

# Pelanggan simulasi anda kata ya. Yang sebenar pergi.

Dua kajian yang diterbitkan tahun ini menguji sama ada model bahasa boleh menggantikan pelanggan. Kedua-duanya menggunakan data sebenar. Kedua-duanya sampai pada kesimpulan bertentangan, dan perbezaan antara keduanya ialah inti artikel ini: simulasi itu tepat tentang purata bakul dan tidak jujur tentang orang yang berjalan keluar.

Jika anda sedang dijual "penyelidikan pasaran AI", atau sedang memikirkan untuk mengujinya pada satu harga, satu susunan rak, satu tawaran jenama atau satu skrip jualan, perpecahan itu lebih penting daripada mana-mana satu angka ketepatan.

## Satu: simulasi yang menyamai sejarah isi rumah sendiri

Kajian pertama membina pembeli daripada rekod pembelian isi rumah, memberi mereka direktori kedai dan gambar rak, kemudian meminta mereka merancang lawatan dan memilih produk. Selepas itu bakul mereka dibandingkan dengan enam set data awam dari tiga negara.

Hasil utamanya lebih sempit daripada "model ini pandai membeli-belah": **bakul sintetik meramal pembelian yang tidak dilihat sama baiknya dengan lawatan lampau isi rumah itu sendiri**. Model yang hanya membaca teks tidak mempunyai akses kepada kedai, rak atau label; tambah penglihatan, dan ia menghampiri peramal terbaik yang ada bagi apa yang isi rumah akan beli seterusnya, iaitu sejarah isi rumah itu.

Tiga penemuan lain daripada kertas itu:

- **Perbezaan antara kumpulan** yang dihasilkan pembeli sintetik berkorelasi dengan yang sebenar **dua kali lebih kuat** daripada regresi terlatih.
- **Tanpa penyesuaian apa pun**, simulator menghasilkan semula **pembelian arak mengikut jantina dan umur di Rusia**, dan **saiz lawatan mengikut jarak kedai di Taiwan**.
- Pada peringkat **pilihan satu rak**, model mengelirukan produk dengan **kedudukannya di rak dan label hurufnya**, sebab itu penulis membina set data rak yang mengubah produk, kedudukan, label, sudut pandangan dan harga secara berasingan.

Perkara terakhir itu amaran berguna bagi sesiapa yang mereka pembungkusan atau susunan rak: jawapan model tentang produk anda mungkin sebenarnya jawapan tentang tempat anda meletakkannya.

## Dua: simulasi yang tidak boleh berjalan keluar

Kajian kedua lebih sukar dijual dan lebih berguna. Ia mengabaikan tinjauan dan menggunakan **2,790 perbualan jualan sebenar**, **793 daripadanya dengan hasil bayaran yang disahkan**, wang sebenar, ya dan tidak sebenar.

Mereka mengukur sama ada simulator, yang memainkan watak pelanggan, menghasilkan semula *dinamik keputusan* orang sebenar. Bagi pembeli, ya. Bagi yang tidak membeli, tidak:

| Ukuran | Bukan pembeli sebenar | Bukan pembeli simulasi |
| --- | --- | --- |
| Tarikan ke arah rangka pembelian | rujukan | **+0.40** (d = 0.38, p < 0.001) |
| Menyatakan rintangan | 25.1% | **13.5%** |
| Terus berbincang sebagai ganti | 21.9% | **40.1%** |

Pembeli dihasilkan hampir tepat (bias +0.09). Bukan pembeli ditarik ke arah membeli, rintangan yang dinyatakan lebih kurang separuh, dan keraguan mereka bertukar menjadi lebih banyak soalan tentang harga dan bukan jalan keluar. Tiada pelanggan simulasi yang mengarang pembelian, kegagalannya lebih halus daripada berdusta. Mereka **tidak beredar**.

Penulis menamakannya **defisit pelepasan**, kemudian melakukan perkara yang menjadikan kertas itu boleh dipercayai: mereka cuba membaikinya. Memberitahu simulator secara jelas bahawa ia boleh berundur memotong bias marginal lima kali ganda, tetapi hampir tidak menggerakkan kontras bersyarat hasil (d = 0.34, p = 0.008). Bias itu bukan pada arahan yang anda beri; ia pada situasi yang anda bina. Ia juga berulang merentas keluarga model (DeepSeek: d = 0.41, p = 0.002).

Ayat penutup mereka yang patut diingat: **bukan pembeli sebenar berkata "bukan sekarang" lalu berhenti; bukan pembeli simulasi bertanya tentang harga.**

## Sejauh mana tepatnya tepat

Angka yang selalu dipetik datang daripada projek ketiga, Twin-2K-500: kembar digital untuk **2,058 peserta Amerika**, menjawab soalan tinjauan yang sama seperti rakan sebenar mereka. Merentas **17 tugasan, ramalan kembar itu 71.72% tepat**, dan kertas itu berhati-hati membandingkannya dengan berapa banyak jawapan seseorang berubah apabila ditanya dua kali.

Perbandingan itulah rangka jujur bagi semua ini. Angka ketepatan tidak bermakna sehingga anda tahu **siling ujian-ulang**, berapa banyak manusia sebenar berbeza dengan dirinya sendiri. Simulator yang menyamai seseorang 72% kali kedengaran mengagumkan; jika orang itu hanya menyamai dirinya 75% kali, simulator hampir di siling. Jika silingnya 95%, jurangnya besar.

Kerja awal dalam barisan ini, mengondisikan model pada latar belakang tinjauan seseorang sebenar untuk menghasilkan semula jawapannya, menemui bentuk yang sama: **taburan agregat dihasilkan baik, individu kurang**. Dua tahun hasil kini menunjuk arah yang sama.

## Di mana ia benar-benar boleh digunakan

Perpecahan di atas memberi satu peraturan bersih. **Gunakan simulasi apabila soalannya tentang populasi dan jawapannya satu taburan. Jangan percaya ia apabila soalannya tentang keputusan dan jawapannya satu kadar.**

| Guna | Apa yang disimulasikan | Kekuatan bukti |
| --- | --- | --- |
| **Ujian rak dan pembungkusan** | Produk anda berbanding pesaing pada rak yang dirender, dengan hadapan, kedudukan dan harga berbeza | Kuat, inilah yang kajian pertama sahkan, dengan amaran kekeliruan kedudukan/label |
| **Persepsi harga** | Sama ada harga dibaca murah atau premium di sebelah alternatif bernama | Sederhana, tindak balas paparan dan harga berada dalam julat yang diukur, bukan tepat |
| **Imej jenama** | Penerangan tentang bagaimana jenama dilihat, sebelum dan selepas perubahan logo, warna atau teks | Sederhana, kesetiaan tinjauan agregat ialah dakwaan paling kukuh dalam barisan kerja ini |
| **Tawaran jenama** | Bagaimana pengumuman kerjasama atau penajaan dibaca oleh satu segmen; bantahan mana muncul dahulu | Lemah tetapi berguna, menghasilkan senarai bantahan, tidak mengukur penerimaan |
| **Skrip jualan** | Bantahan mana yang dicetuskan skrip, dan frasa mana mengurangkan geseran | Lemah pada kadar, berguna pada kepelbagaian, simulator akan melebihkan kemajuan |
| **Anggaran penukaran** | "Berapa daripada 100 akan beli" | **Jangan.** Inilah kuantiti yang tepat yang dirusakkan oleh defisit pelepasan |

### Menjalankan simulasi tawaran jenama dengan jujur

1. Tulis tawaran itu seperti pelanggan akan menemuinya (satu pos, satu shelf talker, satu baris akhbar) bukan seperti dek menerangkannya.
2. Beri setiap responden simulasi **latar belakang daripada pelanggan anda sendiri**, bukan stereotaip demografi. Hasil paling kukuh dalam literatur ini datang daripada pengondisian pada rekod sebenar.
3. Tanya soalan terbuka dan kira **bantahan**, bukan persetujuan.
4. Jalankan prompt yang sama pada **dua keluarga model**. Jika senarai bantahan tidak bertahan, ia artifak prompt.
5. Bawa tiga bantahan teratas kepada **sepuluh pelanggan sebenar** sebelum memutuskan apa-apa.

Langkah lima itulah keseluruhan kaedahnya. Simulasi ialah penjana hipotesis dengan kadar tepat yang baik pada taburan; sepuluh perbualan itu ukurannya.

### Khusus untuk imej jenama

Simulasi paling baik apabila anda mempunyai **korpus perkara sebenar yang orang katakan** dan anda mahu tahu bagaimana satu perubahan akan mendarat. Suap ulasan anda, DM anda, e-mel aduan anda, kemudian tanya apa yang populasi sama akan katakan tentang logo baharu, harga baharu, pembungkusan baharu. Apa yang anda dapat ialah taburan tindak balas yang munasabah, bukan ukuran tindak balas itu.

Apa yang ia tidak boleh beritahu ialah sama ada jenama akan *diperkatakan*, kerana itu bergantung pada jangkauan, kebaharuan dan masa, yang tiada satu pun hidup dalam model.

## Amaran Malaysia

Tiada satu pun kajian ini menggunakan pembeli Malaysia, dan tiada satu pun menggunakan Bahasa Melayu. Mekanismenya umum; angkanya tidak. Anggap setiap angka dalam artikel ini sebagai bukti tentang kaedah, bukan parameter untuk kedai anda.

Dua risiko khusus di sini: konvensyen rak berbeza (kedudukan atas rak bukan universal), dan Bahasa Melayu model datang daripada campuran teks yang berbeza daripada Bahasa Melayu pelanggan anda. Simulasi dalam Bahasa Melayu patut dianggap alat yang lebih kasar daripada simulasi yang sama dalam bahasa Inggeris, dan kertas-kertas itu tidak memberi angka berapa kasar.

## Peraturannya, dalam satu baris

Simulasikan **populasi**, ukur **keputusan**. Pelanggan sintetik cara yang baik untuk mengetahui apa yang orang mungkin katakan dan cara yang buruk untuk mengetahui berapa ramai yang akan membayar, dan kertas di atas ialah resit bagi kedua-dua separuh ayat itu.

---

**Bacaan lanjut**

[Dua belas kerja GPU sewaan siap, tiga ia tidak mampu](https://upahje.my/ms/articles/kerja-gpu-sewaan-malaysia)

[Apa yang ejen AI boleh dan tidak boleh buat untuk perniagaan kecil](https://upahje.my/ms/articles/apa-yang-agent-boleh-buat)
