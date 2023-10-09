import * as path from 'node:path';
import * as fs from 'node:fs';
import dayjs from 'dayjs';
import { red, green, blue } from 'kolorist';

const argv = process.argv[2];
console.log(argv)

interface IGetPackage {
  name: string;
  version: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  time: string;
}

// 获取package文件
function getPackage(): null | IGetPackage | undefined {
  const packPath = path.join(__dirname, '../package.json');
  if (!fs.existsSync(packPath)) {
    console.log(red('文件不存在'));
    return;
  }
  const packageObject = fs.readFileSync(packPath);
  if (Buffer.isBuffer(packageObject)) {
    const bufferStr = packageObject.toString();
    const { name, version, dependencies, devDependencies } = JSON.parse(bufferStr);
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
    return {
      name,
      version,
      dependencies,
      devDependencies,
      time
    };
  }
  return null;
}

async function writePublic(obj: IGetPackage) {
  const pathJson = path.join(__dirname, '../src/utils/v.json');
  const write = () => {
    const jsonStr = JSON.stringify(obj, null, 2);
    fs.writeFile(pathJson, jsonStr, (err) => {
      if (err) {
        console.log(red('写入版本JSON失败'));
      }

      console.log(blue(`当前时间 ${obj.time}`) + ' ' + green('写入版本JSON成功'));

      if (argv === '-prod') {
        console.log(green('进行构建版本'));
      }
    });
  };

  if (fs.existsSync(pathJson)) {
    write();
  } else {
    write();
  }
}

const jsonObject = getPackage();

if (jsonObject) {
  writePublic(jsonObject);
}
