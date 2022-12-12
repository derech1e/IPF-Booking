import React,{ ReactNode } from 'react'
import Header from './Header'

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = ( props ) => (
  <div className='flex flex-row'>
    <div className='w-48 h-screen'>
    <Header />
    </div>
    <div>
    <div className="">{props.children}</div>
    </div>
  </div>
)

export default Layout
