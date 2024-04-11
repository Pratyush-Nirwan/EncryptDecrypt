import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { IoCloseCircle } from "react-icons/io5";
import { HiTerminal } from "react-icons/hi";
import photo from '../assets/ed.png';

const AboutWindow = ({ onClose, onWindowClick }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isAboutVisible, setIsAboutVisible] = useState(false)
    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };

    const handleWindowClick = () => {
        onWindowClick();
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAboutVisible(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isOpen && (
                <Draggable handle='.terminal-name-div'>
                    <div className='terminal' id='about-term' onClick={handleWindowClick}>
                        <div className='terminal-tb'>
                            <div className='tb-grp terminal-name-div'>
                                <HiTerminal className='terminal-icon' />
                                <h5>About</h5>
                            </div>
                            <IoCloseCircle className='close-btn' onClick={handleClose} size={20} />
                        </div>
                        <div className='terminal-content'>
                            <h5><span className='prompt'>visitor@pcoder.me$~</span> run ./about.sh</h5>
                            {isOpen && isAboutVisible && (<div id='about-content'>
                                <img src={photo} alt='' id='icon' />
                                <div id='about-text'>
                                    <h3>Encrypt Decrypt</h3>
                                    <p>Encrypt Decrypt is a simple tool that allows users to encrypt and decrypt messages using AES encryption with a randomly generated key. It provides a user-friendly interface for secure message handling.</p>
                                    <h3>How does it work?</h3>
                                    <p>This tool utilizes the AES (Advanced Encryption Standard) algorithm for both encryption and decryption processes. It employs a randomly generated key consisting of 6 characters to secure the messages.</p>
                                    <h3>Credits</h3>
                                    <p>Created by Pratyush Nirwan <br /> <br />
                                        Libraries used - <br />
                                        <a href='https://www.npmjs.com/package/crypto-js' target='_blank'>Crypto-js</a> <br />
                                        <a href='https://www.npmjs.com/package/react-draggable' target='_blank'>react-draggable</a> <br />
                                        <a href='https://www.npmjs.com/package/react-icons' target='_blank'>react-icons</a>
                                    </p>
                                </div>
                            </div>)}
                        </div>
                    </div>
                </Draggable>
            )}
        </>
    )
}

export default AboutWindow