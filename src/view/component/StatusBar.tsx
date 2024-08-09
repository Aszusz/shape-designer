import { useMousePosition, useToolType } from '@/store'

const StatusBar = () => {
  const tool = useToolType()
  const mousePosition = useMousePosition()

  return (
    <div className='col-span-3 border-t border-gray-200 flex flex-row gap-3'>
      <span>Tool: {tool}</span>
      <span>
        X: {mousePosition.x}, Y: {mousePosition.y}
      </span>
    </div>
  )
}

export default StatusBar
