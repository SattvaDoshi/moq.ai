import React from 'react'
import DashBoardProvider from './provider'

const DashBoardLayout = ({children}) => {
  return (
    <div>
        <DashBoardProvider>
            <div>
              {children}
            </div>
        </DashBoardProvider>
    </div>
  )
}

export default DashBoardLayout