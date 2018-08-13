/*
 * @Author: YP
 * @Date:   2018-08-13 13:28:22
 * @Last Modified by:   YP
 * @Last Modified time: 2018-08-13 13:34:49
 */

//保持文件格式
fs=require('fs');
//fs open
fs.open('C:\\Users\\YP\\Desktop\\test1.docx','a',function(error,fd)
{
	// console.log(fd);
	buffer=fs.readFileSync('C:\\Users\\YP\\Desktop\\test.docx');
	if(!error)
	{
		fs.write(fd, buffer, 0, buffer.length, 0, function(error,written,buffer)
			{
				if(!error)
				{
					console.log(buffer);
				}
			});
	}
});


