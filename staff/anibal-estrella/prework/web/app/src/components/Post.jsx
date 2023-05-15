import { context } from "../ui"
import toggleLikePost from "../logic/toggleLikePost"
import formatTimeSince from "../logic/formatTimeSince"

import { HeartIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartIconLine } from '@heroicons/react/24/outline'
import { PencilIcon } from '@heroicons/react/24/solid'

//https://heroicons.com/

import './Post.css'

export default function Post({ post: { author, id, image, text, date, likes }, user: { avatar, name }, onEditPost, onToggledLikePost }) {
  console.log('// Post -> RENDER')

  date = formatTimeSince(date)

  const handleOpenEditPost = () => onEditPost(id)

  const handleToggleLikePost = () => {

    try {
      toggleLikePost(context.userId, id)
      onToggledLikePost()

    } catch (error) {
      alert(error.message)
    }

  }

  return (

    <article className="post panel">
      <div className="post-info">
        <img className="user-avatar home-post-avatar" src={avatar} />
        <div>
          <h3>{name}</h3>
          <time>{date.toLocaleString()}</time>
        </div>
      </div>
      <img className="home-post-image grayscale-img" src={image} alt="" />
      <p>{text}</p>
      <div className="post-buttons">
      <button onClick={handleToggleLikePost} name="like" className="post-like-button">
        {likes && likes.includes(context.userId) ? <HeartIcon className="HeartIcon icon" /> : <HeartIconLine className="HeartIconLine icon" />} {likes ? <span>{likes.length}</span> : ''}
      </button>
      {author === context.userId ? <button onClick={handleOpenEditPost} name="edit"> <PencilIcon className="PencilIcon icon" /> </button> : ''}
      </div>
    </article>

  )

}
