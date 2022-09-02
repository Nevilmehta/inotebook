import React, {useContext} from 'react'
import notecontext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(notecontext);
    const {notes} = context;
    return (
        <>
        <AddNote />
        <div>
            <div className="row my-3">
                <h2>Your note</h2>
                {notes.map((note)=>{
                    return <NoteItem key={note._id} note={note} />;
                })}
            </div>
        </div>
        </>
  )
}

export default Notes
