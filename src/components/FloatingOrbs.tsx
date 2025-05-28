
import React from 'react';

export const FloatingOrbs = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="floating-orb w-32 h-32 top-20 left-10" style={{ animationDelay: '0s' }} />
      <div className="floating-orb w-24 h-24 top-1/3 right-20" style={{ animationDelay: '2s' }} />
      <div className="floating-orb w-40 h-40 bottom-32 left-1/4" style={{ animationDelay: '4s' }} />
      <div className="floating-orb w-28 h-28 bottom-20 right-1/3" style={{ animationDelay: '1s' }} />
      <div className="floating-orb w-36 h-36 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '3s' }} />
    </div>
  );
};
