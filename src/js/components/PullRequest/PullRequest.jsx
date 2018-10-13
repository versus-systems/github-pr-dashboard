import React from 'react';
import moment from 'moment';
import UserPhoto from './UserPhoto';
import { Status } from './Status';

import '../../../images/repo.svg';
import '../../../images/git-pull-request.svg';

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
    let acceptStatus;
    let stalenessClassName;
    const daysPast = this.daysPast(pr.createdAt);

    if (pr.wip) {
      acceptStatus = <i className="fa fa-exclamation-triangle"></i>;
    } else if (pr.approvals >= 2) {
      acceptStatus = <i className="fa fa-check"></i>;
    } else {
      acceptStatus = pr.approvals;
    }

    if (daysPast > 6) {
      stalenessClassName = 'pull-request--stale';
    } else if (daysPast > 1) {
      stalenessClassName = 'pull-request--older';
    } else if (daysPast === 1) {
      stalenessClassName = 'pull-request--old';
    }

    let shadowStyle = {};
    if (daysPast > 0) {
      shadowStyle = { boxShadow: `0px 0px 32px ${2 * daysPast}px #d0021b inset` };
    }

    return (
      <div className="pull-request-wrapper">
        <div className={`pull-request ${stalenessClassName}`} style={shadowStyle}>
          <div className="accept-count">
            {acceptStatus}
          </div>
          <Status status={pr.status} />
          <UserPhoto size={50} user={pr.author} />
          <div className="pull-request-info">
            <div className="pull-request-title">
              <img src="images/git-pull-request.svg" alt="Pull request" />
              &nbsp;
              <a target="_blank" href={pr.url}>{pr.title}</a>
            </div>
            <div>
              <a target="_blank" href={pr.repository.url}>
                <img src="images/repo.svg" alt="Repository" /> {pr.repository.nameWithOwner}
              </a>
            </div>
          </div>
          <div
            className="pull-request-last-updated"
            title={this.formatTime('Last updated', pr.createdAt)}
          >
            {this.formatRelativeTime(pr.createdAt)}
          </div>
        </div>
      </div>
    );
  }
}

PullRequest.propTypes = {
  pullRequest: React.PropTypes.object.isRequired
};
