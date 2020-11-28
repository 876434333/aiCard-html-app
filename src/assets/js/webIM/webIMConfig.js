// 帐号模式，0-表示独立模式，1-表示托管模式
const config = {
  sdkAppID: '',
  appIDAt3rd: '',
  accountType: '',
  accountMode: 0 
}

const options = {
	isAccessFormalEnv: true,
	isLogOn: false
}

const webIMConfig = {
	config: config,
	options: options
}

module.exports = webIMConfig