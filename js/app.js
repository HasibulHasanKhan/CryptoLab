// ========================================
// DOM ELEMENTS
// ========================================

const messageInput = document.getElementById("messageInput");

const keyInput = document.getElementById("keyInput");

const resultOutput = document.getElementById("resultOutput");

const encryptBtn = document.getElementById("encryptBtn");

const decryptBtn = document.getElementById("decryptBtn");

const visualizationContent = document.getElementById("visualizationContent");

const errorMessage = document.getElementById("errorMessage");

const workspaceTitle = document.getElementById("workspaceTitle");

const algorithmDescription = document.getElementById("algorithmDescription");

const rsaControls = document.getElementById("rsaControls");

const rsaKeyOutput = document.getElementById("rsaKeyOutput");

// ========================================
// APPLICATION STATE
// ========================================

let selectedAlgorithm = "caesar";

let rsaKeys = null;

const algorithmInfo = {
  caesar: {
    title: "Caesar Cipher Workspace",

    description: "Encrypt and decrypt text using a numeric shift value.",

    keyLabel: "Shift Value",

    placeholder: "Example: 3",

    defaultKey: "3",
  },

  vigenere: {
    title: "Vigenère Cipher Workspace",

    description: "Encrypt and decrypt text using a keyword.",

    keyLabel: "Keyword",

    placeholder: "Example: LEMON",

    defaultKey: "LEMON",
  },

  rsa: {
    title: "RSA Workspace",

    description: "Generate public/private keys and encrypt or decrypt text.",

    keyLabel: "RSA Key Information",

    placeholder: "RSA keys are generated below",

    defaultKey: "",
  },

  des: {
    title: "DES 16-Round Visualization",

    description: "Educational DES-style Feistel encryption demonstration.",

    keyLabel: "8 Character Key",

    placeholder: "Example: KEY12345",

    defaultKey: "KEY12345",
  },

  aes: {
    title: "AES Visualization",

    description: "Educational symmetric encryption demonstration.",

    keyLabel: "Encryption Key",

    placeholder: "Minimum 4 characters",

    defaultKey: "secretkey",
  },
};

// ========================================
// LOADING
// ========================================

function showLoading() {
  document.getElementById("loading").style.display = "flex";
}

function hideLoading() {
  document.getElementById("loading").style.display = "none";
}

// ========================================
// ERROR HANDLING
// ========================================

function showError(message) {
  errorMessage.textContent = message;

  errorMessage.classList.remove("hidden");
}

function clearError() {
  errorMessage.textContent = "";

  errorMessage.classList.add("hidden");
}

// ========================================
// ALGORITHM SELECTION
// ========================================

function selectAlgorithm(name) {
  selectedAlgorithm = name;

  const info = algorithmInfo[name];

  workspaceTitle.textContent = info.title;

  algorithmDescription.textContent = info.description;

  keyInput.value = info.defaultKey;

  keyInput.placeholder = info.placeholder;

  document.querySelector('label[for="keyInput"]').textContent = info.keyLabel;

  rsaControls.classList.toggle("hidden", name !== "rsa");

  document.querySelectorAll(".algorithm-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.algorithm === name);
  });

  resultOutput.value = "";

  visualizationContent.textContent =
    "Perform an encryption or decryption operation to see the algorithm steps.";

  clearError();
}

document.querySelectorAll(".algorithm-card").forEach((card) => {
  card.addEventListener("click", () => selectAlgorithm(card.dataset.algorithm));
});

// ========================================
// RSA KEY GENERATION
// ========================================

document.getElementById("generateRSAKeys").addEventListener("click", () => {
  clearError();

  try {
    const p = document.getElementById("rsaP").value;

    const q = document.getElementById("rsaQ").value;

    const e = document.getElementById("rsaE").value;

    rsaKeys = generateRSAKeys(p, q, e);

    rsaKeyOutput.innerHTML = `
                    <strong>Public Key:</strong>
                    (${rsaKeys.e}, ${rsaKeys.n})
                    <br>
                    <strong>Private Key:</strong>
                    (${rsaKeys.d}, ${rsaKeys.n})
                    <br>
                    <strong>n:</strong>
                    ${rsaKeys.n}
                    |
                    <strong>φ(n):</strong>
                    ${rsaKeys.phi}
                `;
  } catch (error) {
    showError(error.message);
  }
});

// ========================================
// VALIDATION
// ========================================

function validateInput(message, operation) {
  if (!message.trim()) {
    throw new Error(`Please enter a message to ${operation}.`);
  }

  if (selectedAlgorithm !== "rsa" && !keyInput.value.trim()) {
    throw new Error("Please enter an encryption key.");
  }
}

// ========================================
// OPERATION
// ========================================

async function performOperation(operation) {
  clearError();

  const message = messageInput.value;

  const key = keyInput.value;

  try {
    validateInput(message, operation.toLowerCase());

    showLoading();

    await new Promise((resolve) => setTimeout(resolve, 250));

    let result;
    let steps;

    switch (selectedAlgorithm) {
      case "caesar":
        result =
          operation === "Encrypt"
            ? caesarEncrypt(message, key)
            : caesarDecrypt(message, key);

        steps = getCaesarSteps(message, key, result);

        break;

      case "vigenere":
        result =
          operation === "Encrypt"
            ? vigenereEncrypt(message, key)
            : vigenereDecrypt(message, key);

        steps = getVigenereSteps(message, key, result);

        break;

      case "rsa":
        if (!rsaKeys) {
          throw new Error("Generate RSA keys before encryption or decryption.");
        }

        result =
          operation === "Encrypt"
            ? rsaEncrypt(message, rsaKeys.publicKey)
            : rsaDecrypt(message, rsaKeys.privateKey);

        steps = getRSASteps(message, result, rsaKeys, operation);

        break;

      case "des":
        result =
          operation === "Encrypt"
            ? desEncrypt(message, key)
            : desDecrypt(message, key);

        steps = getDESSteps(message, result, operation);

        break;

      case "aes":
        result =
          operation === "Encrypt"
            ? aesEncrypt(message, key)
            : aesDecrypt(message, key);

        steps = getAESSteps(message, result, operation);

        break;

      default:
        throw new Error("Unknown algorithm.");
    }

    resultOutput.value = result;

    renderVisualization(steps);

    saveHistoryItem({
      algorithm: selectedAlgorithm.toUpperCase(),

      operation,

      input: message,

      result,

      time: new Date().toLocaleString(),
    });
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
  }
}

// ========================================
// VISUALIZATION
// ========================================

function renderVisualization(steps) {
  visualizationContent.innerHTML = `
        <div class="step-list">
            ${steps
              .map(
                (step, index) => `
                            <div class="step-item">
                                <strong>
                                    Step ${index + 1}:
                                </strong>
                                ${escapeHTML(step)}
                            </div>
                        `,
              )
              .join("")}
        </div>
    `;
}

// ========================================
// BUTTON EVENTS
// ========================================

encryptBtn.addEventListener("click", () => performOperation("Encrypt"));

decryptBtn.addEventListener("click", () => performOperation("Decrypt"));

// ========================================
// CLEAR BUTTONS
// ========================================

document.getElementById("clearMessage").addEventListener("click", () => {
  messageInput.value = "";

  messageInput.focus();
});

document.getElementById("clearKey").addEventListener("click", () => {
  keyInput.value = "";

  keyInput.focus();
});

// ========================================
// COPY RESULT
// ========================================

document.getElementById("copyResult").addEventListener("click", async () => {
  if (!resultOutput.value) {
    showError("There is no result to copy.");

    return;
  }

  try {
    await navigator.clipboard.writeText(resultOutput.value);

    alert("Result copied successfully.");
  } catch {
    showError("Unable to copy the result.");
  }
});

// ========================================
// DOWNLOAD RESULT
// ========================================

document.getElementById("downloadResult").addEventListener("click", () => {
  if (!resultOutput.value) {
    showError("There is no result to download.");

    return;
  }

  const blob = new Blob([resultOutput.value], {
    type: "text/plain",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = `cryptolab-${selectedAlgorithm}-result.txt`;

  link.click();

  URL.revokeObjectURL(url);
});

// ========================================
// TESTING
// ========================================

document
  .getElementById("runTests")
  .addEventListener("click", displayTestResults);

// ========================================
// HISTORY
// ========================================

document.getElementById("clearHistory").addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all history?")) {
    clearAllHistory();
  }
});

document
  .getElementById("exportHistory")
  .addEventListener("click", exportHistoryJSON);

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.shiftKey && event.key === "Enter") {
    event.preventDefault();

    decryptBtn.click();

    return;
  }

  if (event.ctrlKey && event.key === "Enter") {
    event.preventDefault();

    encryptBtn.click();
  }
});

// ========================================
// DYNAMIC COPYRIGHT YEAR
// ========================================

const yearElement = document.getElementById("currentYear");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  selectAlgorithm("caesar");

  renderHistory();
});
