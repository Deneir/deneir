/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Tabs from './Tab/Tabs';
import Collapsible from './Collapsible';
import styles from './index.module.scss';

function setDate(date) {
  return moment(date).format('YYYY-MM-DD');
}

export default function ListContent(props) {
  const { payload } = props;

  return (
    <ul className={styles.listContent}>
      {payload.map((p) => (
        <li key={p.id} className={styles.details}>
          <Collapsible title={p.build.host}>
            <Tabs className={styles.tabContent}>
              <div label="Build">
                <b>build: </b>
                <div className={styles.innerContent}>
                  <p>
                    <b>commit: </b>
                    {p.build.build.commit}
                  </p>
                  <p>
                    <b>date: </b>
                    {setDate(p.build.build.date)}
                  </p>
                  <p>
                    <b>directory: </b>
                    <a
                      href={`http://${p.build.build.directory}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {p.build.build.directory}
                    </a>
                  </p>
                  <p>
                    <b>host: </b>
                    <a
                      href={`http://${p.build.build.host}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {p.build.build.host}
                    </a>
                  </p>
                  <p>
                    <b>user: </b>
                    {p.build.build.user}
                  </p>
                </div>
                <b>uptime: </b>
                <div className={styles.innerContent}>
                  <p>
                    <b>elapsed seconds: </b>
                    {p.build.uptime.elapsed_seconds}
                  </p>
                  <p>
                    <b>start time: </b>
                    {setDate(p.build.uptime.start_time)}
                  </p>
                </div>
                <p>
                  <b>pid: </b>
                  {p.build.pid}
                </p>
                <p>
                  <b>version: </b>
                  {p.build.version}
                </p>
              </div>
              <div label="Dependencies">
                {p.dependencies && p.dependencies.map((d) => (
                  <div key={d.key} className={styles.mapList}>
                    <p>
                      <b>key: </b>
                      {d.key}
                    </p>
                    <p>
                      <b>URL: </b>
                      {d.metadata && d.metadata.URL
                        ? (
                          <a
                            href={`http://${d.metadata.URL}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {d.metadata.URL}
                          </a>
                        ) : '-'}
                    </p>
                    <p>
                      <b>label: </b>
                      {(d.metadata && d.metadata.label) || '-'}
                    </p>
                    <p>
                      <b>status: </b>
                      {d.status.code}
                    </p>
                    <p>
                      <b>checked at: </b>
                      {setDate(d.status.checked_at)}
                    </p>
                    <p>
                      <b>type: </b>
                      {d.type}
                    </p>
                    <p>
                      <b>read: </b>
                      {d.read ? 'yes' : 'false'}
                    </p>
                    <p>
                      <b>write: </b>
                      {d.write ? 'yes' : 'false'}
                    </p>
                  </div>
                ))}
              </div>
              <div label="Configuration">
                {p.configuration && p.configuration.map((c) => (
                  <div key={c.key} className={styles.mapList}>
                    <p>
                      <b>key: </b>
                      {c.key}
                    </p>
                    <p>
                      <b>provider: </b>
                      {c.provider}
                    </p>
                  </div>
                ))}
              </div>
              <div label="Changelog">
                <div dangerouslySetInnerHTML={{ __html: p.changelog }} />
              </div>
              <div label="Readme">
                <div dangerouslySetInnerHTML={{ __html: p.readme }} />
              </div>
            </Tabs>
          </Collapsible>
        </li>
      ))}
    </ul>
  );
}

ListContent.propTypes = {
  payload: PropTypes.instanceOf(Array).isRequired,
};
