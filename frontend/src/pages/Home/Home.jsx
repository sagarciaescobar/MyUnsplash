import React from 'react'
import ImagesContainer from '../../components/ImagesContainer/ImagesContainer'

export default function Home(props) {
    return (
        <ImagesContainer filter={props.filter} setLabels={props.setLabels}/>
    )
}
