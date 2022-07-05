import React, { useState } from 'react';

function Test(){
  const [data, setData] = useState('No result');

  return (
    <>
      
      <p>{data}</p>
    </>
  );
};

export default Test;