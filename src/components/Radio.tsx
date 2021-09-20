import * as React from 'react';

interface RadioProps extends React.HTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  type?: string;
  value?: string;
  checked?: boolean;
}

export const Radio = (props: RadioProps) => {
  const { name, label, ...rest } = props;
  return (
    <label className="Field">
      <input name={name} {...rest} />
      <span>{label}</span>
    </label>
  );
};

export default Radio;
