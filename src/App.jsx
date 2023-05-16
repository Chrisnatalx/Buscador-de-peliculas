import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'



function App() {
  const { search, setSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search })


  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
    //forma controlada ( useState)

    // esta seria la manera de utilizar el useRef, pasandole una referencia, en este caso del input

    // const inputEl = inputRef.current 
    // const value = inputEl.value
    // console.log(value)


    // utilizando formDate para obtener los valores
    // const { search } = Object.fromEntries(new window.FormData(event.target))
    // console.log(search)
  }
  const handleChange = (event) => {

    setSearch(event.target.value)
  }




  return (
    <>
      <div className='page'>
        <header>
          <h1>Buscador de pelicula</h1>
          <form className='form' onSubmit={handleSubmit}>
            <input value={search} onChange={handleChange} placeholder='Avengers, Star Wars, The Matrix...' />
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
