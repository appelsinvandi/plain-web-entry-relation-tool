import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Model from '../../components/model'

import './style.css'

export class App extends Component {
  render() {
    return (
      <div className="app">
        <Model
          name="user"
          properties={[
            {
              name: "name"
            },
            {
              name: "address"
            },
            {
              name: "birthday"
            },
            {
              name: "absurd_mc_stupid"
            }
          ]}
        />
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
