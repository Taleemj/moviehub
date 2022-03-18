import React from 'react'
import { Badge } from '@mui/material'
import './singlemovie.css'
import ContentModal from '../contentModal/ContentModal'

const SingleMovie = ({ poster, media, release, air, title, rating, id }) => {
    return (
         <ContentModal media={media} id={id}>
            <div className='single'>
            <Badge badgeContent={rating} className='badge' color={rating>6? 'primary': 'secondary'}/>
                <img src={`https://tmdb.org/t/p/original${poster}`} alt='img' />
                <h4>{title}</h4>
                <h5>{media} <span>{air || release}</span></h5>
            </div>
         </ContentModal>
    )
}

export default SingleMovie