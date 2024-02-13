import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
import { useNavigate } from 'react-router-dom';




const NotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const getNote = async () => {
      try {
        if (id === 'new') return
        const response = await fetch(`/api/notes/${id}/`);
        const data = await response.json();
        setNote(data);
      } catch (error) {
        console.error('Error fetching note:', error);
      }
    };

    getNote();
  }, [id]);

  let createNote = async () =>{
    fetch(`/api/notes/`,{
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(note)
    })
  }
  
  let updateNote = async () =>{
    fetch(`/api/notes/${id}/` ,{
      method:  "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)

    })

  }
  let deleteNote = async () => {
    fetch(`/api/notes/${id}/`,{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
    })
    navigate('/')
  }

  let handleSubmit = ()=> {
    console.log('Note:', note)
    if(id!== 'new' && note.body === ''){
      deleteNote()
    
    }else if(id !=='new'){
      updateNote()
    }else if(id === 'new' && note !== null){
      createNote()
    }
    navigate('/')
  }

  let handleChange = (value) => {
    setNote(note => ({ ...note, 'body': value }))
    console.log('Handle Change:', note)


  }

  return (
    <div className = "note">
      <div className = "note-header"> 
      <h3>
       
          <ArrowLeft onClick = {handleSubmit}/>
          
      </h3>
      {id !== 'new' ? (
      <button onClick = {deleteNote}> Delete </button>
      ):(
        <button onClick = {handleSubmit} >Done</button>
      )}
        
      </div>
      <textarea onChange={(e) => { handleChange(e.target.value) }} value={note?.body}></textarea>
    </div>
  );
};

export default NotePage;
