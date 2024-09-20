import React from "react";

interface Props {
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: any;
  inputId?: string;
}

function InputField({ placeholder, onChange, value, inputId }: Props) {
  return (
    <input
      id={inputId}
      className="h-[60px] w-full rounded-[6px] border-4 border-solid border-[#ffffff80] bg-neutrals-900 px-3 text-sm focus:border-[#ff9b33] focus:outline-none"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}

export default InputField;
