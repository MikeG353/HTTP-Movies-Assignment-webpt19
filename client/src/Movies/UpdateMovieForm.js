import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

// Form state
const initialState = {
    title: '',
    director: '',
    metascore: 0,
    stars: []
}
const UpdateMovieForm = (props) => {
    // custom hook for movie
    const [movie, setMovie] = useState(initialState)
    // pulling the id paramerter with useParams
    const { id } = useParams();
    // pulling push form useHistory
    const { push } = useHistory();

    // axios call for page render and any time the id cahnges
    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            setMovie(res.data)
        })
        .catch(err => {
            console.error(`unable to get movie id: ${id}`)
        })
    }, [id])
    // change handler for form data
    // note: metascore is returned as an int
    const handleChanges = (e) => {
        // persist the event object and pull the value
        e.persist()
        let value = e.target.value;
        // if statement to target metascore
        if( e.target.name === 'metascore') {
            // this intercepts metascore and turns it from 
            // string to int
            value = parseInt(value)
        }
        // set entered values as current form state
        setMovie({
            ...movie,
            [e.target.name] : value
        })
    }
    // Submit handler for the form
    const handleSubmit = (e) => {
        e.preventDefault()
        axios
        // in my old project i used movie.id
        // I dont remember why though.
        // remember to document why to refrence later


        // this might have something to do with 'render' and
        // pulling parameters from props to pass to the component
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                // server should return a new movie list
                console.log(res)
                props.setMovieList(res.data)
                push(`/movies`)
            })
            .catch(err => {
                console.error(`unable to update movie id: ${id}: `, err)
            })
    }

    return (
        <div>
            <h2>Update Movie</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        onChange={handleChanges}
                        value={movie.title}
                    />
                    <input
                        type="text"
                        name="director"
                        onChange={handleChanges}
                        value={movie.director}
                    />
                    <input
                        type="number"
                        name="metascore"
                        onChange={handleChanges}
                        value={movie.metascore}
                    />
                    <button>Update</button>
                </form>
        </div>
    )
}
export default UpdateMovieForm