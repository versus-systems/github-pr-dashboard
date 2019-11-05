import React from 'react';
import PropTypes from 'prop-types';

const ICONS = {
  success: 'check',
  pending: 'question',
  failure: 'times',
  error: 'times'
};

export function Status(props) {
  const status = props.status || {};

  const { state, description } = status;

  return (
    <div className="status" title={description}>
      <i className={`fa fa-${ICONS[state]} ${state}`}></i>
    </div>
  );
}

Status.propTypes = {
  status: PropTypes.object,
};
