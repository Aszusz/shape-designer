import { State } from '@/model/core'
import { useStore } from '@/store'
import React from 'react'

const ShapeProperties: React.FC = () => {
  const shapes = useStore((state: State) => state.shapes)
  const selectedShapes = shapes
    .entries()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, shape]) => shape.isSelected)

  return (
    <div className='flex-1'>
      <h2 className='font-bold mb-2'>Properties:</h2>
      {selectedShapes.length > 0 ? (
        <ul>
          {selectedShapes.map(([id, shape]) => (
            <li key={id} className='mb-2'>
              <div>
                <strong>Type:</strong> {shape.type}
              </div>
              <div>
                <strong>Position:</strong> ({shape.x}, {shape.y})
              </div>
              <div>
                <strong>Size:</strong> {shape.width} x {shape.height}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No shapes selected.</div>
      )}
    </div>
  )
}

export default ShapeProperties
