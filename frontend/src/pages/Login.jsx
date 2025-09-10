import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router'
import {pb} from '@/lib/pocketbase.js'

const POCKETBASE_ENDPOINT = import.meta.env.VITE_POCKETBASE_URL

export default function Login() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            navigate('/home')
        }
    }, [navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        const userData = {name, email}

        // Search for existing user (email)
        const existingUsers = await pb.collection('login').getFullList(200, {
            filter: `email="${email}"`,
        })

        if (existingUsers.length > 0) {
            // User exists, proceed to login
            userData.name = existingUsers[0].name
            userData.id = existingUsers[0].id

            localStorage.setItem('user', JSON.stringify(userData))

            setLoading(false)
            navigate('/home')
            return
        }

        // await pb.collection('login').create(userData)
        const result = await pb.collection('login').create(userData).then(
            (record) => {
                console.log('Record created:', record)
                return record
            },
            (error) => {
                console.error('Error creating record:', error)
                setError('Failed to login. Please try again.')
                setLoading(false)
                return null
            }
        ).catch(error => console.log(error))

        if (!result) return

        userData.id = result.id
        localStorage.setItem('user', JSON.stringify(userData))

        // print result
        console.log(localStorage.getItem('user'))

        setLoading(false)
        navigate('/home')
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form
                className="bg-white p-8 rounded shadow-md w-full max-w-sm"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <div className="mb-4">
                    <label className="block mb-1 font-semibold">Name</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-1 font-semibold">Email</label>
                    <input
                        type="email"
                        className="w-full border rounded px-3 py-2"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <button
                    type="submit"
                    className="w-full bg-indigo-700 text-white py-2 rounded hover:bg-indigo-800"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    )
}