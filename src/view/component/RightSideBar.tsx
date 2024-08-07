import ShapeList from './ShapeList'
import ShapeProperties from './ShapeProperties'
import React from 'react'

const RightSideBar: React.FC = () => {
  return (
    <div className='border-l border-gray-200 flex flex-col h-full'>
      {/* Top Panel: Shapes List */}
      <ShapeList />

      {/* Divider */}
      <div className='border-t border-gray-300'></div>

      {/* Bottom Panel: Selected Shape Properties */}
      <ShapeProperties />
    </div>
  )
}

export default RightSideBar
