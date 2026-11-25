---
title: "CommandCode, OpenCode, DeepSeek: bukan jenis alat yang sama"
description: "Satu CLI berbayar, satu CLI percuma, satu API. Harga yang diterbitkan, perubahannya, dan satu larian yang menunjukkan kod keluar sifar bukan kejayaan."
slug: commandcode-opencode-deepseek-angka
translationKey: commandcode-opencode-deepseek-numbers
date: 2026-11-23
updated: 2026-11-23
author: "Husni Ahmad"
category: buying-guides
audience: developer
format: dev-note
tags: [buying-guides, coding-agent, harga]
canonical: https://upahje.my/ms/articles/commandcode-opencode-deepseek-angka
draft: false
changelog:
  - date: 2026-11-23
    note: "Mula diterbitkan."
sources:
  - title: "Papan pendahulu SWE-bench, tab Verified"
    url: "https://www.swebench.com/"
    checked: 2026-11-23
  - title: "Papan pendahulu Terminal-bench 4.1"
    url: "https://www.tbench.ai/"
    checked: 2026-11-23
  - title: "Papan pendahulu Aider polyglot"
    url: "https://aider.chat/docs/leaderboards/"
    checked: 2026-11-23
  - title: "CommandCode, harga"
    url: "https://commandcode.ai/pricing"
    checked: 2026-11-23
  - title: "OpenCode, dokumentasi langganan Go"
    url: "https://opencode.ai/docs/console/go"
    checked: 2026-11-23
  - title: "DeepSeek, harga API"
    url: "https://api-docs.deepseek.com/quick_start/pricing"
    checked: 2026-11-23
  - title: "Hacker News, Show HN: Command Code GOAT (5 Ogos 2026)"
    url: "https://news.ycombinator.com/item?id=49188656"
    checked: 2026-11-23
---

# CommandCode, OpenCode dan DeepSeek bukan jenis alat yang sama

Ini tiga jenis benda berbeza, dan perkataannya penting sebelum harganya. `dsh` ialah DeepSeek Harness, harness baris arahan yang kami jalankan di sini. "Lengan" pula ialah salah satu produk yang dicuba pada tugasan yang sama, dan larian ini ada tiga: CommandCode, OpenCode dan DeepSeek melalui `dsh`. CommandCode ialah CLI pengekodan berbayar. OpenCode ialah CLI pengekodan percuma berlesen MIT dengan langganan pilihan. DeepSeek ialah vendor model dengan API. Apa yang menyusul ialah harga yang diterbitkan setiap satu, di mana angkanya sudah bergerak, dan apa yang ditunjukkan satu larian. Bahagian penanda aras, dan sebab perbandingan skor "CommandCode lawan OpenCode" tidak wujud, ialah nota pembangun yang berasingan.

## Bagaimana rupa harganya seperti diterbitkan?

CommandCode menjual tier bulanan, dan setiap tier berbayar membawa yuran pemprosesan tanpa angka.

| Tawaran | Tier | Harga seperti dicetak |
| --- | --- | --- |
| CommandCode | Go | $1/bulan + yuran pemprosesan, $10 kredit disertakan |
| CommandCode | GOAT | $10/bulan + yuran pemprosesan, sehingga $100 kredit |
| CommandCode | Pro | $20/bulan |
| CommandCode | Max 10× | $100/bulan + yuran pemprosesan, $150 kredit |
| CommandCode | Provider (pelan API) | $15/bulan + yuran pemprosesan |
| OpenCode | agent itu sendiri | Percuma, lesen MIT |
| OpenCode | Go | $10/bulan |
| OpenCode | Go Plus | $40/bulan |
| OpenCode | Go Teams | $20 setiap ahli sebulan, minimum dua ahli |
| DeepSeek | input deepseek-flash, cache miss | $0.15 luar puncak / $0.30 puncak setiap 1M token |
| DeepSeek | output deepseek-flash | $0.60 luar puncak / $1.20 puncak setiap 1M token |

Yuran pemprosesan ialah baris yang perlu ditanya, kerana "plus processing fee" dicetak pada lima tier dan yurannya tidak muncul di mana-mana pada halaman itu, sama ada sebagai angka atau pautan.

## Di mana angkanya berubah?

Tawaran CommandCode sendiri sudah bergerak sejak Ogos, dan kedua-dua versi masih boleh dipetik.

Satu kiriman Hacker News pada **5 Ogos 2026** mengumumkan "Command Code GOAT, $10/month for $70 of credits across 30 models". Halaman harga hari ini menunjukkan tier GOAT $10/bulan yang sama dengan "up to $100 in credits", dan halaman model menyebut "All 107" model. Tier sama, harga sama, kredit lebih banyak dan model lebih banyak. Itu perubahan promosi biasa, dan ia penting kerana ulasan yang ditulis pada Ogos menerangkan tawaran yang tidak lagi wujud.

Pengajarannya ialah angka bertarikh memerlukan tarikhnya, atau ia menjadi dakwaan tentang hari ini yang tiada siapa boleh semak.

Angka 38.5% yang tersebar bagi DeepSeek ialah Terminal-bench 4.1, iaitu DeepSeek V4.1 Flash 1017 di bawah Claude Code, jadi ia keputusan model di dalam harness orang lain dan bukan keputusan mana-mana CLI yang dinamakan di sini, dan ia tidak boleh dibandingkan dengan angka SWE-bench kerana penanda aras, agent dan set tugasnya berbeza.

## Apa yang kami jalankan sendiri?

Satu tugasan, dalam satu harness, dicetak sebagai catatan sampingan dan bukan sebagai perbandingan: `dsh` 0.2.2-rc.1 menulis ciri kecil dalam 95.4 saat merentas 10 turn dan 14 tool call, menghasilkan dua fail, dan ujian projek lulus 3 daripada 3.

Yang patut diingat ialah apa yang berlaku pada dua lengan lain. Kedua-duanya enggan menulis apa-apa dalam lalai bukan interaktifnya, dan kedua-duanya masih keluar dengan kod 0. Kod keluar sifar bermakna proses itu tamat. Ia tidak bermakna kerjanya berlaku. Mana-mana kerja CI atau skrip malam yang mempercayai kod keluar sahaja sedang mengukur benda yang salah, dan inilah mod kegagalan yang perlu diuji pada hari pertama.

Kami tidak berjaya menjalankan dua lengan lain, jadi artikel ini tidak membuat sebarang dakwaan tentang kualiti outputnya.

## Apa yang perlu disemak sebelum membayar
Lima tindakan, tiada satu pun memerlukan langganan.

1. **Pilih satu tugasan sebenar daripada backlog anda**, cukup kecil untuk siap dalam sejam, dan jalankannya dalam harness yang anda sudah ada.
2. **Catat masanya**, dan kira turn serta tool call yang dilaporkan harness. Tiga angka itu menerangkan larian lebih baik daripada mana-mana papan pendahulu.
3. **Periksa sama ada fail benar-benar wujud**, bukan sama ada proses keluar dengan bersih.
4. **Jalankannya dua kali** dengan prompt yang sama. Harness yang berjaya sekali dan gagal sekali ialah pembelian yang berbeza.
5. **Sebelum membayar sesuatu tier, tanya berapa yuran pemprosesannya** dalam ringgit, dan dapatkan secara bertulis.

Tiada cara jujur untuk menghasilkan semula papan pendahulu. Yang boleh anda hasilkan semula ialah baris anda sendiri.

Ambil satu tugasan, jalankannya dalam satu harness, dan catat lima medan yang sama seperti papan cetak: model, agent, tetapan, skor (adakah ujian lulus), dan kos dalam token atau ringgit. Itu penanda aras anda, ia setara dengan dirinya bulan depan, dan ia tidak bergantung pada halaman pemasaran sesiapa.

Satu perkara yang akan menggigit anda ialah kod keluar. Larian yang keluar dengan 0 tanpa menulis fail kelihatan lulus dalam setiap log anda. Periksa artifaknya, setiap kali.

