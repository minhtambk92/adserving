import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import s from './Inbox.css';

const pageTitle = 'Mailbox';
const pageSubTitle = '13 new messages';

class Inbox extends Component {

  componentDidMount() {
    $(function () {
      //Enable iCheck plugin for checkboxes
      //iCheck for checkbox and radio inputs
      $('.mailbox-messages input[type="checkbox"]').iCheck({
        checkboxClass: 'icheckbox_flat-blue',
        radioClass: 'iradio_flat-blue'
      });

      //Enable check and uncheck all functionality
      $(".checkbox-toggle").click(function () {
        var clicks = $(this).data('clicks');
        if (clicks) {
          //Uncheck all checkboxes
          $(".mailbox-messages input[type='checkbox']").iCheck("uncheck");
          $(".fa", this).removeClass("fa-check-square-o").addClass('fa-square-o');
        } else {
          //Check all checkboxes
          $(".mailbox-messages input[type='checkbox']").iCheck("check");
          $(".fa", this).removeClass("fa-square-o").addClass('fa-check-square-o');
        }
        $(this).data("clicks", !clicks);
      });

      //Handle starring for glyphicon and font awesome
      $(".mailbox-star").click(function (e) {
        e.preventDefault();
        //detect type
        var $this = $(this).find("a > i");
        var glyph = $this.hasClass("glyphicon");
        var fa = $this.hasClass("fa");

        //Switch states
        if (glyph) {
          $this.toggleClass("glyphicon-star");
          $this.toggleClass("glyphicon-star-empty");
        }

        if (fa) {
          $this.toggleClass("fa-star");
          $this.toggleClass("fa-star-o");
        }
      });
    });
  }

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>
          <div className="row">
            <div className="col-md-3">
              <Link to="compose.html"
                    className="btn btn-primary btn-block margin-bottom">Compose</Link>
              <div className="box box-solid">
                <div className="box-header with-border">
                  <h3 className="box-title">Folders</h3>
                  <div className="box-tools">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i
                      className="fa fa-minus"/>
                    </button>
                  </div>
                </div>
                <div className="box-body no-padding">
                  <ul className="nav nav-pills nav-stacked">
                    <li className="active"><Link to="#"><i className="fa fa-inbox"/> Inbox
                      <span className="label label-primary pull-right">12</span></Link></li>
                    <li><Link to="#"><i className="fa fa-envelope-o"/> Sent</Link></li>
                    <li><Link to="#"><i className="fa fa-file-text-o"/> Drafts</Link></li>
                    <li><Link to="#"><i className="fa fa-filter"/> Junk <span
                      className="label label-warning pull-right">65</span></Link>
                    </li>
                    <li><Link to="#"><i className="fa fa-trash-o"/> Trash</Link></li>
                  </ul>
                </div>
                {/* /.box-body */}
              </div>
              {/* /. box */}
              <div className="box box-solid">
                <div className="box-header with-border">
                  <h3 className="box-title">Labels</h3>
                  <div className="box-tools">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i
                      className="fa fa-minus"/>
                    </button>
                  </div>
                </div>
                <div className="box-body no-padding">
                  <ul className="nav nav-pills nav-stacked">
                    <li><Link to="#"><i className="fa fa-circle-o text-red"/> Important</Link></li>
                    <li><Link to="#"><i className="fa fa-circle-o text-yellow"/> Promotions</Link>
                    </li>
                    <li><Link to="#"><i className="fa fa-circle-o text-light-blue"/> Social</Link>
                    </li>
                  </ul>
                </div>
                {/* /.box-body */}
              </div>
              {/* /.box */}
            </div>
            {/* /.col */}
            <div className="col-md-9">
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">Inbox</h3>
                  <div className="box-tools pull-right">
                    <div className="has-feedback">
                      <input type="text" className="form-control input-sm"
                             placeholder="Search Mail"/>
                      <span className="glyphicon glyphicon-search form-control-feedback"/>
                    </div>
                  </div>
                  {/* /.box-tools */}
                </div>
                {/* /.box-header */}
                <div className="box-body no-padding">
                  <div className="mailbox-controls">
                    {/* Check all button */}
                    <button type="button" className="btn btn-default btn-sm checkbox-toggle"><i
                      className="fa fa-square-o"/>
                    </button>
                    <div className="btn-group">
                      <button type="button" className="btn btn-default btn-sm"><i
                        className="fa fa-trash-o"/></button>
                      <button type="button" className="btn btn-default btn-sm"><i
                        className="fa fa-reply"/></button>
                      <button type="button" className="btn btn-default btn-sm"><i
                        className="fa fa-share"/></button>
                    </div>
                    {/* /.btn-group */}
                    <button type="button" className="btn btn-default btn-sm"><i
                      className="fa fa-refresh"/></button>
                    <div className="pull-right">
                      1-50/200
                      <div className="btn-group">
                        <button type="button" className="btn btn-default btn-sm"><i
                          className="fa fa-chevron-left"/></button>
                        <button type="button" className="btn btn-default btn-sm"><i
                          className="fa fa-chevron-right"/></button>
                      </div>
                      {/* /.btn-group */}
                    </div>
                    {/* /.pull-right */}
                  </div>
                  <div className="table-responsive mailbox-messages">
                    <table className="table table-hover table-striped">
                      <tbody>
                      <tr>
                        <td><input type="checkbox"/></td>
                        <td className="mailbox-star"><Link to="#"><i
                          className="fa fa-star text-yellow"/></Link></td>
                        <td className="mailbox-name"><Link to="read-mail.html">Alexander
                          Pierce</Link></td>
                        <td className="mailbox-subject"><b>AdminLTE 2.0 Issue</b> - Trying to find a
                          solution to this problem...
                        </td>
                        <td className="mailbox-attachment"/>
                        <td className="mailbox-date">5 mins ago</td>
                      </tr>
                      <tr>
                        <td><input type="checkbox"/></td>
                        <td className="mailbox-star"><Link to="#"><i
                          className="fa fa-star-o text-yellow"/></Link></td>
                        <td className="mailbox-name"><Link to="read-mail.html">Alexander
                          Pierce</Link></td>
                        <td className="mailbox-subject"><b>AdminLTE 2.0 Issue</b> - Trying to find a
                          solution to this problem...
                        </td>
                        <td className="mailbox-attachment"><i className="fa fa-paperclip"/></td>
                        <td className="mailbox-date">28 mins ago</td>
                      </tr>
                      <tr>
                        <td><input type="checkbox"/></td>
                        <td className="mailbox-star"><Link to="#"><i
                          className="fa fa-star-o text-yellow"/></Link></td>
                        <td className="mailbox-name"><Link to="read-mail.html">Alexander
                          Pierce</Link></td>
                        <td className="mailbox-subject"><b>AdminLTE 2.0 Issue</b> - Trying to find a
                          solution to this problem...
                        </td>
                        <td className="mailbox-attachment"><i className="fa fa-paperclip"/></td>
                        <td className="mailbox-date">11 hours ago</td>
                      </tr>
                      <tr>
                        <td><input type="checkbox"/></td>
                        <td className="mailbox-star"><Link to="#"><i
                          className="fa fa-star text-yellow"/></Link></td>
                        <td className="mailbox-name"><Link to="read-mail.html">Alexander
                          Pierce</Link></td>
                        <td className="mailbox-subject"><b>AdminLTE 2.0 Issue</b> - Trying to find a
                          solution to this problem...
                        </td>
                        <td className="mailbox-attachment"/>
                        <td className="mailbox-date">15 hours ago</td>
                      </tr>
                      <tr>
                        <td><input type="checkbox"/></td>
                        <td className="mailbox-star"><Link to="#"><i
                          className="fa fa-star text-yellow"/></Link></td>
                        <td className="mailbox-name"><Link to="read-mail.html">Alexander
                          Pierce</Link></td>
                        <td className="mailbox-subject"><b>AdminLTE 2.0 Issue</b> - Trying to find a
                          solution to this problem...
                        </td>
                        <td className="mailbox-attachment"><i className="fa fa-paperclip"/></td>
                        <td className="mailbox-date">Yesterday</td>
                      </tr>
                      <tr>
                        <td><input type="checkbox"/></td>
                        <td className="mailbox-star"><Link to="#"><i
                          className="fa fa-star-o text-yellow"/></Link></td>
                        <td className="mailbox-name"><Link to="read-mail.html">Alexander
                          Pierce</Link></td>
                        <td className="mailbox-subject"><b>AdminLTE 2.0 Issue</b> - Trying to find a
                          solution to this problem...
                        </td>
                        <td className="mailbox-attachment"><i className="fa fa-paperclip"/></td>
                        <td className="mailbox-date">2 days ago</td>
                      </tr>
                      <tr>
                        <td><input type="checkbox"/></td>
                        <td className="mailbox-star"><Link to="#"><i
                          className="fa fa-star-o text-yellow"/></Link></td>
                        <td className="mailbox-name"><Link to="read-mail.html">Alexander
                          Pierce</Link></td>
                        <td className="mailbox-subject"><b>AdminLTE 2.0 Issue</b> - Trying to find a
                          solution to this problem...
                        </td>
                        <td className="mailbox-attachment"><i className="fa fa-paperclip"/></td>
                        <td className="mailbox-date">2 days ago</td>
                      </tr>
                      <tr>
                        <td><input type="checkbox"/></td>
                        <td className="mailbox-star"><Link to="#"><i
                          className="fa fa-star text-yellow"/></Link></td>
                        <td className="mailbox-name"><Link to="read-mail.html">Alexander
                          Pierce</Link></td>
                        <td className="mailbox-subject"><b>AdminLTE 2.0 Issue</b> - Trying to find a
                          solution to this problem...
                        </td>
                        <td className="mailbox-attachment"/>
                        <td className="mailbox-date">2 days ago</td>
                      </tr>
                      <tr>
                        <td><input type="checkbox"/></td>
                        <td className="mailbox-star"><Link to="#"><i
                          className="fa fa-star text-yellow"/></Link></td>
                        <td className="mailbox-name"><Link to="read-mail.html">Alexander
                          Pierce</Link></td>
                        <td className="mailbox-subject"><b>AdminLTE 2.0 Issue</b> - Trying to find a
                          solution to this problem...
                        </td>
                        <td className="mailbox-attachment"/>
                        <td className="mailbox-date">2 days ago</td>
                      </tr>
                      <tr>
                        <td><input type="checkbox"/></td>
                        <td className="mailbox-star"><Link to="#"><i
                          className="fa fa-star-o text-yellow"/></Link></td>
                        <td className="mailbox-name"><Link to="read-mail.html">Alexander
                          Pierce</Link></td>
                        <td className="mailbox-subject"><b>AdminLTE 2.0 Issue</b> - Trying to find a
                          solution to this problem...
                        </td>
                        <td className="mailbox-attachment"/>
                        <td className="mailbox-date">2 days ago</td>
                      </tr>
                      <tr>
                        <td><input type="checkbox"/></td>
                        <td className="mailbox-star"><Link to="#"><i
                          className="fa fa-star-o text-yellow"/></Link></td>
                        <td className="mailbox-name"><Link to="read-mail.html">Alexander
                          Pierce</Link></td>
                        <td className="mailbox-subject"><b>AdminLTE 2.0 Issue</b> - Trying to find a
                          solution to this problem...
                        </td>
                        <td className="mailbox-attachment"><i className="fa fa-paperclip"/></td>
                        <td className="mailbox-date">4 days ago</td>
                      </tr>
                      <tr>
                        <td><input type="checkbox"/></td>
                        <td className="mailbox-star"><Link to="#"><i
                          className="fa fa-star text-yellow"/></Link></td>
                        <td className="mailbox-name"><Link to="read-mail.html">Alexander
                          Pierce</Link></td>
                        <td className="mailbox-subject"><b>AdminLTE 2.0 Issue</b> - Trying to find a
                          solution to this problem...
                        </td>
                        <td className="mailbox-attachment"/>
                        <td className="mailbox-date">12 days ago</td>
                      </tr>
                      <tr>
                        <td><input type="checkbox"/></td>
                        <td className="mailbox-star"><Link to="#"><i
                          className="fa fa-star-o text-yellow"/></Link></td>
                        <td className="mailbox-name"><Link to="read-mail.html">Alexander
                          Pierce</Link></td>
                        <td className="mailbox-subject"><b>AdminLTE 2.0 Issue</b> - Trying to find a
                          solution to this problem...
                        </td>
                        <td className="mailbox-attachment"><i className="fa fa-paperclip"/></td>
                        <td className="mailbox-date">12 days ago</td>
                      </tr>
                      <tr>
                        <td><input type="checkbox"/></td>
                        <td className="mailbox-star"><Link to="#"><i
                          className="fa fa-star text-yellow"/></Link></td>
                        <td className="mailbox-name"><Link to="read-mail.html">Alexander
                          Pierce</Link></td>
                        <td className="mailbox-subject"><b>AdminLTE 2.0 Issue</b> - Trying to find a
                          solution to this problem...
                        </td>
                        <td className="mailbox-attachment"><i className="fa fa-paperclip"/></td>
                        <td className="mailbox-date">14 days ago</td>
                      </tr>
                      <tr>
                        <td><input type="checkbox"/></td>
                        <td className="mailbox-star"><Link to="#"><i
                          className="fa fa-star text-yellow"/></Link></td>
                        <td className="mailbox-name"><Link to="read-mail.html">Alexander
                          Pierce</Link></td>
                        <td className="mailbox-subject"><b>AdminLTE 2.0 Issue</b> - Trying to find a
                          solution to this problem...
                        </td>
                        <td className="mailbox-attachment"><i className="fa fa-paperclip"/></td>
                        <td className="mailbox-date">15 days ago</td>
                      </tr>
                      </tbody>
                    </table>
                    {/* /.table */}
                  </div>
                  {/* /.mail-box-messages */}
                </div>
                {/* /.box-body */}
                <div className="box-footer no-padding">
                  <div className="mailbox-controls">
                    {/* Check all button */}
                    <button type="button" className="btn btn-default btn-sm checkbox-toggle"><i
                      className="fa fa-square-o"/>
                    </button>
                    <div className="btn-group">
                      <button type="button" className="btn btn-default btn-sm"><i
                        className="fa fa-trash-o"/></button>
                      <button type="button" className="btn btn-default btn-sm"><i
                        className="fa fa-reply"/></button>
                      <button type="button" className="btn btn-default btn-sm"><i
                        className="fa fa-share"/></button>
                    </div>
                    {/* /.btn-group */}
                    <button type="button" className="btn btn-default btn-sm"><i
                      className="fa fa-refresh"/></button>
                    <div className="pull-right">
                      1-50/200
                      <div className="btn-group">
                        <button type="button" className="btn btn-default btn-sm"><i
                          className="fa fa-chevron-left"/></button>
                        <button type="button" className="btn btn-default btn-sm"><i
                          className="fa fa-chevron-right"/></button>
                      </div>
                      {/* /.btn-group */}
                    </div>
                    {/* /.pull-right */}
                  </div>
                </div>
              </div>
              {/* /. box */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
      </Layout>
    );
  }

}

export default withStyles(s)(Inbox);
