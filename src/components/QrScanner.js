import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';

const auth_token = localStorage.getItem("auth_token");

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(showPosition);
} else {
  alert("Geolocation is not supported by this browser.");
}

let myLocation;

function showPosition(position) {
  myLocation = [position.coords.longitude, position.coords.latitude];
  console.log("MY LOCATION: ", myLocation);
}

async function create(no_sacks, type, mrf_id) {

  const response = await fetch(`https://garbage-monitoring-backend.herokuapp.com/api/garbage/create`, {
    method: 'POST',
    body: JSON.stringify({
      no_sacks: no_sacks,
      latitude: myLocation[1],
      longitude: myLocation[0],
      type: type,
      mrf_id: mrf_id
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    }
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data.data;
}

function Test() {
  const [data, setData] = useState('No result');
  const [no_sacks, setNoSacks] = useState(0);
  const [type, setType] = useState("");
  const [saved, setSaved] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setSaved(false);
    setIsError(false);

  }, [saved]);
  function logoutHandler() {
    localStorage.removeItem("auth_token");
    window.location.href = "/";
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const result = await create(no_sacks, type, data);
      if (result) {
        alert("Saved");
        setSaved(true);
      }
    } catch (e) {
      setIsError(true);
    }
  }

  function clearHandler(){
    setData("No Result");
    setNoSacks(0);
    setType("");
    setSaved(false);
    setIsError(false);
  }

  return (
    <div className='container'>
      <div className="row mt-4">
        <div className="col-8">
          <h1>Collect Garbages</h1>
        </div>
        <div className="col-4">
          <button onClick={logoutHandler} className="btn btn-primary">Logout</button>
        </div>
      </div>
      <QrReader
        constraints={{
          facingMode: 'environment'
        }}

        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />

      {saved && <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Success</strong> Garbage Data Saved.
      </div>}

      {isError && <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Failed!</strong>Please Contact Admin
      </div>}

      <p>MRF Result: <b>{data}</b></p>
      <form action="" onSubmit={submitHandler}>
        <div className="form-group mb-2">
          <label htmlFor="type">Garbage Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} id="type" className="form-control">
            <option value="malata">Malata</option>
            <option value="di malata">Di Malata</option>
            <option value="halo">Halo</option>
          </select>
        </div>
        <div className="form-group mb-2">
          <label htmlFor="no_sacks">No. of Sacks Collected</label>
          <input id='no_sacks' value={no_sacks} onChange={(e) => setNoSacks(e.target.value)} type="number" min={1} className='form-control' />
        </div>
        <div class="d-grid gap-2 mb-5">
          <button class="btn btn-primary" type="submit">COLLECT DATA</button>
          <button class="btn btn-secondary" onClick={clearHandler} type="button">CLEAR</button>
        </div>
      </form>
    </div>
  );
};

export default Test;