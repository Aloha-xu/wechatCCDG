const formatTime = timestamp => {
  let Time = new Date(timestamp)
  const year = Time.getFullYear()
  const month = Time.getMonth() + 1
  const day = Time.getDate()
  const hour = Time.getHours()
  const minute = Time.getMinutes()
  const second = Time.getSeconds()
  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}
const getTime = () => {
  let Time = new Date()
  const month = Time.getMonth() + 1
  const day = Time.getDate()
  const hour = Time.getHours()
  const minute = Time.getMinutes()
  return  month + '月' + day + '日 ' + hour + ':' + minute 
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const getYestaryToday = timestamp =>  {
  //判断是昨天的还是今天的消息  通过 日 来比较
  let Time = new Date(timestamp)
  //当前日
  const nowDate = (new Date().getDate()).toString().padStart(2, '0')
  //数据日
  const tdate = (Time.getDate()).toString().padStart(2, '0')

  let values
  if(nowDate == tdate){
    values = '今天'
  }else{
    values="昨天"
  }
  return values
}

module.exports = {
  formatTime,
  getYestaryToday,
  getTime
}
