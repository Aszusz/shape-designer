import { Button } from '../ui/button'
import { Input } from '../ui/input'
import AppMenu from './AppMenu'
import { ClassNameProps } from '@/lib/cn'
import { useStore } from '@/shell/store'
import { Checkbox } from '@/view/ui/checkbox'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/view/ui/tooltip'

// Custom Icons for Undo and Redo
function RedoIcon(props: ClassNameProps) {
  return (
    <svg
      className={props.className}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M21 7v6h-6' />
      <path d='M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7' />
    </svg>
  )
}

function UndoIcon(props: ClassNameProps) {
  return (
    <svg
      className={props.className}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M3 7v6h6' />
      <path d='M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13' />
    </svg>
  )
}

const TopBar = () => {
  const { width, height } = useStore(state => state.history.present.canvasSize)
  const snapToGrid = useStore(state => state.history.present.snapToGridSetting)
  const setCanvasSize = useStore().setCanvasSize
  const setSnapToGridSetting = useStore().setSnapToGridSetting
  const undo = useStore().undo
  const redo = useStore().redo
  const canUndo = true
  const canRedo = true

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
      <div className='mx-6' /> {/* Spacer for group separation */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={'ghost'}
              size='icon'
              onClick={undo}
              disabled={!canUndo}
            >
              <UndoIcon className='w-5 h-5' />
              <span className='sr-only'>Undo</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Undo</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={'ghost'}
              size='icon'
              onClick={redo}
              disabled={!canRedo}
            >
              <RedoIcon className='w-5 h-5' />
              <span className='sr-only'>Redo</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Redo</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default TopBar
