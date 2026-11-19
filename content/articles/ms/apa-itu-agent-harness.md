---
title: "Apa itu agent harness, dan apa yang dilakukannya dengan permintaan anda"
description: "Harness berada antara anda dan model: ia menyimpan perbualan, menjalankan tools, menghantar permintaan dan menstrim jawapan. Rupa satu mesej di dalam DeepSeek Harness 0.2.2-rc.1."
slug: apa-itu-agent-harness
translationKey: using-the-harness
date: 2026-11-19
updated: 2026-11-19
author: "UpahJe editorial"
category: definitions
tags: [definitions, agent-harness, deepseek-harness, malaysia]
canonical: https://upahje.my/ms/articles/apa-itu-agent-harness
draft: false
sources:
  - title: "Metadata pakej DeepSeek Harness (@deepseek-ai/dsh 0.2.2-rc.1, dipasang pada mesin ini)"
    url: "https://www.npmjs.com/package/@deepseek-ai/dsh"
    checked: 2026-11-19
---

# Apa itu agent harness, dan apa yang dilakukannya dengan permintaan anda

Agent harness ialah program yang berada antara anda dengan model. Ia menyimpan perbualan, menjalankan tools, menghantar setiap permintaan kepada model dan menstrim jawapan kembali kepada anda. Dalam DeepSeek Harness 0.2.2-rc.1 pada mesin ini, satu mesej yang anda taip menjadi satu turn, turn terbahagi kepada step, dan setiap step ditulis ke fail pada cakera.

Semua yang berikut datang daripada pembacaan harness yang dipasang pada mesin ini pada 19 November 2026: metadata pakejnya, dan transkrip sesi yang ditulisnya. Versi yang dipasang ialah 0.2.2-rc.1, iaitu versi yang dilaporkan oleh fail pakej dalam pemasangan itu. Di mana halaman ini menerangkan sesuatu aliran, nama rekod ialah nama yang benar-benar ada dalam transkrip.

## Apa yang berlaku kepada satu mesej, daripada ditaip hingga dijawab?

Harness merekodkan mesej anda sebagai satu turn, kemudian bekerja melalui step; setiap step boleh menghasilkan tool call, dan turn tamat apabila model berhenti meminta tools.

Transkrip pada mesin ini mengandungi jenis rekod ini, mengikut urutan satu pertukaran:

1. `turn/start` menandakan mesej anda diterima.
2. `step/start` memulakan satu pertukaran dengan model.
3. `request/header` dan `request/context` merekodkan apa yang dihantar kepada model bagi step itu.
4. `assistant/message` menyimpan jawapan, sama ada prosa atau tool call.
5. `tool/call` menamakan tool dan membawa argumennya.
6. `tool/result` menyimpan apa yang dipulangkan oleh tool.
7. `step/end` menutup step itu, dan step seterusnya bermula jika model mahukan tool lagi.
8. `turn/end` menutup turn, dan jawapan distrim kepada anda.

Perkara penting bagi pemilik perniagaan ialah nombor 7. Tugasan yang memerlukan empat tools bukan satu pertukaran dengan model, tetapi beberapa pertukaran, kerana model tidak dapat melihat hasil tool sehingga harness menjalankannya dan menghantar hasil itu kembali.

## Di mana perbualan disimpan?

Setiap sesi ialah satu direktori di bawah `.dsh/sessions`, dinamakan sempena folder kerja anda, dan ia menyimpan satu fail transkrip termampat serta satu fail lock.

Pada mesin ini laluannya kelihatan begini: `~/.dsh/sessions/--home-husni-.dsh-bot-workspace--/session-0ec7202e-ac1e-4f02-ab14-bf76b3d29de3/session.v4.jsonl.zstd`. Baca sebagai tiga bahagian: slug daripada direktori kerja, kemudian pengenal sesi, kemudian fail. Transkrip itu ialah JSON Lines termampat dengan Zstandard, satu rekod setiap baris sebelum dimampatkan, dan `session.lock` terletak di sebelahnya.

Itu wajar diketahui sebelum anda menampal kontrak pelanggan ke dalam tetingkap sembang. Perbualan itu ialah fail pada cakera anda sendiri, dalam folder yang dinamakan sempena projek anda, dan ia boleh dibaca dengan satu arahan.

## Bagaimana rupa tool call dalam aliran itu?

Rekod tool call membawa nombor turn, nombor step, pengenal panggilan, nama tool dan argumennya, dan harness, bukan model, yang menjalankannya.

Rekod `tool/call` dalam transkrip mempunyai medan data ini sahaja: `turn`, `step`, `callId`, `name`, `arguments`. Rekod `tool/result` yang sepadan tiba selepas harness benar-benar menyelesaikan kerja itu. Jadi apabila anda membaca bahawa sesuatu agent "menjalankan arahan", urutannya ialah: model memilih tool dan argumen, harness menjalankannya, dan hasilnya dihantar kembali kepada model pada step seterusnya.

## Apa yang boleh saya semak sendiri?

Tiga arahan, dan anda tidak perlu mempercayai halaman ini untuk menjalankannya.

1. `ls ~/.dsh/sessions` menyenaraikan satu direktori bagi setiap folder kerja.
2. `ls ~/.dsh/sessions/<folder>/<session>` menunjukkan fail transkrip dan locknya.
3. `zstd -dc ~/.dsh/sessions/<folder>/<session>/session.v4.jsonl.zstd | head -40` mencetak rekod pertama dalam teks biasa.

## FAQ

### Bolehkah transkrip itu dibaca oleh manusia?

Boleh, selepas dinyahmampat. Ia JSON Lines: satu objek JSON setiap baris, setiap satu dengan `type`, `seq`, `time` dan muatan `data`. Arahan `zstd` di atas mengembalikannya kepada teks tanpa alat khas.

### Adakah harness menyimpan perbualan saya selepas saya tutup?

Direktori sesi kekal pada cakera bersama transkripnya, jadi fail itu masih ada selepas tetingkap ditutup. Sama ada pemasangan anda memadam sesi lama mengikut jadual ialah tetapan pada mesin anda, bukan sesuatu yang halaman ini boleh dakwa bagi pihak anda; semak folder sesi sebelum menganggap mana-mana arah.

### Adakah setiap permintaan menghantar seluruh perbualan kepada model?

Harness merekodkan `request/header` dan `request/context` bagi setiap step, jadi setiap step ialah permintaan berasingan, bukan satu pertukaran panjang. Apa sebenarnya yang diterima pembekal di dalam permintaan itu tidak diukur oleh halaman ini, dan kami tidak akan menekanya.

---

**Baca seterusnya**

[ruang definisi](https://upahje.my/ms/articles/category/definitions)
