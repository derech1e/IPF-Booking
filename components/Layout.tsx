import React,{ ReactNode } from 'react'
import Header from './Header'

type Props = {
  children: ReactNode
  title: String
}

const Layout: React.FC<Props> = ( props ) => (
  <div className='flex flex-row'>
    <div className='w-48 h-screen'>
    <Header />
    </div>
    <div className='w-full'>
      <div className='h-20 bg-white border w-full border-gray-100 flex items-center px-10'>
        <h1 className='text-2xl'>{props.title}</h1>
      </div>
      <div className="p-10">
        {props.children}
      </div>
    </div>
  </div>
)

export default Layout
