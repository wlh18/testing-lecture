import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHamburger } from '@fortawesome/free-solid-svg-icons'

export default class Header extends Component {
  constructor() {
    super()
    this.state = {
      showDropdown: false,
    }
  }

  flipDropdown = () => {
    this.setState({ showDropdown: !this.state.showDropdown })
  }

  render() {
    return (
      <div className="header">
        <FontAwesomeIcon
          icon={faHamburger}
          onClick={this.flipDropdown}
          data-testid="hamburger-button"
        />
        This is also some text content
        {this.state.showDropdown ? (
          <div className="dropdown" data-testid="dropdown">
            Dropdown menu also this is the text content
          </div>
        ) : null}
      </div>
    )
  }
}
