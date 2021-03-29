import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const AddEvents = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [imageUrl, setImageUrl] = useState('');
  return (
    <div>
      <h1>Add your awesome Event here</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" name="name" placeholder="Your event name" required ref={register} />
        <input type="file" name="image" required onChange={handleImageUpload} />
        <button>Submit</button>
      </form>

    </div>
  );

  function handleImageUpload(e){
    const imageData = new FormData();
    imageData.set('key', '944474bba0b71f9545ba1025a047dc94');
    imageData.append('image', e.target.files[0]);
    console.log(imageData);
    axios
        .post("https://api.imgbb.com/1/upload", imageData)
        .then(function (response) {
            setImageUrl(response.data.data.display_url);
        })
        .catch(function (error) {
            console.log(error);
        });
  }

  function onSubmit(data){
    const eventData = {
      name: data.name,
      imageURL: imageUrl,
    }

    fetch('http://localhost:5000/addEvent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(eventData)
    })
    .then(res => res.json())
    .then(data => {
      if(data){
        alert('Successfully added event!');
      }
    });

    data.name = '';

  }
};

export default AddEvents;