import React from 'react'
import PropTypes from 'prop-types'
import Title from './Title'
import PostMetaInfo from './PostMetaInfo'



export default function PostList({ posts }) {
    if (posts.length === 0) {
        return (
            <p className='center-text'>
                This user hasn't posted yet!
            </p>
        )
    }

    return (
        <ul>
            {posts.map((post) => {
                return (
                    <li key={post.id} className='post'>
                        <Title title={post.title} url={post.url} id={post.id} />
                        <PostMetaInfo
                            by={post.by}
                            time={post.time}
                            id={post.id}
                            descendants={post.descendants}
                        />
                    </li>
                )
            })}
        </ul>
    )
}

PostList.propTypes = {
    posts: PropTypes.array.isRequired
}