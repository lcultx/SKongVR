$(document).ready(function () {
    function leftbutton(obj) {
        var num = obj.index();
        obj.parent().find("li").removeClass("selecta");
        obj.parent().find("li:eq(" + num + ")").addClass("selecta");
        obj.parent().parent().parent().find(".box-button-leftcon").show();
    }
    function leftbuttoncon(obj) {
        obj.removeClass("select");
        obj.parent(".box-button-leftcon").hide();
    }
    $("#closea").click(function () {
        leftbuttoncon($("#closea"));
    });
    $(".box-button-left").find("li").click(function () {
        leftbutton($(this));
    });
});
//# sourceMappingURL=SKongUIControl.js.map