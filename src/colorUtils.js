/**
 *
 */
export function hexToRgb(hex) {
  return hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => "#" + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map(x => parseInt(x, 16));
}

/**
 *
 */
export function brightness(r, g, b) {
  return 0.299 * r + 0.587 * r + 0.114 * r;
}

/**
 * Selects a foreground colour based on the colour of the background,
 * dark background light font, vice versa
 */
export function selectFontColor(background) {
  if (background) {
    let rgb = hexToRgb(background);
    let brightnessLevel = brightness(rgb[0], rgb[1], rgb[2]);
    if (brightnessLevel > 128) {
      return "black";
    } else {
      return "white";
    }
  } else {
    return "black";
  }
}
