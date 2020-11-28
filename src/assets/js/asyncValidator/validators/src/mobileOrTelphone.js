export default (value, callback) => {
  let errors = []
  if (value && !/^1\d{10}$/.test(value) && !/^(\d{3}-)(\d{8})$|^(\d{4}-)(\d{7})$|^(\d{4}-)(\d{8})$/.test(value)) {
    errors.push('请输入正确的电话号码')
  }
  callback(errors)
}
