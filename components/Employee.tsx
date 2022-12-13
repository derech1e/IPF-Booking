import React from 'react'
import Router from 'next/router'
import ReactMarkdown from 'react-markdown'

export type EmployeeProps = {
  id: number;
  firstname: string;
  lastname: string;
  comment: string;
}
//<!--<ReactMarkdown children={post.content} />-->
const Employee: React.FC<{employee: EmployeeProps}> = ({ employee }) => {
  return (
    <div onClick={() => Router.push('/persons/[id]', `/persons/${employee.id}`)}>
        <h2>{employee.firstname + " " + employee.lastname}</h2>
    </div>
  )
}

export default Employee