// @flow

import Icon from 'app/components/Icon';
import { Link } from 'react-router-dom';
import styles from './EventsDropdown.css';
import shared from 'app/components/Header/Header.css';

const EventsDropdown = () => (
  <div className={styles.eventsDropdownEl}>
    <div className={shared.dropdownSection} data-first-dropdown-section>
      <Link className={styles.dropdownLink} to="/events">
        <Icon className={styles.icon} name="list" prefix="ion-md-" size={25} />
        <span>Liste</span>
      </Link>
      <Link className={styles.dropdownLink} to="/events/calendar">
        <Icon
          className={styles.icon}
          name="calendar"
          prefix="ion-md-"
          size={25}
        />
        <span>Kalender</span>
      </Link>
    </div>
    <div className={shared.dropdownSection}>
      <Link className={shared.bottomLink} to="/users/me">
        Dine arrangementer
      </Link>
    </div>
  </div>
);

export default EventsDropdown;
