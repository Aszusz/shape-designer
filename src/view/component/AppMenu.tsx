import { useFileDownload } from '../hooks/useFileDownload'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { narrowToPersistentState } from '@/model/core'
import { getFullState } from '@/shell/store'

type ClassProps = {
  className?: string
}

function MenuIcon(props: ClassProps) {
  return (
    <svg
      {...props}
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
      <line x1='4' x2='20' y1='12' y2='12' />
      <line x1='4' x2='20' y1='6' y2='6' />
      <line x1='4' x2='20' y1='18' y2='18' />
    </svg>
  )
}

function SaveIcon(props: ClassProps) {
  return (
    <svg
      {...props}
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
      <path d='M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z' />
      <path d='M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7' />
      <path d='M7 3v4a1 1 0 0 0 1 1h7' />
    </svg>
  )
}

function UploadIcon(props: ClassProps) {
  return (
    <svg
      {...props}
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
      <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
      <polyline points='17 8 12 3 7 8' />
      <line x1='12' x2='12' y1='3' y2='15' />
    </svg>
  )
}

const AppMenu = () => {
  const downloadFile = useFileDownload()

  const handleSaveClick = () => {
    const fullState = getFullState()
    const persistentState = narrowToPersistentState(fullState)
    const content = JSON.stringify(persistentState, null, 2)
    downloadFile({
      content,
      filename: 'shapes.json',
      fileType: 'application/json'
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='rounded-full focus-visible:ring-0 focus-visible:ring-offset-0'
        >
          <MenuIcon className='h-6 w-6' />
          <span className='sr-only'>Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-48'>
        <DropdownMenuItem onClick={handleSaveClick}>
          <SaveIcon className='mr-2 h-4 w-4' />
          Save to File
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <UploadIcon className='mr-2 h-4 w-4' />
          Load from File
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AppMenu
