import { useState } from "react";
import PageLayout from "../components/layout/PageLayout.jsx";
import FAQ from "../components/FAQ.jsx";
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import grocerImg from '../assets/grocer.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    console.log("Form submitted:", formData);
    

    setIsSubmitted(true);
    

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <PageLayout>
      <div className="container">
        <div className="contact-container">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">
            Have questions or feedback? We'd love to hear from you!
          </p>

          {/* Image Gallery */}
          <div className="image-gallery">
            <div className="gallery-item">
              <img src={image1} alt="Feature 1" className="gallery-image" />
              <h3>Smart Shopping</h3>
              <p>Organize your grocery list with ease</p>
            </div>
            <div className="gallery-item">
              <img src={image2} alt="Feature 2" className="gallery-image" />
              <h3>Recipe Integration</h3>
              <p>Discover recipes based on your ingredients</p>
            </div>
            <div className="gallery-item">
              <img src={image3} alt="Feature 3" className="gallery-image" />
              <h3>Easy Management</h3>
              <p>Track and manage your shopping efficiently</p>
            </div>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <div className="info-card">
                <h2 className="info-title">Get In Touch</h2>
                <div className="info-items">
                  <div className="info-item">
                    <h3 className="item-title">Email</h3>
                    <p className="item-content">colormints209@gmail.com</p>
                  </div>
                  <div className="info-item">
                    <h3 className="item-title">Phone</h3>
                    <p className="item-content">+91 8209090893</p>
                  </div>
                  <div className="info-item">
                    <h3 className="item-title">Address</h3>
                    <p className="item-content">
                      SmartCart Services<br />
                      Jaipur
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              <div className="form-card">
                <h2 className="form-title">Send a Message</h2>
                {isSubmitted ? (
                  <div className="success-message">
                    <h3>Message sent!</h3>
                    <p>We've received your message and will respond soon.</p>
                    <button 
                      className="btn btn-primary" 
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        placeholder="Your name"
                      />
                      {errors.name && <div className="error-message">{errors.name}</div>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && <div className="error-message">{errors.email}</div>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="subject" className="form-label">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`form-input ${errors.subject ? 'error' : ''}`}
                        placeholder="What is this regarding?"
                      />
                      {errors.subject && <div className="error-message">{errors.subject}</div>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className={`form-textarea ${errors.message ? 'error' : ''}`}
                        placeholder="Your message here..."
                        rows="5"
                      />
                      {errors.message && <div className="error-message">{errors.message}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary btn-full">
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="faq-section">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <FAQ />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact; 