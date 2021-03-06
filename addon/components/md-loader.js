import Ember from 'ember';
import UsesSettings from '../mixins/uses-settings';
import layout from '../templates/components/md-loader';

const {
  Component,
  computed,
  computed: {
    oneWay
  },
  A,
  String: {
    htmlSafe
  }
} = Ember;

export default Component.extend(UsesSettings, {
  layout,

  classNameBindings: ['isBarType:progress:preloader-wrapper', 'active:active', 'size'],

  mode: oneWay('_mdSettings.loaderMode'),
  percent: 0,
  size: oneWay('_mdSettings.loaderSize'),
  active: true,
  color: null,

  isBarType: computed('mode', function() {
    return ['determinate', 'indeterminate'].indexOf(this.get('mode')) >= 0;
  }),

  isDeterminate: computed('mode', function() {
    return ['determinate'].indexOf(this.get('mode'));
  }),

  barStyle: computed('mode', 'percent', function() {
    if (this.get('mode') === 'determinate') {
      return htmlSafe(`width: ${parseInt(this.get('percent'), 10)}%`);
    } else {
      return htmlSafe('');
    }
  }),

  barClassName: computed('isBarType', 'mode', function() {
    return this.get('isBarType') ? this.get('mode') : null;
  }),

  spinnerClassNames: computed('color', 'isBarType', function() {
    if (!this.get('isBarType')) {
      const color = this.get('color');
      if (!color) {
        return A(['blue', 'red', 'green', 'yellow']
          .map(c => (`spinner-layer spinner-${c}`)));
      } else {
        return A([`spinner-layer spinner-${color}-only`]);
      }
    } else {
      return A();
    }
  })
});