import { State } from '@/model/canvas'
import { useStore } from '@/store'
import React, { useState } from 'react'

const RightSideBar: React.FC = () => {
  // Retrieve the shapes ordered record from the state
  const shapesRecord = useStore((state: State) => state.shapes)

  // State to manage the selected shape by ID
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null)

  // Get the ordered list of shapes
  const shapesList = shapesRecord.entries()

  // Handler to select a shape
  const handleShapeSelect = (id: string) => {
    setSelectedShapeId(id)
  }

  // Get the selected shape details
  const selectedShape = selectedShapeId
    ? shapesRecord.get(selectedShapeId)
    : null

  return (
    <div className='border-l border-gray-200 flex flex-col h-full'>
      {/* Top Panel: Shapes List */}
      <div className='flex-1 overflow-y-auto p-4'>
        <h2 className='font-bold mb-2'>Shapes:</h2>
        {shapesList.length > 0 ? (
          <ul>
            {shapesList.map(([id, shape]) => (
              <li
                key={id}
                className={`mb-2 p-2 border rounded ${
                  selectedShapeId === id ? 'bg-blue-200' : 'bg-white'
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

      {/* Divider */}
      <div className='border-t border-gray-300'></div>

      {/* Bottom Panel: Selected Shape Properties */}
      <div className='flex-1 p-4'>
        <h2 className='font-bold mb-2'>Properties:</h2>
        {selectedShape ? (
          <div>
            <div>
              <strong>Type:</strong> {selectedShape.type}
            </div>
            <div>
              <strong>Position:</strong> ({selectedShape.x}, {selectedShape.y})
            </div>
            <div>
              <strong>Size:</strong> {selectedShape.width} x{' '}
              {selectedShape.height}
            </div>
          </div>
        ) : (
          <div>Please select a shape to view its properties.</div>
        )}
      </div>
    </div>
  )
}

export default RightSideBar
