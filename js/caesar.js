function normalizeShift(key) {
  const shift = Number(key);

  if (!Number.isInteger(shift)) {
    throw new Error("Caesar Cipher key must be an integer.");
  }

  return ((shift % 26) + 26) % 26;
}

function caesarCipher(text, key, decrypt = false) {
  const shift = normalizeShift(key);

  const finalShift = decrypt ? (26 - shift) % 26 : shift;

  return [...text]
    .map((character) => {
      const code = character.charCodeAt(0);

      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + finalShift) % 26) + 65);
      }

      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + finalShift) % 26) + 97);
      }

      return character;
    })
    .join("");
}

function caesarEncrypt(text, key) {
  return caesarCipher(text, key, false);
}

function caesarDecrypt(text, key) {
  return caesarCipher(text, key, true);
}

function getCaesarSteps(text, key, result) {
  return [
    `Input message: ${text}`,
    `Shift value: ${normalizeShift(key)}`,
    "Each alphabetic character is shifted by the selected amount.",
    `Final result: ${result}`,
  ];
}
