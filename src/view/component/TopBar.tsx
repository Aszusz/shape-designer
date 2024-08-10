import { Input } from '../ui/input'
import {
  setCanvasSize,
  setSnapToGridSetting,
  useCanvasSize,
  useSnapToGridSetting
} from '@/store'
import { Checkbox } from '@/view/ui/checkbox'

const TopBar = () => {
  const { width, height } = useCanvasSize()
  const snapToGrid = useSnapToGridSetting()

  return (
    <div className='col-span-3 border-b border-gray-200 flex flex-row p-2 gap-2'>
      <span>Shape Drawer</span>
      <div className='w-10' />
      <span className=''>W:</span>
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
      <div className='w-10' />
      <div className='flex flex-row items-center pb-1.5'>
        <Checkbox
          checked={snapToGrid}
          className='mr-2'
          onCheckedChange={() => setSnapToGridSetting(!snapToGrid)}
        />
        <span>Snap to Grid</span>
      </div>
    </div>
  )
}

export default TopBar
