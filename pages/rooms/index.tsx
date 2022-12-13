import React from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../../components/Layout'
import Room, { RoomProps } from '../../components/Room'
import { makeSerializable } from '../../lib/util'
import prisma from '../../lib/prisma'
import { getSession } from 'next-auth/react'

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

async function handleSearch(feed: RoomProps[], searchKey: string){
}

type Props = {
    feed: RoomProps[]
}

const Rooms: React.FC<Props> = props => {
    return (
        <Layout title="Räume">
            <div>
                <main>
                    <input type="text" className='input-primary'/>
                    <div className='flex flex-row space-x-4'>
                        {props.feed.map(room => (
                            <div key={room.id} className="record-overview">
                                <Room room={room} />
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </Layout>
    )
}

export default Rooms