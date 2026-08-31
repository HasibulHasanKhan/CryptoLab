// ========================================
// AUTOMATED TESTING
// ========================================

function runCryptoTests() {
  const tests = [
    // Caesar

    {
      name: "Caesar encryption",

      run: () => caesarEncrypt("ABC", 3) === "DEF",
    },

    {
      name: "Caesar decryption",

      run: () => caesarDecrypt("DEF", 3) === "ABC",
    },

    // Vigenere

    {
      name: "Vigenère encryption",

      run: () => vigenereEncrypt("ATTACKATDAWN", "LEMON") === "LXFOPVEFRNHR",
    },

    {
      name: "Vigenère decryption",

      run: () => vigenereDecrypt("LXFOPVEFRNHR", "LEMON") === "ATTACKATDAWN",
    },

    // Playfair

    {
      name: "Playfair encryption",

      run: () =>
        playfairEncrypt("HIDETHEGOLDINTHETREESTUMP", "PLAYFAIREXAMPLE") ===
        "BMODZBXDNABEKUDMUIXMMOUVIF",
    },

    {
      name: "Playfair decryption",

      run: () =>
        playfairDecrypt("BMODZBXDNABEKUDMUIXMMOUVIF", "PLAYFAIREXAMPLE") ===
        "HIDETHEGOLDINTHETREXESTUMP",
    },

    // Monoalphabetic

    {
      name: "Monoalphabetic encryption",

      run: () =>
        monoalphabeticEncrypt("HELLO", "QWERTYUIOPASDFGHJKLZXCVBNM") ===
        "ITSSG",
    },

    {
      name: "Monoalphabetic decryption",

      run: () =>
        monoalphabeticDecrypt("ITSSG", "QWERTYUIOPASDFGHJKLZXCVBNM") ===
        "HELLO",
    },

    // RSA

    {
      name: "RSA prime validation",

      run: () => isPrime(61) && isPrime(53) && !isPrime(50),
    },

    {
      name: "RSA encryption and decryption",

      run: () => {
        const keys = generateRSAKeys(61, 53, 17);

        const encrypted = rsaEncrypt("HELLO", keys.publicKey);

        const decrypted = rsaDecrypt(encrypted, keys.privateKey);

        return decrypted === "HELLO";
      },
    },
  ];

  const results = [];

  let passed = 0;

  let failed = 0;

  tests.forEach((test) => {
    try {
      const success = test.run();

      if (success) {
        passed++;

        results.push({
          name: test.name,

          passed: true,
        });
      } else {
        failed++;

        results.push({
          name: test.name,

          passed: false,
        });
      }
    } catch (error) {
      failed++;

      results.push({
        name: test.name,

        passed: false,

        error: error.message,
      });
    }
  });

  return {
    total: tests.length,

    passed,

    failed,

    results,
  };
}

// Display Test Results

function displayTestResults() {
  const data = runCryptoTests();

  document.getElementById("totalTests").textContent = data.total;

  document.getElementById("passedTests").textContent = data.passed;

  document.getElementById("failedTests").textContent = data.failed;

  const container = document.getElementById("testResults");

  container.innerHTML = data.results
    .map(
      (test) => `

                <div
                    class="test-item
                    ${test.passed ? "test-pass" : "test-fail"}"
                >

                    ${test.passed ? "✓ PASS" : "✗ FAIL"}

                    -

                    ${test.name}

                    ${test.error ? `: ${test.error}` : ""}

                </div>

            `,
    )
    .join("");
}
