import { Input } from './ui/input'
import { useState } from 'react'

function App() {
  const [width, setWidth] = useState(250)
  const [height, setHeight] = useState(250)

  return (
    <div className='grid h-screen grid-cols-[50px_1fr_300px] grid-rows-[50px_1fr_30px] bg-gray-50 text-gray-400'>
      {/* Top Bar */}
      <div className='col-span-3 border-b border-gray-200 flex flex-row p-2 gap-2'>
        <span>Shape Drawer</span>
        <div className='w-10' />
        <span>W:</span>
        <Input
          className='w-20 h-7'
          value={width}
          onChange={e => setWidth(parseInt(e.target.value))}
        />
        <span>H:</span>
        <Input
          className='w-20 h-7'
          value={height}
          onChange={e => setHeight(parseInt(e.target.value))}
        />
      </div>

      {/* Left Side Bar */}
      <div className='border-r border-gray-200'></div>

      {/* Main Content */}
      <div className='overflow-auto border-gray-200'>
        <div
          className='grid grid-cols-[1fr_auto_1fr] grid-rows-[1fr_auto_1fr] bg-gray-200'
          style={{
            minWidth: `100%`,
            minHeight: `100%`,
            width: `${width}px`,
            height: `${height}px`
          }}
        >
          {/* Canvas */}
          <div
            className='col-start-2 row-start-2 bg-white'
            style={{ width: `${width}px`, height: `${height}px` }}
          ></div>
        </div>
      </div>

      {/* Right Side Bar */}
      <div className='border-l border-gray-200'>Properties</div>

      {/* Status Bar */}
      <div className='col-span-3 border-t border-gray-200'>Status:</div>
    </div>
  )
}

export default App
