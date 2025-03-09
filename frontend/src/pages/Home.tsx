import React from 'react'
import { useAppSelector } from '../store/hooks'

function Home() {

  const user = useAppSelector(state => state.user)
  const admin = useAppSelector(state => state.admin)

  console.log(user)
  console.log(admin)

  return (
    <div>
      <img src={admin?.profileImage} alt="" />
    </div>
  )
}

export default Home