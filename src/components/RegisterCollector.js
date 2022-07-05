import React, { useState, useEffect } from 'react'

const auth_token = localStorage.getItem("auth_token");

async function getUsers() {

    const response = await fetch(`https://garbage-monitoring-backend.herokuapp.com/api/users`, {
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

async function register(name, email, password, password_confirmation) {

    const response = await fetch(`https://garbage-monitoring-backend.herokuapp.com/api/register`, {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            role: "collector",
            password_confirmation: password_confirmation
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

function RegisterCollector() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [isSaved, setIsSaved] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then((data) => {
            setUsers(data);
        });

        setIsSaved(false);
    }, [isSaved]);

    async function formHandler(e) {
        e.preventDefault();
        try {
            const result = register(name, email, password, confirm_password);
            if (result) {
                setIsSaved(true);
                alert("Saved");
            }
        } catch (e) {
            alert("An Error Occured!");
        }
    }

    function clearHandler() {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }

    function dashboardHandler(){
        window.location.href = "/dashboard";
    }

    function mrfFormHandler(){
        window.location.href = "/mrf-form";
    }

    return (
        <div className="container m-5">
            
            <div className="card p-5">
            
                <div className="row">
                    <div className="col-md-12 mb-3">
                    <h1>Dashboard</h1>
            <button onClick={dashboardHandler} className="btn btn-primary me-3">Dashboard</button>
            <button onClick={mrfFormHandler} className="btn btn-success">MRF Form</button>
                    </div>
                    <div className="col-md-4">
                        <form action="" onSubmit={formHandler}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input id="name" className='form-control' type={'text'} value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input id="email" className='form-control' type={'email'} value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input id="password" className='form-control' type={'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="confirm_password">Confirm Password</label>
                                <input id="confirm_password" className='form-control' type={'password'} value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <button type='submit' className="btn btn-primary me-3">Save</button>
                            <button type="button" onClick={clearHandler} className="btn btn-secondary">Clear</button>

                        </form>
                    </div>
                    <div className="col-md-8">
                        <table className="table table-stripe">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 && users.map((user) =>
                                    <tr>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.role}</td>
                                        <td>{user.email}</td>
                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterCollector