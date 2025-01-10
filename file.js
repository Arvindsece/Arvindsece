const fs = require('fs');
function handleFileOperation(input) {
    if (input === 'read') {
        fs.readFile('./student.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            const user = JSON.parse(data);
            console.log(user);
        });
    } else if (input === 'create') {
        const user = {
            name: 'John Doe',
            age: 22,
            city: 'New York',
            amount: 1000
        };
        fs.readFile('./student.json', 'utf8', (err, data) => {
            let users = [];
            if (!err) {
                users = JSON.parse(data); 
            }
            users.push(user); 

            fs.writeFile('./student.json', JSON.stringify(users, null, 4), (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('File has been created/updated with new user');
            });
        });
    } else if (input === 'update') {
        fs.readFile('./student.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            const users = JSON.parse(data);
          
            if (users.length > 0) {
                users[0].amount = 2000;
                fs.writeFile('./student.json', JSON.stringify(users, null, 4), (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log('File has been updated');
                });
            }
        });
    } else if (input === 'delete') {
        fs.unlink('./student.json', (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('File has been deleted');
        });
    } else {
        console.log('Invalid operation. Please use "read", "create", "update", or "delete".');
    }
}

handleFileOperation('delete');