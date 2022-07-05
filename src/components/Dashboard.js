import React, { useEffect, useState } from 'react'
import LineChart from '../UI/line-chart'
import Map from '../UI/map'
import SmallCard from '../UI/small-card'

const auth_token = localStorage.getItem("auth_token");

async function getTotalPerType(type) {

    const response = await fetch(`https://garbage-monitoring-backend.herokuapp.com/api/garbages/total/${type}`, {
        headers: {
            'Authorization': `Bearer ${auth_token}`
        }
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data.data;
}

async function getGarbages() {

    const response = await fetch(`https://garbage-monitoring-backend.herokuapp.com/api/garbages`, {
        headers: {
            'Authorization': `Bearer ${auth_token}`
        }
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data.data;
}

function Dashboard() {
    const [malata, setMalata] = useState(0);
    const [diMalata, setDiMalata] = useState(0);
    const [halo, setHalo] = useState(0);
    const [garbages, setGarbages] = useState([]);
    const [count, setCount] = useState(0);

    setTimeout(function() { 
        setCount(count + 1);
    }, 5000);

    useEffect(() => {

            getTotalPerType('malata').then((data)=> {
                setMalata(data);
            });
    
            getTotalPerType('di malata').then((data)=> {
                setDiMalata(data);
            });
    
            getTotalPerType('halo').then((data)=> {
                setHalo(data);
            });
    
            getGarbages().then((data)=> {
                setGarbages(data);
                console.log(data);
            })
    },[count]);

    function logoutHandler(){
        localStorage.removeItem("auth_token");
        window.location.href = "/";
    }

    function mrfFormHandler(){
        window.location.href = "/mrf-form";
    }

    function usersHandler(){
        window.location.href = "/register-collector";
    }

  return (
    <div className="container mt-5">
        <div className="card p-5 shadow">
            <div className="row">
                <div className="col-md-12 mb-3">
                    <h1>Dashboard</h1>
                    <button onClick={logoutHandler} className="btn btn-primary me-3">Logout</button>
                    <button onClick={mrfFormHandler} className="btn btn-success me-3">MRF Form</button>
                    <button onClick={usersHandler} className="btn btn-success">Manage Users</button>
                </div>
                <div className="col-md-4">
                    <SmallCard value={malata} title={'MALATA'} color={'success'} />
                </div>
                <div className="col-md-4">
                    <SmallCard value={diMalata} title={'DI MALATA'} color={'primary'} />
                </div>
                <div className="col-md-4">
                    <SmallCard value={halo} title={'HALO'} color={'warning'} />
                </div>
                <div className="col-md-12">
                    <LineChart data={garbages} />
                </div>
            </div>
            {/* <div className="row mt-3">
                <div className="col-md-12">
                    <h2>Collection Map</h2>
                    <Map />
                </div>
            </div> */}
            <div className="row mt-3">
                <div className="col-md-12">
                    <h2>Realtime Table</h2>
                <table className="table table-stripe">
                    <thead className='bg-primary text-light'>
                        <tr className='py-3'>
                            <th>#</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Type</th>
                            <th>Collector</th>
                            <th>Barangay</th>
                            <th>No. of Sacks</th>
                            <th>Date/Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {garbages.length > 0 && garbages.map(garb => <tr>
                            <td>{garb.id}</td>
                            <td>{garb.latitude}</td>
                            <td>{garb.longitude}</td>
                            <td>{garb.type}</td>
                            <td>{garb.name}</td>
                            <td>{garb.barangay}</td>
                            <td>{garb.no_sacks}</td>
                            <td>{garb.created_at}</td>
                        </tr>)}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard