import * as path from 'node:path';
import * as fs from 'node:fs';
import dayjs from 'dayjs';
import { red, green, blue, gray } from 'kolorist';

const argv = process.argv[2];
let isUpV = !argv || ['major', 'minor', 'patch'].includes(argv.toLocaleLowerCase());
if (!argv) {
  console.log(gray('未输入版本号将自动获取版本号'));
} else if (isUpV) {
  console.log(blue(`更新对应数位版本 ${argv}`));
} else {
  console.log(blue(`版本号将替换为：${argv}`));
}

interface IGetPackage {
  name: string;
  version: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  time: string;
}

function getVersion(version: string, vi: string) {
  let v = vi;
  if (isUpV) {
    let index = 1;
    let arV = version.split('.') as (string | number)[];
    if (['major', 'minor', 'patch'].includes(argv.toLocaleLowerCase())) {
      let key = argv.toLocaleLowerCase();
      switch (key) {
        case 'major':
          index = 3;
          break;
        case 'minor':
          index = 2;
          break;
        case 'patch':
          index = 1;
          break;
      }
    }
    let len = Number(arV.length);
    arV[len - index] = Number(arV[len - index]) + 1;
    v = arV.join('.');
  }
  return v;
}

// 获取package文件
function getPackage(): null | IGetPackage | undefined {
  const vPath = path.join(__dirname, '../src/utils/v.json');
  const packPath = path.join(__dirname, '../package.json');
  let filePath = vPath;
  if (!fs.existsSync(vPath)) {
    filePath = packPath;
  }
  if (!fs.existsSync(filePath)) {
    console.log(red('文件不存在'));
    return;
  }
  const packageObject = fs.readFileSync(filePath);
  if (Buffer.isBuffer(packageObject)) {
    const bufferStr = packageObject.toString();
    const { name, version, dependencies, devDependencies } = JSON.parse(bufferStr);

    const v = getVersion(version, argv);
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
    console.log(blue(`${time}  版本号已更新为：${v}`));

    return {
      name,
      version: v,
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
        console.log(red('写入JSON失败'));
      }

      console.log(blue(`当前时间 ${obj.time}`) + ' ' + green('写入JSON成功'));

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
