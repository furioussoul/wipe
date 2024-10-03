/**
 * An object containing feature toggle flags.
 * @typedef {Object.<string, boolean>} FeatureToggles
 */

/**
 * A map of feature toggle flags.
 * @type {FeatureToggles}
 */
// get value from query string
function getDNDSupport() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has("dnd");
}

function getOutlinePlugin() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has("outline");
}

export const FEATURE_TOGGLES: { [key: string]: boolean } = {
  dnd: getDNDSupport(),
  arborist: getOutlinePlugin(),
};
