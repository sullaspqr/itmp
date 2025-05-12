import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

export const ItmpSinglePage =()=> {

    const params = useParams();
    const id = params.ItmpId;
    const[itmps,setItmps] = useState([]);
    const[isPending, setPending] = useState(false);
    useEffect(() => {
        setPending(true);
        (async () => {
            try {
        const res= await fetch(`https://itmp.sulla.hu/users/${id}`)
            const itmpk = await res.json();
            setItmps(itmpk);
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
            {isPending || !itmps.id ? (
                <div className="spinner-border"></div>
            ) : (
                            <div className="card p-3">
                                <div className="card-body">
                                <h5 className="card-title">ITMP bejegyzés neve: {itmps.name}</h5>
                                <div className="lead">E-mail cím: {itmps.email}</div>
                                
                                <br />
                                
                                  </div>
                                  <div><NavLink to="/"><i className="bi bi-backspace"></i></NavLink> &nbsp;&nbsp;&nbsp;
<NavLink key="y" to={"/mod-itmp/" + itmps.id}><i className="bi bi-pencil"></i></NavLink></div>   
                            </div>
                        
                    )}
                </div>
            );
}