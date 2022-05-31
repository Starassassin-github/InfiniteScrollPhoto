import './App.css';
import PhotoComponent from './components/PhotoComponent';
import {useEffect, useState} from "react";

function App() {

  const apiKey = `1uPv3K0-CkrItngcJ-rvuWlvlnmisGF3yaYysqW8EEE`
  
  // keep image from api
  const [photos, setPhotos] = useState([])
  // increase page for update image
  const [page, setPage] = useState(1) // 2, 3, 4, 5 page++
  // catch send response
  const [isLoading, setIsLoading] = useState(false)
  
  
  // Asynch
  const fetchImage=async()=>{
      setIsLoading(true)
      try {
        const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&page=${page}`
        const response = await fetch(apiUrl) 
        const data = await response.json()
        // old on state photo + new photo on state photo => keep on state photo
        setPhotos((oldData) => {
          return [...oldData, ...data]
        })
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false)
  }


  // run this first
  // catch value changing on state page
  // scroll state page up => useEffect -> fetchImage
  useEffect(() => {
    fetchImage()
    // eslint-disable-next-line
  },[page])

  // target event scroll mouse
  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      // scroll down to end of page - 500 distacne
      if (window.innerHeight + window.scrollY > document.body.offsetHeight - 500 && !isLoading) {
        setPage((oldpage) => {
          return oldpage + 1
        })
      }
    })
    // remove when without scrolling
    return () => window.removeEventListener('scroll', event)
    // eslint-disable-next-line
  })

  return ( 
    <main>
      <h1>Infinite Scroll Photo | Unsplash API</h1>
      <section className='photos'>
          <div className='display-photo'>
            {photos.map((data,index) => {
              return <PhotoComponent key={index} {...data}/>
            })}
          </div>
      </section>
    </main>
  );
}

export default App;
