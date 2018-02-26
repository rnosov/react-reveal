//// credit: http://www.javascriptkit.com/javatutors/touchevents2.shtml
// var supportsPassive = false;
//    try {
//      var opts = Object.defineProperty({}, 'passive', {
//        get: function() {
//          supportsPassive = true;
//        }
//      });
//      window.addEventListener("testPassive", null, opts);
//      window.removeEventListener("testPassive", null, opts);
//    } catch (e) {}
export default function swipedetect(el, callback){

    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}



    // Use our detect's results. passive applied if supported, capture will be false either way.
    //elem.addEventListener('touchstart', fn, supportsPassive ? { passive: true } : false);

    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0];
        swipedir = 'none';
        //dist = 0;
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime(); // record time when finger first makes contact with surface
        //e.preventDefault();
    }, { passive: true })//supportsPassive ? { passive: true } : false)

    //touchsurface.addEventListener('touchmove', function(e){
    //    e.preventDefault() // prevent scrolling when inside DIV
    //}, false)

    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        //e.preventDefault()
    }, { passive: true })//supportsPassive ? { passive: true } : false)
}
