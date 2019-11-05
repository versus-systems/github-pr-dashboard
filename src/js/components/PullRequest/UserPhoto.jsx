import React from 'react';
import PropTypes from 'prop-types';

export default function UserPhoto(props) {
  const url = props.user.avatarUrl;
  const username = props.user.login;
  const size = props.size;
  const profileUrl = props.user.url;

  const linkStyle = { height: `${size}px` };

  return (
    <div className="user-photo">
      <a target="_blank" href={profileUrl} style={linkStyle}>
        <img width={size} height={size} src={url} alt={username} title={username} />
      </a>
    </div>
  );
}

UserPhoto.propTypes = {
  user: PropTypes.object,
  size: PropTypes.number
};

UserPhoto.defaultProps = {
  size: 40
};
