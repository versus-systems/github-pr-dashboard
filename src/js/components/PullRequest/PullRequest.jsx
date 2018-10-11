import React from 'react';
import moment from 'moment';

import '../../../images/repo.svg';
import '../../../images/git-pull-request.svg';

import UserPhoto from './UserPhoto';
import { Status } from './Status';

const CLASS_BASE = 'pull-request';
const CLASS_UNMERGEABLE = `${CLASS_BASE} ${CLASS_BASE}--unmergeable`;
const CLASS_MERGEABLE = `${CLASS_BASE} ${CLASS_BASE}--mergeable`;

function getPrClassName(pr) {
  if (pr.unmergeable) {
    return CLASS_UNMERGEABLE;
  } else if (pr.mergeable) {
    return CLASS_MERGEABLE;
  }

  return CLASS_BASE;
}

export default class PullRequest extends React.Component {
  formatRelativeTime(date) {
    return moment(date).fromNow();
  }

  formatTime(header, date) {
    return `${header} ${moment(date).format('MMMM Do YYYY, h:mm:ss a')}`;
  }

  daysPast(date) {
    return moment().diff(date, 'days');
  }

  render() {
    const pr = this.props.pullRequest;
    const className = getPrClassName(pr);
    let acceptStatus;
    let stalenessClassName;
    const daysPast = this.daysPast(pr.created);

    if (pr.unmergeable) {
      acceptStatus = <i className="fa fa-exclamation-triangle"></i>;
    } else if (pr.mergeable) {
      acceptStatus = <i className="fa fa-check"></i>;
    } else {
      acceptStatus = pr.positiveComments;
    }

    if (daysPast > 6) {
      stalenessClassName = `${CLASS_BASE}--stale`;
    } else if (daysPast > 1) {
      stalenessClassName = `${CLASS_BASE}--older`;
    } else if (daysPast === 1) {
      stalenessClassName = `${CLASS_BASE}--old`;
    }

    let shadowStyle = {};
    if (daysPast > 0) {
      shadowStyle = { boxShadow: `0px 0px 32px ${2 * daysPast}px #d0021b inset` };
    }

    return (
      <div className={`${className} ${stalenessClassName}`} style={shadowStyle} data-thing={1}>
        <div className="accept-count">
          {acceptStatus}
        </div>
        <Status status={pr.status} />
        <UserPhoto size={50} user={pr.user} />
        <div className="pull-request-info">
          <div className="pull-request-title">
            <img src="images/git-pull-request.svg" alt="Pull request" />
            &nbsp;
            <a target="_blank" href={pr.url}>{pr.title}</a>
          </div>
          <div>
            <a target="_blank" href={pr.repoUrl}>
              <img src="images/repo.svg" alt="Repository" /> {pr.repo}
            </a>
          </div>
        </div>
        <div
          className="pull-request-last-updated"
          title={this.formatTime('Last updated', pr.created)}
        >
          {this.formatRelativeTime(pr.created)}
        </div>
      </div>
    );
  }
}

PullRequest.propTypes = {
  pullRequest: React.PropTypes.object.isRequired
};
