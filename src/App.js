import React from 'react';
import './App.css';
import Virus from './virus.jpg'

class App extends React.Component {
  constructor(){
    super();
    
    this.state = {
      coronaData: null,
    }
  }

  componentDidMount(){
    fetch('https://coronavirus-tracker-api.herokuapp.com/all')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.setState({coronaData: data})
      console.log(data);
    });
  }

  render(){
    const {coronaData} = this.state;
    if(coronaData == null){
      return <p>Loading...</p>
    }

    const india = coronaData.confirmed.locations.find(location => 
      location.country_code === "IN"
      );
      console.log("ind",india)
    return (
      <div className="App">
        <h1>CORONA VIRUS</h1>
        <img src={Virus} alt="virus"></img>
        <div>
          <h2>Confirmed cases : {coronaData.latest.confirmed}</h2>
        </div>
        <div>
          <h2>Deaths : {coronaData.latest.deaths}</h2>
        </div>
        <div>
          <h2>Recovered cases : {coronaData.latest.recovered}</h2>
        </div>
        <hr></hr>
        <div>
          <h2>Indian cases : {india.latest}</h2>
        </div>
      </div>
    );
  }
}

export default App;
