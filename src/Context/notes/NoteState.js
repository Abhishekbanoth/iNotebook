import { useState } from 'react';
import noteContext from './NoteContext';

const NoteState = (props) => {
    const notesinitial = [
        {
            "_id": "66c59ed833907a25a010bdd0",
            "user": "66c46f6d752ccd83cb2b24ad",
            "title": "my title",
            "description": "please make me early",
            "tag": "personl",
            "date": "2024-08-21T08:01:28.597Z",
            "__v": 0
        },
        {
            "_id": "66c5eaea41525260fedaaf3d",
            "user": "66c46f6d752ccd83cb2b24ad",
            "title": "my title2",
            "description": "please make me early today",
            "tag": "personl",
            "date": "2024-08-21T13:26:02.557Z",
            "__v": 0
        },
        {
            "_id": "66c59ed833907a25a010bdd0",
            "user": "66c46f6d752ccd83cb2b24ad",
            "title": "my title",
            "description": "please make me early",
            "tag": "personl",
            "date": "2024-08-21T08:01:28.597Z",
            "__v": 0
        },
        {
            "_id": "66c5eaea41525260fedaaf3d",
            "user": "66c46f6d752ccd83cb2b24ad",
            "title": "my title2",
            "description": "please make me early today",
            "tag": "personl",
            "date": "2024-08-21T13:26:02.557Z",
            "__v": 0
        },{
            "_id": "66c59ed833907a25a010bdd0",
            "user": "66c46f6d752ccd83cb2b24ad",
            "title": "my title",
            "description": "please make me early",
            "tag": "personl",
            "date": "2024-08-21T08:01:28.597Z",
            "__v": 0
        },
        {
            "_id": "66c5eaea41525260fedaaf3d",
            "user": "66c46f6d752ccd83cb2b24ad",
            "title": "my title2",
            "description": "please make me early today",
            "tag": "personl",
            "date": "2024-08-21T13:26:02.557Z",
            "__v": 0
        }
        
        
    ]
    const [notes,setNotes]=useState(notesinitial);
    return (
        <noteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;