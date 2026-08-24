function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);

  while (b !== 0) {
    const temp = b;

    b = a % b;

    a = temp;
  }

  return a;
}

function isPrime(number) {
  number = Number(number);

  if (!Number.isInteger(number) || number < 2) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

function modPow(base, exponent, modulus) {
  let result = 1;

  base %= modulus;

  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result = (result * base) % modulus;
    }

    exponent = Math.floor(exponent / 2);

    base = (base * base) % modulus;
  }

  return result;
}

function modularInverse(e, phi) {
  let oldR = e;
  let r = phi;

  let oldS = 1;
  let s = 0;

  while (r !== 0) {
    const quotient = Math.floor(oldR / r);

    [oldR, r] = [r, oldR - quotient * r];

    [oldS, s] = [s, oldS - quotient * s];
  }

  if (oldR !== 1) {
    throw new Error("Modular inverse does not exist.");
  }

  return ((oldS % phi) + phi) % phi;
}

function generateRSAKeys(p, q, e) {
  p = Number(p);
  q = Number(q);
  e = Number(e);

  if (!isPrime(p)) {
    throw new Error("RSA value p must be prime.");
  }

  if (!isPrime(q)) {
    throw new Error("RSA value q must be prime.");
  }

  if (p === q) {
    throw new Error("RSA primes p and q must be different.");
  }

  const n = p * q;

  const phi = (p - 1) * (q - 1);

  if (!Number.isInteger(e) || e <= 1 || e >= phi) {
    throw new Error(
      "RSA public exponent e must be greater than 1 and less than φ(n).",
    );
  }

  if (gcd(e, phi) !== 1) {
    throw new Error("RSA exponent e must be coprime with φ(n).");
  }

  const d = modularInverse(e, phi);

  return {
    p,
    q,
    n,
    phi,
    e,
    d,
    publicKey: {
      e,
      n,
    },
    privateKey: {
      d,
      n,
    },
  };
}

function rsaEncrypt(message, publicKey) {
  if (!publicKey) {
    throw new Error("Generate RSA keys first.");
  }

  const { e, n } = publicKey;

  const encrypted = [];

  for (const character of message) {
    const value = character.charCodeAt(0);

    if (value >= n) {
      throw new Error(
        "Message contains a character too large for the selected RSA modulus. Use larger primes.",
      );
    }

    encrypted.push(modPow(value, e, n));
  }

  return encrypted.join(" ");
}

function rsaDecrypt(encryptedText, privateKey) {
  if (!privateKey) {
    throw new Error("Generate RSA keys first.");
  }

  const values = encryptedText.trim().split(/\s+/).map(Number);

  if (values.some((value) => !Number.isInteger(value))) {
    throw new Error("RSA encrypted message must contain numeric values.");
  }

  const { d, n } = privateKey;

  return values
    .map((value) => String.fromCharCode(modPow(value, d, n)))
    .join("");
}

function getRSASteps(message, result, keys, operation) {
  return [
    `Prime p = ${keys.p}`,
    `Prime q = ${keys.q}`,
    `n = p × q = ${keys.n}`,
    `φ(n) = (p - 1)(q - 1) = ${keys.phi}`,
    `Public key: (${keys.e}, ${keys.n})`,
    `Private key: (${keys.d}, ${keys.n})`,
    `${operation}: modular exponentiation is applied to each character.`,
    `Final result: ${result}`,
  ];
}
