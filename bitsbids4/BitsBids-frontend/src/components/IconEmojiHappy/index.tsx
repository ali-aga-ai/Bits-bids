import React from "react";

/**
 * The IconEmojiHappy component.
 * @param props The component props.
 */
export default function IconEmojiHappy(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Circle */}
      <circle cx="12" cy="12" r="10" />
      {/* Smile */}
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      {/* Eyes */}
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}