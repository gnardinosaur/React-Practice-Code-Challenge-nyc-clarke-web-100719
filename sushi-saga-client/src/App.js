import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state = {
    sushi: [],
    sushiBegin: 0,
    sushiEnd: 4,
    eaten: [],
    moneyLeft: 109
  }

  moreSushi = () => {
    this.setState({
      sushiBegin: this.state.sushiBegin + 4,
      sushiEnd: this.state.sushiEnd + 4
    })
  }

  componentDidMount() {
    fetch(API)
    .then(resp => resp.json())
    .then(sushi => this.setState({ sushi }))
  }

  eatSushi = (sushiObj) => {
    sushiObj = {
      ...sushiObj,
      eaten: true,
    }

    let eatenSushi = this.state.sushi[sushiObj.id - 1] = sushiObj

    if (this.state.moneyLeft > sushiObj.price ) {  
      this.setState({
        sushi: [...this.state.sushi, eatenSushi],
        eaten: [...this.state.eaten, eatenSushi],
        moneyLeft: this.state.moneyLeft - sushiObj.price
      })
    }
    
  }

  render() {
    return (
      <div className="app">
        <SushiContainer sushi={this.state.sushi.slice(this.state.sushiBegin, this.state.sushiEnd)} moreSushi={this.moreSushi} eatSushi={this.eatSushi}/>
        <Table eatenSushi={this.state.eaten} moneyLeft={this.state.moneyLeft} />
      </div>
    );
  }
}

export default App;