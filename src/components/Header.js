import React from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Step 1 - Fetch Metadata for Auth & Token URL's</Link></li>
        <li><Link to='/authorization'>Step 2 - Authorization for CODE</Link></li>
      </ul>
    </nav>
  </header>
)

export default Header