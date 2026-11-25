---
title: "Claude, ChatGPT, Gemini dan Grok: apa yang berbeza"
description: "Skor penanda aras tidak memutuskan banyak di sini. Yang terikat: tetingkap konteks, harga token dan keupayaan didokumenkan, setiap sel bersumber atau ditanda."
slug: beza-model-tertutup
translationKey: closed-models-differences
date: 2026-11-19
updated: 2026-11-19
author: "UpahJe Desk"
category: buying-guides
tags: [buying-guides, model-tertutup, harga, malaysia]
canonical: https://upahje.my/ms/articles/beza-model-tertutup
draft: false
changelog:
  - date: 2026-11-19
    note: "Mula diterbitkan."
sources:
  - title: "Anthropic, gambaran model"
    url: "https://docs.claude.com/en/docs/about-claude/models/overview"
    checked: 2026-11-19
  - title: "OpenAI, harga API"
    url: "https://developers.openai.com/api/docs/pricing"
    checked: 2026-11-19
  - title: "DeepSeek, harga API"
    url: "https://api-docs.deepseek.com/quick_start/pricing"
    checked: 2026-11-19
  - title: "Google, harga AI Studio"
    url: "https://aistudio.google.com/docs/pricing"
    checked: 2026-11-19
  - title: "xAI, harga model"
    url: "https://docs.x.ai/docs/pricing"
    checked: 2026-11-19
  - title: "Anthropic, sokongan PDF (fail)"
    url: "https://docs.claude.com/en/docs/build-with-claude/pdf-support"
    checked: 2026-11-19
  - title: "OpenAI, input fail"
    url: "https://developers.openai.com/api/docs/guides/file-inputs"
    checked: 2026-11-19
  - title: "xAI, function calling"
    url: "https://docs.x.ai/developers/tools/function-calling"
    checked: 2026-11-19
---

# Claude, ChatGPT, Gemini dan Grok: apa sebenarnya beza antara model tertutup

Yang berbeza bukan model mana yang mendapat skor tertinggi. Dua papan pendahulu dapat dicapai dan dicetak di bawah dengan tetapannya, tetapi tiada satu pun dianggap sebagai susunan kualiti di sini. Yang mengikat pembeli ialah empat perkara yang didokumenkan: tetingkap konteks, harga setiap juta token, sama ada tool calling dan structured output didokumenkan, serta sama ada input fail dan imej disokong.

## Apa yang didokumenkan oleh setiap vendor?

Hanya apa yang dinyatakan oleh halaman vendor sendiri. Di mana halaman tidak mencetak angka, sel itu menulis "tidak dirakam" dan bukan angka.

| Model (ejaan vendor) | Tetingkap konteks | Input / output, USD setiap juta | Tool calling | Structured output | Input fail dan imej |
| --- | --- | --- | --- | --- | --- |
| Claude Fable 5.2 | 1M token | 8 / 40 | Didokumenkan | Didokumenkan | Imej dan fail didokumenkan |
| Claude Opus 5.5 | 1M token | 4 / 20 | Didokumenkan | Didokumenkan | Imej dan fail didokumenkan |
| Claude Sonnet 5.5 | 1M token | 2 / 10 | Didokumenkan | Didokumenkan | Imej dan fail didokumenkan |
| Claude Haiku 5.5 | 1M token | 0.10 / 0.50, input disyaratkan hingga 100,000 token | Didokumenkan | Didokumenkan | Imej dan fail didokumenkan |
| GPT-6.2 Astra | 128K token konteks pendek | Konteks pendek 8 / 40, konteks panjang 16 / 60 | Didokumenkan | Didokumenkan | Imej dan fail didokumenkan |
| GPT-6.2 Sol | 128K token konteks pendek | Pendek 2 / 10, panjang 4 / 15 | Didokumenkan | Didokumenkan | Imej dan fail didokumenkan |
| gpt-6-luna | tidak dirakam | 0.10 / 0.50 | Didokumenkan | Didokumenkan | Imej dan fail didokumenkan |
| deepseek-flash | 1M token | 0.15 / 0.60 luar puncak, 0.30 / 1.20 puncak | Didokumenkan | Didokumenkan | Vision ya, fail belum disahkan |
| deepseek-v4-pro | 1M token | 0.66 input luar puncak, 1.98 output luar puncak | Didokumenkan | Didokumenkan | Imej tidak disokong |
| gemini-4-neon | 1M token | 3.00 / 15.00 | Didokumenkan | Didokumenkan | Imej dan fail didokumenkan |
| gemini-4-carbon | 1M token | 2.00 / 10.00 hingga 2026-11-30, kemudian 4.00 / 20.00 | Didokumenkan | Didokumenkan | Imej dan fail didokumenkan |
| grok-4.7 | 500k token | 2.00 / 6.00 bawah konteks 200k, 4.00 / 12.00 ke atas | Didokumenkan | Didokumenkan | Imej ya, fail tidak didokumenkan |

Angka itu datang daripada gambaran model Anthropic, halaman harga API OpenAI, halaman harga DeepSeek, halaman harga AI Studio Google dan halaman harga model xAI, semuanya dibaca pada 19 November 2026.

Dua sel memerlukan nota dan bukan angka. Harga input Haiku 5.5 disyaratkan pada halaman itu untuk prompt hingga 100,000 token. Dan GPT-6.2 Astra serta Sol menilai konteks pendek dan panjang secara berasingan, jadi kedua-duanya dicetak. Sel keupayaan disokong oleh dokumentasi vendor yang disenaraikan dalam Sumber: sokongan PDF bagi baris Claude, input fail bagi baris GPT, dan function calling bagi grok-4.7.

## Apa yang tidak diberitahu oleh skor penanda aras?

Hampir semua yang ada dalam jadual di atas. Dua papan pendahulu di bawah dicetak dengan tetapannya, dan tiada satu pun dianggap sebagai keputusan kualiti.

SWE-bench menyajikan papan pendahuluannya melalui skrip dan bukan teks statik, dan tiada petikan bertarikh dirakam. Baris teratas yang kelihatan pada halaman Aider polyglot membawa direktori larian bertarikh 23 Ogos 2025, yang bukan petikan November 2026. Daripada memetik mana-mana satu sebagai semasa, artikel ini membandingkan apa yang anda dapat dan bayar. Angka penanda aras juga tidak akan memberitahu tetingkap konteks, harga, sama ada structured output didokumenkan, atau apa yang dibenarkan oleh terma.

## Berapa kos satu tugasan pada kadar ini?

Kerana input dan output dinilai berasingan, satu contoh berkira menjadikan jadual itu boleh digunakan. Andaiannya 100,000 token input dan 20,000 token output setiap tugasan, dan kadarnya ialah harga yang dicetak di atas.

1. Claude Haiku 5.5: 0.1 juta input × USD 0.10 = USD 0.01, tambah 0.02 juta output × USD 0.50 = USD 0.01, jadi USD 0.02 setiap tugasan.
2. Claude Fable 5.2: 0.1 juta input × USD 8.00 = USD 0.80, tambah 0.02 juta output × USD 40.00 = USD 0.80, jadi USD 1.60 setiap tugasan.
3. gemini-4-carbon pada harga yang dicetak untuk Malaysia sehingga 30 November 2026 (ia berganda kepada USD 4.00 / 20.00 pada 1 Disember): 0.1 juta input × USD 2.00 = USD 0.20, tambah 0.02 juta output × USD 10.00 = USD 0.20, jadi USD 0.40 setiap tugasan hari ini dan USD 0.80 selepas perubahan itu.

Itu jurang 80 kali antara baris termurah dan termahal pada tugasan yang sama, dan setiap angka boleh disemak terhadap harga yang dicetak. Tukar andaian itu dan jumlahnya berubah secara berkadar; pendaraban itulah yang menjadikannya boleh diaudit.

![Tiga bar mengikut skala: Claude Haiku 5.5 USD 0.02, Gemini 4 Carbon USD 0.40, Claude Fable 5.2 USD 1.60 setiap tugasan](/figures/closed-task-cost-ms.svg)
*Tugasan 100,000 input dan 20,000 output yang sama berharga USD 0.02 pada Haiku 5.5 dan USD 1.60 pada Fable 5.2.*

## Di mana terletaknya ikatan?

Tiga tempat, dan setiap satu muncul dalam kontrak, bukan dalam penanda aras.

**Penyimpanan data.** Setiap model tertutup berjalan pada infrastruktur vendor. Apa yang berlaku kepada prompt anda dikawal oleh terma, dan halaman terma disenaraikan tetapi tidak dibuka untuk artikel ini, jadi saya tidak akan mencirikannya. Baca terma anda sebelum menampal dokumen pelanggan.

**Penghentian model.** Model tertutup boleh ditarik balik mengikut jadual vendor. Harga dan nama di atas bertarikh atas sebab itu: ia petikan sasaran yang bergerak.

**Eksport.** Tiada fail pemberat untuk dibawa bersama. Berpindah vendor bermakna membina semula prompt, tool dan penilaian, iaitu kos yang tiada jadual dapat merakam.

## Nama vendor mana yang berubah?

Halaman tidak selaras antara satu sama lain, dan jadual mengekalkan nama yang dicetak daripada merapikannya.

Dokumentasi platform OpenAI menjual GPT-6.2 Astra dan GPT-6.2 Sol, serta mencetak model murah sebagai gpt-6-luna, manakala halaman penggunanya memanggil keluarga itu GPT-6. Nama pemasaran Gemini berbeza daripada id API di bawahnya, dan sebab itulah jadual menggunakan id API. Jika anda menulis brief kepada pembekal, sebut id API, kerana itulah yang digunakan oleh dokumentasi dan bil.

## Apa yang sebenarnya dinyatakan oleh penanda aras?

Dua papan pendahulu, dan setiap satu hanya boleh dibaca dengan tetapannya dicetak di sebelah angka, dan tiada satu pun selaras dengan nama vendor di atas.

SWE-bench Verified dibaca dengan tetapan Bash Only dan penapis agent mini-SWE-agent, disusun mengikut peratus selesai. Baris teratasnya ialah Claude 4.5 Opus (high) pada 76.80% selesai dengan kos purata USD 0.75 ([swebench.com, dibaca 19 Nov 2026](https://www.swebench.com/)). Halaman itu menyatakan bahawa tetapan lalainya ialah sebahagian daripada angka, jadi skor yang dipetik tanpa tetapan itu tidak setara dengan angka SWE-bench yang lain.

| Model (seperti dicetak papan pendahulu) | Peratus selesai | Kos purata, USD |
| --- | --- | --- |
| Claude 4.5 Opus (high) | 76.80 | 0.75 |
| Gemini 3 Flash (high) | 75.80 | 0.36 |
| MiniMax M2.5 (high) | 75.80 | 0.07 |
| Claude 4.6 Opus | 75.60 | 0.55 |

Baris teratas yang kelihatan pada Aider polyglot ialah gpt-5 (high) pada 88.0% kadar lulus dengan jumlah kos larian USD 29.08, tetapi direktori lariannya bertarikh 2025-08-23 dan tiada baris yang kelihatan lebih baharu daripada Ogos 2025 ([aider.chat, dibaca 19 Nov 2026](https://aider.chat/docs/leaderboards/)). Angka itu tidak boleh dibentangkan sebagai keadaan seni pada November 2026.

Nama tidak selaras, dan itu penemuan dan bukan masalah format. Papan SWE-bench mencetak "Claude 4.5 Opus", "Gemini 3 Flash" dan "GPT 5.2", manakala jadual vendor di atas menyenaraikan Claude Opus 5.5, gemini-4-neon dan gpt-6-luna. Generasi penamaan yang berbeza mungkin bukan model yang sama, jadi artikel ini tidak pernah mendakwa model vendor dalam jadualnya mendapat angka papan pendahulu.

## Apa yang tidak kami ukur?

Kami tidak menjalankan penanda aras sendiri. Kami membaca dua, dengan tetapannya, dan kami tidak menganggap mana-mana satu sebagai keputusan kualiti: tiada "lebih bijak" dan tiada "lebih baik untuk pengekodan" di sini.

Juga tiada dengan sengaja: halaman terma Anthropic, OpenAI, DeepSeek dan Google disenaraikan tetapi tidak dibuka, jadi tiada dakwaan dibuat tentang apa yang dibenarkannya; tetingkap konteks gpt-6-luna ialah "tidak dirakam"; dan input fail serta PDF belum disahkan bagi kebanyakan baris kerana pusingan ini tidak sampai ke halaman tersebut.

