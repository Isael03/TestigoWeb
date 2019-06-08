import React, { Component } from 'react'
import AppContext from './AppContext'

export default class AppProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            institution:null
        }
        this.changeInstitution = this.changeInstitution.bind(this)
    }

    changeInstitution(nameService) {
          this.setState({
            institution: nameService
          });  
        
    }
  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        changeInstitution: this.changeInstitution,
        destroySession: () => this.setState({
            institution: null})
      }}>
          {this.props.children}
      </AppContext.Provider>
    )
  }
}
