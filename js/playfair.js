// ========================================
// PLAYFAIR CIPHER
// ========================================

// Create 5 × 5 Playfair Matrix

function createPlayfairMatrix(key) {
  const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";

  key = key
    .toUpperCase()
    .replace(/J/g, "I")
    .replace(/[^A-Z]/g, "");

  let uniqueCharacters = "";

  for (const character of key + alphabet) {
    if (!uniqueCharacters.includes(character)) {
      uniqueCharacters += character;
    }
  }

  const matrix = [];

  for (let i = 0; i < 25; i += 5) {
    matrix.push(uniqueCharacters.slice(i, i + 5).split(""));
  }

  return matrix;
}

// Find Character Position

function findPlayfairPosition(matrix, character) {
  for (let row = 0; row < 5; row++) {
    for (let column = 0; column < 5; column++) {
      if (matrix[row][column] === character) {
        return {
          row,
          column,
        };
      }
    }
  }
}

// Prepare Message

function preparePlayfairText(text) {
  text = text
    .toUpperCase()
    .replace(/J/g, "I")
    .replace(/[^A-Z]/g, "");

  let prepared = "";

  for (let i = 0; i < text.length; i += 2) {
    let first = text[i];

    let second = text[i + 1];

    if (!second) {
      second = "X";
    }

    if (first === second) {
      prepared += first + "X";

      i--;
    } else {
      prepared += first + second;
    }
  }

  if (prepared.length % 2 !== 0) {
    prepared += "X";
  }

  return prepared;
}

// Encrypt

function playfairEncrypt(message, key) {
  if (!key.trim()) {
    throw new Error("Playfair Cipher requires a keyword.");
  }

  const matrix = createPlayfairMatrix(key);

  const text = preparePlayfairText(message);

  let result = "";

  for (let i = 0; i < text.length; i += 2) {
    const first = text[i];

    const second = text[i + 1];

    const pos1 = findPlayfairPosition(matrix, first);

    const pos2 = findPlayfairPosition(matrix, second);

    // Same Row

    if (pos1.row === pos2.row) {
      result += matrix[pos1.row][(pos1.column + 1) % 5];

      result += matrix[pos2.row][(pos2.column + 1) % 5];
    }

    // Same Column
    else if (pos1.column === pos2.column) {
      result += matrix[(pos1.row + 1) % 5][pos1.column];

      result += matrix[(pos2.row + 1) % 5][pos2.column];
    }

    // Rectangle
    else {
      result += matrix[pos1.row][pos2.column];

      result += matrix[pos2.row][pos1.column];
    }
  }

  return result;
}

// Decrypt

function playfairDecrypt(message, key) {
  if (!key.trim()) {
    throw new Error("Playfair Cipher requires a keyword.");
  }

  const matrix = createPlayfairMatrix(key);

  const text = message
    .toUpperCase()
    .replace(/J/g, "I")
    .replace(/[^A-Z]/g, "");

  if (text.length % 2 !== 0) {
    throw new Error(
      "Playfair encrypted text must contain an even number of letters.",
    );
  }

  let result = "";

  for (let i = 0; i < text.length; i += 2) {
    const first = text[i];

    const second = text[i + 1];

    const pos1 = findPlayfairPosition(matrix, first);

    const pos2 = findPlayfairPosition(matrix, second);

    // Same Row

    if (pos1.row === pos2.row) {
      result += matrix[pos1.row][(pos1.column + 4) % 5];

      result += matrix[pos2.row][(pos2.column + 4) % 5];
    }

    // Same Column
    else if (pos1.column === pos2.column) {
      result += matrix[(pos1.row + 4) % 5][pos1.column];

      result += matrix[(pos2.row + 4) % 5][pos2.column];
    }

    // Rectangle
    else {
      result += matrix[pos1.row][pos2.column];

      result += matrix[pos2.row][pos1.column];
    }
  }

  return result;
}

// Visualization Steps

function getPlayfairSteps(message, key, result) {
  const matrix = createPlayfairMatrix(key);

  const matrixText = matrix.map((row) => row.join(" ")).join(" | ");

  return [
    `Keyword: ${key.toUpperCase()}`,

    "Create a 5×5 Playfair matrix.",

    `Matrix: ${matrixText}`,

    `Prepared message: ${preparePlayfairText(message)}`,

    "Split the message into pairs of letters.",

    "Apply same-row, same-column or rectangle rules.",

    `Final result: ${result}`,
  ];
}
