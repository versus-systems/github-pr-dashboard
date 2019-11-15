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
      <div className="container">
        <div className="container-header">
          <h1>{this.props.title}</h1>
          <input
            value={this.state.password}
            onChange={this.setPassword}
          />
          <button onClick={this.login}>LOGIN</button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  title: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ login }, dispatch),
});

export default connect(state => state, mapDispatchToProps)(Login);
