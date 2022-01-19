var websocketUrl = 'wss://17dc.shenghuoq.com/back/dcPortal/user/' //开发环境或测试环境
// var websocketUrl = 'wss://www.17dc.com/back/dcPortal/user/' //生成环境



//开发环境
// var webIp = 'http://10.8.0.14:6679'
var webIp = 'http://10.8.0.1'
var publicWeb = '/back/dcPortal/faw'

//测试环境或生成环境
// var webIp = ''
// var publicWeb = '/back/dcPortalTest/faw'

// //测试环境或生成环境
// var webIp = ''
// var publicWeb = '/back/dcPortal/faw'


//接口
const serviceApi = {
	// 首页Banner广告展示
	showBanners: publicWeb+'/t-banner/noAuth/showBanners',
	// 首页AI文字解析,获取查价所需数据
	aiStringIdentify: '/track/identify/stringIdentify',
	//三字代码查询分页
	searchByPage: publicWeb+'/t-airport/noAuth/searchByPage',
	//二字代码查询分页
	twoCodeSearchByPage: publicWeb+'/es/noAuth/getAirCompany',
	//二字代码查询分页
	companySearchByPage: publicWeb+'/t-air-company/noAuth/searchByPage',
	//航线优选接口
	searchPreferred: publicWeb+'/t-airline-preferred/noAuth/searchPreferAirline',
	//手机短信
	noAuthSend: publicWeb+'/sms/noAuth/send',
	//微信公众号获取二维码
	noAuthQrCode: publicWeb+'/noAuth/getQRCode',
	//注册
	userRegister: publicWeb+'/t-portal-user/noAuth/register',
	//获取用户基本信息
	userUserInfo: publicWeb+'/t-portal-user/getUserInfo',
	//登录
	userLogin: publicWeb+'/t-portal-user/noAuth/login',
	//修改用户信息
	userUpdateUserInfo: publicWeb+'/t-portal-user/updateUserInfo',
	//验证码验证
	userVerification: publicWeb+'/t-portal-user/noAuth/verification',
	//运价查询
	noAuthSearchBaseRates: publicWeb+'/es/noAuth/searchBaseRates',
	//每周最低运价
	noAuthSearchWeekRates: publicWeb+'/es/noAuth/searchWeekRates',
	//按运单查询
	trackSearchWeekRates: publicWeb+'/t-track/noAuth/queryByAWB',
	//指定航线、货物类型、周几的运价查询
	hangxianSearchBaseRates: publicWeb+'/es/searchBaseRates',
	//用户下单
	getStartOrder: publicWeb+'/t-order/startOrder',
	//查询订单信息列表
	orderSearchByPage: publicWeb+'/t-order/searchByPage',
	//统计分类的订单列表数目
	orderCountList: publicWeb+'/t-order/countList',
	//查询订单详情
	orderSearchDetail: publicWeb+'/t-order/searchDetail',
	//执行订单
	orderExecuteOrder: publicWeb+'/t-order/executeOrder',
	//是否磁性
	orderIsMagnetic: publicWeb+'/t-order/isMagnetic',
	//确认账单
	billConfirmBill: publicWeb+'/t-bill/confirmBill',
	//已确认费用账单列表
	billList: publicWeb+'/t-bill/list',
	//查询当前用户开票信息列表
	invoiceInfoList: publicWeb+'/t-portal-invoice-info/list',
	//查询当前用户快递信息列表
	expressInfoList: publicWeb+'/t-portal-express-info/list',
	//开票申请
	invoiceApply: publicWeb+'/t-invoice-apply/invoiceApply',
	//发票信息
	invoiceInfos: publicWeb+'/t-invoice-apply/invoiceInfos',
	//导出账单
	billImportBillPdf: publicWeb+'/t-bill/importBillPdf',
	// 体积计算
	stringcal: '/track/volcalculate/stringcal',
	//新增or修改开票信息
	invoiceInfoSaveOrUpdate: publicWeb+'/t-portal-invoice-info/saveOrUpdate',
	// 删除开票信息
	deleInvoice:  publicWeb+'/t-portal-invoice-info/delete',
	//新增or修改开票邮寄信息
	expressInfoSaveOrUpdate: publicWeb+'/t-portal-express-info/saveOrUpdate',
	// 删除用户快递信息
	deleExpress:  publicWeb+'/t-portal-express-info/delete',
	//查询航司当前情况,获取位置等
	airLineSearch: '/track/airLine/trackFlight',
	//通过地点关键词搜索附近机场
	searchAirport:'/track/place/search-airport/',
	//地点检索候选项
	placeSuggest:'/track/place/suggest',
	//快捷下单
	fastOrder:publicWeb+'/t-order/fastOrder',

	orderBIllList: publicWeb + '/t-rcv-records/searchByPage',
	// 确认费用账单列表
	consureBillList: publicWeb + '/t-bill/list',
	// 记录查看
	applyDetail: publicWeb +'/t-bill/applyDetail'


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
        if(pair[0] == variable){
        	return  decodeURI(pair[1], "utf-8");
        }
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

			var json = {
				date: arr[a],
				dow: date1.getDay(),
				isDow: date1.getDay() == 0 ? 7 : date1.getDay()
			}
			newArr.push(json)

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
//获取进四周的数据
function getWeekDay1(data) {
	var dateString = formatDate(data);//当天的日期，例如2020-2-28
	var presentDate = new Date(dateString);
	if(presentDate.getDay() == 0){
		var today = 28;
		return Array.from(new Array(28), function (val, index) {
			return formatDate(new Date(presentDate.getTime() + (today - index - 1) * 24 * 60 * 60 * 1000));
		});
	}else{
		var today = presentDate.getDay() !== 0 ? presentDate.getDay() : 28;
		return Array.from(new Array(28), function (val, index) {
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
