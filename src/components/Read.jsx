import { useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";

function Read() {
    let [information, setInformation] = useState([]);
    const fecthData = async () => {
        const db = getDatabase(app);
        const dbRef = ref(db, "odc/react");
        const snapchot = await get(dbRef);

        if (snapchot.exists()) {
            setInformation(Object.values(snapchot.val()));
        } else {
            alert("error");
        }
    }

    return (
        <div className="container ">
            <h1>Les data de firebase</h1>
            <button onClick={fecthData}>Afficher les données</button>
            <ul className=" ">
                {console.log(information)}
                {information.map((item, index) => (
                    <li key={index} className="d-flex justify-content-between mb-2 ">
                        {item.Nom} : {item.Prenom}
                        <button className="btn btn-primary" >Modifier</button>
                        <button className="btn btn-danger" >Supprimer</button>                     
                    </li>
                ))}
            </ul>
        </div>
    )

}


export default Read;