import React from 'react'
import Navbar from '../components/Navbar'
import IssueComponent from '../components/IssueComponent'

function Home() {

  return (
    <div className='w-full absolute'>
      <div className='fixed w-full'>
        <Navbar />
      </div>
      <div className='mt-[9vh] mb-1.5 border-2 border-neutral-400 mx-2 rounded-2xl min-h-screen'>
        <div className=''>
          <IssueComponent />
        </div>
      </div>
    </div>
  )
}

export default Home