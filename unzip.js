const testFolder = './';
const fs = require('fs');
const path = require('path')
const compressing = require('compressing');

function unZip(){

}

function delZip(){

}



function mvJpg(){

}
const action1 = new Promise(function (resolve, reject) {
    console.log('开始解压')

//解压zip文件
    let i=0
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
            if (file.indexOf('.') < 0 && file.indexOf('node') < 0) {
                let dir = './' + file
                fs.readdir(dir, (err, files) => {
                    files.forEach(file2 => {
                        if(file2.indexOf('.zip')>=0){
                            let oldPath = __dirname +'/'+file+'/'+file2
                            compressing.zip.uncompress(oldPath, './'+i)
                                .then(() => {
                                    //console.log('解压成功');
                                })
                                .catch(err => {
                                    console.error(err);
                                });

                        }

                    });
                });
            }

        });
    });
    setTimeout(()=>{
        console.log('解压成功开始移动')
        resolve();
    },1000)


})

action1.then(function () {
    const action2 = new Promise(function (resolve1, reject) {
        //移动图片
        console.log('开始移动')
        fs.readdir(testFolder, (err, files) => {
            files.forEach(file => {
                if (file.indexOf('.') < 0 && file.indexOf('node') < 0) {
                    let dir = './' + file
                    fs.readdir(dir, (err, files) => {
                        files.forEach(file2 => {
                            if (file2.indexOf('.') < 0 && file.indexOf('node') < 0) {
                                let dir2 = dir + '/' + file2
                                fs.readdir(dir2, (err, files) => {
                                    files.forEach(filename => {
                                        if (filename != '.DS_Store') {
                                            let oldPath = __dirname +'/'+file+'/'+file2+'/' +filename
                                            let newPath = __dirname +'/'+file+'/'+filename;
                                            fs.rename(oldPath, newPath, function (err) {
                                                if (err) throw err;
                                                //console.log('renamed complete');
                                            });
                                        }
                                    });
                                });
                            }
                        });
                    });
                }
            });
        });
        setTimeout(()=>{
            console.log('移动成功开始删除')
            resolve1();
        },1000)

    })
    action2.then(function () {
        console.log('开始删除')
        fs.readdir(testFolder, (err, files) => {
            files.forEach(file => {
                if (file.indexOf('.') < 0 && file.indexOf('node') < 0) {
                    let dir = './' + file
                    fs.readdir(dir, (err, files) => {
                        files.forEach(file2 => {
                            if(file2.indexOf('.zip')>=0){
                                let oldPath = __dirname +'/'+file+'/'+file2
                                fs.unlink(oldPath,function(error){
                                    if(error){
                                        console.log(error);
                                        return false;
                                    }
                                  //  console.log('删除文件成功');
                                })

                            }
                            if(file2.indexOf('.')<0){
                                let oldPath = __dirname +'/'+file+'/'+file2
                                fs.rmdir(oldPath,function(error){
                                    if(error){
                                        console.log(error);
                                        return false;
                                    }
                                    //console.log('删除文件夹成功');
                                })
                            }

                        });
                    });
                }
            });
        });
    }, function (err) {
        console.log('步骤3err')
    })

    //删除zip文件及文件夹

}, function (err) {
    console.log('步骤2err')
})

// mvJpg();
