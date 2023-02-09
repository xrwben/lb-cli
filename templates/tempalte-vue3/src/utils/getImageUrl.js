const getImageUrl = (url) => {
  return new URL(`../assets/${url}`, import.meta.url).href
}
export {
  getImageUrl
}