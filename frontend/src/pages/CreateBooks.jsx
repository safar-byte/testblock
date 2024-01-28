import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Sipnner from '../components/Sipnner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setauthor] = useState('');
  const [publishYear, setpublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navidgate = useNavigate();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false);
        navidgate('/');
      })
      .catch((error) => {

        setLoading(false);
        alert('An error happended. Please check console');
        console.log(error);
      });
  };
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? (<Sipnner />) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Title</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Author</label>
            <input
              type='text '
              value={author}
              onChange={(e) => setauthor(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>PublishYear</label>
            <input
              type='number'
              value={publishYear}
              onChange={(e) => setpublishYear(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>
          <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>Save</button>
        </div>
      )}
    </div>
  )
}

export default CreateBooks