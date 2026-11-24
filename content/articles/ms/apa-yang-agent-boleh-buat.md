---
title: "Apa yang AI agent boleh buat untuk PKS Malaysia"
description: "AI agent menjalankan gelung sendiri: baca tugasan, panggil tool, ulang. Apa yang dibuat tanpa penyeliaan, apa yang perlukan manusia, apa yang jangan disentuh."
slug: apa-yang-agent-boleh-buat
translationKey: what-an-ai-agent-can-do
date: 2026-11-23
updated: 2026-11-23
author: "UpahJe Desk"
category: definitions
tags: [definitions, ai-agent, automasi, malaysia]
canonical: https://upahje.my/ms/articles/apa-yang-agent-boleh-buat
draft: false
changelog:
  - date: 2026-11-23
    note: "Mula diterbitkan."
sources:
  - title: "Anthropic, gambaran Agent SDK (takrif agent harness)"
    url: "https://code.claude.com/docs/en/agent-sdk/overview"
    checked: 2026-11-23
  - title: "Anthropic, harga API Claude (Claude Haiku 5.5)"
    url: "https://docs.claude.com/en/docs/about-claude/pricing"
    checked: 2026-11-23
  - title: "Bank Negara Malaysia, API kadar pertukaran awam (kadar tengah USD/MYR 4.1145, 19 November 2026)"
    url: "https://api.bnm.gov.my/public/exchange-rate"
    checked: 2026-11-23
  - title: "Pang Jun Han, harga automasi AI (kadar projek yang diterbitkan)"
    url: "https://pangjunhan.vercel.app/ai-automation"
    checked: 2026-11-23
  - title: "KodeSME, harga automasi"
    url: "https://kodesme.klyihao.com/"
    checked: 2026-11-23
---

# Apa yang AI agent boleh dan tidak boleh buat untuk PKS Malaysia

AI agent menjalankan gelung sendiri: ia membaca tugasan, memanggil tool, melihat hasilnya dan menentukan langkah seterusnya sehingga kerja itu selesai. Itu meliputi kerja berulang yang ada garisan penamat yang jelas. Ia tidak meliputi pertimbangan, wang yang ia tidak dibenarkan pindahkan, atau apa-apa yang pelanggan perlu dijelaskan oleh manusia.

## Apa itu agent, berbanding chatbot?

Agent bertindak antara langkah; chatbot hanya menjawab. Bezanya ialah agent mempunyai tool yang boleh dipanggil (tool ialah satu perkara yang dibenarkan untuk dilakukannya, seperti menyemak pesanan atau menghantar e-mel), gelung yang berterusan selepas tool memulangkan hasil, dan transkrip, iaitu rekod bertulis tentang apa yang telah dilakukannya.

Anthropic menamakan lapisan yang menjalankan ini sebagai agent harness, iaitu program yang memegang perbualan dan menjalankan tool, yang "runs the agent loop, with sessions in an Anthropic-managed cloud sandbox or a self-hosted sandbox on your own infrastructure" ([dokumentasi Claude Code, dibaca 23 Nov 2026](https://code.claude.com/docs/en/agent-sdk/overview)). Dua akibat untuk perniagaan kecil: agent boleh menyentuh sistem sebenar, dan harness, bukan model, menentukan apa yang dibenarkannya sentuh.

## Apa yang boleh dibuatnya tanpa penyeliaan?

Kerja tanpa penyeliaan ialah kerja yang kesilapannya murah dilihat dan murah diundur.

![Tiga panel: kerja yang berjalan sendiri seperti menyusun peti masuk; kerja yang disediakan agent untuk diluluskan manusia seperti bayaran balik dan mesej pelanggan; kerja yang bukan untuk agent seperti pertimbangan dan kerja fizikal](/figures/apa-yang-agent-boleh-buat.svg)
*Susun kerja sebelum memilih tool: sendiri, disediakan, dan bukan kerja agent.*

| Apa yang dibuatnya sendiri | Mengapa ia layak |
| --- | --- |
| Membaca peti masuk dan menyusun mesej ke dalam kategori | E-mel yang tersalah kategori kelihatan dan boleh dibetulkan |
| Mengeluarkan medan daripada invois atau pesanan penghantaran dan memasukkannya | Dokumen sumber masih ada untuk dibandingkan |
| Menyalin data antara dua sistem mengikut jadual | Salinan yang gagal boleh dijalankan semula |
| Menyediakan draf balasan, laporan atau ringkasan untuk dihantar seseorang | Manusia masih menekan butang hantar |
| Memantau baris gilir dan memberi amaran apabila ambang dilanggar | Agent naik taraf isu, bukan bertindak sendiri |

## Apa yang perlukan manusia sebelum ia berlaku?

Kerja kelulusan ialah kerja yang kos tindakan salahnya tidak pulih dengan menjalankannya semula.

| Perlukan manusia | Mengapa |
| --- | --- |
| Apa-apa yang memindahkan wang: bayaran balik, pembayaran, pengecualian | Pindahan yang salah tidak dibatalkan dengan permohonan maaf |
| Menghantar mesej kepada pelanggan bagi pihak anda | Nada dan komitmen ialah keputusan perniagaan |
| Memadam atau menimpa rekod | Tiada apa yang boleh dipulihkan |
| Mengubah harga, tahap stok atau ketersediaan | Harga yang salah dihormati, bukan dibetulkan |
| Apa-apa yang berunsur undang-undang atau kawal selia: penyerahan e-Invoice, kontrak, pemfailan | Liabiliti terletak pada perniagaan, bukan pada agent |

Jadi biarkan agent menyediakan, dan manusia meluluskan. Agent yang menyediakan bayaran balik dan menunggu klik menjimatkan penulisan tanpa mengambil risiko. Saya tidak akan menjalankannya dengan cara lain, dan demo vendor yang melangkau langkah kelulusan itu yang patut anda syak.

## Apa yang tidak boleh dibuatnya sama sekali?

Empat kategori, dan tiada prompt boleh mengubahnya.

1. **Pertimbangan tanpa peraturan untuk diikut.** Sama ada aduan itu adil, sama ada pembekal boleh dipercayai, sama ada pelanggan patut dikekalkan. Agent boleh mengumpul fakta; keputusan itu bukan fakta.
2. **Apa-apa yang bersifat fizikal.** Penghantaran, pemasangan, pemeriksaan. Bot WhatsApp boleh menempah juruteknik; ia tidak boleh menukar alat ganti.
3. **Pengetahuan yang ia tidak ada.** Agent menjawab daripada apa yang dapat dicapainya. Jika stok anda hanya ada dalam kepala seseorang, agent akan yakin dan salah.
4. **Ketepatan yang dijamin.** Setiap agent kadangkala menghasilkan jawapan salah yang kelihatan munasabah. Sebab itulah lajur kelulusan itu wujud.

## Berapa kosnya dalam ringgit?

Dua bil. Yang lebih kecil itu yang dapat perhatian.

**Menjalankannya.** Kadar token diterbitkan, jadi ini aritmetik dan bukan tekaan. Pada 2,000 token input dan 500 output setiap tugasan, Claude Haiku 5.5 menelan `0.002 juta × USD 0.10 = USD 0.0002` untuk input tambah `0.0005 juta × USD 0.50 = USD 0.00025` untuk output, iaitu USD 0.00045 setiap tugasan. Pada kadar tengah Bank Negara **4.1145** (dibaca 19 November 2026), itu kira-kira RM0.00185. Seribu tugasan sebulan ialah **RM1.85**. Teh tarik di mamak berharga RM2 hingga RM3, dan itu perbandingan kami sendiri, bukan indeks yang diterbitkan.

**Membinanya.** Penerbit Malaysia memetik harga projek untuk kerja automasi: **RM400** bagi pembinaan proses mudah ([Pang Jun Han, dibaca 23 Nov 2026](https://pangjunhan.vercel.app/ai-automation)) dan **RM6,000 lebih** bagi pelaksanaan tugasan autonomi ([Autoflow Solutions, dibaca 23 Nov 2026](https://www.autoflow-solutions.com/my/services)). Pembinaan aliran kerja permulaan daripada studio bermula pada **RM1,500** ([KodeSME, dibaca 23 Nov 2026](https://kodesme.klyihao.com/)).

Jadi pembinaan beratus hingga beribu ringgit dan kos menjalankannya beberapa ringgit. Jika pembekal menyebut bil token bulanan yang besar untuk aliran kerja kecil, minta dia tunjukkan aritmetiknya terhadap kadar yang diterbitkan; aritmetik kami hanya tiga baris. Apa yang tidak dinyatakan oleh kad kadar ialah yuran sokongan bulanan selepas pelancaran, jadi tanyakan sebelum membandingkan sebut harga.

## Apa yang patut dibuat minggu ini?

Lima tindakan, tiada satu pun memerlukan pembelian atau pembangun.

1. **Tulis tugasan pertama yang anda mahu automasikan**, dan apa maksud "selesai" baginya, dalam satu ayat.
2. **Kira berapa kerap ia berlaku** selama seminggu, di atas kertas. Bawah lima kali sehari, kesnya lemah.
3. **Senaraikan sistem yang disentuhnya** dan sama ada agent hanya membaca atau juga menulis.
4. **Cari kegagalan yang akan menyakitkan**, dan tentukan sama ada manusia patut meluluskan sebelum ia berlaku.
5. **Tanya dua pembekal enam semakan di bawah**, dan bandingkan jawapannya, bukan harganya.

## Cuba sendiri

Versi paling kecil yang boleh dijalankan ialah skrip yang membaca CSV e-mel sokongan, memanggil satu model bagi setiap baris, dan menulis draf balasan ke CSV kedua. Ia belum agent. Itu disengajakan, kerana ia membuktikan gelung sebelum anda menambah tool.

- **Apa yang diperlukan:** fail baris sampel, kunci API (rentetan yang mengenal pasti akaun anda kepada pembekal model), dan kira-kira 20 baris Python. Tiada server.
- **Berapa kosnya:** pada 2,000 token input dan 500 output setiap baris, kira-kira **RM0.00185 sebaris**, jadi seratus baris kurang daripada 20 sen.
- **Di mana ia mula rosak:** model yang membaca lajur CSV akan tersalah tafsir sel kosong dan mencipta nama pelanggan. Log setiap baris input di sebelah outputnya, jika tidak anda akan menyahpepijat separuh yang salah.

## Bagaimana saya membezakan demo daripada yang terus berjalan?

Demo berjalan sekali, di hadapan anda. Yang terus berjalan bertahan pada hari yang buruk. Enam semakan. Setiap jawapan patut berupa benda yang boleh ditunjukkan.

1. **Tunjukkan transkripnya.** Agent yang berfungsi merekod apa yang dilakukannya, langkah demi langkah. Jika tiada log, tiada bukti ia berjalan.
2. **Apa berlaku apabila satu langkah gagal?** Cuba semula, masuk baris gilir, atau beri amaran. Diam bukan jawapan.
3. **Apa yang dibenarkannya sentuh?** Senarai sistem, baca atau tulis, patut cukup pendek untuk disebut dengan lantang.
4. **Siapa memiliki kunci dan akaun?** Anda, dalam akaun anda, boleh dibatalkan.
5. **Apa berlaku apabila vendor mengubah sesuatu?** Tanya siapa yang membaikinya dan pada harga berapa.
6. **Siapa yang mengawasinya bulan depan?** Agent tanpa pemilik berhenti diselenggara pada minggu selepas invois dibayar.

**Baca seterusnya**

[Kos kerja automasi di Malaysia, daripada harga yang diterbitkan](https://upahje.my/ms/articles/kos-automasi-malaysia-harga-diterbitkan)

[Lagi tentang API dan model](https://upahje.my/ms/articles/category/definitions)

## FAQ

### Adakah AI agent sama dengan perisian automasi?

Tidak. Automasi klasik mengikut peraturan yang anda tulis, tepat, mengikut urutan. Agent menentukan langkah seterusnya sendiri dalam lingkungan tool dan kebenaran yang ada, dan sebab itulah lajur kebenaran lebih penting daripada pilihan model.

### Perlukah saya ada pembangun untuk menjalankannya?

Untuk membina integrasi, biasanya ya: agent hanya berguna seluas sistem yang dapat dicapainya. Untuk mengendalikannya, tidak, jika kerja itu berasaskan kelulusan: seorang staf yang menyemak baris gilir ialah manusia dalam gelung itu.

### Bolehkah agent memfailkan penyerahan e-Invoice saya?

Ia boleh menyediakannya, dan ia tidak patut menyerahkannya tanpa semakan. Liabiliti bagi penyerahan yang salah terletak pada perniagaan, bukan pada tool itu, jadi orang yang bertanggungjawab menandatangani sehingga anda ada beberapa bulan larian bersih.

### Apa perkara pertama yang wajar diautomasikan?

Tugasan yang paling kerap dibuat pasukan anda, yang ada garisan penamat jelas dan kesilapan yang murah: kemasukan invois, penyalinan pesanan, atau menyusun peti masuk. Mulakan di tempat hasil yang salah kelihatan petang itu juga.
