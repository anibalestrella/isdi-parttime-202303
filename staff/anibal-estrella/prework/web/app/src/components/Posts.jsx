import { Component } from "react"
import { context } from "../ui"
import Post from "./Post.jsx"
import retrievePosts from "../logic/retrievePosts"
import retrieveUser from "../logic/retrieveUser"

//we use a CLASS component to update the state an reload posts
export default class Posts extends Component {
    constructor(props) {
        super(props)

        try {
            // 1 we store props in memory
            const posts = retrievePosts(context.userId)
            const user = retrieveUser(context.userId)

            // 2 we save them in THIS.STATE
            this.state = { posts, user }

        } catch (error) {
            alert(error.message)
        }

    }

    // we need to use a class function to change the STATE so it rendes the updated posts
    //we use an arrow function to autobind it (this)
 
    handleRefreshPosts = () => {
        try {
            const posts = retrievePosts(context.userId)
            const user = retrieveUser(context.userId)

            // we  Update the state with SETSTATE
            this.setState({ posts, user })
        } catch (error) {
            alert(error.message)
        }
    }

    componentWillUnmount(){
        console.log('posts -> componentWillUnmount');
    }
    componentWillMount(){
        console.log('posts -> componentWillMount');
    }
    componentDidMount(){
        console.log('posts -> componentDidMount');
    }
    // we receive the updated props to compare with the oldones
    componentWillReceiveProps(newProps) {
        console.log('posts -> componentWillReceiveProps');

        if  (this.props.lastPostsUpdate !== newProps.lastPostsUpdate)
            this.handleRefreshPosts()
    }

    render() {
        console.log('// Posts -> RENDER');

        return (
            <section className="post-list">
                <h2 className="post-list-headline">All Posts</h2>

                // 3 we call the PROPS from THIS.STATE, that's why we use a class instead of a function component
                {this.state.posts.map(post => <Post post={ post }
                    user={this.state.user}
                    onEditPost={this.props.onEditPost}
                    onDeletedPost={this.handleRefreshPosts}
                    onToggledLikePost={this.handleRefreshPosts}
                />)}
            </section>
        )

    }

}




