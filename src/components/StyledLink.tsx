import React from 'react';

interface ButtonLinkProps {
  href: string;
  className: string;
  children: React.ReactNode;
}

const StyledLink: React.FC<ButtonLinkProps> = ({ href, className, children} ) => {
  return (
    <a href={href} target={"_blank"} className={className}>
      {children}
    </a>
  );
}

export default StyledLink;