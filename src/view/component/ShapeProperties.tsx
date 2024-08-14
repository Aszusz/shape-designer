import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
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
        <div className='flex flex-col gap-1'>
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
        <div className='flex flex-col gap-1'>
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
        </div>
        <div className='h-3' />
        <div className='flex flex-col gap-1'>
          <strong>Colors</strong>
          <div className='flex flex-row w-full max-w-sm items-center gap-1.5'>
            <Select
              onValueChange={value => {
                updateShape({ ...shape, color: value })
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select color' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value='#ef4444'
                  className='bg-red-500 hover:!bg-red-500 focus:!bg-red-500'
                >
                  Red
                </SelectItem>
                <SelectItem
                  value='#22c55e'
                  className='bg-green-500 hover:!bg-green-500 focus:!bg-green-500'
                >
                  Green
                </SelectItem>
                <SelectItem
                  value='#eab308'
                  className='bg-yellow-500 hover:!bg-yellow-500 focus:!bg-yellow-500'
                >
                  Yellow
                </SelectItem>
                <SelectItem
                  value='#3b82f6'
                  className='bg-blue-500 hover:!bg-blue-500 focus:!bg-blue-500'
                >
                  Blue
                </SelectItem>
                <SelectItem
                  value='#f97316'
                  className='bg-orange-500 hover:!bg-orange-500 focus:!bg-orange-500'
                >
                  Orange
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='h-3' />
        <div>
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
