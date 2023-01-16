import axios from 'axios';
import { useState } from 'react';

function Home() {
  const [file, setFile] = useState(null);

  async function handleUpload() {
    console.log(file);
    const formData = new FormData();

    formData.append('files', file);
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    try {
      const response = await axios.post('/api/upload', formData, config);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <div>
      <h1>Home</h1>
      <form>
        <input
          type='file'
          onChange={e => setFile(e.target.files[0])}
          name='files'
        />
        <input
          type='button'
          defaultValue='Send'
          onClick={handleUpload}
          disabled={!file}
        />
      </form>
    </div>
  );
}

export default Home;
