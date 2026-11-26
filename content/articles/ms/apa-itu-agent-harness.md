---
title: "Apa itu agent harness, dan apa yang ia buat"
description: "Harness berada antara anda dan model: ia menyimpan perbualan, menjalankan tools, menghantar permintaan dan menstrim jawapan. Rupa satu mesej di dalamnya."
slug: apa-itu-agent-harness
translationKey: using-the-harness
date: 2026-11-19
updated: 2026-11-19
author: "Husni Ahmad"
category: definitions
tags: [definitions, agent-harness, deepseek-harness, malaysia]
canonical: https://upahje.my/ms/articles/apa-itu-agent-harness
draft: false
changelog:
  - date: 2026-11-19
    note: "Mula diterbitkan."
sources:
  - title: "Metadata pakej DeepSeek Harness (@deepseek-ai/dsh 0.2.2-rc.1, dipasang pada mesin ini)"
    url: "https://www.npmjs.com/package/@deepseek-ai/dsh"
    checked: 2026-11-19
  - title: "DeepSeek API docs, panggilan API pertama"
    url: "https://api-docs.deepseek.com/"
    checked: 2026-11-24
---

# Apa itu agent harness, dan apa yang ia buat

Agent harness ialah program yang berada antara anda dengan model. Ia menyimpan perbualan, menjalankan tools, menghantar setiap permintaan kepada model dan menstrim jawapan kembali kepada anda. Dalam DeepSeek Harness 0.2.2-rc.1 pada mesin ini, satu mesej yang anda taip menjadi satu turn, turn terbahagi kepada step, dan setiap step ditulis ke fail pada cakera.

Semua yang berikut datang daripada pembacaan harness yang dipasang pada mesin ini pada 19 November 2026: metadata pakejnya, dan transkrip sesi yang ditulisnya. Versi yang dipasang ialah 0.2.2-rc.1, iaitu versi yang dilaporkan oleh fail pakej dalam pemasangan itu. Di mana halaman ini menerangkan sesuatu aliran, nama rekod ialah nama yang benar-benar ada dalam transkrip.

## Apa yang berlaku kepada satu mesej, daripada ditaip hingga dijawab?

Harness merekodkan mesej anda sebagai satu turn, kemudian bekerja melalui step; setiap step boleh menghasilkan tool call, dan turn tamat apabila model berhenti meminta tools.

![Gambar aliran: mesej yang ditaip menjadi satu turn, harness menyediakan konteks dan menghantar permintaan, model memulangkan sama ada tool call atau jawapan, hasil tool kembali melalui harness, dan turn yang selesai ditulis ke transkrip](/figures/using-the-harness.svg)
*Satu mesej, satu turn: model membuat keputusan, harness menjalankannya, dan transkrip menyimpan rekod.*

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

## Perbualan disimpan sebagai fail transkrip dalam folder sesi

Setiap sesi ialah satu direktori di bawah `.dsh/sessions`, dinamakan sempena folder kerja anda, dan ia menyimpan satu fail transkrip termampat serta satu fail lock.

Laluan itu ada tiga bahagian: `~/.dsh/sessions/<workspace>/<session>/session.v4.jsonl.zstd`. Placeholder workspace ialah slug daripada folder kerja anda, placeholder session ialah pengenal unik, dan bahagian terakhir ialah fail transkrip. Nilai sebenar pada mesin anda berbeza daripada mesin orang lain, dan itulah tujuan placeholder. Transkrip itu ialah JSON Lines termampat dengan Zstandard, satu rekod setiap baris sebelum dimampatkan, dan `session.lock` terletak di sebelahnya.

Itu wajar diketahui sebelum anda menampal kontrak pelanggan ke dalam tetingkap sembang. Perbualan itu ialah fail pada cakera anda sendiri, dalam folder yang dinamakan sempena projek anda, dan ia boleh dibaca dengan satu arahan.

## Tool call membawa lima medan, dan harness yang menjalankannya

Rekod tool call membawa nombor turn, nombor step, pengenal panggilan, nama tool dan argumennya, dan harness, bukan model, yang menjalankannya.

Rekod `tool/call` dalam transkrip mempunyai medan data ini sahaja: `turn`, `step`, `callId`, `name`, `arguments`. Rekod `tool/result` yang sepadan tiba selepas harness benar-benar menyelesaikan kerja itu. Jadi apabila anda membaca bahawa sesuatu agent "menjalankan arahan", urutannya ialah: model memilih tool dan argumen, harness menjalankannya, dan hasilnya dihantar kembali kepada model pada step seterusnya.

## Tiga arahan untuk menyemak transkrip sendiri

Tiga arahan, dan anda tidak perlu mempercayai halaman ini untuk menjalankannya.

1. `ls ~/.dsh/sessions` menyenaraikan satu direktori bagi setiap folder kerja.
2. `ls ~/.dsh/sessions/<folder>/<session>` menunjukkan fail transkrip dan locknya.
3. `zstd -dc ~/.dsh/sessions/<folder>/<session>/session.v4.jsonl.zstd | head -40` mencetak rekod pertama dalam teks biasa.

**Baca seterusnya**

[Di mana kunci API diletakkan dalam harness, dan di mana ia tidak boleh ada](https://upahje.my/ms/articles/kunci-api-dalam-harness)

[Lagi tentang agent harness](https://upahje.my/ms/articles/category/definitions)
