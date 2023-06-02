import { context } from "../ui"
import toggleLikePost from "../logic/toggleLikePost"
import toggleFavPost from '../logic/toggleFavPost'
import formatTimeSince from "../logic/formatTimeSince"


//https://heroicons.com/
import { PencilIcon } from '@heroicons/react/24/solid'
import { HeartIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartIconLine } from '@heroicons/react/24/outline'
import { BookmarkIcon } from '@heroicons/react/24/solid'
import { BookmarkIcon as BookmarkIconLine } from '@heroicons/react/24/outline'


import './Post.css'

export default function Post({ post: { author, id, image, text, date, likes , fav}, onEditPost, onToggledLikePost, onToggledFavPost }) {
    console.log('// Post -> RENDER')

    date = formatTimeSince(date)

    const handleOpenEditPost = () => onEditPost(id)

    const handleToggleLikePost = () => {

        try {
            toggleLikePost(context.userId, id, (error) => {
                if (error) {
                    alert(error.message)

                    return
                }
                onToggledLikePost()
            })

        } catch (error) {
            alert(error.message)
        }
    }

    const handleToggleFavPost = () => {

        try {
            toggleFavPost(context.userId, id, (error) => {
                if (error) {
                    alert(error.message)

                    return
                }
                onToggledFavPost();
            })

        } catch (error) {
            alert(error.message)
        }
    }

    return (

        <article className="post panel">
            <div className="post-info">
                {/* <img className="user-avatar home-post-avatar" src={avatar} /> */}
                <img className="user-avatar home-post-avatar"  />
                <div>
                    <h3>{author}</h3>
                    <time>{date.toLocaleString()}</time>
                </div>
            </div>
            <img className="home-post-image grayscale-img" src={image} alt="" />
            <p>{text}</p>
            <div className="post-buttons">
                <button onClick={handleToggleLikePost} name="like" className="post-button post-like-button">
                    {likes.includes(context.userId) ? <HeartIcon className="HeartIcon icon" /> : <HeartIconLine className="HeartIconLine icon" />} {likes ? <span>{likes.length}</span> : ' '}
                </button>
                {author === context.userId ? <button className="post-button post-edit-button" onClick={handleOpenEditPost} name="edit"> <PencilIcon className="PencilIcon icon" /> </button> : ''}
                <button onClick={handleToggleFavPost} className="post-button fav-button icon">Fav
                // consultamos si FAV enviado es true o False
                    {fav? <BookmarkIcon className="favIcon icon" />  : < BookmarkIconLine className="favIcon icon" />}
                </button>
            </div>
        </article>

    )

}
