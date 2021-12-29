// @flow

import Icon from 'app/components/Icon';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './InfoDropdown.css';
import shared from 'app/components/Header/Header.css';

type LinkOptionProps = {
  to: string,
  title: string,
  text: string,
}

const LinkOption = ({ to, title, text }: LinkOptionProps) => (
  <Link to={to}>
    <div>
      <span>{title}</span>
      <Icon name="arrow-forward" size={20} />
    </div>
    <p>{text}</p>
  </Link>
);

const InfoDropdown = () => (
  <div className={styles.infoDropdownEl}>
    <div
      className={cx(shared.dropdownSection, styles.gridSection)}
      data-first-dropdown-section
    >
      <LinkOption
        to="/pages/info-om-abakus"
        title="Generelt"
        text="Litt av hvert om Abakus"
      />
      <LinkOption
        to="/pages/bedrifter/for-bedrifter"
        title="For bedrifter"
        text="Les om hva vi kan tilby din bedrift"
      />
      <LinkOption
        to="/pages/grupper/39-praktisk-informasjon"
        title="Interessegrupper"
        text="På utgikk etter nye venner eller interesser?"
      />
      <LinkOption
        to="/pages/grupper/31-undergrupper"
        title="Undergrupper"
        text="Glad i å spille fotball eller game hele natten lang?"
      />
      <LinkOption
        to="/pages/generelt/104-revyen"
        title="Abakusrevyen"
        text="Visste du at Abakus har sin helt egen revy?"
      />
      <LinkOption
        to="/pages/komiteer"
        title="Komiteer"
        text="Lorem ipsum dipsum kipsum"
      />
    </div>
    <div className={shared.dropdownSection}>
      <Link className={shared.bottomLink} to="/contact">
        Kontakt oss
      </Link>
    </div>
  </div>
);

export default InfoDropdown;
