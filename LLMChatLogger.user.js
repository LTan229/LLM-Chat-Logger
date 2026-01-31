// ==UserScript==
// @name         LLM Chat Logger
// @name:zh-CN   LLM 聊天记录备份
// @namespace    https://github.com/LTan229/LLM-Chat-Logger
// @version      1.0
// @description  Record your GEMINI and ChatGPT chat input, support export to Markdown.
// @description:zh-CN 自动记录 ChatGPT 和 Gemini 的聊天输入，并支持导出为 Markdown。
// @author       LTan229
// @match        https://chatgpt.com/*
// @match        https://chatgpt.com/c/*
// @match        https://gemini.google.com/app
// @match        https://gemini.google.com/app/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @run-at       document-idle
// @license      MIT
// @homepageURL  https://github.com/LTan229/LLM-Chat-Logger
// @supportURL   https://github.com/LTan229/LLM-Chat-Logger/issues
// ==/UserScript==

(function() {
    'use strict';

const SITE_CONFIG = {
        'chatgpt.com': [
            {
                name: 'Main Chat',
                input: '#prompt-textarea',
                submit: '#composer-submit-button'
            },
            {
                name: 'Edit Message',
                input: 'textarea',
                submit: '.btn.relative.btn-primary'
            }
        ],
        'gemini.google.com': [
            {
                name: 'Main Chat',
                input: '.textarea',
                submit: '.send-button'
            },
            {
                name: 'Edit Message',
                input: 'textarea',
                submit: '.update-button'
            }
        ]
    };

    // 获取当前域名的配置
    function getCurrentConfig() {
        const hostname = window.location.hostname;
        for (const domain in SITE_CONFIG) {
            if (hostname.includes(domain)) {
                return SITE_CONFIG[domain];
            }
        }
        return null;
    }

    let lastLogContent = '';
    let lastLogTime = 0;

    // 保存消息到本地存储
    function logMessage(text) {
        if (!text || text.trim() === '') return;

        const now = Date.now();
        if (text === lastLogContent && (now - lastLogTime < 2000)) {
            return;
        }
        lastLogContent = text;
        lastLogTime = now;

        const timestamp = new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-');

        const record = {
            time: timestamp,
            content: text.trim()
        };

        const history = GM_getValue('chat_history', []);
        history.push(record);
        GM_setValue('chat_history', history);

        // console.log('[Chat Logger] Message recorded:', text.substring(0, 20) + '...');
    }

    function getTextFromElement(element) {
        if (!element) return '';

        if (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT') {
            return element.value || '';
        }

        return element.innerText || element.textContent || '';
    }

    // 导出 Markdown
    function exportHistory() {
        const history = GM_getValue('chat_history', []);
        if (history.length === 0) {
            alert('No local records to export.');
            return;
        }

        let mdContent = '';
        history.forEach(item => {
            mdContent += `###### ${item.time}\n\n${item.content}\n\n`;
        });

        const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chat_history_${new Date().toISOString().slice(0,10)}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // 清除历史
    function clearHistory() {
        if (confirm('Clear all chat records?\n\nWARNING: Chat records CANNOT be recovered!')) {
            GM_setValue('chat_history', []);
            alert('Record cleared!');
        }
    }

    // 注册油猴菜单
    GM_registerMenuCommand("📥 Export chat records", exportHistory);
    GM_registerMenuCommand("🗑️ Clear chat records", clearHistory);

    // 获取当前域名的配置数组
    const configList = (function() {
        const hostname = window.location.hostname;
        for (const domain in SITE_CONFIG) {
            if (hostname.includes(domain)) {
                return SITE_CONFIG[domain];
            }
        }
        return [];
    })();

    if (configList.length === 0) return;

    // 监听键盘事件 (Enter)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
            const target = e.target;

            for (const group of configList) {
                if (target.matches(group.input) || target.closest(group.input)) {
                    const text = getTextFromElement(target);
                    logMessage(text);
                    return;
                }
            }
        }
    }, true);

    // 监听鼠标按下事件 (MouseDown)
    document.addEventListener('mousedown', (e) => {
        const target = e.target;

        for (const group of configList) {
            const submitBtn = target.matches(group.submit) ? target : target.closest(group.submit);

            if (submitBtn) {
                const inputEl = document.querySelector(group.input);
                if (inputEl) {
                    const text = getTextFromElement(inputEl);
                    logMessage(text);
                }
                return;
            }
        }
    }, true);

})();
