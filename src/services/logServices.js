const logs = process.env.REACT_APP_URL_LOGS
const logsFilter = process.env.REACT_APP_URL_LOGSFILTER
  
const getAllLogs = async (token) => {
  const req = await window.fetch(logs, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return req
}
const createLog = async (afiliacionData, token) => {
  const req = await window.fetch(logs, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(afiliacionData)
  })
  return req
}
const filterData = async (props, token) => {
    const req = await window.fetch(logsFilter, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(props)
    })
    return req
  }
export { getAllLogs, createLog, filterData }