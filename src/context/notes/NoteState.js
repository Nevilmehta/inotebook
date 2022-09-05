import { useState } from "react";
import Notecontext from "./noteContext";

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const notesInitial=[]
    const[notes, setNotes] = useState(notesInitial);

    //Get all note
    const getNotes = async()=>{
        //TODO Api call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMwY2Y1YTRmZTFiZTAyZTJiNjYxMjhkIn0sImlhdCI6MTY2MTg1NDExMn0.RlqBtn1nWHqjV42wFpBp_OJ8rMqx5ioVQKTKr4d69sI"

            },
        });
        const json = await response.json()
        setNotes(json)
    }

    //Add a note
    const addNote = async(title, description, tag)=>{
        //TODO Api call
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMwY2Y1YTRmZTFiZTAyZTJiNjYxMjhkIn0sImlhdCI6MTY2MTg1NDExMn0.RlqBtn1nWHqjV42wFpBp_OJ8rMqx5ioVQKTKr4d69sI"

            },
            body: JSON.stringify({title, description, tag}) 
        });

        const note= await response.json()
        setNotes(notes.concat(note))

    }
    //Delete a note
    const deleteNote = async(id)=>{
        //API call
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
            method: 'DELETE', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMwY2Y1YTRmZTFiZTAyZTJiNjYxMjhkIn0sImlhdCI6MTY2MTg1NDExMn0.RlqBtn1nWHqjV42wFpBp_OJ8rMqx5ioVQKTKr4d69sI"
            }
        });
        const json = await response.json();

        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
    }
    //Edit a note
    const editNote = async(id, title, description, tag)=>{
        //API call
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMwY2Y1YTRmZTFiZTAyZTJiNjYxMjhkIn0sImlhdCI6MTY2MTg1NDExMn0.RlqBtn1nWHqjV42wFpBp_OJ8rMqx5ioVQKTKr4d69sI"

            },
            body: JSON.stringify({title, description, tag}) 
        });
        const json = await response.json();

        let newNotes = JSON.parse(JSON.stringify(notes))
        //Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id===id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    return(
        <Notecontext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </Notecontext.Provider>
    )
}

export default NoteState;