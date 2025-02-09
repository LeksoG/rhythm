// src/components/ui/button.js
import React from 'react';

export const Button = ({ children, className, onClick }) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};
