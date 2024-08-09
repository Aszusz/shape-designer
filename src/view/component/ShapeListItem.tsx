import { cn } from '@/lib/cn'
import { toggleSelected, selectShape, useShape } from '@/store'
import React from 'react'

interface ShapeListItemProps {
  id: string
}

const ShapeListItem: React.FC<ShapeListItemProps> = ({ id }) => {
  const shape = useShape(id)

  return shape === undefined ? (
    <></>
  ) : (
    <li
      className={cn('p-2 border-b last:border-b-0 cursor-pointer', {
        'bg-blue-200': shape.isSelected,
        'bg-transparent': !shape.isSelected
      })}
      onClick={e => {
        if (e.ctrlKey) {
          toggleSelected(id)
        } else {
          selectShape(id)
        }
      }}
    >
      <p>
        <strong>
          {shape.type === 'rectangle_shape' ? 'Rectangle' : 'Ellipse'}
        </strong>
      </p>
      <p className='text-sm'>{id}</p>
    </li>
  )
}

export default ShapeListItem
