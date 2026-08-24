/*
    Educational AES-style visualization.

    This is a simplified reversible
    substitution-permutation demonstration,
    not a production AES implementation.
*/

function validateAESKey(key) {
  if (key.length < 4) {
    throw new Error(
      "AES demonstration key must contain at least 4 characters.",
    );
  }
}

function aesKeyStream(key, length) {
  const keyCodes = Array.from(key).map(
    (character) => character.charCodeAt(0) & 255,
  );

  return Array.from(
    { length },
    (_, index) => (keyCodes[index % keyCodes.length] + index * 31) & 255,
  );
}

function aesEncrypt(message, key) {
  validateAESKey(key);

  const messageBytes = Array.from(message).map(
    (character) => character.charCodeAt(0) & 255,
  );

  const stream = aesKeyStream(key, messageBytes.length);

  const encrypted = messageBytes.map((value, index) => value ^ stream[index]);

  return bytesToHex(encrypted);
}

function aesDecrypt(cipherHex, key) {
  validateAESKey(key);

  const encrypted = hexToBytes(cipherHex);

  const stream = aesKeyStream(key, encrypted.length);

  const decrypted = encrypted.map((value, index) => value ^ stream[index]);

  return String.fromCharCode(...decrypted);
}

function getAESSteps(message, result, operation) {
  return [
    `${operation} starts by converting text into bytes.`,
    "Key material is expanded into a byte stream.",
    "Educational round concept: substitution / mixing / key addition.",
    "The operation is repeated across the message bytes.",
    `Final result: ${result}`,
  ];
}
