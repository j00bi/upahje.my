---
title: "Claude, ChatGPT, Gemini dan Grok: apa sebenarnya beza antara model tertutup"
description: "Bukan skor penanda aras, yang tiada papan pendahulu semasa dapat dipastikan di sini. Apa yang anda terikat dengannya: tetingkap konteks, harga setiap token, keupayaan yang didokumenkan dan termanya."
slug: beza-model-tertutup
translationKey: closed-models-differences
date: 2026-11-19
updated: 2026-11-19
author: "UpahJe editorial"
category: buying-guides
tags: [buying-guides, model-tertutup, harga, malaysia]
canonical: https://upahje.my/ms/articles/beza-model-tertutup
draft: true
sources:
  - title: "Anthropic, gambaran model"
    url: "https://docs.claude.com/en/docs/about-claude/models/overview"
    checked: 2026-11-19
  - title: "OpenAI, dokumentasi model"
    url: "https://platform.openai.com/docs/models"
    checked: 2026-11-19
  - title: "OpenAI, harga API"
    url: "https://developers.openai.com/api/docs/pricing"
    checked: 2026-11-19
  - title: "DeepSeek, harga API"
    url: "https://api-docs.deepseek.com/quick_start/pricing"
    checked: 2026-11-19
---

# Claude, ChatGPT, Gemini dan Grok: apa sebenarnya beza antara model tertutup

Yang berbeza bukan model mana yang mendapat skor tertinggi. Tiada papan pendahulu semasa yang bertarikh dapat dicapai untuk artikel ini, jadi tiada susunan prestasi diberikan. Yang benar-benar mengikat pembeli ialah empat perkara yang didokumenkan: tetingkap konteks, harga diterbitkan setiap juta token, keupayaan yang didokumenkan vendor, dan terma yang anda terima.

## Apa yang sebenarnya didokumenkan bagi setiap model?

Jadual di bawah hanya membawa apa yang dinyatakan oleh halaman vendor sendiri. Di mana halaman tidak mencetak angka, sel itu menulis "tidak dirakam" dan bukan angka.

| Model (ejaan vendor) | Tetingkap konteks | Input / output, USD setiap juta token | Tool calling | Structured output | Terma |
| --- | --- | --- | --- | --- | --- |
| Claude Fable 5.2 | 1M token | 8 / 40 | Didokumenkan | Didokumenkan | Terma komersial Anthropic |
| Claude Opus 5.5 | 1M token | 4 / 20 | Didokumenkan | Didokumenkan | Terma komersial Anthropic |
| Claude Sonnet 5.5 | 1M token | 2 / 10 | Didokumenkan | Didokumenkan | Terma komersial Anthropic |
| Claude Haiku 5.5 | 1M token | 0.10 / 0.50, input disyaratkan hingga 100,000 token | Didokumenkan | Didokumenkan | Terma komersial Anthropic |
| GPT-6.2 Astra | 128K token | 8.00 / 40.00 | Didokumenkan | Didokumenkan | Terma OpenAI |
| GPT-6.2 Sol | 128K token | 2.00 / 10.00 | Didokumenkan | Didokumenkan | Terma OpenAI |
| GPT-6.2 Luna | 128K token | tidak dirakam | Didokumenkan | Didokumenkan | Terma OpenAI |
| deepseek-flash | 1M token | input dirakam, output tidak dirakam | Didokumenkan | Didokumenkan | Terma DeepSeek |
| deepseek-v4-pro | 1M token | input dirakam, output tidak dirakam | Didokumenkan | Didokumenkan | Terma DeepSeek |

Baris Anthropic datang daripada gambaran modelnya, baris OpenAI daripada dokumentasi model dan halaman harganya, dan baris DeepSeek daripada halaman harga API-nya, semuanya dibaca pada 19 November 2026.

Dua baris memerlukan nota dan bukan angka. Harga input Claude Haiku 5.5 disyaratkan pada halaman itu untuk prompt hingga 100,000 token. Dan harga output DeepSeek berada di bawah titik pemotongan halaman, jadi ia tiada dan bukan diagak.

## Apa yang tidak diberitahu oleh skor penanda aras?

Hampir semua yang pembeli perlukan, dan artikel ini sengaja tiada jadual penanda aras kerana yang dapat dicapai tidak semasa.

SWE-bench menyajikan papan pendahuluannya melalui skrip dan bukan teks statik, dan tiada petikan bertarikh dirakam. Baris teratas yang kelihatan pada halaman Aider polyglot membawa direktori larian bertarikh 23 Ogos 2025, yang bukan petikan November 2026. Daripada memetik mana-mana satu sebagai semasa, artikel ini membandingkan apa yang anda dapat dan bayar. Angka penanda aras juga tidak akan memberitahu tetingkap konteks, harga, sama ada structured output didokumenkan, atau apa yang dibenarkan oleh terma, iaitu empat perkara yang diukur oleh jadual ini.

## Di mana terletaknya ikatan?

Tiga tempat, dan setiap satu muncul dalam kontrak, bukan dalam penanda aras.

**Penyimpanan data.** Setiap model tertutup berjalan pada infrastruktur vendor. Apa yang berlaku kepada prompt anda dikawal oleh terma, dan halaman terma tidak dibuka untuk artikel ini, jadi saya tidak akan mencirikannya. Baca terma anda sebelum menampal dokumen pelanggan.

**Penghentian model.** Model tertutup boleh ditarik balik mengikut jadual vendor. Harga dan nama di atas bertarikh 19 November 2026 atas sebab itu: ia petikan sasaran yang bergerak, bukan sifat kekal.

**Eksport.** Tiada fail pemberat untuk dibawa bersama. Berpindah kepada vendor lain bermakna membina semula prompt, tool dan penilaian, iaitu kos yang tiada jadual dapat merakam.

## Nama vendor mana yang berubah?

Halaman OpenAI tidak selaras antara satu sama lain, dan jadual mengekalkan kedua-dua ejaan daripada memilih satu.

Halaman harga pengguna menamakan GPT-6 dan GPT-6 Astra. Dokumentasi platform menamakan GPT-6.2 Astra, GPT-6.2 Sol dan GPT-6.2 Luna. Kedua-dua ejaan direkodkan seperti dicetak, dengan setiap halaman sebagai sumbernya sendiri. Jika anda menulis brief kepada pembekal, sebut nama platform, kerana itulah yang didokumenkan oleh API.

## Apa yang tidak kami ukur?

Kami tidak menjalankan penanda aras, dan kami tidak meminjam yang lapuk. Tiada susunan kualiti dalam artikel ini, tiada "lebih bijak" dan tiada "lebih baik untuk pengekodan".

Juga tiada dengan sengaja: halaman terma Anthropic, OpenAI dan DeepSeek disenaraikan tetapi tidak dibuka, jadi tiada dakwaan dibuat tentang apa yang dibenarkannya; harga GPT-6.2 Luna dan kedua-dua harga output DeepSeek ialah "tidak dirakam"; dan Gemini serta Grok tidak muncul sebagai baris kerana dokumentasi model mereka tidak dibaca dalam pusingan ini, iaitu jurang dalam bacaan kami dan bukan bukti bahawa mereka tiada ciri tersebut.

## FAQ

### Bolehkah saya membandingkan model ini ikut harga sahaja?

Hanya jika anda tahu campuran token anda. Input dan output dinilai berasingan, nisbahnya berbeza mengikut tugasan, dan harga input Haiku 5.5 disyaratkan oleh panjang prompt. Model yang nampak termurah setiap token input boleh menelan kos lebih pada tugasan yang banyak menulis.

### Mengapa sesetengah sel "tidak dirakam" dan bukan sifar atau tekaan?

Kerana halaman itu tidak mencetak angkanya di tempat yang dapat kami baca. Sifar akan salah dan tekaan akan direka. "Tidak dirakam" ialah sel yang jujur, dan ia memberitahu anda apa yang perlu disemak semula pada halaman vendor.

### Adakah tetingkap konteks 1M token bermakna saya patut hantar 1M token?

Tiada sebab praktikal. Kos meningkat dengan token dan kebanyakan tugasan perlukan jauh lebih sedikit. Tetingkap itu penting bagi kes jarang seperti dokumen panjang atau transkrip panjang, bukan sebagai tetapan lalai.

---

**Baca seterusnya**

[Apa yang RM100 sebulan sebenarnya beli dalam AI](https://upahje.my/ms/articles/bajet-rm100-ai-malaysia)

[Lagi tentang membeli dan memilih tool](https://upahje.my/ms/articles/category/buying-guides)
