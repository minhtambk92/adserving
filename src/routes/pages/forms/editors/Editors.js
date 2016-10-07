import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import s from './Editors.css';

const pageTitle = 'Text Editors';
const pageSubTitle = 'Advanced form element';

class Editors extends Component {

  componentDidMount() {
    $(function () {
      // Replace the <textarea id="editor1"> with a CKEditor
      // instance, using default configuration.
      CKEDITOR.replace('editor1');
      //bootstrap WYSIHTML5 - text editor
      $(".textarea").wysihtml5();
    });
  }

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>
          <div className="row">
            <div className="col-md-12">
              <div className="box box-info">
                <div className="box-header">
                  <h3 className="box-title">CK Editor
                    <small>Advanced and full of features</small>
                  </h3>
                  {/* tools box */}
                  <div className="pull-right box-tools">
                    <button type="button" className="btn btn-info btn-sm" data-widget="collapse"
                            data-toggle="tooltip" title="Collapse">
                      <i className="fa fa-minus"/></button>
                    <button type="button" className="btn btn-info btn-sm" data-widget="remove"
                            data-toggle="tooltip" title="Remove">
                      <i className="fa fa-times"/></button>
                  </div>
                  {/* /. tools */}
                </div>
                {/* /.box-header */}
                <div className="box-body pad">
                  <form>
                    <textarea id="editor1" name="editor1" rows={10} cols={80}
                              defaultValue={"This is my textarea to be replaced with CKEditor."}/>
                  </form>
                </div>
              </div>
              {/* /.box */}
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Bootstrap WYSIHTML5
                    <small>Simple and fast</small>
                  </h3>
                  {/* tools box */}
                  <div className="pull-right box-tools">
                    <button type="button" className="btn btn-default btn-sm" data-widget="collapse"
                            data-toggle="tooltip" title="Collapse">
                      <i className="fa fa-minus"/></button>
                    <button type="button" className="btn btn-default btn-sm" data-widget="remove"
                            data-toggle="tooltip" title="Remove">
                      <i className="fa fa-times"/></button>
                  </div>
                  {/* /. tools */}
                </div>
                {/* /.box-header */}
                <div className="box-body pad">
                  <form>
                    <textarea className="textarea" placeholder="Place some text here" style={{
                      width: '100%',
                      height: 200,
                      fontSize: 14,
                      lineHeight: 18,
                      border: '1px solid #dddddd',
                      padding: 10
                    }} defaultValue={""}/>
                  </form>
                </div>
              </div>
            </div>
            {/* /.col*/}
          </div>
          {/* ./row */}
        </div>
      </Layout>
    );
  }

}

export default withStyles(s)(Editors);
