---
title: "USD 0.04 untuk masa GPU, dan set data itulah kerja sebenar"
description: "RTX 5060 Ti sewaan melatih penapis dagangan dalam lima saat dengan kos empat sen. Set data ambil masa lebih lama, dan itulah pelajarannya."
slug: gpu-sewaan-set-data-kerja-sebenar
translationKey: rented-gpu-what-it-finishes
format: field-test
reader: owner
date: 2026-11-26
updated: 2026-11-26
author: "UpahJe Desk"
category: buying-guides
audience: publication
tags: [buying-guides, gpu, compute, ai, malaysia]
cardFigure: "Empat sen, dua belas minit, satu eksperimen"
changelog:
  - date: 2026-11-26
    note: "Mula diterbitkan."
canonical: https://upahje.my/ms/articles/gpu-sewaan-set-data-kerja-sebenar
sources:
  - title: "Harga GPU langsung Vast.ai, dibaca dari halaman harga"
    url: "https://vast.ai/pricing"
    checked: 2026-11-26
  - title: "QLoRA: Efficient Finetuning of Quantized LLMs, Dettmers et al., arXiv 2305.14314"
    url: "https://arxiv.org/abs/2305.14314"
    checked: 2026-11-26
  - title: "Spesifikasi GeForce RTX 5060 Ti 16 GB, pangkalan data GPU TechPowerUp"
    url: "https://www.techpowerup.com/gpu-specs/geforce-rtx-5060-ti-16-gb.c4292"
    checked: 2026-11-26
---

# USD 0.04 untuk masa GPU, dan set data itulah kerja sebenar

Bil untuk keseluruhan larian ialah empat sen. Dua belas minit pada RTX 5060 Ti sewaan dengan kadar USD 0.1981 sejam, dan dalam dua belas minit itu model dilatih selama lima saat manakala set data mengambil masa empat belas saat untuk dibina. Selebihnya ialah mesin yang disewa sementara seseorang membaca log.

Nisbah itulah inti artikel ini. Hampir semua tulisan tentang menyewa GPU berkisar pada kadar sejam, sedangkan kadar sejam ialah nombor paling tidak penting dalam keputusan. Yang menentukan ialah berapa minit masa berbiling untuk menyiapkan satu kerja, dan bagi kebanyakan kerja kecil nombor itu memalukan pada arah yang lain: pengiraan cukup murah sehingga bahagian yang mahal ialah bersedia untuk menggunakannya.

## Kadar sejam bukan unit yang betul

Kad yang sama, harga di Vast.ai hari ini: RTX 5060 Ti dengan 16 GB VRAM bermula USD 0.09 sejam, median USD 0.13. Instance dalam artikel ini disewa pada Jun 2026 dengan kadar USD 0.1981 sejam, jadi harga platform sudah lebih kurang separuh dalam lima bulan.

| Kad | VRAM | Harga mula | Median | Sumber, dibaca |
| --- | --- | --- | --- | --- |
| RTX 5060 Ti | 16 GB | USD 0.09/j | USD 0.13/j | Harga Vast.ai, 26 Nov 2026 |
| RTX 4090 | 24 GB | USD 0.07/j | USD 0.47/j | sama |
| RTX 5090 | 32 GB | USD 0.39/j | USD 0.67/j | sama |
| H100 SXM | 80 GB | USD 1.73/j | USD 1.73/j | sama |

Dua perkara dalam jadual itu patut dibaca dua kali. Harga mula dan median boleh jauh berbeza, kerana marketplace ialah himpunan hos individu dengan harga dan kebolehpercayaan masing-masing. Dan H100, kad yang semua orang fikirkan, berharga sembilan belas kali ganda harga mula kad yang menyiapkan kerja ini.

Kerja dua belas minit pada harga mula hari ini kurang daripada dua sen. Kerja dua belas minit pada H100 tiga puluh lima sen. Kedua-duanya bukan perbelanjaan perniagaan; kedua-duanya lebih kecil daripada kopi yang diminum sambil menunggu.

## Kerja satu: latih sesuatu yang cukup kecil untuk siap

Kerjanya ialah penapis, bukan model yang berdagang. Sembilan strategi sudah menghasilkan 1,607 penyertaan dagangan bersejarah merentas pasangan mata wang, dan soalannya sama ada model boleh membezakan penyertaan menang daripada yang kalah menggunakan hanya apa yang diketahui ketika masuk: kekuatan isyarat, turun naik, pulangan terkini, hari dalam minggu, bulan, serta instrumen dan strategi yang mencetuskan.

Enam belas ciri setiap dagangan. Identiti sebagai embedding, supaya model belajar tingkah laku simbol dan strategi dan bukan diberitahu. Rangkaian dua lapis, lebar 64, tanpa attention, tanpa prapelatihan, tanpa berbilion parameter.

Dilatih pada kad itu dalam lima saat. Disahkan silang lima kali, AUC luar sampel 0.6021 — setiap lipatan 0.53, 0.66, 0.63, 0.60, 0.53. Bukan model yang baik secara mutlak. Cukup baik untuk bertindak sebagai penapis, dan itulah yang diminta:

| Ambang penapis | Dagangan dikekalkan | Kadar menang | Pulangan purata | Sharpe setiap dagangan | Tahunan |
| --- | --- | --- | --- | --- | --- |
| tiada | 1,607 | 44.8% | +1.29% | 0.167 | +2.64 |
| 0.40 | 1,081 | 50.4% | +2.12% | 0.271 | +3.51 |
| 0.55 | 310 | 54.5% | +3.91% | 0.362 | +2.52 |
| 0.60 | 137 | 55.5% | +4.46% | 0.369 | +1.70 |

Pada 0.40 penapis membuang satu pertiga dagangan dan angka tahunan naik daripada 2.64 ke 3.51. Pada 0.60 angka setiap dagangan nampak terbaik sementara angka tahunan runtuh, kerana tiada lagi yang boleh didagangkan. Bentuk itulah hujah menentang mengejar ketepatan: penapis yang lebih kerap betul masih boleh menjana wang lebih sedikit.

Dan model pertama yang dicuba ialah transformer, yang terus overfit pada 1,607 baris. Seni bina dipilih mengikut saiz set data, bukan mengikut apa yang sedang popular. Lima saat pengiraan bukan kekangan di sini — 1,607 contoh itulah kekangan.

## Kerja dua: sapu, dan tahu bila berhenti

Kerja kedua yang menelan wang: mencuba konfigurasi. Skrip sapuan merangkumi **324** kombinasi — lebar model, kedalaman, panjang jujukan, horizon ramalan, seed — merentas sepuluh lipatan kronologi, sehingga 200 epoch setiap satu, batch efektif 512 melalui 256 dengan pengumpulan gradien, dan ketepatan bercampur supaya muat pada kad kecil.

Dua puluh dua selesai. Instance dimusnahkan dengan sengaja untuk berhenti membayar storan, dan keputusan itu bahagian yang patut ditiru. Hasilnya bukan sifar:

| Tetapan | Nilai |
| --- | --- |
| Lebar dan kedalaman terbaik | d_model 32, 2 lapis |
| Panjang jujukan terbaik | 12 bar |
| Horizon ramalan terbaik | 12 bar |
| Ketepatan pengesahan | 0.7432 |
| Ketepatan ujian | 0.7495 |
| AUC ujian | 0.8212 |

Tiga penemuan keluar daripada 22 larian, bukan 324. Model kecil menang: `d_model` melebihi 64 menambah risiko overfit, bukan isyarat. Horizon dua belas jam mengalahkan dua puluh empat dan empat puluh lapan, kerana semakin jauh ramalan semakin banyak bunyi yang dipaksa dihafal. Dan hasilnya stabil merentas seed — konfigurasi sama dengan seed 42, 123 dan 7777 memberi AUC antara 0.814 dan 0.821, dan itulah yang memberitahu bahawa angka itu sifat data, bukan satu permulaan yang bertuah.

Infrastruktur yang membolehkan berhenti dengan selamat tidak glamor tetapi perlu disebut. Skrip pemandu menyediakan persekitaran, menarik kod, merekod `nvidia-smi` setiap enam puluh saat, menulis hasil selepas setiap konfigurasi selesai supaya ranap bermula semula dari titik terakhir dan bukan dari awal, dan menutup instance sendiri di hujungnya. Sapuan penuh dianggarkan dua hari; semakan tiga konfigurasi kira-kira dua jam. Perintah berhenti itulah yang menukar pelan dua hari menjadi keputusan dua jam.

## Kerja tiga: fine-tune atas teks sendiri

Kerja ketiga ialah kerja yang perniagaan kecil benar-benar ada. Bukan melatih dari kosong — mengajar model kecil perkataan sendiri. Model 1.5 bilion parameter dikuantisasi empat bit, di-fine-tune dengan QLoRA atas anotasi dagangan, menghasilkan fail adapter 73 MB. Itulah keseluruhan hasilnya: bukan model, tetapi delta 73 MB yang duduk di atas model asas yang tidak perlu dilatih sendiri.

Ekonominya sebabnya kerja ini kini biasa. Mengkuantisasi model asas kepada empat bit, iaitu apa yang QLoRA lakukan, membolehkan model 1.5B muat bersama gradiennya pada kad pengguna. Kaedahnya diterbitkan dan alatnya percuma.

Bagi PKS Malaysia, kerja yang setara ialah pengelas atau penulis atas bahan sendiri: balasan WhatsApp, penerangan produk, item baris e-Invoice, e-mel pembekal. Data statik, jumlah kecil, satu kad, satu petang.

## Kerja empat: hosting, di sinilah ia pecah

Tiga kerja pertama ialah kerja berkelompok: hidupkan mesin, jalankan, hentikan, bayar ikut minit. Hosting ialah sebaliknya, dan di sinilah GPU sewaan ialah alat yang salah.

- **Gangguan.** Instance marketplace boleh ditarik balik. Instance yang murah ialah pertaruhan untuk kekal hidup.
- **Storan.** Data yang duduk atas cakera sewaan dibil setiap jam sama ada ada pengiraan atau tidak. Itulah sebab tepat sapuan di atas berhenti pada 22 konfigurasi.
- **Keadaan.** Pembantu yang dihoskan perlukan model sentiasa dimuatkan, bermakna kad terbiar sepanjang hari pada kadar sejam.
- **Kedudukan data.** Tiada apa dalam aturan ini memberitahu anda mesin itu di negara mana, dan bagi data pelanggan itu bukan nota kaki.

Jika keperluannya model yang menjawab pada pukul tiga pagi, API yang dibil per juta token hampir selalu lebih murah daripada kad yang dibil per jam. Menyewa GPU menang apabila kerja sudah siap dan instance sudah dimatikan.

## Bil

| Larian | Masa berbiling | Kos |
| --- | --- | --- |
| Penapis dagangan, 1,607 baris, 5 lipatan | ~12 minit pada USD 0.1981/j | USD 0.04 |
| Sapuan, 22 daripada 324 konfigurasi | jam instance, tambah storan | tidak diperincikan di sini |
| Adapter LoRA, 73 MB | satu sesi | tidak diperincikan di sini |

Empat sen ialah kira-kira enam belas sen pada kadar yang kami terbitkan, 4.1155 ringgit bagi satu dolar pada 24 November 2026. Ia bukan kos melatih model dagangan. Ia kos satu eksperimen terhadap set data yang sudah wujud, pada kad yang disewa ikut minit, dan versi jujur bagi dakwaan itu ialah versi yang sempit.

## Apa yang patut dibuat dahulu

1. Pilih kerja yang siap dalam minit, bukan jam. Pengelasan, pengekstrakan, regresi kecil, fine-tune atas seribu baris.
2. Bina set data sebelum menyewa apa-apa. Dalam larian kami ia mengambil masa tiga kali lebih lama daripada latihan.
3. Hadkan bajet, bukan cita-cita: kad sejam ditambah perintah musnah sendiri ialah komitmen yang lebih kecil daripada langganan.
4. Tulis hasil ke cakera selepas setiap unit kerja, supaya instance yang terputus hanya merugikan unit terakhir dan bukan semuanya.
5. Simpan set data. Itulah satu-satunya aset di sini yang tidak dibil ikut jam.

---

**Bacaan lanjut**

[H100 yang sama disewa RM11.89 sejam, atau RM7.12](https://upahje.my/ms/articles/kos-sewa-gpu-malaysia)

[Colab akan melatih model anda. Ia tidak akan menghosnya](https://upahje.my/ms/articles/colab-hosting-ai-malaysia)
