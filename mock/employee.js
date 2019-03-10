import Mock from 'mockjs'

export default {
  list: () => {
    const items = Mock.mock({
      'items|8': [{
        empNo: '@id',
        name: '中文名',
        nameEn: '@string',
        'gender|1': ['男', '女'],
        'department|1': ['CargoSmart', 'Iris4'],
        idCard: '441224199500000000',
        birthDate: '@date',
        nationality: '汉族',
        nativePlace: '广东肇庆',
        phone: '@integer(13700000000, 13999999999)',
        salary: '@integer(8000, 50000)'
      }]
    })
    return {
      code: 20000,
      data: items
    }
  }
}
