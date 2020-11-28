export default (value) => {
  if (!/^1\d{10}$/.test(value)) {
    return false
  } else {
    return true
  }
}
