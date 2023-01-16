import axios from 'axios';
import { useState, useRef } from 'react';

const CHUNK_SIZE = 50000; // 50kb

function Home() {
  const [uploaded, setUploaded] = useState(false);
  const fileRef = useRef();

  // async function handleUpload() {
  //   console.log(file);
  //   const formData = new FormData();

  //   formData.append('files', file);
  //   const config = {
  //     headers: { 'content-type': 'multipart/form-data' },
  //   };
  //   try {
  //     const response = await axios.post(
  //       `/api/upload?fileName=a`,
  //       formData,
  //       config
  //     );
  //   } catch (error) {
  //     console.log(error.response.data);
  //   }
  // }

  async function handleUpload(e) {
    // get the file from the ref
    const file = fileRef.current?.files[0];
    console.log(file);
    // convert the file to an array buffer
    const fileBuffer = await file.arrayBuffer();
    // log the array buffer
    console.log(fileBuffer.byteLength);
    // get the number of chunks
    const numberOfChunks = Math.ceil(fileBuffer.byteLength / CHUNK_SIZE);
    console.log(numberOfChunks);

    // get a randomly generated filename
    const fileName = Math.random().toString(36).slice(-6) + file.name;
    console.log(fileName);

    // for loop to transmit each chunk and append it to the file server-side
    for (let chunk = 0; chunk < numberOfChunks; chunk++) {
      let CHUNK = fileBuffer.slice(
        chunk * CHUNK_SIZE,
        (chunk + 1) * CHUNK_SIZE
      );
      await fetch(`/api/upload?fileName=${fileName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
          'content-length': CHUNK.byteLength,
        },
        body: CHUNK,
      });
    }
  }

  return (
    <div>
      <h1>Home</h1>
      <form>
        <input type='file' name='file' ref={fileRef} />
        <input type='button' defaultValue='Send' onClick={handleUpload} />
      </form>
      <pre>{JSON.stringify(uploaded, 0, 2)}</pre>
    </div>
  );
}

export default Home;
