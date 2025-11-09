import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-column">
                    <h3>Our Services</h3><br />
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Quick Link</h3><br />
                    <ul>
                        <li><a href="#">Knowledge Base</a></li>
                        <li><a href="#">Hire An Expert</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Get In Touch</h3><br />
                    <p>+91 8089788173</p>
                    <p>communitygarden@gmail.com</p>
                    <p>233, Hill Valley, India</p>
                </div>
            </div>

            <hr />

            <div className="footer-bottom">
                <div className="footer-socials">
                    <a href="#"><FaFacebook /></a>
                    <a href="#"><FaTwitter /></a>
                    <a href="#"><FaInstagram /></a>
                    <a href="#"><FaLinkedinIn /></a>
                </div>
                <p>Copyright ©2020 All rights reserved | Block is made with by <a href="#" className="text-info"> Mudassar Chaudhry</a></p>
            </div>
        </footer>
    );
}

export default Footer;
