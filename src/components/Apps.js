import { FcDataEncryption, FcUnlock, FcAbout } from "react-icons/fc";
import { useEffect, useState } from "react";
import EncryptWindow from "./EncryptWindow";
import DecryptWindow from "./DecryptWindow";
import AboutWindow from "./AboutWindow";
const Apps = () => {
    const [showEncryptWindow, setShowEncryptWindow] = useState(false);
    const [showDecryptWindow, setShowDecryptWindow] = useState(false);
    const [showAboutWindow, setShowAboutWindow] = useState(false)
    const [encryptZindex, setEncryptZindex] = useState(1);
    const [decryptZindex, setDecryptZindex] = useState(2);
    const [aboutZindex, setAboutZindex] = useState(3);

    function openEncrypt() {
        setShowEncryptWindow(true);
    }

    function openDecrypt() {
        setShowDecryptWindow(true);
    }

    function openAbout() {
        setShowAboutWindow(true);
    }
    function handleTermClick(term) {
        if (term === 'encrypt') {
            setEncryptZindex(3);
            setDecryptZindex(1);
            setAboutZindex(1);
        } else if (term === 'decrypt') {
            setEncryptZindex(1);
            setDecryptZindex(3);
            setAboutZindex(1);
        } else {
            setEncryptZindex(1);
            setDecryptZindex(1);
            setAboutZindex(3);
        }
    }

    useEffect(() => {
        const encrypt = document.getElementById('encrypt-term');
        const decrypt = document.getElementById('decrypt-term');
        const about = document.getElementById('about-term');

        if (encrypt && decrypt && about) {
            encrypt.style.zIndex = encryptZindex;
            decrypt.style.zIndex = decryptZindex;
            about.style.zIndex = aboutZindex;
        }
    }, [decryptZindex, encryptZindex, aboutZindex]);

    return (
        <div id="apps">
            <div className="icon-div" onClick={openEncrypt}>
                <FcDataEncryption className="icon" size={50} />
                <h5>Encrypt</h5>
            </div>
            <div className="icon-div" onClick={openDecrypt}>
                <FcUnlock className="icon" size={50} />
                <h5>Decrypt</h5>
            </div>
            <div className="icon-div" onClick={openAbout}>
                <FcAbout className="icon" size={50} />
                <h5>About</h5>
            </div>
            {showEncryptWindow && <EncryptWindow id="encrypt-term" onClose={() => setShowEncryptWindow(false)} onWindowClick={() => handleTermClick('encrypt')} />}
            {showDecryptWindow && <DecryptWindow id="decrypt-term" onClose={() => setShowDecryptWindow(false)} onWindowClick={() => handleTermClick('decrypt')} />}
            {showAboutWindow && <AboutWindow id="about-term" onClose={() => setShowAboutWindow(false)} onWindowClick={() => handleTermClick('about')} />}

        </div>
    );
};

export default Apps;
