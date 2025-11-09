import Footer from "../components/footer";
import Navbar from "../components/navbar";
import "../style/contact.css";

function Contact() {
    return (
        <>
            <Navbar />
            <div className="contact-container">
                <div className="contact-left">
                    <h1>Get in Touch</h1>
                    <p>Want to collaborate or just say hi? I'd love to hear from you!</p>

                    <div className="contact-info">
                        <div className="contact-item">
                            <h3>Contact Information</h3>
                            <i className="fa fa-envelope"></i>
                            <p>email@example.com</p>
                        </div>

                        <div className="contact-item">
                            <i className="fa fa-phone"></i>
                            <p>+123-456-7890</p>
                        </div>

                        <div className="contact-item">
                            <h3>Visit Us</h3>
                            <i className="fa fa-map-marker"></i>
                            <p>123 Main St, Anytown, Munnar</p>
                        </div>

                        <div className="contact-item">
                            <h3>Office Hours</h3>
                            <p>
                                Monday - Friday: 9:00 AM - 5:00 PM<br />
                                Saturday: 10:00 AM - 2:00 PM<br />
                                Sunday: Closed
                            </p>
                        </div>
                    </div>
                </div>

                <div className="contact-right">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31425.799283407574!2d77.04353532597334!3d10.08064890917233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0799794d099a6d%3A0x63250e5553c7e0c!2sMunnar%2C%20Kerala%20685612!5e0!3m2!1sen!2sin!4v1760592369278!5m2!1sen!2sin"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="location-map"
                    ></iframe>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Contact;
