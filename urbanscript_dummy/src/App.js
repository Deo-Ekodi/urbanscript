import React, { useState } from 'react';
import Replicate from 'replicate';  // Import the Replicate client

function App() {
  const [description, setDescription] = useState('');
  const [imageResults, setImageResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Instantiate the Replicate client
  const replicate = new Replicate({
    auth: process.env.REACT_APP_REPLICATE_API_TOKEN,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setImageResults([]);

    try {
      // Run the model
      const output = await replicate.run(
        "stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478",
        {
          input: {
            prompt: description,
          }
        }
      );

      setImageResults(output); // Set the generated images in state
      setIsLoading(false);
    } catch (error) {
      console.error('Error generating image:', error);
      setIsLoading(false);
      alert('Error submitting request.');
    }
  };

  return (
    <div>
      <div id="formContainer">
        <form onSubmit={handleSubmit}>
          <label htmlFor="description">Room Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
            placeholder="Describe the room..."
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div id="imageResultsContainer">
        {isLoading && <p>Loading...</p>}
        {!isLoading && imageResults.length > 0 && (
          imageResults.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt="Generated Design" />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
