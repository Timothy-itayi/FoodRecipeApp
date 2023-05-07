import { useState } from 'react';
import superagent from 'superagent';
import request from 'superagent' 

const PostPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const post = {
      title,
      description,
     
    };
    try {
      await superagent.post('/api/posts', post);
      // redirect to feed page or show success message
    } catch (error) {
      // handle error
    }
  };

  return (
    <div className="post-page">
      <h1>Post a Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
     
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostPage;
