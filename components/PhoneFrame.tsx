import React from 'react';
import Image from 'next/image';
import { shadows } from '@/lib/theme';

interface PhoneFrameProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  rotate_y?: number;
  rotate_x?: number;
  rotate_z?: number;
  priority?: boolean;
}

/**
 * Renders an iPhone-style frame around a screenshot image.
 * Supports optional 3D rotation for perspective effects.
 */
const PhoneFrame: React.FC<PhoneFrameProps> = ({
  src,
  alt,
  width = 260,
  height = 520,
  rotate_y = 0,
  rotate_x = 0,
  rotate_z = 0,
  priority = false,
}) => {
  const has_rotation = rotate_y !== 0 || rotate_x !== 0 || rotate_z !== 0;

  return (
    <div
      style={{
        width: width + 16,
        height: height + 16,
        background: '#1a1a2e',
        borderRadius: '36px',
        padding: '8px',
        boxShadow: shadows.phone,
        position: 'relative',
        transform: has_rotation
          ? `perspective(1200px) rotateY(${rotate_y}deg) rotateX(${rotate_x}deg) rotateZ(${rotate_z}deg)`
          : undefined,
        transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        flexShrink: 0,
      }}
    >
      {/* Notch */}
      <div
        style={{
          position: 'absolute',
          top: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90px',
          height: '24px',
          background: '#1a1a2e',
          borderRadius: '0 0 16px 16px',
          zIndex: 3,
        }}
      />

      {/* Screen */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '28px',
          overflow: 'hidden',
          position: 'relative',
          background: '#ffffff',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          style={{ objectFit: 'cover', objectPosition: 'top' }}
          sizes={`${width}px`}
        />
      </div>

      {/* Side button (power) */}
      <div
        style={{
          position: 'absolute',
          right: '-3px',
          top: '100px',
          width: '3px',
          height: '36px',
          background: '#2a2a4a',
          borderRadius: '0 3px 3px 0',
        }}
      />

      {/* Volume buttons */}
      <div
        style={{
          position: 'absolute',
          left: '-3px',
          top: '80px',
          width: '3px',
          height: '28px',
          background: '#2a2a4a',
          borderRadius: '3px 0 0 3px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '-3px',
          top: '118px',
          width: '3px',
          height: '28px',
          background: '#2a2a4a',
          borderRadius: '3px 0 0 3px',
        }}
      />
    </div>
  );
};

export default PhoneFrame;
