import { PluginActionTypes } from '../state/actions';
import { receiveAnnotation } from 'mirador/dist/es/src/state/actions/annotation';
import { all, put, takeEvery } from 'redux-saga/effects';

export function* updateAnnotations(action) {
  yield put(
    receiveAnnotation(
      action.targetId,
      action.annotationId,
      action.annotationJson
    )
  );
}

export function* rootSaga() {
  yield all([
    takeEvery(PluginActionTypes.UPDATE_ANNOTATIONS, updateAnnotations),
  ]);
}
