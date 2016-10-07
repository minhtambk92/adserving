import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import s from './Profile.css';

const pageTitle = 'User Profile';
const pageSubTitle = '#007612';

class Profile extends Component {

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>
          <div className="row">
            <div className="col-md-3">
              {/* Profile Image */}
              <div className="box box-primary">
                <div className="box-body box-profile">
                  <img className="profile-user-img img-responsive img-circle"
                       src="/AdminLTE/dist/img/user4-128x128.jpg" alt="User profile"/>
                  <h3 className="profile-username text-center">Nina Mcintire</h3>
                  <p className="text-muted text-center">Software Engineer</p>
                  <ul className="list-group list-group-unbordered">
                    <li className="list-group-item">
                      <b>Followers</b> <Link to="#" className="pull-right">1,322</Link>
                    </li>
                    <li className="list-group-item">
                      <b>Following</b> <Link to="#" className="pull-right">543</Link>
                    </li>
                    <li className="list-group-item">
                      <b>Friends</b> <Link to="#" className="pull-right">13,287</Link>
                    </li>
                  </ul>
                  <Link to="#" className="btn btn-primary btn-block"><b>Follow</b></Link>
                </div>
                {/* /.box-body */}
              </div>
              {/* /.box */}
              {/* About Me Box */}
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">About Me</h3>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <strong><i className="fa fa-book margin-r-5"/> Education</strong>
                  <p className="text-muted">
                    B.S. in Computer Science from the University of Tennessee at Knoxville
                  </p>
                  <hr />
                  <strong><i className="fa fa-map-marker margin-r-5"/> Location</strong>
                  <p className="text-muted">Malibu, California</p>
                  <hr />
                  <strong><i className="fa fa-pencil margin-r-5"/> Skills</strong>
                  <p>
                    <span className="label label-danger">UI Design</span>
                    <span className="label label-success">Coding</span>
                    <span className="label label-info">Javascript</span>
                    <span className="label label-warning">PHP</span>
                    <span className="label label-primary">Node.js</span>
                  </p>
                  <hr />
                  <strong><i className="fa fa-file-text-o margin-r-5"/> Notes</strong>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum enim
                    neque.</p>
                </div>
                {/* /.box-body */}
              </div>
              {/* /.box */}
            </div>
            {/* /.col */}
            <div className="col-md-9">
              <div className="nav-tabs-custom">
                <ul className="nav nav-tabs">
                  <li className="active"><Link to="#activity" data-toggle="tab">Activity</Link></li>
                  <li><Link to="#timeline" data-toggle="tab">Timeline</Link></li>
                  <li><Link to="#settings" data-toggle="tab">Settings</Link></li>
                </ul>
                <div className="tab-content">
                  <div className="active tab-pane" id="activity">
                    {/* Post */}
                    <div className="post">
                      <div className="user-block">
                        <img className="img-circle img-bordered-sm"
                             src="/AdminLTE/dist/img/user1-128x128.jpg" alt="user image"/>
                        <span className="username">
                        <Link to="#">Jonathan Burke Jr.</Link>
                        <Link to="#" className="pull-right btn-box-tool"><i
                          className="fa fa-times"/></Link>
                      </span>
                        <span className="description">Shared publicly - 7:30 PM today</span>
                      </div>
                      {/* /.user-block */}
                      <p>
                        Lorem ipsum represents a long-held tradition for designers,
                        typographers and the like. Some people hate it and argue for
                        its demise, but others ignore the hate as they create awesome
                        tools to help create filler text for everyone from bacon lovers
                        to Charlie Sheen fans.
                      </p>
                      <ul className="list-inline">
                        <li><Link to="#" className="link-black text-sm"><i
                          className="fa fa-share margin-r-5"/> Share</Link></li>
                        <li><Link to="#" className="link-black text-sm"><i
                          className="fa fa-thumbs-o-up margin-r-5"/> Like</Link>
                        </li>
                        <li className="pull-right">
                          <Link to="#" className="link-black text-sm"><i
                            className="fa fa-comments-o margin-r-5"/> Comments
                            (5)</Link></li>
                      </ul>
                      <input className="form-control input-sm" type="text"
                             placeholder="Type a comment"/>
                    </div>
                    {/* /.post */}
                    {/* Post */}
                    <div className="post clearfix">
                      <div className="user-block">
                        <img className="img-circle img-bordered-sm"
                             src="/AdminLTE/dist/img/user7-128x128.jpg" alt="User Image"/>
                        <span className="username">
                        <Link to="#">Sarah Ross</Link>
                        <Link to="#" className="pull-right btn-box-tool"><i
                          className="fa fa-times"/></Link>
                      </span>
                        <span className="description">Sent you a message - 3 days ago</span>
                      </div>
                      {/* /.user-block */}
                      <p>
                        Lorem ipsum represents a long-held tradition for designers,
                        typographers and the like. Some people hate it and argue for
                        its demise, but others ignore the hate as they create awesome
                        tools to help create filler text for everyone from bacon lovers
                        to Charlie Sheen fans.
                      </p>
                      <form className="form-horizontal">
                        <div className="form-group margin-bottom-none">
                          <div className="col-sm-9">
                            <input className="form-control input-sm" placeholder="Response"/>
                          </div>
                          <div className="col-sm-3">
                            <button type="submit"
                                    className="btn btn-danger pull-right btn-block btn-sm">Send
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* /.post */}
                    {/* Post */}
                    <div className="post">
                      <div className="user-block">
                        <img className="img-circle img-bordered-sm"
                             src="/AdminLTE/dist/img/user6-128x128.jpg" alt="User Image"/>
                        <span className="username">
                        <Link to="#">Adam Jones</Link>
                        <Link to="#" className="pull-right btn-box-tool"><i
                          className="fa fa-times"/></Link>
                      </span>
                        <span className="description">Posted 5 photos - 5 days ago</span>
                      </div>
                      {/* /.user-block */}
                      <div className="row margin-bottom">
                        <div className="col-sm-6">
                          <img className="img-responsive" src="/AdminLTE/dist/img/photo1.png"
                               alt="Photo"/>
                        </div>
                        {/* /.col */}
                        <div className="col-sm-6">
                          <div className="row">
                            <div className="col-sm-6">
                              <img className="img-responsive" src="/AdminLTE/dist/img/photo2.png"
                                   alt="Photo"/>
                              <br />
                              <img className="img-responsive" src="/AdminLTE/dist/img/photo3.jpg"
                                   alt="Photo"/>
                            </div>
                            {/* /.col */}
                            <div className="col-sm-6">
                              <img className="img-responsive" src="/AdminLTE/dist/img/photo4.jpg"
                                   alt="Photo"/>
                              <br />
                              <img className="img-responsive" src="/AdminLTE/dist/img/photo1.png"
                                   alt="Photo"/>
                            </div>
                            {/* /.col */}
                          </div>
                          {/* /.row */}
                        </div>
                        {/* /.col */}
                      </div>
                      {/* /.row */}
                      <ul className="list-inline">
                        <li><Link to="#" className="link-black text-sm"><i
                          className="fa fa-share margin-r-5"/> Share</Link></li>
                        <li><Link to="#" className="link-black text-sm"><i
                          className="fa fa-thumbs-o-up margin-r-5"/> Like</Link>
                        </li>
                        <li className="pull-right">
                          <Link to="#" className="link-black text-sm"><i
                            className="fa fa-comments-o margin-r-5"/> Comments
                            (5)</Link></li>
                      </ul>
                      <input className="form-control input-sm" type="text"
                             placeholder="Type a comment"/>
                    </div>
                    {/* /.post */}
                  </div>
                  {/* /.tab-pane */}
                  <div className="tab-pane" id="timeline">
                    {/* The timeline */}
                    <ul className="timeline timeline-inverse">
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
                          <span className="time"><i className="fa fa-clock-o"/> 12:05</span>
                          <h3 className="timeline-header"><Link to="#">Support Team</Link> sent you
                            an email</h3>
                          <div className="timeline-body">
                            Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles,
                            weebly ning heekya handango imeem plugg dopplr jibjab, movity
                            jajah plickers sifteo edmodo ifttt zimbra. Babblely odeo kaboodle
                            quora plaxo ideeli hulu weebly balihoo...
                          </div>
                          <div className="timeline-footer">
                            <Link to="#" className="btn btn-primary btn-xs">Read more</Link>
                            <Link to="#" className="btn btn-danger btn-xs">Delete</Link>
                          </div>
                        </div>
                      </li>
                      {/* END timeline item */}
                      {/* timeline item */}
                      <li>
                        <i className="fa fa-user bg-aqua"/>
                        <div className="timeline-item">
                          <span className="time"><i className="fa fa-clock-o"/> 5 mins ago</span>
                          <h3 className="timeline-header no-border"><Link to="#">Sarah Young</Link>
                            accepted your friend request
                          </h3>
                        </div>
                      </li>
                      {/* END timeline item */}
                      {/* timeline item */}
                      <li>
                        <i className="fa fa-comments bg-yellow"/>
                        <div className="timeline-item">
                          <span className="time"><i className="fa fa-clock-o"/> 27 mins ago</span>
                          <h3 className="timeline-header"><Link to="#">Jay White</Link> commented on
                            your post</h3>
                          <div className="timeline-body">
                            Take me to your leader!
                            Switzerland is small and neutral!
                            We are more like Germany, ambitious and misunderstood!
                          </div>
                          <div className="timeline-footer">
                            <Link to="#" className="btn btn-warning btn-flat btn-xs">View
                              comment</Link>
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
                          <span className="time"><i className="fa fa-clock-o"/> 2 days ago</span>
                          <h3 className="timeline-header"><Link to="#">Mina Lee</Link> uploaded new
                            photos</h3>
                          <div className="timeline-body">
                            <img src="http://placehold.it/150x100" alt="..." className="margin"/>
                            <img src="http://placehold.it/150x100" alt="..." className="margin"/>
                            <img src="http://placehold.it/150x100" alt="..." className="margin"/>
                            <img src="http://placehold.it/150x100" alt="..." className="margin"/>
                          </div>
                        </div>
                      </li>
                      {/* END timeline item */}
                      <li>
                        <i className="fa fa-clock-o bg-gray"/>
                      </li>
                    </ul>
                  </div>
                  {/* /.tab-pane */}
                  <div className="tab-pane" id="settings">
                    <form className="form-horizontal">
                      <div className="form-group">
                        <label htmlFor="inputName" className="col-sm-2 control-label">Name</label>
                        <div className="col-sm-10">
                          <input type="email" className="form-control" id="inputName"
                                 placeholder="Name"/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputEmail" className="col-sm-2 control-label">Email</label>
                        <div className="col-sm-10">
                          <input type="email" className="form-control" id="inputEmail"
                                 placeholder="Email"/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputName" className="col-sm-2 control-label">Name</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="inputName"
                                 placeholder="Name"/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputExperience" className="col-sm-2 control-label">Experience</label>
                        <div className="col-sm-10">
                          <textarea className="form-control" id="inputExperience"
                                    placeholder="Experience" defaultValue={""}/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputSkills"
                               className="col-sm-2 control-label">Skills</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="inputSkills"
                                 placeholder="Skills"/>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                          <div className="checkbox">
                            <label>
                              <input type="checkbox"/> I agree to the <Link to="#">terms and
                              conditions</Link>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                          <button type="submit" className="btn btn-danger">Submit</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  {/* /.tab-pane */}
                </div>
                {/* /.tab-content */}
              </div>
              {/* /.nav-tabs-custom */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
      </Layout>
    );
  }

}

export default withStyles(s)(Profile);
