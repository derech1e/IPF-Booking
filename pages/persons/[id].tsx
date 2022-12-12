import React from 'react'
import { GetServerSideProps } from 'next'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'
import Router from 'next/router'
import { PersonProps } from '../../components/Employee'
import { makeSerializable } from '../../lib/util'
import prisma from '../../lib/prisma'

async function destroy(id: number): Promise<void> {
  await fetch(`/api/person/${id}`, {
    method: 'DELETE',
  })
  await Router.push('/')
}

const Employee: React.FC<PersonProps> = props => {
  let name = props.firstname + " " + props.lastname;

  return (
    <Layout>
      <div>
        <h2>{name}</h2>
        <button onClick={() => destroy(props.id)}>
          Delete
        </button>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(Array.isArray(context.params.id) ? context.params.id[0] : context.params.id)
  const person = await prisma.person.findUnique({
    where: { id }
  })
  return { props: { ...makeSerializable(person) } }
}

export default Employee
