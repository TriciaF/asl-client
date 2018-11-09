import React from 'react';
import {Redirect} from 'react-router-dom';


export default class HeaderBar extends React.Component {

  componentDidMount() {
    return <Redirect to="/dashboard" />;
  }

}