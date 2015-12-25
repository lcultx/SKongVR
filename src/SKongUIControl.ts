$(document).ready(function(){

//左边按钮

function leftbutton (obj:JQuery){
  var num =obj.index();

          obj.parent().find("li").removeClass("selecta");
          obj.parent().find("li:eq("+num+")").addClass("selecta");
          obj.parent().parent().parent().find(".box-button-leftcon").show();
}
//左边按钮显示内容
function leftbuttoncon(obj:JQuery){
        obj.removeClass("select");
        obj.parent(".box-button-leftcon").hide();
}
//左边内容对象获取数据
/*$(".box-button-leftcon").find("ul.json").find("li").click(function(){
var row1 = {};//或者用后台对象
row1.name = $(this).attr("name");//或者用后台数据
row1.id = $(this).attr("id");
alert("id:"+(row1.id==undefined?"空值":row1.id)+","+"name:"+(row1.name==undefined?"空值":row1.name))
})*/

$("#closea").click(()=>{
  leftbuttoncon($("#closea"))
});
$(".box-button-left").find("li").click(function(){
  leftbutton($(this));
})



})
