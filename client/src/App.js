import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [argoName, setArgoName] = useState('');
  const [argoMember, setArgoMember] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setArgoMember(response.data);
    })
  }, []);

  const submitMember = () => {
    Axios.post('http://localhost:3001/api/insert', {
      argoName: argoName,
    })
    //.then(()=> {
      //alert('Welcome on board !');
    //});
  };

  return (
    <div className="App">

      {/*<!-- Header section -->*/}
      <header>
        <h1>
          <img src="https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png" alt="Wild Code School logo" />
          Les Argonautes
        </h1>
      </header>

      {/*<!-- Main section -->*/}
      <main>
        
        {/*<!-- New member form -->*/}
        <h2>Ajouter un(e) Argonaute</h2>
        <form className="new-member-form">
          <label>Nom de l&apos;Argonaute</label>
          <input id="name" name="argoName" type="text" placeholder="Charalampos" onChange={(e) => {
            setArgoName(e.target.value)
          }}/>
          <button type="submit" onClick={submitMember}>Envoyer</button>
        </form>
        
        {/*<!-- Member list -->*/}
        <h2>Membres de l'équipage</h2>
        <section className="member-list">
          {argoMember.map((val) => {
            return <div className="member-item">{val.id} | {val.argoName}</div>
          })}
        </section>
        
      </main>

      {/*<!-- Footer section -->*/}
      <footer>
        <p>Réalisé par Jason en Anthestérion de l'an 515 avant JC</p>
      </footer>

    </div>
  );
}

export default App;
