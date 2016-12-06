/* global $ */

import React, { Component, PropTypes } from 'react';
import ListZoneShareForm from './ListShareForm';
import Link from '../../../components/Link';

class shareForm extends Component {

  static propTypes = {
    zoneId: PropTypes.string.isRequired,
    zone: PropTypes.object,
    getZone: PropTypes.func,
    createZoneShare: PropTypes.func,
    updateZoneShare: PropTypes.func,
    deleteZoneShare: PropTypes.func,
    removeShare: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      numberShare: 1,
      arrShare: [],
    };
  }
  componentDidMount() {
    /* eslint-disable no-undef */
    const self = this;
    // Add New
    $('#createShareZone').click(() => {
      const length = this.state.numberShare;
      const count = length + 1;
      self.setState({ numberShare: count });
      self.setState({ arrShare: self.state.arrShare.concat([count]) });
    });
    // Delete
    $('#shareZoneForm').on('click', '.remove-share-zone', function () {
      const id = $(this).parents('.list-zone-shared').attr('id');
      if (id) {
        self.props.deleteZoneShare(id).then(() => {
          self.props.removeShare(id);
          self.props.getZone(self.props.zoneId);
          $(this).parent().css('display', 'none');
        });
      } else {
        $(this).parent().css('display', 'none');
      }
      // self.props.getBanner(self.props.bannerId);
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      shares,
    } = nextProps.zone && (nextProps.zone || {});
    if (nextProps.zone.shares) {
      const length = shares.length;
      this.setState({ numberShare: length });
    }
  }

  share() {
    const length = this.state.numberShare;
    for (let i = 1; i <= length; i += 1) {
      const id = $(`.list-zone-share-${i}`).attr('id');
      const name = $(`#inputShareName-${i}`).val();
      const css = $(`#inputShareCSS-${i}`).val();
      const html = $(`#inputShareHTML-${i}`).val();
      const description = $(`#inputShareDescription-${i}`).val();
      if (id) {
        if (name && css && html) {
          this.props.updateZoneShare({ id, name, html, css, description }).then(() => {
            this.props.getZone(this.props.zoneId);
          });
        }
      } else if (!id) {
        if (name && css && html) {
          const zoneId = this.props.zoneId;
          this.props.createZoneShare({ name, html, css, description, zoneId }).then(() => {
            this.props.getZone(this.props.zoneId);
          });
          $(`.list-zone-share-${i}`).remove();
        }
      }
    }
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="box-body">
          <div className="row">
            <div className="col-lg-12" id="shareZoneForm">
              {this.props.zone && this.props.zone.shares
              && this.props.zone.shares.map((share, index) => (
                <ListZoneShareForm
                  key={share.id}
                  index={index + 1}
                  id={share.id}
                  childZone={share}
                />
              ))}
              {this.props.zone && this.state.arrShare.map((count) => (
                <ListZoneShareForm
                  index={count}
                  key={count}
                />
              ))}
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-2">
              <button type="button" id="createShareZone" className="btn btn-block btn-info btn-sm"> Create Share Zone</button>
            </div>
            <div className="col-sm-10">
              &nbsp;
            </div>
          </div>
        </div>
        {/* /.box-body */}
        <div className="box-footer">
          <Link
            to="/resource/zone"
            className="btn btn-app pull-right"
          >
            <i className="fa fa-undo" />
            Cancel
          </Link>
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.share(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
        {/* /.box-footer */}
      </form>
    );
  }
}

export default shareForm;
