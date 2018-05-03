import React from "react"
import { Menu } from "semantic-ui-react"
import { NavLink } from "react-router-dom"

const NavBar = ({ admin }) => (
  <Menu pointing secondary inverted>
    <Menu.Item as={NavLink} to="/transactions" name="transactions" />
    {admin && <Menu.Item as={NavLink} to="/users" name="users" />}
    {admin && <Menu.Item as={NavLink} to="/offices" name="offices" />}
    <Menu.Menu position="right">
      <Menu.Item as={NavLink} to="/logout" name="logout" />
    </Menu.Menu>
  </Menu>
)

export default NavBar
