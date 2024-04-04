import { db } from "../firebaseConfig";
import { useState, useEffect } from "react";
import { collection, doc, addDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore'


const Crud = () => {
    const [nom, setNom] = useState("")
    const [fetchData, setFetchData] = useState([])
    const [id, setId] = useState()



    //creation de la reference de la base de donnée
    const dbref = collection(db, 'CRUD')

    // ajout des données
    const add = async () => {
        const addData = await addDoc(dbref, { Nom: nom })
        if (addData) {
            alert("Donnée envoyé avec succès")
            window.location.reload()
        } else {
            alert(error)
        }
    }
    // recuperation des données
    const fetch = async () => {
        const snapchot = await getDocs(dbref)
        const fechdata = snapchot.docs.map((doc => ({ id: doc.id, ...doc.data() })))
        setFetchData(fechdata)
        console.log(fetchData)
    }
    useEffect(() => {
        fetch()
    }, []);

    // passage de données au formaulaire pour la modification
    const passData = async (id) => {
        const matchId = fetchData.find((data) => {
            return data.id == id;
        })
        setNom(matchId.Nom) //envoyer le Champ Nom a l'input depuis la base de donnée firebase
        setId(matchId.id)  //e
    }

    //la fonction qui permet mettre a jour le valeur mofifier
    const update = async () => {
        const updateref = doc(dbref, id)
        try {
            await updateDoc(updateref, { Nom: nom })
            alert("Modification effectuer avec succès")
        } catch (error) {
            alert(Error, "Modification non effectuer")
        }
    }

    //la fonction qui permet de supprimer les données
    const handleDelete = async(id) => {
        try{
            await deleteDoc(doc(db, 'CRUD', id))
            alert("Donnée supprimer avec succès")
            fetch()
        } catch(error){
            alert("ERREUR")
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="card d-flex justify-content-between text-ligth">
                    <div className="col-2"></div>
                    <div className="col-8 pe-2">
                        <div className="d-flex">
                            <label className=""><h4>Nom:</h4></label>
                            <input type="text" className="mb-3" placeholder="Entrer votre nom"
                                aria-autocomplete="off" value={nom} onChange={(e) => setNom(e.target.value)} />
                            <button className="" onClick={add} >Enregistrer</button>
                            <button className="" onClick={update} >Modifier</button>
                        </div>

                    </div>
                </div>
                <div className="card">
                    {
                        fetchData.map((data => {
                            return (
                                <div key={data.id} className="d-flex justify-content-between pe-3 m-1">
                                    <h6 className="d-flex justify-content-between">Nom: {data.Nom}</h6>
                                    <div style={{display:"flex", gap:"10px"}}>
                                        <button onClick={() => passData(data.id)} className=" btn btn-warning  ">Modifier</button>
                                        <button onClick={() => handleDelete(data.id)} className="btn btn-danger ">Supprimer</button>
                                    </div>

                                </div>
                            )
                        }))
                    }
                </div>

                <div className="col-2"></div>
            </div>
        </div>
    )



}

export default Crud;