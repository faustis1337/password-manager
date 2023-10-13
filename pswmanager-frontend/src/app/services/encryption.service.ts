import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  arrayBufferToBase64String(arrayBuffer:ArrayBuffer){
    const arrayBufferView = new Uint8Array(arrayBuffer);
    const byteArray = Array.from(arrayBufferView);
    const base64String = btoa(String.fromCharCode.apply(null, byteArray));

    return base64String;
  }

  Base64StringToArrayBuffer(base64String:string){
    const byteCharacters = atob(base64String);
    const byteArray = new Uint8Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }
    return byteArray.buffer;
  }

  async encrypt(plaintext: string, encryptionKey: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder();
    const data = encoder.encode(plaintext);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(encryptionKey),
      { name: 'AES-GCM' },
      false,
      ['encrypt', 'decrypt']
    );

    const encryptedData = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );

    const combinedData = new Uint8Array(iv.length + encryptedData.byteLength);
    combinedData.set(new Uint8Array(iv), 0);
    combinedData.set(new Uint8Array(encryptedData), iv.length);

    return combinedData.buffer;
  }

  async decrypt(encryptedData: ArrayBuffer, encryptionKey: string): Promise<string> {
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(encryptionKey),
      { name: 'AES-GCM' },
      false,
      ['encrypt', 'decrypt']
    );

    const iv = new Uint8Array(encryptedData, 0, 12);
    const data = new Uint8Array(encryptedData, 12);

    const decryptedData = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
  }
}
