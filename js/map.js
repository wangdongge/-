//创建和初始化地图函数：
function initMap() {
	createMap(); //创建地图
	setMapEvent(); //设置地图事件
	addMapOverlay(); //向地图添加覆盖物
}

function createMap() {
	map = new BMap.Map("map");
	map.centerAndZoom(new BMap.Point(123.4903578577, 41.6981968728), 17); //106.575711,29.531776
	var opts = {
		width: 250, // 信息窗口宽度    
		height: 50, // 信息窗口高度    
		title: "我们的地址" // 信息窗口标题   
	}
	var infoWindow = new BMap.InfoWindow("沈阳浑南新区国际软件园F8-C511</br>", opts); // 创建信息窗口对象    
	map.openInfoWindow(infoWindow, map.getCenter()); // 打开信息窗口
}

function setMapEvent() {
	map.enableScrollWheelZoom();
	map.enableKeyboard();
	map.enableDragging();
	map.enableDoubleClickZoom()
}

function addClickHandler(target, window) {
	target.addEventListener("click", function() {
		target.openInfoWindow(window);
	});
}

function addMapOverlay() {
	var markers = [{
		content: "",
		title: "",
		imageOffset: {
			width: -46,
			height: -21
		},
		position: {
			lat: 29.531776,
			lng: 106.575711
		}
	}];
	for(var index = 0; index < markers.length; index++) {
		var point = new BMap.Point(markers[index].position.lng, markers[index].position.lat);
		var marker = new BMap.Marker(point, {
			icon: new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png", new BMap.Size(20, 25), {
				imageOffset: new BMap.Size(markers[index].imageOffset.width, markers[index].imageOffset.height)
			})
		});
		var label = new BMap.Label(markers[index].title, {
			offset: new BMap.Size(25, 5)
		});
		var opts = {
			width: 200,
			title: markers[index].title,
			enableMessage: false
		};
		var infoWindow = new BMap.InfoWindow(markers[index].content, opts);
		marker.setLabel(label);
		addClickHandler(marker, infoWindow);
		map.addOverlay(marker);
	};
}
//向地图添加控件
function addMapControl() {
	var scaleControl = new BMap.ScaleControl({
		anchor: BMAP_ANCHOR_BOTTOM_LEFT
	});
	scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
	map.addControl(scaleControl);
	var navControl = new BMap.NavigationControl({
		anchor: BMAP_ANCHOR_BOTTOM_LEFT,
		type: 0
	});
	map.addControl(navControl);
	var overviewControl = new BMap.OverviewMapControl({
		anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
		isOpen: true
	});
	map.addControl(overviewControl);
}
var map;