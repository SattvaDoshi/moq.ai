import React from 'react'
import Welcome from './_components/Welcome'
import CreateOption from './_components/CreateOption'
import LatestInterViewList from './_components/LatestInterViewList'

function Dashboard() {
  return (
    <div>
        <CreateOption/>
        <LatestInterViewList/>
    </div>
  )
}

export default Dashboard