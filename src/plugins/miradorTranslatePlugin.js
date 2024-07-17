import MiradorTranslate from './MiradorTranslate';
import { getCurrentCanvas } from 'mirador/dist/es/src/state/selectors';
import * as actions from 'mirador/dist/es/src/state/actions';
import * as pluginActions from './state/actions';
import { rootSaga } from 'mirador-translate/src/plugins/state/sagas';
import { updateAnnotationsReducer } from './state/reducers';

const getAnnotationId = (state, windowId) => {
  const canvasId = getCurrentCanvas(state, { windowId }).id;
  const languageSwap = '/en/';
  const languageRoute = '/ar/';
  const annotation = state.annotations[canvasId];
  if (annotation) {
    let annotationId = Object.keys(state.annotations[canvasId])[0];
    annotationId = annotationId.replace(languageSwap, languageRoute);
    return annotationId;
  } else {
    return null;
  }
};

const mapDispatchToProps = (dispatch, props) => ({
  addCompanionWindow: (content, additionalProps) =>
    dispatch(
      actions.addCompanionWindow(props.targetProps.windowId, {
        content,
        ...additionalProps,
      })
    ),
  updateAnnotations: (targetId, annotationId, annotationJson) =>
    dispatch(
      pluginActions.updateAnnotations(targetId, annotationId, annotationJson)
    ),
});

const mapStateToProps = (state, { targetProps: { windowId } }) => ({
  config: state.config,
  state: state,
  windowId: windowId,
  canvasId: getCurrentCanvas(state, { windowId }).id,
  annotationId: getAnnotationId(state, windowId),
});

export default [
  {
    component: MiradorTranslate,
    mapDispatchToProps,
    mapStateToProps,
    mode: 'wrap',
    saga: rootSaga,
    reducer: { annotations: updateAnnotationsReducer },
    target: 'AnnotationSettings',
  },
];
