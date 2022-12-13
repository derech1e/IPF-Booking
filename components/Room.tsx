import React from 'react'
import Router from 'next/router'

export type RoomProps = {
    id: number;
    name: string;
    primaryplaces: number;
    secondaryplaces: number;
    comment: string;
    occupancyPriamry: number;
    occupancySecondary: number;
    occupancy: number;
}

const Room: React.FC<{ room: RoomProps }> = ({ room }) => {
    return (
        <div onClick={() => Router.push('/persons/[id]', `/persons/${room.id}`)}>
            <p className='text-lg font-bold'>{room.name}</p>
            <p className='text-base'>Insg. Primäre Plätze <b>{room.primaryplaces}</b></p>
            <p className='text-base'>Insg. Sekundäre Plätze <b>{room.secondaryplaces}</b></p>
            <p className='text-base'>Belegte Plätze <b>{room.occupancy}</b></p>
        </div>
    )
}

export default Room