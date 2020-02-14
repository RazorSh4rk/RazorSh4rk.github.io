gdjs.New_32sceneCode = {};


gdjs.New_32sceneCode.GDplayerObjects1= [];
gdjs.New_32sceneCode.GDplatform1Objects1= [];
gdjs.New_32sceneCode.GDtutorialObjects1= [];

gdjs.New_32sceneCode.conditionTrue_0 = {val:false};
gdjs.New_32sceneCode.condition0IsTrue_0 = {val:false};
gdjs.New_32sceneCode.condition1IsTrue_0 = {val:false};
gdjs.New_32sceneCode.conditionTrue_1 = {val:false};
gdjs.New_32sceneCode.condition0IsTrue_1 = {val:false};
gdjs.New_32sceneCode.condition1IsTrue_1 = {val:false};

gdjs.New_32sceneCode.func = function(runtimeScene, context) {
context.startNewFrame();
gdjs.New_32sceneCode.GDplayerObjects1.length = 0;
gdjs.New_32sceneCode.GDplatform1Objects1.length = 0;
gdjs.New_32sceneCode.GDtutorialObjects1.length = 0;


{

gdjs.New_32sceneCode.GDplayerObjects1.createFrom(runtimeScene.getObjects("player"));

gdjs.New_32sceneCode.condition0IsTrue_0.val = false;
{
gdjs.New_32sceneCode.condition0IsTrue_0.val = gdjs.evtTools.input.isKeyPressed(runtimeScene, "Right");
}if (gdjs.New_32sceneCode.condition0IsTrue_0.val) {
{for(var i = 0, len = gdjs.New_32sceneCode.GDplayerObjects1.length ;i < len;++i) {
    gdjs.New_32sceneCode.GDplayerObjects1[i].setAnimation(1);
}
}}

}


{

gdjs.New_32sceneCode.GDplayerObjects1.createFrom(runtimeScene.getObjects("player"));

gdjs.New_32sceneCode.condition0IsTrue_0.val = false;
{
gdjs.New_32sceneCode.condition0IsTrue_0.val = gdjs.evtTools.input.isKeyPressed(runtimeScene, "Left");
}if (gdjs.New_32sceneCode.condition0IsTrue_0.val) {
{for(var i = 0, len = gdjs.New_32sceneCode.GDplayerObjects1.length ;i < len;++i) {
    gdjs.New_32sceneCode.GDplayerObjects1[i].setAnimation(2);
}
}}

}


{

gdjs.New_32sceneCode.GDplayerObjects1.createFrom(runtimeScene.getObjects("player"));

gdjs.New_32sceneCode.condition0IsTrue_0.val = false;
{
gdjs.New_32sceneCode.condition0IsTrue_0.val = !(gdjs.evtTools.input.anyKeyPressed(runtimeScene));
}if (gdjs.New_32sceneCode.condition0IsTrue_0.val) {
{for(var i = 0, len = gdjs.New_32sceneCode.GDplayerObjects1.length ;i < len;++i) {
    gdjs.New_32sceneCode.GDplayerObjects1[i].setAnimation(0);
}
}}

}


{

gdjs.New_32sceneCode.GDplayerObjects1.createFrom(runtimeScene.getObjects("player"));

{gdjs.evtTools.camera.centerCamera(runtimeScene, (gdjs.New_32sceneCode.GDplayerObjects1.length !== 0 ? gdjs.New_32sceneCode.GDplayerObjects1[0] : null), false, "", 0);
}{gdjs.evtTools.camera.setCameraZoom(runtimeScene, 0.5, "", 0);
}
}


{

gdjs.New_32sceneCode.GDplayerObjects1.createFrom(runtimeScene.getObjects("player"));
gdjs.New_32sceneCode.GDplatform1Objects1.length = 0;

gdjs.New_32sceneCode.condition0IsTrue_0.val = false;
{
gdjs.New_32sceneCode.condition0IsTrue_0.val = gdjs.evtTools.runtimeScene.timerElapsedTime(runtimeScene, 1, "newPlatform");
}if (gdjs.New_32sceneCode.condition0IsTrue_0.val) {
{gdjs.evtTools.object.createObjectOnScene(runtimeScene, context.clearEventsObjectsMap().addObjectsToEventsMap("platform1", gdjs.New_32sceneCode.GDplatform1Objects1).getEventsObjectsMap(), (( gdjs.New_32sceneCode.GDplayerObjects1.length === 0 ) ? 0 :gdjs.New_32sceneCode.GDplayerObjects1[0].getPointX(""))+gdjs.random(gdjs.evtTools.common.getVariableNumber(runtimeScene.getGame().getVariables().getFromIndex(0)))+200, (( gdjs.New_32sceneCode.GDplayerObjects1.length === 0 ) ? 0 :gdjs.New_32sceneCode.GDplayerObjects1[0].getPointY(""))+gdjs.random(300)-100, "");
}{gdjs.evtTools.runtimeScene.resetTimer(runtimeScene, "newPlatform");
}}

}


{

gdjs.New_32sceneCode.GDplatform1Objects1.createFrom(runtimeScene.getObjects("platform1"));

gdjs.New_32sceneCode.condition0IsTrue_0.val = false;
{
gdjs.New_32sceneCode.condition0IsTrue_0.val = gdjs.evtTools.runtimeScene.timerElapsedTime(runtimeScene, 0.5, "colorSwap");
}if (gdjs.New_32sceneCode.condition0IsTrue_0.val) {
{for(var i = 0, len = gdjs.New_32sceneCode.GDplatform1Objects1.length ;i < len;++i) {
    gdjs.New_32sceneCode.GDplatform1Objects1[i].setAnimation(gdjs.random(4));
}
}{gdjs.evtTools.runtimeScene.resetTimer(runtimeScene, "colorSwap");
}}

}


{


gdjs.New_32sceneCode.condition0IsTrue_0.val = false;
{
{gdjs.New_32sceneCode.conditionTrue_1 = gdjs.New_32sceneCode.condition0IsTrue_0;
gdjs.New_32sceneCode.conditionTrue_1.val = context.triggerOnce(356136628);
}
}if (gdjs.New_32sceneCode.condition0IsTrue_0.val) {
{gdjs.evtTools.sound.playMusic(runtimeScene, "Orbital Colossus.ogg", true, 100, 1);
}}

}


{


gdjs.New_32sceneCode.condition0IsTrue_0.val = false;
{
gdjs.New_32sceneCode.condition0IsTrue_0.val = gdjs.evtTools.input.isKeyPressed(runtimeScene, "r");
}if (gdjs.New_32sceneCode.condition0IsTrue_0.val) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "New scene", false);
}}

}


{

gdjs.New_32sceneCode.GDplayerObjects1.createFrom(runtimeScene.getObjects("player"));

gdjs.New_32sceneCode.condition0IsTrue_0.val = false;
{
for(var i = 0, k = 0, l = gdjs.New_32sceneCode.GDplayerObjects1.length;i<l;++i) {
    if ( gdjs.New_32sceneCode.GDplayerObjects1[i].getBehavior("PlatformerObject").isJumping() ) {
        gdjs.New_32sceneCode.condition0IsTrue_0.val = true;
        gdjs.New_32sceneCode.GDplayerObjects1[k] = gdjs.New_32sceneCode.GDplayerObjects1[i];
        ++k;
    }
}
gdjs.New_32sceneCode.GDplayerObjects1.length = k;}if (gdjs.New_32sceneCode.condition0IsTrue_0.val) {
{runtimeScene.getGame().getVariables().getFromIndex(0).setNumber(400);
}}

}


{

gdjs.New_32sceneCode.GDplayerObjects1.createFrom(runtimeScene.getObjects("player"));

gdjs.New_32sceneCode.condition0IsTrue_0.val = false;
{
for(var i = 0, k = 0, l = gdjs.New_32sceneCode.GDplayerObjects1.length;i<l;++i) {
    if ( !(gdjs.New_32sceneCode.GDplayerObjects1[i].getBehavior("PlatformerObject").isJumping()) ) {
        gdjs.New_32sceneCode.condition0IsTrue_0.val = true;
        gdjs.New_32sceneCode.GDplayerObjects1[k] = gdjs.New_32sceneCode.GDplayerObjects1[i];
        ++k;
    }
}
gdjs.New_32sceneCode.GDplayerObjects1.length = k;}if (gdjs.New_32sceneCode.condition0IsTrue_0.val) {
{runtimeScene.getGame().getVariables().getFromIndex(0).setNumber(800);
}}

}

return;
}
gdjs['New_32sceneCode']= gdjs.New_32sceneCode;
