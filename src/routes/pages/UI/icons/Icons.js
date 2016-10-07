import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import s from './Icons.css';

const pageTitle = 'Icons';
const pageSubTitle = 'a set of beautiful icons';

class Icons extends Component {

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>
          <div className="row">
            <div className="col-xs-12">
              <div className="nav-tabs-custom">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <Link to="#fa-icons" data-toggle="tab">Font Awesome</Link>
                  </li>
                  <li>
                    <Link to="#glyphicons" data-toggle="tab">Glyphicons</Link>
                  </li>
                </ul>
                <div className="tab-content">
                  { /* Font Awesome Icons */ }
                  <div className="tab-pane active" id="fa-icons">
                    <section id="new">
                      <h4 className="page-header">
                        66 New Icons in 4.4
                      </h4>
                      <div className="row fontawesome-icon-list">
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-500px"/>
                          fa-500px
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-amazon"/>
                          fa-amazon
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-balance-scale"/>
                          fa-balance-scale
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-battery-0"/>
                          fa-battery-0
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-battery-1"/>
                          fa-battery-1
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-battery-2"/>
                          fa-battery-2
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-battery-3"/>
                          fa-battery-3
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-battery-4"/>
                          fa-battery-4
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-battery-empty"/>
                          fa-battery-empty
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-battery-full"/>
                          fa-battery-full
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-battery-half"/>
                          fa-battery-half
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-battery-quarter"/>
                          fa-battery-quarter
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-battery-three-quarters"/>
                          fa-battery-three-quarters
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-black-tie"/>
                          fa-black-tie
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-calendar-check-o"/>
                          fa-calendar-check-o
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-calendar-minus-o"/>
                          fa-calendar-minus-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-calendar-plus-o"/>
                          fa-calendar-plus-o
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-calendar-times-o"/>
                          fa-calendar-times-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cc-diners-club"/>
                          fa-cc-diners-club
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cc-jcb"/>
                          fa-cc-jcb
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-chrome"/>
                          fa-chrome
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-clone"/>
                          fa-clone
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-commenting"/>
                          fa-commenting
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-commenting-o"/>
                          fa-commenting-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-contao"/>
                          fa-contao
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-creative-commons"/>
                          fa-creative-commons
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-expeditedssl"/>
                          fa-expeditedssl
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-firefox"/>
                          fa-firefox
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-fonticons"/>
                          fa-fonticons
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-genderless"/>
                          fa-genderless
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-get-pocket"/>
                          fa-get-pocket
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-gg"/>
                          fa-gg
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-gg-circle"/>
                          fa-gg-circle
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-grab-o"/>
                          fa-hand-grab-o
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-lizard-o"/>
                          fa-hand-lizard-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-paper-o"/>
                          fa-hand-paper-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-peace-o"/>
                          fa-hand-peace-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-pointer-o"/>
                          fa-hand-pointer-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-rock-o"/>
                          fa-hand-rock-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-scissors-o"/>
                          fa-hand-scissors-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-spock-o"/>
                          fa-hand-spock-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-stop-o"/>
                          fa-hand-stop-o
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hourglass"/>
                          fa-hourglass
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hourglass-1"/>
                          fa-hourglass-1
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hourglass-2"/>
                          fa-hourglass-2
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hourglass-3"/>
                          fa-hourglass-3
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hourglass-end"/>
                          fa-hourglass-end
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hourglass-half"/>
                          fa-hourglass-half
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hourglass-o"/>
                          fa-hourglass-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hourglass-start"/>
                          fa-hourglass-start
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-houzz"/>
                          fa-houzz
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-i-cursor"/>
                          fa-i-cursor
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-industry"/>
                          fa-industry
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-internet-explorer"/>
                          fa-internet-explorer
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-map"/>
                          fa-map
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-map-o"/>
                          fa-map-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-map-pin"/>
                          fa-map-pin
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-map-signs"/>
                          fa-map-signs
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-mouse-pointer"/>
                          fa-mouse-pointer
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-object-group"/>
                          fa-object-group
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-object-ungroup"/>
                          fa-object-ungroup
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-odnoklassniki"/>
                          fa-odnoklassniki
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-odnoklassniki-square"/>
                          fa-odnoklassniki-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-opencart"/>
                          fa-opencart
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-opera"/>
                          fa-opera
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-optin-monster"/>
                          fa-optin-monster
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-registered"/>
                          fa-registered
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-safari"/>
                          fa-safari
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-sticky-note"/>
                          fa-sticky-note
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-sticky-note-o"/>
                          fa-sticky-note-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-television"/>
                          fa-television
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-trademark"/>
                          fa-trademark
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-tripadvisor"/>
                          fa-tripadvisor
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-tv"/>
                          fa-tv
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-vimeo"/>
                          fa-vimeo
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-wikipedia-w"/>
                          fa-wikipedia-w
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-y-combinator"/>
                          fa-y-combinator
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-yc"/>
                          fa-yc
                          <span className="text-muted">(alias)</span>
                        </div>
                      </div>
                    </section>
                    <section id="web-application">
                      <h4 className="page-header">
                        Web Application Icons
                      </h4>
                      <div className="row fontawesome-icon-list">
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-adjust"/>
                          fa-adjust
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-anchor"/>
                          fa-anchor
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-archive"/>
                          fa-archive
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-area-chart"/>
                          fa-area-chart
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-arrows"/>
                          fa-arrows
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-arrows-h"/>
                          fa-arrows-h
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-arrows-v"/>
                          fa-arrows-v
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-asterisk"/>
                          fa-asterisk
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-at"/>
                          fa-at
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-automobile"/>
                          fa-automobile
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-balance-scale"/>
                          fa-balance-scale
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-ban"/>
                          fa-ban
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-bank"/>
                          fa-bank
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-bar-chart"/>
                          fa-bar-chart
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-bar-chart-o"/>
                          fa-bar-chart-o
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-barcode"/>
                          fa-barcode
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-bars"/>
                          fa-bars
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-battery-0"/>
                          fa-battery-0
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-battery-1"/>
                          fa-battery-1
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-battery-2"/>
                          fa-battery-2
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-battery-3"/>
                          fa-battery-3
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-battery-4"/>
                          fa-battery-4
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-battery-empty"/>
                          fa-battery-empty
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-battery-full"/>
                          fa-battery-full
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-battery-half"/>
                          fa-battery-half
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-battery-quarter"/>
                          fa-battery-quarter
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-battery-three-quarters"/>
                          fa-battery-three-quarters
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-bed"/>
                          fa-bed
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-beer"/>
                          fa-beer
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-bell"/>
                          fa-bell
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-bell-o"/>
                          fa-bell-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-bell-slash"/>
                          fa-bell-slash
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-bell-slash-o"/>
                          fa-bell-slash-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-bicycle"/>
                          fa-bicycle
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-binoculars"/>
                          fa-binoculars
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-birthday-cake"/>
                          fa-birthday-cake
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-bolt"/>
                          fa-bolt
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-bomb"/>
                          fa-bomb
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-book"/>
                          fa-book
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-bookmark"/>
                          fa-bookmark
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-bookmark-o"/>
                          fa-bookmark-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-briefcase"/>
                          fa-briefcase
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-bug"/>
                          fa-bug
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-building"/>
                          fa-building
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-building-o"/>
                          fa-building-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-bullhorn"/>
                          fa-bullhorn
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-bullseye"/>
                          fa-bullseye
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-bus"/>
                          fa-bus
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cab"/>
                          fa-cab
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-calculator"/>
                          fa-calculator
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-calendar"/>
                          fa-calendar
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-calendar-check-o"/>
                          fa-calendar-check-o
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-calendar-minus-o"/>
                          fa-calendar-minus-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-calendar-o"/>
                          fa-calendar-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-calendar-plus-o"/>
                          fa-calendar-plus-o
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-calendar-times-o"/>
                          fa-calendar-times-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-camera"/>
                          fa-camera
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-camera-retro"/>
                          fa-camera-retro
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-car"/>
                          fa-car
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-caret-square-o-down"/>
                          fa-caret-square-o-down
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-caret-square-o-left"/>
                          fa-caret-square-o-left
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-caret-square-o-right"/>
                          fa-caret-square-o-right
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-caret-square-o-up"/>
                          fa-caret-square-o-up
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cart-arrow-down"/>
                          fa-cart-arrow-down
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cart-plus"/>
                          fa-cart-plus
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cc"/>
                          fa-cc
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-certificate"/>
                          fa-certificate
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-check"/>
                          fa-check
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-check-circle"/>
                          fa-check-circle
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-check-circle-o"/>
                          fa-check-circle-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-check-square"/>
                          fa-check-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-check-square-o"/>
                          fa-check-square-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-child"/>
                          fa-child
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-circle"/>
                          fa-circle
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-circle-o"/>
                          fa-circle-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-circle-o-notch"/>
                          fa-circle-o-notch
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-circle-thin"/>
                          fa-circle-thin
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-clock-o"/>
                          fa-clock-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-clone"/>
                          fa-clone
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-close"/>
                          fa-close
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cloud"/>
                          fa-cloud
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cloud-download"/>
                          fa-cloud-download
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cloud-upload"/>
                          fa-cloud-upload
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-code"/>
                          fa-code
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-code-fork"/>
                          fa-code-fork
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-coffee"/>
                          fa-coffee
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cog"/>
                          fa-cog
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cogs"/>
                          fa-cogs
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-comment"/>
                          fa-comment
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-comment-o"/>
                          fa-comment-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-commenting"/>
                          fa-commenting
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-commenting-o"/>
                          fa-commenting-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-comments"/>
                          fa-comments
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-comments-o"/>
                          fa-comments-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-compass"/>
                          fa-compass
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-copyright"/>
                          fa-copyright
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-creative-commons"/>
                          fa-creative-commons
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-credit-card"/>
                          fa-credit-card
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-crop"/>
                          fa-crop
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-crosshairs"/>
                          fa-crosshairs
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cube"/>
                          fa-cube
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cubes"/>
                          fa-cubes
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cutlery"/>
                          fa-cutlery
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-dashboard"/>
                          fa-dashboard
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-database"/>
                          fa-database
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-desktop"/>
                          fa-desktop
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-diamond"/>
                          fa-diamond
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-dot-circle-o"/>
                          fa-dot-circle-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-download"/>
                          fa-download
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-edit"/>
                          fa-edit
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-ellipsis-h"/>
                          fa-ellipsis-h
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-ellipsis-v"/>
                          fa-ellipsis-v
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-envelope"/>
                          fa-envelope
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-envelope-o"/>
                          fa-envelope-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-envelope-square"/>
                          fa-envelope-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-eraser"/>
                          fa-eraser
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-exchange"/>
                          fa-exchange
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-exclamation"/>
                          fa-exclamation
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-exclamation-circle"/>
                          fa-exclamation-circle
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-exclamation-triangle"/>
                          fa-exclamation-triangle
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-external-link"/>
                          fa-external-link
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-external-link-square"/>
                          fa-external-link-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-eye"/>
                          fa-eye
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-eye-slash"/>
                          fa-eye-slash
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-eyedropper"/>
                          fa-eyedropper
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-fax"/>
                          fa-fax
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-feed"/>
                          fa-feed
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-female"/>
                          fa-female
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-fighter-jet"/>
                          fa-fighter-jet
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-archive-o"/>
                          fa-file-archive-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-audio-o"/>
                          fa-file-audio-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-code-o"/>
                          fa-file-code-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-excel-o"/>
                          fa-file-excel-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-image-o"/>
                          fa-file-image-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-movie-o"/>
                          fa-file-movie-o
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-pdf-o"/>
                          fa-file-pdf-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-photo-o"/>
                          fa-file-photo-o
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-picture-o"/>
                          fa-file-picture-o
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-file-powerpoint-o"/>
                          fa-file-powerpoint-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-sound-o"/>
                          fa-file-sound-o
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-video-o"/>
                          fa-file-video-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-word-o"/>
                          fa-file-word-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-zip-o"/>
                          fa-file-zip-o
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-film"/>
                          fa-film
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-filter"/>
                          fa-filter
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-fire"/>
                          fa-fire
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-fire-extinguisher"/>
                          fa-fire-extinguisher
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-flag"/>
                          fa-flag
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-flag-checkered"/>
                          fa-flag-checkered
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-flag-o"/>
                          fa-flag-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-flash"/>
                          fa-flash
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-flask"/>
                          fa-flask
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-folder"/>
                          fa-folder
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-folder-o"/>
                          fa-folder-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-folder-open"/>
                          fa-folder-open
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-folder-open-o"/>
                          fa-folder-open-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-frown-o"/>
                          fa-frown-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-futbol-o"/>
                          fa-futbol-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-gamepad"/>
                          fa-gamepad
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-gavel"/>
                          fa-gavel
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-gear"/>
                          fa-gear
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-gears"/>
                          fa-gears
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-gift"/>
                          fa-gift
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-glass"/>
                          fa-glass
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-globe"/>
                          fa-globe
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-graduation-cap"/>
                          fa-graduation-cap
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-group"/>
                          fa-group
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-grab-o"/>
                          fa-hand-grab-o
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-lizard-o"/>
                          fa-hand-lizard-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-paper-o"/>
                          fa-hand-paper-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-peace-o"/>
                          fa-hand-peace-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-pointer-o"/>
                          fa-hand-pointer-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-rock-o"/>
                          fa-hand-rock-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-scissors-o"/>
                          fa-hand-scissors-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-spock-o"/>
                          fa-hand-spock-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-stop-o"/>
                          fa-hand-stop-o
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hdd-o"/>
                          fa-hdd-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-headphones"/>
                          fa-headphones
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-heart"/>
                          fa-heart
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-heart-o"/>
                          fa-heart-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-heartbeat"/>
                          fa-heartbeat
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-history"/>
                          fa-history
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-home"/>
                          fa-home
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hotel"/>
                          fa-hotel
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hourglass"/>
                          fa-hourglass
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hourglass-1"/>
                          fa-hourglass-1
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hourglass-2"/>
                          fa-hourglass-2
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hourglass-3"/>
                          fa-hourglass-3
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hourglass-end"/>
                          fa-hourglass-end
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hourglass-half"/>
                          fa-hourglass-half
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hourglass-o"/>
                          fa-hourglass-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hourglass-start"/>
                          fa-hourglass-start
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-i-cursor"/>
                          fa-i-cursor
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-image"/>
                          fa-image
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-inbox"/>
                          fa-inbox
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-industry"/>
                          fa-industry
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-info"/>
                          fa-info
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-info-circle"/>
                          fa-info-circle
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-institution"/>
                          fa-institution
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-key"/>
                          fa-key
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-keyboard-o"/>
                          fa-keyboard-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-language"/>
                          fa-language
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-laptop"/>
                          fa-laptop
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-leaf"/>
                          fa-leaf
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-legal"/>
                          fa-legal
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-lemon-o"/>
                          fa-lemon-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-level-down"/>
                          fa-level-down
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-level-up"/>
                          fa-level-up
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-life-bouy"/>
                          fa-life-bouy
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-life-buoy"/>
                          fa-life-buoy
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-life-ring"/>
                          fa-life-ring
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-life-saver"/>
                          fa-life-saver
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-lightbulb-o"/>
                          fa-lightbulb-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-line-chart"/>
                          fa-line-chart
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-location-arrow"/>
                          fa-location-arrow
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-lock"/>
                          fa-lock
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-magic"/>
                          fa-magic
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-magnet"/>
                          fa-magnet
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-mail-forward"/>
                          fa-mail-forward
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-mail-reply"/>
                          fa-mail-reply
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-mail-reply-all"/>
                          fa-mail-reply-all
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-male"/>
                          fa-male
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-map"/>
                          fa-map
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-map-marker"/>
                          fa-map-marker
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-map-o"/>
                          fa-map-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-map-pin"/>
                          fa-map-pin
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-map-signs"/>
                          fa-map-signs
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-meh-o"/>
                          fa-meh-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-microphone"/>
                          fa-microphone
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-microphone-slash"/>
                          fa-microphone-slash
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-minus"/>
                          fa-minus
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-minus-circle"/>
                          fa-minus-circle
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-minus-square"/>
                          fa-minus-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-minus-square-o"/>
                          fa-minus-square-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-mobile"/>
                          fa-mobile
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-mobile-phone"/>
                          fa-mobile-phone
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-money"/>
                          fa-money
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-moon-o"/>
                          fa-moon-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-mortar-board"/>
                          fa-mortar-board
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-motorcycle"/>
                          fa-motorcycle
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-mouse-pointer"/>
                          fa-mouse-pointer
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-music"/>
                          fa-music
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-navicon"/>
                          fa-navicon
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-newspaper-o"/>
                          fa-newspaper-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-object-group"/>
                          fa-object-group
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-object-ungroup"/>
                          fa-object-ungroup
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-paint-brush"/>
                          fa-paint-brush
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-paper-plane"/>
                          fa-paper-plane
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-paper-plane-o"/>
                          fa-paper-plane-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-paw"/>
                          fa-paw
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-pencil"/>
                          fa-pencil
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-pencil-square"/>
                          fa-pencil-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-pencil-square-o"/>
                          fa-pencil-square-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-phone"/>
                          fa-phone
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-phone-square"/>
                          fa-phone-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-photo"/>
                          fa-photo
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-picture-o"/>
                          fa-picture-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-pie-chart"/>
                          fa-pie-chart
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-plane"/>
                          fa-plane
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-plug"/>
                          fa-plug
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-plus"/>
                          fa-plus
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-plus-circle"/>
                          fa-plus-circle
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-plus-square"/>
                          fa-plus-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-plus-square-o"/>
                          fa-plus-square-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-power-off"/>
                          fa-power-off
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-print"/>
                          fa-print
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-puzzle-piece"/>
                          fa-puzzle-piece
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-qrcode"/>
                          fa-qrcode
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-question"/>
                          fa-question
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-question-circle"/>
                          fa-question-circle
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-quote-left"/>
                          fa-quote-left
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-quote-right"/>
                          fa-quote-right
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-random"/>
                          fa-random
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-recycle"/>
                          fa-recycle
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-refresh"/>
                          fa-refresh
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-registered"/>
                          fa-registered
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-remove"/>
                          fa-remove
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-reorder"/>
                          fa-reorder
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-reply"/>
                          fa-reply
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-reply-all"/>
                          fa-reply-all
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-retweet"/>
                          fa-retweet
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-road"/>
                          fa-road
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-rocket"/>
                          fa-rocket
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-rss"/>
                          fa-rss
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-rss-square"/>
                          fa-rss-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-search"/>
                          fa-search
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-search-minus"/>
                          fa-search-minus
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-search-plus"/>
                          fa-search-plus
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-send"/>
                          fa-send
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-send-o"/>
                          fa-send-o
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-server"/>
                          fa-server
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-share"/>
                          fa-share
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-share-alt"/>
                          fa-share-alt
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-share-alt-square"/>
                          fa-share-alt-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-share-square"/>
                          fa-share-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-share-square-o"/>
                          fa-share-square-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-shield"/>
                          fa-shield
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-ship"/>
                          fa-ship
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-shopping-cart"/>
                          fa-shopping-cart
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-sign-in"/>
                          fa-sign-in
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-sign-out"/>
                          fa-sign-out
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-signal"/>
                          fa-signal
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-sitemap"/>
                          fa-sitemap
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-sliders"/>
                          fa-sliders
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-smile-o"/>
                          fa-smile-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-soccer-ball-o"/>
                          fa-soccer-ball-o
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-sort"/>
                          fa-sort
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-sort-alpha-asc"/>
                          fa-sort-alpha-asc
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-sort-alpha-desc"/>
                          fa-sort-alpha-desc
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-sort-amount-asc"/>
                          fa-sort-amount-asc
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-sort-amount-desc"/>
                          fa-sort-amount-desc
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-sort-asc"/>
                          fa-sort-asc
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-sort-desc"/>
                          fa-sort-desc
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-sort-down"/>
                          fa-sort-down
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-sort-numeric-asc"/>
                          fa-sort-numeric-asc
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-sort-numeric-desc"/>
                          fa-sort-numeric-desc
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-sort-up"/>
                          fa-sort-up
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-space-shuttle"/>
                          fa-space-shuttle
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-spinner"/>
                          fa-spinner
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-spoon"/>
                          fa-spoon
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-square"/>
                          fa-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-square-o"/>
                          fa-square-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-star"/>
                          fa-star
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-star-half"/>
                          fa-star-half
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-star-half-empty"/>
                          fa-star-half-empty
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-star-half-full"/>
                          fa-star-half-full
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-star-half-o"/>
                          fa-star-half-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-star-o"/>
                          fa-star-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-sticky-note"/>
                          fa-sticky-note
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-sticky-note-o"/>
                          fa-sticky-note-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-street-view"/>
                          fa-street-view
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-suitcase"/>
                          fa-suitcase
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-sun-o"/>
                          fa-sun-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-support"/>
                          fa-support
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-tablet"/>
                          fa-tablet
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-tachometer"/>
                          fa-tachometer
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-tag"/>
                          fa-tag
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-tags"/>
                          fa-tags
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-tasks"/>
                          fa-tasks
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-taxi"/>
                          fa-taxi
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-television"/>
                          fa-television
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-terminal"/>
                          fa-terminal
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-thumb-tack"/>
                          fa-thumb-tack
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-thumbs-down"/>
                          fa-thumbs-down
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-thumbs-o-down"/>
                          fa-thumbs-o-down
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-thumbs-o-up"/>
                          fa-thumbs-o-up
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-thumbs-up"/>
                          fa-thumbs-up
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-ticket"/>
                          fa-ticket
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-times"/>
                          fa-times
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-times-circle"/>
                          fa-times-circle
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-times-circle-o"/>
                          fa-times-circle-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-tint"/>
                          fa-tint
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-toggle-down"/>
                          fa-toggle-down
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-toggle-left"/>
                          fa-toggle-left
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-toggle-off"/>
                          fa-toggle-off
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-toggle-on"/>
                          fa-toggle-on
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-toggle-right"/>
                          fa-toggle-right
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-toggle-up"/>
                          fa-toggle-up
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-trademark"/>
                          fa-trademark
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-trash"/>
                          fa-trash
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-trash-o"/>
                          fa-trash-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-tree"/>
                          fa-tree
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-trophy"/>
                          fa-trophy
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-truck"/>
                          fa-truck
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-tty"/>
                          fa-tty
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-tv"/>
                          fa-tv
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-umbrella"/>
                          fa-umbrella
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-university"/>
                          fa-university
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-unlock"/>
                          fa-unlock
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-unlock-alt"/>
                          fa-unlock-alt
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-unsorted"/>
                          fa-unsorted
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-upload"/>
                          fa-upload
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-user"/>
                          fa-user
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-user-plus"/>
                          fa-user-plus
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-user-secret"/>
                          fa-user-secret
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-user-times"/>
                          fa-user-times
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-users"/>
                          fa-users
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-video-camera"/>
                          fa-video-camera
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-volume-down"/>
                          fa-volume-down
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-volume-off"/>
                          fa-volume-off
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-volume-up"/>
                          fa-volume-up
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-warning"/>
                          fa-warning
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-wheelchair"/>
                          fa-wheelchair
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-wifi"/>
                          fa-wifi
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-wrench"/>
                          fa-wrench
                        </div>
                      </div>
                    </section>
                    <section id="hand">
                      <h4 className="page-header">
                        Hand Icons
                      </h4>
                      <div className="row fontawesome-icon-list">
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-grab-o"/>
                          fa-hand-grab-o
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-lizard-o"/>
                          fa-hand-lizard-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-o-down"/>
                          fa-hand-o-down
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-o-left"/>
                          fa-hand-o-left
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-o-right"/>
                          fa-hand-o-right
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-o-up"/>
                          fa-hand-o-up
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-paper-o"/>
                          fa-hand-paper-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-peace-o"/>
                          fa-hand-peace-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-pointer-o"/>
                          fa-hand-pointer-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-rock-o"/>
                          fa-hand-rock-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-scissors-o"/>
                          fa-hand-scissors-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-spock-o"/>
                          fa-hand-spock-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-stop-o"/>
                          fa-hand-stop-o
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-thumbs-down"/>
                          fa-thumbs-down
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-thumbs-o-down"/>
                          fa-thumbs-o-down
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-thumbs-o-up"/>
                          fa-thumbs-o-up
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-thumbs-up"/>
                          fa-thumbs-up
                        </div>
                      </div>
                    </section>
                    <section id="transportation">
                      <h4 className="page-header">
                        Transportation Icons
                      </h4>
                      <div className="row fontawesome-icon-list">
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-ambulance"/>
                          fa-ambulance
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-automobile"/>
                          fa-automobile
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-bicycle"/>
                          fa-bicycle
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-bus"/>
                          fa-bus
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cab"/>
                          fa-cab
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-car"/>
                          fa-car
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-fighter-jet"/>
                          fa-fighter-jet
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-motorcycle"/>
                          fa-motorcycle
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-plane"/>
                          fa-plane
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-rocket"/>
                          fa-rocket
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-ship"/>
                          fa-ship
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-space-shuttle"/>
                          fa-space-shuttle
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-subway"/>
                          fa-subway
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-taxi"/>
                          fa-taxi
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-train"/>
                          fa-train
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-truck"/>
                          fa-truck
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-wheelchair"/>
                          fa-wheelchair
                        </div>
                      </div>
                    </section>
                    <section id="gender">
                      <h4 className="page-header">
                        Gender Icons
                      </h4>
                      <div className="row fontawesome-icon-list">
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-genderless"/>
                          fa-genderless
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-intersex"/>
                          fa-intersex
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-mars"/>
                          fa-mars
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-mars-double"/>
                          fa-mars-double
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-mars-stroke"/>
                          fa-mars-stroke
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-mars-stroke-h"/>
                          fa-mars-stroke-h
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-mars-stroke-v"/>
                          fa-mars-stroke-v
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-mercury"/>
                          fa-mercury
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-neuter"/>
                          fa-neuter
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-transgender"/>
                          fa-transgender
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-transgender-alt"/>
                          fa-transgender-alt
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-venus"/>
                          fa-venus
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-venus-double"/>
                          fa-venus-double
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-venus-mars"/>
                          fa-venus-mars
                        </div>
                      </div>
                    </section>
                    <section id="file-type">
                      <h2 className="page-header">
                        File Type Icons
                      </h2>
                      <div className="row fontawesome-icon-list">
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file"/>
                          fa-file
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-archive-o"/>
                          fa-file-archive-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-audio-o"/>
                          fa-file-audio-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-code-o"/>
                          fa-file-code-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-excel-o"/>
                          fa-file-excel-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-image-o"/>
                          fa-file-image-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-movie-o"/>
                          fa-file-movie-o
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-o"/>
                          fa-file-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-pdf-o"/>
                          fa-file-pdf-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-photo-o"/>
                          fa-file-photo-o
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-picture-o"/>
                          fa-file-picture-o
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-file-powerpoint-o"/>
                          fa-file-powerpoint-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-sound-o"/>
                          fa-file-sound-o
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-text"/>
                          fa-file-text
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-text-o"/>
                          fa-file-text-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-video-o"/>
                          fa-file-video-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-word-o"/>
                          fa-file-word-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-zip-o"/>
                          fa-file-zip-o
                          <span className="text-muted">(alias)</span>
                        </div>
                      </div>
                    </section>
                    <section id="spinner">
                      <h2 className="page-header">
                        Spinner Icons
                      </h2>
                      <div className="row fontawesome-icon-list">
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-circle-o-notch"/>
                          fa-circle-o-notch
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cog"/>
                          fa-cog
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-gear"/>
                          fa-gear
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-refresh"/>
                          fa-refresh
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-spinner"/>
                          fa-spinner
                        </div>
                      </div>
                    </section>
                    <section id="form-control">
                      <h4 className="page-header">
                        Form Control Icons
                      </h4>
                      <div className="row fontawesome-icon-list">
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-check-square"/>
                          fa-check-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-check-square-o"/>
                          fa-check-square-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-circle"/>
                          fa-circle
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-circle-o"/>
                          fa-circle-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-dot-circle-o"/>
                          fa-dot-circle-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-minus-square"/>
                          fa-minus-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-minus-square-o"/>
                          fa-minus-square-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-plus-square"/>
                          fa-plus-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-plus-square-o"/>
                          fa-plus-square-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-square"/>
                          fa-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-square-o"/>
                          fa-square-o
                        </div>
                      </div>
                    </section>
                    <section id="payment">
                      <h4 className="page-header">
                        Payment Icons
                      </h4>
                      <div className="row fontawesome-icon-list">
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cc-amex"/>
                          fa-cc-amex
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cc-diners-club"/>
                          fa-cc-diners-club
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cc-discover"/>
                          fa-cc-discover
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cc-jcb"/>
                          fa-cc-jcb
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cc-mastercard"/>
                          fa-cc-mastercard
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cc-paypal"/>
                          fa-cc-paypal
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cc-stripe"/>
                          fa-cc-stripe
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cc-visa"/>
                          fa-cc-visa
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-credit-card"/>
                          fa-credit-card
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-google-wallet"/>
                          fa-google-wallet
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-paypal"/>
                          fa-paypal
                        </div>
                      </div>
                    </section>
                    <section id="chart">
                      <h4 className="page-header">
                        Chart Icons
                      </h4>
                      <div className="row fontawesome-icon-list">
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-area-chart"/>
                          fa-area-chart
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-bar-chart"/>
                          fa-bar-chart
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-bar-chart-o"/>
                          fa-bar-chart-o
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-line-chart"/>
                          fa-line-chart
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-pie-chart"/>
                          fa-pie-chart
                        </div>
                      </div>
                    </section>
                    <section id="currency">
                      <h4 className="page-header">
                        Currency Icons
                      </h4>
                      <div className="row fontawesome-icon-list">
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-bitcoin"/>
                          fa-bitcoin
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-btc"/>
                          fa-btc
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cny"/>
                          fa-cny
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-dollar"/>
                          fa-dollar
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-eur"/>
                          fa-eur
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-euro"/>
                          fa-euro
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-gbp"/>
                          fa-gbp
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-gg"/>
                          fa-gg
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-gg-circle"/>
                          fa-gg-circle
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-ils"/>
                          fa-ils
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-inr"/>
                          fa-inr
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-jpy"/>
                          fa-jpy
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-krw"/>
                          fa-krw
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-money"/>
                          fa-money
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-rmb"/>
                          fa-rmb
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-rouble"/>
                          fa-rouble
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-rub"/>
                          fa-rub
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-ruble"/>
                          fa-ruble
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-rupee"/>
                          fa-rupee
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-shekel"/>
                          fa-shekel
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-sheqel"/>
                          fa-sheqel
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-try"/>
                          fa-try
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-turkish-lira"/>
                          fa-turkish-lira
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-usd"/>
                          fa-usd
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-won"/>
                          fa-won
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-yen"/>
                          fa-yen
                          <span className="text-muted">(alias)</span>
                        </div>
                      </div>
                    </section>
                    <section id="text-editor">
                      <h4 className="page-header">
                        Text Editor Icons
                      </h4>
                      <div className="row fontawesome-icon-list">
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-align-center"/>
                          fa-align-center
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-align-justify"/>
                          fa-align-justify
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-align-left"/>
                          fa-align-left
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-align-right"/>
                          fa-align-right
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-bold"/>
                          fa-bold
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-chain"/>
                          fa-chain
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-chain-broken"/>
                          fa-chain-broken
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-clipboard"/>
                          fa-clipboard
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-columns"/>
                          fa-columns
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-copy"/>
                          fa-copy
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cut"/>
                          fa-cut
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-dedent"/>
                          fa-dedent
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-eraser"/>
                          fa-eraser
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file"/>
                          fa-file
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-o"/>
                          fa-file-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-text"/>
                          fa-file-text
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-file-text-o"/>
                          fa-file-text-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-files-o"/>
                          fa-files-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-floppy-o"/>
                          fa-floppy-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-font"/>
                          fa-font
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-header"/>
                          fa-header
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-indent"/>
                          fa-indent
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-italic"/>
                          fa-italic
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-link"/>
                          fa-link
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-list"/>
                          fa-list
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-list-alt"/>
                          fa-list-alt
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-list-ol"/>
                          fa-list-ol
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-list-ul"/>
                          fa-list-ul
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-outdent"/>
                          fa-outdent
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-paperclip"/>
                          fa-paperclip
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-paragraph"/>
                          fa-paragraph
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-paste"/>
                          fa-paste
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-repeat"/>
                          fa-repeat
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-rotate-left"/>
                          fa-rotate-left
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-rotate-right"/>
                          fa-rotate-right
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-save"/>
                          fa-save
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-scissors"/>
                          fa-scissors
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-strikethrough"/>
                          fa-strikethrough
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-subscript"/>
                          fa-subscript
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-superscript"/>
                          fa-superscript
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-table"/>
                          fa-table
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-text-height"/>
                          fa-text-height
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-text-width"/>
                          fa-text-width
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-th"/>
                          fa-th
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-th-large"/>
                          fa-th-large
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-th-list"/>
                          fa-th-list
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-underline"/>
                          fa-underline
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-undo"/>
                          fa-undo
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-unlink"/>
                          fa-unlink
                          <span className="text-muted">(alias)</span>
                        </div>
                      </div>
                    </section>
                    <section id="directional">
                      <h4 className="page-header">
                        Directional Icons
                      </h4>
                      <div className="row fontawesome-icon-list">
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-angle-double-down"/>
                          fa-angle-double-down
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-angle-double-left"/>
                          fa-angle-double-left
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-angle-double-right"/>
                          fa-angle-double-right
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-angle-double-up"/>
                          fa-angle-double-up
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-angle-down"/>
                          fa-angle-down
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-angle-left"/>
                          fa-angle-left
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-angle-right"/>
                          fa-angle-right
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-angle-up"/>
                          fa-angle-up
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-arrow-circle-down"/>
                          fa-arrow-circle-down
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-arrow-circle-left"/>
                          fa-arrow-circle-left
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-arrow-circle-o-down"/>
                          fa-arrow-circle-o-down
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-arrow-circle-o-left"/>
                          fa-arrow-circle-o-left
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-arrow-circle-o-right"/>
                          fa-arrow-circle-o-right
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-arrow-circle-o-up"/>
                          fa-arrow-circle-o-up
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-arrow-circle-right"/>
                          fa-arrow-circle-right
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-arrow-circle-up"/>
                          fa-arrow-circle-up
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-arrow-down"/>
                          fa-arrow-down
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-arrow-left"/>
                          fa-arrow-left
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-arrow-right"/>
                          fa-arrow-right
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-arrow-up"/>
                          fa-arrow-up
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-arrows"/>
                          fa-arrows
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-arrows-alt"/>
                          fa-arrows-alt
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-arrows-h"/>
                          fa-arrows-h
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-arrows-v"/>
                          fa-arrows-v
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-caret-down"/>
                          fa-caret-down
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-caret-left"/>
                          fa-caret-left
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-caret-right"/>
                          fa-caret-right
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-caret-square-o-down"/>
                          fa-caret-square-o-down
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-caret-square-o-left"/>
                          fa-caret-square-o-left
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-caret-square-o-right"/>
                          fa-caret-square-o-right
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-caret-square-o-up"/>
                          fa-caret-square-o-up
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-caret-up"/>
                          fa-caret-up
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-chevron-circle-down"/>
                          fa-chevron-circle-down
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-chevron-circle-left"/>
                          fa-chevron-circle-left
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-chevron-circle-right"/>
                          fa-chevron-circle-right
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-chevron-circle-up"/>
                          fa-chevron-circle-up
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-chevron-down"/>
                          fa-chevron-down
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-chevron-left"/>
                          fa-chevron-left
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-chevron-right"/>
                          fa-chevron-right
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-chevron-up"/>
                          fa-chevron-up
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-exchange"/>
                          fa-exchange
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-o-down"/>
                          fa-hand-o-down
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-o-left"/>
                          fa-hand-o-left
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-o-right"/>
                          fa-hand-o-right
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hand-o-up"/>
                          fa-hand-o-up
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-long-arrow-down"/>
                          fa-long-arrow-down
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-long-arrow-left"/>
                          fa-long-arrow-left
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-long-arrow-right"/>
                          fa-long-arrow-right
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-long-arrow-up"/>
                          fa-long-arrow-up
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-toggle-down"/>
                          fa-toggle-down
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-toggle-left"/>
                          fa-toggle-left
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-toggle-right"/>
                          fa-toggle-right
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-toggle-up"/>
                          fa-toggle-up
                          <span className="text-muted">(alias)</span>
                        </div>
                      </div>
                    </section>
                    <section id="video-player">
                      <h4 className="page-header">
                        Video Player Icons
                      </h4>
                      <div className="row fontawesome-icon-list">
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-arrows-alt"/>
                          fa-arrows-alt
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-backward"/>
                          fa-backward
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-compress"/>
                          fa-compress
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-eject"/>
                          fa-eject
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-expand"/>
                          fa-expand
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-fast-backward"/>
                          fa-fast-backward
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-fast-forward"/>
                          fa-fast-forward
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-forward"/>
                          fa-forward
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-pause"/>
                          fa-pause
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-play"/>
                          fa-play
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-play-circle"/>
                          fa-play-circle
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-play-circle-o"/>
                          fa-play-circle-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-random"/>
                          fa-random
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-step-backward"/>
                          fa-step-backward
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-step-forward"/>
                          fa-step-forward
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-stop"/>
                          fa-stop
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-youtube-play"/>
                          fa-youtube-play
                        </div>
                      </div>
                    </section>
                    <section id="brand">
                      <h4 className="page-header">
                        Brand Icons
                      </h4>
                      <div className="alert alert-info">
                        <ul className="margin-bottom-none padding-left-lg">
                          <li>
                            All brand icons are trademarks of their respective owners.
                          </li>
                          <li>The use of these trademarks does not indicate endorsement of the
                            trademark holder by Font Awesome, nor vice versa.
                          </li>
                        </ul>
                      </div>
                      <div className="row fontawesome-icon-list">
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-500px"/>
                          fa-500px
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-adn"/>
                          fa-adn
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-amazon"/>
                          fa-amazon
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-android"/>
                          fa-android
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-angellist"/>
                          fa-angellist
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-apple"/>
                          fa-apple
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-behance"/>
                          fa-behance
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-behance-square"/>
                          fa-behance-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-bitbucket"/>
                          fa-bitbucket
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-bitbucket-square"/>
                          fa-bitbucket-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-bitcoin"/>
                          fa-bitcoin
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-black-tie"/>
                          fa-black-tie
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-btc"/>
                          fa-btc
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-buysellads"/>
                          fa-buysellads
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cc-amex"/>
                          fa-cc-amex
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cc-diners-club"/>
                          fa-cc-diners-club
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cc-discover"/>
                          fa-cc-discover
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cc-jcb"/>
                          fa-cc-jcb
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cc-mastercard"/>
                          fa-cc-mastercard
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cc-paypal"/>
                          fa-cc-paypal
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cc-stripe"/>
                          fa-cc-stripe
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-cc-visa"/>
                          fa-cc-visa
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-chrome"/>
                          fa-chrome
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-codepen"/>
                          fa-codepen
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-connectdevelop"/>
                          fa-connectdevelop
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-contao"/>
                          fa-contao
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-css3"/>
                          fa-css3
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-dashcube"/>
                          fa-dashcube
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-delicious"/>
                          fa-delicious
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-deviantart"/>
                          fa-deviantart
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-digg"/>
                          fa-digg
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-dribbble"/>
                          fa-dribbble
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-dropbox"/>
                          fa-dropbox
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-drupal"/>
                          fa-drupal
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-empire"/>
                          fa-empire
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-expeditedssl"/>
                          fa-expeditedssl
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-facebook"/>
                          fa-facebook
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-facebook-f"/>
                          fa-facebook-f
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-facebook-official"/>
                          fa-facebook-official
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-facebook-square"/>
                          fa-facebook-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-firefox"/>
                          fa-firefox
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-flickr"/>
                          fa-flickr
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-fonticons"/>
                          fa-fonticons
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-forumbee"/>
                          fa-forumbee
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-foursquare"/>
                          fa-foursquare
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-ge"/>
                          fa-ge
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-get-pocket"/>
                          fa-get-pocket
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-gg"/>
                          fa-gg
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-gg-circle"/>
                          fa-gg-circle
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-git"/>
                          fa-git
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-git-square"/>
                          fa-git-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-github"/>
                          fa-github
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-github-alt"/>
                          fa-github-alt
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-github-square"/>
                          fa-github-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-gittip"/>
                          fa-gittip
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-google"/>
                          fa-google
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-google-plus"/>
                          fa-google-plus
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-google-plus-square"/>
                          fa-google-plus-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-google-wallet"/>
                          fa-google-wallet
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-gratipay"/>
                          fa-gratipay
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hacker-news"/>
                          fa-hacker-news
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-houzz"/>
                          fa-houzz
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-html5"/>
                          fa-html5
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-instagram"/>
                          fa-instagram
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-internet-explorer"/>
                          fa-internet-explorer
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-ioxhost"/>
                          fa-ioxhost
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-joomla"/>
                          fa-joomla
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-jsfiddle"/>
                          fa-jsfiddle
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-lastfm"/>
                          fa-lastfm
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-lastfm-square"/>
                          fa-lastfm-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-leanpub"/>
                          fa-leanpub
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-linkedin"/>
                          fa-linkedin
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-linkedin-square"/>
                          fa-linkedin-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-linux"/>
                          fa-linux
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-maxcdn"/>
                          fa-maxcdn
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-meanpath"/>
                          fa-meanpath
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-medium"/>
                          fa-medium
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-odnoklassniki"/>
                          fa-odnoklassniki
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-odnoklassniki-square"/>
                          fa-odnoklassniki-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-opencart"/>
                          fa-opencart
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-openid"/>
                          fa-openid
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-opera"/>
                          fa-opera
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-optin-monster"/>
                          fa-optin-monster
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-pagelines"/>
                          fa-pagelines
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-paypal"/>
                          fa-paypal
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-pied-piper"/>
                          fa-pied-piper
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-pied-piper-alt"/>
                          fa-pied-piper-alt
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-pinterest"/>
                          fa-pinterest
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-pinterest-p"/>
                          fa-pinterest-p
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-pinterest-square"/>
                          fa-pinterest-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-qq"/>
                          fa-qq
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-ra"/>
                          fa-ra
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-rebel"/>
                          fa-rebel
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-reddit"/>
                          fa-reddit
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-reddit-square"/>
                          fa-reddit-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-renren"/>
                          fa-renren
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-safari"/>
                          fa-safari
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-sellsy"/>
                          fa-sellsy
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-share-alt"/>
                          fa-share-alt
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-share-alt-square"/>
                          fa-share-alt-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-shirtsinbulk"/>
                          fa-shirtsinbulk
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-simplybuilt"/>
                          fa-simplybuilt
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-skyatlas"/>
                          fa-skyatlas
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-skype"/>
                          fa-skype
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-slack"/>
                          fa-slack
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-slideshare"/>
                          fa-slideshare
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-soundcloud"/>
                          fa-soundcloud
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-spotify"/>
                          fa-spotify
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-stack-exchange"/>
                          fa-stack-exchange
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-stack-overflow"/>
                          fa-stack-overflow
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-steam"/>
                          fa-steam
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-steam-square"/>
                          fa-steam-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-stumbleupon"/>
                          fa-stumbleupon
                        </div>
                        <div className="col-md-3 col-sm-4"><i
                          className="fa fa-fw fa-stumbleupon-circle"/>
                          fa-stumbleupon-circle
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-tencent-weibo"/>
                          fa-tencent-weibo
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-trello"/>
                          fa-trello
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-tripadvisor"/>
                          fa-tripadvisor
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-tumblr"/>
                          fa-tumblr
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-tumblr-square"/>
                          fa-tumblr-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-twitch"/>
                          fa-twitch
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-twitter"/>
                          fa-twitter
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-twitter-square"/>
                          fa-twitter-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-viacoin"/>
                          fa-viacoin
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-vimeo"/>
                          fa-vimeo
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-vimeo-square"/>
                          fa-vimeo-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-vine"/>
                          fa-vine
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-vk"/>
                          fa-vk
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-wechat"/>
                          fa-wechat
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-weibo"/>
                          fa-weibo
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-weixin"/>
                          fa-weixin
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-whatsapp"/>
                          fa-whatsapp
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-wikipedia-w"/>
                          fa-wikipedia-w
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-windows"/>
                          fa-windows
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-wordpress"/>
                          fa-wordpress
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-xing"/>
                          fa-xing
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-xing-square"/>
                          fa-xing-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-y-combinator"/>
                          fa-y-combinator
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-y-combinator-square"/>
                          fa-y-combinator-square
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-yahoo"/>
                          fa-yahoo
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-yc"/>
                          fa-yc
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-yc-square"/>
                          fa-yc-square
                          <span className="text-muted">(alias)</span>
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-yelp"/>
                          fa-yelp
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-youtube"/>
                          fa-youtube
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-youtube-play"/>
                          fa-youtube-play
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-youtube-square"/>
                          fa-youtube-square
                        </div>
                      </div>
                    </section>
                    <section id="medical">
                      <h4 className="page-header">
                        Medical Icons
                      </h4>
                      <div className="row">
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-ambulance"/>
                          fa-ambulance
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-h-square"/>
                          fa-h-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-heart"/>
                          fa-heart
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-heart-o"/>
                          fa-heart-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-heartbeat"/>
                          fa-heartbeat
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-hospital-o"/>
                          fa-hospital-o
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-medkit"/>
                          fa-medkit
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-plus-square"/>
                          fa-plus-square
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-stethoscope"/>
                          fa-stethoscope
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-user-md"/>
                          fa-user-md
                        </div>
                        <div className="col-md-3 col-sm-4">
                          <i className="fa fa-fw fa-wheelchair"/>
                          fa-wheelchair
                        </div>
                      </div>
                    </section>
                  </div>
                  { /* /#fa-icons */ }
                  { /* glyphicons*/ }
                  <div className="tab-pane" id="glyphicons">
                    <ul className="bs-glyphicons">
                      <li>
                        <span className="glyphicon glyphicon-asterisk"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-asterisk
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-plus"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-plus
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-euro"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-euro
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-eur"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-eur
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-minus"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-minus
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-cloud"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-cloud
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-envelope"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-envelope
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-pencil"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-pencil
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-glass"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-glass
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-music"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-music
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-search"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-search
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-heart"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-heart
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-star"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-star
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-star-empty"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-star-empty
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-user"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-user
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-film"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-film
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-th-large"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-th-large
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-th"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-th
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-th-list"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-th-list
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-ok"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-ok
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-remove"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-remove
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-zoom-in"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-zoom-in
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-zoom-out"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-zoom-out
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-off"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-off
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-signal"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-signal
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-cog"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-cog
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-trash"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-trash
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-home"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-home
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-file"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-file
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-time"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-time
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-road"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-road
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-download-alt"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-download-alt
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-download"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-download
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-upload"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-upload
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-inbox"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-inbox
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-play-circle"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-play-circle
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-repeat"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-repeat
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-refresh"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-refresh
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-list-alt"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-list-alt
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-lock"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-lock
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-flag"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-flag
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-headphones"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-headphones
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-volume-off"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-volume-off
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-volume-down"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-volume-down
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-volume-up"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-volume-up
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-qrcode"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-qrcode
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-barcode"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-barcode
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-tag"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-tag
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-tags"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-tags
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-book"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-book
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-bookmark"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-bookmark
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-print"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-print
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-camera"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-camera
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-font"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-font
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-bold"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-bold
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-italic"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-italic
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-text-height"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-text-height
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-text-width"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-text-width
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-align-left"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-align-left
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-align-center"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-align-center
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-align-right"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-align-right
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-align-justify"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-align-justify
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-list"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-list
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-indent-left"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-indent-left
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-indent-right"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-indent-right
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-facetime-video"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-facetime-video
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-picture"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-picture
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-map-marker"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-map-marker
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-adjust"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-adjust
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-tint"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-tint
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-edit"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-edit
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-share"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-share
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-check"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-check
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-move"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-move
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-step-backward"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-step-backward
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-fast-backward"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-fast-backward
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-backward"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-backward
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-play"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-play
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-pause"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-pause
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-stop"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-stop
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-forward"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-forward
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-fast-forward"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-fast-forward
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-step-forward"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-step-forward
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-eject"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-eject
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-chevron-left"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-chevron-left
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-chevron-right"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-chevron-right
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-plus-sign"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-plus-sign
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-minus-sign"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-minus-sign
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-remove-sign"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-remove-sign
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-ok-sign"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-ok-sign
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-question-sign"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-question-sign
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-info-sign"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-info-sign
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-screenshot"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-screenshot
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-remove-circle"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-remove-circle
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-ok-circle"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-ok-circle
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-ban-circle"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-ban-circle
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-arrow-left"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-arrow-left
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-arrow-right"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-arrow-right
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-arrow-up"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-arrow-up
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-arrow-down"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-arrow-down
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-share-alt"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-share-alt
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-resize-full"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-resize-full
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-resize-small"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-resize-small
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-exclamation-sign"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-exclamation-sign
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-gift"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-gift
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-leaf"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-leaf
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-fire"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-fire
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-eye-open"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-eye-open
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-eye-close"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-eye-close
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-warning-sign"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-warning-sign
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-plane"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-plane
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-calendar"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-calendar
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-random"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-random
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-comment"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-comment
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-magnet"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-magnet
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-chevron-up"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-chevron-up
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-chevron-down"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-chevron-down
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-retweet"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-retweet
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-shopping-cart"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-shopping-cart
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-folder-close"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-folder-close
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-folder-open"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-folder-open
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-resize-vertical"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-resize-vertical
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-resize-horizontal"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-resize-horizontal
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-hdd"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-hdd
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-bullhorn"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-bullhorn
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-bell"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-bell
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-certificate"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-certificate
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-thumbs-up"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-thumbs-up
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-thumbs-down"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-thumbs-down
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-hand-right"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-hand-right
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-hand-left"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-hand-left
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-hand-up"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-hand-up
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-hand-down"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-hand-down
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-circle-arrow-right"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-circle-arrow-right
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-circle-arrow-left"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-circle-arrow-left
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-circle-arrow-up"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-circle-arrow-up
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-circle-arrow-down"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-circle-arrow-down
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-globe"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-globe
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-wrench"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-wrench
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-tasks"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-tasks
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-filter"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-filter
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-briefcase"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-briefcase
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-fullscreen"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-fullscreen
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-dashboard"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-dashboard
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-paperclip"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-paperclip
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-heart-empty"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-heart-empty
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-link"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-link
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-phone"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-phone
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-pushpin"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-pushpin
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-usd"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-usd
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-gbp"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-gbp
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-sort"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-sort
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-sort-by-alphabet"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-sort-by-alphabet
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-sort-by-alphabet-alt"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-sort-by-alphabet-alt
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-sort-by-order"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-sort-by-order
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-sort-by-order-alt"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-sort-by-order-alt
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-sort-by-attributes"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-sort-by-attributes
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-sort-by-attributes-alt"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-sort-by-attributes-alt
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-unchecked"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-unchecked
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-expand"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-expand
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-collapse-down"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-collapse-down
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-collapse-up"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-collapse-up
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-log-in"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-log-in
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-flash"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-flash
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-log-out"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-log-out
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-new-window"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-new-window
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-record"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-record
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-save"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-save
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-open"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-open
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-saved"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-saved
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-import"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-import
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-export"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-export
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-send"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-send
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-floppy-disk"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-floppy-disk
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-floppy-saved"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-floppy-saved
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-floppy-remove"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-floppy-remove
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-floppy-save"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-floppy-save
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-floppy-open"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-floppy-open
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-credit-card"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-credit-card
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-transfer"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-transfer
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-cutlery"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-cutlery
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-header"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-header
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-compressed"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-compressed
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-earphone"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-earphone
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-phone-alt"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-phone-alt
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-tower"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-tower
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-stats"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-stats
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-sd-video"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-sd-video
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-hd-video"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-hd-video
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-subtitles"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-subtitles
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-sound-stereo"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-sound-stereo
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-sound-dolby"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-sound-dolby
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-sound-5-1"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-sound-5-1
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-sound-6-1"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-sound-6-1
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-sound-7-1"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-sound-7-1
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-copyright-mark"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-copyright-mark
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-registration-mark"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-registration-mark
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-cloud-download"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-cloud-download
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-cloud-upload"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-cloud-upload
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-tree-conifer"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-tree-conifer
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-tree-deciduous"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-tree-deciduous
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-cd"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-cd
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-save-file"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-save-file
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-open-file"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-open-file
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-level-up"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-level-up
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-copy"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-copy
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-paste"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-paste
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-alert"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-alert
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-equalizer"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-equalizer
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-king"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-king
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-queen"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-queen
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-pawn"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-pawn
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-bishop"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-bishop
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-knight"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-knight
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-baby-formula"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-baby-formula
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-tent"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-tent
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-blackboard"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-blackboard
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-bed"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-bed
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-apple"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-apple
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-erase"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-erase
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-hourglass"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-hourglass
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-lamp"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-lamp
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-duplicate"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-duplicate
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-piggy-bank"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-piggy-bank
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-scissors"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-scissors
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-bitcoin"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-bitcoin
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-btc"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-btc
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-xbt"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-xbt
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-yen"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-yen
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-jpy"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-jpy
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-ruble"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-ruble
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-rub"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-rub
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-scale"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-scale
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-ice-lolly"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-ice-lolly
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-ice-lolly-tasted"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-ice-lolly-tasted
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-education"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-education
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-option-horizontal"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-option-horizontal
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-option-vertical"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-option-vertical
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-hamburger"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-menu-hamburger
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-modal-window"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-modal-window
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-oil"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-oil
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-grain"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-grain
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-sunglasses"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-sunglasses
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-text-size"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-text-size
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-text-color"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-text-color
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-text-background"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-text-background
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-object-align-top"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-object-align-top
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-object-align-bottom"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-object-align-bottom
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-object-align-horizontal"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-object-align-horizontal
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-object-align-left"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-object-align-left
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-object-align-vertical"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-object-align-vertical
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-object-align-right"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-object-align-right
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-triangle-right"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-triangle-right
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-triangle-left"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-triangle-left
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-triangle-bottom"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-triangle-bottom
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-triangle-top"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-triangle-top
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-console"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-console
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-superscript"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-superscript
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-subscript"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-subscript
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-left"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-menu-left
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-menu-right
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-down"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-menu-down
                      </span>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-up"/>
                        <span className="glyphicon-class">
                        glyphicon glyphicon-menu-up
                      </span>
                      </li>
                    </ul>
                  </div>
                  { /* /#ion-icons */ }
                </div>
                { /* /.tab-content */ }
              </div>
              { /* /.nav-tabs-custom */ }
            </div>
            { /* /.col */ }
          </div>
          { /* /.row */ }
        </div>
      </Layout>
    );
  }

}

export default withStyles(s)(Icons);
