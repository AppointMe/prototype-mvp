import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { pb } from '@/lib/pocketbase.js'

const POCKETBASE_ENDPOINT = import.meta.env.VITE_POCKETBASE_URL

export default function Login() {
    console.log(localStorage.getItem('user'))

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold">Welcome Home!</h1>
            <p className="mt-4">You are logged in.</p>
        </div>
    )
}