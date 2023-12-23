'use client';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/config'
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';



export default function Navbar() {
    const [user] = useAuthState(auth);

    const router = useRouter();
    return (
        <nav className='bg-rose-600 h-15 flex justify-between'>

            <div className='ml-5 p-2'>
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                </div>
                {/* <p className='pl-1'>User</p> */}
            </div>


            <div className='mr-5 p-2'>
                <button className='border-2 border-rose-600 hover:border-gray-300 p-2' onClick={() => {
                    signOut(auth)
                    router.push('/sign-in');
                }}>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3" />
                    </svg>
                </button>


            </div>

        </nav>

    );
}