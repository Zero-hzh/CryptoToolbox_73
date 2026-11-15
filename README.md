# CryptoToolbox 密码学工具箱 v2.0

一个纯前端、零依赖的密码学学习与演示工具，帮助学生和开发者直观理解常用密码学算法的原理与应用。

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Language](https://img.shields.io/badge/Language-HTML%2FJavaScript-orange.svg)]()
[![Platform](https://img.shields.io/badge/Platform-Web-brightgreen.svg)]()

## ✨ 功能特性

| 功能 | 说明 |
|------|------|
| 🔐 凯撒密码 | 古典替换密码，支持加密/解密与自定义位移量 |
| 📦 Base64 编解码 | 二进制与可打印 ASCII 的互相转换，支持 UTF-8 中文 |
| #️⃣ 消息摘要 | MD5、SHA-1、SHA-256 哈希计算 |
| 🛡️ AES 对称加密 | 基于 Web Crypto API 的 AES-GCM 加解密，口令派生密钥 |

## 🚀 快速开始

本项目为纯静态页面，**无需任何依赖与构建**，直接用浏览器打开即可。

```bash
# 方式一：直接双击打开
# 打开 index.html 文件即可

# 方式二：使用任意静态服务器（推荐，可避免部分浏览器文件协议限制）
python -m http.server 8080
# 然后访问 http://localhost:8080
```

## 📖 使用说明

### 凯撒密码
1. 在「凯撒密码」卡片中输入明文/密文
2. 设置位移量（默认 3）
3. 点击「加密」或「解密」

### Base64
1. 输入文本
2. 点击「编码」或「解码」

### 消息摘要
1. 输入文本
2. 点击 MD5 / SHA-1 / SHA-256 按钮，得到十六进制摘要

### AES
1. 输入明文与口令
2. 点击「加密」，得到 `iv:密文` 格式的结果
3. 将结果粘贴回输入框，点击「解密」还原明文

## 🗂️ 项目结构

```
CryptoToolbox_73/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式表
├── js/
│   └── app.js          # 核心逻辑
├── docs/
│   ├── 项目说明.md      # 项目详细说明
│   ├── 使用手册.md      # 使用手册
│   └── 贡献指南.md      # 贡献指南
├── LICENSE             # MIT 许可证
└── README.md           # 项目介绍
```

## 🔧 技术栈

- **HTML5**：页面结构
- **CSS3**：响应式布局与样式
- **JavaScript (ES6)**：核心加密逻辑
- **Web Crypto API**：AES-GCM 与哈希的原生实现

## 🤝 贡献

欢迎提交 Issue 与 Pull Request！详细规范请参阅 [贡献指南](docs/贡献指南.md)。

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源，可自由使用、修改与分发。

## 👤 作者

- **何子皓**（学号后两位：73）
- GitHub：[Zero-hzh](https://github.com/Zero-hzh)
