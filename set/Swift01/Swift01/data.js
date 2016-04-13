if(typeof window.testLoad == 'undefined'){
    window.mylist={};
    window.testLoad=function(url,callback){
        var f=function(){
            if(!window.mylist[url]){
                setTimeout(f,100);
            }else{
                callback(window.mylist[url]);
            }
        };
        f();
        location.href=url;
    };
}