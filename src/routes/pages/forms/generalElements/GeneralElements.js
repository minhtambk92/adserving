import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import s from './GeneralElements.css';

const pageTitle = 'General Form Elements';
const pageSubTitle = 'Preview';

class GeneralElements extends Component {

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>
          <div className="row">
            {/* left column */}
            <div className="col-md-6">
              {/* general form elements */}
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">Quick Example</h3>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form role="form">
                  <div className="box-body">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Email address</label>
                      <input type="email" className="form-control" id="exampleInputEmail1"
                             placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Password</label>
                      <input type="password" className="form-control" id="exampleInputPassword1"
                             placeholder="Password"/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputFile">File input</label>
                      <input type="file" id="exampleInputFile"/>
                      <p className="help-block">Example block-level help text here.</p>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input type="checkbox"/> Check me out
                      </label>
                    </div>
                  </div>
                  {/* /.box-body */}
                  <div className="box-footer">
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
                </form>
              </div>
              {/* /.box */}
              {/* Form Element sizes */}
              <div className="box box-success">
                <div className="box-header with-border">
                  <h3 className="box-title">Different Height</h3>
                </div>
                <div className="box-body">
                  <input className="form-control input-lg" type="text" placeholder=".input-lg"/>
                  <br />
                  <input className="form-control" type="text" placeholder="Default input"/>
                  <br />
                  <input className="form-control input-sm" type="text" placeholder=".input-sm"/>
                </div>
                {/* /.box-body */}
              </div>
              {/* /.box */}
              <div className="box box-danger">
                <div className="box-header with-border">
                  <h3 className="box-title">Different Width</h3>
                </div>
                <div className="box-body">
                  <div className="row">
                    <div className="col-xs-3">
                      <input type="text" className="form-control" placeholder=".col-xs-3"/>
                    </div>
                    <div className="col-xs-4">
                      <input type="text" className="form-control" placeholder=".col-xs-4"/>
                    </div>
                    <div className="col-xs-5">
                      <input type="text" className="form-control" placeholder=".col-xs-5"/>
                    </div>
                  </div>
                </div>
                {/* /.box-body */}
              </div>
              {/* /.box */}
              {/* Input addon */}
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">Input Addon</h3>
                </div>
                <div className="box-body">
                  <div className="input-group">
                    <span className="input-group-addon">@</span>
                    <input type="text" className="form-control" placeholder="Username"/>
                  </div>
                  <br />
                  <div className="input-group">
                    <input type="text" className="form-control"/>
                    <span className="input-group-addon">.00</span>
                  </div>
                  <br />
                  <div className="input-group">
                    <span className="input-group-addon">$</span>
                    <input type="text" className="form-control"/>
                    <span className="input-group-addon">.00</span>
                  </div>
                  <h4>With icons</h4>
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-envelope"/></span>
                    <input type="email" className="form-control" placeholder="Email"/>
                  </div>
                  <br />
                  <div className="input-group">
                    <input type="text" className="form-control"/>
                    <span className="input-group-addon"><i className="fa fa-check"/></span>
                  </div>
                  <br />
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-dollar"/></span>
                    <input type="text" className="form-control"/>
                    <span className="input-group-addon"><i className="fa fa-ambulance"/></span>
                  </div>
                  <h4>With checkbox and radio inputs</h4>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="input-group">
                      <span className="input-group-addon">
                        <input type="checkbox"/>
                      </span>
                        <input type="text" className="form-control"/>
                      </div>
                      {/* /input-group */}
                    </div>
                    {/* /.col-lg-6 */}
                    <div className="col-lg-6">
                      <div className="input-group">
                      <span className="input-group-addon">
                        <input type="radio"/>
                      </span>
                        <input type="text" className="form-control"/>
                      </div>
                      {/* /input-group */}
                    </div>
                    {/* /.col-lg-6 */}
                  </div>
                  {/* /.row */}
                  <h4>With buttons</h4>
                  <p className="margin">Large: <code>.input-group.input-group-lg</code></p>
                  <div className="input-group input-group-lg">
                    <div className="input-group-btn">
                      <button type="button" className="btn btn-warning dropdown-toggle"
                              data-toggle="dropdown">Action
                        <span className="fa fa-caret-down"/></button>
                      <ul className="dropdown-menu">
                        <li><Link to="#">Action</Link></li>
                        <li><Link to="#">Another action</Link></li>
                        <li><Link to="#">Something else here</Link></li>
                        <li className="divider"/>
                        <li><Link to="#">Separated link</Link></li>
                      </ul>
                    </div>
                    {/* /btn-group */}
                    <input type="text" className="form-control"/>
                  </div>
                  {/* /input-group */}
                  <p className="margin">Normal</p>
                  <div className="input-group">
                    <div className="input-group-btn">
                      <button type="button" className="btn btn-danger">Action</button>
                    </div>
                    {/* /btn-group */}
                    <input type="text" className="form-control"/>
                  </div>
                  {/* /input-group */}
                  <p className="margin">Small <code>.input-group.input-group-sm</code></p>
                  <div className="input-group input-group-sm">
                    <input type="text" className="form-control"/>
                    <span className="input-group-btn">
                    <button type="button" className="btn btn-info btn-flat">Go!</button>
                  </span>
                  </div>
                  {/* /input-group */}
                </div>
                {/* /.box-body */}
              </div>
              {/* /.box */}
            </div>
            {/*/.col (left) */}
            {/* right column */}
            <div className="col-md-6">
              {/* Horizontal Form */}
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">Horizontal Form</h3>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form className="form-horizontal">
                  <div className="box-body">
                    <div className="form-group">
                      <label htmlFor="inputEmail3" className="col-sm-2 control-label">Email</label>
                      <div className="col-sm-10">
                        <input type="email" className="form-control" id="inputEmail3"
                               placeholder="Email"/>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputPassword3"
                             className="col-sm-2 control-label">Password</label>
                      <div className="col-sm-10">
                        <input type="password" className="form-control" id="inputPassword3"
                               placeholder="Password"/>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-offset-2 col-sm-10">
                        <div className="checkbox">
                          <label>
                            <input type="checkbox"/> Remember me
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /.box-body */}
                  <div className="box-footer">
                    <button type="submit" className="btn btn-default">Cancel</button>
                    <button type="submit" className="btn btn-info pull-right">Sign in</button>
                  </div>
                  {/* /.box-footer */}
                </form>
              </div>
              {/* /.box */}
              {/* general form elements disabled */}
              <div className="box box-warning">
                <div className="box-header with-border">
                  <h3 className="box-title">General Elements</h3>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <form role="form">
                    {/* text input */}
                    <div className="form-group">
                      <label>Text</label>
                      <input type="text" className="form-control" placeholder="Enter ..."/>
                    </div>
                    <div className="form-group">
                      <label>Text Disabled</label>
                      <input type="text" className="form-control" placeholder="Enter ..." disabled/>
                    </div>
                    {/* textarea */}
                    <div className="form-group">
                      <label>Textarea</label>
                      <textarea className="form-control" rows={3} placeholder="Enter ..."
                                defaultValue={""}/>
                    </div>
                    <div className="form-group">
                      <label>Textarea Disabled</label>
                      <textarea className="form-control" rows={3} placeholder="Enter ..." disabled
                                defaultValue={""}/>
                    </div>
                    {/* input states */}
                    <div className="form-group has-success">
                      <label className="control-label" htmlFor="inputSuccess"><i
                        className="fa fa-check"/> Input with success</label>
                      <input type="text" className="form-control" id="inputSuccess"
                             placeholder="Enter ..."/>
                      <span className="help-block">Help block with success</span>
                    </div>
                    <div className="form-group has-warning">
                      <label className="control-label" htmlFor="inputWarning"><i
                        className="fa fa-bell-o"/> Input with
                        warning</label>
                      <input type="text" className="form-control" id="inputWarning"
                             placeholder="Enter ..."/>
                      <span className="help-block">Help block with warning</span>
                    </div>
                    <div className="form-group has-error">
                      <label className="control-label" htmlFor="inputError"><i
                        className="fa fa-times-circle-o"/> Input with
                        error</label>
                      <input type="text" className="form-control" id="inputError"
                             placeholder="Enter ..."/>
                      <span className="help-block">Help block with error</span>
                    </div>
                    {/* checkbox */}
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input type="checkbox"/>
                          Checkbox 1
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox"/>
                          Checkbox 2
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" disabled/>
                          Checkbox disabled
                        </label>
                      </div>
                    </div>
                    {/* radio */}
                    <div className="form-group">
                      <div className="radio">
                        <label>
                          <input type="radio" name="optionsRadios" id="optionsRadios1"
                                 defaultValue="option1" defaultChecked/>
                          Option one is this and that—be sure to include why it's great
                        </label>
                      </div>
                      <div className="radio">
                        <label>
                          <input type="radio" name="optionsRadios" id="optionsRadios2"
                                 defaultValue="option2"/>
                          Option two can be something else and selecting it will deselect option one
                        </label>
                      </div>
                      <div className="radio">
                        <label>
                          <input type="radio" name="optionsRadios" id="optionsRadios3"
                                 defaultValue="option3" disabled/>
                          Option three is disabled
                        </label>
                      </div>
                    </div>
                    {/* select */}
                    <div className="form-group">
                      <label>Select</label>
                      <select className="form-control">
                        <option>option 1</option>
                        <option>option 2</option>
                        <option>option 3</option>
                        <option>option 4</option>
                        <option>option 5</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Select Disabled</label>
                      <select className="form-control" disabled>
                        <option>option 1</option>
                        <option>option 2</option>
                        <option>option 3</option>
                        <option>option 4</option>
                        <option>option 5</option>
                      </select>
                    </div>
                    {/* Select multiple*/}
                    <div className="form-group">
                      <label>Select Multiple</label>
                      <select multiple className="form-control">
                        <option>option 1</option>
                        <option>option 2</option>
                        <option>option 3</option>
                        <option>option 4</option>
                        <option>option 5</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Select Multiple Disabled</label>
                      <select multiple className="form-control" disabled>
                        <option>option 1</option>
                        <option>option 2</option>
                        <option>option 3</option>
                        <option>option 4</option>
                        <option>option 5</option>
                      </select>
                    </div>
                  </form>
                </div>
                {/* /.box-body */}
              </div>
              {/* /.box */}
            </div>
            {/* /.col (right) */}
          </div>
          {/* /.row */}
        </div>
      </Layout>
    );
  }

}

export default withStyles(s)(GeneralElements);
