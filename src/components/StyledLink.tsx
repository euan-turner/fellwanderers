import React from "react";

interface ButtonLinkProps {
  href: string;
  className: string;
  children: React.ReactNode;
}

export default function StyledLink({
  href,
  className,
  children,
}: ButtonLinkProps) {
  return (
    <a href={href} target={"_blank"} className={className}>
      {children}
    </a>
  );
}
