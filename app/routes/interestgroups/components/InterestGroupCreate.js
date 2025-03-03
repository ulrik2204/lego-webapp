// @flow
import { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import GroupForm from 'app/components/GroupForm';
import { Flex } from 'app/components/Layout';
import { Content } from 'app/components/Content';
import { Link } from 'react-router-dom';

export default class InterestGroupEdit extends Component<{
  initialValues: Object,
  removeGroup: (number) => Promise<*>,
  uploadFile: (string) => Promise<*>,
  handleSubmitCallback: (Object) => Promise<*>,
}> {
  render() {
    const { initialValues, uploadFile, handleSubmitCallback } = this.props;

    return (
      <Content>
        <Helmet title="Opprett gruppe" />
        <h2>
          <Link to="/interestGroups/">
            <i className="fa fa-angle-left" />
            Tilbake
          </Link>
        </h2>
        <Flex justifyContent="space-between" alignItems="baseline">
          <div>
            <h1>Opprett gruppe</h1>
          </div>
        </Flex>
        <GroupForm
          handleSubmitCallback={handleSubmitCallback}
          uploadFile={uploadFile}
          initialValues={initialValues}
        />
      </Content>
    );
  }
}
