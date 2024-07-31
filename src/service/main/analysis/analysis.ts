import hyRequest from '@/service'

export function getAmountListData() {
  return hyRequest.get({
    url: '/goods/amount/list'
  })
}
