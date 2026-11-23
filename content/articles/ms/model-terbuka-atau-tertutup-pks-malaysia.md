---
title: "Model terbuka atau tertutup: apa yang mampu dijalankan sendiri oleh PKS Malaysia"
description: "Model terbuka boleh dimuat turun dan dijalankan pada perkakasan sendiri. Berapa kosnya sebulan, bila ia mula berbaloi berbanding bayaran ikut panggilan, dan kemahiran yang diperlukan."
slug: model-terbuka-atau-tertutup-pks-malaysia
translationKey: open-vs-closed-models
date: 2026-11-19
updated: 2026-11-19
author: "UpahJe Desk"
category: definitions
tags: [definitions, model-ai, hosting-sendiri, malaysia]
canonical: https://upahje.my/ms/articles/model-terbuka-atau-tertutup-pks-malaysia
draft: false
sources:
  - title: "Mistral AI, halaman model Mistral Small 4 (parameter, lesen, harga API)"
    url: "https://docs.mistral.ai/models/mistral-small-4-0-26-03"
    checked: 2026-11-19
  - title: "Mistral AI, gambaran model (katalog model terbuka dan lesen)"
    url: "https://docs.mistral.ai/models"
    checked: 2026-11-19
  - title: "OpenAI, harga API (kadar setiap juta token)"
    url: "https://developers.openai.com/api/docs/pricing"
    checked: 2026-11-19
  - title: "DigitalOcean, harga GPU Droplets"
    url: "https://www.digitalocean.com/pricing/gpu-droplets"
    checked: 2026-11-19
---

# Model terbuka atau tertutup: apa yang mampu dijalankan sendiri oleh PKS Malaysia

Model terbuka ialah model yang failnya boleh dimuat turun dan dijalankan pada perkakasan yang anda kawal. Model tertutup hanya boleh dipanggil. Bagi kebanyakan PKS Malaysia, jawapannya masih tertutup, kerana menjalankan model sendiri memerlukan GPU sewaan, orang yang tahu mengendalikannya, dan jumlah penggunaan yang benar-benar tinggi.

## Apa yang sebenarnya dibenarkan oleh model terbuka?

Model terbuka bermakna fail model diterbitkan, jadi anda boleh meletakkannya pada mesin sendiri dan tidak perlu memanggil server pembekal. Setakat 19 November 2026, katalog Mistral menyenaraikan model terbuka di bawah tiga bentuk lesen: Apache 2.0 bagi Mistral Small 4 dan model Ministral 3, MIT bagi Z.ai GLM 5.3 dan DeepSeek V4.1 Flash, dan lesen khusus pembekal bagi Mistral Large 4 ([dokumentasi Mistral, disemak 19 Nov 2026](https://docs.mistral.ai/models)).

Dua perkara yang tidak diberikannya: penggunaan percuma, dan kebenaran untuk mengabaikan lesen. Apache 2.0 ialah lesen yang longgar, tetapi termanya ada pada halaman model dan itulah yang mengawal penggunaan anda ([halaman Mistral Small 4, disemak 19 Nov 2026](https://docs.mistral.ai/models/mistral-small-4-0-26-03)).

## Berapa kos setiap pilihan sebulan?

Bahagian bayaran ikut panggilan boleh dikira tepat kerana pembekal menerbitkan kadarnya. Bahagian hosting sendiri bergantung pada sewa GPU, dan kami hanya dapat sahkan kadar seorang pembekal.

| Perkara | Bayar ikut panggilan | Jalankan sendiri |
| --- | --- | --- |
| Apa yang dibayar | Token bagi setiap permintaan | Masa GPU, dikira ikut jam |
| Kadar yang disahkan | GPT-6 Luna: USD 0.10 setiap juta token input, USD 0.50 setiap juta token output. Mistral Small 4: USD 0.15 input, USD 0.60 output | DigitalOcean HGX B300: USD 7.94 sejam GPU |
| Kos sebulan pada 730 jam | Sifar apabila tiada penggunaan | Kira-kira USD 5,796 sebulan, sebelum storan atau GPU kedua |
| Siapa yang mengendalikannya | Pembekal | Anda, atau orang yang anda upah |
| Siapa boleh tukar model | Pembekal, mengikut dasar penghentian mereka | Anda, apabila anda mengemas kini |
| Di mana data disimpan | Wilayah pembekal | Di mana pun GPU itu disewa |

Kadar token diambil daripada halaman harga OpenAI dan halaman model Mistral, kedua-duanya disemak pada 19 November 2026 ([harga OpenAI](https://developers.openai.com/api/docs/pricing), [Mistral Small 4](https://docs.mistral.ai/models/mistral-small-4-0-26-03)). Kadar GPU pula ialah harga senarai DigitalOcean bagi HGX B300, disemak pada hari yang sama ([harga GPU DigitalOcean](https://www.digitalocean.com/pricing/gpu-droplets)).

## Pada jumlah penggunaan berapa hosting sendiri mula berbaloi?

Pada jumlah yang tiada perniagaan kecil capai: kira-kira 36 juta mesej sebulan, dengan kadar di atas.

Kiraannya, menggunakan bot FAQ WhatsApp yang mengendalikan 3,000 mesej sebulan pada kira-kira 600 token masuk dan 200 token keluar setiap mesej:

1. Itu bersamaan 1.8 juta token input dan 0.6 juta token output sebulan.
2. Dengan GPT-6 Luna, kosnya USD 0.48 sebulan. Dengan Mistral Small 4, kosnya USD 0.63.
3. Satu GPU pada USD 7.94 sejam selama 730 jam sebulan berjumlah USD 5,796.20.
4. Untuk membelanjakan USD 5,796 pada token GPT-6 Luna, anda memerlukan kira-kira 36 juta mesej sebulan, iaitu 12,000 kali ganda beban contoh itu.

Ada dua had yang perlu disebut jujur. Harga GPU itu ialah kadar senarai seorang pembekal bagi kad kelas atas, bukan masa GPU termurah yang ada, jadi titik persilangan boleh turun lebih rendah. Model 119 bilion parameter seperti Mistral Small 4 juga tidak muat pada satu GPU dengan ketepatan penuh, jadi kadar di atas ialah rujukan harga masa GPU, bukan pelan kapasiti.

Perbandingan ini juga aritmetik, bukan keupayaan. Model yang anda jalankan sendiri tidak semestinya sekuat model tertutup yang anda bayar sebelum ini, dan jurang itulah sebab sebenar kebanyakan PKS kekal dengan bayaran ikut panggilan.

## Apa yang diperlukan untuk menjalankannya sendiri?

Lima kerja, dan tiada satu pun bersifat sekali siap.

1. Menyediakan serving model. Memasang server inferens, memilih ketepatan dan batching, dan memastikan latency kekal munasabah.
2. Memantaunya. Memori GPU, kadar ralat, dan apa yang berlaku apabila satu permintaan tersekat di belakang permintaan yang panjang.
3. Mengemas kininya. Model terbuka berubah; seseorang perlu menguji sama ada versi baharu lebih baik sebelum bertukar.
4. Melindunginya. Endpoint yang menerima permintaan ialah endpoint yang boleh ditemui orang luar.
5. Membayar masa terbiar. Bil GPU tidak berhenti kerana tiada siapa menggunakan bot petang itu.

Senarai ini huraian kami tentang kerja itu, bukan tinjauan gaji atau spesifikasi jawatan.

## Apa yang patut PKS Malaysia buat suku ini?

Cuba panggil model terbuka melalui API sebelum cuba menjalankannya. Mistral sendiri menyediakan model terbuka mereka melalui API pada USD 0.15 dan USD 0.60 setiap juta token, jadi anda dapat terma lesen dan tingkah laku model itu tanpa membeli GPU atau mengupah sesiapa. Soalan tentang hosting sendiri patut ditimbulkan apabila perbelanjaan token bulanan anda hampir menyamai kos bulanan GPU, atau apabila syarat lokasi data memaksa anda.

**Baca seterusnya**

[Kos menyambungkan API di Malaysia](https://upahje.my/ms/articles/apa-itu-api-untuk-pks-malaysia)

[Lagi tentang API dan model](https://upahje.my/ms/articles/category/definitions)
## FAQ

### Perlukah saya jalankan model sendiri untuk menggunakan model terbuka?

Tidak. Banyak pembekal menyediakan model terbuka melalui API dengan harga setiap token. API Mistral sendiri meletakkan harga Mistral Small 4 pada USD 0.15 setiap juta token input dan USD 0.60 setiap juta token output ([disemak 19 Nov 2026](https://docs.mistral.ai/models/mistral-small-4-0-26-03)). Anda dapat terma lesen dan model itu tanpa memiliki perkakasan.

### Bolehkah saya jalankan model ini pada PC pejabat?

Tidak secara berguna. Model dalam artikel ini besar: Mistral Small 4 mempunyai 119 bilion parameter dengan 6.5 bilion aktif ([Mistral, disemak 19 Nov 2026](https://docs.mistral.ai/models/mistral-small-4-0-26-03)), dan itu memerlukan GPU pusat data, bukan stesen kerja. Model kecil yang dikuantisasi boleh berjalan pada komputer riba, tetapi itu tukar ganti yang berbeza dan kualitinya tidak diukur dalam artikel ini.

### Adakah hosting sendiri menyimpan data saya di Malaysia?

Hanya jika perkakasan itu berada di Malaysia. Menyewa GPU di wilayah lain memindahkan data ke sana, sama seperti memanggil API tertutup. Jika lokasi data ialah sebab anda mahu hosting sendiri, sahkan dahulu di mana mesin sewaan itu berada sebelum komited.

