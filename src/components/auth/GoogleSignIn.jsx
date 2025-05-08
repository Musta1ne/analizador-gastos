import React from 'react';
import Button from '../common/Button';

const GoogleSignIn = () => {
  const handleGoogleSignIn = () => {
    // Implementar la lógica de autenticación con Google
    console.log('Google Sign In clicked');
  };

  return (
    <Button 
      variant="secondary" 
      onClick={handleGoogleSignIn}
      fullWidth
    >
      Sign in with Google
    </Button>
  );
};

export default GoogleSignIn;