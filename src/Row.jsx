import React, { useState, useEffect } from 'react';
import axios from './axios';
import YouTube from 'react-youtube';
import "./Row.scss";
import movieTrailer from 'movie-trailer';
import { IoClose } from "react-icons/io5";
const base_url = 'https://image.tmdb.org/t/p/w500/';

export default function Row({title, fetchUrl}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [isPlay, setIsPlay] = useState(false);

    useEffect(() => {
        axios.get(fetchUrl)
            .then(res => setMovies(res.data.results))
    }, [fetchUrl]);

    const opts = {
        height: '490',
        width: '60%',
        playerVars: {
            autoplay: 1,
        },
    };
    
    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.name || movie?.title || "")
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search)
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch(err => console.log(err))
        }
        setIsPlay(true);
    }

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(movie => (
                    movie.poster_path && (
                        <img 
                            className="row__poster row_posterlarge" 
                            key={movie.id}
                            src={`${base_url}${movie.poster_path}`}
                            alt={movie.title}
                            onClick={() => handleClick(movie)}
                        />
                    )
                ))}
            </div>
            {(trailerUrl && isPlay) && (
                <div className='video_box'>
                    <span onClick={() => setIsPlay(false)}><IoClose /></span>
                    <YouTube
                        videoId={trailerUrl}
                        onEnd={() => setIsPlay(false)}
                        opts={opts}
                        className="player"
                    />
                </div>
            )}
        </div>
    );
}
