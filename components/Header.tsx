/* This example requires Tailwind CSS v2.0+ */
import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon } from '@heroicons/react/24/outline'
import { getSession, useSession } from 'next-auth/react';
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Logo from "../public/logo-ipfdd-big.jpg"

const navigation = [
  { name: 'Übersicht', icon: HomeIcon, href: '/' },
  { name: 'Team', icon: UsersIcon, href: '/'},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const router = useRouter();

  return (
    <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto h-screen">
      <div className="flex items-center flex-shrink-0 px-4 space-y-5">
        <Image src={Logo} alt={''} />
      </div>
      <div className="mt-5 flex-grow flex flex-col">
        <nav className="flex-1 bg-white space-y-1" aria-label="Sidebar">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                router.pathname === item.href
                  ? 'bg-indigo-50 border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center px-3 py-2 text-sm font-medium border-l-4'
              )}
            >
              <item.icon
                className={classNames(
                  router.pathname === item.href ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 flex-shrink-0 h-6 w-6'
                )}
                aria-hidden="true"
              />
              {item.name}
            </a>
          ))}
        </nav>
        <div className='flex justify-center'>
          <Link className='link-primary' href="/auth/signout">Logout &rarr;</Link>
        </div>
      </div>
    </div>
  )
}