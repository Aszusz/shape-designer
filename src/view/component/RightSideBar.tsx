import { State } from '@/model/canvas'
import { useStore } from '@/store'
import React, { useState } from 'react'

const RightSideBar: React.FC = () => {
  // Retrieve the shapes array from the state
  const shapes = useStore((state: State) => state.shapes)

  // State to manage the selected shape
  const [selectedShapeIndex, setSelectedShapeIndex] = useState<number | null>(
    null
  )

  // Handler to select a shape
  const handleShapeSelect = (index: number) => {
    setSelectedShapeIndex(index)
  }

  // Get the selected shape details
  const selectedShape =
    selectedShapeIndex !== null ? shapes[selectedShapeIndex] : null

  return (
    <div className='border-l border-gray-200 flex flex-col h-full'>
      {/* Top Panel: Shapes List */}
      <div className='flex-1 overflow-y-auto p-4'>
        <h2 className='font-bold mb-2'>Shapes:</h2>
        {shapes.length > 0 ? (
          <ul>
            {shapes.map((shape, index) => (
              <li
                key={index}
                className={`mb-2 p-2 border rounded ${
                  selectedShapeIndex === index ? 'bg-blue-200' : 'bg-white'
                } cursor-pointer`}
                onClick={() => handleShapeSelect(index)}
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
              <strong>Selected:</strong>{' '}
              {selectedShape.isSelected ? 'Yes' : 'No'}
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
