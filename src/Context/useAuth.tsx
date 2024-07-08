// useAuth.tsx

import React from 'react';
import { UserContext } from './UserContext';

export const useAuth = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a UserProvider');
  }
  return context;
};
