import React, { useState, useEffect } from 'react';

const PostData = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          player:value
        })
      });
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full'>
      <form onSubmit={handleSubmit}>
        <div className='md:flex md:items-center mt-6'>
            <div className='md:w-2/12 mb-2'>
                <label class="font-bold h-6 mx-2 mt-3 text-gray-800">Number of Player</label>
            </div>
            <div className='md:w-8/12 mb-2'>
            <input type="number" className="
                form-control 
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" value={value} onChange={(event) => setValue(event.target.value)} />
            </div>
            <div className='md:w-2/12'>
            <button type="submit" class="mb-2 sm:float-right inline-block px-8 py-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Start Game</button>
            </div>
        </div>
      </form>
      {loading ? <p>Loading...</p> : null}
      {error ? <p>Error: {error.message}</p> : null}
      {data ? (
            <table className='border-collapse border border-slate-500 w-full text-left mt-4 mb-8'>
                <thead className='text-white uppercase bg-gray-50 dark:bg-gray-700'>
                <tr>
                    <th className='border border-slate-600 p-2'>Cards</th>
                </tr>
                </thead>
                <tbody>
                {JSON.parse(JSON.stringify(data)).cardDistribution.map((row, index) => (
                    <tr key={index}>
                    <td className='border border-slate-700 p-2'>{row}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        ) : null}
    </div>
  );
};

export default PostData;
