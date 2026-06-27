export function docUrl(filename) {
  return filename
    ? `${import.meta.env.BASE_URL}files/${filename}#view=FitV`
    : null;
}
