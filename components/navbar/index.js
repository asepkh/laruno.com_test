import { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
} from "reactstrap";
import NavItem from "./NavItem";

const Header = ({ title, items, activeItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="primary" dark expand="sm">
      <Container>
        <Link href="/">
          <NavbarBrand href="">{title}</NavbarBrand>
        </Link>
        {items.length > 0 && (
          <>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto justify-content-end" navbar>
                {items.map((item, index) => (
                  <NavItem {...item} />
                ))}
              </Nav>
            </Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array,
};

Header.defaultProps = {
  title: "My Resume",
  items: [
    {
      title: "RajaOngkir Consume API",
      href: "/form",
    },
  ],
};

export default Header;
