import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.setPassword = this.setPassword.bind(this);

    this.state = {
      password: '',
    };
  }

  setPassword(e) {
    this.setState({ password: e.target.value });
  }

  login() {
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
  loading: React.PropTypes.bool.isRequired,
  pullRequests: React.PropTypes.array.isRequired,
  repos: React.PropTypes.array.isRequired,
  title: React.PropTypes.string.isRequired,
  failedRepos: React.PropTypes.array.isRequired,
  error: React.PropTypes.string.isRequired,
  actions: React.PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ login }, dispatch),
});

export default connect(state => state, mapDispatchToProps)(Login);
