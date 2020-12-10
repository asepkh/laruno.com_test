import PropTypes from "prop-types";
import Link from "next/link";
import {
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const Item = ({ title, href, menu }) => {
  return !menu ? (
    <NavItem>
      {href ? (
        <Link href={href}>
          <NavLink href="">{title}</NavLink>
        </Link>
      ) : (
        title
      )}
    </NavItem>
  ) : (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        {title}
      </DropdownToggle>
      <DropdownMenu right>
        {menu.map((item, index) => (
          <>
            <DropdownItem>
              {item.href ? (
                <Link href={item.href}>{item.title}</Link>
              ) : (
                item.title
              )}
            </DropdownItem>
            {item.divider && <DropdownItem divider />}
          </>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

Item.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string,
  menu: PropTypes.object,
};

Item.defaultProps = {
  user: null,
};

export default Item;
