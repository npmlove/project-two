var websocketUrl = 'wss://17dc.shenghuoq.com/back/dcPortal/user/' //开发环境
// var websocketUrl = 'wss://17dc.shenghuoq.com/back/dcPortalTest/user/' //测试环境
// var websocketUrl = 'wss://www.17dc.com/back/dcPortal/user/' //生成环境



//开发环境
var webIp = 'https://17dc.shenghuoq.com'
var publicWeb = '/back/dcPortal/faw'

//测试环境
// var webIp = ''
// var publicWeb = '/back/dcPortalTest/faw'

//生成环境
// var webIp = ''
// var publicWeb = '/back/dcPortal/faw'


//接口
const serviceApi = {
	// 首页Banner广告展示
	showBanners: publicWeb+'/t-banner/noAuth/showBanners',
	//三字代码查询分页
	searchByPage: publicWeb+'/t-airport/noAuth/searchByPage',
	//二字代码查询分页
	twoCodeSearchByPage: publicWeb+'/es/noAuth/getAirCompany',
	//航线优选接口
	searchPreferred: publicWeb+'/t-airline-preferred/noAuth/searchPreferAirline',
	//手机短信
	noAuthSend: publicWeb+'/sms/noAuth/send',
	//微信公众号获取二维码
	noAuthQrCode: publicWeb+'/noAuth/getQRCode',
	//注册
	userRegister: publicWeb+'/t-portal-user/register',
	//获取用户基本信息
	userUserInfo: publicWeb+'/t-portal-user/getUserInfo',
	//登录
	userLogin: publicWeb+'/t-portal-user/login',
	//修改用户信息
	userUpdateUserInfo: publicWeb+'/t-portal-user/updateUserInfo',
	//验证码验证
	userVerification: publicWeb+'/t-portal-user/verification',
	//运价查询
	noAuthSearchBaseRates: publicWeb+'/es/noAuth/searchBaseRates',
	//每周最低运价
	noAuthSearchWeekRates: publicWeb+'/es/noAuth/searchWeekRates',
	//按运单查询
	trackSearchWeekRates: publicWeb+'/t-track/noAuth/queryByAWB',

}




//axios get请求data 转换
function toData(data) {
	var json = ''
	for(var key in data){
		json +=key+'='+data[key]+'&'
	}
	json = json.substring(0, json.length -1)
	return json
}

//获取uuid
function getGuid() {
	function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
	return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
//获取URL参数
function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

function getDay(num, str) {
	var today = new Date();
	var nowTime = today.getTime();
	var ms = 24 * 3600 * 1000 * num;
	today.setTime(parseInt(nowTime + ms));
	var oYear = today.getFullYear();
	var oMoth = (today.getMonth() + 1).toString();
	if (oMoth.length <= 1) oMoth = '0' + oMoth;
	var oDay = today.getDate().toString();
	if (oDay.length <= 1) oDay = '0' + oDay;
	return oYear + str + oMoth + str + oDay;
}
// 格式化日期
function formatDate(date) {
	date = new Date(date);
	var myyear = date.getFullYear();
	var mymonth = date.getMonth() + 1;
	var myweekday = date.getDate();
	mymonth < 10 ? mymonth = "0" + mymonth : mymonth;
	myweekday < 10 ? myweekday = "0" + myweekday : myweekday;
	return myyear+'-'+mymonth+'-'+myweekday;
}
//获取当前月
function getCurrentMm() {
	date = new Date()
	var mymonth = date.getMonth() + 1;
	mymonth < 10 ? mymonth = "0" + mymonth : mymonth;
	return mymonth;
}
//日期比较
function isDateCurrent(date1) {
	var date1 = new Date(date1)
	var date2 = new Date()
	var newDate2 = date2.toLocaleDateString()
	date2 = new Date(newDate2)
	return date1.getTime() > date2.getTime() ? true : false
}
function isDateCurrent1(arr) {
	var date2 = new Date()
	var newDate2 = date2.toLocaleDateString()
	date2 = new Date(newDate2)
	var newArr = []
	for(var a = 0; a < arr.length; a++){
		var date1 = new Date(arr[a])
		if(date1.getTime() > date2.getTime()){
			var json = {
				date: arr[a],
				dow: date1.getDay(),
				isDow: date1.getDay() == 0 ? 7 : date1.getDay()
			}
			newArr.push(json)
		}
	}
	return newArr
}
// 获取当前月的天数
function mGetDate() {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var d = new Date(year, month, 0);
	return d.getDate();
}
// 获取本周的日期
function getWeekDay(data) {
	var dateString = formatDate(data);//当天的日期，例如2020-2-28
	var presentDate = new Date(dateString);
	var today = presentDate.getDay() !== 0 ? presentDate.getDay() : 21;
 
	return Array.from(new Array(21), function (val, index) {
		return formatDate(new Date(presentDate.getTime() - (today - index - 1) * 24 * 60 * 60 * 1000));
	});
}
//获取进三周的数据
function getWeekDay1(data) {
	var dateString = formatDate(data);//当天的日期，例如2020-2-28
	var presentDate = new Date(dateString);
	if(presentDate.getDay() == 0){
		var today = 21;
		return Array.from(new Array(21), function (val, index) {
			return formatDate(new Date(presentDate.getTime() + (today - index - 1) * 24 * 60 * 60 * 1000));
		});
	}else{
		var today = presentDate.getDay() !== 0 ? presentDate.getDay() : 21;
		return Array.from(new Array(21), function (val, index) {
			return formatDate(new Date(presentDate.getTime() - (today - index - 1) * 24 * 60 * 60 * 1000));
		});
	}
}
// 获取当前月的所有日期
function getNowM() {
	var now = new Date();
	var current_month_num = mGetDate();
	var current_month = [];
	for (var i = 1; i <= current_month_num; i++) {
		var day = now.setDate(i);
		var everyDay = formatDate(day);
		current_month.push(everyDay);
	}
	return current_month;
}

