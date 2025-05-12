import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';

export const ItmpDelPage=()=> {
    const params = useParams();
    const id = params.ItmpId;
    const navigate = useNavigate();
    const[itmp,setItmp] = useState([]);
    const[isPending, setPending] = useState(false);
    useEffect(() => {
        setPending(true);
        (async () => {
            try {
        const res= await fetch(`https://itmp.sulla.hu/users/${id}`)
            const itmp = await res.json();
            setItmp(itmp);
        }
        catch(error) {
            console.log(error);
        }
        finally {
            setPending(false);
        }
    })
    ();
 }, [id]);
 return (
    <div className="p-5 m-auto text-center content bg-lavender">
        {isPending || !itmp.id ? (
            <div className="spinner-border"></div>
        ) : (
                        <div className="card p-3">
                            <div className="card-body">
                            <h5 className="card-title">Törlendő elem: {itmp.name}</h5>
                            <div className="lead">Születési éve: {itmp.email}</div>
                            
                          </div>
                              <form onSubmit={(event) => {
            event.persist();
            event.preventDefault();
            fetch(`https://itmp.sulla.hu/users/${id}`, {
                method: "DELETE",
            })
            .then(() =>
            {
                navigate("/");
            })
            .catch(console.log);
            }}>
                              <div>
<NavLink to={"/"}><button className="bi bi-backspace">&nbsp;Mégsem</button></NavLink>
&nbsp;&nbsp;
<button className="bi bi-trash3">&nbsp;Törlés</button></div></form>   
                        </div>
                    
                )}
            </div>
        );
};