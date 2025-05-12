import React from 'react'
import { HiOutlineEmojiSad } from "react-icons/hi";

export default function ErrorIcon() {
  return (
      <div 
    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
    style={{
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      backgroundColor: "var(--pomp-salmon)",
      color: "white"
    }}
  >
    <HiOutlineEmojiSad size={50} />
  </div>
  )
}
