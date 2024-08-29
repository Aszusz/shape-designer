import LeftSideBar from '@/view/component/LeftSideBar'
import RightSideBar from '@/view/component/RightSideBar'
import StatusBar from '@/view/component/StatusBar'
import TopBar from '@/view/component/TopBar'
import Canvas from '@/view/component/canvas/Canvas'

function App() {
  return (
    <div className='grid h-screen grid-cols-[auto_1fr_300px] grid-rows-[50px_1fr_30px] bg-gray-50 text-gray-400 select-none'>
      <TopBar />
      <LeftSideBar />
      <Canvas />
      <RightSideBar />
      <StatusBar />
    </div>
  )
}

export default App
