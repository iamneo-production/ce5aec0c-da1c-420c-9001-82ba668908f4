import React from 'react';
import '../CSS/Contact.css'; 
const ContactUs=()=>{
    return (
        <div className='about-us-container'>
          <h1>Contact Us</h1>
    
          <p>
            We value your feedback and are here to assist you. If you have any questions, comments, or concerns regarding our online admission portal, please feel free to get in touch with us using the contact information provided below.
          </p>
    
          <h2>Contact Information</h2>
          <ul>
            <li>
              <strong>Phone:</strong> +1 123-456-7890
            </li>
            <li>
              <strong>Email:</strong> info@admissionportal.com
            </li>
            <li>
              <strong>Address:</strong> 123 Main Street, City, Country, ZIP Code
            </li>
          </ul>
    
          <h2>Office Hours</h2>
          <p>
            Our office is open Monday through Friday from 9:00 AM to 5:00 PM (local time). We strive to respond to inquiries within 24 hours during business days.
          </p>
    
          <h2>Get in Touch</h2>
          <p>
            If you prefer to reach us electronically, you can send us an email where mentioned above, with your subject and queries and we will get back to you as soon as possible.
          </p>
        </div>
      );
}
export default ContactUs;