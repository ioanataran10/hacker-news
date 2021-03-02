import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function Title({ title, url, id}) {
    return url 
        ? <a className='link' href={url}>{title}</a>
        : <Link className='link' to={`/post?id=${id}`}>{title}</Link>
}

Title.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string, 
    id: PropTypes.number.isRequired
}