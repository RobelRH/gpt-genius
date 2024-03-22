"use client"

// import { navLinks } from '@/constants'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { LayoutDashboard, MessageSquare, ImageIcon, Code, Settings } from "lucide-react"

const Sidebar = () => {

  const pathname = usePathname();

  const navLinks = [
    {
      label: "Home",
      route: "/",
      icon: LayoutDashboard,
      color: "text-sky-500"
    },
    {
      label: "Image Restore",
      route: "/transform/add/restore",
      icon: MessageSquare,
      color: "text-green-500"
    },
    {
      label: "Generative Fill",
      route: "/transform/add/fill",
      icon: ImageIcon,
      color: "text-orange-500"
    },
    {
      label: "Object Remove",
      route: "/transform/add/remove",
      icon: Code,
      color: "text-blue-500"
    },
    {
      label: "Object Recolor",
      route: "/transform/add/recolor",
      icon: Settings,
      color: "text-purple-500"
    },
    {
      label: "Background Remove",
      route: "/transform/add/removeBackground",
      icon: ImageIcon,
      color: "text-gray-500"
    },
    {
      label: "Profile",
      route: "/profile",
      icon: MessageSquare,
      color: "text-pink-500"
    },
    {
      label: "Buy Credits",
      route: "/credits",
      icon: Code,
      color: "text-red-500"
    },
  ];

  return (
    <aside className='sidebar'>
      <div className='flex size-full flex-col gap-4'>
        <Link href="/" className='sidebar-logo ml-3'>
          <Image src="/assets/images/logo-text.svg" alt="logo" width={200} height={50} />
        </Link>

        <nav className='sidebar-nav'>
          <SignedIn>
            <ul className='sidebar-nav_elements'>
              {navLinks.slice(0, 6).map((link) => {
                const isActive = link.route === pathname

                return (
                  <li key={link.route} className={`sidebar-nav_element group ${isActive ? 'bg-[#232627] text-white' : 'text-white'
                    }`}>
                    <Link className='sidebar-link' href={link.route}>
                      <link.icon  className={link.color} />
                      {link.label}
                    </Link>
                  </li>
                )

              })}
            </ul>

            <ul className='sidebar-nav_elements'>
              {navLinks.slice(6).map((link) => {
                const isActive = link.route === pathname

                return (
                  <li key={link.route} className={`sidebar-nav_element group ${isActive ? 'bg-[#232627] text-white' : 'text-white'
                    }`}>
                    <Link className='sidebar-link' href={link.route}>
                      <link.icon className={link.color} />
                      {link.label}
                    </Link>
                  </li>
                )

              })}
              <li className='flex-center cursor-pointer gap-2 p-4'>
                <UserButton afterSignOutUrl='/' showName />
              </li>
            </ul>

          </SignedIn>

          <SignedOut>
            <Button asChild className='button bg-purple-gradient bg-cover'>
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>

        </nav>

      </div>
    </aside>
  )
}

export default Sidebar