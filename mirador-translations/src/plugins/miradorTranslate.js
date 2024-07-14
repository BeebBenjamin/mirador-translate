import MiradorTranslate from './MiradorTranslate';
import { rootSaga } from './state/sagas';

export default [
  {
    target: 'WindowSideBarAnnotationsPanel',
    mapStateToProps: function mapStateToProps(state) {
      return {
        state: state,
      };
    },
    saga: rootSaga,
    mode: 'add',
    component: MiradorTranslate,
  },
];
