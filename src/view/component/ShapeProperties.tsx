import { Shape } from '@/model/core'
import { useSelectedShapes } from '@/store'
import React from 'react'

const ShapeProperties: React.FC = () => {
  const selectedShapes = useSelectedShapes()

  const renderShapeProperties = (shape: Shape) => {
    return (
      <div>
        <div>
          <strong>Type:</strong> {shape.type}
        </div>
        <div>
          <strong>Position:</strong> ({shape.x}, {shape.y})
        </div>
        <div>
          <strong>Size:</strong> {shape.width} x {shape.height}
        </div>
      </div>
    )
  }

  return (
    <div className='flex-1'>
      <h2 className='font-bold mb-2'>Properties:</h2>
      {selectedShapes.length === 0 ? (
        <div>No shapes selected.</div>
      ) : selectedShapes.length > 1 ? (
        <div>Multiple shapes selected.</div>
      ) : (
        renderShapeProperties(selectedShapes[0])
      )}
    </div>
  )
}

export default ShapeProperties
