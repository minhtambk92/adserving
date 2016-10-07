import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import s from './Timeline.css';

const pageTitle = 'Timeline';
const pageSubTitle = 'example';

class Timeline extends Component {

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>
          {/* row */}
          <div className="row">
            <div className="col-md-12">
              {/* The time line */}
              <ul className="timeline">
                {/* timeline time label */}
                <li className="time-label">
                <span className="bg-red">
                  10 Feb. 2014
                </span>
                </li>
                {/* /.timeline-label */}
                {/* timeline item */}
                <li>
                  <i className="fa fa-envelope bg-blue"/>
                  <div className="timeline-item">
                  <span className="time">
                    <i className="fa fa-clock-o"/>
                    12:05
                  </span>
                    <h3 className="timeline-header">
                      <Link to="#">
                        Support Team
                      </Link>
                      sent you an email
                    </h3>
                    <div className="timeline-body">
                      Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles, weebly ning
                      heekya handango imeem plugg dopplr jibjab, movity jajah plickers sifteo edmodo
                      ifttt zimbra. Babblely odeo kaboodle quora plaxo ideeli hulu weebly balihoo...
                    </div>
                    <div className="timeline-footer">
                      <Link to="#" className="btn btn-primary btn-xs">
                        Read more
                      </Link>
                      <Link to="#" className="btn btn-danger btn-xs">Delete</Link>
                    </div>
                  </div>
                </li>
                {/* END timeline item */}
                {/* timeline item */}
                <li>
                  <i className="fa fa-user bg-aqua"/>
                  <div className="timeline-item">
                  <span className="time">
                    <i className="fa fa-clock-o"/>
                    5 mins ago
                  </span>
                    <h3 className="timeline-header no-border">
                      <Link to="#">
                        Sarah Young
                      </Link>
                      accepted your friend request
                    </h3>
                  </div>
                </li>
                {/* END timeline item */}
                {/* timeline item */}
                <li>
                  <i className="fa fa-comments bg-yellow"/>
                  <div className="timeline-item">
                  <span className="time">
                    <i className="fa fa-clock-o"/>
                    27 mins ago
                  </span>
                    <h3 className="timeline-header">
                      <Link to="#">
                        Jay White
                      </Link>
                      commented on your post
                    </h3>
                    <div className="timeline-body">
                      Take me to your leader! Switzerland is small and neutral! We are more like
                      Germany, ambitious and misunderstood!
                    </div>
                    <div className="timeline-footer">
                      <Link to="#" className="btn btn-warning btn-flat btn-xs">
                        View comment
                      </Link>
                    </div>
                  </div>
                </li>
                {/* END timeline item */}
                {/* timeline time label */}
                <li className="time-label">
                <span className="bg-green">
                  3 Jan. 2014
                </span>
                </li>
                {/* /.timeline-label */}
                {/* timeline item */}
                <li>
                  <i className="fa fa-camera bg-purple"/>
                  <div className="timeline-item">
                  <span className="time">
                    <i className="fa fa-clock-o"/>
                    2 days ago
                  </span>
                    <h3 className="timeline-header">
                      <Link to="#">
                        Mina Lee
                      </Link>
                      uploaded new photos
                    </h3>
                    <div className="timeline-body">
                      <img src="http://placehold.it/150x100" alt="..." className="margin"/>
                      <img src="http://placehold.it/150x100" alt="..." className="margin"/>
                      <img src="http://placehold.it/150x100" alt="..." className="margin"/>
                      <img src="http://placehold.it/150x100" alt="..." className="margin"/>
                    </div>
                  </div>
                </li>
                {/* END timeline item */}
                {/* timeline item */}
                <li>
                  <i className="fa fa-video-camera bg-maroon"/>
                  <div className="timeline-item">
                  <span className="time">
                    <i className="fa fa-clock-o"/>
                    5 days ago
                  </span>
                    <h3 className="timeline-header">
                      <Link to="#">
                        Mr. Doe
                      </Link>
                      shared a video
                    </h3>
                    <div className="timeline-body">
                      <div className="embed-responsive embed-responsive-16by9">
                        <iframe className="embed-responsive-item"
                                src="https://www.youtube.com/embed/tMWkeBIohBs" frameBorder={0}
                                allowFullScreen/>
                      </div>
                    </div>
                    <div className="timeline-footer">
                      <Link to="#" className="btn btn-xs bg-maroon">
                        See comments
                      </Link>
                    </div>
                  </div>
                </li>
                {/* END timeline item */}
                <li>
                  <i className="fa fa-clock-o bg-gray"/>
                </li>
              </ul>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
          <div className="row" style={{ marginTop: 10 }}>
            <div className="col-md-12">
              <div className="box box-primary">
                <div className="box-header">
                  <h3 className="box-title">
                    <i className="fa fa-code"/>
                    Timeline Markup
                  </h3>
                </div>
                <div className="box-body">
                <pre style={{ fontWeight: 600 }}>
                  &lt;ul class="timeline">
                  &lt;!-- timeline time label -->
                  &lt;li class="time-label">
                  &lt;span class="bg-red">
                            10 Feb. 2014
                  &lt;/span>
                  &lt;/li>
                  &lt;!-- /.timeline-label -->

                  &lt;!-- timeline item -->
                  &lt;li>
                  &lt;!-- timeline icon -->
                  &lt;i class="fa fa-envelope bg-blue">&lt;/i>
                  &lt;div class="timeline-item">
                  &lt;span class="time">&lt;i class="fa fa-clock-o">&lt;/i> 12:05&lt;/span>

                  &lt;h3 class="timeline-header">&lt;a to="#">Support Team&lt;/a> ...&lt;/h3>

                  &lt;div class="timeline-body">
                                ...
                                Content goes here
                  &lt;/div>

                  &lt;div class="timeline-footer">
                  &lt;a class="btn btn-primary btn-xs">...&lt;/a>
                  &lt;/div>
                  &lt;/div>
                  &lt;/li>
                  &lt;!-- END timeline item -->
                    ...
                  &lt;/ul>
                </pre>
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
            </div>
            { /* /.col */ }
          </div>
          { /* /.row */ }
        </div>
      </Layout>
    );
  }

}

export default withStyles(s)(Timeline);
