import React from 'react';

// HeadingProps constrains headings to levels h1-h6.
interface FieldProps extends React.HTMLAttributes<HTMLFormElement> {
  as: 'input' | 'textarea' | 'select' | 'button' ;
}

// Heading allows components to pass a heading level via props.
function Field({
  as = 'input',
  children,
  className,
}: FieldProps): JSX.Element {
  const H = ({ ...props }: React.HTMLAttributes<HTMLFormElement>) =>
    React.createElement(as, props, children);

  return <H/>;
}

export default Field;
export type { FieldProps };
