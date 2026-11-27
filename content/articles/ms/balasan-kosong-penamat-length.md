---
title: "Balasan kosong dengan penamat length tetap dicaj"
description: "Tiga daripada empat panggilan memulangkan sifar aksara selepas membelanjakan 4,000 token berfikir. Status 200, dan wang tetap keluar dari akaun."
slug: balasan-kosong-penamat-length
translationKey: empty-reply-length-finish
format: field-test
reader: owner
date: 2026-11-27
updated: 2026-11-27
author: "Husni Ahmad"
category: definitions
audience: publication
tags: [definitions, api, kos, model-penaakulan]
cardFigure: "4,000 token penaakulan, 0 aksara dipulangkan"
canonical: https://upahje.my/ms/articles/balasan-kosong-penamat-length
changelog:
  - date: 2026-11-27
    note: "Mula diterbitkan."
sources:
  - title: "OpenAI, panduan reasoning (token penaakulan tidak kelihatan melalui API, memenuhi tetingkap konteks dan dicaj sebagai token output)"
    url: "https://platform.openai.com/docs/guides/reasoning"
    checked: 2026-11-27
  - title: "Anthropic, extended thinking (usage.output_tokens_details.thinking_tokens melaporkan berapa banyak token output yang dicaj ialah penaakulan dalaman)"
    url: "https://docs.claude.com/en/docs/build-with-claude/extended-thinking"
    checked: 2026-11-27
  - title: "DeepSeek, model dan harga (output USD 1.20 setiap 1M token pada waktu puncak, 0.60 luar puncak; input cache-miss 0.30 puncak)"
    url: "https://api-docs.deepseek.com/quick_start/pricing"
    checked: 2026-11-27
---

# Balasan kosong dengan penamat length tetap dicaj

Empat permintaan dihantar pada 27 November 2026. Tiga kembali dengan **HTTP 200**, `finish_reason: "length"`, **sifar aksara kandungan**, dan **4,000 token penaakulan** dibelanjakan pada setiap satu. Yang keempat memulangkan 8,345 aksara. Keempat-empatnya dicaj.

Kegagalan ini senyap dengan cara yang paling buruk. Tiada ralat, tiada pengecualian dilemparkan, dan klien yang menyemak `response.status_code == 200` akan menulis tiga rentetan kosong ke dalam pangkalan data lalu beredar.

## Apa yang dipulangkan oleh empat panggilan itu

Prompt sama, siling 4,000 token sama, dua model, dengan bajet berfikir ditetapkan dan tidak ditetapkan:

| Model | Tetapan usaha | Saat | Penamat | Kandungan | Token penaakulan |
| --- | --- | --- | --- | --- | --- |
| deepseek-v4.1-flash | tidak ditetapkan | 26.2 | length | **0 aksara** | 4,000 |
| deepseek-v4.1-flash | low | 24.5 | length | **0 aksara** | 4,000 |
| glm-5.3-flash | tidak ditetapkan | 60.4 | length | **0 aksara** | 4,000 |
| glm-5.3-flash | low | 25.0 | stop | 8,345 aksara | **27** |

Bandingkan lajur penaakulan dengan siling itu. Setiap panggilan yang gagal menghasilkan tepat 4,000 token penaakulan, iaitu tepat `max_tokens`. Model membelanjakan seluruh bajet untuk berfikir dan tiada baki untuk menjawab.

## Length ialah siling, bukan ralat

`finish_reason: "length"` bermaksud penjanaan berhenti kerana mencapai `max_tokens`. Ia bukan amaran tentang kualiti output dan bukan ralat HTTP. Apabila model penaakulan menemui siling itu semasa masih berfikir, anda menerima sampul respons yang sah berisi mesej kosong.

Pemikiran itu tidak kelihatan dan tetap dicaj. OpenAI menyatakannya secara langsung: token penaakulan *"are not visible via the API"* tetapi *"occupy space in the model's context window and are billed as output tokens."* Anthropic mendedahkannya sebagai nombor: `usage.output_tokens_details.thinking_tokens` melaporkan berapa banyak token output yang dicaj sebenarnya penaakulan dalaman.

Jadi wang bergerak, akaun didebitkan, dan muatannya ialah rentetan kosong.

## Apa kosnya kepada tiada

Pada kadar puncak DeepSeek yang diterbitkan, **USD 1.20 setiap juta token output**, 4,000 token penaakulan ialah **USD 0.0048**, atau kira-kira **dua sen** pada 4.1165 ringgit sedolar.

Dua sen bukan masalahnya. Masalahnya ialah apa yang berlaku di sekelilingnya. Kerja kelompok yang menggelung 400 baris pada dua sen sebaris membelanjakan lapan ringgit untuk menghasilkan tiada, dan kerja berjadual yang berbuat begitu setiap malam membelanjakan 240 ringgit sebulan untuk rentetan kosong. Tiada siapa perasan, kerana setiap panggilan berjaya.

## Menetapkan usaha rendah menyelamatkan satu model, bukan yang lain

Inilah bahagian yang perlu dibawa ke dalam kod anda sendiri, kerana ia menyanggah pembetulan yang jelas.

Saya menyangka menurunkan usaha penaakulan menyelesaikan seluruh kelas kegagalan ini. Pada 27 November ia tidak. `glm-5.3-flash` turun daripada 4,000 token penaakulan ke **27**, dan memulangkan 8,345 aksara dalam 25 saat. `deepseek-v4.1-flash` tetap membelanjakan **4,000 token penaakulan** dan memulangkan tiada dalam kedua-dua tetapan.

Parameter sama, prompt sama, hasil bertentangan. Apa pun yang dilakukan penyedia dengan `reasoning_effort`, ia bukan bajet yang dijamin, dan ia tidak mudah dipindahkan antara model. Anggap ia sebagai petunjuk yang perlu disahkan bagi setiap model, bukan tetapan yang dikonfigurasi sekali.

## Semak kandungan, bukan status

Pengawal itu empat baris dan tempatnya dalam klien, bukan dalam pemanggil:

```python
msg = resp["choices"][0]
content = (msg.get("message") or {}).get("content") or ""
details = (resp.get("usage") or {}).get("completion_tokens_details") or {}

if not content.strip():
    raise RuntimeError(
        f"empty content: finish={msg.get('finish_reason')} "
        f"reasoning={details.get('reasoning_tokens')} "
        f"completion={resp['usage']['completion_tokens']}"
    )
```

Dua butiran menjadikan mesej ralat itu berguna kemudian. `finish_reason` memberitahu siling mana yang dicapai. `reasoning_tokens` memberitahu sama ada bajet pergi ke pemikiran, yang membezakan jawapan terpotong daripada jawapan yang benar-benar kosong.

Catat bilangan token penaakulan pada setiap panggilan, bukan hanya pada kegagalan. Model yang bahagian penaakulannya naik daripada 5% kepada 90% token output sedang menuju ke kegagalan ini sebelum ia tiba, dan trend itu kelihatan dalam log beberapa hari sebelum rentetan kosong muncul.

## Naikkan siling dan baca bil

Ada dua pembetulan jujur dan keduanya menuju arah bertentangan. Naikkan `max_tokens` supaya berfikir dan menjawab kedua-duanya muat, yang menambah kos setiap panggilan dan tidak menyembunyikan apa-apa. Atau kekalkan siling dan tukar kepada model yang menghormati petunjuk usaha, yang jadual di atas tunjukkan sebagai perbezaan sebenar antara dua model dengan input serupa.

Yang tidak berfungsi ialah menganggap 200 sebagai kejayaan. Kod status menerangkan pengangkutan, dan kegagalan ini bergerak dengan sempurna.

---

**Bacaan lanjut**

[Ke mana kunci API pergi dalam harness, dan ke mana jangan](https://upahje.my/ms/articles/kunci-api-dalam-harness)

[Apa yang RM100 sebulan beli dalam AI](https://upahje.my/ms/articles/bajet-rm100-ai-malaysia)

[Uji satu pesanan di telefon sebelum anda kongsi pautan](https://upahje.my/ms/articles/uji-satu-pesanan-sebelum-lancar)
