import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Shape } from '@/model/core'
import { deleteSelectedShapes, updateShape, useSelectedShapes } from '@/store'
import React from 'react'

const ShapeProperties: React.FC = () => {
  const selectedShapes = useSelectedShapes()
  const selectedShapesCount = selectedShapes.length

  const renderShapeProperties = (shape: Shape) => {
    return (
      <div>
        <div>
          <strong>Type:</strong>{' '}
          {shape.type === 'rectangle_shape'
            ? 'Rectangle'
            : shape.type === 'ellipse_shape'
              ? 'Ellipse'
              : 'Unknown'}
        </div>
        <div className='h-5' />
        <div>
          <strong>Position</strong>
          <div className='flex flex-row w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='x'>x: </Label>
            <Input
              className='w-20 h-7'
              value={shape.x}
              type='number'
              id='x'
              onChange={e => {
                updateShape({ ...shape, x: parseInt(e.target.value) })
              }}
            />
          </div>
          <div className='flex flex-row w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='x'>y: </Label>
            <Input
              className='w-20 h-7'
              value={shape.y}
              type='number'
              id='y'
              onChange={e => {
                updateShape({ ...shape, y: parseInt(e.target.value) })
              }}
            />
          </div>
        </div>
        <div className='h-3' />
        <div>
          <strong>Size</strong>
          <div className='flex flex-row w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='x'>w: </Label>
            <Input
              className='w-20 h-7'
              value={shape.width}
              type='number'
              id='width'
              onChange={e => {
                updateShape({ ...shape, width: parseInt(e.target.value) })
              }}
            />
          </div>
          <div className='flex flex-row w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='x'>h: </Label>
            <Input
              className='w-20 h-7'
              value={shape.height}
              type='number'
              id='height'
              onChange={e => {
                updateShape({ ...shape, height: parseInt(e.target.value) })
              }}
            />
          </div>
          <div className='h-3' />
          <Button
            variant={'destructive'}
            size={'sm'}
            onClick={() => {
              deleteSelectedShapes()
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='flex-1'>
      <h2 className='font-bold mb-2'>Properties:</h2>
      {selectedShapesCount === 0 ? (
        <div>No shapes selected.</div>
      ) : selectedShapes.length > 1 ? (
        <div>
          <p>{selectedShapesCount} shapes selected.</p>
          <div className='h-3' />
          <Button
            variant={'destructive'}
            size={'sm'}
            onClick={() => {
              deleteSelectedShapes()
            }}
          >
            Delete All
          </Button>
        </div>
      ) : (
        renderShapeProperties(selectedShapes[0])
      )}
    </div>
  )
}

export default ShapeProperties
