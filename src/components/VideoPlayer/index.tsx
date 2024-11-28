"use client"

import ReactPlayer from "react-player"

interface IVideoPlayer {
    videoUrl: string
}
export const VideoPlayer = ({ videoUrl }: IVideoPlayer) => {
    return (
        <ReactPlayer
            width="500px"
            height="400px"
            url={videoUrl}
            controls={true}
            // light is usefull incase of dark mode
            light={false}
            // picture in picture
            pip={true}
        />
    )
}