import React from 'react'
import LineChart from '../UI/line-chart'
import Map from '../UI/map'
import SmallCard from '../UI/small-card'

function Dashboard() {
  return (
    <div className="container mt-5">
        <div className="card p-5 shadow">
            <div className="row">
                <div className="col-md-12">
                    <h1>Dashboard</h1>
                </div>
                <div className="col-md-4">
                    <SmallCard value={20} title={'MALATA'} color={'success'} />
                </div>
                <div className="col-md-4">
                    <SmallCard value={20} title={'DI MALATA'} color={'primary'} />
                </div>
                <div className="col-md-4">
                    <SmallCard value={20} title={'HALO'} color={'warning'} />
                </div>
                <div className="col-md-12">
                    <LineChart />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <h2>Collection Map</h2>
                    <Map />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <h2>Realtime Table</h2>
                <table className="table table-stripe">
                    <thead className='bg-primary text-light'>
                        <tr className='py-3'>
                            <th>#</th>
                            <th>Location</th>
                            <th>Malata</th>
                            <th>Di-Malata</th>
                            <th>Halo</th>
                            <th>Date/Time</th>
                        </tr>
                    </thead>
                </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard