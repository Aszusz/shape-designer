import { useStore } from '@/store'

const StatusBar = () => {
  const tool = useStore(state => state.tool)
  const mousePosition = useStore(state => state.currentMousePosition)

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
