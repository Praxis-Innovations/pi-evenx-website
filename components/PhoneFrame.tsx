import React from 'react';
import Image from 'next/image';

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
      className="relative bg-[#1a1a2e] rounded-[36px] p-2 shadow-phone shrink-0"
      style={{
        width: width + 16,
        height: height + 16,
        transform: has_rotation
          ? `perspective(1200px) rotateY(${rotate_y}deg) rotateX(${rotate_x}deg) rotateZ(${rotate_z}deg)`
          : undefined,
        transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      {/* Notch */}
      <div
        className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-6 bg-[#1a1a2e]
                    rounded-b-2xl z-[3]"
      />

      {/* Screen */}
      <div className="w-full h-full rounded-[28px] overflow-hidden relative bg-white">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover object-top"
          sizes={`${width}px`}
        />
      </div>

      {/* Side button (power) */}
      <div
        className="absolute -right-[3px] top-[100px] w-[3px] h-9 bg-[#2a2a4a]
                    rounded-r-[3px]"
      />

      {/* Volume buttons */}
      <div
        className="absolute -left-[3px] top-[80px] w-[3px] h-7 bg-[#2a2a4a]
                    rounded-l-[3px]"
      />
      <div
        className="absolute -left-[3px] top-[118px] w-[3px] h-7 bg-[#2a2a4a]
                    rounded-l-[3px]"
      />
    </div>
  );
};

export default PhoneFrame;
