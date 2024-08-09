import { Input } from '../ui/input'
import { setCanvasSize, useStore } from '@/store'

const TopBar = () => {
  const width = useStore(c => c.canvasSize.width)
  const height = useStore(c => c.canvasSize.height)

  return (
    <div className='col-span-3 border-b border-gray-200 flex flex-row p-2 gap-2'>
      <span>Shape Drawer</span>
      <div className='w-10' />
      <span>W:</span>
      <Input
        className='w-20 h-7'
        value={width}
        onChange={e =>
          setCanvasSize({ width: parseInt(e.target.value), height })
        }
      />
      <span>H:</span>
      <Input
        className='w-20 h-7'
        value={height}
        onChange={e =>
          setCanvasSize({ width, height: parseInt(e.target.value) })
        }
      />
    </div>
  )
}

export default TopBar
