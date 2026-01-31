# LLM Chat Logger

[English](#english) | [中文说明](#chinese)

<div id="english"></div>

**LLM Chat Logger** is a userscript that runs in your browser via Tampermonkey. It automatically records your prompts sent to LLM platforms (ChatGPT, Gemini) and saves them to your local storage. You can export your chat history as a Markdown file at any time.

---

## 🌟 Features

* **Auto Logging**: Automatically captures messages sent via `Enter` key or "Send" button click.
* **Multi-Site Support**: Currently supports **ChatGPT** and **Google Gemini**.
* **Privacy First**: All data is stored locally.
* **Easy Management**: Manage data via Tampermonkey menu.
    * 📥 **Export**: Download history as a `.md` file (formatted with timestamps).
    * 🗑️ **Clear**: One-click to wipe local history.

## 🛠️ Installation

1.  Install the [Tampermonkey](https://www.tampermonkey.net/) extension for your browser.
2.  Create a new script in Tampermonkey.
3.  Copy and paste the code from `script.js`.
4.  Save the script.

## 📖 Usage

1.  Open [ChatGPT](https://chatgpt.com) or [Gemini](https://gemini.google.com).
2.  Chat as usual. The script runs in the background.
3.  To manage your data, click the **Tampermonkey icon** in your browser toolbar.
4.  You will see two menu options:
    * `📥 Export chat records` - Downloads a `.md` file.
    * `🗑️ Clear chat records` - Deletes all saved logs.

## ⚙️ Configuration (Advanced)

You can add support for other LLM sites by modifying the header:

```javascript
// @match        https://example.com/*
```

, and the `SITE_CONFIG` object in the source code.

```javascript
const SITE_CONFIG = {
    'example.com': [
        {
            name: 'Main Chat',
            input: '#input-id',
            submit: '#send-btn-id'
        }
    ]
};
```

<div id="chinese"></div>

# 🤖 LLM Chat Logger

**LLM Chat Logger** 是一个油猴 (Tampermonkey) 脚本。它可以自动记录你在 LLM 平台（ChatGPT, Gemini）发送的消息，并将其保存在浏览器的本地存储中。你可以随时将聊天记录导出为 Markdown 文档。

## 🌟 功能特性

* **自动记录**：无论是按 `Enter` 键还是点击“发送”按钮，脚本都会自动抓取消息。
* **多站点支持**：当前适配 **ChatGPT** 和 **Google Gemini**。
* **隐私保护**：数据存储在**本地**。
* **简单管理**：通过油猴菜单即可操作。
    * 📥 **导出 Markdown**：生成包含时间戳的 `.md` 文件。
    * 🗑️ **清空记录**：一键删除本地所有记录。

## 🛠️ 安装方法

1.  安装 [Tampermonkey](https://www.tampermonkey.net/) 插件。
2.  在插件管理面板中创建“新脚本”。
3.  将代码复制粘贴进去并保存。

## 📖 使用指南

1.  打开 [ChatGPT](https://chatgpt.com) 或 [Gemini](https://gemini.google.com)。
2.  正常进行对话，脚本会在后台静默运行。
3.  需要导出时，点击浏览器右上角的 **Tampermonkey 图标**。
4.  在菜单中选择：
    * `📥 Export chat records`：下载 `.md` 记录文件。
    * `🗑️ Clear chat records`：删除所有记录。

## ⚙️ 自定义配置

欲自行添加其他网站支持，修改头部信息：

```javascript
// @match        https://example.com/*
```

，和`SITE_CONFIG`对象：

```javascript
const SITE_CONFIG = {
    'example.com': [
        {
            name: 'Main Chat',
            input: '#输入框ID',
            submit: '#发送按钮ID'
        }
    ]
};
