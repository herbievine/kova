import type React from 'react'

interface CourseProps {
  lessonStatus: 'menu' | 'course' | 'finished'
  data: Kova.LessonPrompt[]
}

const Course: React.FC<CourseProps> = ({}) => {
  return (
    <div className="w-full min-h-screen flex font-bold bg-neutral-900 text-neutral-200"></div>
  )
}

export default Course
