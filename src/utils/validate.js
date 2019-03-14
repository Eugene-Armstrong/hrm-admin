/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 手机号
export function isValidPhone(phone) {
  const reg = /^(\+?0?86\-?)?1[345789]\d{9}$/
  return reg.test(phone)
}

export function phoneValidator(rule, value, callback) {
  if (isEmpty(value)) {
    callback(new Error('请填写手机号'))
  } else if (!isValidPhone(value)) {
    callback(new Error('手机号格式错误'))
  } else {
    callback()
  }
}

// 身份证
export function isValidIdNumber(idNumber) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return (reg.test(idNumber))
}

export function idCardValidator(rule, value, callback) {
  if (isEmpty(value)) {
    callback(new Error('请填写身份证号'))
  } else if (!isValidIdNumber(value)) {
    callback(new Error('身份证号格式错误'))
  } else {
    callback()
  }
}

// 月薪
export function salaryValidator(rule, value, callback) {
  if (isEmpty(value)) {
    callback(new Error('请填写月薪'))
  } else if (value <= 0) {
    callback(new Error('月薪必须大于0'))
  } else {
    callback()
  }
}

export function isEmpty(obj) {
  if (obj == null) return true
  if (isArray(obj) || isString(obj)) return obj.length === 0
  return Object.keys(obj).length === 0
}

export function isArray(obj) {
  return Array.isArray(obj)
}

export function isString(obj) {
  return typeof obj === 'string'
}
