function BitmapSprite(src, rect, size){
	var self = this;
	base(self,LSprite,[]);
	self.size = size;
	self.rect = rect;
	loader = new LLoader();
	loader.parent = self;
	loader.addEventListener(LEvent.COMPLETE,self.loadOver);
	var isBase64 = (src.indexOf(";base64,") > 0);
	if(!isBase64){
		src = (src.indexOf(LMvc.IMG_PATH) >= 0 ? "" : LMvc.IMG_PATH) + src;
		if(LGlobal.traceDebug){
			src += (src.indexOf('?') >= 0 ? '&' : '?') + 't=' + getTimer();
		}
	}
	loader.load(src,"bitmapData");
}
BitmapSprite.prototype.loadOver = function(event){
	var self = event.currentTarget.parent;
	var bitmapData = new LBitmapData(event.target);
	if(self.rect){
		bitmapData.setProperties(self.rect[0],self.rect[1],self.rect[2],self.rect[3]);
	}
	var bitmap = new LBitmap(bitmapData);
	bitmap.name = "bitmap";
	self.addChildAt(bitmap, 0);
	if(self.size){
		bitmap.scaleX = self.size.x / bitmap.bitmapData.width;
		bitmap.scaleY = self.size.y / bitmap.bitmapData.height;
	}
	self.dispatchEvent(LEvent.COMPLETE);
};