'use client';

import React, { useState, useEffect } from 'react';

// Define alert types for styling
type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  message: string;
  autoClose?: boolean;
  duration?: number;
  onClose?: () => void;
}

export default function Alert({
  type,
  message,
  autoClose = true,
  duration = 5000,
  onClose,
}: AlertProps) {
  const [visible, setVisible] = useState(true);

  // Auto-close functionality
  useEffect(() => {
    if (autoClose && visible) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose, visible]);

  // Handle close button click
  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  // If not visible, don't render
  if (!visible) return null;

  // Content sanitization is handled by React
  // Determine styles based on type
  const styles = {
    base: 'rounded-md p-4 mb-4 flex items-center justify-between',
    success: 'bg-green-50 border-l-4 border-green-500 text-green-700',
    error: 'bg-red-50 border-l-4 border-red-500 text-red-700',
    warning: 'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700',
    info: 'bg-blue-50 border-l-4 border-blue-500 text-blue-700',
  };

  const alertStyle = `${styles.base} ${styles[type]}`;

  return (
    <div className={alertStyle} role="alert">
      <div className="flex-1">
        <p className="text-sm">{message}</p>
      </div>
      <button
        onClick={handleClose}
        className="ml-4 text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        <span className="text-xl">&times;</span>
      </button>
    </div>
  );
}
