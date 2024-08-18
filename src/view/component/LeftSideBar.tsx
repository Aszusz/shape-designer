import { Button } from '../ui/button'
import { ClassNameProps } from '@/lib/cn'
import { useStore } from '@/shell/store'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/view/ui/tooltip'

const LeftSideBar = () => {
  const selectedTool = useStore(state => state.history.present.toolType)
  const setTool = useStore().setTool

  return (
    <div className='border-r border-gray-200 flex flex-col p-2 gap-2'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={selectedTool === 'select_tool' ? 'outline' : 'ghost'}
              size='icon'
              onClick={() => setTool('select_tool')}
            >
              <MousePointerIcon className='w-5 h-5' />
              <span className='sr-only'>Select</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Select</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={selectedTool === 'pan_tool' ? 'outline' : 'ghost'}
              size='icon'
              onClick={() => setTool('pan_tool')}
            >
              <MoveIcon className='w-5 h-5' />
              <span className='sr-only'>Pan</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Pan</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={selectedTool === 'rectangle_tool' ? 'outline' : 'ghost'}
              size='icon'
              onClick={() => setTool('rectangle_tool')}
            >
              <SquareIcon className='w-5 h-5' />
              <span className='sr-only'>Draw Rectangle</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Draw Rectangle</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={selectedTool === 'ellipse_tool' ? 'outline' : 'ghost'}
              size='icon'
              onClick={() => setTool('ellipse_tool')}
            >
              <CircleIcon className='w-5 h-5' />
              <span className='sr-only'>Draw Ellipse</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Draw Ellipse</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

function CircleIcon(props: ClassNameProps) {
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
      <circle cx='12' cy='12' r='10' />
    </svg>
  )
}

function MousePointerIcon(props: ClassNameProps) {
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
      <path d='m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z' />
      <path d='m13 13 6 6' />
    </svg>
  )
}

function MoveIcon(props: ClassNameProps) {
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
      <polyline points='5 9 2 12 5 15' />
      <polyline points='9 5 12 2 15 5' />
      <polyline points='15 19 12 22 9 19' />
      <polyline points='19 9 22 12 19 15' />
      <line x1='2' x2='22' y1='12' y2='12' />
      <line x1='12' x2='12' y1='2' y2='22' />
    </svg>
  )
}

function SquareIcon(props: ClassNameProps) {
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
      <rect width='18' height='18' x='3' y='3' rx='2' />
    </svg>
  )
}

export default LeftSideBar
