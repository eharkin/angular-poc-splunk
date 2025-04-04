var fs = require('browserify-fs');
export default function(message: any) {
    //this sets all product descriptions to a max length of 10 characters

    fs.mkdir('./var/opt/log', { recursive: true }, (err: any) => {
        if (err) throw err;
    });

      
    for (var product of message) {
        console.log(product)
        fs.writeFile('./var/opt/log', product + '\n', function (err: any) {
            if (err) throw err;
        });
     }  
};


