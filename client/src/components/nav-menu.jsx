import { useState, useEffect } from 'react'
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  List,
  ListItem,
} from '@material-tailwind/react'
import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons'

function NavList() {
  return (
    <List className="mb-6 mt-4 min-w-0 p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href="/login"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          로그인
        </ListItem>
      </Typography>
      <Typography
        as="a"
        href="/register"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          회원가입
        </ListItem>
      </Typography>
    </List>
  )
}

function NavMenu() {
  const [openNav, setOpenNav] = useState(false)

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false),
    )
  }, [])

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
        >
          Material Tailwind
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <Cross1Icon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <HamburgerMenuIcon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  )
}

export default NavMenu
