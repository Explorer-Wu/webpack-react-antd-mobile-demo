import React from 'react';

function param(json) {
  if (!json) return ''
  return Object.keys(json).map(key => {
    if (json[key] === undefined) return ''
    return encodeURIComponent(key) + '=' +
      encodeURIComponent(json[key])
  }).join('&')
}

function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

function param3Obj(body) {
  if (!body) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(body).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

//获得参数
function getQuery(str) {
  let query = {};
  if (!str) {
    return query;
  }
  let search = str.substring(1);
  let arr = search.split('&');
  arr.forEach(function (item) {
    let itemVal = item.split('=');
    query[itemVal[0]] = itemVal[1];
  });

  return query;
}

//获得组件
function getComponent(path) {
  console.log("component:", import(`${path}/index`), path);
  return import(path).then(Component => {
    return <Component.default/>
  }).catch(error => {
    return 'not found 404 ' + error;
  });
}

function strAfterCut(strs, point) {
  return strs.substring(strs.indexOf(point)+1);
}

function getIpFromInt (val) {
  let last = val
  const data = []
  for (let i = 3; i >= 0; i--) {
    data.push(Math.floor(last / 256 ** i))
    last %= 256 ** i
  }
  return data.join('.')
}

function isEmptyValue (value) {
  return value === null || value === undefined || value === ''
}

function formatDataTime (t, fmt = 'yyyy-MM-dd hh:mm:ss') {
  let o = {
    'M+': t.getMonth() + 1,
    'd+': t.getDate(),
    'h+': t.getHours(),
    'm+': t.getMinutes(),
    's+': t.getSeconds(),
    'q+': Math.floor((t.getMonth() + 3) / 3),
    'S': t.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (t.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

// 补0的字符串
function add_zero (num, sign) {
  let zero = ''
  for (let i = 0; i < num; i++) {
    zero += sign
  }
  return zero
}

function ip_to_2 (ip) {
  let ip_list = ip.split('.')
  let ip_list_2 = new Array()
  for (let ip in ip_list) {
    let ip_2 = parseInt(ip_list[ip], 10).toString(2)
    if (ip_2.length < 8) {
      let zero = add_zero(8 - ip_2.length, '0')
      ip_2 = zero + ip_2
    }
    ip_list_2.push(ip_2)
  }
  return ip_list_2.join('')
}

let IPHelper = {
  // 校验是否是网段
  check_network (ip) {
    let reSpaceCheck = /^(\d+)\.(\d+)\.(\d+)\.(\d+)\/(\d{1,2})$/
    if (reSpaceCheck.test(ip)) {
      ip.match(reSpaceCheck)
      if (RegExp.$1 <= 255 && RegExp.$1 >= 0
        && RegExp.$2 <= 255 && RegExp.$2 >= 0
        && RegExp.$3 <= 255 && RegExp.$3 >= 0
        && RegExp.$4 <= 255 && RegExp.$4 >= 0
        && RegExp.$5 <= 32 && RegExp.$5 >= 0
      ) {
        let net_list = ip.split('/')
        let net_mark = net_list[1]
        let net_ip = net_list[0]
        let ip_2 = ip_to_2(net_ip)
        let ip_ins = ip_2.substring(net_mark)
        let final_ip = parseInt(ip_ins)
        if(final_ip == 0){
          return true
        }else{
          return false
        }
      } else {
        return false
      }
    } else {
      return false
    }
  },
  checkIP(val) {
    let ipv4Reg = /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i;
    let ipv6Reg = /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i;
    if (ipv4Reg.test(val) === true || ipv6Reg.test(val) === true) {
      return true
    } else {
      return false
    }
  },
  checkPort(val) {
    let portReg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
    if (portReg.test(val) === true) {
      return true
    } else {
      return false
    }
  },
  checkMask(subnet) {
    // var subnet = /^((255\.0\.0)|(255\.255\.0)|(255\.255\.255)\.0$/;
    // let exp= "255\\.(0|128|192|224|240|248|252|254|255)\\.0\\.0";
    //let exp=/^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/;
    let exp= /^(254|252|248|240|224|192|128|0)\.0\.0\.0$|^(255\.(254|252|248|240|224|192|128|0)\.0\.0)$|^(255\.255\.(254|252|248|240|224|192|128|0)\.0)$|^(255\.255\.255\.(255|254|252|248|240|224|192|128|0))$/
    let reg = subnet.match(exp);
    if(reg === null){
      return false; //"非法"
    } else{
      return true; //"合法"
    }
  },
  // 计算网段下的IP数量
  count_ip (netMask) {
    let net_mark = parseInt(netMask)
    // let net_ip = net_data[0]
    return Math.pow(2, (32 - net_mark)) - 4
  }
}


export {param, param2Obj, getQuery, getComponent, strAfterCut, getIpFromInt, isEmptyValue, formatDataTime, IPHelper}
