
import * as React from 'react';

interface WorkshopSignupEmailProps {
  name: string;
  email: string;
  mobileNumber: string;
  workshopTitle: string;
}

export const WorkshopSignupEmail: React.FC<Readonly<WorkshopSignupEmailProps>> = ({
  name,
  email,
  mobileNumber,
  workshopTitle,
}) => (
  <div style={container}>
    <h1 style={heading}>New Workshop Signup</h1>
    <div style={card}>
      <p style={paragraph}>A new participant has signed up for a workshop:</p>
      <p style={courseNameStyle}>{workshopTitle}</p>
      <hr style={hr} />
      <h2 style={subHeading}>Participant Details:</h2>
       <p style={detailItem}>
        <strong>Name:</strong> {name}
      </p>
      <p style={detailItem}>
        <strong>Email:</strong> <a href={`mailto:${email}`} style={emailLink}>{email}</a>
      </p>
      <p style={detailItem}>
        <strong>Mobile Number:</strong> {mobileNumber}
      </p>
      <p style={footerText}>
        This notification was sent from your website's workshop signup form.
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
};

const paragraph: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#4a5568',
};

const courseNameStyle: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#3479e0',
  textAlign: 'center',
  margin: '16px 0',
  padding: '12px',
  backgroundColor: '#f0f5ff',
  borderRadius: '4px',
};

const detailItem: React.CSSProperties = {
  fontSize: '16px',
  color: '#4a5568',
  marginBottom: '8px',
};

const emailLink: React.CSSProperties = {
    color: '#3479e0',
    textDecoration: 'none',
};

const hr: React.CSSProperties = {
  borderColor: '#e2e8f0',
  margin: '20px 0',
};

const footerText: React.CSSProperties = {
  fontSize: '12px',
  color: '#718096',
  textAlign: 'center',
  marginTop: '24px',
};
