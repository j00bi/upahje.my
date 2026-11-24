---
title: "Klip percuma berharga satu malam, bukan RM61.78"
description: "OpusClip mengenakan USD 15, iaitu RM61.78 ditukar. Dua repo MIT memotong klip pada mesin sendiri tanpa bayaran, dan sari kata Melayu belum dibuktikan."
slug: klip-video-sendiri
translationKey: self-hosted-clipping
format: teardown
reader: owner
date: 2026-11-24
updated: 2026-11-24
author: "UpahJe Desk"
category: buying-guides
tags: [buying-guides, video, klip, kendiri, malaysia]
cardFigure: "USD 15 sebulan ialah RM61.78, jika ditukar"
canonical: https://upahje.my/ms/articles/klip-video-sendiri
draft: false
changelog:
  - date: 2026-11-24
    note: "Mula diterbitkan."
sources:
  - title: "OpusClip, harga (Starter USD 15 sebulan, USD sahaja)"
    url: "https://www.opus.pro/pricing"
    checked: 2026-11-24
  - title: "Bank Negara Malaysia, API kadar pertukaran (kadar tengah USD 4.1185)"
    url: "https://api.bnm.gov.my/public/exchange-rate"
    checked: 2026-11-24
  - title: "iamajmeena/neonclipping, repositori (MIT, dicipta 19 November 2026)"
    url: "https://github.com/iamajmeena/neonclipping"
    checked: 2026-11-24
  - title: "haziqahmedqasmi/PeakCut, repositori (MIT, dicipta 14 November 2026)"
    url: "https://github.com/haziqahmedqasmi/PeakCut"
    checked: 2026-11-24
---

# Klip percuma berharga satu malam, bukan RM61.78

Pelan Starter OpusClip ialah USD 15 sebulan, iaitu RM61.78 pada kadar tengah Bank Negara 4.1185 pada 24 November 2026, dan tiada penerbit Malaysia mencetak harga ringgit untuk langganan klip langsung. Dua repo berlesen MIT yang muncul pada minggu yang sama memotong klip pada mesin sendiri tanpa bayaran, dan kedua-duanya belum menunjukkan sari kata Melayu.

## Langganan itu berharga dalam dolar

OpusClip mencetak "USD 15/mo" untuk Starter dan menjualnya bulanan sahaja. Itu satu-satunya harga yang jelas pada halaman yang dibaca; tier Pro berada di sebalik togol tahunan/bulanan dan pemilih pek, dan angkanya tidak ditangkap sebagai nombor statik.

Angka ringgit di atas ialah penukaran, bukan harga Malaysia. Tiada penerbit yang menjual langganan klip kepada orang Malaysia mencetak harganya pada mana-mana halaman yang dibaca, dan menampilkan dolar yang ditukar sebagai harga tempatan ialah cara langganan RM45 menjadi RM62 dalam bajet.

## Dua repo tiba pada minggu yang sama

`neonclipping` dicipta pada 19 November 2026 dan mempunyai 2,313 bintang setakat 24 November 2026: MIT, Python, "paste a link, get captioned 9:16 clips in about two minutes". `PeakCut` dicipta pada 14 November 2026 dan mempunyai 1,848 bintang setakat 24 November 2026: MIT, Python, kendiri, bawa kunci AI sendiri.

Kedua-duanya muda, kedua-duanya masih bergerak, dan kedua-duanya sudah melepasi angka bintang yang tersebar ketika pelancaran, yang mengingatkan bahawa kiraan bintang hanya benar pada minit ia dibaca: `neonclipping` bergerak satu antara pek dan semakan ini.

## Apa kos laluan percuma sebaliknya

Mesin dengan GPU, elektrik, dan satu malam untuk memasang dan menala. Jadual ukuran neonclipping sendiri melaporkan 97 saat untuk memotong strim 85 minit dalam mod Fast, pada satu mesin dengan RTX 2060 dan 16 thread.

Angka itu mesin penulis, bukan mesin anda dan bukan laptop Malaysia. Kad yang lebih perlahan bermakna tunggu lebih lama, dan tiada ujian mana-mana repo pada perkakasan Malaysia.

## Angkanya, sebelah menyebelah

| Perkara | OpusClip Starter | neonclipping | PeakCut |
| --- | --- | --- | --- |
| Harga seperti dicetak | USD 15 sebulan | 0 | 0 |
| Ringgit sebulan, ditukar pada 4.1185 | 61.78 | 0 | 0 |
| Fi lesen | tiada | 0, MIT | 0, MIT |
| Masa setiap klip, seperti diterbitkan | tidak dicetak | 97 s untuk strim 85 minit | tidak dicetak |
| Bintang GitHub, setakat 24 November 2026 | tiada | 2,313 | 1,848 |
| Sari kata Melayu dibuktikan | tiada | belum dibuktikan | Inggeris sahaja |

Dua sifar itu kos lesen, bukan kos keseluruhan. Masa anda dan mesin itu nyata, dan jadual ini tidak boleh menilai keduanya untuk anda.

## Di mana laluan percuma patah

**Sari kata Melayu.** neonclipping mendakwa 52 bahasa sari kata melalui Whisper dan tidak menamakan Melayu antaranya, serta tidak menerbitkan sampel atau angka ketepatan Melayu. PeakCut "hears English by default" dan menyatakan "captions on the clips are in English", dengan Arab sebagai satu-satunya laluan bukan Inggeris yang didokumenkan. Jika penonton anda membaca sari kata Melayu, tiada repo menunjukkan ia berfungsi.

**Apa yang model boleh lihat.** Bahagian had neonclipping sendiri menyatakan LLM tempatan "sees text only; it cannot see the screen", dan semakan visual pilihannya mati secara lalai serta boleh menambah masa CPU. PeakCut memotong mengikut kekuatan bunyi apabila tiada kunci diberi.

## Jumlah di mana membatalkan berbaloi

Kiraannya: RM61.78 membeli empat klip sebulan pada RM15.45 setiap satu, lapan pada RM7.72, dan dua belas pada RM5.15. Kos marginal laluan percuma ialah 97 saat GPU bagi sumber 85 minit, jadi dua belas klip menelan kira-kira sembilan belas minit masa mesin sebulan.

Dua belas klip ialah angka yang saya gunakan, dan itu pertimbangan, bukan penemuan bersumber. Di bawahnya, anda membayar RM5 hingga RM15 sekeping untuk kemudahan; di atasnya, kos laluan percuma tetap dan langganan tidak membeli apa-apa yang mesin anda sendiri tidak boleh buat.

Pemasangan tetap satu malam. Itu kos sebenar di pihak percuma, dan ia dibayar sekali.

## Apa yang perlu dibuat minggu ini

1. Kira klip yang anda terbitkan bulan lepas, bukan yang anda niatkan.
2. Pasang satu repo pada mesin yang anda sudah miliki dan potong satu video panjang.
3. Perhatikan output untuk perkataan Melayu jika sari kata anda dalam Melayu; tiada repo akan memberitahu sejauh mana kualitinya.
4. Masa larian itu, dan bandingkan dengan RM61.78 langganan.
5. Putuskan berdasarkan kiraan, bukan demo.

Kesilapan paling murah di sini ialah membayar setahun klip yang tidak pernah disiarkan.

---

**Bacaan lanjut**

[Kos kerja automasi di Malaysia: harga yang diterbitkan](https://upahje.my/ms/articles/kos-automasi-malaysia-harga-diterbitkan)

[Lebih lanjut tentang membeli dan memilih alat](https://upahje.my/ms/articles/category/buying-guides)
