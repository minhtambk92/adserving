import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import s from './Compose.css';

const pageTitle = 'Compose';
const pageSubTitle = 'write new email';

class Compose extends Component {

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>
          <div className="row">
            <div className="col-md-3">
              <Link to="/pages/mailbox/inbox" className="btn btn-primary btn-block margin-bottom">Back
                to Inbox</Link>
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
                    <li><Link to="/pages/mailbox/inbox"><i className="fa fa-inbox"/> Inbox<span
                      className="label label-primary pull-right">12</span></Link></li>
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
                {/* /.box-header */}
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
                  <h3 className="box-title">Compose New Message</h3>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <div className="form-group">
                    <input className="form-control" placeholder="To:"/>
                  </div>
                  <div className="form-group">
                    <input className="form-control" placeholder="Subject:"/>
                  </div>
                  <div className="form-group">
                    <textarea id="compose-textarea" className="form-control" style={{ height: 300 }}
                              defaultValue={"                      <h1><u>Heading Of Message</u></h1>\n                      <h4>Subheading</h4>\n                      <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain\n                        was born and I will give you a complete account of the system, and expound the actual teachings\n                        of the great explorer of the truth, the master-builder of human happiness. No one rejects,\n                        dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know\n                        how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again\n                        is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain,\n                        but because occasionally circumstances occur in which toil and pain can procure him some great\n                        pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise,\n                        except to obtain some advantage from it? But who has any right to find fault with a man who\n                        chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that\n                        produces no resultant pleasure? On the other hand, we denounce with righteous indignation and\n                        dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so\n                        blinded by desire, that they cannot foresee</p>\n                      <ul>\n                        <li>List item one</li>\n                        <li>List item two</li>\n                        <li>List item three</li>\n                        <li>List item four</li>\n                      </ul>\n                      <p>Thank you,</p>\n                      <p>John Doe</p>\n                    "}/>
                  </div>
                  <div className="form-group">
                    <div className="btn btn-default btn-file">
                      <i className="fa fa-paperclip"/> Attachment
                      <input type="file" name="attachment"/>
                    </div>
                    <p className="help-block">Max. 32MB</p>
                  </div>
                </div>
                {/* /.box-body */}
                <div className="box-footer">
                  <div className="pull-right">
                    <button type="button" className="btn btn-default"><i className="fa fa-pencil"/>
                      Draft
                    </button>
                    <button type="submit" className="btn btn-primary"><i
                      className="fa fa-envelope-o"/> Send
                    </button>
                  </div>
                  <button type="reset" className="btn btn-default"><i className="fa fa-times"/>
                    Discard
                  </button>
                </div>
                {/* /.box-footer */}
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

export default withStyles(s)(Compose);
