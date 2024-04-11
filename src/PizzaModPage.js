import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export function PizzaModPage(props) {
    const params = useParams();
    const id = params.pizzaId;
    const navigate = useNavigate();
    const [pizza,setPizza] = useState([]);
    const[modname,setModname] = useState('');
    const[modgluten,setModgluten] = useState('');
    const[modkepurl,setModkepurl] = useState('');

    useEffect(() => {
        (async () => {

            try {
                const res = await fetch(`https://pizza.kando-dev.eu/Pizza/${id}`)
                const pizza = await res.json();
                setPizza(pizza);
                setModname(pizza.name);
                console.log(modname);
                setModgluten(pizza.isGlutenFree);
                console.log(modgluten);
                setModkepurl(pizza.kepURL);
                console.log(modkepurl);
            }
            catch(error) {
                console.log(error);
            }
        })
        (); //dependency listában minden olyan változót meg kell adni, amitől függ az oldal render-elése:
    }, [id,modname,modgluten,modkepurl]);
   
    const modName = event => {
        setModname(event.target.value);
    }
    const modIsglutenfree = event => {
        setModgluten(event.target.value);
    }
    const modKepurl = event => {
        setModkepurl(event.target.value);
    }

    return (
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Pizza módosítása</h2>
            <form
            onSubmit={(event) => {
                event.persist();
                event.preventDefault();
                fetch(`https://pizza.kando-dev.eu/Pizza/${id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: event.target.elements.id.value,
                        name: event.target.elements.name.value,
                        isGlutenFree: event.target.elements.isglutenfree.value,
                        kepURL: event.target.elements.kepurl.value,
                    }),
                })
                .then(() => {
                    navigate("/");
                })
                .catch(console.log);
            }}>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Pizza ID:</label>
                    <div className="col-sm-9">
                        <input type="text" name="id" className="form-control" value={pizza.id}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Pizza név:</label>
                    <div className="col-sm-9">
                        <input type="text" name="name" className="form-control" defaultValue={pizza.name} onChange={modName}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Gluténmentes:</label>
                    <div className="col-sm-9">
                        <input type="text" name="isglutenfree" className="form-control" defaultValue={pizza.isGlutenFree} onChange={modIsglutenfree}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Kép URL-je:</label>
                    <div className="col-sm-9">
                        <input type="text" name="kepurl" className="form-control" defaultValue={pizza.kepURL} onChange={modKepurl}/>
                    <img src={pizza.kepURL} height="200px" alt={pizza.name}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Küldés</button>
            </form>
        </div>
    );
    }
export default PizzaModPage;
