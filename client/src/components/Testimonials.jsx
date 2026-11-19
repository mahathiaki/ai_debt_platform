import "./Testimonials.css";

function Testimonials() {
    return (
        <section className="testimonials">
            <h2>What Our Users Say</h2>

            <div className="testimonial-container">

                <div className="testimonial-card">
                    <h3>⭐⭐⭐⭐⭐</h3>
                    <p>
                        "This platform helped me organize my finances and create a clear
                        repayment plan. The AI suggestions were very useful!"
                    </p>
                    <h4>- Rahul Sharma</h4>
                </div>

                <div className="testimonial-card">
                    <h3>⭐⭐⭐⭐⭐</h3>
                    <p>
                        "I was struggling with multiple loans, but this platform made it
                        easier to manage everything in one place."
                    </p>
                    <h4>- Priya Reddy</h4>
                </div>

                <div className="testimonial-card">
                    <h3>⭐⭐⭐⭐⭐</h3>
                    <p>
                        "The financial insights and debt analysis gave me confidence to
                        improve my financial future."
                    </p>
                    <h4>- Arjun Kumar</h4>
                </div>

            </div>
        </section>
    );
}

export default Testimonials;