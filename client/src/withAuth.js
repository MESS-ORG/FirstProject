import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isAuthenticated: localStorage.getItem('token') ? true : false
      }
    }

    render() {
      return this.state.isAuthenticated ? <WrappedComponent {...this.props} /> : <Navigate to="/login" />
    }
  }
}

export default withAuth;

