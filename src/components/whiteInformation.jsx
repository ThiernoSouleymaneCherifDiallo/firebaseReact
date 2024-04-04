import { useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, set, push, get } from "firebase/database"

function White() {
    let [inputValue, setinputValue] = useState("");
    let [inputValue2, setinputValue2] = useState("");

    const saveData = async () => {
        const db = getDatabase(app);
        const newDocRef = push(ref(db, "odc/react"));
        set(newDocRef, {
            Nom: inputValue,
            Prenom: inputValue2
        }).then(() => {
            alert("Bien, Donner enregistrer")
        }).catch((error) => {
            alert("error", error.message);
        })
    }

    return (
        <div>
            <div className="container" >
                <div className="col">
                    <label htmlFor="1">Nom</label>
                    <input id="1" type="text" value={inputValue}
                        onChange={(e) => setinputValue(e.target.value)} />
                </div>
                <div className="col-3 mb-2">
                    <label htmlFor="1">Prenom</label>

                    <input type="text" id="2" value={inputValue2}
                        onChange={(e) => setinputValue2(e.target.value)} />
                </div>
                <div className="col">
                <button className="btn btn-primary" onClick={saveData}>Enregistrer</button>
                </div> 
            </div>
        </div>
    )

}

export default White;