import { State } from '@/model/canvas'
import { selectShape, useStore } from '@/store'
import React from 'react'

const ShapeList: React.FC = () => {
  const shapes = useStore((state: State) => state.shapes)

  const handleShapeSelect = (id: string) => {
    selectShape(id)
  }

  return (
    <div className='overflow-auto max-h-full'>
      <h2 className='font-bold mb-2'>Shapes:</h2>
      {shapes.getOrder().length > 0 ? (
        <ul>
          {shapes.entries().map(([id, shape]) => (
            <li
              key={id}
              className={`mb-2 p-2 border rounded ${
                shape.isSelected ? 'bg-blue-200' : 'bg-white'
              } cursor-pointer`}
              onClick={() => handleShapeSelect(id)}
            >
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
        <div>No shapes available.</div>
      )}
    </div>
  )
}

export default ShapeList
