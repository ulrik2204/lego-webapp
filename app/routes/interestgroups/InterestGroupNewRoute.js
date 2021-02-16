// @flow
import { compose } from 'redux';
import { connect } from 'react-redux';
import { LoginPage } from 'app/components/LoginForm';
import replaceUnlessLoggedIn from 'app/utils/replaceUnlessLoggedIn';
import InterestGroupNewApplication from './components/InterestGroupNewApplication';
import { requestNewInterestGroup } from 'app/actions/InterestGroupActions';

const mapDispatchToProps = {
  requestNewInterestGroup
};

const mapStateToProps = (state, props) => {
  
};

export default compose(
  replaceUnlessLoggedIn(LoginPage),
  connect(undefined, mapDispatchToProps)
)(InterestGroupNewApplication);