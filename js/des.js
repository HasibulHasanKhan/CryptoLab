/*
    Educational DES-style demonstration.

    This is NOT a complete production DES implementation.
    It demonstrates a 16-round Feistel structure
    for learning purposes.
*/

function validateDESInput(message, key) {
  if (message.length !== 8) {
    throw new Error("DES demonstration requires exactly 8 characters.");
  }

  if (key.length !== 8) {
    throw new Error("DES key must contain exactly 8 characters.");
  }
}

function xorBytes(a, b) {
  return a.map((value, index) => value ^ b[index % b.length]);
}

function stringToBytes(text) {
  return Array.from(text).map((character) => character.charCodeAt(0) & 255);
}

function bytesToHex(bytes) {
  return bytes.map((value) => value.toString(16).padStart(2, "0")).join("");
}

function hexToBytes(hex) {
  if (!/^[0-9a-fA-F]+$/.test(hex) || hex.length % 2 !== 0) {
    throw new Error("Invalid DES encrypted hexadecimal value.");
  }

  const bytes = [];

  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.slice(i, i + 2), 16));
  }

  return bytes;
}

function generateRoundKey(keyBytes, round) {
  return keyBytes.map(
    (value, index) => (value + round * 17 + index * 11) & 255,
  );
}

function desTransform(inputBytes, key, decrypt = false) {
  const keyBytes = stringToBytes(key);

  let left = inputBytes.slice(0, 4);

  let right = inputBytes.slice(4, 8);

  const rounds = decrypt
    ? Array.from({ length: 16 }, (_, i) => 16 - i)
    : Array.from({ length: 16 }, (_, i) => i + 1);

  rounds.forEach((round) => {
    const roundKey = generateRoundKey(keyBytes, round).slice(0, 4);

    const transformed = right.map(
      (value, index) =>
        (((value << 1) | (value >> 7)) ^ roundKey[index] ^ round) & 255,
    );

    const newRight = xorBytes(left, transformed);

    left = right;
    right = newRight;
  });

  return [...right, ...left];
}

function desEncrypt(message, key) {
  validateDESInput(message, key);

  const input = stringToBytes(message);

  return bytesToHex(desTransform(input, key, false));
}

function desDecrypt(cipherHex, key) {
  if (key.length !== 8) {
    throw new Error("DES key must contain exactly 8 characters.");
  }

  const bytes = hexToBytes(cipherHex);

  if (bytes.length !== 8) {
    throw new Error("DES encrypted data must represent exactly 8 bytes.");
  }

  const result = desTransform(bytes, key, true);

  return String.fromCharCode(...result);
}

function getDESSteps(message, result, operation) {
  const steps = [
    `${operation} begins with an 8-byte block.`,
    "The block is divided into Left and Right halves.",
  ];

  for (let round = 1; round <= 16; round++) {
    steps.push(`Round ${round}: apply round key and Feistel transformation.`);
  }

  steps.push(`Final result: ${result}`);

  return steps;
}
