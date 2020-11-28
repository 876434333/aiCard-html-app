import wepy from 'wepy'

export default class SetEmployeeMixin extends wepy.mixin {
  data = {
    sellerId: null,
    departmentId: null
  }
  onLoad(params, data) {
    let employee = wepy.$instance.getNowEmployee()
    this.sellerId = employee.employeeId
    this.enterpriseId = employee.enterpriseId
    this.departmentId = employee.departmentId
  }
}
