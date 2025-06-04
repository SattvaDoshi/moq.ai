import React from 'react'
import WelcomeContainer from './_component/WelcomeContainer'
import CreateOption from './_component/CreateOption'
import LatestInterviews from './_component/LatestInterviews'

const DashBoard = () => {
  return (
    <div>
      <WelcomeContainer/>
      <CreateOption/>
      <LatestInterviews/>
    </div>
  )
}

export default DashBoard