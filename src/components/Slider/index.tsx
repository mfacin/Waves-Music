import React from 'react'

import './styles.scss'

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  colors?: [string, string]
  percentage: number
}

const Slider: React.FC<SliderProps> = ({ colors, percentage, ...props }) => {
  return (
    <div className="track">
      <input {...props} type="range" />

      <div
        className="animate-track-container"
        style={
          colors
            ? {
                background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`,
              }
            : {}
        }
      >
        <div
          className="animate-track"
          style={{ transform: `translateX(${percentage}%)` }}
        ></div>
      </div>
    </div>
  )
}

export default Slider
