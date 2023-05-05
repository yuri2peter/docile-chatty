/**
 * A simple database based json file.
 * @author yuri2peter
 */

import { Immutable, produce } from 'immer';
import fs from 'fs-extra';
import lodash from 'lodash';

const { throttle } = lodash;

export default class JsonDb<T> {
  readonly file: string = '';
  readonly version: number = 0;
  private data: Immutable<T>;
  private autoSaveFile: () => void = () => {};

  /**
   *
   * @param file db file path
   * @param defaultValue default value when file is not available
   * @param version db schema version
   * @param versionFixer use this to update your data schema
   * @param disableAutoSave disable auto save feature
   * @param autoSaveWaitMilliseconds throttle delay for auto-saving file
   */
  constructor(params: {
    file: string;
    defaultValue: T;
    version?: number;
    versionFixer?: (value: any, oldVersion: number) => T;
    disableAutoSave?: boolean;
    autoSaveWaitMilliseconds?: number;
  }) {
    const {
      file,
      defaultValue,
      version = 1,
      versionFixer,
      disableAutoSave = false,
      autoSaveWaitMilliseconds = 8000,
    } = params;
    this.file = file;
    this.version = version;
    this.data = defaultValue as Immutable<T>;
    if (!disableAutoSave) {
      this.autoSaveFile = throttle(() => {
        this.saveFile();
      }, autoSaveWaitMilliseconds);
    }
    this.loadFile(versionFixer);
  }

  /**
   * get newest data
   */
  getData() {
    return this.data;
  }

  /**
   * set data
   * @param data
   */
  setData(data: T) {
    this.data = data as Immutable<T>;
    this.autoSaveFile();
  }

  /**
   * see more usage at `immer.js`
   * @param recipe change value inside the recipe, but no returns
   */
  changeData(recipe: (base: T) => void) {
    this.data = produce((d) => {
      recipe(d);
    })(this.data) as Immutable<T>;
    this.autoSaveFile();
  }

  private loadFile(versionFixer?: (value: any, oldVersion: number) => T) {
    try {
      const content = fs.readFileSync(this.file, 'utf8');
      const { data, version } = JSON.parse(content);
      // trying fix version
      this.data =
        versionFixer && version !== this.version
          ? versionFixer(data, version)
          : data;
    } catch (error) {
      console.log('[jsonDb] Error parsing db file, use default value.');
    }
    this.saveFile();
  }

  saveFile() {
    fs.ensureFileSync(this.file);
    fs.writeFileSync(
      this.file,
      JSON.stringify({
        data: this.data,
        version: this.version,
        updatedAtString: new Date().toString(),
        updatedAtTime: new Date().getTime(),
      })
    );
  }
}
