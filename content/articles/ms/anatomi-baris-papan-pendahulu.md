---
title: "Apa yang sebenarnya diukur oleh satu baris papan pendahulu"
description: "SWE-bench dan Terminal-bench menilai model di dalam harness orang lain. Baris DeepSeek ialah contoh kerjanya, dan larian di belakangnya ada profil kebolehpercayaan sendiri."
slug: anatomi-baris-papan-pendahulu
translationKey: leaderboard-row-anatomy
format: dev-note
audience: developer
reader: agent
date: 2026-11-23
updated: 2026-11-23
author: "UpahJe editorial"
category: buying-guides
tags: [dev-note, penanda-aras, coding-agent]
canonical: https://upahje.my/ms/articles/anatomi-baris-papan-pendahulu
draft: true
sources:
  - title: "Papan pendahulu SWE-bench, tab Verified"
    url: "https://www.swebench.com/"
    checked: 2026-11-23
  - title: "Papan pendahulu Terminal-bench 4.1"
    url: "https://www.tbench.ai/"
    checked: 2026-11-23
  - title: "Petikan Internet Archive bagi laman perbandingan (25 Oktober 2026)"
    url: "https://web.archive.org/web/20261025232027/https://nazzysar.github.io/deepseek-benchmarks/"
    checked: 2026-11-23
  - title: "nazzysar/commandcode-goat-ecosystem-sess, transkrip sesi"
    url: "https://github.com/nazzysar/commandcode-goat-ecosystem-sess"
    checked: 2026-11-23
  - title: "nazzysar/deepseek-benchmarks, repositori dan checksum"
    url: "https://github.com/nazzysar/deepseek-benchmarks"
    checked: 2026-11-23
---

# Apa yang sebenarnya diukur oleh satu baris papan pendahulu

Lima perkara, dan skor hanyalah satu: model, agent yang memandunya, tetapan, skor, dan kos. Baca dua yang pertama sebelum angka. Baris Terminal-bench bagi DeepSeek berbunyi 38.5% ± 3.8% di bawah **Claude Code**, dengan 8.2 bilion token, jadi ia hasil model DeepSeek di dalam harness orang lain.

## Apa yang ada dalam satu baris papan pendahulu?

![Gambar landskap dengan lajur model, agent, tetapan, skor dan kos. Baris contoh ialah DeepSeek V4.1 Flash 1017 pada max, dijalankan di bawah Claude Code pada Terminal-bench 4.1, dengan skor 38.5 peratus tambah tolak 3.8 dan 8.2 bilion token. Kaki nota menyatakan tiada satu pun CommandCode atau OpenCode muncul dalam lajur agent](/figures/anatomi-baris-papan-pendahulu.svg)
*Baca lajur agent dahulu: ia menentukan angka siapa yang dimiliki oleh skor itu.*

Halaman Terminal-bench mencetak lajurnya sebagai RANK, MODEL, AGENT, RESOLUTION RATE, RELEASE DATE, TOKENS dan COST. Baris DeepSeek berbunyi:

| Medan | Nilai seperti dicetak |
| --- | --- |
| Model | DeepSeek V4.1 Flash 1017 (max) |
| Agent | Claude Code |
| Kadar penyelesaian | 38.5% ± 3.8% |
| Token | 8.2B |
| Tarikh keluaran | Okt 17, 2026 |

Tukar agent dan angkanya berubah, dan itulah sebabnya lajur itu wujud.

## Nama mana yang benar-benar ada pada papan

Lajur agent SWE-bench Verified hanya menyenaraikan mini-SWE-agent. Terminal-bench 4.1 menyenaraikan Claude Code, Codex, Antigravity CLI, GitHub Copilot, Grok Build dan mini-SWE-agent. Tiada satu pun papan meletakkan CommandCode atau OpenCode dalam lajur agent.

Nama model pula soalan berasingan, dan lebih nipis daripada yang disarankan pemasaran. SWE-bench Verified ada DeepSeek V3.2 (high) pada 70.00% selesai dengan kos purata $0.45, dan DeepSeek V3.2 Reasoner pada 60.00% dengan kos purata $0.03, kedua-duanya di bawah mini-SWE-agent. SWE-bench tiada entri untuk DeepSeek V4.1 Flash atau V4 Pro: ketiadaan pada papan, bukan skor buruk. Direktori larian terbaharu Aider polyglot yang kelihatan bertarikh 23 Ogos 2025 dan baris teratasnya gpt-5 (high) pada 88.0% untuk $29.08, iaitu bukan bacaan semasa.

## Apa yang diterbitkan oleh perbandingan itu, dan apa yang direkod larian

Halaman arkib, petikan 25 Oktober 2026, menyenaraikan tiga demo interaktif untuk Pusingan 1: DeepSeek Platform, OpenCode Go dan CommandCode GOAT, setiap satu laluan demo di bawah konsep vivarium. Katalog itu buktinya: setiap entri membawa tajuk, penerangan, laluan dan tone, dan tiada skor, tempoh, kiraan token atau kos. Demo itu sendiri ada dalam `nazzysar/deepseek-benchmarks`, dan hash SHA-256 mereka sepadan dengan `rounds/checksums.json` repositori itu; apabila diimbas untuk teks, ia membawa angka dalam permainan sahaja, tanpa kapsyen masa bina, kiraan token, kos atau skor.

Rekod sesi lengan GOAT lebih memberi maklumat daripada demonya. Tiga transkrip yang disunting dalam `nazzysar/commandcode-goat-ecosystem-sess` membawa 1,123, 582 dan 1,091 rekod. Sesi lead mencuba semula 33 kali: 23 SERVER, 10 TRANSPORT, 0 TIMEOUT; merentas ketiga-tiganya, 94 cubaan semula terbahagi 57 / 37 / 0. Lima turn berlangsung 7,565.5 s, 2,636.0 s, 150.5 s, 117.6 s dan 3.9 s, berjumlah 10,473.5 s, kira-kira 2 jam 55 minit. Larian itu membuat 161 tool call, 140 step, 138 mesej assistant dan 25 mesej pengguna, pada `deepseek/deepseek-v4.1-flash` melalui pembekal `commandcode-goat`.

Itu profil kebolehpercayaan, dan ia tidak mengatakan apa-apa tentang kualiti output. Tiada kiraan token dan tiada medan kos dalam rekod itu, dan model data laman itu juga tiada medan kos, jadi tiada perbandingan kos boleh dibina daripadanya.

## FAQ

### Bolehkah skor Terminal-bench dibandingkan dengan skor SWE-bench?

Tidak. Penanda aras berbeza, agent berbeza, set tugasan berbeza. Angka itu tidak berkongsi skala.

### Mengapa angka 38.5% bukan hasil CommandCode atau OpenCode?

Kerana lajur agent menyatakan Claude Code. Modelnya milik DeepSeek; harness yang memandunya bukan mana-mana CLI itu.

### Apa yang dibuktikan oleh rekod sesi GOAT?

Bahawa lengan itu terus berjalan melalui 94 cubaan semula dan hampir tiga jam. Ia tidak membuktikan outputnya bagus, dan ia tiada data token atau kos.

---

**Baca seterusnya**

[CommandCode, OpenCode, DeepSeek: tiga nama, tiga jenis benda](https://upahje.my/ms/articles/commandcode-opencode-deepseek-angka)

[Lagi tentang membeli dan memilih tool](https://upahje.my/ms/articles/category/buying-guides)
