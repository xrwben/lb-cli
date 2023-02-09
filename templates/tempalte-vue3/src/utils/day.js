export const formatSecond = (mss) => {
  let days = Math.floor(mss / (1000 * 60 * 60 * 24))
  days = days > 0 ? days + '天' : ''
  let hours = Math.floor((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  hours = hours > 0 ? hours + '小时' : ''
  let minutes = Math.floor((mss % (1000 * 60 * 60)) / (1000 * 60))
  minutes = minutes > 0 ? minutes + '分钟' : ''
  let seconds = Math.round((mss % (1000 * 60)) / 1000)
  seconds = seconds > 0 ? seconds + '秒' : ''
  return days + hours + minutes + seconds
}