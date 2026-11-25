---
title: "Empat gerbang yang membunuh backtest buruk"
description: "Data bersih, kos dikenakan, walk-forward, permutasi, dengan kriteria bunuh: kadar menang melebihi 50%, faktor untung melebihi 1.2, 20 dagangan."
slug: gerbang-backtest
translationKey: backtest-gates
format: guide
reader: owner
date: 2026-11-25
updated: 2026-11-25
author: "UpahJe Desk"
category: side-income
tags: [side-income, dagangan, backtest, malaysia]
cardFigure: "Dua daripada empat gerbang paling banyak gagal"
canonical: https://upahje.my/ms/articles/gerbang-backtest
draft: true
changelog:
  - date: 2026-11-25
    note: "Mula diterbitkan."
sources:
  - title: "Dokumentasi Hyperliquid, pembiayaan (kadar pembiayaan dibayar setiap jam)"
    url: "https://hyperliquid.gitbook.io/hyperliquid-docs/trading/funding"
    checked: 2026-11-25
  - title: "Dokumentasi Hyperliquid, aset kekal (leverage maksimum berbeza mengikut aset, 3x hingga 40x; margin penyelenggaraan separuh margin awal pada leverage maksimum)"
    url: "https://hyperliquid.gitbook.io/hyperliquid-docs/trading/perpetual-assets.md"
    checked: 2026-11-25
---

# Empat gerbang yang membunuh backtest buruk sebelum ia menelan wang

Backtest hanya layak dibiayai selepas melalui empat semakan mengikut urutan: data bersih, kos dikenakan, walk-forward, permutasi. Kriteria bunuhnya kasar — kadar menang melebihi 50%, faktor untung melebihi 1.2, sekurang-kurangnya 20 dagangan, kemudian enam bulan bertahan secara langsung — dan kebanyakan backtest yang kelihatan untung gagal pada gerbang kedua.

## Gerbang 1: data mesti lulus semakan pertindihan

Muatkan candle, susun, dan kira. Pertindihan, jurang dan simbol yang bermula pada tarikh berbeza semuanya mengembung hasil tanpa muncul dalam ringkasan.

```python
rows = load(symbols, start, end)
rows = dedupe(rows)                    # cap masa sama dua kali
gaps = rows.groupby("symbol").size()
keep = gaps[gaps >= 20 * 24 * 60]      # minimum 20 hari minit
```

Jika sesuatu simbol mempunyai kurang daripada 20 hari data yang boleh diguna, buangkannya. Model yang dilatih pada simbol dengan tiga minggu sejarah sedang menghafal minggu pelancarannya.

## Gerbang 2: kos menukar pemenang menjadi rugi

Kenakan fi yang anda benar-benar bayar dan pembiayaan yang anda benar-benar bayar. Pada Hyperliquid, pembiayaan dibayar setiap jam, dan cagaran ialah USDC; pada Binance, halaman fi dan pembiayaan memulangkan 202 kosong pada empat URL, jadi fi taker dalam artikel ini ialah **fi yang kami gunakan, 0.045%**, dinyatakan sebagai andaian dan bukan petikan.

Strategi yang berdagang dua kali sehari membayar fi itu 730 kali setahun. Pada 0.045% sebelah, kelebihan 1% menjadi kelebihan 0.91% sebelum pembiayaan, dan pembiayaan itu setiap jam.

## Gerbang 3: walk-forward satu-satunya angka prestasi

Belah data mengikut masa, bukan secara rawak. Latih pada 70% pertama, uji pada 30% terakhir, dan jangan biarkan tempoh ujian mempengaruhi mana-mana parameter.

| Gerbang | Apa yang disemak | Kriteria bunuh |
| --- | --- | --- |
| 1. Kebersihan data | pertindihan, jurang, sejarah pendek | kurang daripada 20 dagangan dalam sampel |
| 2. Kos | fi taker dan pembiayaan setiap jam dikenakan | faktor untung 1.2 atau kurang selepas kos |
| 3. Walk-forward | tingkah laku di luar sampel | kadar menang 50% atau kurang pada tetingkap ujian |
| 4. Permutasi | sama ada kelebihan bertahan apabila pulangan dikocok | siri kocok mendapat skor dalam 10% daripada yang sebenar |

Kadar menang dan faktor untung ialah ambang yang saya gunakan: melebihi 50% dan melebihi 1.2, pada dagangan di luar sampel, dengan sekurang-kurangnya 20 daripadanya. Kurang daripada 20 dagangan ialah lambungan syiling yang ada cerita.

## Gerbang 4: kocok hasil dan lihat sama ada kelebihan bertahan

Jalankan strategi yang sama pada pulangan yang dikocok mengikut masa, seratus kali. Jika larian kocok menghasilkan faktor untung hampir sama dengan yang sebenar, strategi itu menemui bunyi dan pasaran tidak ada kaitan dengannya.

```python
real = profit_factor(backtest(prices, params))
fake = [profit_factor(backtest(shuffle(prices), params)) for _ in range(100)]
kill = real <= percentile(fake, 90)
```

## Gerbang hanya membeli enam bulan kesabaran

Lulus keempat-empatnya ialah kebenaran berdagang kecil selama enam bulan, bukan kebenaran menambah saiz. Jejak kadar menang dan faktor untung langsung pada takrifan yang sama, dan berhenti jika angka langsung jatuh di bawah gerbang selama sebulan.

Leverage terletak di sini dan hanya di sini: dokumentasi Hyperliquid menyatakan leverage maksimum "varies by asset, ranging from 3x to 40x", dan margin penyelenggaraan ialah separuh margin awal pada leverage maksimum. Bermula pada 3x dengan strategi yang lulus empat gerbang masih agresif; bermula pada 40x ialah aktiviti lain.

## Apa yang perlu dibuat minggu ini

1. Jalankan gerbang 1 pada simbol yang anda maksudkan dan kira apa yang tinggal.
2. Masukkan fi sebenar anda ke dalam backtest dan baca semula hasilnya.
3. Belah mengikut masa dan lihat hanya separuh di luar sampel.
4. Kocok seratus kali dan bandingkan.
5. Jika ia bertahan, berdagang saiz terkecil selama enam bulan.

Pendapat saya, dinyatakan sekali: gerbang ini murah dan alternatifnya tidak. Satu hujung minggu menggagalkan backtest di atas kertas lebih murah daripada sebulan mempelajari perkara yang sama dengan wang, dan pelajaran kedua biasanya menelan lebih daripada yang pertama.

---

**Bacaan lanjut**

[Bot dagangan ialah masalah data yang memakai pakaian model](https://upahje.my/ms/articles/realiti-bot-dagangan-malaysia)

[Lebih lanjut tentang pendapatan sampingan](https://upahje.my/ms/topics/freelance)
