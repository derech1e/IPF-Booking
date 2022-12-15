import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../../components/Layout'
import Room, { RoomProps } from '../../components/Room'
import { makeSerializable } from '../../lib/util'
import prisma from '../../lib/prisma'
import { getSession, useSession } from 'next-auth/react'

export async function getServerSideProps(req) {
    const session = await getSession(req)
    if (!session) {
        return {
            redirect: {
                destination: '/api/auth/signin',
                permanent: false,
            },
        }
    }

    const feed = await prisma.room.findMany({
        //where: { published: true },
        //include: { author: true },
    })

    return {
        props: { feed: makeSerializable(feed) },
    }
}

type Props = {
    feed: RoomProps[]
}

const Rooms: React.FC<Props> = props => {
    const[search, setSearch] = useState("")

    function handleSearchInput(event: { target: { value: React.SetStateAction<string> } }){
        setSearch(event.target.value)
    }

    return (
        <Layout title="Räume">
            <div>
                <main>
                    <div>
                        <input id="search" type="text" placeholder='Suche' className='input-primary' value={search} onChange={(e) => handleSearchInput(e)}/>
                    </div>
                    <div className='flex flex-row space-x-4 pt-10'>
                        {props.feed.filter(room => room.name.toLowerCase().includes(search.toLowerCase())).map(filteredRoom => (
                            <div key={filteredRoom.id} className="record-overview">
                                <Room room={filteredRoom} />
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </Layout>
    )
}

export default Rooms