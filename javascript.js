const encryptMessageBox = document.getElementById("encrypt-card-text");
const decryptMessageBox = document.getElementById("decrypt-card-text");
const KeyGen = document.getElementById("key-gen")
const encryptBtn = document.getElementById("encrypt-btn");
const decryptBtn = document.getElementById("decrypt-btn");
const keyValue = document.getElementById("key-text");
const popup = document.getElementById("blur-div")
const popupDecryptBox = document.getElementById("decrypted-message-card")
const popupEncryptBox = document.getElementById("encrypted-message-card")
const encryptedMessageBox = document.getElementById("encrypted-message")
const decryptedMessageBox = document.getElementById("decrypted-message")
const EcloseBtn = document.getElementById("e-close-btn")
const DcloseBtn = document.getElementById("d-close-btn")

function generateKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  let key = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    key += characters.charAt(randomIndex);
  }
  return key;
}


function encryptMessage(message, key) {
  const encrypted = CryptoJS.AES.encrypt(message, key);
  return encrypted.toString();
}

function decryptMessage(message, key) {
  const decrypted = CryptoJS.AES.decrypt(message, key);
  return decrypted.toString(CryptoJS.enc.Utf8);
}
function activateCopy(copyBtn,tocopy){
  document.getElementById(copyBtn).addEventListener('click', () => {
    const textToCopy = document.getElementById(tocopy).textContent;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch(err => {
        console.error("Unable to copy text: " + err);
        alert("Unable to copy text. Please try again manually.");
      });
  })
}


encryptBtn.addEventListener('click', () => {
  if (encryptMessageBox.value.trim() === '') {
    return;
  } else {
    const key = generateKey();
    const message = encryptMessageBox.value;
    const encryptedMessage = encryptMessage(message, key);
    encryptedMessageBox.innerHTML = encryptedMessage;
    popup.style.display = "flex"
    popupDecryptBox.style.display = "none"
    popupEncryptBox.style.display = "flex"
    KeyGen.innerHTML = key;
    activateCopy('encrypted-copy-btn','encrypted-message')
    activateCopy('key-copy-btn', 'key-gen')
  }
})

decryptBtn.addEventListener('click', () => {
  if (decryptMessageBox.value.trim() === '') {
    return;
  } else {
    const key = keyValue.value;
    const message = decryptMessageBox.value;
    const decryptedMessage = decryptMessage(message, key);
    decryptedMessageBox.innerHTML = decryptedMessage;
    popup.style.display="flex"
    popupEncryptBox.style.display = "none"
    popupDecryptBox.style.display = "flex"
    activateCopy('decrypted-copy-btn','decrypted-message')
  }
})

EcloseBtn.addEventListener('click', () => {
  popup.style.animation="fade-out 0.2s forwards"
  popupEncryptBox.style.animation="fade-out 0.2s forwards"
  setTimeout(() => {
    popup.style.display = "none"
  }, 200);
})
DcloseBtn.addEventListener('click', () => {
  popup.style.animation="fade-out 0.2s forwards"
  popupDecryptBox.style.animation="fade-out 0.2s forwards"
  setTimeout(() => {
    popup.style.display = "none"
  }, 200);
})

//created by pratyush with ♡