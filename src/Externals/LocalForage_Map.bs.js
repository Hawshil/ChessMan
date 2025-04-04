// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as Js_dict from "rescript/lib/es6/js_dict.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as Localforage from "localforage";
import * as Caml_js_exceptions from "rescript/lib/es6/caml_js_exceptions.js";

function make(config, data) {
  return {
          store: Localforage.createInstance(config),
          encode: data.encode,
          decode: data.decode
        };
}

function getItem(param, key) {
  var decode = param.decode;
  return param.store.getItem(key).then(function (value) {
              var value$1;
              try {
                value$1 = Belt_Option.mapU((value == null) ? undefined : Caml_option.some(value), decode);
              }
              catch (raw_error){
                return Promise.reject(Caml_js_exceptions.internalToOCamlException(raw_error));
              }
              return Promise.resolve(value$1);
            });
}

function setItem(param, key, v) {
  return param.store.setItem(key, param.encode(v));
}

function getKeys(param) {
  return param.store.keys();
}

function mapValues(param, f) {
  return [
          param[0],
          f(param[1])
        ];
}

function parseItems(decode, items) {
  return Js_dict.entries(items).map(function (param) {
              return mapValues(param, decode);
            });
}

function getItems(param, keys) {
  var decode = param.decode;
  return param.store.getItems(keys).then(function (items) {
              var items$1;
              try {
                items$1 = parseItems(decode, items);
              }
              catch (raw_error){
                return Promise.reject(Caml_js_exceptions.internalToOCamlException(raw_error));
              }
              return Promise.resolve(items$1);
            });
}

function getAllItems(param) {
  var decode = param.decode;
  return param.store.getItems().then(function (items) {
              var items$1;
              try {
                items$1 = parseItems(decode, items);
              }
              catch (raw_error){
                return Promise.reject(Caml_js_exceptions.internalToOCamlException(raw_error));
              }
              return Promise.resolve(items$1);
            });
}

function setItems(param, items) {
  var encode = param.encode;
  return param.store.setItems(Js_dict.fromArray(items.map(function (param) {
                      return mapValues(param, encode);
                    })));
}

function removeItems(param, items) {
  return param.store.removeItems(items);
}

function iterateU(param, f) {
  var decode = param.decode;
  return param.store.iterate(function (value, key, iterationNumber) {
              f(decode(value), key, iterationNumber);
            });
}

function iterate(map, f) {
  return iterateU(map, Curry.__3(f));
}

export {
  make ,
  getItem ,
  setItem ,
  getKeys ,
  getItems ,
  getAllItems ,
  setItems ,
  removeItems ,
  iterateU ,
  iterate ,
}
/* localforage Not a pure module */
