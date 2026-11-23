---
title: "CommandCode, OpenCode, DeepSeek: apa sebenarnya yang diukur oleh angka yang diterbitkan"
description: "Tiada papan pendahulu menjalankan CommandCode atau OpenCode sebagai agent. SWE-bench dan Terminal-bench menilai model di dalam harness orang lain, jadi perbandingan antara dua CLI ialah kesilapan kategori."
slug: commandcode-opencode-deepseek-angka
translationKey: commandcode-opencode-deepseek-numbers
date: 2026-11-23
updated: 2026-11-23
author: "UpahJe editorial"
category: buying-guides
tags: [buying-guides, coding-agent, penanda-aras, malaysia]
canonical: https://upahje.my/ms/articles/commandcode-opencode-deepseek-angka
draft: false
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

# CommandCode, OpenCode, DeepSeek: apa sebenarnya yang diukur oleh angka yang diterbitkan

Ini tiga jenis benda berbeza. CommandCode ialah CLI pengekodan berbayar. OpenCode ialah CLI pengekodan percuma berlesen MIT dengan langganan pilihan. DeepSeek ialah vendor model dengan API. Tiada papan pendahulu yang diterbitkan dalam pusingan ini menjalankan mana-mana CLI itu sebagai agent, jadi perbandingan skor "CommandCode lawan OpenCode" tidak wujud untuk dipetik. Yang ada ialah model DeepSeek yang dinilai di dalam harness orang lain.

## Apa yang ada dalam satu baris papan pendahulu?

Lima perkara, dan skor hanyalah satu daripadanya: model, agent yang memandunya, tetapan, skor, dan kos. Baca dua yang pertama sebelum angka.

Halaman Terminal-bench 4.1 menjadikan ini jelas kerana lajurnya ialah RANK, MODEL, AGENT, RESOLUTION RATE, RELEASE DATE, TOKENS dan COST. Baris DeepSeek berbunyi:

![Gambar landskap dengan lajur model, agent, tetapan, skor dan kos. Baris contoh ialah DeepSeek V4.1 Flash 1017 pada max, dijalankan di bawah Claude Code pada Terminal-bench 4.1, dengan skor 38.5 peratus tambah tolak 3.8 dan 8.2 bilion token. Kaki nota menyatakan tiada satu pun CommandCode atau OpenCode muncul dalam lajur agent](/figures/anatomi-baris-papan-pendahulu.svg)
*Baca lajur agent dahulu: ia menentukan angka siapa yang dimiliki oleh skor itu.*

| Medan | Nilai seperti dicetak |
| --- | --- |
| Model | DeepSeek V4.1 Flash 1017 (max) |
| Agent | Claude Code |
| Kadar penyelesaian | 38.5% ± 3.8% |
| Token | 8.2B |
| Tarikh keluaran | Okt 17, 2026 |

Jadi angka itu milik model DeepSeek yang berjalan di bawah Claude Code. Ia bukan hasil CommandCode dan bukan hasil OpenCode. Tukar agent, angkanya berubah, dan itulah sebabnya lajur agent wujud.

## Nama mana yang benar-benar ada pada papan?

Lajur agent SWE-bench Verified hanya menyenaraikan mini-SWE-agent. Terminal-bench 4.1 menyenaraikan Claude Code, Codex, Antigravity CLI, GitHub Copilot, Grok Build dan mini-SWE-agent. Tiada satu pun papan meletakkan CommandCode atau OpenCode dalam lajur agent.

Nama model pula soalan berasingan, dan jawapannya lebih nipis daripada yang disarankan pemasaran:

- **SWE-bench Verified** ada DeepSeek V3.2 (high) pada 70.00% selesai dengan kos purata $0.45, dan DeepSeek V3.2 Reasoner pada 60.00% dengan kos purata $0.03. Kedua-duanya di bawah mini-SWE-agent, tab Verified, Bash Only ditanda, disusun mengikut peratus selesai.
- **SWE-bench tiada entri untuk DeepSeek V4.1 Flash atau V4 Pro.** Itu ketiadaan pada papan, bukan skor buruk.
- **Aider polyglot sudah lapuk.** Direktori larian terbaharu yang kelihatan bertarikh 23 Ogos 2025 dan baris teratasnya gpt-5 (high) pada 88.0% untuk $29.08. Papan yang belum melihat model 2026 tidak boleh menyusunnya, jadi artikel ini tidak memetiknya sebagai semasa.

Ringkasan jujurnya: satu-satunya skor yang diterbitkan dan menamakan model semasa DeepSeek meletakkannya pada 38.5% ± 3.8% di Terminal-bench 4.1, di bawah Claude Code, dengan 8.2B token. Selebihnya yang berbunyi seperti perbandingan ialah dakwaan vendor atau benang perbincangan.

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

Pengajarannya bukan bahawa satu angka itu salah. Ia bahawa angka bertarikh memerlukan tarikhnya, atau ia menjadi dakwaan tentang hari ini yang tiada siapa boleh semak.

## Apa yang kami jalankan sendiri?

Satu tugasan, dalam satu harness, dicetak sebagai catatan sampingan dan bukan sebagai perbandingan: `dsh` 0.2.2-rc.1 menulis ciri kecil dalam 95.4 saat merentas 10 turn dan 14 tool call, menghasilkan dua fail, dan ujian projek lulus 3 daripada 3.

Yang patut diingat ialah apa yang berlaku pada dua lengan lain. Kedua-duanya enggan menulis apa-apa dalam lalai bukan interaktifnya, dan kedua-duanya masih keluar dengan kod 0. Kod keluar sifar bermakna proses itu tamat. Ia tidak bermakna kerjanya berlaku. Mana-mana kerja CI atau skrip malam yang mempercayai kod keluar sahaja sedang mengukur benda yang salah, dan inilah mod kegagalan yang perlu diuji pada hari pertama.

Kami tidak berjaya menjalankan dua lengan lain, jadi artikel ini tidak membuat sebarang dakwaan tentang kualiti outputnya.

## Apa yang patut dibuat minggu ini?

Lima tindakan, tiada satu pun memerlukan langganan.

1. **Pilih satu tugasan sebenar daripada backlog anda**, cukup kecil untuk siap dalam sejam, dan jalankannya dalam harness yang anda sudah ada.
2. **Catat masanya**, dan kira turn serta tool call yang dilaporkan harness. Tiga angka itu menerangkan larian lebih baik daripada mana-mana papan pendahulu.
3. **Periksa sama ada fail benar-benar wujud**, bukan sama ada proses keluar dengan bersih.
4. **Jalankannya dua kali** dengan prompt yang sama. Harness yang berjaya sekali dan gagal sekali ialah pembelian yang berbeza.
5. **Sebelum membayar sesuatu tier, tanya berapa yuran pemprosesannya** dalam ringgit, dan dapatkan secara bertulis.

## Cuba sendiri

Tiada cara jujur untuk menghasilkan semula papan pendahulu. Yang boleh anda hasilkan semula ialah baris anda sendiri.

Ambil satu tugasan, jalankannya dalam satu harness, dan catat lima medan yang sama seperti papan cetak: model, agent, tetapan, skor (adakah ujian lulus), dan kos dalam token atau ringgit. Itu penanda aras anda, ia setara dengan dirinya bulan depan, dan ia tidak bergantung pada halaman pemasaran sesiapa.

Satu perkara yang akan menggigit anda ialah kod keluar. Larian yang keluar dengan 0 tanpa menulis fail kelihatan lulus dalam setiap log anda. Periksa artifaknya, setiap kali.

## Apa yang diterbitkan oleh perbandingan itu?

Tiga demo interaktif untuk Pusingan 1, dan tiada angka. Halaman arkib, petikan 25 Oktober 2026, menyenaraikan DeepSeek Platform, OpenCode Go dan CommandCode GOAT, setiap satu sebagai laluan demo di bawah konsep vivarium: "A Closed Ecology", "Abyssal Vivarium", "Vivarium Nº 7" ([arkib, dibaca 23 Nov 2026](https://web.archive.org/web/20261025232027/https://nazzysar.github.io/deepseek-benchmarks/)).

Katalog itu ialah buktinya. Setiap entri membawa tajuk, penerangan, laluan dan tone, dan tiada apa-apa lagi: tiada skor, tempoh, kiraan token atau kos. Sebab itulah memuatkan ketiga-tiganya tidak boleh menentukan kelajuan atau harga untuk anda.

Demo itu sendiri masih ada, dalam repositori hidup dan bukan dalam petikan arkib. Arkib mengambil galeri, katalog dan tiga URL pemapar, dan tiada apa-apa di bawah `rounds/`. Ketiga-tiga fail `rounds/round-1/*/index.html` ada dalam `nazzysar/deepseek-benchmarks`, dan hash SHA-256 mereka sepadan dengan `rounds/checksums.json` repositori itu sendiri ([repo, dibaca 23 Nov 2026](https://github.com/nazzysar/deepseek-benchmarks)). Apabila diimbas untuk teks, ia membawa angka dalam permainan sahaja, seperti "SEALED 12 · IV · 1887" dan "120 × 72 cells", tanpa kapsyen masa bina, kiraan token, kos atau skor.

Demo menentukan dua perkara. Sama ada ia berjalan dalam pelayar anda, dan sama ada anda suka hasilnya. Ia tidak menentukan skor, kos, token atau kebolehpercayaan, kerana tiada satu pun daripada itu diterbitkan.

## Apa yang ditunjukkan oleh sesi GOAT?

Ia menunjukkan bagaimana larian itu berkelakuan: cubaan semula, masa, langkah. Repositori `nazzysar/commandcode-goat-ecosystem-sess` menyimpan tiga transkrip sesi yang telah disunting daripada lengan CommandCode GOAT, dan ia rekod larian itu sendiri dan bukan baris papan pendahulu ([repo, dibaca 23 Nov 2026](https://github.com/nazzysar/commandcode-goat-ecosystem-sess)).

| Apa yang ada dalam rekod | Nilai |
| --- | --- |
| Transkrip | lead, critic, prover: 1,123 / 582 / 1,091 rekod |
| Cuba semula dalam sesi lead | 33, iaitu 23 SERVER, 10 TRANSPORT, 0 TIMEOUT |
| Cuba semula merentas ketiga-tiganya | 94, terbahagi 57 / 37 / 0 |
| Turn | 5, berlangsung 7,565.5 s, 2,636.0 s, 150.5 s, 117.6 s dan 3.9 s |
| Jumlah masa | 10,473.5 s, kira-kira 2 jam 55 minit |
| Aktiviti | 161 tool call, 140 step, 138 mesej assistant, 25 mesej pengguna |
| Model dan pembekal | `deepseek/deepseek-v4.1-flash`, pembekal `commandcode-goat` |

Itulah rupa larian yang sukar dari dalam: satu turn mengambil lebih dua jam, dan cubaan semula didominasi kerosakan server dan pengangkutan dan bukan tamat masa. Tiada satu pun daripada itu mengatakan outputnya bagus. Ia mengatakan lengan itu terus berjalan.

Tiada kiraan token dan tiada medan kos dalam rekod itu. Setiap nama medan token dicari merentas transkrip yang dinyahkod dan tiada, dan model data laman itu juga tiada medan kos. Jadi tiada perbandingan kos boleh dibina daripadanya, dan artikel ini tidak mengimplikasikan satu.

Angka yang ada pada kami, setiap satu dengan asalnya:

| Angka | Apa maksudnya | Asal |
| --- | --- | --- |
| 38.5% ± 3.8% | DeepSeek V4.1 Flash 1017 (max), di bawah Claude Code, Terminal-bench 4.1 | Papan pendahulu Terminal-bench, dibaca 23 Nov 2026 |
| $10/bulan GOAT + yuran pemprosesan | Sehingga $100 kredit, tier CommandCode seperti dicetak | Halaman harga vendor, dibaca 23 Nov 2026 |
| $10/bulan Go, agent di bawah MIT | Langganan pilihan OpenCode, dan lesen agent itu | Dokumentasi vendor dan repositori, dibaca 23 Nov 2026 |
| 95.4 s, 10 turn, 14 tool call, 3/3 ujian | Satu larian `dsh` pada satu tugasan, dua fail ditulis | Ukuran kami, 23 Nov 2026 |

Dua angka masih tiada, dan kedua-duanya sempit. Nota keluaran DeepSeek mencetak carta tanpa nilai dalam teks halaman, dan yuran pemprosesan CommandCode tiada angka pada mana-mana halaman yang dibaca.

**Baca seterusnya**

[Harness agent: siapa yang membuatnya, dan apa yang benar-benar sumber terbuka](https://upahje.my/ms/articles/landskap-harness-agent-sumber-terbuka)

[Lagi tentang membeli dan memilih tool](https://upahje.my/ms/articles/category/buying-guides)

## FAQ

### Adakah CommandCode lebih baik daripada OpenCode?

Tiada penanda aras yang diterbitkan menjawab soalan itu, kerana tiada satu pun produk muncul sebagai agent pada mana-mana papan. Papan menilai model di dalam harness tetap. Selain itu, ia dakwaan vendor atau larian seorang individu.

### Bolehkah saya bandingkan angka 38.5% DeepSeek dengan angka SWE-bench?

Tidak. Penanda aras berbeza, agent berbeza, set tugasan berbeza. Dua angka itu tidak berkongsi skala, dan memasangkannya ialah cara jadual menjadi mengelirukan.

### Mengapa artikel ini tidak memetik papan pendahulu Aider?

Kerana larian terbaharu yang kelihatan bertarikh 23 Ogos 2025. Papan lapuk tidak boleh mengatakan apa-apa tentang model 2026, dan memetiknya lebih buruk daripada meninggalkannya.

### Satu perkara apa yang perlu disemak sebelum mempercayai demo coding agent?

Sama ada fail ditulis dan ujian lulus, bukan sama ada arahan keluar dengan 0. Larian kami sendiri menunjukkan dua harness keluar dengan bersih tanpa menulis apa-apa.
