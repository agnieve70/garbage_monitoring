import React, { useState, useEffect } from 'react'
import { barangay } from '../barangay';
import { QRCodeCanvas } from 'qrcode.react';

const auth_token = localStorage.getItem("auth_token");

async function getMrf() {

    const response = await fetch(`https://garbage-monitoring-backend.herokuapp.com/api/mrf`, {
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

async function create(barangay, code) {

    const response = await fetch("https://garbage-monitoring-backend.herokuapp.com/api/mrf/create", {
        method: "POST",
        body: JSON.stringify({ barangay, code }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth_token}`,
        },
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data.data;
}

function MrfForm() {
    const [brgy, setBrgy] = useState();
    const [isSaved, setIsSaved] = useState(false);
    const [isError, setIsError] = useState(false);
    const [mrfs, setMrfs] = useState([]);
    const [random, setRandom] = useState();


    useEffect(() => {
        setRandom(Math.floor(Math.random() * 999999999));

        getMrf().then((data) => {
            setMrfs(data);
        })
    }, [isSaved])

    async function submitHandler(e) {
        e.preventDefault();
        try {
            const result = await create(brgy, random);
            if (result) {
                setIsSaved(true);
            }
        } catch (e) {
            setIsError(true);
        }
    }

    return (
        <div className="container">
            <div className="card p-5 mt-5">
                <h2>Generate MRF QR</h2>
                {isSaved &&  <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Success</strong> Garbage Data Saved.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>}

                {isError && <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Failed!</strong> Could not save MRF
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>}
                <form className='mb-3' action="" method='post' onSubmit={submitHandler}>
                    <div className="form-group mb-3">
                        <label htmlFor="">Barangay</label>
                        <select className='form-control' name="" id="" value={brgy} onChange={(e) => setBrgy(e.target.value)}>
                            {barangay && barangay.map(brg => <option value={brg}>{brg}</option>)}
                        </select>
                        <button type='submit' className="btn btn-primary">Generate MRF QR</button>
                    </div>
                    <p>{random}</p>
                    {isSaved && <QRCodeCanvas value={random} />}
                </form>
                <table className='table table-stripe'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Barangay</th>
                            <th>Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mrfs.length > 0 && mrfs.map((m) => <tr>
                            <td>{m.id}</td>
                            <td>{m.barangay}</td>
                            <td>{m.code}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MrfForm