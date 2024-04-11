import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { IoCloseCircle } from "react-icons/io5";
import { HiTerminal } from "react-icons/hi";
import { AES } from 'crypto-js';

const EncryptWindow = ({ onClose, onWindowClick }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [eMsgInput, setEMsgInput] = useState("");
    const [eMsgValue, setEMsgValue] = useState("");
    const [msgEntered, setMsgEntered] = useState(false);
    const [isTextareaVisible, setIsTextareaVisible] = useState(false);
    const [encryptedMessage, setEncryptedMessage] = useState('=');
    const [key, setKey] = useState('');
    const [loadingDone, setLoadingDone] = useState(false);
    const [msgCopyStatus, setMsgCopyStatus] = useState('Copy');
    const [keyCopyStatus, setKeyCopyStatus] = useState('Copy');
    const [pos, setPos] = useState('');
    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };

    const handleWindowClick = () => {
        onWindowClick();
    }
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setEMsgInput(eMsgValue.trim());
        }
    };


    const handleChange = (e) => {
        setEMsgValue(e.target.value);
    }
    const handleCopy = (text, event, type) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                if (type === 'msg') {
                    setMsgCopyStatus('Copied ✔');
                } else {
                    setKeyCopyStatus('Copied ✔');
                }
                event.target.className = 'copied';
            })
    }

    const reset = () => {
        setEMsgValue('');
        setEMsgInput('');
        setEncryptedMessage('');
        setIsTextareaVisible(true);
        setKey('');
        setKeyCopyStatus('Copy');
        setLoadingDone(false);
        setMsgCopyStatus('Copy');
        setMsgEntered(false);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTextareaVisible(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (eMsgInput !== '') {
            setMsgEntered(true);
            function generateKey() {
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
                let key = '';

                for (let i = 0; i < 6; i++) {
                    const randomIndex = Math.floor(Math.random() * characters.length);
                    key += characters.charAt(randomIndex);
                }
                return key;
            }

            const key = generateKey();
            const eMsg = AES.encrypt(eMsgInput, key).toString();
            setEncryptedMessage(eMsg);
            setKey(key);
        }
    }, [eMsgInput]);
    useEffect(() => {
        if (msgEntered) {
            setTimeout(() => {
                setLoadingDone(true);
            }, 3000);
        }
    }, [msgEntered]);
    return (
        <>
            {isOpen && (
                <Draggable handle='.terminal-name-div'>
                    <div className='terminal' id='encrypt-term' onClick={handleWindowClick}>
                        <div className='terminal-tb'>
                            <div className='tb-grp terminal-name-div'>
                                <HiTerminal className='terminal-icon' />
                                <h5>Encrypt</h5>
                            </div>
                            <IoCloseCircle className='close-btn' onClick={handleClose} size={20} />
                        </div>
                        <div className='terminal-content'>
                            <h5><span className='prompt'>visitor@pcoder.me$~</span> run ./encrypt.sh</h5>
                            {isTextareaVisible && !msgEntered && (
                                <div id='e-input-1'>
                                    <h3>Message:</h3>
                                    <textarea
                                        className="encrypted-msg"
                                        onKeyDown={handleKeyPress}
                                        value={eMsgValue}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                            {msgEntered && !loadingDone && (
                                <div className='loading-bar'>
                                    <div className='loading-progress'></div>
                                    <h5>Encrypting...</h5>
                                </div>
                            )}
                            {loadingDone && (
                                <div id='e-output'>
                                    <h3>Encrypted Message:</h3>
                                    <p className='copyBtn' onClick={(event) => { handleCopy(encryptedMessage, event, 'msg') }}>{msgCopyStatus}</p>
                                    <p id='msg-output'>{encryptedMessage}</p>
                                    <h3>Key:</h3>
                                    <p className='copyBtn' onClick={(event) => { handleCopy(key, event, 'key') }}>{keyCopyStatus}</p>
                                    <p id='key-output'>{key}</p>
                                    <hr />
                                    <h3 className='reset' onClick={() => { reset() }}>ENCRYPT ANOTHER MESSAGE</h3>
                                </div>
                            )}


                        </div>
                    </div>
                </Draggable>
            )}
        </>
    );
};

export default EncryptWindow;
