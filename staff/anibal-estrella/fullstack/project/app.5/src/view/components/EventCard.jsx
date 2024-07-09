import React, { useState } from 'react'
import { PencilIcon, BookmarkIcon, HeartIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartIconLine, BookmarkIcon as BookmarkIconLine } from '@heroicons/react/24/outline'

export default function EventCard() {

    console.debug('// EventCard  -> Render')

    return <div id='event-card' className="flex-shrink-0 text-white p-2 w-48 h-auto rounded-lg bg-gray-300 hover:bg-gray-200  transition-all duration-200 ">
        <a id='event-link' href="#" className="">
            <div className="w-full aspect-square mb-2">
                <img srcSet="https://picsum.photos/1500?random=2" alt="" loading="lazy" className="h-full w-full rounded-md" />
            </div>
            <div id='event-details' className="text-sm">
                <div id='event-name' className="font-bold
">EVENT/ARTIST NAME</div>
                <div id='event-date' className="">Sun, Jan 21, 2024</div>
                <div id='event-place' className="">Sant Jordi Club</div>
                <div id='event-price' className="">€34.24</div>
            </div>
        </a>
        <div id='event-actions' className="">
            {/* <button type="button" className=""><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 6L19 12 8.5 18V6z" stroke="currentColor" stroke-linecap="square"></path></svg><audio className="__PLAY_AUDIO__" preload="none"><source src="https://p.scdn.co/mp3-preview/a86d0186d606b0f0e5b185c633a254ee5b51e925?cid=921526b9c2da4b7b96e197790a02347e" /></audio></button> */}
            <button id='like' className="">
                <HeartIconLine />
            </button>
        </div>
    </div>
}