import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../actions';

class Login extends React.Component {
  state = {
    password: '',
  }

  setPassword = (e) => {
    this.setState({ password: e.target.value });
  }

  login = () => {
    this.props.actions.login(this.state.password);
  }

  render() {
    return (
      <div>
        <h1>VS Engineering Dashboard</h1>
        <input
          value={this.state.password}
          onChange={this.setPassword}
        />
        <button onClick={this.login}>LOGIN</button>
      </div>
    );
  }
}

Login.propTypes = {
  actions: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ login }, dispatch),
});

export default connect(state => state, mapDispatchToProps)(Login);
