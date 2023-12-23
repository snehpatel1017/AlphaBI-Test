'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar'
import { auth } from '@/firebase/config'
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth'

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [result, setResult] = useState([]);


  async function apiCall() {
    const response = await fetch("https://api.giphy.com/v1/gifs/trending?api_key=HxvPPMuO3eckigvtvFmVbaLLzgscBJlh&&limit=10");
    const obj = await response.json();
    const urls = obj['data'].map((item) => {
      return item.images.original.url;
    })
    setResult(urls);

  }
  useEffect(() => {
    if (!user) {
      router.push('/sign-in')
    }
    apiCall();
  }, [])

  async function handleSearch() {
    var param = document.getElementById('default-search').value
    if (param === '') {
      param = 'Trending';
    }
    var query = `https://api.giphy.com/v1/gifs/search?api_key=HxvPPMuO3eckigvtvFmVbaLLzgscBJlh&&limit=10&&q=${encodeURIComponent(param)}`;
    console.log(query)
    const response = await fetch(query);
    const obj = await response.json();

    const urls = obj['data'].map((item) => {
      return item.images.original.url;
    })

    setResult(urls);
  }

  return (
    <main className="">
      <Navbar></Navbar>

      <div className=' flex  flex-col items-center justify-center  mt-2'>
        <div className='w-80'>

          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  " placeholder="Search...." required />
            <button type="button" onClick={() => { handleSearch(); }} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-4 py-2">Search</button>
          </div>

        </div>
        <div className=' h-screen  overflow-auto items-center gap-7'>
          {
            result.map((item, key) => {
              return <div key={key} className='m-4'>
                <div className="transform  rounded-xl  bg-white shadow-xl transition duration-300 hover:scale-105">
                  <div className="flex justify-center items-center">
                    <img src={item} className="object-cover max-h-80"></img>
                  </div>
                </div>
              </div>
            })
          }
        </div>

      </div>
    </main>
  )
}



