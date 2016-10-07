import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import s from './Read.css';

const pageTitle = 'Read';
const pageSubTitle = '13 new messages';

class Read extends Component {

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
                  <h3 className="box-title">Read Mail</h3>
                  <div className="box-tools pull-right">
                    <Link to="#" className="btn btn-box-tool" data-toggle="tooltip"
                          title="Previous"><i className="fa fa-chevron-left"/></Link>
                    <Link to="#" className="btn btn-box-tool" data-toggle="tooltip" title="Next"><i
                      className="fa fa-chevron-right"/></Link>
                  </div>
                </div>
                {/* /.box-header */}
                <div className="box-body no-padding">
                  <div className="mailbox-read-info">
                    <h3>Message Subject Is Placed Here</h3>
                    <h5>From: help@example.com
                      <span className="mailbox-read-time pull-right">15 Feb. 2016 11:03 PM</span>
                    </h5>
                  </div>
                  {/* /.mailbox-read-info */}
                  <div className="mailbox-controls with-border text-center">
                    <div className="btn-group">
                      <button type="button" className="btn btn-default btn-sm" data-toggle="tooltip"
                              data-container="body" title="Delete">
                        <i className="fa fa-trash-o"/></button>
                      <button type="button" className="btn btn-default btn-sm" data-toggle="tooltip"
                              data-container="body" title="Reply">
                        <i className="fa fa-reply"/></button>
                      <button type="button" className="btn btn-default btn-sm" data-toggle="tooltip"
                              data-container="body" title="Forward">
                        <i className="fa fa-share"/></button>
                    </div>
                    {/* /.btn-group */}
                    <button type="button" className="btn btn-default btn-sm" data-toggle="tooltip"
                            title="Print">
                      <i className="fa fa-print"/></button>
                  </div>
                  {/* /.mailbox-controls */}
                  <div className="mailbox-read-message">
                    <p>Hello John,</p>
                    <p>Keffiyeh blog actually fashion axe vegan, irony biodiesel. Cold-pressed
                      hoodie chillwave put a bird
                      on it aesthetic, bitters brunch meggings vegan iPhone. Dreamcatcher vegan
                      scenester mlkshk. Ethical
                      master cleanse Bushwick, occupy Thundercats banjo cliche ennui farm-to-table
                      mlkshk fanny pack
                      gluten-free. Marfa butcher vegan quinoa, bicycle rights disrupt tofu scenester
                      chillwave 3 wolf moon
                      asymmetrical taxidermy pour-over. Quinoa tote bag fashion axe, Godard disrupt
                      migas church-key tofu
                      blog locavore. Thundercats cronut polaroid Neutra tousled, meh food truck
                      selfies narwhal American
                      Apparel.</p>
                    <p>Raw denim McSweeney's bicycle rights, iPhone trust fund quinoa Neutra VHS
                      kale chips vegan PBR&amp;B
                      literally Thundercats +1. Forage tilde four dollar toast, banjo health goth
                      paleo butcher. Four dollar
                      toast Brooklyn pour-over American Apparel sustainable, lumbersexual listicle
                      gluten-free health goth
                      umami hoodie. Synth Echo Park bicycle rights DIY farm-to-table, retro kogi
                      sriracha dreamcatcher PBR&amp;B
                      flannel hashtag irony Wes Anderson. Lumbersexual Williamsburg Helvetica next
                      level. Cold-pressed
                      slow-carb pop-up normcore Thundercats Portland, cardigan literally meditation
                      lumbersexual crucifix.
                      Wayfarers raw denim paleo Bushwick, keytar Helvetica scenester keffiyeh 8-bit
                      irony mumblecore
                      whatever viral Truffaut.</p>
                    <p>Post-ironic shabby chic VHS, Marfa keytar flannel lomo try-hard keffiyeh
                      cray. Actually fap fanny
                      pack yr artisan trust fund. High Life dreamcatcher church-key gentrify. Tumblr
                      stumptown four dollar
                      toast vinyl, cold-pressed try-hard blog authentic keffiyeh Helvetica lo-fi
                      tilde Intelligentsia. Lomo
                      locavore salvia bespoke, twee fixie paleo cliche brunch Schlitz blog
                      McSweeney's messenger bag swag
                      slow-carb. Odd Future photo booth pork belly, you probably haven't heard of
                      them actually tofu ennui
                      keffiyeh lo-fi Truffaut health goth. Narwhal sustainable retro disrupt.</p>
                    <p>Skateboard artisan letterpress before they sold out High Life messenger bag.
                      Bitters chambray
                      leggings listicle, drinking vinegar chillwave synth. Fanny pack hoodie
                      American Apparel twee. American
                      Apparel PBR listicle, salvia aesthetic occupy sustainable Neutra kogi. Organic
                      synth Tumblr viral
                      plaid, shabby chic single-origin coffee Etsy 3 wolf moon slow-carb Schlitz
                      roof party tousled squid
                      vinyl. Readymade next level literally trust fund. Distillery master cleanse
                      migas, Vice sriracha
                      flannel chambray chia cronut.</p>
                    <p>Thanks,<br />Jane</p>
                  </div>
                  {/* /.mailbox-read-message */}
                </div>
                {/* /.box-body */}
                <div className="box-footer">
                  <ul className="mailbox-attachments clearfix">
                    <li>
                      <span className="mailbox-attachment-icon"><i
                        className="fa fa-file-pdf-o"/></span>
                      <div className="mailbox-attachment-info">
                        <Link to="#" className="mailbox-attachment-name"><i
                          className="fa fa-paperclip"/> Sep2014-report.pdf</Link>
                        <span className="mailbox-attachment-size">
                        1,245 KB
                        <Link to="#" className="btn btn-default btn-xs pull-right"><i
                          className="fa fa-cloud-download"/></Link>
                      </span>
                      </div>
                    </li>
                    <li>
                      <span className="mailbox-attachment-icon"><i
                        className="fa fa-file-word-o"/></span>
                      <div className="mailbox-attachment-info">
                        <Link to="#" className="mailbox-attachment-name"><i
                          className="fa fa-paperclip"/> App Description.docx</Link>
                        <span className="mailbox-attachment-size">
                        1,245 KB
                        <Link to="#" className="btn btn-default btn-xs pull-right"><i
                          className="fa fa-cloud-download"/></Link>
                      </span>
                      </div>
                    </li>
                    <li>
                      <span className="mailbox-attachment-icon has-img"><img
                        src="/AdminLTE/dist/img/photo1.png" alt="Attachment"/></span>
                      <div className="mailbox-attachment-info">
                        <Link to="#" className="mailbox-attachment-name"><i
                          className="fa fa-camera"/> photo1.png</Link>
                        <span className="mailbox-attachment-size">
                        2.67 MB
                        <Link to="#" className="btn btn-default btn-xs pull-right"><i
                          className="fa fa-cloud-download"/></Link>
                      </span>
                      </div>
                    </li>
                    <li>
                      <span className="mailbox-attachment-icon has-img"><img
                        src="/AdminLTE/dist/img/photo2.png" alt="Attachment"/></span>
                      <div className="mailbox-attachment-info">
                        <Link to="#" className="mailbox-attachment-name"><i
                          className="fa fa-camera"/> photo2.png</Link>
                        <span className="mailbox-attachment-size">
                        1.9 MB
                        <Link to="#" className="btn btn-default btn-xs pull-right"><i
                          className="fa fa-cloud-download"/></Link>
                      </span>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* /.box-footer */}
                <div className="box-footer">
                  <div className="pull-right">
                    <button type="button" className="btn btn-default"><i className="fa fa-reply"/>
                      Reply
                    </button>
                    <button type="button" className="btn btn-default"><i className="fa fa-share"/>
                      Forward
                    </button>
                  </div>
                  <button type="button" className="btn btn-default"><i className="fa fa-trash-o"/>
                    Delete
                  </button>
                  <button type="button" className="btn btn-default"><i className="fa fa-print"/>
                    Print
                  </button>
                </div>
                {/* /.box-footer */}
              </div>
              {/* /. box */}
            </div>
            {/* /.col */}
          </div>
        </div>
      </Layout>
    );
  }

}

export default withStyles(s)(Read);
