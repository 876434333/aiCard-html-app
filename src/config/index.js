// 如果要改成可配置，那么，在获取apiAdress口前，先判断是否获取、并设置了业务相关的域名了。没有就获取
// 这是API集群服务器的地址 by PLH说明
// 统一定义图片资源服务器地址(For七牛服务器)

// export const G_RES_URL = 'https://res.dev.deecard.net'
// export const G_RES_URL = 'https://res.tooth.bitekun.xin'
// export const urlOfGetApi = 'http://127.0.0.1:9001'
// export const isLocalServer = true

export const G_RES_URL = 'https://res.tooth.bitekun.xin'
export const urlOfGetApi = 'https://api.tooth.bitekun.xin'
export const isLocalServer = false

export const apiAdress = ''
export const apiVersion1 = 'v1.0'
export const apiCapitalVersion1 = 'V1.0'
export const apiVersion = 'v2.0'
export const apiVersion3 = 'v3.0'
export const apiRoot = 'push'
export const uploadRecordUrl = `${urlOfGetApi}/${apiRoot}/${apiVersion1}/upload`

export const openidRefreshTime = 60

export default {
  urlOfGetApi,
  uploadRecordUrl,
  apiVersion1,
  apiVersion,
  apiVersion3,
  openidRefreshTime
}
