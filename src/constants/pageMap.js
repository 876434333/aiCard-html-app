const authorizeFromMap = {
  index: 1,
  addContact: 2,
  newStaffEntery: 3,
  cardView: 4,
  momentDetail: 5,
  shopOffer: 6,
  shopProductDetail: 7
}

const authorizeToMap = {
  1: '/pages/index',
  2: '/pages/contact/addContact',
  3: '/pages/me/pages/newStaffEntry',
  4: '/pages/card/cardView',
  5: '/pages/moment/momentDetail',
  6: '/pages/product/shopOffer',
  7: '/pages/product/shopProductDetails'
}

export {
  authorizeFromMap,
  authorizeToMap
}
