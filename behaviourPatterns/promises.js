function Mypromise(callback){
    let fullfilled = false;
    let rejected = false;
    let value = null;
    let error = null;
    let onResolve = null;
    let onReject = null;

    const resolve = function(value1){
        fullfilled = true;
        value = value1;
        if(onResolve){
            onResolve(value);
        }

    }
    const reject = function(error1){
        rejected = true;
        error = error1;
        if(onReject){
            onReject(error);
        }
    }
    this.then = function(resultCallback){
        return new Mypromise((nextResolve, nextReject)=>{
            const functionResolver = function(result){
                const result1 = resultCallback(result);
                try {
                    if(result1 instanceof Mypromise){
                        result1.then(nextResolve).catch(nextReject);
                    }else{
                        nextResolve(result1);
                    }
                } catch (error) {
                    nextReject(error);
                }
            }
            if(fullfilled){
                functionResolver(value)
            }else{
                onResolve = functionResolver;
            }
        })
    }
    this.catch = function(resultCallback){
        return new Mypromise((nextResolve, nextReject)=>{
            const functionResolver = function(result){
                const result1 = resultCallback(result);
                try {
                    if(result1 instanceof Mypromise){
                        result.then(nextResolve).catch(nextReject);
                    }
                } catch (error) {
                    nextReject(error);
                }
            }
            if(rejected){
                functionResolver(error)
            }else{
                onReject = functionResolver;
            }
        })
    }
    callback(resolve, reject);
}
Mypromise.resolve = function(value){
    return new Mypromise((resolve)=>{
        resolve(value);
    })
}
Mypromise.reject = function(error){
    return new Mypromise((_, reject)=>{
        reject(error);
    })
}

