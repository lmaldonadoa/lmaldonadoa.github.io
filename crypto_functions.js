// crypto_functions.js

// Encrypts data using AES-CBC
async function encryptData({ data, key, iv }) {
    const encodedData = new TextEncoder().encode(data);
    const cryptoKey = await crypto.subtle.importKey(
        "raw",
        key,
        { name: "AES-CBC", length: 256 },
        false,
        ["encrypt"]
    );
    const encryptedData = await crypto.subtle.encrypt(
        { name: "AES-CBC", iv: new Uint8Array(iv) },
        cryptoKey,
        encodedData
    );
    return btoa(String.fromCharCode.apply(null, new Uint8Array(encryptedData)));
}

// Decrypts data using AES-CBC
async function decryptData({ encryptedData, key, iv }) {
    const decodedData = atob(encryptedData);
    const buffer = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; i++) {
        buffer[i] = decodedData.charCodeAt(i);
    }
    const cryptoKey = await crypto.subtle.importKey(
        "raw",
        key,
        { name: "AES-CBC", length: 256 },
        false,
        ["decrypt"]
    );
    const decryptedData = await crypto.subtle.decrypt(
        { name: "AES-CBC", iv: new Uint8Array(iv) },
        cryptoKey,
        buffer
    );
    return new TextDecoder().decode(decryptedData);
}


// Functions to be called from Dart
self.onmessage = function(event) {
    switch (event.data.functionName) {
        case 'encryptData':
            encryptData(event.data.arguments).then(result => {
                self.postMessage(result);
            });
            break;
        case 'decryptData':
            decryptData(event.data.arguments).then(result => {
                self.postMessage(result);
            });
            break;
    }
};
