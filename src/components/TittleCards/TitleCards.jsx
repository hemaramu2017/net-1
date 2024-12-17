import React, { useEffect, useState } from 'react'
import'./TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { useRef } from 'react';
import { Link } from 'react-router-dom';


const TitleCards = ({title, category}) => {

const[apiData,setApiData]=useState([]);  
const cardRef = useRef();
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDUyYzYyM2U4NjY1OGViODlkMDhjN2UxZDhhODVmMSIsIm5iZiI6MTczMzg0MjQ0Ny4zMjMsInN1YiI6IjY3NTg1NjBmMTI4N2Q5YjQ2YmExOThmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lcJkQVgKm63zFm4Igli7sDrSAJOxl74jJ8VNU0uXAQc'
  }
};



const handleWheel =(event)=>{
  event.preventDefault();
  cardRef.current.ScrollLeft += event.deltaY;
}

useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));
  cardRef.current.addEventListener('wheel',handleWheel);

},[])

  return (
    <div className='titlecards'>
      
      <h2>{title?title:"Popular on Netflix"}</h2>

      <div className="card-list" ref={cardRef}>
        {apiData.map((card, index)=>{
           return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt=""/>
            <p>{card.original_title}</p>
        
           </Link>
           
        })}
      </div>
    </div>
  )
}

export default TitleCards
