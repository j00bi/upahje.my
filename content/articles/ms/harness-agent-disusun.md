---
title: "Empat CLI agent pada satu mesin: apa yang kami uji"
description: "Hanya satu daripada empat menyelesaikan tugasan hujung ke hujung. Tiga lagi dinilai daripada versi dan konfigurasi, bukan penanda aras."
slug: harness-agent-disusun
translationKey: agent-harnesses-ranked
date: 2026-11-19
updated: 2026-11-19
author: "Husni Ahmad"
category: buying-guides
tags: [buying-guides, agent-harness, perbandingan, malaysia]
canonical: https://upahje.my/ms/articles/harness-agent-disusun
draft: false
changelog:
  - date: 2026-11-19
    note: "Mula diterbitkan."
sources:
  - title: "Metadata pakej DeepSeek Harness (@deepseek-ai/dsh 0.2.2-rc.1)"
    url: "https://www.npmjs.com/package/@deepseek-ai/dsh"
    checked: 2026-11-19
  - title: "CLI Claude Code pada mesin ini (versi dilaporkan oleh binari)"
    url: "https://docs.anthropic.com/en/docs/claude-code"
    checked: 2026-11-19
  - title: "CLI Codex pada mesin ini (versi dilaporkan oleh binari)"
    url: "https://github.com/openai/codex"
    checked: 2026-11-19
  - title: "CLI OpenCode pada mesin ini (versi dilaporkan oleh binari)"
    url: "https://opencode.ai/docs"
    checked: 2026-11-19
---

# Empat CLI agent pada satu mesin: apa yang kami uji

DeepSeek Harness mendapat skor tertinggi 4.35 daripada 5, OpenCode kedua dengan 4.15, Claude Code ketiga dengan 3.70 dan Codex CLI keempat dengan 3.45. Skor itu datang daripada lima kriteria berwajaran, dan setiap satu dinilai hanya berdasarkan pemerhatian pada mesin ini pada 19 November 2026. Tiada satu pun di bawah ini ialah pengetahuan umum tentang tools tersebut.

## Bagaimana skor itu dibina?

Setiap tool dinilai 1 hingga 5 pada lima kriteria, dan kriteria itu diberi wajaran untuk PKS Malaysia yang mahukan automasi serta kawalan kos.

| Kriteria | Wajaran | Mengapa wajaran itu |
| --- | --- | --- |
| Kawalan pembekal dan kos | 30% | Tuas terbesar pada bil bulanan ialah model mana dan laluan bil mana yang boleh digunakan |
| Automasi tanpa interaksi | 20% | Jika ia tidak boleh berjalan tanpa penyeliaan, ia tidak boleh dijadualkan |
| Integrasi MCP dan tool | 20% | Ini menentukan sama ada agent boleh menyentuh sistem anda langsung |
| Kebolehlanjutan | 15% | Mendapat tingkah laku baharu tanpa menunggu pembekal |
| Jejak operasi | 15% | Cakera, sandaran dan kos mesin bagi pasukan kecil |

Sesuatu sel mendapat 5 hanya apabila pemerhatiannya jelas dan lengkap. Kriteria yang tiada dalam nota kami dilabel "tidak disahkan" dan tidak menyumbang apa-apa, bukan dirata-ratakan kepada nilai tengah yang sopan. Kawalan pembekal dan kos, MCP serta kebolehlanjutan ialah skor editorial yang berpaut pada baris setiap tool dalam jadual, bukan kuantiti yang diukur: jadual menyatakan sesuatu tool menyokong sesuatu laluan, bukan sebaik mana ia melakukannya.

## Empat harness, satu mesin, satu hari

Empat harness, satu mesin, satu hari. Versi, laluan pemasangan, konfigurasi, permukaan automasi, MCP, pilihan pembekal, kebolehlanjutan dan jejak cakera.

Apa yang diliputi dan tidak: keempat-empatnya dipasang dan dikonfigurasikan pada mesin ini, dan setiap sel di atas dibaca daripada pemasangan itu dengan menjalankan `--version`, `--help` atau memeriksa laluan konfigurasi. Saya menjalankan DeepSeek Harness dari hujung ke hujung dalam sesi ini. Claude Code, Codex dan OpenCode diukur oleh Chief pada mesin yang sama pada hari yang sama, dan saya tidak menggunakan tiga itu dari hujung ke hujung. Jadi ini susunan bagi apa yang dapat kami periksa, bukan dakwaan bahawa keempat-empatnya dijalankan melalui tugasan yang sama.

| | DeepSeek Harness | Claude Code | Codex CLI | OpenCode |
| --- | --- | --- | --- | --- |
| Versi | 0.2.2-rc.1 | 2.1.296 | 0.146.0 | 1.18.11 |
| Pemasangan | pakej npm `@deepseek-ai/dsh`, dibut oleh profil | binari pada `~/.hermes/node/bin/claude` | binari pada `~/.hermes/node/bin/codex` | `~/.opencode/bin/opencode` |
| Konfigurasi | lapisan patch YAML di bawah `$DSH_HOME/profiles` serta `cordis.patch.yml` | `~/.claude.json` serta `~/.claude/{skills,sessions,projects}` | `~/.codex/config.toml` serta `auth.json` | `~/.config/opencode/opencode.jsonc` serta `opencode providers` |
| Tanpa interaksi | profil, termasuk satu `headless` yang disertakan | `-p` / `--print` | `codex exec` | `opencode run` |
| MCP | server MCP mengikut profil; tiga aktif dalam sesi kami | `--mcp-config` | `codex mcp`, juga `codex mcp-server` | `opencode mcp` |
| Pilihan pembekal | mana-mana laluan serasi OpenAI atau Anthropic yang ditakrifkan dalam profil | model Anthropic, `--model` | auth OpenAI melalui `login`, tetapan model dalam `config.toml` | `opencode providers` mengurus credentials |
| Kebolehlanjutan | bundle plugin, komposisi profil, skills, agent teams | `~/.claude/skills`, JSON `--agents`, subagent | `config.toml`, MCP, `exec-server` eksperimen | `opencode agent`, MCP, server ACP |
| Jejak cakera | 3.2 GB | 116 KB | 246 MB | 62 MB |

## Susunan itu keluar daripada kiraan yang boleh dihasilkan semula

Susunan itu keluar daripada kiraan di bawah, dan kiraan itu boleh dihasilkan semula daripada jadual di atas.

| Kriteria (wajaran) | DeepSeek Harness | Claude Code | Codex CLI | OpenCode |
| --- | --- | --- | --- | --- |
| Kawalan pembekal dan kos (30%) | 5 | 2 | 2 | 4 |
| Automasi tanpa interaksi (20%) | 4 | 4 | 4 | 4 |
| Integrasi MCP dan tool (20%) | 5 | 4 | 5 | 4 |
| Kebolehlanjutan (15%) | 5 | 5 | 3 | 4 |
| Jejak operasi (15%) | 2 | 5 | 4 | 5 |
| Jumlah berwajaran | 4.35 | 3.70 | 3.45 | 4.15 |

Jejak cakera dinilai pada skala yang dinyatakan: 5 bagi bawah 100 MB, 4 bagi bawah 500 MB, 2 bagi bawah 5 GB. Automasi tanpa interaksi mendapat 4 dan bukan 5 bagi keempat-empatnya kerana setiap satu mempunyai satu laluan yang didokumenkan dan kami tidak menguji larian berjadual bagi mana-mana daripadanya.

## Setiap tool menang pada kriteria yang berbeza

DeepSeek Harness menang pada pilihan pembekal, MCP dan kebolehlanjutan, dan kalah pada cakera.

Baris pembekalnya satu-satunya yang berbunyi "mana-mana laluan serasi OpenAI atau Anthropic", dan itulah kriteria 30% yang melakukan sebahagian besar kerja. MCP-nya mengikut profil dengan tiga server aktif semasa sesi kami. Kebolehlanjutannya merangkumi bundle plugin, komposisi profil, skills dan agent teams. Sebaliknya, 3.2 GB ialah kira-kira 13.3 kali Codex dan sekitar 28,900 kali Claude Code pada cakera, sebab itulah ia mendapat 2 pada jejak operasi.

OpenCode ialah tool paling seimbang dalam set ini: 4, 4, 4, 4, 5, tanpa satu sel lemah.

Tiada 5 di luar jejak cakera, dan tiada 3 atau lebih rendah di mana-mana. Bagi pasukan kecil yang tidak mahu kejutan, bentuk itulah hujahnya.

Claude Code menang pada jejak cakera dan kebolehlanjutan, tetapi terhad pada pembekal.

Pada 116 KB ia pemasangan terkecil antara empat ini, kira-kira 550 kali lebih kecil daripada 62 MB OpenCode, dan skills serta subagent-nya ialah cerita kebolehlanjutan paling lengkap yang kami perhatikan. Baris pembekalnya, "model Anthropic, `--model`", yang menahannya pada 3.70.

Codex CLI menang pada MCP, kerana ia satu-satunya antara empat ini yang didokumenkan sebagai klien MCP dan server MCP sekali gus.

Laluan automasinya (`codex exec`) kukuh dan jejak cakeranya pertengahan. Baris pembekalnya hanya OpenAI melalui `login`, dan `exec-server` ditandakan eksperimen, dan itulah yang meletakkannya di tempat keempat.

## OpenMausBot dikeluarkan kerana gagal dilancarkan

OpenMausBot dikeluarkan, dan bukan kerana ia kalah. Binarinya ada tetapi gagal dilancarkan, pemasangan global dan direktori datanya sudah tiada, dan unit systemd-nya tidak aktif. Kami mengujinya dan ia tidak dapat berjalan, jadi ia tidak dinilai dan tidak disusun paling bawah.

Tidak disahkan bagi keempat-empatnya: kualiti jawapan, latency, kos token, kebolehpercayaan sepanjang minggu, atau tingkah laku di bawah beban. Kami mengukur apa yang ada dalam jadual dan tidak lebih. Naik taraf versi boleh mengubah mana-mana sel di sini, dan itulah risiko menerbitkan nombor yang terikat pada versi: 0.146.0 dan 1.18.11 ialah nilai hari ini, bukan sifat kekal.

## Empat arahan untuk mengaudit setiap nombor

Empat arahan dan satu semakan fail, dan anda boleh mengaudit setiap nombor dalam jadual.

1. Jalankan `--version` pada setiap binari untuk mendapatkan empat rentetan versi itu.
2. Jalankan `--help` pada setiap satu untuk melihat flag tanpa interaksi dan subperintah MCP yang disenaraikan di atas.
3. Baca laluan konfigurasi dalam jadual: `$DSH_HOME/profiles`, `~/.claude.json`, `~/.codex/config.toml`, `~/.config/opencode/opencode.jsonc`.
4. Jalankan `du -sh` pada `~/.dsh`, `~/.claude`, `~/.codex` dan `~/.config/opencode` untuk jejak cakera.

Pembeli yang mementingkan kos boleh mengira semula pemberatnya. Menaikkan penyedia dan kawalan kos kepada 40% serta menurunkan jejak kepada 5% mengekalkan DeepSeek Harness di tempat pertama dan melebarkan jurangnya, kerana perbezaan antara dua teratas hampir seluruhnya pada kriteria itu; pada sel yang sama, pemberat baharu memberi DeepSeek Harness 4.65 dan OpenCode 4.05.

**Baca seterusnya**

[Apa yang agent harness lakukan dengan permintaan anda](https://upahje.my/ms/articles/apa-itu-agent-harness)

[Lagi tentang membeli dan memilih tool](https://upahje.my/ms/topics/buying)

[Di mana model tertutup sebenarnya berbeza](https://upahje.my/ms/articles/beza-model-tertutup)

[Apa sebenarnya yang dibeli kunci API harness](https://upahje.my/ms/articles/kunci-api-dalam-harness)
