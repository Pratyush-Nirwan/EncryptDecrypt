import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { IoCloseCircle } from "react-icons/io5";
import { HiTerminal } from "react-icons/hi";
import { AES, enc } from 'crypto-js';

const DecryptWindow = ({ onClose, onWindowClick }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isTextareaVisible, setIsTextareaVisible] = useState(false);
    const [keyValue, setKeyValue] = useState('');
    const [tempKeyValue, setTempKeyValue] = useState('');
    const [eMsgValue, setEMsgValue] = useState('');
    const [eMsgInput, setEMsgInput] = useState('');
    const [msgCopyStatus, setMsgCopyStatus] = useState('Copy');
    const [msgEntered, setMsgEntered] = useState(false);
    const [keyEntered, setKeyEntered] = useState(false);
    const [loadingDone, setLoadingDone] = useState(false);
    const [decryptedMsg, setDecryptedMsg] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };

    const handleWindowClick = () => {
        onWindowClick();
    }

    const reset = () => {
        setDecryptedMsg('');
        setEMsgInput('');
        setEMsgValue('');
        setKeyEntered(false);
        setKeyValue('');
        setLoadingDone(false);
        setMsgCopyStatus('Copy');
        setMsgEntered('');
        setTempKeyValue('');
    }
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (!msgEntered) {
                setEMsgInput(eMsgValue.trim());
            } else {
                setKeyValue(tempKeyValue.trim());
            }
        }
    };


    const handleChange = (e) => {
        if (!msgEntered) {
            setEMsgValue(e.target.value);
        } else {
            setTempKeyValue(e.target.value);
        }
    }
    const handleCopy = (text, event, type) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setMsgCopyStatus('Copied ✔');
                event.target.className = 'copied';
            })
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
        }
    }, [eMsgInput])
    useEffect(() => {
        if (keyValue !== '') {
            setKeyEntered(true);
            setTimeout(() => {
                setLoadingDone(true);
                const decryptedMsg = AES.decrypt(eMsgInput, keyValue).toString(enc.Utf8);
                setDecryptedMsg(decryptedMsg);
            }, 3000);
        }
    }, [keyValue])

    return (
        <>
            {isOpen && (
                <Draggable handle='.terminal-name-div'>
                    <div className='terminal' id='decrypt-term' onClick={handleWindowClick}>
                        <div className='terminal-tb'>
                            <div className='tb-grp terminal-name-div'>
                                <HiTerminal className='terminal-icon' />
                                <h5>Decrypt</h5>
                            </div>
                            <IoCloseCircle className='close-btn' onClick={handleClose} size={20} />
                        </div>
                        <div className='terminal-content'>
                            <h5><span className='prompt'>visitor@pcoder.me$~</span> run ./decrypt.sh</h5>
                            {isOpen && !msgEntered && isTextareaVisible && (
                                <div id='d-input-1'>
                                    <h3>Encrypted Message:</h3>
                                    <textarea
                                        className="encrypted-msg"
                                        onKeyDown={handleKeyPress}
                                        value={eMsgValue}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                            {msgEntered && !keyEntered && (
                                <div id='d-input-2'>
                                    <h3>Key:</h3>
                                    <input type='password'
                                        id='key'
                                        onKeyDown={handleKeyPress}
                                        value={tempKeyValue}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                            {keyEntered && !loadingDone && (
                                <div className='loading-bar'>
                                    <div className='loading-progress'></div>
                                    <h5>Decrypting...</h5>
                                </div>
                            )}
                            {loadingDone && (
                                <div className='d-output'>
                                    <h3>Decrypted Message:</h3>
                                    <p className='copyBtn' onClick={(event) => { handleCopy(decryptedMsg, event,) }}>{msgCopyStatus}</p>
                                    <p id='msg-output'>{decryptedMsg}</p>
                                    <hr />
                                    <h3 className='reset' onClick={() => { reset() }}>DECRYPT ANOTHER MESSAGE</h3>
                                </div>

                            )}
                        </div>
                    </div>
                </Draggable>
            )}
        </>
    );
};

export default DecryptWindow;
