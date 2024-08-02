import CanvasWrapper from './component/CanvasWrapper'
import LeftSideBar from './component/LeftSideBar'
import RightSideBar from './component/RightSideBar'
import StatusBar from './component/StatusBar'
import TopBar from './component/TopBar'

function App() {
  return (
    <div className='grid h-screen grid-cols-[auto_1fr_300px] grid-rows-[50px_1fr_30px] bg-gray-50 text-gray-400'>
      <TopBar />
      <LeftSideBar />
      <CanvasWrapper />
      <RightSideBar />
      <StatusBar />
    </div>
  )
}

export default App
