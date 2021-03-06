// Generated by CoffeeScript 1.10.0
var React, moment;

React = require('react');

moment = require('moment');

module.exports = React.createClass({
  displayName: 'DateTime',
  propTypes: {
    date: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string, React.PropTypes.object]).isRequired,
    format: React.PropTypes.string,
    label: React.PropTypes.string,
    relative: React.PropTypes.oneOfType([
      React.PropTypes.bool, React.PropTypes.number, React.PropTypes.shape({
        days: React.PropTypes.number
      }), React.PropTypes.shape({
        hours: React.PropTypes.number
      })
    ])
  },
  getDefaultProps: function() {
    return {
      format: 'YYYY-M-D',
      relative: null
    };
  },
  render: function() {
    var _date, _m_date, cutoff, date, date_str, date_title;
    if (this.props.date) {
      _date = new Date(this.props.date);
      _m_date = moment(_date);
      if ((this.props.relative != null) && this.props.relative !== false) {
        if (this.props.relative.days) {
          cutoff = this.props.relative.days * 1000 * 60 * 60 * 24;
        } else if (this.props.relative.hours) {
          cutoff = this.props.relative.hours * 1000 * 60 * 60;
        } else if (this.props.relative === true) {
          cutoff = Infinity;
        } else {
          cutoff = this.props.relative;
        }
        if ((new Date() - _date) < cutoff) {
          date_str = _m_date.fromNow();
        }
      }
      if (date_str == null) {
        date_str = _m_date.format(this.props.format);
      }
      if (this.props.title_format) {
        date_title = _m_date.format(this.props.title_format);
      }
      date = _date.toISOString();
    }
    return React.createElement("span", {
      "className": 'DateTime',
      "title": date_title
    }, React.createElement("span", {
      "className": '_Label'
    }, this.props.label), React.createElement("time", {
      "className": '_Date',
      "dateTime": date
    }, date_str));
  }
});
