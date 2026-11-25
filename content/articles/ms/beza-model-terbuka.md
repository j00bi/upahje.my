---
title: "Pemberat terbuka, empat lesen: apa setiap model benarkan"
description: "Empat keluarga, lima kad model, empat bentuk lesen: MIT pada DeepSeek, lesen Qwen tersuai, lesen terbuka Mistral sendiri. Apa yang dibenarkan dan kos sewa."
slug: beza-model-terbuka
translationKey: open-models-differences
date: 2026-11-19
updated: 2026-11-19
author: "UpahJe Desk"
category: buying-guides
tags: [buying-guides, model-terbuka, lesen, malaysia]
canonical: https://upahje.my/ms/articles/beza-model-terbuka
draft: false
changelog:
  - date: 2026-11-19
    note: "Mula diterbitkan."
sources:
  - title: "Kad model dan lesen DeepSeek-V4.1-Flash-1017"
    url: "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017"
    checked: 2026-11-19
  - title: "Kad model dan lesen DeepSeek-V4-Pro-0813"
    url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813"
    checked: 2026-11-19
  - title: "Kad model dan lesen Qwen3.8-2.4T-A95B"
    url: "https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B"
    checked: 2026-11-19
  - title: "Kad model dan lesen Mistral-Large-4-1T-A52B"
    url: "https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B"
    checked: 2026-11-19
  - title: "Kad model dan lesen Kimi-K3.1-Pro"
    url: "https://huggingface.co/moonshotai/Kimi-K3.1-Pro"
    checked: 2026-11-19
  - title: "DeepSeek, harga API"
    url: "https://api-docs.deepseek.com/quick_start/pricing"
    checked: 2026-11-19
  - title: "Moonshot AI, harga chat Kimi"
    url: "https://platform.moonshot.ai/docs/pricing/chat"
    checked: 2026-11-19
  - title: "Mistral AI, harga inferens"
    url: "https://docs.mistral.ai/inference/pricing.md"
    checked: 2026-11-19
---

# Pemberat terbuka, empat lesen: apa setiap model benarkan

Lesen ialah perbezaan yang menentukan sama ada anda boleh menggunakan sesuatu model dalam perniagaan. Antara lima model terbuka yang dibaca untuk artikel ini, dua berlesen MIT, satu membawa lesen Qwen tersuai, satu membawa lesen terbuka Mistral sendiri, dan satu membawa lesen Kimi. "Model terbuka" memberitahu anda failnya boleh dimuat turun; ia tidak memberitahu apa yang boleh anda lakukan dengannya.

## Apa yang sebenarnya dinyatakan oleh setiap lesen?

Nama lesen dan sekatan, dipetik daripada kad model atau fail lesennya, bukan daripada ringkasan.

| Model (ejaan vendor) | Lesen seperti diterbitkan | Apa yang dinyatakan kad | Parameter |
| --- | --- | --- | --- |
| DeepSeek-V4.1-Flash-1017 | MIT | "This repository and the model weights are licensed under the MIT License." | Tidak dinyatakan dalam teks kad |
| DeepSeek-V4-Pro-0813 | MIT | Kata-kata sama seperti di atas | Tidak dinyatakan dalam teks kad |
| Qwen3.8-2.4T-A95B | Tersuai, `license_name: qwen3.8-max` | Teks lesen dalam fail LICENSE repositori | 2.4T jumlah, 95B aktif |
| Mistral-Large-4-1T-A52B | Mistral Ecosystem Open-Weight License | Teks lesen dalam fail LICENSE repositori | 1 trilion |
| Kimi-K3.1-Pro | Kimi K3.1 Pro License | Teks lesen dalam fail LICENSE repositori | 2.8T jumlah, 104B aktif |

MIT ialah yang longgar: penggunaan komersial, pengubahsuaian dan pengedaran, dengan notis dikekalkan. Tiga lagi ialah lesen tersuai yang termanya berada dalam fail LICENSE repositori. Fail itu tidak dibuka, jadi artikel ini menamakan lesen tersebut tanpa meringkaskan termanya. Itu had yang jujur: lesen tersuai ialah dokumen yang anda baca, bukan label yang anda anggap.

## Apa yang diperlukan untuk menjalankannya?

Saiz ialah tembok pertama, dan panduan perkakasan pada kad tidak memberikan minimum yang boleh dinilai.

Kad menyatakan kiraan parameter 95B aktif dalam 2.4T bagi Qwen, 1T bagi Mistral Large 4, dan 104B aktif dalam 2.8T bagi Kimi. Kad Mistral membawa satu-satunya nota perkakasan pihak pertama: "`--tp-size 8`: example tensor-parallel size for a node of 8 GPUs", dan ia contoh, bukan minimum yang dinyatakan. Kad Qwen dan DeepSeek menunjuk ke resipi vLLM dan cookbook SGLang, iaitu panduan penggunaan komuniti, bukan minimum pihak pertama. Kad Kimi ada bahagian penggunaan tetapi angka perkakasannya tidak dirakam.

Jadi artikel ini tidak boleh memberitahu berapa kos hosting sendiri. Nod GPU ialah bil sebenar, dan tiada kad di sini menyatakan konfigurasi minimum, jadi mana-mana angka akan direka. Yang boleh diberitahu ialah kos menyewa model yang sama.

## Berapa kos menyewa sebagai ganti?

Setiap model ini juga dijual setiap token oleh penerbitnya, dan harganya cukup berbeza untuk diambil kira.

| Model | Harga hos penerbit, USD setiap juta | Nota |
| --- | --- | --- |
| deepseek-flash | 0.15 masuk / 0.60 keluar luar puncak; 0.30 masuk / 1.20 keluar puncak | Luar puncak dan puncak berbeza |
| deepseek-v4-pro | 0.66 masuk / 1.98 keluar luar puncak; output puncak 3.96 | Input puncak tidak dirakam |
| qwen3.8-max | 1.50 masuk / 4.50 keluar | Kad menyatakan ini versi rasmi berdasarkan Qwen3.8-2.4T-A95B |
| mistral-large-4 | 0.70 masuk / 2.10 keluar | API Mistral pihak pertama |
| kimi-k3.1-pro | 2.00 masuk / 10.00 keluar | Konteks 1,048,576 token |

Hos kedua juga menjual DeepSeek V4.1 Flash: API Mistral menyenaraikannya pada 0.30 masuk / 1.20 keluar, berbanding 0.15 / 0.60 luar puncak di DeepSeek sendiri. Kad model sama, dua harga, dan itulah sebab praktikal untuk membeli-belah hos dan bukan model.

Aritmetik yang boleh dibuat pembaca dari sini, pada 1,000 token input dan 500 output setiap tugasan: deepseek-flash luar puncak berharga USD 0.00015 + USD 0.0003 = USD 0.00045 setiap tugasan; kimi-k3.1-pro berharga USD 0.002 + USD 0.005 = USD 0.007 setiap tugasan. Itu kira-kira 15 kali kos setiap tugasan, dan kedua-dua angka boleh disemak terhadap jadual di atas.

## Model mana yang patut dimulakan oleh PKS Malaysia?

Yang termurah setiap token dan lesennya jelas membenarkan penggunaan perniagaan. Pada baris yang dibaca di sini, itu DeepSeek-V4.1-Flash-1017 di bawah MIT, disewa pada 0.15 masuk / 0.60 keluar luar puncak, sebelum sesiapa membeli GPU.

Itu cadangan bersyarat, bukan keputusan: ia menganggap tugasan anda boleh menerima API vendor China dan anda tidak memerlukan semakan lesen tersuai. Jika mana-mana syarat gagal, langkah seterusnya ialah baris Mistral atau Qwen, kedua-duanya lebih mahal setiap token dan membawa lesen yang perlu anda baca.

## Apa yang tidak dapat kami sahkan?

Tiada kad menyatakan konfigurasi perkakasan minimum, jadi tiada kos hosting sendiri didakwa. Angka perkakasan Kimi tidak dirakam, dan harga input puncak DeepSeek tidak diterbitkan pada halaman yang dibaca.

**Baca seterusnya**

[Model terbuka atau tertutup: apa yang mampu dijalankan sendiri oleh PKS Malaysia](https://upahje.my/ms/articles/model-terbuka-atau-tertutup-pks-malaysia)

[Lagi tentang membeli dan memilih tool](https://upahje.my/ms/articles/category/buying-guides)

