import React, { useState, useContext } from 'react'
import notecontext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(notecontext);
    const {addNote} = context;

    const [note, setNote] = useState({title:"", description:"", tag:""})

    const handleclick = (e) =>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""})
        props.showAlert("Added Successfully", "success")
    }
    const onChange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value});
    }
    return (
    <div>
        <div className="container my-3">
            <h2>Add a note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" id="title" name="title" className="form-control" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required  />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="description" name="tag" value={note.tag} onChange={onChange} minLength={5} required />
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
            </form>
        </div>
    </div>
    )
}

export default AddNote
