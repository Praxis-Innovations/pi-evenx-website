import React from 'react';

export type IconName =
  | 'apple'
  | 'google-play'
  | 'shield'
  | 'mobile'
  | 'check'
  | 'users'
  | 'bolt'
  | 'calculator'
  | 'chart-pie'
  | 'sync'
  | 'heart'
  | 'download'
  | 'paper-plane'
  | 'warning'
  | 'error'
  | 'mail-open'
  | 'spinner'
  | 'check-circle'
  | 'eye'
  | 'eye-slash'
  | 'home'
  | 'redo';

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
};

function iconPath(name: IconName) {
  switch (name) {
    case 'apple':
      return (
        <path
          fill="currentColor"
          d="M16.37 12.59c.02 2.24 1.96 2.99 1.98 3-.02.05-.31 1.08-1.04 2.13-.63.92-1.29 1.83-2.31 1.85-1 .02-1.32-.59-2.47-.59-1.15 0-1.51.57-2.45.61-1 .04-1.77-1-2.41-1.92-1.31-1.89-2.3-5.33-.96-7.66.66-1.16 1.84-1.89 3.12-1.91.97-.02 1.9.65 2.47.65.57 0 1.64-.8 2.76-.68.47.02 1.79.19 2.64 1.44-.07.04-1.58.93-1.56 3.08ZM14.65 4.83c.53-.65.88-1.56.78-2.46-.76.03-1.68.5-2.22 1.14-.49.57-.92 1.49-.8 2.37.84.07 1.7-.43 2.24-1.05Z"
        />
      );
    case 'google-play':
      return (
        <path
          fill="currentColor"
          d="M4.7 3.4c-.3.31-.49.77-.49 1.37v14.46c0 .6.19 1.06.49 1.37l.08.08 8.1-8.1v-.17L4.78 3.31l-.08.09Zm11.88 5.58-2.7-1.54-3.04 3.04v.16l3.04 3.04 2.69-1.53c.77-.44.77-1.17 0-1.61l.01-.56Zm-2.7 4.77-8.1 8.1c.47.05.99-.03 1.57-.36l9.39-5.35-2.86-2.39Zm-8.1-10.5 8.1 8.1 2.86-2.39-9.39-5.35a2.3 2.3 0 0 0-1.57-.36Z"
        />
      );
    case 'shield':
      return <path fill="currentColor" d="M12 2 4 5v5.5c0 4.8 3.4 9.3 8 10.5 4.6-1.2 8-5.7 8-10.5V5l-8-3Zm-1.1 13.8-3.7-3.7 1.4-1.4 2.3 2.3 4.5-4.5 1.4 1.4-5.9 5.9Z" />;
    case 'mobile':
      return <path fill="currentColor" d="M8 2h8a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3Zm4 18.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM7 16h10V6H7v10Z" />;
    case 'check':
      return <path fill="currentColor" d="m9.55 18.3-5.5-5.5 1.4-1.4 4.1 4.08 8.98-8.98 1.42 1.4-10.4 10.4Z" />;
    case 'users':
      return <path fill="currentColor" d="M16 11a3 3 0 1 0-2.12-5.12A3 3 0 0 0 16 11Zm-8 0A3 3 0 1 0 5.88 5.88 3 3 0 0 0 8 11Zm0 2c-2.67 0-8 1.34-8 4v2h10v-2c0-1.03.39-1.96 1.02-2.74C10.11 13.46 8.84 13 8 13Zm8 0c-.84 0-2.11.46-3.02 1.26A4.28 4.28 0 0 1 14 17v2h10v-2c0-2.66-5.33-4-8-4Z" />;
    case 'bolt':
      return <path fill="currentColor" d="M13 2 5 13h5l-1 9 8-11h-5l1-9Z" />;
    case 'calculator':
      return <path fill="currentColor" d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm1 3v4h8V5H8Zm0 7v2h2v-2H8Zm3 0v2h2v-2h-2Zm3 0v2h2v-2h-2ZM8 15v2h2v-2H8Zm3 0v2h5v-2h-5Z" />;
    case 'chart-pie':
      return <path fill="currentColor" d="M11 2.05V11h8.95A9 9 0 0 0 11 2.05ZM13 13V3.08A9 9 0 1 0 20.92 13H13Z" />;
    case 'sync':
      return <path fill="currentColor" d="M12 4a8 8 0 0 1 6.32 3.1V4H20v7h-7V9h3.18A6 6 0 1 0 18 13h2a8 8 0 1 1-8-9Zm-6 1v2.1A8 8 0 0 0 4 13H2a10 10 0 0 1 2.82-6H2V5h4Z" />;
    case 'heart':
      return <path fill="currentColor" d="m12 21-1.45-1.32C5.4 15.02 2 11.96 2 8.2 2 5.14 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A5.97 5.97 0 0 1 16.5 3C19.58 3 22 5.14 22 8.2c0 3.76-3.4 6.82-8.55 11.5L12 21Z" />;
    case 'download':
      return <path fill="currentColor" d="M11 3h2v8.17l2.59-2.58L17 10l-5 5-5-5 1.41-1.41L11 11.17V3Zm-6 14h14v2H5v-2Z" />;
    case 'paper-plane':
      return <path fill="currentColor" d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2 .01 7Z" />;
    case 'warning':
      return <path fill="currentColor" d="M1 21h22L12 2 1 21Zm12-3h-2v-2h2v2Zm0-4h-2v-4h2v4Z" />;
    case 'error':
      return <path fill="currentColor" d="M11 15h2v2h-2v-2Zm0-8h2v6h-2V7Zm1 15C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10Z" />;
    case 'mail-open':
      return <path fill="currentColor" d="M12 13 2 6.76V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6.76L12 13Zm0-2L21.74 5.4A2 2 0 0 0 20 4H4a2 2 0 0 0-1.74 1.4L12 11Z" />;
    case 'spinner':
      return <path fill="currentColor" d="M12 2a1 1 0 0 1 1 1v3h-2V3a1 1 0 0 1 1-1Zm6.36 3.64a1 1 0 0 1 1.41 1.41l-2.12 2.12-1.41-1.41 2.12-2.12ZM21 11a1 1 0 1 1 0 2h-3v-2h3Zm-3.64 8.77-2.12-2.12 1.41-1.41 2.12 2.12a1 1 0 1 1-1.41 1.41ZM13 18v3a1 1 0 1 1-2 0v-3h2ZM5.64 19.77a1 1 0 0 1-1.41-1.41l2.12-2.12 1.41 1.41-2.12 2.12ZM6 13H3a1 1 0 1 1 0-2h3v2ZM6.35 9.17 4.23 7.05a1 1 0 1 1 1.41-1.41l2.12 2.12-1.41 1.41Z" />;
    case 'check-circle':
      return <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 15-5-5 1.41-1.41L11 14.17l5.59-5.58L18 10l-7 7Z" />;
    case 'eye':
      return <path fill="currentColor" d="M12 5c5.5 0 9.68 5.26 10 5.62L22.44 11l-.44.38C21.68 11.74 17.5 17 12 17S2.32 11.74 2 11.38L1.56 11 2 10.62C2.32 10.26 6.5 5 12 5Zm0 10c3.67 0 6.89-3.05 7.93-4C18.89 10.05 15.67 7 12 7S5.11 10.05 4.07 11C5.11 11.95 8.33 15 12 15Zm0-2.5A1.5 1.5 0 1 0 12 9.5a1.5 1.5 0 0 0 0 3Z" />;
    case 'eye-slash':
      return <path fill="currentColor" d="m3.28 2 18.72 18.72-1.41 1.41-3.07-3.07A11.7 11.7 0 0 1 12 17c-5.5 0-9.68-5.26-10-5.62L1.56 11 2 10.62A24.4 24.4 0 0 1 6.16 7.1L1.87 2.81 3.28 2Zm10.35 10.35-1.98-1.98a1.5 1.5 0 0 0 1.98 1.98Zm4.54 1.72L8.93 4.83A11.91 11.91 0 0 1 12 5c5.5 0 9.68 5.26 10 5.62l.44.38-.44.38a24.77 24.77 0 0 1-3.83 2.69ZM14.8 10.7l-2.5-2.5A1.5 1.5 0 0 1 14.8 10.7Z" />;
    case 'home':
      return <path fill="currentColor" d="M12 3 2 12h3v8h6v-5h2v5h6v-8h3L12 3Z" />;
    case 'redo':
      return <path fill="currentColor" d="M12 5a7 7 0 0 1 6.58 4.63l1.9-.66A9 9 0 0 0 4.55 8H2l3 3 3-3H6.54A7 7 0 0 1 12 5Zm7 8-3 3h1.46A7 7 0 0 1 5.42 14.37l-1.9.66A9 9 0 0 0 19.45 16H21l-2-3Z" />;
  }
}

export default function Icon({ name, size = 20, className, style }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      style={{
        display: 'inline-block',
        flexShrink: 0,
        ...style,
      }}
    >
      {iconPath(name)}
    </svg>
  );
}
