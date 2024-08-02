import { useStore } from '@/store'

const CanvasWrapper = () => {
  const width = useStore().canvasWidth
  const height = useStore().canvasHeight

  return (
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
  )
}

export default CanvasWrapper
