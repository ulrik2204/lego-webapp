// @flow

import { useState } from 'react';
import Select from 'react-select';
import Button from 'app/components/Button';
import Flex from 'app/components/Layout/Flex';
import { ConfirmModalWithParent } from 'app/components/Modal/ConfirmModal';
import type { PhotoConsent, PhotoConsentDomain } from 'app/models';
import moment from 'moment-timezone';
import cx from 'classnames';
import {
  PHOTO_CONSENT_DOMAINS,
  toReadableSemester,
} from 'app/routes/events/utils';
import styles from './PhotoConsents.css';

const ConsentManager = ({
  consent,
  updateConsent,
  isMe,
}: {
  consent: ?PhotoConsent,
  updateConsent: (consent: PhotoConsent) => Promise<*>,
  isMe: boolean,
}) => {
  if (!consent) {
    return null;
  }

  const getConsentStatus = () => {
    if (consent.isConsenting) {
      return (
        <>
          <b>Du ga samtykket den </b>
          <i>{moment(consent.updatedAt).format('DD. MMM YYYY')}.</i>
        </>
      );
    } else if (consent.isConsenting === false) {
      return (
        <>
          <b>Du trakk samtykket den </b>
          <i>{moment(consent.updatedAt).format('DD. MMM YYYY')}.</i>
        </>
      );
    }
    return <b>Du har ikke tatt stilling til samtykket.</b>;
  };

  const presentableDomain =
    consent.domain === PHOTO_CONSENT_DOMAINS.WEBSITE
      ? 'Abakus.no'
      : 'Sosiale medier';
  return (
    <>
      <h4 className={styles.categoryTitle}>{presentableDomain}</h4>
      <h5>
        Jeg godtar at Abakus kan legge ut bilder av meg på {presentableDomain} i
        perioden {toReadableSemester(consent)}:
      </h5>
      <div className={styles.statusContainer}>{getConsentStatus()}</div>
      <div>
        <ConfirmModalWithParent
          closeOnConfirm={true}
          title={`Trekke bildesamtykke på ${presentableDomain}`}
          message={`Er du sikker på at du vil trekke bildesamtykket ditt for ${toReadableSemester(
            consent
          )} på ${presentableDomain}? Dersom du ønsker å fjerne noen spesifikke bilder, kan du i stedet sende en mail til pr@abakus.no med informasjon om hvilke bilder du vil fjerne.`}
          onConfirm={() => updateConsent({ ...consent, isConsenting: false })}
        >
          <Button
            disabled={!isMe}
            className={
              consent.isConsenting === false
                ? cx(styles.notConsentBtn, styles.selectedConsentBtn)
                : styles.notConsentBtn
            }
          >
            Nei
          </Button>
        </ConfirmModalWithParent>
        <Button
          disabled={!isMe}
          onClick={() => updateConsent({ ...consent, isConsenting: true })}
          className={
            consent.isConsenting
              ? cx(styles.consentBtn, styles.selectedConsentBtn)
              : styles.consentBtn
          }
        >
          Ja
        </Button>
      </div>
    </>
  );
};

const PhotoConsents = ({
  photoConsents,
  username,
  updatePhotoConsent,
  userId,
  isMe,
}: {
  photoConsents: Array<PhotoConsent>,
  username: string,
  updatePhotoConsent: (
    PhotoConsent: PhotoConsent,
    username: string,
    userId: Number
  ) => Promise<*>,
  userId: Number,
  isMe: boolean,
}) => {
  const semesterLabels = [
    ...new Set(
      photoConsents
        .slice(0)
        .sort((a, b) => {
          if (a.year === b.year) {
            return a.semester === 'SPRING' ? 1 : -1;
          }

          return a.year > b.year ? -1 : 1;
        })
        .map((photoConsent) => toReadableSemester(photoConsent))
    ),
  ];

  const getConsentFromSemesterLabel = (
    domain: PhotoConsentDomain,
    semesterLabel: string
  ): ?PhotoConsent => {
    const match = /(?<semester>\S+) (?<year>\d+)/.exec(semesterLabel);
    const year = Number(match?.groups?.year);
    const semester = match?.groups?.semester === 'våren' ? 'SPRING' : 'AUTUMN';
    return photoConsents.find(
      (pc) =>
        pc.domain === domain && pc.year === year && pc.semester === semester
    );
  };

  const [selectedSemester, setSelectedSemester] = useState(semesterLabels[0]);

  const updateConsent = (consent: PhotoConsent) =>
    updatePhotoConsent(consent, username, userId);
  return (
    <Flex column={true}>
      <label htmlFor="select-semester">
        <h3>Semester</h3>
      </label>
      <Select
        name="select-semester"
        clearable={false}
        options={semesterLabels.map((semester) => ({
          value: semester,
          label: semester,
        }))}
        value={{
          value: selectedSemester,
          label: selectedSemester,
        }}
        onChange={({ value }) => setSelectedSemester(value)}
      />
      <ConsentManager
        consent={getConsentFromSemesterLabel(
          PHOTO_CONSENT_DOMAINS.SOCIAL_MEDIA,
          selectedSemester
        )}
        updateConsent={updateConsent}
        isMe={isMe}
      />
      <ConsentManager
        consent={getConsentFromSemesterLabel(
          PHOTO_CONSENT_DOMAINS.WEBSITE,
          selectedSemester
        )}
        updateConsent={updateConsent}
        isMe={isMe}
      />
    </Flex>
  );
};

export default PhotoConsents;
