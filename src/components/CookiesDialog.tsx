import React from 'react';

interface CookiesDialogProps {
  onAccept: () => void;
  onReject: () => void;
}

const CookiesDialog: React.FC<CookiesDialogProps> = ({ onAccept, onReject }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        borderRadius: '5px',
        zIndex: 1000,
        maxWidth: '80%',
        width: '400px',
      }}
    >
      <p>This website uses cookies to enhance your experience. Do you accept?</p>
      <button onClick={onAccept}>Accept</button>
      <button onClick={onReject}>Reject</button>
    </div>
  );
};

export default CookiesDialog;
