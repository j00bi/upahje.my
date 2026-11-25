---
title: "Harness agent: siapa buat, mana satu sumber terbuka"
description: "Grok Bot dan Dots produk tertutup dihoskan. OpenBot dan MausBot sumber tersedia, hanya satu sumber terbuka pada lesen sendiri; setiap baris ada lesen dan bukti."
slug: landskap-harness-agent-sumber-terbuka
translationKey: harness-landscape-open-closed
date: 2026-11-19
updated: 2026-11-19
author: "UpahJe Desk"
category: buying-guides
tags: [buying-guides, agent-harness, lesen, malaysia]
canonical: https://upahje.my/ms/articles/landskap-harness-agent-sumber-terbuka
draft: false
changelog:
  - date: 2026-11-19
    note: "Mula diterbitkan."
sources:
  - title: "nightly-labs/openbot, metadata repositori dan fail lesen (PolyForm Noncommercial 1.0.0)"
    url: "https://github.com/nightly-labs/openbot"
    checked: 2026-11-19
  - title: "Laman OpenBot (dakwaan bahawa sumbernya terbuka)"
    url: "https://openbot.run/"
    checked: 2026-11-19
  - title: "Laman MausBot"
    url: "https://mausbot.com/"
    checked: 2026-11-19
  - title: "milind-soni/OpenMausBot, metadata repositori (Apache-2.0)"
    url: "https://github.com/milind-soni/OpenMausBot"
    checked: 2026-11-19
  - title: "xAI, pengenalan Grok Bot"
    url: "https://x.ai/news/introducing-grok-bot"
    checked: 2026-11-19
  - title: "OpenAI, pengenalan Dots"
    url: "https://openai.com/index/introducing-dots/"
    checked: 2026-11-19
  - title: "Metadata pakej DeepSeek Harness, dipasang pada mesin ini"
    url: "https://www.npmjs.com/package/@deepseek-ai/dsh"
    checked: 2026-11-19
---

# Harness agent: siapa yang membuatnya, dan apa yang benar-benar sumber terbuka

Empat produk yang mungkin disebut pembaca ialah dua jenis benda berbeza. Grok Bot daripada xAI dan Dots daripada OpenAI ialah produk tertutup yang dihoskan, digunakan melalui perkhidmatan orang lain. OpenBot dan MausBot ialah projek sumber tersedia yang boleh anda jalankan sendiri, dan hanya repositori utama MausBot yang sumber terbuka pada lesennya sendiri. OpenBot bukan.

## Apa yang ada di pasaran?

Satu baris bagi setiap produk, dengan tahap bukti dinyatakan, kerana tiga daripadanya dibaca daripada sumber rasmi dan satu dipasang di sini lalu hilang.

| Produk | Apa ia | Lesen atau terma | Tahap bukti | Status | Sumber |
| --- | --- | --- | --- | --- | --- |
| OpenBot (nightly-labs) | Ruang kerja desktop setempat untuk rakan AI berterusan, dengan marketplace plugin | PolyForm Noncommercial 1.0.0; medan lesen repositori menunjukkan NOASSERTION | Sumber rasmi, dibaca 2026-11-19 | Aktif, push 2026-11-19, 9,037 bintang | [github.com/nightly-labs/openbot](https://github.com/nightly-labs/openbot) |
| MausBot (OpenMausBot) | Alternatif Grok Bot sumber terbuka dengan mesin maya untuk bot | Apache-2.0 pada repositori utama; repositori muat turun MIT yang pernah dipetik di sini tidak lagi wujud | Sumber rasmi, dibaca 2026-11-19 | Aktif, push 2026-11-18, 25,485 bintang | [github.com/milind-soni/OpenMausBot](https://github.com/milind-soni/OpenMausBot) |
| Grok Bot (xAI) | Agent sentiasa hidup dengan komputer sendiri, bekerja dalam aplikasi | Tertutup; aplikasi macOS bertandatangan, tiada repositori awam | Sumber rasmi, pengumuman bertarikh 2026-08-11 | Beta | [x.ai/news/introducing-grok-bot](https://x.ai/news/introducing-grok-bot) |
| Dots (OpenAI) | Agent sentiasa hidup dalam ChatGPT, dengan komputer awan sendiri | Tertutup; tiada repositori awam | Sumber rasmi, pengumuman bertarikh 2026-09-29 | Hidup, dilancarkan kepada Enterprise dari 2026-11-18 | [openai.com/index/introducing-dots](https://openai.com/index/introducing-dots/) |
| DeepSeek Harness | Harness yang dijalankan oleh profil, dengan server MCP mengikut profil | Pakej npm, lihat metadata pakej | Dijalankan di sini; tidak boleh disahkan semula sepenuhnya | Dipasang 0.2.2-rc.1 pada 2026-11-19 | [npmjs.com/package/@deepseek-ai/dsh](https://www.npmjs.com/package/@deepseek-ai/dsh) |
| Pelancar OpenMausBot (mesin ini) | Pelancar yang muatannya hilang | Tidak berkenaan | Dijalankan di sini; tidak boleh dijalankan kini | Yatim | setempat, 2026-11-19 |
| Claude Code, Codex CLI, OpenCode | Harness CLI yang diukur pada mesin ini | Lesen proprietari | Dijalankan di sini, 2026-11-19 | Aktif | lihat [harness agent disusun](https://upahje.my/ms/articles/harness-agent-disusun) |

Satu lagi repositori MausBot menyebut dirinya repositori muat turun MIT dan pernah dipetik dalam artikel ini sehingga 24 November 2026, apabila pautan itu memulangkan 404 dan organisasi GitHub di belakangnya tidak lagi wujud. Repositori utama di atas yang masih boleh disemak.

## Apa yang sebenarnya dibenarkan oleh lesen itu kepada perniagaan?

Ini bahagian yang wajar dibaca dua kali, kerana "sumber terbuka" dan "sumber tersedia" bukan kebenaran yang sama.

Apache-2.0, yang meliputi repositori utama MausBot, membenarkan penggunaan komersial, pengubahsuaian dan pengedaran, dengan syarat anda mengekalkan notisnya. Bagi PKS Malaysia, itu bermakna anda boleh menjalankannya dalam perniagaan, mengubahnya, dan meletakkannya dalam produk, tanpa membayar projek itu.

PolyForm Noncommercial 1.0.0, yang meliputi OpenBot, membenarkan penggunaan bukan komersial sahaja. Perniagaan yang menggunakannya secara komersial memerlukan lesen berbayar. Itulah ayat paling berguna dalam artikel ini: kod OpenBot boleh dibaca dan laman mereka menulis "The source code of OpenBot is open", dan fail lesennya menyatakan anda tidak boleh menggunakannya secara komersial tanpa membayar. Baca lesen, bukan halaman utama.

Produk tertutup yang dihoskan, Grok Bot dan Dots, tidak memberikan kedua-duanya. Anda mendapat akses di bawah terma perkhidmatan, pada infrastruktur vendor, dengan peraturan penyimpanan vendor, dan anda tidak boleh menjalankannya sendiri atau membaca sumbernya.

![Tiga zon: tertutup dan dihoskan bagi Dots dan Grok Bot, sumber tersedia bagi OpenBot di bawah PolyForm Noncommercial, sumber terbuka bagi MausBot di bawah Apache-2.0](/figures/harness-licence-line-ms.svg)
*Sumber tersedia bukan sumber terbuka: lesen OpenBot bukan komersial, repo utama MausBot Apache-2.0.*

## Mengapa satu nama memetakan kepada beberapa projek?

Kerana "OpenBot" ialah sekurang-kurangnya empat projek tidak berkaitan, dan yang dipasang pada mesin ini tidak dapat dikenal pasti sekarang.

Itu bukan sekadar kaveat retorik. `nightly-labs/openbot` ialah ruang kerja agent desktop dalam jadual. Secara berasingan, `CopilotKit/OpenBot` ialah projek MIT dengan 12,887 bintang yang digambarkan sebagai alternatif terbuka kepada bot AI tertutup, `ob-f/OpenBot` ialah projek robotik yang meletakkan otak telefon pintar dalam kereta mainan, dan ada projek lebih kecil dengan nama sama. Direktori yang dipasang di sini sudah tiada, jadi projek mana yang dipasang tidak dapat dipastikan sekarang. Pembaca yang mencari "OpenBot" hari ini akan menemui projek robotik dahulu, dan ia tiada kaitan dengan harness agent.

"GrokBot" ada masalah yang lebih ringan: repositori GitHub dengan nama itu kebanyakannya panduan komuniti dan klon tentang produk xAI, bukan harness bebas. "Dots" juga bertembung dengan repositori agent yang tidak berkaitan.

## Apa yang kami hilang, dan bagaimana kami tahu?

Satu harness yang pernah dipasang di sini kini yatim, dan mesej kegagalannya ialah buktinya.

Pelancar `openmausbot` masih ada pada mesin ini, dan menjalankannya gagal dengan ralat Node `Cannot find module` yang menamakan laluan muatan yang sudah tiada. Muatannya hilang, tiada unit systemd dengan nama itu, dan tiada direktori data yang tinggal. Jadi MausBot muncul dalam jadual daripada repositorinya, bukan daripada penggunaan kami: kami menjalankannya lebih awal dalam projek ini dan tidak boleh mengesahkan semula pengalaman itu sekarang.

## Istilah mana yang patut saya guna?

"Agent harness" jika anda mahu istilah vendor, "harness" jika anda bercakap dengan orang yang sudah tahu. "AI harness" ialah kata pengubah yang vendor yang kami baca tidak gunakan. Istilahnya dibincangkan dalam [agent harness, AI harness, agent framework](https://upahje.my/ms/articles/agent-harness-atau-ai-harness).

**Baca seterusnya**

[Agent harness, AI harness, agent framework: apa maksud istilah ini](https://upahje.my/ms/articles/agent-harness-atau-ai-harness)

[Lagi tentang membeli dan memilih tool](https://upahje.my/ms/articles/category/buying-guides)

