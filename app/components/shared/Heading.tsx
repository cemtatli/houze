'use client'

interface HeadingProps {
  title: string
  subtitle?: string
  center?: boolean
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className='text-xl font-semibold'>{title}</div>
      <div className='mt-2 text-gray-600'>{subtitle}</div>
    </div>
  )
}

export default Heading
