import React from 'react'

const NoteItem = (props) => {
    const { notes } = props;
    return (
        <div className='col-md-3 my-2'>
            <div class="card " >
                <div class="card-body mx-2">
                    <h5 class="card-title">{notes.title}</h5>
                    <p class="card-text"> {notes.description}</p>
                    <ion-icon  name="trash-sharp"></ion-icon>
                    <ion-icon name="create-outline"></ion-icon>                </div>
            </div>
        </div>
    )
}

export default NoteItem
