/*
Copyright (c) 2010 Tom Carden, Steve Coast, Mikel Maron, Andrew Turner, Henri Bergius, Rob Moran, Derek Fowler
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * Neither the name of the Mapstraction nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
mxn.register("googlev3",{Mapstraction:{init:function(b,c){var d=this;if(google&&google.maps){var a={disableDefaultUI:true,mapTypeId:google.maps.MapTypeId.ROADMAP,mapTypeControl:false,mapTypeControlOptions:null,navigationControl:false,navigationControlOptions:null,scrollwheel:false};if(!this.addControlsArgs&&loadoptions.addControlsArgs){this.addControlsArgs=loadoptions.addControlsArgs}if(this.addControlsArgs){if(this.addControlsArgs.zoom){a.navigationControl=true;if(this.addControlsArgs.zoom=="small"){a.navigationControlOptions={style:google.maps.NavigationControlStyle.SMALL}}if(this.addControlsArgs.zoom=="large"){a.navigationControlOptions={style:google.maps.NavigationControlStyle.ZOOM_PAN}}}if(this.addControlsArgs.map_type){a.mapTypeControl=true;a.mapTypeControlOptions={style:google.maps.MapTypeControlStyle.DEFAULT}}}var e=new google.maps.Map(b,a);google.maps.event.addListener(e,"click",function(g){d.click.fire({location:new mxn.LatLonPoint(g.latLng.lat(),g.latLng.lng())})});google.maps.event.addListener(e,"zoom_changed",function(){d.changeZoom.fire()});google.maps.event.addListener(e,"dragend",function(){d.moveendHandler(d);d.endPan.fire()});var f=google.maps.event.addListener(e,"tilesloaded",function(){d.load.fire();google.maps.event.removeListener(f)});this.maps[c]=e;this.loaded[c]=true}else{alert(c+" map script not imported")}},applyOptions:function(){var b=this.maps[this.api];var a=[];if(this.options.enableDragging){a.draggable=true}if(this.options.enableScrollWheelZoom){a.scrollwheel=true}b.setOptions(a)},resizeTo:function(b,a){this.currentElement.style.width=b;this.currentElement.style.height=a;var c=this.maps[this.api];google.maps.event.trigger(c,"resize")},addControls:function(b){var c=this.maps[this.api];if(b.zoom||b.pan){if(b.zoom=="large"){this.addLargeControls()}else{this.addSmallControls()}}if(b.scale){var a={scaleControl:true,scaleControlOptions:{style:google.maps.ScaleControlStyle.DEFAULT}};c.setOptions(a);this.addControlsArgs.scale=true}if(b.map_type){this.addMapTypeControls()}},addSmallControls:function(){var b=this.maps[this.api];var a={navigationControl:true,navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}};b.setOptions(a);this.addControlsArgs.pan=false;this.addControlsArgs.scale=false;this.addControlsArgs.zoom="small"},addLargeControls:function(){var b=this.maps[this.api];var a={navigationControl:true,navigationControlOptions:{style:google.maps.NavigationControlStyle.DEFAULT}};b.setOptions(a);this.addControlsArgs.pan=true;this.addControlsArgs.zoom="large"},addMapTypeControls:function(){var b=this.maps[this.api];var a={mapTypeControl:true,mapTypeControlOptions:{style:google.maps.MapTypeControlStyle.DEFAULT}};b.setOptions(a);this.addControlsArgs.map_type=true},setCenterAndZoom:function(a,b){var d=this.maps[this.api];var c=a.toProprietary(this.api);d.setCenter(c);d.setZoom(b)},addMarker:function(b,a){return b.toProprietary(this.api)},removeMarker:function(a){a.hide()},declutterMarkers:function(a){var b=this.maps[this.api]},addPolyline:function(c,b){var d=this.maps[this.api];var a=c.toProprietary(this.api);a.setMap(d);return a},removePolyline:function(a){var b=this.maps[this.api];a.proprietary_polyline.setMap(null)},getCenter:function(){var b=this.maps[this.api];var a=b.getCenter();return new mxn.LatLonPoint(a.lat(),a.lng())},setCenter:function(a,b){var d=this.maps[this.api];var c=a.toProprietary(this.api);if(b&&b.pan){d.panTo(c)}else{d.setCenter(c)}},setZoom:function(a){var b=this.maps[this.api];b.setZoom(a)},getZoom:function(){var a=this.maps[this.api];return a.getZoom()},getZoomLevelForBoundingBox:function(e){var d=this.maps[this.api];var a=e.getSouthWest().toProprietary(this.api);var c=e.getNorthEast().toProprietary(this.api);var b=new google.maps.LatLngBounds(a,c);d.fitBounds(b);return d.getZoom()},setMapType:function(a){var b=this.maps[this.api];switch(a){case mxn.Mapstraction.ROAD:b.setMapTypeId(google.maps.MapTypeId.ROADMAP);break;case mxn.Mapstraction.SATELLITE:b.setMapTypeId(google.maps.MapTypeId.SATELLITE);break;case mxn.Mapstraction.HYBRID:b.setMapTypeId(google.maps.MapTypeId.HYBRID);break;case mxn.Mapstraction.PHYSICAL:b.setMapTypeId(google.maps.MapTypeId.TERRAIN);break;default:b.setMapTypeId(google.maps.MapTypeId.ROADMAP)}},getMapType:function(){var b=this.maps[this.api];var a=b.getMapTypeId();switch(a){case google.maps.MapTypeId.ROADMAP:return mxn.Mapstraction.ROAD;case google.maps.MapTypeId.SATELLITE:return mxn.Mapstraction.SATELLITE;case google.maps.MapTypeId.HYBRID:return mxn.Mapstraction.HYBRID;case google.maps.MapTypeId.TERRAIN:return mxn.Mapstraction.PHYSICAL;default:return null}},getBounds:function(){var d=this.maps[this.api];var c=d.getBounds();if(!c){throw"Bounds not available, map must be initialized"}var a=c.getSouthWest();var b=c.getNorthEast();return new mxn.BoundingBox(a.lat(),a.lng(),b.lat(),b.lng())},setBounds:function(b){var e=this.maps[this.api];var a=b.getSouthWest().toProprietary(this.api);var d=b.getNorthEast().toProprietary(this.api);var c=new google.maps.LatLngBounds(a,d);e.fitBounds(c)},addImageOverlay:function(c,a,f,k,g,i,e,j){var b=this.maps[this.api];var h=new google.maps.LatLngBounds(new google.maps.LatLng(g,k),new google.maps.LatLng(e,i));var d=new google.maps.GroundOverlay(a,h);d.setMap(b)},setImagePosition:function(b,a){},addOverlay:function(a,d){var e=this.maps[this.api];var c={preserveViewport:(!d)};var b=new google.maps.KmlLayer(a,c);b.setMap(e)},addTileLayer:function(l,g,d,k,h,m){var a=this.maps[this.api];var j=[];var i=this.tileLayers.length||0;j[0]={getTileUrl:function(o,f){url=l;url=url.replace(/\{Z\}/g,f);url=url.replace(/\{X\}/g,o.x);url=url.replace(/\{Y\}/g,o.y);return url},tileSize:new google.maps.Size(256,256),isPng:true,minZoom:k,maxZoom:h,opacity:g,name:d};var n=new google.maps.ImageMapType(j[0]);if(m){a.mapTypes.set("tile"+i,n);var c=[google.maps.MapTypeId.ROADMAP,google.maps.MapTypeId.HYBRID,google.maps.MapTypeId.SATELLITE,google.maps.MapTypeId.TERRAIN];for(var e=0;e<this.tileLayers.length;e++){c.push("tile"+e)}var b={mapTypeControlOptions:{mapTypeIds:c}};a.setOptions(b)}else{a.overlayMapTypes.insertAt(i,n)}this.tileLayers.push([l,n,true,i]);return n},toggleTileLayer:function(d){var b=this.maps[this.api];for(var a=0;a<this.tileLayers.length;a++){var c=this.tileLayers[a];if(c[0]==d){if(c[2]){b.overlayMapTypes.removeAt(c[3]);c[2]=false}else{b.overlayMapTypes.insertAt(c[3],c[1]);c[2]=true}}}},getPixelRatio:function(){var a=this.maps[this.api]},mousePosition:function(a){var b=this.maps[this.api];var c=document.getElementById(a);if(c!==null){google.maps.event.addListener(b,"mousemove",function(d){var e=d.latLng.lat().toFixed(4)+" / "+d.latLng.lng().toFixed(4);c.innerHTML=e});c.innerHTML="0.0000 / 0.0000"}}},LatLonPoint:{toProprietary:function(){return new google.maps.LatLng(this.lat,this.lon)},fromProprietary:function(a){this.lat=a.lat();this.lon=a.lng()}},Marker:{toProprietary:function(){var l={};var b=0;var k=0;if(this.iconAnchor){b=this.iconAnchor[0];k=this.iconAnchor[1]}var e=new google.maps.Point(b,k);if(this.iconUrl){l.icon=new google.maps.MarkerImage(this.iconUrl,new google.maps.Size(this.iconSize[0],this.iconSize[1]),new google.maps.Point(0,0),e);if(this.iconShadowUrl){if(this.iconShadowSize){var i=this.iconShadowSize[0];var h=this.iconShadowSize[1];l.shadow=new google.maps.MarkerImage(this.iconShadowUrl,new google.maps.Size(i,h),new google.maps.Point(0,0),e)}else{l.shadow=new google.maps.MarkerImage(this.iconShadowUrl)}}}if(this.draggable){l.draggable=this.draggable}if(this.labelText){l.title=this.labelText}if(this.imageMap){l.shape={coord:this.imageMap,type:"poly"}}l.position=this.location.toProprietary(this.api);l.map=this.map;var f=new google.maps.Marker(l);if(this.infoBubble){var g="click";if(this.hover){g="mouseover"}google.maps.event.addListener(f,g,function(){f.mapstraction_marker.openBubble()})}if(this.hoverIconUrl){var d=new google.maps.Size(this.iconSize[0],this.iconSize[1]);var j=new google.maps.Point(0,0);var a=new google.maps.MarkerImage(this.hoverIconUrl,d,j,e);var c=new google.maps.MarkerImage(this.iconUrl,d,j,e);google.maps.event.addListener(f,"mouseover",function(){f.setIcon(a)});google.maps.event.addListener(f,"mouseout",function(){f.setIcon(c)})}google.maps.event.addListener(f,"click",function(){f.mapstraction_marker.click.fire()});return f},openBubble:function(){var a=new google.maps.InfoWindow({content:this.infoBubble});google.maps.event.addListener(a,"closeclick",function(b){});this.openInfoBubble.fire({marker:this});a.open(this.map,this.proprietary_marker);this.proprietary_infowindow=a},closeBubble:function(){if(this.hasOwnProperty("proprietary_infowindow")){this.proprietary_infowindow.close();this.closeInfoBubble.fire({marker:this})}},hide:function(){this.proprietary_marker.setOptions({visible:false})},show:function(){this.proprietary_marker.setOptions({visible:true})},update:function(){var a=new mxn.LatLonPoint();a.fromProprietary("googlev3",this.proprietary_marker.getPosition());this.location=a}},Polyline:{toProprietary:function(){var d=[];for(var c=0,e=this.points.length;c<e;c++){d.push(this.points[c].toProprietary("googlev3"))}var b={path:d,strokeColor:this.color||"#000000",strokeOpacity:1,strokeWeight:3};var a=new google.maps.Polyline(b);return a},show:function(){throw"Not implemented"},hide:function(){throw"Not implemented"}}});