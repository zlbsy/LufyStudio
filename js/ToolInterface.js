var studioMenubar;
var materials;
var projectFiles;
function ToolInterface(){
}
ToolInterface.init = function(){
	studioMenubar = new StudioMenubar();
	rootLayer.addChild(studioMenubar);
	
	materials = new Materials();
	materials.y = studioMenubar.getHeight();
	materials.x = LGlobal.width - materials.getWidth();
	stageLayer.addChild(materials);
	
	projectFiles = new ProjectFiles();
	projectFiles.y = studioMenubar.getHeight();
	projectFiles.x = materials.x - projectFiles.getWidth();
	stageLayer.addChild(projectFiles);
};
