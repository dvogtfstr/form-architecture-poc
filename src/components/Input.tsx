import * as React from 'react';

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  type?: string;
  value?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { name, label, error, ...rest } = props;
    return (
      <label className="Field">
        <div>{label}</div>
        <input ref={ref} name={name} {...rest} />
        {error && <p className="Field__error">{error}</p>}
      </label>
    );
  },
);

export default Input;
