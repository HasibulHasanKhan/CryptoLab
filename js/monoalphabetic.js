// ========================================
// MONOALPHABETIC CIPHER
// ========================================

const MONO_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Validate Key

function validateMonoKey(key) {
  key = key.toUpperCase().replace(/[^A-Z]/g, "");

  if (key.length !== 26) {
    throw new Error("Monoalphabetic key must contain exactly 26 letters.");
  }

  const unique = new Set(key.split(""));

  if (unique.size !== 26) {
    throw new Error("Monoalphabetic key must contain 26 unique letters.");
  }

  return key;
}

// Encrypt

function monoalphabeticEncrypt(message, key) {
  const cipherAlphabet = validateMonoKey(key);

  return [...message]
    .map((character) => {
      const upper = character.toUpperCase();

      if (!/[A-Z]/.test(upper)) {
        return character;
      }

      const index = MONO_ALPHABET.indexOf(upper);

      const encrypted = cipherAlphabet[index];

      return character === upper ? encrypted : encrypted.toLowerCase();
    })
    .join("");
}

// Decrypt

function monoalphabeticDecrypt(message, key) {
  const cipherAlphabet = validateMonoKey(key);

  return [...message]
    .map((character) => {
      const upper = character.toUpperCase();

      if (!/[A-Z]/.test(upper)) {
        return character;
      }

      const index = cipherAlphabet.indexOf(upper);

      const decrypted = MONO_ALPHABET[index];

      return character === upper ? decrypted : decrypted.toLowerCase();
    })
    .join("");
}

// Visualization

function getMonoalphabeticSteps(message, key, result) {
  return [
    `Plain Alphabet: ${MONO_ALPHABET}`,

    `Cipher Alphabet: ${key.toUpperCase()}`,

    "Each plaintext letter is replaced using the fixed substitution alphabet.",

    "The same plaintext letter always maps to the same ciphertext letter.",

    `Input: ${message}`,

    `Final result: ${result}`,
  ];
}
