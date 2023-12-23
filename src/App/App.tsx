import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
// import styles from './App.module.scss'
import MainPage from 'pages/MainPage'

function App() {
  return (
    <>
      <HashRouter>
      <Routes >
        <Route path='/' element={<MainPage/>}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </HashRouter>
    </>
  )
}

export default App
