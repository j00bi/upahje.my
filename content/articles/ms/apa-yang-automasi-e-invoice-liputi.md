---
title: "Apa yang diliputi automasi e-Invoice, dan apa yang kekal dengan manusia"
description: "Sejak 1 Januari 2026 semua fasa berkuat kuasa, dan jurang RM3 juta hingga RM5 juta termasuk dalam skop. Apa yang dilakukan oleh penyerahan automatik, apa yang diubah oleh tetingkap 72 jam, dan keputusan mana yang tidak patut diambil oleh tool."
slug: apa-yang-automasi-e-invoice-liputi
translationKey: what-einvoice-automation-covers
date: 2026-11-23
updated: 2026-11-23
author: "UpahJe editorial"
category: buying-guides
tags: [buying-guides, e-invoice, myinvois, malaysia]
canonical: https://upahje.my/ms/articles/apa-yang-automasi-e-invoice-liputi
draft: false
sources:
  - title: "LHDN, garis masa pelaksanaan e-Invois (dikemas kini 30 Ogos 2026)"
    url: "https://www.hasil.gov.my/e-invois/pelaksanaan-e-invois-di-malaysia/garis-masa-pelaksanaan-e-invois/"
    checked: 2026-11-23
  - title: "MyInvois SDK, dokumentasi pembangun"
    url: "https://sdk.myinvois.hasil.gov.my/"
    checked: 2026-11-23
  - title: "MyInvois SDK, peraturan pengesahan dokumen"
    url: "https://sdk.myinvois.hasil.gov.my/document-validation-rules/"
    checked: 2026-11-23
  - title: "MyInvois SDK, FAQ (ketersediaan sandbox)"
    url: "https://sdk.myinvois.hasil.gov.my/faq/"
    checked: 2026-11-23
  - title: "LHDN, Garis Panduan Spesifik e-Invois Versi 4.8 (penalti, kelonggaran, PKPS)"
    url: "https://www.hasil.gov.my/e-invois/"
    checked: 2026-11-23
---

# Apa yang diliputi automasi e-Invoice, dan apa yang kekal dengan manusia

Semua fasa pembayar cukai kini berkuat kuasa, termasuk fasa antara RM3 juta dan RM5 juta, yang berada di dalam fasa 4 dan di luar pengecualian. Automasi boleh membina, mengesahkan dan menyerahkan dokumen serta mengendalikan tetingkap pembetulan 72 jam. Ia tidak boleh memutuskan sama ada sesuatu transaksi itu luar biasa, dan ia tidak boleh memikul liabiliti undang-undang untuk transaksi yang salah.

## Siapa yang wajib memfailkan, dan sejak bila?

Fasa di bawah ialah fasa LHDN sendiri, daripada halaman garis masa yang menyatakan tarikh kemas kininya sebagai 30 Ogos 2026.

| Fasa | Pendapatan atau jualan tahunan | Bermula | Status |
| --- | --- | --- | --- |
| 1 | lebih RM100 juta | 1 Ogos 2024 | Berkuat kuasa |
| 2 | lebih RM25 juta hingga RM100 juta | 1 Januari 2025 | Berkuat kuasa |
| 3 | lebih RM5 juta hingga RM25 juta | 1 Julai 2025 | Berkuat kuasa |
| 4 | hingga RM5 juta | 1 Januari 2026 | Berkuat kuasa |
| Pengecualian | kurang RM3 juta | n/a | Dikecualikan seperti dicetak |

Sekarang lihat jurang antara RM3 juta dan RM5 juta. Pengecualian berhenti di bawah RM3 juta, dan fasa 4 berjalan hingga RM5 juta, jadi perniagaan yang berputar RM4 juta termasuk dalam skop. Dua baris pada halaman yang sama, dibaca bersama. Saya pernah bertemu pemilik yang membaca baris pengecualian sahaja dan berhenti di situ.

## Apa yang diserahkan?

e-Invoice ialah versi digital dokumen yang dikeluarkan penjual, direkodkan dengan LHDN dan bukan sekadar difailkan dalam akaun anda sendiri, meliputi perniagaan-ke-perniagaan, perniagaan-ke-pengguna dan perniagaan-ke-kerajaan, dan ia dihantar kepada LHDN melalui sistem MyInvois.

Empat jenis dokumen dinamakan dalam garis panduan: invois, nota kredit, nota debit dan nota bayaran balik. Ada dua laluan. Portal MyInvois ialah kemasukan manual oleh pembayar cukai. Laluan API didokumenkan untuk sistem ERP pembayar cukai, dalam kata-kata LHDN sendiri, untuk "integrate with MyInvois System to automate the document processing" ([MyInvois SDK, dibaca 23 Nov 2026](https://sdk.myinvois.hasil.gov.my/)). Pengesahan berasingan untuk sistem pembayar cukai dan untuk sistem perantara yang bertindak bagi pihak pembayar cukai, dan ada langkah pengesahan TIN sebelum penyerahan. TIN ialah nombor pengenalan pembayar cukai yang dikeluarkan LHDN kepada perniagaan; API ialah sambungan yang digunakan perisian anda untuk menyerahkan dokumen kepada MyInvois tanpa sesiapa menaip semula.

![Empat langkah yang dilakukan mesin: bina dokumen daripada rekod anda, semak TIN, lulus lapan pengesah, hantar ke MyInvois. Di bawah, dua hasil: dalam 72 jam pembeli boleh menolak atau penjual membatalkan dan mengeluarkan semula; selepas 72 jam pembatalan ditutup dan pembetulan memerlukan nota kredit, debit atau bayaran balik](/figures/apa-yang-automasi-e-invoice-liputi.svg)
*Empat langkah berjalan setiap penyerahan. Apa berlaku selepas kesilapan bergantung pada jam.*

## Apa yang boleh diautomasikan?

Lapan pengesah berjalan pada setiap penyerahan, dan itulah sebabnya mesin melakukannya lebih baik daripada manusia yang menaip semula: struktur, medan teras, tandatangan, kesahihan pembayar cukai, dokumen rujukan, kod, pendua dan mata wang.

| Tugasan | Diautomasikan? | Mengapa |
| --- | --- | --- |
| Membina dokumen daripada rekod jualan atau belian anda | Ya | Data itu sudah ada dalam sistem anda |
| Menyemak TIN sebelum penyerahan | Ya | Ia panggilan API, bukan pertimbangan |
| Melalui lapan pengesah | Ya | Ia peraturan yang pasti |
| Menyerahkan dan menyimpan respons LHDN | Ya | Resit untuk disimpan, bukan keputusan |
| Menandakan pengesahan yang gagal berserta peraturan yang gagal | Ya | Nama peraturan ada dalam respons |
| Memutuskan sama ada transaksi itu palsu atau benar-benar luar biasa | Tidak | Pertimbangan, dan manusia yang bertanggungjawab |
| Memilih invois konsolidasi di bawah kelonggaran | Tidak | Keputusan dasar dengan kesan cukai |
| Meluluskan pembetulan selepas 72 jam | Tidak | Perlukan alasan yang boleh dipertahankan manusia |

## Apa yang diubah oleh tetingkap 72 jam?

Ia mengubah siapa yang membetulkan kesilapan, dan bila. Pembeli boleh memohon penolakan dalam 72 jam selepas pengesahan, dan penjual boleh membatalkan dalam tetingkap yang sama. Selepas 72 jam, pembatalan tidak dibenarkan, dan pembetulan memerlukan e-Invoice baharu dalam bentuk nota kredit, debit atau bayaran balik.

Jadi tool perlu memerhati jam, bukan hanya penyerahan. Integrasi yang menghantar dokumen dan melupakannya meninggalkan pembetulan kepada sesiapa yang perasan. Itulah cara nota kredit keluar tiga bulan lewat dan muncul semasa audit.

## Apa yang berlaku jika tersilap?

Garis panduan menyebut Seksyen 120 Akta Cukai Pendapatan 1967, dan ia tidak mencetak angka penalti pada mana-mana halaman yang dapat dibaca. Jadi artikel ini tidak akan memetik penalti dalam ringgit. Tiada jumlah yang diterbitkan ditemui.

Dua mekanisme bertarikh melembutkan pendedahan itu. Tempoh kelonggaran interim terpakai bagi setiap fasa, di mana pembayar cukai boleh mengeluarkan e-Invois konsolidasi bagi semua aktiviti dan e-Invois konsolidasi yang difakturkan sendiri tanpa dokumen bagi setiap transaksi, dan LHDN menyatakan ia tidak akan mendakwa di bawah Seksyen 120 sepanjang tempoh itu dengan syarat dipenuhi. Secara berasingan, program pengesahan sukarela, PKPS (Program Pengesahan Sukarela, tetingkap bagi pembayar cukai yang terlepas tarikh permulaan untuk tampil ke hadapan), berjalan dari **7 Julai 2026 hingga 31 Disember 2027** bagi pembayar cukai yang terlepas tarikh permulaan wajibnya, menggunakan versi dokumen PKPS 1.2 atau 1.3, dan meliputi semakan serta penguatkuasaan kecuali pendedahan itu melanggar syarat atau melibatkan penipuan, keingkaran sengaja atau kecuaian.

## Lima perkara ini dahulu

Lima tindakan, tiada satu pun memerlukan pembelian.

1. **Cari fasa anda** dalam jadual di atas mengikut jualan tahunan, dan tulis tarikh fasa anda bermula di sebelahnya.
2. **Semak TIN anda aktif** sebelum apa-apa lagi: nombor pembayar cukai yang salah gagal pengesahan kemudian, bukan semasa menandatangani.
3. **Eksport satu bulan invois** sebagai fail. Fail itu ialah input yang diperlukan mana-mana tool, dan mengetahui betapa bersepahnya ia membentuk sebut harga.
4. **Tanya akauntan anda sama ada kelonggaran interim terpakai**, dan dapatkan jawapannya secara bertulis.
5. **Pilih tiga invois yang anda keluarkan bulan lepas** dan latih soalan 72 jam: siapa yang akan perasan, dan berapa cepat?

## Tempat paling murah untuk bermula

Bagi yang suka mencuba, sandbox MyInvois ialah benda paling kecil yang berjalan: laman pembangun LHDN menjalankan sandbox tempat API dan ralat pengesahannya boleh diuji, dan dokumen XML atau JSON sampel akan kembali dengan pengesah yang gagal. Anda perlukan log masuk sandbox daripada laman SDK dan sesuatu yang boleh menghantar JSON, iaitu teks berstruktur, jadi curl atau skrip sepuluh baris sudah cukup. Percubaan itu percuma, dan tiada yuran setiap penyerahan muncul pada mana-mana halaman LHDN yang dibaca untuk artikel ini. Jangkakan pengesah tandatangan yang menyekat anda dahulu. Dokumen yang kelihatan betul kepada anda gagal apabila tandatangan tiada atau cacat, dan teks ralat selalunya tidak menyatakan medan yang menyebabkannya.

## Apa yang tidak dapat kami sahkan?

Portal MyInvois sendiri tidak dapat dibaca: tamat masa sambungan, kemudian hanya tajuk halaman, kerana ia aplikasi sebelah klien. Jawapan Soalan Lazim LHDN dimuatkan melalui skrip dan tiada dalam HTML yang dihidangkan. Tarikh setiap fasa di dalam jadual kelonggaran kelihatan grafik dalam PDF dan tidak diekstrak. Dan garis panduan umum yang dibaca ialah versi 4.8; versi umum yang lebih baharu mungkin ada dan tidak disahkan.

**Baca seterusnya**

[Apa yang AI agent boleh dan tidak boleh buat untuk PKS Malaysia](https://upahje.my/ms/articles/apa-yang-agent-boleh-buat)

[Lagi tentang membeli automasi](https://upahje.my/ms/articles/category/buying-guides)

## FAQ

### Saya berputar RM4 juta setahun. Adakah saya dikecualikan?

Tidak. Pengecualian ialah kurang RM3 juta, dan fasa 4 meliputi hingga RM5 juta, jadi RM4 juta termasuk dalam skop dan telah pun sejak 1 Januari 2026.

### Bolehkah sistem akauntan saya memfailkannya untuk saya?

Laluan penyerahan menyokong perantara: LHDN mendokumenkan pengesahan berasingan bagi sistem yang bertindak bagi pihak pembayar cukai. Liabiliti kekal dengan pembayar cukai, jadi soalannya siapa yang menyemak kegagalan, bukan siapa yang menekan butang hantar.

### Adakah automasi menghapuskan keperluan untuk manusia?

Ia menghapuskan penulisan semula, semakan TIN dan perjalanan pergi balik pengesah. Ia tidak menghapuskan orang yang memutuskan sama ada transaksi itu tulen, atau yang meluluskan pembetulan selepas tetingkap 72 jam tamat.

### Apa jadi kepada invois yang saya keluarkan sebelum fasa saya bermula?

Mekanisme yang diterbitkan bagi permulaan yang terlepas ialah program pengesahan sukarela, berjalan 7 Julai 2026 hingga 31 Disember 2027. Sama ada kes anda layak ialah soalan untuk LHDN atau ejen cukai anda, bukan untuk artikel ini.
