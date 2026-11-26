---
title: "Dua belas kerja GPU sewaan siap, tiga ia tidak mampu"
description: "Fine-tune, transkripsi, pengekstrakan invois, foto produk, embedding, eval. Berapa VRAM setiap satu, berapa lama, dan berapa kosnya pada kadar hari ini."
slug: kerja-gpu-sewaan-malaysia
translationKey: rented-gpu-jobs-malaysia
format: explainer
reader: owner
date: 2026-11-26
updated: 2026-11-26
author: "UpahJe Desk"
category: buying-guides
audience: publication
tags: [buying-guides, gpu, compute, ai, malaysia]
cardFigure: "RM0.55 sejam, kalau anda tutup mesin"
changelog:
  - date: 2026-11-26
    note: "Mula diterbitkan."
canonical: https://upahje.my/ms/articles/kerja-gpu-sewaan-malaysia
sources:
  - title: "Harga GPU langsung Vast.ai, dibaca dari halaman harga"
    url: "https://vast.ai/pricing"
    checked: 2026-11-26
  - title: "QLoRA: Efficient Finetuning of Quantized LLMs, Dettmers et al., arXiv 2305.14314"
    url: "https://arxiv.org/abs/2305.14314"
    checked: 2026-11-26
  - title: "Robust Speech Recognition via Large-Scale Weak Supervision (Whisper), arXiv 2212.04356"
    url: "https://arxiv.org/abs/2212.04356"
    checked: 2026-11-26
---

# Dua belas kerja GPU sewaan siap, tiga ia tidak mampu

GPU sewaan ialah alat dengan satu bentuk: ia sangat baik untuk kerja yang bermula, siap, dan berhenti. Semua dalam artikel ini disusun mengikut bentuk itu. Jika kerja ada permulaan dan pengakhiran, menyewa kad untuknya kini cukup murah sehingga tidak perlu difikirkan panjang. Jika kerja perlu berjaga pada pukul tiga pagi, sewa biasanya jawapan yang salah dan API biasanya jawapan yang betul.

Kadar yang dibaca dari Vast.ai hari ini: RTX 5060 Ti dengan 16 GB VRAM bermula USD 0.09 sejam, median USD 0.13, iaitu sekitar 55 sen sejam pada kadar yang kami terbitkan. H100 SXM ialah USD 1.73, kira-kira RM7.12. Setiap kos di sini ialah kadar itu didarab dengan masa anda — satu formula, bukan sebut harga, kerana set data anda bukan set data kami.

## Tangga VRAM, yang menentukan apa yang boleh dicuba

VRAM, bukan harga, yang menyingkirkan sesuatu kerja. Bagi model empat bit, hukum kasarnya lebih kurang 0.6 GB setiap bilion parameter, ditambah ruang untuk konteks yang disuap masuk.

| VRAM | Apa yang terbuka | Kad contoh | Kadar mula |
| --- | --- | --- | --- |
| 8 GB | Pengelas kecil, OCR, transkripsi, embedding set dokumen | RTX 5060 | USD 0.09/j |
| 16 GB | Model 7B pada 4-bit, fine-tune LoRA model kecil, penjanaan imej | RTX 5060 Ti | USD 0.09/j |
| 24 GB | 13B pada 4-bit, fine-tune lebih besar, kerja video | RTX 4090 / 3090 | USD 0.07–0.09/j |
| 48 GB | 34B pada 4-bit, larian latihan tanpa berbilang GPU | kelas RTX 6000 | ikut hos |
| 80 GB | 70B pada 4-bit, fine-tune penuh model kecil | H100 | USD 1.73/j |

Lompatan dari 16 GB ke 80 GB berharga sembilan belas kali ganda sejam. Hampir tiada keperluan PKS Malaysia yang terletak di seberang lompatan itu.

## Dua belas kerja itu

Setiap baris ialah kerja yang kami akan sewa kad untuknya. Masa ialah julat realistik, bukan penanda aras, dan lajur kos menggunakan kadar median 16 GB pada julat itu.

| # | Kerja | Masa | Kos pada USD 0.13/j |
| --- | --- | --- | --- |
| 1 | Latih pengelas atau regresor kecil atas baris sendiri | minit | bawah USD 0.05 |
| 2 | Fine-tune model bahasa kecil atas teks sendiri (LoRA) | 1–4 jam | USD 0.13–0.52 |
| 3 | Bina embedding set dokumen untuk carian atau jawapan | 10–60 min | USD 0.02–0.13 |
| 4 | Transkripsi setahun rakaman panggilan atau nota suara | 1–6 jam | USD 0.13–0.78 |
| 5 | Ekstrak medan daripada invois, resit, pesanan penghantaran | 30–120 min | USD 0.07–0.26 |
| 6 | Jana atau bersihkan foto produk pada skala katalog | 1–3 jam | USD 0.13–0.39 |
| 7 | Sari kata dan kapsyen video, termasuk Bahasa Melayu | 2–8 jam | USD 0.26–1.04 |
| 8 | Nyahganda dan normalkan jadual pelanggan atau produk | 10–40 min | USD 0.02–0.09 |
| 9 | Data sintetik untuk uji peraturan atau pembantu sebelum lancar | 1–2 jam | USD 0.13–0.26 |
| 10 | Nilai dua model terhadap contoh sendiri | 30–90 min | USD 0.07–0.20 |
| 11 | Render animasi Blender atau CAD merentas banyak bingkai | 2–12 jam | USD 0.26–1.56 |
| 12 | Proses kelompok imej: saiz semula, buang latar, tanda air | 20–60 min | USD 0.04–0.13 |

Baca lajur kanan dua kali. Dua belas kerja, dan yang paling mahal dalam jadual pun bawah dua ringgit. Sebab untuk berfikir tentang perkara ini bukan wangnya — tetapi kad yang terlupa dimatikan dibil 24 jam sehari, dan kad yang dibiarkan hidup sebulan berharga USD 94, lebih daripada setahun API yang anda cuba elakkan.

### 1. Latih sesuatu yang kecil

Kerja paling murah dalam senarai dan yang paling kerap dikomplikasikan. Jika data anda muat dalam hamparan, modelnya minit, bukan jam. Kami melatih penapis 1,607 baris dalam **lima saat** dengan kos empat sen.

Patut disewa apabila: set data itu milik anda, soalannya sempit, dan jawapannya perlu boleh diulang tahun depan.

### 2. Fine-tune model bahasa kecil

Kuantisasi empat bit yang menjadikan ini biasa: model 7B perlukan sekitar 5 GB pada empat bit, jadi kad 16 GB boleh fine-tune model kecil dengan ruang untuk keadaan pengoptimum. Hasilnya adapter bersaiz puluhan megabait — milik kami 73 MB.

Kegunaannya: model yang menulis dengan nada anda, mengelaskan kategori anda, atau menjawab daripada dokumen anda. Bukan kegunaannya: mengajar fakta yang model tidak pernah lihat. Fine-tune mengubah cara model bercakap dan apa yang dipilihnya; ia tidak memasang senarai harga dengan boleh dipercayai.

### 3. Embedding untuk carian

Halakan kad pada folder PDF, kontrak, helaian produk atau sebut harga lama dan hasilkan vektor yang boleh dicari. Ini kerja AI berguna paling murah yang ada, dan ia selesai dalam minit pada kad 16 GB. Hasilnya kecil, kekal, dan milik anda.

### 4. Transkripsi

Model kelas Whisper mentranskripsi dengan boleh dipercayai dan mengendalikan Bahasa Melayu lebih baik daripada tahap percuma kebanyakan produk, dan kerjanya selari secara memalukan: pecahkan audio, jalankan kepingan, cantumkan transkrip. Setahun rakaman ialah satu petang.

Ini kerja yang kami akan syorkan dahulu kepada hampir setiap PKS, kerana inputnya sudah ada — rakaman panggilan, nota suara, audio mesyuarat — dan outputnya teks boleh cari yang boleh digunakan.

### 5. Pengekstrakan invois dan dokumen

Perniagaan Malaysia kini menjana data e-Invoice berstruktur, tetapi bahagian masuk masih PDF, gambar pesanan penghantaran, dan invois pembekal dalam tiga bahasa. Mengekstrak medan secara pukal ialah kerja kelompok, tidak perlukan model besar, dan ia membayar balik pada bulan pertama anda berhenti menaip.

### 6 dan 12. Imej

Fotografi produk pada skala katalog, dan pemprosesan pukal — saiz semula, buang latar, tanda air. Kedua-duanya kelompok, kedua-duanya muat pada kad 16 GB, dan kedua-duanya lebih murah disewa ikut jam daripada dilanggan ikut bulan jika kerjanya berkala dan bukan berterusan.

### 7. Video

Kapsyen dan sari kata, termasuk Bahasa Melayu, ialah kerja video paling bernilai kerana ia menjadikan video boleh dicari dan boleh diakses. Ia juga lambat — jam, bukan minit — jadi kadar sejam lebih penting di sini daripada mana-mana baris lain dalam jadual.

### 8 hingga 10. Yang tidak glamor tetapi membayar

Nyahganda jadual pelanggan, jana contoh sintetik untuk menguji pembantu, dan nilai dua model terhadap kes sendiri. Tiada satu pun menghasilkan sesuatu yang pelanggan lihat, dan ketiga-tiganya sebab pelancaran tidak memalukan anda. Ia juga kerja yang paling kerap dilangkau, kerana terasa seperti overhed sehingga jawapan salah pertama sampai kepada pelanggan.

### 11. Render

Kerja Blender dan CAD ialah penyewaan GPU klasik: bingkai berdiri sendiri, kerja terbatas, dan kad yang disewa enam jam mengalahkan stesen kerja yang dibeli enam ribu ringgit jika anda render dua kali setahun.

## Tiga yang ia tidak mampu

1. **Berjaga sepanjang masa.** Instance marketplace boleh ditarik balik. Apa-apa yang mesti menjawab pada pukul tiga pagi perlukan hos yang berjanji hadir, dan itu produk lain dengan bil lain.
2. **Dipercayai soal kedudukan data.** Tiada apa di marketplace memberitahu anda mesin itu di negara mana. Bagi data pelanggan di bawah jangkaan Malaysia, itu keputusan, bukan perincian.
3. **Menggantikan API bagi volum kecil.** Satu imej sehari, seratus mesej chat seminggu, satu transkripsi sebulan: API lebih murah, kerana anda membayar kad yang terbiar antara kerja.

## Cara mengira kos kerja sendiri

Ambil kadar sejam, darab dengan jam yang anda jangka, kemudian darab tiga. Faktor pertama diterbitkan, kedua tekaan, dan ketiga pembetulan yang semua orang belajar cara susah: penyediaan set data, larian gagal dan masa membaca log semuanya dibil sebagai jam instance jika mesin dibiarkan hidup.

Dua tabiat mengurangkan pengganda itu:

- Tulis hasil selepas setiap unit kerja, supaya ranap hanya merugikan unit terakhir dan bukan seluruh larian.
- Akhiri skrip dengan perintah tutup, supaya kerja yang selesai tidak terus dibil.

## Apa yang kami akan buat dahulu, di Malaysia

1. **Transkripsi nota suara dan panggilan anda.** Data sudah ada, nilai segera, satu petang pengiraan.
2. **Ekstrak medan daripada invois masuk.** Kesakitannya mingguan dan kerjanya kelompok.
3. **Embed dokumen anda supaya carian berfungsi.** Kecil, kekal, dan ia membaiki setiap pembantu yang dibina kemudian.

Urutan kurang penting daripada langkah pertama: sewa kad untuk kerja yang ada penghujung, tutup ia, dan lihat bil. Ia akan lebih kecil daripada keraguan yang menahan anda, dan kerja kedua lebih mudah daripada yang pertama.

---

**Bacaan lanjut**

[USD 0.04 masa GPU, dan set data itulah kerja sebenar](https://upahje.my/ms/articles/gpu-sewaan-set-data-kerja-sebenar)

[H100 yang sama disewa RM11.89 sejam, atau RM7.12](https://upahje.my/ms/articles/kos-sewa-gpu-malaysia)
