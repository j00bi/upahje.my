---
title: "Alat Blender itu tidak buta, alat skripnya yang buta"
description: "Alat tambah itu boleh melihat hasil kerjanya. Yang tiada penghadang ialah Python bebas dalam fail hidup anda, dan README-nya menyuruh simpan dahulu."
slug: alat-blender-mcp
translationKey: blender-mcp-scene-tools
format: teardown
reader: hobbyist
date: 2026-11-24
updated: 2026-11-24
author: "UpahJe Desk"
category: buying-guides
tags: [buying-guides, blender, mcp, 3d]
cardFigure: "8 alat, satu tanpa penghadang"
canonical: https://upahje.my/ms/articles/alat-blender-mcp
draft: true
changelog:
  - date: 2026-11-24
    note: "Mula diterbitkan."
sources:
  - title: "ahujasid/mcp-for-blender, repositori (35,550 bintang pada hari dibaca, MIT, dicipta 7 Mac 2025)"
    url: "https://github.com/ahujasid/mcp-for-blender"
    checked: 2026-11-24
  - title: "README mcp-for-blender (pengesahan visual, senarai alat, amaran execute_blender_code, mod selamat)"
    url: "https://raw.githubusercontent.com/ahujasid/mcp-for-blender/main/README.md"
    checked: 2026-11-24
  - title: "Dokumentasi API Python Blender"
    url: "https://docs.blender.org/api/current/"
    checked: 2026-11-24
---

# Alat Blender itu tidak buta, alat skripnya yang buta

Alat tambah Blender yang popular menyediakan pengesahan visual: helaian berbilang sudut, pandangan kamera dan wireframe, X-ray, jalur animasi dan render, jadi agent boleh menyemak kerjanya sendiri. Yang tiada penghadang ialah `execute_blender_code`, yang menjalankan Python bebas dalam fail anda yang terbuka, dan README alat itu menyatakannya terus: "ALWAYS save your work before using it."

## Agent boleh melihat apa yang diubahnya

README menyenaraikan "Visual verification: multi-angle, camera, wireframe, X-ray and animation-strip views, plus renders, so the AI checks its own work". Alat `look` mengambil pandangan daripada `viewport`, `camera`, `angles` atau `frames`, dan melukisnya `solid`, `material`, `rendered`, `wireframe` atau `xray`.

Itu membunuh tesis malas bahawa agent yang bekerja dalam Blender itu buta. Ia tidak buta. Ia boleh merender helaian sudut dan membandingkannya dengan apa yang anda minta, iaitu semakan yang lebih banyak daripada kebanyakan sesi manusia.

## Alat yang tiada penghadang

`execute_blender_code` "runs Python in your live Blender". Python dalam Blender bukan sandbox: ia berjalan dengan kebenaran akaun pengguna anda dan API `bpy` penuh, yang boleh memadam objek, menulis semula mesh, menimpa fail dan menjalankan apa sahaja yang boleh dijalankan oleh penterjemah itu.

Alat tambah itu tahu hal ini. README-nya membawa amaran yang dipetik di atas, dan ada mod selamat pilihan: tetapkan `BLENDER_MCP_SAFE_MODE=1` dan skrip disahkan sebelum dijalankan. Pengesahan bukan jaminan, dan amaran itu kekal sebagai ayat yang menanggung beban dalam dokumentasi.

## Sempadan itu fail, bukan model

Panggilan `bpy` mengubah babak dalam ingatan. Anda melihat hasilnya apabila babak dinilai dan pandangan dilukis atau render ditulis, sebab itulah semakan visual penting: itulah satu-satunya bukti yang agent dapat bahawa perubahan itu seperti yang dimaksudkannya.

Pemulihan pula cerita lain. Jika perubahan itu buruk dan fail tidak pernah disimpan, ada satu sejarah undo antara anda dan petang yang hilang; jika fail disimpan dahulu, kes terburuk ialah membukanya semula. Sebab itulah amaran README itu tentang menyimpan, bukan tentang model yang bijak.

## Repositori itu, pada 24 November 2026

| Perkara | Nilai | Dari mana |
| --- | --- | --- |
| Bintang GitHub | 35,550 | API repositori, 24 November 2026 |
| Lesen | MIT | repositori |
| Dicipta | 7 Mac 2025 | API repositori |
| Push terakhir | 18 November 2026 | API repositori |
| Alat disenaraikan dalam README | 8 | jadual alat README |
| Sumber pandangan untuk `look` | 4 | baris alat README |
| Mod lorekan untuk `look` | 5 | baris alat README |

Projek ini dahulu bernama `blender-mcp` dan pakejnya kini `mcp-for-blender`; persediaan sedia ada terus berfungsi. Repositori itu menyebut dirinya plugin komuniti, "Not affiliated with the official Blender Foundation", dan itu penting apabila anda memutuskan berapa banyak tingkah laku Blender yang ditanggung oleh projek itu.

## Apa yang diserahkan, dan apa yang disimpan

Pendapat saya, dinyatakan sekali: serahkan geometri, penamaan, import dan persediaan babak berulang, dan simpan pas pencahayaan akhir. Pencahayaan dinilai dengan melihat render dan memutuskan sama ada ia terasa betul, dan pertimbangan itu milik anda; agent boleh menghasilkan render tetapi tidak boleh memberitahu anda bahawa gambarnya bagus.

Aliran kerja yang bertahan apabila berlaku kesilapan: simpan fail, simpan salinan sebelum larian panjang, hidupkan mod selamat, minta `look` selepas setiap perubahan, dan anggap apa-apa skrip yang menyentuh sistem fail sebagai penggunaan produksi.

---

**Bacaan lanjut**

[Apa yang sebenarnya diukur oleh satu baris papan pendahulu](https://upahje.my/ms/articles/anatomi-baris-papan-pendahulu)

[Lebih lanjut tentang membeli dan memilih alat](https://upahje.my/ms/articles/category/buying-guides)
