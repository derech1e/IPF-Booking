import React from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import Person, { PersonProps } from '../components/Person'
import { makeSerializable } from '../lib/util'
import prisma from '../lib/prisma'

type Props = {
  feed: PersonProps[]
}

const Blog: React.FC<Props> = props => {
  return (
    <Layout>
      <div className="page">
        <h1>My Blog</h1>
        <main>
          {props.feed.map(person => (
            <div key={person.id} className="post">
              <Person person={person} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.person.findMany({
    //where: { published: true },
    //include: { author: true },
  })
  return {
    props: { feed: makeSerializable(feed) },
  }
}

export default Blog
