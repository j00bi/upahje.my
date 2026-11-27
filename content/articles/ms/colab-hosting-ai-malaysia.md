---
title: "Colab akan latih model anda. Ia tidak akan hoskan"
description: "FAQ Google melarang hosting fail, penyajian media dan perkhidmatan web di Colab, serta menyekat SSH pada tier percuma. Apa yang dibenarkan, dan kos hos."
slug: colab-hosting-ai-malaysia
translationKey: colab-hosting-ai-malaysia
format: explainer
reader: owner
date: 2026-11-25
updated: 2026-11-25
author: "UpahJe Desk"
category: definitions
tags: [definitions, colab, hosting, malaysia]
cardFigure: "Sesi 12 jam, tiada hosting web"
canonical: https://upahje.my/ms/articles/colab-hosting-ai-malaysia
draft: false
changelog:
  - date: 2026-11-25
    note: "Mula diterbitkan."
sources:
  - title: "Google Colaboratory FAQ (akses percuma GPU dan TPU, notebook berjalan paling lama 12 jam, aktiviti terhad termasuk hosting fail, penyajian media, SSH dan desktop jauh pada runtime percuma)"
    url: "https://research.google.com/colaboratory/faq.html"
    checked: 2026-11-25
  - title: "Hugging Face pricing (Spaces CPU Basic percuma pada 2 vCPU dan 16 GB, PRO USD 9 sebulan dengan kuota ZeroGPU 8x)"
    url: "https://huggingface.co/pricing"
    checked: 2026-11-25
  - title: "Runpod pricing (RTX A5000 USD 0.27/jam, H100 PCIe USD 2.89/jam) untuk kapasiti penyajian sewaan"
    url: "https://www.runpod.io/pricing"
    checked: 2026-11-25
  - title: "Frankfurter, kadar rujukan USD ke MYR 4.1155 bagi 24 November 2026"
    url: "https://api.frankfurter.dev/v1/latest?base=USD&symbols=MYR"
    checked: 2026-11-25
---

# Colab akan latih model anda. Ia tidak akan hoskan

Soalan itu biasanya datang sebagai "macam mana nak hos AI saya di Colab", dan jawapan jujurnya ialah hosting ialah perkara yang syarat Colab nyatakan secara khusus. FAQ Google menyenaraikan hosting fail, penyajian media dan "tawaran perkhidmatan web lain yang tidak berkaitan pengkomputeran interaktif" dalam aktiviti yang tidak dibenarkan pada runtime terurus. Runtime percuma juga menyekat kawalan jauh: shell SSH dan desktop jauh, serta memintas antara muka notebook untuk bekerja terutamanya melalui UI web.

Itu bukan celah untuk diakali dengan terowong. Ia bentuk produknya.

## Apa yang sebenarnya diberi oleh tier percuma

Colab ialah notebook Jupyter dihoskan dengan akses percuma kepada GPU dan TPU. Notebook berjalan paling lama 12 jam, bergantung pada ketersediaan dan corak penggunaan, dan mesin maya dipadam selepas tempoh melahu, dengan hayat maksimum yang dikuatkuasakan perkhidmatan itu. Tiada satu pun daripada itu dijamin: FAQ mengatakan sumber tidak dijamin dan tidak tanpa had, dan hadnya berubah-ubah.

Jadi tier percuma ialah mesin kelompok yang murah hati dan bermula semula. Ia bukan pelayan, dan menganggapnya sebagai pelayan menghasilkan tiga kegagalan di bawah.

## Tiga kegagalan yang semua orang tempuh

1. **Terowong yang mati.** Halakan ngrok atau cloudflared ke port dalam notebook dan anda dapat URL awam. Ia hidup selama mesin maya itu hidup, iaitu paling lama 12 jam dan selalunya kurang. Setiap mula semula bermakna URL baharu, dan tiada siapa yang memerlukan model anda akan mengejar pautan baharu setiap pagi.
2. **Skrip kekal hidup.** Sel yang mengklik UI atau mengepam runtime untuk mengalahkan pemasa melahu ialah tingkah laku yang FAQ gambarkan sebagai memintas dasar anti-penyalahgunaan. Ia juga hanya menangguhkan siling 12 jam.
3. **Rahsia dalam notebook.** Sesiapa yang ada pautan boleh membaca setiap sel, termasuk kunci API yang anda tampal untuk mencapai model. Yang ini bukan peraturan yang dilanggar, ia kelayakan yang diterbitkan.

## Apa yang Colab benar-benar baik

Ia cemerlang pada kerja yang ia dibina untuk, dan kerja itu wajar dinamakan dengan tepat:

- **Eksperimen kelompok.** Latih, nilai, buang mesin maya. Model yang mengambil masa 40 minit untuk ditala halus masuk dengan selesa dalam satu sesi.
- **Rangka penilaian.** Jalankan set kes tetap melalui model dan skorkan, dengan notebook sebagai rekod apa yang dijalankan.
- **Berkongsi kaedah.** Notebook yang boleh dibuka dan dijalankan oleh orang lain ialah dokumen serahan yang lebih baik daripada folder skrip.

Corak yang kekal dalam peraturan: latih dan tala di Colab, tulis checkpoint ke Drive atau storan objek, dan sajikan dari tempat yang direka untuk menyajikan.

## Di mana hosting sebenarnya tinggal, dengan harga

| Pilihan | Apa ia | Harga seperti dicetak |
| --- | --- | --- |
| Hugging Face Spaces, CPU Basic | 2 vCPU, 16 GB, aplikasi Gradio atau Docker dengan URL kekal | percuma |
| Hugging Face PRO | kuota ZeroGPU 8x, keutamaan baris gilir lebih tinggi, Spaces Docker dan Gradio | USD 9 sebulan, kira-kira RM37.04 |
| Runpod, setiap jam | GPU yang anda mula dan hentikan; dibil mengikut saat | USD 0.27/jam untuk RTX A5000, kira-kira RM1.11 |
| Mesin sendiri | Perkakasan anda di sebalik terowong | perkakasan campur elektrik |

Tier Spaces percuma menampung model kecil dengan kadar permintaan sederhana, yang langsung tidak perlukan GPU, dan URL kekal berharga kosong selagi itu keadaannya. RM37.04 untuk PRO ialah kira-kira tiga jam H100 PCIe di platform sewaan, yang meletakkan pertukaran itu dalam istilah biasa: sebulan hosting berbanding satu petang latihan.

## Aliran kerja yang kekal dalam peraturan

1. Buat latihan dan penilaian di Colab, dan pastikan larian itu masuk dalam satu sesi dengan ruang lebih.
2. Simpan pemberat ke Drive atau hab model sebaik larian bertambah baik, kerana mesin maya tidak akan memberi amaran.
3. Sajikan dari Spaces, GPU sewaan, atau mesin sendiri, mengikut kadar permintaan.
4. Simpan token dalam rahsia notebook atau pemboleh ubah persekitaran yang tidak pernah dicetak dalam sel.
5. Baca semula senarai aktiviti terhad penyedia sebelum membina produk di atas tier percuma, kerana senarai itu ialah kontraknya.

Kekeliruan ini bukan teknikal, ia tentang untuk apa sebuah notebook. Colab menjual lebihan kapasiti interaktif kepada orang yang sedang bereksperimen, dan produk yang disajikan ialah lawan kepada eksperimen, jadi tier percuma membelanjakan kemurahannya pada latihan dan tidak tinggal apa-apa untuk hosting.

---

**Read next**

[H100 yang sama disewa RM11.89 sejam, atau RM7.12](https://upahje.my/ms/articles/kos-sewa-gpu-malaysia)

[Lebih banyak definisi, dijelaskan dengan mudah](https://upahje.my/ms/glossary)

**Baca seterusnya**

[Colab akan latih model anda. Ia tidak akan hoskan](https://upahje.my/ms/articles/klip-video-sendiri)

[Colab akan latih model anda. Ia tidak akan hoskan](https://upahje.my/ms/articles/realiti-bot-dagangan-malaysia)
