import ShapeListItem from './ShapeListItem'
import { useShapeIds } from '@/store'
import React from 'react'

// Import the ShapeListItem component

const ShapeList: React.FC = () => {
  const shapesIds = useShapeIds()

  return (
    <div className='h-full flex flex-col'>
      <h2 className='font-bold mb-2'>Shapes:</h2>
      {shapesIds.length > 0 ? (
        <div className='flex-grow overflow-auto h-fit border rounded'>
          <div className='bg-white'>
            <ul className='font-mono'>
              {shapesIds.map(id => (
                <ShapeListItem key={id} id={id} />
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>No shapes available.</div>
      )}
    </div>
  )
}

export default ShapeList
