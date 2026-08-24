function validateVigenereKey(key) {
  const cleaned = String(key).replace(/[^a-z]/gi, "");

  if (!cleaned) {
    throw new Error("Vigenère key must contain at least one letter.");
  }

  return cleaned.toUpperCase();
}

function vigenereCipher(text, key, decrypt = false) {
  const cleanKey = validateVigenereKey(key);

  let keyIndex = 0;

  return [...text]
    .map((character) => {
      if (!/[a-z]/i.test(character)) {
        return character;
      }

      const base = character === character.toUpperCase() ? 65 : 97;

      const shift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;

      const direction = decrypt ? -shift : shift;

      keyIndex++;

      return String.fromCharCode(
        ((character.charCodeAt(0) - base + direction + 26) % 26) + base,
      );
    })
    .join("");
}

function vigenereEncrypt(text, key) {
  return vigenereCipher(text, key, false);
}

function vigenereDecrypt(text, key) {
  return vigenereCipher(text, key, true);
}

function getVigenereSteps(text, key, result) {
  return [
    `Input message: ${text}`,
    `Keyword: ${validateVigenereKey(key)}`,
    "The keyword is repeated to match alphabetic characters.",
    "Each letter is shifted according to its matching key letter.",
    `Final result: ${result}`,
  ];
}
