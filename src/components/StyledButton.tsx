import React from "react";

interface StyledButtonProps {
  className: string;
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export default function StyledButton({
  className,
  children,
  onClick
}: StyledButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}