import React, { useContext } from 'react'
import NoteContext from '../Context/notes/NoteContext';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, setNotes } = context;
    return (
        <div>
            <div className="row my-3">
                <h1>Your Note</h1>
                {notes.map((notes) => {
                    return <NoteItem notes={notes} />
                })}
            </div>
        </div>
    )
}

export default Notes
