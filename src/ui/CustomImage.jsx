import React from 'react'

export default function CustomImage({imageSrc, imageAlt}) {
  return (
    <div style={{ height: "200px", overflow: "hidden" }}>
        <img
          src={imageSrc || "/no_image.jpg"}
          alt={imageAlt}
          className="card-img-top h-100 w-100 object-fit-cover"
          style={{ transition: "transform 0.5s ease" }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>
  )
}
