const fs = require('fs/promises');
const path = require('path');

async function isExists(path: any) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
};

async function writeFile(filePath: any, data: any) {
  try {
    const dirname = path.dirname(filePath);
    const exist = await isExists(dirname);
    if (!exist) {
      await fs.mkdir(dirname, {recursive: true});
    }
    
    await fs.writeFile(filePath, data, 'utf8');
  } catch (err: any) {
    throw new Error(err);
  }
}