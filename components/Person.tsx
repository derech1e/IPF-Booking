import React from 'react'
import Router from 'next/router'
import ReactMarkdown from 'react-markdown'

export type PersonProps = {
  id: number;
  firstname: string;
  lastname: string;
}
//<!--<ReactMarkdown children={post.content} />-->
const Post: React.FC<{person: PersonProps}> = ({ person }) => {
  return (
    <div onClick={() => Router.push('/persons/[id]', `/persons/${person.id}`)}>
        <h2>{person.firstname + " " + person.lastname}</h2>
    </div>
  )
}

export default Post