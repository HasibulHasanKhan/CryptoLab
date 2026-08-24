# 🔐 CryptoLab

## Interactive Cryptography Algorithm Visualizer & Encryption Tool

CryptoLab is a frontend-only educational web application designed to demonstrate important cryptographic algorithms through encryption, decryption, visualization, testing, and interactive experimentation.

The project was developed using:

- HTML5
- CSS3
- Vanilla JavaScript
- Browser LocalStorage

No backend, database, Node.js, or external server is required.

---

## 🚀 Features

### Classical Cryptography

- Caesar Cipher encryption and decryption
- Vigenère Cipher encryption and decryption

### Symmetric Cryptography

- Educational DES-style 16-round Feistel visualization
- Educational AES-style encryption demonstration

### Asymmetric Cryptography

- RSA prime validation
- RSA key generation
- Public and private key generation
- RSA encryption
- RSA decryption

### Additional Features

- Step-by-step algorithm visualization
- Input validation
- Error handling
- Algorithm comparison
- Automated tests
- Pass/fail statistics
- Encryption history
- LocalStorage support
- Delete individual history items
- Clear all history
- Export history as JSON
- Copy encryption results
- Download results
- Responsive design
- Keyboard shortcuts
- Dynamic copyright year
- Loading animation

---

## 📁 Project Structure

```text
CryptoLab/
│
├── index.html
├── README.md
├── LICENSE
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── caesar.js
│   ├── vigenere.js
│   ├── rsa.js
│   ├── des.js
│   ├── aes.js
│   ├── tests.js
│   └── history.js
│
└── assets/
    ├── images/
    └── icons/
```

---

## ▶️ How to Run

1. Download or clone the project.
2. Open the project folder using Visual Studio Code.
3. Install the Live Server extension.
4. Open `index.html`.
5. Click **Go Live**.

The application will open in your browser.

---

## ⌨️ Keyboard Shortcuts

| Shortcut             | Action  |
| -------------------- | ------- |
| Ctrl + Enter         | Encrypt |
| Ctrl + Shift + Enter | Decrypt |

---

## 🧪 Automated Testing

CryptoLab contains built-in automated tests for:

- Caesar Cipher
- Vigenère Cipher
- RSA
- DES demonstration
- AES demonstration

Open the **Testing** section and click:

```text
Run Automated Tests
```

---

## ⚠️ Educational Notice

CryptoLab is designed for educational purposes and for demonstrating cryptographic concepts.

The classical algorithms and educational DES/AES demonstrations in this project should not be used to protect real confidential, financial, personal, or security-sensitive information.

Production cryptographic systems should use well-reviewed cryptographic libraries and modern security practices.

---

## 📚 Algorithms

```text
Classical Cryptography
├── Caesar Cipher
└── Vigenère Cipher

Symmetric Cryptography
├── DES-style Educational Demonstration
└── AES-style Educational Demonstration

Asymmetric Cryptography
└── RSA
```

---

## 👨‍💻 Academic Purpose

This project was created as a university course project for:

**Cyber Security & Cryptography**

---

## 📄 License

This project is licensed under the MIT License.
