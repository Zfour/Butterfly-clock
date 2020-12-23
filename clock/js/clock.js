    
	const mykey = {weather:'888888888888888888888'};
	//let locationurl = 'https://ip.seeip.org/geoip';
	let locationurl = 'https://extreme-ip-lookup.com/json/';
	let cityname ='';
	let weatherurl ='';
	let userip ='';
    const week = ['SUN', 'MON', 'TUE', 'WED','THU' ,'FRI', 'SAT'];
	$(function(){
        $.ajax({
            //请求方式
            type:"GET",
            //文件位置
            url:locationurl,
            //返回数据格式为json,也可以是其他格式如
            dataType: "json",
            beforeSend:function(XMLHttpRequest){
                //alert('远程调用开始...');


            },
            //请求成功后要执行的函数，拼接html
            success: function(data){
	//console.log(data);
	cityname = data.city;
	if( typeof data.city =="undefined"){
	cityname = data.region;
	};
    if(typeof data.region =="undefined"){
	cityname = data.country;	
	};
	//userip = data.ip;
	userip = data.query;
	weatherurl ='https://api.openweathermap.org/data/2.5/weather/?q=' + cityname + '&units=metric&appid=' + mykey.weather;
	getweatherdata();
	
	
	

            }
        });
    });
	  
	function getweatherdata(){
	$(function(){
        $.ajax({
            //请求方式
            type:"GET",
            //文件位置
            url:weatherurl,
            //返回数据格式为json,也可以是其他格式如
            dataType: "json",
            beforeSend:function(XMLHttpRequest){
                //alert('远程调用开始...');


            },
            //请求成功后要执行的函数，拼接html
            success: function(data){
	//console.log(data);
	 clock.weatherimg = '/clock/images/weather/' +  data.weather[0].icon + '.png';
        clock.temperature = data.main.temp + "*C";
        clock.humidity = data.main.humidity + "%";
		clock.ip =  userip;
        clock.humidityimg = '/clock/images/weather/hu.png';
        clock.city = data.name;
    let timerID = setInterval(updateTime, 1000);
	updateTime();
	clock.clockshow  = true;
	function updateTime() {
    let cd = new Date();
    clock.time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
    clock.date = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth()+1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
    let hamorpm = cd.getHours();
    let str;
    if(hamorpm >12) {
      hamorpm -= 12;
      str = " PM";
    }else{
      str = " AM";
    }
    clock.daylight = str
  };

  function zeroPadding(num, digit) {
    let zero = '';
    for(let i = 0; i < digit; i++) {
      zero += '0';
    }
    return (zero + num).slice(-digit);
  };
		updateTime();
	
            }
        });
    });	
	};
	
	

  const clock = new Vue({
    el: '#clock',
    data: {
		ip: '',
      time: '',
      weatherimg: '',
      temperature: '',
      humidityimg: '',
      humidity: '',
      usaqi: '',
      city: '',
      date: '',
      daylight: '',
	  clockshow:'false'
    },
	
  });


  

