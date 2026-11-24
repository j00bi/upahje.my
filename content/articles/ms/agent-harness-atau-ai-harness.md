---
title: "Agent harness, AI harness, agent framework: maksudnya"
description: "Agent harness menjalankan gelung agent: melaksanakan tool call, menyimpan transkrip, menguatkuasakan kebenaran. Vendor guna agent harness, bukan AI harness."
slug: agent-harness-atau-ai-harness
translationKey: agent-harness-vs-ai-harness
date: 2026-11-19
updated: 2026-11-19
author: "UpahJe Desk"
category: definitions
tags: [definitions, agent-harness, istilah, malaysia]
canonical: https://upahje.my/ms/articles/agent-harness-atau-ai-harness
draft: false
changelog:
  - date: 2026-11-19
    note: "Mula diterbitkan."
sources:
  - title: "Dokumentasi Claude Code, gambaran Agent SDK (hosted agent harness)"
    url: "https://code.claude.com/docs/en/agent-sdk/overview"
    checked: 2026-11-19
  - title: "README pakej DeepSeek Harness, dipasang pada mesin ini (Harness home)"
    url: "https://www.npmjs.com/package/@deepseek-ai/dsh"
    checked: 2026-11-19
  - title: "Repositori dan laman OpenBot"
    url: "https://openbot.run/"
    checked: 2026-11-19
  - title: "Laman MausBot"
    url: "https://mausbot.com/"
    checked: 2026-11-19
---

# Agent harness, AI harness, agent framework: apa maksud istilah ini

Agent harness ialah runtime yang menjalankan gelung agent bagi sesuatu model: ia memegang system prompt, melaksanakan tool call, mengurus konteks, menguatkuasakan kebenaran dan menyediakan persekitaran kerja. Vendor menulis "agent harness" atau ringkasnya "harness". "AI harness" bukan frasa yang digunakan oleh sumber rasmi yang saya buka, dan "agent framework" ialah benda lain.

## Siapa yang benar-benar menggunakan perkataan "harness"?

Anthropic menulis "hosted agent harness", dan pakej DeepSeek Harness menggunakan perkataan itu sebagai nama produknya.

Takrif Anthropic yang paling jelas: hosted agent harness "runs the agent loop, with sessions in an Anthropic-managed cloud sandbox or a self-hosted sandbox on your own infrastructure" ([dokumentasi Claude Code, dibaca 19 Nov 2026](https://code.claude.com/docs/en/agent-sdk/overview)). Pakej DeepSeek Harness yang dipasang menggunakan perkataan yang sama, contohnya "Harness home" bagi direktori konfigurasinya ([README pakej, dibaca 19 Nov 2026](https://www.npmjs.com/package/@deepseek-ai/dsh)). Kedua-duanya tidak menganggapnya sebagai kiasan.

## Apa yang dibawa oleh istilah itu, dalam praktik?

Empat perkara, dan setiap satu satu baris, bukan penerangan penuh.

1. **Pelaksanaan tool.** Harness yang menjalankan tool, bukan model. Model memilih tool dan argumen, dan harness melaksanakan panggilan itu.
2. **Gelung turn dan step.** Satu mesej menjadi satu turn; turn mengandungi step; setiap step ialah satu pertukaran lagi dengan model apabila hasil tool perlu dihantar kembali.
3. **Transkrip pada cakera.** Perbualan ditulis ke fail yang boleh dibaca: dalam harness ini, JSON Lines termampat di bawah `.dsh/sessions`.
4. **Kebenaran dan kelulusan.** Harness menentukan apa yang dibenarkan dilakukan oleh sesuatu tool, dan merekodkan polisinya. Tanpa itu, ia hanya klien sembang dengan langkah tambahan.

Cara ia melalui satu mesej, langkah demi langkah, ada dalam [apa yang agent harness lakukan dengan permintaan anda](https://upahje.my/ms/articles/apa-itu-agent-harness). Artikel ini tentang istilah, bukan gelungnya.

## Dari mana datangnya "AI harness"?

Bukan daripada vendor yang dapat saya baca. Merentas empat sumber rasmi yang dibuka untuk artikel ini, frasa "AI harness" tidak muncul.

Kaedah ini ada hadnya dan saya nyatakan: carian enjin untuk frasa tepat itu memulangkan halaman pemeriksaan bot, bukan hasil, jadi saya tidak boleh mendakwa tiada halaman di mana-mana menggunakannya. Yang saya boleh katakan lebih sempit tetapi berguna: Anthropic menulis "agent harness", DeepSeek Harness menulis "harness", dan kedua-duanya tidak menggunakan "AI harness" pada halaman yang saya buka. Apabila blog menggunakan "AI harness", ia meminjam perkataan vendor dan menambah kata pengubah yang vendor tidak guna.

| Istilah | Siapa guna | Maksudnya dalam konteks itu |
| --- | --- | --- |
| Harness | DeepSeek Harness, Anthropic | Runtime yang menjalankan gelung agent dan memiliki persekitarannya |
| Agent harness | Anthropic, kebanyakan dokumentasi vendor | Runtime yang sama dengan bahagian agent dinamakan: sesi, subagent, penghalaan tool, kelulusan |
| AI harness | Halaman pemasaran dan blog | Tiada makna tetap; pada sumber yang dibaca di sini, bukan istilah vendor |
| Agent framework | Penulis perpustakaan | Perpustakaan kod untuk membina agent, bukan runtime yang menjalankannya |
| Agent workspace | OpenBot, MausBot | Perkataan produk itu sendiri bagi harness campur desktop atau satu mesin setiap bot |

## Mengapa bezanya penting semasa membeli?

Kerana perkataan itu menerangkan apa yang produk lakukan kepada mesin dan data anda, dan framework bukan itu.

Framework ialah sesuatu yang diimport oleh pembangun; ia tidak memberikan persekitaran yang berjalan, transkrip yang boleh dibaca, atau pintu kelulusan. Harness memberi semua itu, dan sebab itulah soalan yang anda tanya kepada vendor berbeza: di mana transkrip disimpan, apa yang boleh disentuh oleh tool, dan siapa yang meluluskan tindakan. Jika sesuatu produk menggelar dirinya "AI harness" tetapi tidak boleh menjawab tiga soalan itu, label itu hiasan.

**Baca seterusnya**

[Apa yang agent harness lakukan dengan permintaan anda](https://upahje.my/ms/articles/apa-itu-agent-harness)

[Lagi tentang agent harness](https://upahje.my/ms/articles/category/definitions)

## FAQ

### Adakah Claude Code harness atau aplikasi?

Kedua-duanya. Anthropic menjual aplikasi, dan dokumentasi Agent SDK mereka menerangkan hosted agent harness di bawahnya yang menjalankan gelung. Perkataan itu menerangkan lapisan, bukan produk.

### Adakah agent framework sama dengan harness?

Tidak. Framework ialah perpustakaan yang anda bina dengannya; harness ialah benda yang menjalankan gelung, melaksanakan tool dan menyimpan transkrip. Anda boleh membina harness di atas framework, dan kebanyakan produk berbuat begitu.

### Adakah perkataan "harness" memberitahu saya sama ada ia sumber terbuka?

Tidak. Perkataan itu menerangkan fungsi, bukan lesen. Harness boleh jadi proprietari dan dihoskan di awan, atau sumber terbuka dan setempat, dan labelnya tetap sama.
