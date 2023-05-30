import { context } from "../ui"
import toggleLikePost from "../logic/toggleLikePost"
import toggleFavPost from '../logic/toggleFavPost'
import formatTimeSince from "../logic/formatTimeSince"
//CONTEXT/ALERTS/00// import to use context for dizxzplaying Alerts
import { useContext } from "react"
import Context from "../Context"

import Panel from '../library/Panel'

//https://heroicons.com/
import { PencilIcon } from '@heroicons/react/24/solid'
import { HeartIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartIconLine } from '@heroicons/react/24/outline'
import { BookmarkIcon } from '@heroicons/react/24/solid'
import { BookmarkIcon as BookmarkIconLine } from '@heroicons/react/24/outline'

import './Post.css'

export default function Post({ post: { author, id, image, text, date, likes, fav }, onEditPost, onToggledLikePost, onToggledFavPost }) {
    //CONTEXT/ALERTS/02// Use the context to return the object alert tha's define in the parent object App.jsx
    const { alert, freeze, unfreeze } = useContext(Context)

    date = formatTimeSince(date)

    const handleOpenEditPost = () => onEditPost(id)

    const handleToggleLikePost = () => {

        try {
            //loader begins
            freeze()

            toggleLikePost(context.userId, id, (error) => {
                //loader ends
                unfreeze()
                if (error) {
                    //CONTEXT/ALERTS/01// an alert is called
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

    console.debug('// Post -> RENDER')

    return (
        <Panel tag="article" className="post">
            <div className="post-info">
                <img className="user-avatar home-post-avatar" src={author.avatar} />
                <div>
                    <h3>{author.name}</h3>
                    <time>{date.toLocaleString()}</time>
                </div>
            </div>
            <div className="post-wrapper">

                <img className="home-post-image grayscale-img" src={image} alt="" />

                <div className="post-buttons-wrapper">

                    <button onClick={handleToggleFavPost} className="post-button fav-button icon">Fav
                        // consultamos si FAV enviado es true o False
                        {fav ? <BookmarkIcon className="favIcon icon" /> : < BookmarkIconLine className="favIcon icon" />}
                    </button>

                    {author.id === context.userId ? <button className="post-button post-edit-button icon" onClick={handleOpenEditPost} name="edit"> <PencilIcon className="PencilIcon post-edit-button  icon" /> </button> : ''}
                    <button onClick={handleToggleLikePost} name="like" className="post-button post-like-button">
                        {likes && likes.includes(context.userId) ? <HeartIcon className="HeartIcon icon" /> : <HeartIconLine className="HeartIconLine icon" />} {likes && likes.length > 0 ? <span>{likes.length}</span> : ''}
                    </button>
                </div>
            </div>
            <p>{text}</p>
        </Panel>

    )

}
