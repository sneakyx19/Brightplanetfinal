
import * as React from 'react';

interface InquiryNotificationEmailProps {
  name: string;
  email: string;
  mobileNumber: string;
  subject: string;
  message: string;
}

export const InquiryNotificationEmail: React.FC<Readonly<InquiryNotificationEmailProps>> = ({
  name,
  email,
  mobileNumber,
  subject,
  message,
}) => (
  <div style={container}>
    <h1 style={heading}>New Website Inquiry</h1>
    <div style={card}>
      <p style={paragraph}>You've received a new message from the contact form on your website.</p>
      
      <div style={detailBox}>
        <p style={detailItem}><strong>From:</strong> {name}</p>
        <p style={detailItem}><strong>Email:</strong> <a href={`mailto:${email}`} style={emailLink}>{email}</a></p>
        <p style={detailItem}><strong>Mobile:</strong> {mobileNumber}</p>
        <p style={detailItem}><strong>Subject:</strong> {subject}</p>
      </div>

      <h2 style={subHeading}>Message:</h2>
      <div style={messageBox}>
        <p style={paragraph}>{message}</p>
      </div>
      
      <p style={footerText}>
        You can reply directly to this person by replying to this email (if your email client supports the 'reply-to' header) or by clicking their email address above.
      </p>
    </div>
  </div>
);

// Styles
const container: React.CSSProperties = {
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  backgroundColor: '#f4f4f7',
  padding: '20px',
};

const card: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  padding: '24px',
  maxWidth: '600px',
  margin: '0 auto',
};

const heading: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#2d3748',
  textAlign: 'center',
  marginBottom: '20px',
};

const subHeading: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#4a5568',
  marginTop: '20px',
  marginBottom: '10px',
  borderBottom: '1px solid #e2e8f0',
  paddingBottom: '5px',
};

const paragraph: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#4a5568',
  margin: '0 0 10px',
};

const detailBox: React.CSSProperties = {
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    padding: '16px',
    margin: '16px 0',
};

const detailItem: React.CSSProperties = {
  fontSize: '16px',
  color: '#4a5568',
  margin: '0 0 8px',
};

const messageBox: React.CSSProperties = {
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
    padding: '16px',
    backgroundColor: '#ffffff',
};

const emailLink: React.CSSProperties = {
    color: '#3479e0',
    textDecoration: 'none',
};

const footerText: React.CSSProperties = {
  fontSize: '12px',
  color: '#718096',
  textAlign: 'center',
  marginTop: '24px',
};
