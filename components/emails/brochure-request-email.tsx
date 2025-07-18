
import * as React from 'react';

interface BrochureRequestEmailProps {
  mobileNumber: string;
  email?: string;
  courseName: string;
}

export const BrochureRequestEmail: React.FC<Readonly<BrochureRequestEmailProps>> = ({
  mobileNumber,
  email,
  courseName,
}) => (
  <div style={container}>
    <h1 style={heading}>New Brochure Request</h1>
    <div style={card}>
      <p style={paragraph}>You have a new request to download the brochure for the following course:</p>
      <p style={courseNameStyle}>{courseName}</p>
      <hr style={hr} />
      <h2 style={subHeading}>Contact Details:</h2>
      <p style={detailItem}>
        <strong>Mobile Number:</strong> {mobileNumber}
      </p>
      {email && (
        <p style={detailItem}>
          <strong>Email:</strong> {email}
        </p>
      )}
      <p style={footerText}>
        This notification was sent from your website's brochure download form.
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
  color: '#3479e0', // A nice blue
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
