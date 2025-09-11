import React from 'react';
import { TextField, TextFieldProps, Box, InputAdornment } from '@mui/material';
import { motion } from 'framer-motion';

interface InputProps extends Omit<TextFieldProps, 'variant' | 'size'> {
  label?: string;
  placeholder?: string;
  type?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  required?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  minRows?: number;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  size?: 'small' | 'medium' | 'lg' | 'md' | 'sm' | 'xl';
  icon?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  glassmorphism?: boolean;
  rounded?: boolean;
  glow?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type = 'text',
  error = false,
  helperText,
  fullWidth = false,
  required = false,
  disabled = false,
  multiline = false,
  rows,
  maxRows,
  minRows,
  startAdornment,
  endAdornment,
  size = 'medium',
  icon,
  onChange,
  onFocus,
  onBlur,
  glassmorphism = false,
  rounded = false,
  glow = false,
  ...props
}) => {
  // Map old size names to MUI sizes
  const getMuiSize = (size: string) => {
    switch (size) {
      case 'sm':
        return 'small';
      case 'md':
        return 'medium';
      case 'lg':
        return 'medium';
      case 'xl':
        return 'medium';
      default:
        return size as 'small' | 'medium';
    }
  };

  const getInputStyles = () => {
    const baseStyles = {
      '& .MuiOutlinedInput-root': {
        borderRadius: rounded ? 3 : 2,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        background: glassmorphism ? 'rgba(255, 255, 255, 0.1)' : 'background.paper',
        backdropFilter: glassmorphism ? 'blur(10px)' : 'none',
        border: glassmorphism ? '1px solid rgba(255, 255, 255, 0.2)' : undefined,
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: glow ? 'primary.main' : 'primary.light',
          borderWidth: glow ? 2 : 1,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'primary.main',
          borderWidth: glow ? 3 : 2,
          boxShadow: glow ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : 'none',
        },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
          borderColor: 'error.main',
          borderWidth: 2,
        },
      },
      '& .MuiInputLabel-root': {
        color: glassmorphism ? 'rgba(255, 255, 255, 0.8)' : 'text.secondary',
        '&.Mui-focused': {
          color: 'primary.main',
          fontWeight: 600,
        },
        '&.Mui-error': {
          color: 'error.main',
        },
      },
      '& .MuiInputBase-input': {
        color: glassmorphism ? 'white' : 'text.primary',
        '&::placeholder': {
          color: glassmorphism ? 'rgba(255, 255, 255, 0.6)' : 'text.disabled',
          opacity: 1,
        },
      },
      '& .MuiFormHelperText-root': {
        color: glassmorphism ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary',
        '&.Mui-error': {
          color: 'error.main',
        },
      },
    };

    return baseStyles;
  };

  const InputComponent = motion(TextField);

  return (
    <InputComponent
      label={label}
      placeholder={placeholder}
      type={type}
      error={error}
      helperText={helperText}
      fullWidth={fullWidth}
      required={required}
      disabled={disabled}
      multiline={multiline}
      rows={rows}
      maxRows={maxRows}
      minRows={minRows}
      size={getMuiSize(size)}
      variant="outlined"
      InputProps={{
        startAdornment: icon || startAdornment ? (
          <InputAdornment position="start">
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: glassmorphism ? 'rgba(255, 255, 255, 0.8)' : 'text.secondary'
            }}>
              {icon || startAdornment}
            </Box>
          </InputAdornment>
        ) : undefined,
        endAdornment: endAdornment ? (
          <InputAdornment position="end">
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: glassmorphism ? 'rgba(255, 255, 255, 0.8)' : 'text.secondary'
            }}>
              {endAdornment}
            </Box>
          </InputAdornment>
        ) : undefined,
      }}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      whileFocus={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      sx={getInputStyles()}
      {...props}
    />
  );
};

export default Input;
