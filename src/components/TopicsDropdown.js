import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import {getData} from '../api/getData';

import './topicsDropdown.scss';



class TopicsDropdown extends Component {

  constructor(props) {
    super(props);

    this.state = {
      conflictsList: [],
      chosenTopic: null
    }
  }

  componentDidMount() {
    getData('topics').then(data => {
      this.setState({
        conflictsList: data.viz_blocks[0].rows
      })

    })
  }

  handleSubmit() {
    if (this.state.chosenTopic) {
      window.location.href = `/map/?topic=${this.state.chosenTopic}`;
    }
  }

  handleInputChange(e) {
    this.setState({chosenTopic: e.currentTarget.value});
  }

  render() {
    const { conflictsList } = this.state;

    const renderList = () => {
     return conflictsList.map(conf => (
          <option value={conf.label} key={conf.id}/>
        )
      )
    }

    return (
      <div className="dropdownWrapper">
      <form onSubmit={() => this.handleSubmit()}>
        <input list="topics" name="topic" onChange={(e) => this.handleInputChange(e)}/>
        <datalist id="topics">
          {renderList()}
        </datalist>
        {this.state.chosenTopic && (
          <NavLink to={`/map?topic=${this.state.chosenTopic}`}> Pre-defined Map </NavLink>) }
      </form>

    </div>
    )
  }
}


export default TopicsDropdown;