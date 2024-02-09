import React, { useState, useEffect } from 'react';
import axios from '../axios';
import requests from '../requests';
import "./Banner.scss"
const base_url = 'https://image.tmdb.org/t/p/original/';


export default function Banner() {
	const [movie,setMovie] = useState([]);
	console.log(movie)
	useEffect(() => {
	  async function fetchData() {
		const response =await axios.get(requests.fetchNetflixOriginals)
		setMovie(response.data.results[Math.trunc(Math.random() * response.data.results.length)])
	  }
	fetchData()
	}, [])

	const trunCate = (text,symbolCount) => {
		return text?.length > symbolCount ? text.slice(0,symbolCount-1) + "..." : text;
	}
	
 return (
	<header style={{
		backgroundImage: `url(${base_url}${movie?.backdrop_path})`,
		backgroundPosition: "center",
		backgroundSize: "cover"
	}} className="banner">
		<div className="banner__contects">
			<h1 className='banner__title'>{movie?.title || movie?.name || movie?.original__name}</h1>
			<div className="banner__buttons">
				<button className="banner__button">Play</button>
				<button className="banner__button">My List</button>
			</div>
			<h1 className='banner__description'>
				{trunCate(movie?.overview,150)}
			</h1>
		</div>
		<div className="banner__fadeBottom"></div>
	</header>
	
 )
}
