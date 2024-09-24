/**
 * @fileoverview A customizable input field component.
 *
 * This component renders an input field with optional placeholder text,
 * handles value changes through an optional callback function,
 * and accepts a unique identifier.
 *
 * @param placeholder - The placeholder text displayed when the input is empty.
 * @param onChange - Optional callback function triggered when the input value changes.
 * @param value - The current value of the input field.
 * @param inputId - Optional unique identifier for the input field.
 * @returns The rendered input field component.
 */

import React from 'react';

interface Props {
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: any;
  inputId?: string;
}

export const InputField: React.FC<Props> = ({
  placeholder,
  onChange,
  value,
  inputId,
}) => {
  return (
    <input
      id={inputId}
      className="h-[60px] w-full rounded-[6px] border-4 border-solid border-[#ffffff80] bg-neutrals-900 px-3 text-sm focus:border-[#ff9b33] focus:outline-none"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};
