import React from 'react'
import { fetchComments, fetchItem } from '../utils/api'
import queryString from 'query-string'
import Loading from './Loading'
import Title from './Title'
import PostMetaInfo from './PostMetaInfo'
import Comment from './Comment'

export default class Post extends React.Component {
    state = {
        post: null,
        loadingPost: true, 
        comments: null,
        loadingComments: true,
        error: null
    }

    componentDidMount() {
        const { id } = queryString.parse(this.props.location.search)

        fetchItem(id)
            .then((post) => {
                this.setState({
                    post,
                    loadingPost: false
                })

                return fetchComments(post.kids || [])
            })
            .then((comments) => this.setState({
                comments,
                loadingComments: false
            }))
            .catch(({ message }) => this.setState({
                error: message, 
                loadingPost: false, 
                loadingComments: false
            }))
    }

    render() {
        const { post, comments, loadingPost, loadingComments, error } = this.state

        if (error) {
            return <p className='center-text error'>{error}</p>
        }

        return (
            <React.Fragment>
                {loadingPost === true 
                    ? <Loading text='Fetching Post' />
                    : <React.Fragment>
                        <h1 className='header'>
                            <Title title={post.title} url={post.url} id={post.id} />
                        </h1>
                        <PostMetaInfo 
                            by={post.by}
                            time={post.time}
                            id={post.id}
                            descendants={post.descendants}
                        />
                        <p dangerouslySetInnerHTML={{__html: post.text}} />
                    </React.Fragment>}
                {loadingComments === true 
                    ? loadingPost === false && <Loading text='Fetching Comments' />
                    : <React.Fragment>
                        {comments.map((comment) => 
                            <Comment
                                key={comment.id}
                                comment={comment}
                            />
                        )}
                    </React.Fragment>}
            </React.Fragment>
        )
    }
}