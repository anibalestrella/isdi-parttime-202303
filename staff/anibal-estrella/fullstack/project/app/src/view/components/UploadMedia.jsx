import React, { useState } from 'react'
import { Button } from '../library'
import { SearchArtistList as SearchArtist, SearchPlace } from './'
// import retrieveArtistDetailsFromDisco    gs from '../../logic/retrieveArtistDetailsFromDiscogs';
// import uploadMedia from '../../logic/'


function UploadMedia() {
    console.log('UploadMedia => RENDER');

    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);

        // Determine the type of file based on its MIME type
        const mimeType = event.target.files[0].type;
        if (mimeType.startsWith('image')) {
            setFileType('image');
        } else if (mimeType.startsWith('audio')) {
            setFileType('audio');
        } else if (mimeType.startsWith('video')) {
            setFileType('video');
        }
    };

    const handleUploadMedia = async () => {
        if (file && fileType) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const fileData = event.target.result;

                try {
                    const response = await fetch('/upload', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ fileData, fileType }),
                    });

                    const data = await response.json();
                    console.log(`${fileType} uploaded successfully`, data);
                } catch (error) {
                    console.error(`Error uploading ${fileType}`, error);
                }
            };

            reader.readAsDataURL(file);
        }
    };

    return <div id='upload-media' className='flex flex-col p-2'    >

        <div className='' >
            <h3 className=''>Choose images, audio or video to share.</h3>

            <input
                onChange={handleFileChange}
                accept="image/*"
                type="file"
                multiple
                className='
                    pl-0
                    mt-2
                    mb-0
                    h-10
                     max-w-full
                     text-sm 
                     font-normal
                    file:font-normal 
                    file:mr-4
                    file:py-2
                    file:px-4
                    file:h-10
                    file:rounded-full file:border-0
                    file:text-xs
                    file:text-white
                    file:uppercase
                    file:bg-lime-300 
                    hover:file:bg-violet-100
                    '
            />
            <div className='w-full overflow-x-auto overflow-y-hidden col-span-2 my-4' >
                <div className="flex flex-row">

                    <div className="h-24 aspect-square bg-gray-400 rounded-lg m-2"></div>
                    <div className="h-24 aspect-square bg-gray-400 rounded-lg m-2"></div>
                    <div className="h-24 aspect-square bg-gray-400 rounded-lg m-2"></div>
                    <div className="h-24 aspect-square bg-gray-400 rounded-lg m-2"></div>
                </div>
            </div>
            <Button onClick={handleUploadMedia} className={'w-full mt-0 '}> Upload files</Button>
        </div>
    </div>

}

export default UploadMedia
