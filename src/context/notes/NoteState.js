import { useState } from "react";
import Notecontext from "./noteContext";

const NoteState = (props)=>{

    const notesInitial=[
        {
            "_id": "630f02c7cb7937a2d0713401",
            "user": "630cf5a4fe1be02e2b66128d",
            "title": "Mission master canada",
            "description": "in fav people uni or strange people uni doesn't matter",
            "tag": "will do it anyway",
            "date": "2022-08-31T06:42:15.491Z",
            "__v": 0
        },
        {
            "_id": "630f030dcb7937a2d0713403",
            "user": "630cf5a4fe1be02e2b66128d",
            "title": "Virat picks trophy for india",
            "description": "For asia cup, wct20 and wc odi 2023 also",
            "tag": "GOAT",
            "date": "2022-08-31T06:43:25.549Z",
            "__v": 0
        },
        {
            "_id": "630f02c7cb7937a2d0713490",
            "user": "630cf5a4fe1be02e2b66128d",
            "title": "Mission master canada",
            "description": "in fav people uni or strange people uni doesn't matter",
            "tag": "will do it anyway",
            "date": "2022-08-31T06:42:15.491Z",
            "__v": 0
        },
        {
            "_id": "630f030dcb7937a2d0713480",
            "user": "630cf5a4fe1be02e2b66128d",
            "title": "Virat picks trophy for india",
            "description": "For asia cup, wct20 and wc odi 2023 also",
            "tag": "GOAT",
            "date": "2022-08-31T06:43:25.549Z",
            "__v": 0
        },
        {
            "_id": "630f02c7cb7937a2d0713470",
            "user": "630cf5a4fe1be02e2b66128d",
            "title": "Mission master canada",
            "description": "in fav people uni or strange people uni doesn't matter",
            "tag": "will do it anyway",
            "date": "2022-08-31T06:42:15.491Z",
            "__v": 0
        },
        {
            "_id": "630f030dcb7937a2d0713460",
            "user": "630cf5a4fe1be02e2b66128d",
            "title": "Virat picks trophy for india",
            "description": "For asia cup, wct20 and wc odi 2023 also",
            "tag": "GOAT",
            "date": "2022-08-31T06:43:25.549Z",
            "__v": 0
        }
    ]
    const[notes, setNotes] = useState(notesInitial);

    //Add a note
    const addNote = (title, description, tag)=>{
        //TODO Api call
        console.log("Add a new note")
        const note= {
            "_id": "630f030dcb7937a2d0713404",
            "user": "630cf5a4fe1be02e2b66128d",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-08-31T06:43:25.549Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }
    //Delete a note
    const deleteNote = (id)=>{
        console.log("deleting note"+ id);
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
    }
    //Edit a note
    const editNote = (id, title, description, tag)=>{

    }
    return(
        <Notecontext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </Notecontext.Provider>
    )
}

export default NoteState;