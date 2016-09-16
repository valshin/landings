/**
 * Created by V.Shinkarenko on 14.09.2016.
 */
var fuse = true;
function cloneMouseEvent(e) {
	return new MouseEvent(e.type, e);
}

var serverCall = function(callback){
	setTimeout(function(){
		callback('done! Server data obtained!');
	}, 3000);
};
$( document ).ready(function(){
	var btn = document.getElementById('btn');
	//btn.addEventListener('click')
	$('form').submit(function(){
		console.log('form submitted');
		return false;
	});
	$('form').click(function(){
		console.log('form clicked');
	});
	$('#2').click(function(){
		console.log('ButtonSubmit clicked');
	});
	$('#3').click(function(){
		console.log('Some Button 2 clicked');
	});
	$('#4').click(function(){
		console.log('Some Button 3 clicked');
	});

	var targetElem = $('#2');
	document.addEventListener('click', function(e){
		var elem = $(e.target);
		if (!elem.is(targetElem)){
			return;
		}
		if (!fuse) {
			fuse = !fuse;
			return;
		}
		console.log('super event handler called, executing server request...');
		var newE = cloneMouseEvent(e);
		e.stopPropagation();
		e.stopImmediatePropagation();
		e.preventDefault();
		serverCall(function(data){
			console.log(data);
			fuse = !fuse;
			e.target.dispatchEvent(newE);
		});
		return false;
	}, true);
});
