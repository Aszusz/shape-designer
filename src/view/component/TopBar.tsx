import { Input } from '../ui/input'
import AppMenu from './AppMenu'
import { useStore } from '@/shell/store'
import { Checkbox } from '@/view/ui/checkbox'

const TopBar = () => {
  const { width, height } = useStore(state => state.canvasSize)
  const snapToGrid = useStore(state => state.snapToGridSetting)
  const setCanvasSize = useStore().setCanvasSize
  const setSnapToGridSetting = useStore().setSnapToGridSetting

  return (
    <div className='col-span-3 border-b border-gray-200 flex flex-row items-center p-2 gap-4'>
      <AppMenu />
      <span>Shape Drawer</span>
      <div className='mx-6' /> {/* Spacer for group separation */}
      <span>W:</span>
      <Input
        className='w-20 h-8'
        value={width}
        onChange={e =>
          setCanvasSize({ width: parseInt(e.target.value), height })
        }
      />
      <span>H:</span>
      <Input
        className='w-20 h-8'
        value={height}
        onChange={e =>
          setCanvasSize({ width, height: parseInt(e.target.value) })
        }
      />
      <div className='mx-6' /> {/* Spacer for group separation */}
      <div className='flex flex-row items-center'>
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
