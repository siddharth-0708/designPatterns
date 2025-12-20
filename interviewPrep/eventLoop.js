//CallStack - Stack - First in last out
//Task/micro queue - First in first out

/*EventLoop - Task is to check if callstack is empty we prioritize taskqueue and microtask queue
 and send them in callstack for execution.*/

function eventLoop(){
    //Task Queue - also called as callback queue
    /*SetTimeout comes in callstack but just registers the callback and timer and in background browser handles this
     and once completed, the callback is pushed in taskQueue*/ 
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
    // window.requestAnimationFrame(()=>{
    //     console.log("...sid requestAnimationFrame ");
    // })
    //Heavy Computation
    let sum = 0;
    for (let i = 0; i < 1e10; i++) {
      sum += i;
    }
    console.log("...sid eventLoop", sum);
}
function eventLoop1(){
    //Heavy Computation
    let sum = 0;
    for (let i = 0; i < 1e10; i++) {
      sum += i;
    }
    console.log("...sid eventLoop1", sum);
}
eventLoop();
eventLoop1();
queueMicrotask(()=>{
    console.log("...sid Jiii lolll");
})
console.log("...sid hi");

/*
Every cycle of the event loop does this:

1. Run JavaScript (the call stack)

2. Run all microtasks

    A) promise callbacks

    B) queueMicrotask

    C) MutationObserver

3. Run requestAnimationFrame callbacks (if it is time for next frame)

4. Browser performs rendering

5. style calculation

6. layout

7. paint

The task queue is not “always after RAF”.
It is only checked after rendering, when rendering happens.
8. Pick the next macrotask (setTimeout, network, click event, etc.)

9. Repeat
*/