import router from '@/router/index'
import { isSignedAPI, certificateRebuildAPI } from '@/api/index'
import { Toast } from 'vant'

const getCertificate = (init?: any, type?: string) => {
  console.log(router.currentRoute.value.query)
  const { exam_id } = init
  // 中干总监才有签名
  if (['yjOQOsAE', 'wa1ySI9g', '4wcAT4xU'].includes(exam_id)) {
    Toast.loading({
      duration: 0,
      forbidClick: true,
      message: '正在获取证书'
    })
    // 检查是否签名
    isSignedAPI({ exam_id }).then((res: any) => {
      Toast.clear()
      if (res.data && res.success) {
        // 已签名
        router.push({
          path: '/certificate',
          query: {
            exam_id
          }
        })
        return
      }
      const { from_act_id, from_system, from_type } = router.currentRoute.value.query
      const diyUrl = `exam_id=${exam_id}&from_act_id=${from_act_id}&from_system=${from_system}&from_type=${from_type}`
      if (process.env.NODE_ENV === 'production') {
        window.location.href = '//portal.learn.woa.com/mobile/signature/promise?' + diyUrl
      } else if (process.env.NODE_ENV === 'development') {
        window.location.href = '//test.portal.learn.oa.com/mobile/signature/promise?' + diyUrl
      }
    })
  } else {
    let certificateBatchNo = init.result?.certificate_batch_no
    // test.portal.learn.oa.com/mobile/certificate/preview?certificate_id=c6DjCpCm
    const host = process.env.NODE_ENV === 'production' ? '//portal.learn.woa.com' : '//test.portal.learn.oa.com'
    if (['C7aHPh2o', '7gKc0fHr', 'vrrS7Hes', 'hU7zXsCD'].includes(exam_id)) {
      router.push({
        path: '/certificate',
        query: {
          exam_id
        }
      })
    } else if (certificateBatchNo) {
      window.location.href = `${host}/mobile/certificate/preview?certificate_id=${certificateBatchNo}`
    } else {
      const record_id = (type && type === 'explain') ? init.exam_result.latest_certificate_record_id : init.record_id
      Toast.loading({
        duration: 0,
        forbidClick: true,
        message: '证书生成中...'
      })
      certificateRebuildAPI({ recordId: record_id }).then((res: any) => {
        Toast.clear()
        const { code, success, data } = res
        if (code === '200' && success) {
          certificateBatchNo = data
          window.location.href = `${host}/mobile/certificate/preview?certificate_id=${certificateBatchNo}`
        }
      })
    }
  }
}
export default getCertificate
