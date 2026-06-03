export function artistImagePath(index: number) {
  return index < 0 ? "" : `/img/artists/artist${index + 1}.jpg`
}
