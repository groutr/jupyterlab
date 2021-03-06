// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { JSONExt, JSONObject, JSONValue } from '@lumino/coreutils';

import { Message } from '@lumino/messaging';

import { IObservableMap, ObservableMap } from './observablemap';

/**
 * An observable JSON value.
 */
export interface IObservableJSON extends IObservableMap<JSONValue> {
  /**
   * Serialize the model to JSON.
   */
  toJSON(): JSONObject;
}

/**
 * The namespace for IObservableJSON related interfaces.
 */
export namespace IObservableJSON {
  /**
   * A type alias for observable JSON changed args.
   */
  export type IChangedArgs = IObservableMap.IChangedArgs<JSONValue>;
}

/**
 * A concrete Observable map for JSON data.
 */
export class ObservableJSON extends ObservableMap<JSONValue> {
  /**
   * Construct a new observable JSON object.
   */
  constructor(options: ObservableJSON.IOptions = {}) {
    super({
      itemCmp: JSONExt.deepEqual,
      values: options.values
    });
  }

  /**
   * Serialize the model to JSON.
   */
  toJSON(): JSONObject {
    const out: JSONObject = Object.create(null);
    const keys = this.keys();

    for (let key of keys) {
      const value = this.get(key);

      if (value !== undefined) {
        out[key] = JSONExt.deepCopy(value);
      }
    }
    return out;
  }
}

/**
 * The namespace for ObservableJSON static data.
 */
export namespace ObservableJSON {
  /**
   * The options use to initialize an observable JSON object.
   */
  export interface IOptions {
    /**
     * The optional initial value for the object.
     */
    values?: JSONObject;
  }

  /**
   * An observable JSON change message.
   */
  export class ChangeMessage extends Message {
    /**
     * Create a new metadata changed message.
     */
    constructor(type: string, args: IObservableJSON.IChangedArgs) {
      super(type);
      this.args = args;
    }

    /**
     * The arguments of the change.
     */
    readonly args: IObservableJSON.IChangedArgs;
  }
}
