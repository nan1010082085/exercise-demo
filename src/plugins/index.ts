/**
 * @Author Yang (yang dong nan)
 * @Date 2023-11-23 11:17:42
 * @LastEditorAuthors yangdongnan
 * @LastDate 2023-11-23 11:17:42
 * @Description
 */

import DebugGlobal, { type DebugGlobalProps } from './debug';

const usePlugin = () => {
  const debug = (option: DebugGlobalProps) => new DebugGlobal(option);

  return {
    debug,
  };
};

export default usePlugin;
