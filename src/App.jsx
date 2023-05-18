import { useCallback, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'


function App() {

  const [sort, setSort] = useState(false)
  const { search, setSearch, error } = useSearch('')
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log('search', search)
      getMovies({ search })
    }, 400)
    , [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
    //forma controlada ( useState)

    // esta seria la manera de utilizar el useRef, pasandole una referencia, en este caso del input

    // const inputEl = inputRef.current 
    // const value = inputEl.value
    // console.log(value)


    // utilizando formDate para obtener los valores
    // const { search } = Object.fromEntries(new window.FormData(event.target))
    // console.log(search)
  }
  const handleSort = () => {
    setSort(!sort)
  }
  const handleChange = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    debouncedGetMovies(newSearch)
  }




  return (
    <>
      <div className='page'>
        <header>
          <h1>Buscador de pelicula</h1>
          <form className='form' onSubmit={handleSubmit}>
            <input value={search} onChange={handleChange} placeholder='Avengers, Star Wars, The Matrix...' />
            <input type='checkbox' onChange={handleSort} checked={sort}></input>
            <button type='submit'>Buscar</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </header>
        <main>
          {loading ? <p>Cargando...</p> : <Movies movies={movies} />
          }
        </main>

      </div>
    </>
  )
}

export default App
