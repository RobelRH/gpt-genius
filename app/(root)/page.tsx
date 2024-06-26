import { Collection } from '@/components/shared/Collection'
import { navLinks } from '@/constants'
import { getAllImages } from '@/lib/actions/image.actions'
import { UserButton } from '@clerk/nextjs'
import { link } from 'fs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { LayoutDashboard, MessageSquare, ImageIcon, Code, Settings } from "lucide-react"

const Home = async ({ searchParams }: SearchParamProps) => {

  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  const images = await getAllImages({ page, searchQuery });

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
    <>
      <section className='home'>
        <h1 className='home-heading py-5 '>
          Genius GPT
        </h1>
        <ul className='flex flex-center w-full gap-4'>
          {
            navLinks
              .slice(1, 5).map((link) => (
                <Link
                  key={link.route}
                  href={link.route}
                  className='flex-center flex-row gap-2 bg-[#343839] p-3 rounded-lg hover:bg-[#141718]'
                >
                  <li className='flex-center w-fit'>
                    {/* <Image src={link.icon} alt="image" width={18} height={18} /> */}
                    <link.icon className={link.color} />
                  </li>
                  <li className='text-sm text-center text-white'>
                    <p>{link.label}</p>
                  </li>
                </Link>
              ))
          }
        </ul>
      </section>

      <section className='sm:mt-1'>
        <Collection
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page} />
      </section>

    </>
  )
}

export default Home