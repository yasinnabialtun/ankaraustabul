import React from 'react';
import { motion } from 'framer-motion';

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const SkipLink: React.FC<SkipLinkProps> = ({ 
  href, 
  children, 
  className = '' 
}) => {
  return (
    <motion.a
      href={href}
      className={`
        absolute top-4 left-4 z-50 px-4 py-2 
        bg-blue-600 text-white rounded-lg 
        transform -translate-y-full 
        focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        transition-transform duration-200
        ${className}
      `}
      whileFocus={{ y: 0 }}
      initial={{ y: '-100%' }}
    >
      {children}
    </motion.a>
  );
};

export default SkipLink;
