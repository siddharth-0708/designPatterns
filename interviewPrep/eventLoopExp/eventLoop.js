function buttonClick(){
    console.log("...sid button is clicked");
}
function playAnim(){
    let lastTime = 0;
    const ele = document.getElementById("anim");
    let sum = 0;
    function move(){
        if(sum > 250){
            return;
        }
        sum = sum + 1;
        ele.style.transform = `translateX(${sum}px)`;
        requestAnimationFrame(()=>{
            const start = performance.now();
            console.log("...sid FRAME RATEEE ", start-lastTime);
            //GOES INTO callstack only
            if(sum === 20){
                console.log("...sid running animation BLOCKKKKK", sum)
                // eventLoop1();
            }
            console.log("...sid running animation ", sum)
            lastTime = start;
            move();
        });
    }
    move();
}
function heavyClick(){
    eventLoop();
    eventLoop1();
    // queueMicrotask(()=>{
    //     console.log("...sid Jiii lolll");
    // })
    // console.log("...sid hi");
}
function eventLoop(){
    //Task Queue - also called as callback queue

    /*SetTimeout comes in callstack but just registers the callback and timer and in background browser handles this
     and once completed, the callback is pushed in taskQueue
     
    ❗ Important detail:
    1. setTimeout does NOT get priority over user input.

    2. The browser does NOT guarantee FIFO ordering between different macrotask sources.

    3. Browsers prioritize user interaction events (clicks) to keep UI responsive.
     */ 
    setTimeout(() => {
        console.log("...sid setTimeout");  
    }, 0);

    //MicroTasks-1 (MicroTask queue)
    Promise.resolve(1).then((result)=>{
        console.log(result);
    })
    //MicroTasks-2 (MicroTask queue)
    queueMicrotask(()=>{
        console.log("...sid queueMicrotask");
    })
    //RAF
    window.requestAnimationFrame(()=>{
        console.log("...sid requestAnimationFrame ");
    })
    //Heavy Computation
    let sum = 0;
    for (let i = 0; i < 1e8; i++) {
      sum += i;
    }
    console.log("...sid eventLoop", sum);
}
function eventLoop1(){
    //Heavy Computation
    let sum = 0;
    const ele = document.getElementById('animcss');
    ele.classList.add('animcss');
    for (let i = 0; i < 1e9; i++) {
      sum += i;
    }
    console.log("...sid eventLoop1", sum);
}