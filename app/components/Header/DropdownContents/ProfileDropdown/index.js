// @flow

import { Link, NavLink } from 'react-router-dom';
import Icon from 'app/components/Icon';
import styles from './ProfileDropdown.css';
import shared from 'app/components/Header/Header.css';

type Props = {
  username: string,
  logout: () => void,
};

const ProfileDropdown = ({ username, logout }: Props) => (
  <div className={styles.profileDropdownEl}>
    <div className={shared.dropdownSection} data-first-dropdown-section>
      <Link className={styles.username} to="/users/me">
        {username}
      </Link>
      <NavLink
        className={styles.dropdownLink}
        activeClassName={styles.activeDropdownLink}
        to="/users/me/settings/profile"
      >
        <Icon name="settings" prefix="ion-md-" size={20} />
        <span>Innstillinger</span>
      </NavLink>
      <NavLink
        className={styles.dropdownLink}
        activeClassName={styles.activeDropdownLink}
        to="/meetings"
      >
        <Icon name="calendar" size={20} />
        <span>Møteinnkallinger</span>
      </NavLink>
    </div>
    <div className={shared.dropdownSection}>
      <span className={shared.bottomLink} onClick={logout}>
        Logg ut
        <Icon name="log-out" size={24} />
      </span>
    </div>
  </div>
);

export default ProfileDropdown;
