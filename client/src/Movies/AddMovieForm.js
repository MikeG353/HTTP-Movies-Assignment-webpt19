import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

// initial state for form
const initialState = {
    id: '',
    title: '',
    director: '',
    metascore: 0,
    stars: [],
  }

  const AddMovieForm = (props) => {
    // usestate for form
    const [newMovie, setNewMovie] = useState(initialState)
    const { push } = useHistory()

    // change handler for form
    const handleChanges = (e) => {
        // persist the event object and pull the value
        e.persist()
        let value = e.target.value;
        // if statement to target metascore
        if( e.target.name === 'metascore') {
            // this intercepts metascore and turns it from 
            // string to int
            value = parseInt(value)
        }else if( e.target.name === 'stars') {
            value = value.split(',')
        }
        // set entered values as current form state
        setNewMovie({
            ...newMovie,
            [e.target.name] : value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
        .post(`http://localhost:5000/api/movies/`, newMovie)
        .then(res => {
            console.log(res)
            props.setMovieList(res.data)
            push(`/`)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <h2>Add New Movie</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="title"
                    onChange={handleChanges}
                    placeholder="title"
                    value={newMovie.title}
                />
                <input 
                    type="text"
                    name="director"
                    onChange={handleChanges}
                    placeholder="director"
                    value={newMovie.director}
                />
                <input 
                    type="number"
                    name="metascore"
                    onChange={handleChanges}
                    placeholder="metascore"
                    value={newMovie.metascore}
                />
                {/* Not sure how to add the starts as an array yet */}
                <input 
                    type="text"
                    name="stars"
                    onChange={handleChanges}
                    placeholder="stars"
                    value={newMovie.stars}
                />
                <button>Add New Movie</button>
            </form>
        </div>
    )
  }

  export default AddMovieForm
