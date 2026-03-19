import React from 'react'
import Home from '@/components/Home'
import {Section1} from '@/components/BooksCard.tsx/Section1'
import {Section2} from '@/components/BooksCard.tsx/Section2'
import { Section3 } from '@/components/BooksCard.tsx/Section3'

function page() {
  return (
    <div>
      <Home />
      <Section1 />
      <Section2 />
      <Section3 />
    </div>
  )
}

export default page