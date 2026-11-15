/**
 * CryptoToolbox 密码学工具箱
 * 纯前端实现，零依赖
 * MIT License
 */

/* ============ 凯撒密码 ============ */
function caesarEncrypt() {
    const text = document.getElementById('caesar-input').value;
    const shift = parseInt(document.getElementById('caesar-shift').value) || 3;
    document.getElementById('caesar-output').value = caesarShift(text, shift);
}

function caesarDecrypt() {
    const text = document.getElementById('caesar-input').value;
    const shift = parseInt(document.getElementById('caesar-shift').value) || 3;
    document.getElementById('caesar-output').value = caesarShift(text, 26 - shift);
}

function caesarShift(text, shift) {
    shift = ((shift % 26) + 26) % 26;
    let result = '';
    for (const ch of text) {
        if (ch >= 'a' && ch <= 'z') {
            result += String.fromCharCode((ch.charCodeAt(0) - 97 + shift) % 26 + 97);
        } else if (ch >= 'A' && ch <= 'Z') {
            result += String.fromCharCode((ch.charCodeAt(0) - 65 + shift) % 26 + 65);
        } else {
            result += ch;
        }
    }
    return result;
}

/* ============ Base64 ============ */
function base64Encode() {
    const text = document.getElementById('base64-input').value;
    try {
        // 使用 TextEncoder 正确处理 UTF-8（含中文）
        const bytes = new TextEncoder().encode(text);
        let binary = '';
        bytes.forEach(b => binary += String.fromCharCode(b));
        document.getElementById('base64-output').value = btoa(binary);
    } catch (e) {
        document.getElementById('base64-output').value = '编码失败：' + e.message;
    }
}

function base64Decode() {
    const text = document.getElementById('base64-input').value;
    try {
        const binary = atob(text);
        const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
        document.getElementById('base64-output').value = new TextDecoder().decode(bytes);
    } catch (e) {
        document.getElementById('base64-output').value = '解码失败：请输入合法的 Base64 字符串';
    }
}

/* ============ 消息摘要 ============ */
async function hash(algorithm) {
    const text = document.getElementById('hash-input').value;
    const data = new TextEncoder().encode(text);
    try {
        const digest = await crypto.subtle.digest(algorithm, data);
        const hex = Array.from(new Uint8Array(digest))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
        document.getElementById('hash-output').value = hex;
    } catch (e) {
        document.getElementById('hash-output').value = '计算失败：' + e.message;
    }
}

/* ============ AES 对称加密 ============ */
async function aesEncrypt() {
    const text = document.getElementById('aes-input').value;
    const password = document.getElementById('aes-password').value;
    if (!password) {
        document.getElementById('aes-output').value = '请先输入口令';
        return;
    }
    try {
        const key = await deriveKey(password);
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const enc = new TextEncoder().encode(text);
        const cipher = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv }, key, enc
        );
        // 输出格式：iv(base64) + ":" + 密文(base64)
        const result = bufToBase64(iv) + ':' + bufToBase64(new Uint8Array(cipher));
        document.getElementById('aes-output').value = result;
    } catch (e) {
        document.getElementById('aes-output').value = '加密失败：' + e.message;
    }
}

async function aesDecrypt() {
    const text = document.getElementById('aes-input').value;
    const password = document.getElementById('aes-password').value;
    if (!password) {
        document.getElementById('aes-output').value = '请先输入口令';
        return;
    }
    try {
        const [ivB64, cipherB64] = text.split(':');
        if (!ivB64 || !cipherB64) {
            throw new Error('格式应为 iv:密文');
        }
        const key = await deriveKey(password);
        const iv = base64ToBuf(ivB64);
        const cipher = base64ToBuf(cipherB64);
        const plain = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv }, key, cipher
        );
        document.getElementById('aes-output').value = new TextDecoder().decode(plain);
    } catch (e) {
        document.getElementById('aes-output').value = '解密失败：口令错误或密文格式不正确';
    }
}

async function deriveKey(password) {
    const enc = new TextEncoder();
    const material = await crypto.subtle.importKey(
        'raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']
    );
    return crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: enc.encode('cryptotoolbox-salt'),
            iterations: 100000,
            hash: 'SHA-256',
        },
        material,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
    );
}

function bufToBase64(buf) {
    let binary = '';
    buf.forEach(b => binary += String.fromCharCode(b));
    return btoa(binary);
}

function base64ToBuf(b64) {
    const binary = atob(b64);
    return Uint8Array.from(binary, c => c.charCodeAt(0));
}
