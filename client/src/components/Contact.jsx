import "./Contact.css";

function Contact() {
    return (
        <section id="contact" className="contact">
            <h2>Contact Us</h2>

            <div className="contact-container">
                <form>
                    <input type="text" placeholder="Enter your name" />

                    <input type="email" placeholder="Enter your email" />

                    <textarea
                        rows="5"
                        placeholder="Enter your message"
                    ></textarea>

                    <button type="submit">Send Message</button>
                </form>
            </div>
        </section>
    );
}

export default Contact;