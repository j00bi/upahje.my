---
title: "Cara menulis brief kerja automasi supaya anda tidak bayar dua kali"
description: "Lima perkara yang freelancer perlukan sebelum memberi sebut harga, templat brief yang boleh diguna semula, dan ujian penerimaan yang perlu dipersetujui sebelum kerja bermula."
slug: cara-tulis-brief-kerja-automasi
translationKey: how-to-brief-an-automation-job
date: 2026-11-19
updated: 2026-11-19
author: "UpahJe editorial"
category: buying-guides
tags: [buying-guides, automasi, brief, freelancer, malaysia]
canonical: https://upahje.my/ms/articles/cara-tulis-brief-kerja-automasi
draft: false
sources:
  - title: "MDN, glosari API (takrif integrasi yang dirujuk di sini)"
    url: "https://developer.mozilla.org/en-US/docs/Glossary/API"
    checked: 2026-11-19
---

# Cara menulis brief kerja automasi supaya anda tidak bayar dua kali

Brief yang menghalang anda daripada bayar dua kali menyatakan lima perkara sebelum sesiapa memberi sebut harga: input, output, tingkah laku apabila gagal, ujian penerimaan, dan siapa yang memiliki credentials. Freelancer yang memberi sebut harga tanpa lima perkara itu sedang meneka. Anda kemudian membayar untuk tekaan itu dua kali, sekali untuk membina yang salah dan sekali untuk membaikinya.

## Apa lima perkara yang freelancer perlukan sebelum memberi sebut harga?

Setiap satu mengubah harga, dan sebab itulah sebut harga yang tiba tanpa perkara-perkara ini bukan sebut harga.

1. **Input.** Sistem mana data itu datang, dalam format apa, dan sama ada anda boleh memberi sampelnya. Fail sampel mengalahkan penerangan setiap kali.
2. **Output.** Ke mana hasilnya pergi dan bagaimana rupanya apabila tiba. "Masuk ke perisian perakaunan saya" bukan output; "satu baris dalam spreadsheet ini dengan enam kolum ini" ialah output.
3. **Tingkah laku apabila gagal.** Apa yang patut berlaku apabila sumber terhenti, data tidak sah, atau panggilan tamat masa. Cuba semula, masuk baris gilir, atau beri amaran. Diam juga satu keputusan, dan keputusan yang mahal.
4. **Ujian penerimaan.** Semakan tepat yang menentukan kerja itu selesai, dipersetujui sebelum kerja bermula.
5. **Credentials dan pemilikan.** Akaun siapa yang memiliki kunci itu, di mana ia disimpan, dan apa yang berlaku kepadanya pada akhir kerja.

## Bagaimana rupa brief itu?

Salin ini, isikan, dan hantar dokumen yang sama kepada setiap freelancer yang anda tanya. Tujuan menghantar satu dokumen ialah supaya anda boleh membandingkan sebut harga selepas itu.

```
KERJA: [satu ayat, apa yang patut berlaku secara automatik]

INPUT
- Sumber: [nama sistem]
- Akses: [fail eksport / API / muat naik manual]
- Sampel: [nama fail yang dilampirkan, atau "tiada"]
- Jumlah: [baris sehari, dan waktu puncak]

OUTPUT
- Destinasi: [sistem atau fail]
- Bentuk: [kolum atau medan, tepat]
- Masa: [serta-merta / setiap jam / setiap malam]

APABILA GAGAL
- Jika sumber terhenti: [cuba semula / baris gilir / beri amaran kepada saya]
- Jika satu baris tidak sah: [langkau dan catat / hentikan dan beri amaran]
- Siapa diberi amaran: [nama, saluran]

UJIAN
- Selesai apabila: [semakan itu, pada data sebenar]
- Data ujian: [dari mana ia diambil]

AKSES DAN SERAHAN
- Kunci milik: [akaun saya]
- Serahan: [kod, dokumentasi, persekitaran ujian yang berfungsi]
- Sokongan selepas serahan: [hari, dan apa yang diliputi]

BAJET
- Harga tetap diperlukan: ya
- Tidak termasuk: [apa-apa yang anda tidak mahu masukkan]
```

## Ujian penerimaan apa yang perlu dipersetujui di awal?

Satu ujian, pada data sebenar, yang sama ada lulus atau gagal tanpa perdebatan.

Versi paling kukuh membandingkan hasil yang sudah diketahui betul dengan hasil automasi. Ambil pesanan minggu lepas yang sudah selesai, jalankan melalui automasi baharu, dan syaratkan jumlahnya sepadan dengan spreadsheet yang dihasilkan manusia. Ujian itu menangkap kegagalan yang penting: kolum tertukar, perbezaan pembundaran, status yang tidak pernah dikemas kini.

Persetujui ujian itu sebelum kerja bermula, secara bertulis, dan persetujui apa yang berlaku jika ia gagal. Brief tanpa ujian menyerahkan takrif "selesai" kepada orang yang dibayar untuk menyelesaikannya.

## Apa yang rosak apabila brief itu nipis?

Tiga perkara yang sama, dalam urutan yang sama, pada hampir setiap kerja.

Freelancer membina apa yang paling mudah dibina dan bukan apa yang anda perlukan, kerana brief itu memberi ruang. Kemudian harga naik apabila input sebenar muncul, kerana sebut harga itu berdasarkan tekaan. Kemudian serahan meninggalkan anda dengan sistem yang berjalan tetapi tiada cara untuk mengubahnya, kerana pemilikan tidak pernah dibincangkan.

Tiada satu pun daripada itu memerlukan freelancer yang tidak jujur. Ia memerlukan brief yang boleh dibaca dua cara, dan dua orang yang membacanya secara berbeza.

## Bagaimana saya membandingkan dua sebut harga pada brief yang sama?

Bandingkan baris demi baris dengan brief, dan anggap baris yang tidak dijawab sebagai jurang, bukan bonus.

Minta setiap freelancer memberi harga bagi lima bahagian yang sama dan menandakan apa yang tidak termasuk. Dua sebut harga hanya boleh dibandingkan apabila ia meliputi kerja yang sama. Sebut harga yang 40 peratus lebih murah biasanya mengecualikan satu bahagian, dan bahagian yang dikecualikan itu biasanya pengendalian kegagalan.

Kemudian minta kedua-duanya menerangkan ujian penerimaan. Yang boleh menerangkan cara ia berjalan pada data anda telah memahami kerja itu. Yang tidak boleh hanya memberi harga pada satu penerangan.

## FAQ

### Patutkah saya tulis brief sendiri atau biarkan freelancer cadangkan?

Tulis sendiri, walaupun kasar. Brief yang anda tulis ialah satu-satunya dokumen yang menyatakan apa yang anda benar-benar mahu, dan ia garis dasar bagi setiap sebut harga. Cadangan freelancer ialah harga dan satu tafsiran, dan anda mahu tafsiran itu datang kemudian.

### Bagaimana jika saya tidak tahu format output?

Dapatkan satu contoh sebenar dahulu. Eksport laporan atau baris yang anda mahu dihasilkan semula, dan lampirkannya. Kebanyakan kekaburan dalam brief hilang apabila ada fail yang menunjukkan sasarannya.

### Adakah harga tetap sentiasa lebih baik daripada ikut jam?

Tidak sentiasa, tetapi bagi kerja jenis ini biasanya ya, kerana skopnya boleh ditulis. Harga ikut jam sesuai apabila skop memang tidak dapat diketahui di awal, seperti menyiasat mengapa perkhidmatan pihak ketiga gagal. Jika brief itu jelas dan sebut harga masih ikut jam sahaja, tanya bahagian mana yang belum diketahui.

---

**Baca seterusnya**

[panduan membeli](https://upahje.my/ms/articles/category/buying-guides)

[kos menyambungkan API](https://upahje.my/ms/articles/apa-itu-api-untuk-pks-malaysia)
