import React, {useState} from 'react'
import { barangay } from '../barangay';
import {QRCodeCanvas} from 'qrcode.react';

function MrfForm() {
    const [brgy, setBrgy] = useState();
    const [isSaved, setIsSaved] = useState(false);

    const random = Math.floor(Math.random() * 999999999);

    function submitHandler(e){
        e.preventDefault();
        setIsSaved(true);
    }

  return (
    <div className="container">
        <div className="card p-5 mt-5">
            <h2>Generate MRF QR</h2>
            <form action="" method='post' onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="">Barangay</label>
                    <select className='form-control' name="" id="" value={brgy} onChange={(e)=> setBrgy(e.target.value)}>
                        {barangay && barangay.map(brg => <option value={brg}>{brg}</option>)}
                    </select>
                    <button type='submit' className="btn btn-primary">Generate MRF QR</button>
                </div>
                {isSaved && <QRCodeCanvas value={random} />}
            </form>
        </div>
    </div>
  )
}

export default MrfForm