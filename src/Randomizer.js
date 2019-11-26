import React, { Component } from 'react'

import { withRouter } from "react-router-dom"


function getSearchParameters() {
    var prmstr = window.location.search.substr(1);
    return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
  var params = {};
  var prmarr = prmstr.split("&");
  for ( var i = 0; i < prmarr.length; i++) {
      var tmparr = prmarr[i].split("=");
      params[tmparr[0]] = tmparr[1];
  }
  return params;
}

const dividable = (number, testedNumber) => {
  let test = number / testedNumber
    
  if (test - Math.floor(test) < 0.00001)
    return true
  return false
}

const generateSimpleNumbers = number => {
  let simpleNumbers = []

  for(var testedNumber = 1; testedNumber < number; testedNumber++) {
    if (!dividable(number, testedNumber)) {
      let flag = true
      for (var i = 2; i < testedNumber; i++) {
        if (dividable(testedNumber, i))
          flag = false
      }
      if (flag)
        simpleNumbers.push(testedNumber)
    }
  }

  return simpleNumbers
}


class Randomizer extends Component {
  constructor(props) {
    super(props)
    const number = parseInt(getSearchParameters(props.location.search).number || 50)
    const current = parseInt(getSearchParameters(props.location.search).current || 1)

    this.state = {
      number: number,
      current: Math.max(current, 1) - 1,
      pairs: this.generatePairs(number)
    }     
  }

  generatePairs(number) {
    const max = 250
    let pairs = []
    const simpleNumbers = generateSimpleNumbers(number)
    // const offset = simpleNumbers[simpleNumbers.length - 1]

    for (var index = 0; index < max; index++) {
      const clippedIndex = index % Math.floor(number / 2)
      const iteration = Math.floor(index / Math.floor(number / 2))
      const offset1 = simpleNumbers[simpleNumbers.length - iteration - 1]
      const offset2 = simpleNumbers[simpleNumbers.length - iteration - 2]
  
      pairs.push([
        (offset1 * (clippedIndex * 2)) % number + 1,
        (number * 100 - offset2 * (clippedIndex * 2 + 1)) % number + 1
        // (number * 100 - (offset2 * (index + 1))) % number + 1
      ])
    }
    console.log(pairs)
    return pairs
  }

  next() {
    const { current } = this.state
    this.setState({current: current + 1})
    this.props.history.push(`?number=50&current=${current + 1}`)
  }

  render() {
    const { pairs, current } = this.state
    const pair = pairs[current]
    
    return (
      <div className="">
        <h1 className="h1">{pair[0]} {pair[1]}</h1>
        <button
          className="button"
          onClick={() => this.next()}
        >
          Следующая пара
        </button>
        {current > 0 && (
          <div className="">
            уже были<br />
            <small>
              {pairs.slice(0, current)
              .map(pair => `[${pair[0]}, ${pair[1]}], `)}
            </small>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Randomizer)