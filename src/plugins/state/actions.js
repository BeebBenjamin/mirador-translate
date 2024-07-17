export const PluginActionTypes = {
  UPDATE_ANNOTATIONS: 'mirador-translate/UPDATE_ANNOTATIONS',
};

/*
 *
 * */
export function updateAnnotations(targetId, annotationId, annotationJson) {
  return {
    targetId,
    annotationId,
    annotationJson,
    type: PluginActionTypes.UPDATE_ANNOTATIONS,
  };
}
