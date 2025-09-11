import React from 'react';
import { motion } from 'framer-motion';
import {
  Card as MuiCard,
  CardProps as MuiCardProps,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Star as StarIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { cardVariants, cardHoverVariants } from '../animations';

interface CardProps extends Omit<MuiCardProps, 'component'> {
  image?: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  rating?: number;
  location?: string;
  phone?: string;
  email?: string;
  actions?: React.ReactNode;
  hover?: boolean;
  glassmorphism?: boolean;
  gradient?: boolean;
  onFavorite?: () => void;
  isFavorite?: boolean;
  featured?: boolean;
  verified?: boolean;
  price?: string;
  category?: string;
  experience?: string;
  reviews?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  image,
  imageAlt,
  title,
  subtitle,
  description,
  rating,
  location,
  phone,
  email,
  actions,
  hover = false,
  glassmorphism = false,
  gradient = false,
  onFavorite,
  isFavorite = false,
  featured = false,
  verified = false,
  price,
  category,
  experience,
  reviews,
  ...props
}) => {
  const CardComponent = hover ? motion(MuiCard) : MuiCard;

  return (
    <CardComponent
      {...(hover && {
        variants: cardVariants,
        initial: "initial",
        whileHover: "hover",
        whileTap: { scale: 0.98 },
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      })}
      className={`${glassmorphism ? 'glassmorphism' : ''} ${gradient ? 'gradient-bg' : ''}`}
      sx={{
        borderRadius: 4,
        background: glassmorphism 
          ? 'rgba(255, 255, 255, 0.95)' 
          : gradient 
            ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
            : 'background.paper',
        backdropFilter: glassmorphism ? 'blur(20px)' : 'none',
        border: glassmorphism 
          ? '1px solid rgba(255, 255, 255, 0.3)' 
          : gradient 
            ? 'none'
            : '1px solid rgba(0, 0, 0, 0.05)',
        boxShadow: glassmorphism 
          ? '0 8px 32px rgba(0, 0, 0, 0.1)' 
          : gradient 
            ? '0 8px 32px rgba(59, 130, 246, 0.3)'
            : '0 4px 12px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        '&:hover': {
          boxShadow: glassmorphism 
            ? '0 12px 40px rgba(0, 0, 0, 0.15)' 
            : gradient 
              ? '0 12px 40px rgba(59, 130, 246, 0.4)'
              : '0 8px 25px rgba(0, 0, 0, 0.15)',
        },
        // Yazı renklerini garanti et
        '& .MuiTypography-root': {
          color: glassmorphism 
            ? '#1e293b !important' 
            : gradient 
              ? '#ffffff !important'
              : '#1e293b !important',
        },
        '& .MuiTypography-h1, & .MuiTypography-h2, & .MuiTypography-h3, & .MuiTypography-h4, & .MuiTypography-h5, & .MuiTypography-h6': {
          color: glassmorphism 
            ? '#1e293b !important' 
            : gradient 
              ? '#ffffff !important'
              : '#1e293b !important',
          textShadow: glassmorphism 
            ? '0 1px 3px rgba(255, 255, 255, 0.9) !important'
            : gradient 
              ? '0 1px 3px rgba(0, 0, 0, 0.3) !important'
              : 'none',
        },
        '& .MuiTypography-body1, & .MuiTypography-body2': {
          color: glassmorphism 
            ? '#475569 !important' 
            : gradient 
              ? 'rgba(255, 255, 255, 0.9) !important'
              : '#334155 !important',
          textShadow: glassmorphism 
            ? '0 1px 2px rgba(255, 255, 255, 0.6) !important'
            : gradient 
              ? '0 1px 2px rgba(0, 0, 0, 0.2) !important'
              : 'none',
        },
        // Tüm HTML elementleri için renk garantisi
        '& h1, & h2, & h3, & h4, & h5, & h6': {
          color: glassmorphism 
            ? '#1e293b !important' 
            : gradient 
              ? '#ffffff !important'
              : '#1e293b !important',
          textShadow: glassmorphism 
            ? '0 1px 3px rgba(255, 255, 255, 0.9) !important'
            : gradient 
              ? '0 1px 3px rgba(0, 0, 0, 0.3) !important'
              : 'none',
        },
        '& p, & span, & div': {
          color: glassmorphism 
            ? '#475569 !important' 
            : gradient 
              ? 'rgba(255, 255, 255, 0.9) !important'
              : '#334155 !important',
          textShadow: glassmorphism 
            ? '0 1px 2px rgba(255, 255, 255, 0.6) !important'
            : gradient 
              ? '0 1px 2px rgba(0, 0, 0, 0.2) !important'
              : 'none',
        },
      }}
      {...props}
    >
      {/* Featured Badge */}
      {featured && (
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            zIndex: 2,
          }}
        >
          <Chip
            label="Öne Çıkan"
            size="small"
            sx={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.75rem',
              boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
            }}
          />
        </Box>
      )}

      {/* Favorite Button */}
      {onFavorite && (
        <IconButton
          onClick={onFavorite}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: isFavorite ? '#ef4444' : '#64748b',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
              color: isFavorite ? '#dc2626' : '#ef4444',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      )}

      {/* Image */}
      {image && (
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt={imageAlt || title}
            sx={{ 
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
          {/* Gradient Overlay */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '60%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />
        </Box>
      )}

      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: glassmorphism 
                  ? '#1e293b !important' 
                  : gradient 
                    ? '#ffffff !important'
                    : '#1e293b !important',
                textShadow: glassmorphism 
                  ? '0 1px 3px rgba(255, 255, 255, 0.9) !important'
                  : gradient 
                    ? '0 1px 3px rgba(0, 0, 0, 0.3) !important'
                    : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {title}
              {verified && (
                <Box
                  component="span"
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  ✓
                </Box>
              )}
            </Typography>
            {price && (
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: glassmorphism 
                    ? '#3b82f6 !important' 
                    : gradient 
                      ? '#ffffff !important'
                      : '#3b82f6 !important',
                  textShadow: glassmorphism 
                    ? '0 1px 2px rgba(255, 255, 255, 0.8) !important'
                    : gradient 
                      ? '0 1px 2px rgba(0, 0, 0, 0.2) !important'
                      : 'none',
                }}
              >
                {price}
              </Typography>
            )}
          </Box>

          {subtitle && (
            <Typography
              variant="body2"
              sx={{
                color: glassmorphism 
                  ? '#475569 !important' 
                  : gradient 
                    ? 'rgba(255, 255, 255, 0.8) !important'
                    : '#64748b !important',
                textShadow: glassmorphism 
                  ? '0 1px 2px rgba(255, 255, 255, 0.6) !important'
                  : gradient 
                    ? '0 1px 2px rgba(0, 0, 0, 0.2) !important'
                    : 'none',
                fontWeight: 500,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {/* Rating and Reviews */}
        {(rating || reviews) && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            {rating && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <StarIcon 
                  sx={{ 
                    fontSize: 16, 
                    color: '#f59e0b',
                  }} 
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: glassmorphism 
                      ? '#1e293b !important' 
                      : gradient 
                        ? '#ffffff !important'
                        : '#1e293b !important',
                    textShadow: glassmorphism 
                      ? '0 1px 2px rgba(255, 255, 255, 0.8) !important'
                      : gradient 
                        ? '0 1px 2px rgba(0, 0, 0, 0.2) !important'
                        : 'none',
                  }}
                >
                  {rating}
                </Typography>
              </Box>
            )}
            {reviews && (
              <Typography
                variant="body2"
                sx={{
                  color: glassmorphism 
                    ? '#64748b !important' 
                    : gradient 
                      ? 'rgba(255, 255, 255, 0.7) !important'
                      : '#64748b !important',
                  textShadow: glassmorphism 
                    ? '0 1px 2px rgba(255, 255, 255, 0.6) !important'
                    : gradient 
                      ? '0 1px 2px rgba(0, 0, 0, 0.2) !important'
                      : 'none',
                }}
              >
                ({reviews} değerlendirme)
              </Typography>
            )}
          </Box>
        )}

        {/* Category and Experience */}
        {(category || experience) && (
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            {category && (
              <Chip
                label={category}
                size="small"
                sx={{
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  color: '#3b82f6',
                  fontWeight: 500,
                  fontSize: '0.75rem',
                }}
              />
            )}
            {experience && (
              <Chip
                label={`${experience} yıl deneyim`}
                size="small"
                sx={{
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  color: '#10b981',
                  fontWeight: 500,
                  fontSize: '0.75rem',
                }}
              />
            )}
          </Box>
        )}

        {/* Description */}
        {description && (
          <Typography
            variant="body2"
            sx={{
              color: glassmorphism 
                ? '#475569 !important' 
                : gradient 
                  ? 'rgba(255, 255, 255, 0.8) !important'
                  : '#64748b !important',
              textShadow: glassmorphism 
                ? '0 1px 2px rgba(255, 255, 255, 0.6) !important'
                : gradient 
                  ? '0 1px 2px rgba(0, 0, 0, 0.2) !important'
                  : 'none',
              mb: 2,
              lineHeight: 1.6,
            }}
          >
            {description}
          </Typography>
        )}

        {/* Contact Info */}
        {(location || phone || email) && (
          <Box sx={{ mb: 2 }}>
            {location && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <LocationIcon 
                  sx={{ 
                    fontSize: 16, 
                    color: glassmorphism 
                      ? '#64748b' 
                      : gradient 
                        ? 'rgba(255, 255, 255, 0.7)'
                        : '#64748b',
                  }} 
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: glassmorphism 
                      ? '#475569 !important' 
                      : gradient 
                        ? 'rgba(255, 255, 255, 0.8) !important'
                        : '#475569 !important',
                    textShadow: glassmorphism 
                      ? '0 1px 2px rgba(255, 255, 255, 0.6) !important'
                      : gradient 
                        ? '0 1px 2px rgba(0, 0, 0, 0.2) !important'
                        : 'none',
                    fontSize: '0.875rem',
                  }}
                >
                  {location}
                </Typography>
              </Box>
            )}
            {phone && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <PhoneIcon 
                  sx={{ 
                    fontSize: 16, 
                    color: glassmorphism 
                      ? '#64748b' 
                      : gradient 
                        ? 'rgba(255, 255, 255, 0.7)'
                        : '#64748b',
                  }} 
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: glassmorphism 
                      ? '#475569 !important' 
                      : gradient 
                        ? 'rgba(255, 255, 255, 0.8) !important'
                        : '#475569 !important',
                    textShadow: glassmorphism 
                      ? '0 1px 2px rgba(255, 255, 255, 0.6) !important'
                      : gradient 
                        ? '0 1px 2px rgba(0, 0, 0, 0.2) !important'
                        : 'none',
                    fontSize: '0.875rem',
                  }}
                >
                  {phone}
                </Typography>
              </Box>
            )}
            {email && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon 
                  sx={{ 
                    fontSize: 16, 
                    color: glassmorphism 
                      ? '#64748b' 
                      : gradient 
                        ? 'rgba(255, 255, 255, 0.7)'
                        : '#64748b',
                  }} 
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: glassmorphism 
                      ? '#475569 !important' 
                      : gradient 
                        ? 'rgba(255, 255, 255, 0.8) !important'
                        : '#475569 !important',
                    textShadow: glassmorphism 
                      ? '0 1px 2px rgba(255, 255, 255, 0.6) !important'
                      : gradient 
                        ? '0 1px 2px rgba(0, 0, 0, 0.2) !important'
                        : 'none',
                    fontSize: '0.875rem',
                  }}
                >
                  {email}
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {/* Actions */}
        {actions && (
          <Box sx={{ mt: 2 }}>
            {actions}
          </Box>
        )}

        {/* Children */}
        {children}
      </CardContent>
    </CardComponent>
  );
};

export default Card;
