import React from "react";

interface StyledLinkProps {
  href: string;
  className: string;
  children: React.ReactNode;
}

export default function StyledLink({
  href,
  className,
  children,
}: StyledLinkProps) {
  return (
    <a href={href} target={"_blank"} className={className}>
      {children}
    </a>
  );
}
