import { Routes, Route } from 'react-router'
import Login from './pages/Login.jsx'

function Home() {
    // ...you can expand this as needed...
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold">Welcome Home!</h1>
            <p className="mt-4">You are logged in.</p>
        </div>
    )
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    )
}

export default App