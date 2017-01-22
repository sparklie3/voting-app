function transform(email, data){
    
    for (var i=0; i<data.length;){
        if (data[i].userName !== email){
            i++;
        }
        else{
            return data[i].questions;
        }
    }
    
}

module.exports.transform = transform;