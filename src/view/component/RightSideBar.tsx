import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '../ui/resizable'
import ShapeList from './ShapeList'
import ShapeProperties from './ShapeProperties'
import React from 'react'

const RightSideBar: React.FC = () => {
  return (
    <ResizablePanelGroup direction='vertical'>
      <ResizablePanel className='p-4'>
        <ShapeList />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className='p-4'>
        <ShapeProperties />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default RightSideBar
