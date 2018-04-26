import React from "react"
import { Menu } from "semantic-ui-react"
import { NavLink } from "react-router-dom"

const NavBar = ({ users = [] }) => (
  <Menu pointing secondary inverted>
    <Menu.Item as={NavLink} to="/transactions" name="transactions" />
    {users.length > 0 && <Menu.Item as={NavLink} to="/users" name="users" />}
    <Menu.Menu position="right">
      <Menu.Item as={NavLink} to="/logout" name="logout" />
    </Menu.Menu>
  </Menu>
)

export default NavBar
