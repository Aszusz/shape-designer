import CanvasWithWrapper from './component/CanvasWithWrapper'
import LeftSideBar from './component/LeftSideBar'
import RightSideBar from './component/RightSideBar'
import StatusBar from './component/StatusBar'
import TopBar from './component/TopBar'

function App() {
  return (
    <div className='grid h-screen grid-cols-[auto_1fr_300px] grid-rows-[50px_1fr_30px] bg-gray-50 text-gray-400 select-none'>
      <TopBar />
      <LeftSideBar />
      <CanvasWithWrapper />
      <RightSideBar />
      <StatusBar />
    </div>
  )
}

export default App
