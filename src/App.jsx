import React from 'react'
import Navbar from './Navbar/Navbar'
import Banner from './Banner/Banner'
import Row from './Row'
import requests from './requests'

export default function App() {
	return (
		<div className='App'>
			<Navbar />
			<Banner />
			<Row title="Trending" fetchUrl={requests.fetchTrending}/>
			<Row title="TopRated" fetchUrl={requests.fetchTopRated}/>
			<Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies}/>
			<Row title="Action Movies" fetchUrl={requests.fetchActionMovies}/>
			<Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies}/>
			<Row title="Documentaries Movies" fetchUrl={requests.fetchDocumentaries}/>
			<Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies}/>
		</div>
	)
}
