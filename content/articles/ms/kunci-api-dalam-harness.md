---
title: "Di mana kunci API anda diletakkan dalam harness, dan di mana ia tidak boleh ada"
description: "Harness membaca kunci anda daripada pemboleh ubah persekitaran atau stor credentialsnya apabila memanggil pembekal. Apa yang disahkan kunci itu, empat tempat ia tidak boleh muncul, dan apa yang perlu dibuat apabila ia bocor."
slug: kunci-api-dalam-harness
translationKey: harness-api-keys
date: 2026-11-19
updated: 2026-11-19
author: "Husni Sarafi"
category: buying-guides
tags: [buying-guides, kunci-api, keselamatan, agent-harness]
canonical: https://upahje.my/ms/articles/kunci-api-dalam-harness
draft: false
sources:
  - title: "Metadata pakej DeepSeek Harness (tingkah laku stor credentials yang diperhatikan pada mesin ini)"
    url: "https://www.npmjs.com/package/@deepseek-ai/dsh"
    checked: 2026-11-19
---

# Di mana kunci API anda diletakkan dalam harness, dan di mana ia tidak boleh ada

Harness menyimpan kunci anda di luar perbualan. Ia membaca kunci itu daripada pemboleh ubah persekitaran atau daripada stor credentialsnya sendiri pada saat ia memanggil pembekal. Kunci itu mengenal pasti akaun anda, bukan setiap permintaan, dan sebab itulah ia tidak boleh muncul dalam mesej sembang, fail yang di-commit, tangkapan skrin, atau kod yang berjalan dalam pelayar.

![Gambar aliran: aplikasi anda memanggil harness, harness membaca kunci daripada pemboleh ubah persekitaran atau stor rahsia, menghantarnya dalam pengepala permintaan HTTPS, dan pembekal menyemaknya terhadap akaun anda sebelum model menjawab. Panel kedua menyenaraikan empat tempat kunci tidak boleh muncul: mesej sembang, fail yang di-commit, tangkapan skrin atau log, dan kod di sebelah klien](/figures/harness-api-keys.svg)
*Kunci bergerak bersama permintaan tetapi milik akaun, dan empat tempat itu kekal terlarang.*

## Di mana kunci itu sebenarnya berada?

Di dua tempat sahaja: pemboleh ubah persekitaran yang boleh dibaca oleh proses, atau stor credentials harness itu sendiri, iaitu fail pada mesin anda.

Pemboleh ubah persekitaran ialah bentuk paling mudah. Dalam harness ini, rahsia yang disimpan sampai kepada proses sebagai pemboleh ubah persekitaran yang dinamakan sempena rahsia itu, dan harness membacanya apabila perlu memanggil pembekal. Stor credentials pula pilihan kedua, fail yang disimpan pada cakera dan bukan dalam profil shell anda, sebab itulah ia boleh disandarkan, dihadkan kebenarannya, dan diputar di satu tempat.

Sama ada cara, kunci itu ialah fail atau persekitaran, bukan satu baris dalam perbualan. Perbezaan itulah keseluruhan artikel ini: model tidak perlu melihat kunci itu, dan harness yang meletakkannya dalam prompt akan membocorkannya pada setiap permintaan.

## Apa yang disahkan oleh kunci itu?

Akaun, bukan permintaan. Pembekal mencari kunci itu, menemui akaun pemiliknya, dan menggunakan kebenaran serta bil akaun itu untuk apa sahaja yang diminta oleh permintaan tersebut.

Tiga akibat mengikutinya, dan setiap satu mengubah cara anda mengendalikan kunci.

1. **Satu kunci bukan satu permintaan.** Kunci yang digunakan seribu kali masih satu credentials dengan satu set kebenaran. Membatalkannya memutuskan setiap pemanggil yang menggunakannya, dan sebab itulah anda mahu kunci berasingan mengikut tujuan dan bukan satu kunci untuk semuanya.
2. **Had perbelanjaan milik akaun.** Kunci yang bocor membelanjakan wang anda pada kadar pembekal sehingga anda perasan, bukan sehingga permintaan seterusnya tamat.
3. **Kunci itu tidak menyatakan tool mana yang bertanya.** Pembekal mengenal akaun, bukan skrip. Jadi jejak audit bermula pada log anda sendiri, bukan papan pemuka pembekal.

## Di mana kunci itu tidak boleh ada?

Empat tempat, dan ia meliputi hampir setiap kebocoran sebenar: mesej sembang, fail yang di-commit, tangkapan skrin atau log, dan kod di sebelah klien.

1. **Mesej sembang.** Menampal kunci ke dalam perbualan menghantarnya kepada pembekal model sebagai sebahagian daripada prompt, dan harness menulis perbualan itu ke cakera. Kunci itu kemudian tinggal dalam transkrip, mungkin dalam sandaran, mungkin dalam tiket yang seseorang buka kemudian.
2. **Fail yang di-commit.** `.env` dalam repositori ialah kebocoran paling biasa. Walaupun selepas dipadam, nilainya kekal dalam sejarah git, dan tolakan ke repositori awam ialah pendedahan kekal.
3. **Tangkapan skrin atau log.** Output nyahpepijat yang mencetak keseluruhan pengepala permintaan, atau tangkapan skrin skrin tetapan, membawa kunci itu tanpa sesiapa berniat. Penapisan log ialah tetapan yang wajar disemak sebelum anda berkongsi output dengan kontraktor.
4. **Kod di sebelah klien.** Apa sahaja yang sampai ke pelayar bersifat awam. Kunci dalam JavaScript bahagian hadapan, aplikasi mudah alih, atau halaman statik boleh didapati oleh sesiapa yang membuka alat pembangun, tidak kira bagaimana ia disamarkan.

## Apa yang perlu saya buat apabila kunci bocor?

Batalkan dahulu, kemudian putar, kemudian siasat, mengikut urutan itu. Membatalkan ialah satu-satunya langkah yang menghentikan perbelanjaan.

1. **Batalkan kunci itu di pembekal dengan segera.** Bukan padam fail, bukan tukar kata laluan. Batalkan credentials itu sendiri, kerana salinan fail bukan yang digunakan oleh penyerang.
2. **Keluarkan kunci baharu dan kemas kini satu tempat ia disimpan.** Jika ia dalam pemboleh ubah persekitaran, kemas kini pemboleh ubah itu dan mulakan semula proses. Jika ia dalam stor credentials, gantikannya di situ.
3. **Semak penggunaan di pembekal bagi tempoh antara kebocoran dan pembatalan.** Kunci yang terdedah selama seminggu mungkin telah digunakan. Halaman penggunaan, bukan log ralat, yang memberitahu anda.
4. **Cari punca ia keluar.** Geledah sejarah repositori, folder transkrip, dan mana-mana dokumen kongsi. Kebocoran yang puncanya tidak dikenal pasti akan berulang.
5. **Sempitkan kunci baharu.** Jika pembekal anda menyokong skop atau had perbelanjaan, gunakannya. Kunci baharu dengan kebenaran luas yang sama tanpa had akan mengulangi pendedahan yang sama.

Urutannya lebih penting daripada ketelitiannya. Pasukan yang memutar dahulu dan membatalkan kemudian biasanya terus membayar untuk kunci yang sama.

**Baca seterusnya**

[Apa yang agent harness lakukan dengan permintaan anda](https://upahje.my/ms/articles/apa-itu-agent-harness)

[Lagi tentang membeli dan memilih tool](https://upahje.my/ms/articles/category/buying-guides)
## FAQ

### Patutkah saya guna pemboleh ubah persekitaran atau stor credentials harness?

Guna stor credentials jika anda mahu satu tempat untuk memutar dan satu set kebenaran fail untuk dilindungi. Guna pemboleh ubah persekitaran jika kunci itu disuntik oleh sistem penggunaan yang anda sudah percaya. Kedua-duanya selamat; kunci yang ditulis terus ke dalam fail sumber bukan kedua-duanya.

### Bolehkah pasukan saya berkongsi satu kunci?

Boleh, dan anda kehilangan keupayaan untuk mengatakan siapa melakukan apa. Kunci berasingan mengikut orang atau integrasi menjadikan pembatalan tepat dan halaman penggunaan pembekal boleh dibaca. Berkongsi satu kunci bermakna sebarang kebocoran daripada mana-mana ahli pasukan memaksa semua orang memutar.

### Adakah kunci tamat tempoh?

Itu bergantung pada pembekal, jadi semak pembekal anda daripada menganggap. Kunci tanpa tamat tempoh ialah credentials yang anda mesti ingat untuk diputar, dan kebanyakan pasukan tidak melakukannya. Tetapkan peringatan kalendar jika pembekal tiada tamat tempoh paksa.

