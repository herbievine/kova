import type React from 'react'

interface CardProps {
  title: string
  text: string
  action: () => void
}

const Card: React.FC<CardProps> = ({ title, text, action }) => {
  return (
    <div onClick={() => action()} className="w-full h-full p-6 flex flex-col">
      <h2 className="mb-6 text-2xl">{title}</h2>
      <p>{text}</p>
    </div>
  )
}

export default Card
