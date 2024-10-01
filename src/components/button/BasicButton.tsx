/**
 * @fileoverview A customizable button component for React.
 *
 * This component renders a button that can have different styles based on the
 * provided variant and size props. It also accepts an optional click handler
 * and can be disabled.
 *
 * @param children - The content to be displayed inside the button.
 * @param onClick - Optional click handler function for the button.
 * @param variant- The style variant of the button.
 * @param size - The size of the button.
 * @param disabled - Whether the button is disabled.
 * @param props.type - The type of button.
 *
 * @example
 * <BasicButton variant="primary" size="small" onClick={() => alert('Clicked!')}>
 *   Click Me
 * </BasicButton>
 *
 * @returns The rendered button component.
 */

import React from 'react';
import clsx from 'clsx';

interface Props {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  variant?: 'primary' | 'outlined' | 'contained';
  size?: 'small' | 'large';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const BasicButton: React.FC<Props> = ({
  children,
  variant = 'primary',
  size = 'large',
  onClick,
  disabled = false,
  type = 'button',
}) => {
  const buttonStyles = clsx(
    'w-full border border-solid transition duration-200',
    {
      'border-white text-sm h-10 text-black font-bold rounded-[4px] bg-white hover:bg-black hover:text-white':
        variant === 'primary',
    },
    {
      'border-white inline-block rounded-[20px] bg-black text-xs text-white hover:bg-white hover:text-black py-2 px-[10px]':
        variant === 'outlined',
    },
    {
      'border-none inline-block bg-white rounded-[20px] text-xs font-semibold text-black py-2 px-[10px] hover:border hover:border-solid hover:border-white hover:bg-transparent hover:text-neutrals-10':
        variant === 'contained',
    },
    // Sizes
    {
      ' text-xs leading-[12px] px-2 flex items-center justify-center':
        size === 'small',
      'h-10 text-sm px-3 flex items-center justify-center': size === 'large',
    },
  );

  return (
    <button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
