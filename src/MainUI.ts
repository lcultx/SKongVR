import SKongVR from './SKongVR';
export default class MainUI{
  constructor(wonder:SKongVR){
    $(".box-button-leftcon").find("ul.json").find("li").click(function(){
      //console.log(this.id);
        var id=$(this).attr("id");
        var name=$(this).attr("name");
        var num = $(this).index()
        var htmlObj = $.ajax({url:"./demo.txt",async:false});
        var OhtmlObj=htmlObj.responseText.split(",");
        var ObjStr = OhtmlObj[num];
//alert(name)
      wonder.scene.addObject({
        objUrl:'./resource/obj/' + ObjStr + '.obj',
        mtlUrl:'./resource/obj/' + ObjStr + '.mtl',
        position:{x:500,y:500,z:500},
        name:name,
        id:id
      });



      //
    })
  }
}
