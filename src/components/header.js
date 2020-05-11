import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle }) => (
  <div
    className="columns is-centered"
    style={{
      marginBottom: '0rem',
    }}
  >
    <div
      className="column has-text-centered"
      style={{
        padding: '1.5rem',
        margin: 'auto'
      }}
    >
      <Link to={'/'}><button className="button is-light" style={{marginRight: '0.5rem'}}>Home</button></Link>
      <Link to={'/about'}><button className="button is-light">About</button></Link>
    </div>
    <hr style={{marginTop: 0}}/>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
