// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as $$Promise from "@ryyppy/rescript-promise/src/Promise.bs.js";
import * as Belt_Map from "rescript/lib/es6/belt_Map.js";
import * as Belt_Set from "rescript/lib/es6/belt_Set.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as Localforage from "localforage";
import * as Hooks$Coronate from "./Hooks.bs.js";
import * as Data_Id$Coronate from "./Data/Data_Id.bs.js";
import * as DemoData$Coronate from "./testdata/DemoData.bs.js";
import * as Data_Auth$Coronate from "./Data/Data_Auth.bs.js";
import * as Data_Config$Coronate from "./Data/Data_Config.bs.js";
import * as Data_Player$Coronate from "./Data/Data_Player.bs.js";
import * as LocalForage_Id$Coronate from "./Externals/LocalForage_Id.bs.js";
import * as Data_Tournament$Coronate from "./Data/Data_Tournament.bs.js";
import * as LocalForage_Map$Coronate from "./Externals/LocalForage_Map.bs.js";
import * as LocalForage_Record$Coronate from "./Externals/LocalForage_Record.bs.js";

function func(prim0, prim1, prim2, prim3, prim4, prim5, prim6) {
  var tmp = {
    name: prim2,
    storeName: prim4
  };
  if (prim0 !== undefined) {
    tmp.description = prim0;
  }
  if (prim1 !== undefined) {
    tmp.driver = Caml_option.valFromOption(prim1);
  }
  if (prim3 !== undefined) {
    tmp.size = prim3;
  }
  if (prim5 !== undefined) {
    tmp.version = prim5;
  }
  return tmp;
}

var Config = LocalForage_Id$Coronate.MakeEncodable({
      encode: Data_Config$Coronate.encode,
      decode: Data_Config$Coronate.decode
    });

var Player = LocalForage_Id$Coronate.MakeEncodable({
      encode: Data_Player$Coronate.encode,
      decode: Data_Player$Coronate.decode
    });

var Tournament = LocalForage_Id$Coronate.MakeEncodable({
      encode: Data_Tournament$Coronate.encode,
      decode: Data_Tournament$Coronate.decode
    });

var Auth = LocalForage_Id$Coronate.MakeEncodable(Data_Auth$Coronate);

var configDb = LocalForage_Record$Coronate.make(func(undefined, undefined, "Coronate", undefined, "Options", undefined, undefined), Config);

var authDb = LocalForage_Record$Coronate.make(func(undefined, undefined, "Coronate", undefined, "Auth", undefined, undefined), Auth);

var players = LocalForage_Map$Coronate.make(func(undefined, undefined, "Coronate", undefined, "Players", undefined, undefined), Player);

var tournaments = LocalForage_Map$Coronate.make(func(undefined, undefined, "Coronate", undefined, "Tournaments", undefined, undefined), Tournament);

function loadDemoDB(param) {
  ((document.body.style.cursor = "wait"));
  $$Promise.$$catch(Promise.all([
                LocalForage_Record$Coronate.set(configDb, DemoData$Coronate.config),
                LocalForage_Map$Coronate.setItems(players, Curry._1(Data_Id$Coronate.$$Map.toStringArray, DemoData$Coronate.players)),
                LocalForage_Map$Coronate.setItems(tournaments, Curry._1(Data_Id$Coronate.$$Map.toStringArray, DemoData$Coronate.tournaments))
              ]).then(function (param) {
              window.alert("Demo data loaded!");
            }), (function (param) {
            ((document.body.style.cursor = "auto"));
            window.alert("Couldn't load demo data.");
            return Promise.resolve(undefined);
          })).finally(function (param) {
        ((document.body.style.cursor = "auto"));
      });
}

function genericDbReducer(state, action) {
  switch (action.TAG | 0) {
    case /* Del */0 :
        return Belt_Map.remove(state, action._0);
    case /* Set */1 :
        return Belt_Map.set(state, action._0, action._1);
    case /* SetAll */2 :
        return action._0;
    
  }
}

function useAllDb(store) {
  var match = React.useReducer(genericDbReducer, Belt_Map.make(Data_Id$Coronate.id));
  var dispatch = match[1];
  var items = match[0];
  var loaded = Hooks$Coronate.useBool(false);
  Hooks$Coronate.useLoadingCursorUntil(loaded.state);
  React.useEffect((function () {
          var didCancel = {
            contents: false
          };
          $$Promise.$$catch(LocalForage_Map$Coronate.getAllItems(store).then(function (results) {
                    if (!didCancel.contents) {
                      Curry._1(dispatch, {
                            TAG: /* SetAll */2,
                            _0: Data_Id$Coronate.$$Map.fromStringArray(results)
                          });
                      return Curry._1(loaded.setTrue, undefined);
                    }
                    
                  }), (function (error) {
                  if (!didCancel.contents) {
                    console.error(error);
                    Localforage.clear();
                    Curry._1(loaded.setTrue, undefined);
                  }
                  return Promise.resolve(undefined);
                }));
          return (function (param) {
                    didCancel.contents = true;
                  });
        }), []);
  React.useEffect((function () {
          if (loaded.state) {
            LocalForage_Map$Coronate.setItems(store, Curry._1(Data_Id$Coronate.$$Map.toStringArray, items)).then(function (param) {
                    return LocalForage_Map$Coronate.getKeys(store);
                  }).then(function (keys) {
                  var deleted = Belt_Array.keep(keys, (function (x) {
                          return !Belt_Map.has(items, Data_Id$Coronate.fromString(x));
                        }));
                  return LocalForage_Map$Coronate.removeItems(store, deleted);
                });
          }
          
        }), [
        items,
        loaded.state
      ]);
  return {
          items: items,
          dispatch: dispatch,
          loaded: loaded.state
        };
}

function useAllPlayers(param) {
  return useAllDb(players);
}

function useAllTournaments(param) {
  return useAllDb(tournaments);
}

function configReducer(state, action) {
  switch (action.TAG | 0) {
    case /* AddAvoidPair */0 :
        return {
                avoidPairs: Belt_Set.add(state.avoidPairs, action._0),
                byeValue: state.byeValue,
                lastBackup: state.lastBackup,
                whiteAlias: state.whiteAlias,
                blackAlias: state.blackAlias
              };
    case /* DelAvoidPair */1 :
        return {
                avoidPairs: Belt_Set.remove(state.avoidPairs, action._0),
                byeValue: state.byeValue,
                lastBackup: state.lastBackup,
                whiteAlias: state.whiteAlias,
                blackAlias: state.blackAlias
              };
    case /* DelAvoidSingle */2 :
        var id = action._0;
        return {
                avoidPairs: Belt_Set.keep(state.avoidPairs, (function (pair) {
                        return !Data_Id$Coronate.Pair.has(pair, id);
                      })),
                byeValue: state.byeValue,
                lastBackup: state.lastBackup,
                whiteAlias: state.whiteAlias,
                blackAlias: state.blackAlias
              };
    case /* SetAvoidPairs */3 :
        return {
                avoidPairs: action._0,
                byeValue: state.byeValue,
                lastBackup: state.lastBackup,
                whiteAlias: state.whiteAlias,
                blackAlias: state.blackAlias
              };
    case /* SetByeValue */4 :
        return {
                avoidPairs: state.avoidPairs,
                byeValue: action._0,
                lastBackup: state.lastBackup,
                whiteAlias: state.whiteAlias,
                blackAlias: state.blackAlias
              };
    case /* SetState */5 :
        return action._0;
    case /* SetLastBackup */6 :
        return {
                avoidPairs: state.avoidPairs,
                byeValue: state.byeValue,
                lastBackup: action._0,
                whiteAlias: state.whiteAlias,
                blackAlias: state.blackAlias
              };
    case /* SetWhiteAlias */7 :
        return {
                avoidPairs: state.avoidPairs,
                byeValue: state.byeValue,
                lastBackup: state.lastBackup,
                whiteAlias: Data_Config$Coronate.alias(action._0),
                blackAlias: state.blackAlias
              };
    case /* SetBlackAlias */8 :
        return {
                avoidPairs: state.avoidPairs,
                byeValue: state.byeValue,
                lastBackup: state.lastBackup,
                whiteAlias: state.whiteAlias,
                blackAlias: Data_Config$Coronate.alias(action._0)
              };
    
  }
}

function useConfig(param) {
  var match = React.useReducer(configReducer, Data_Config$Coronate.$$default);
  var dispatch = match[1];
  var config = match[0];
  var loaded = Hooks$Coronate.useBool(false);
  React.useEffect((function () {
          var didCancel = {
            contents: false
          };
          $$Promise.$$catch(LocalForage_Record$Coronate.get(configDb).then(function (values) {
                    if (!didCancel.contents) {
                      Curry._1(dispatch, {
                            TAG: /* SetState */5,
                            _0: values
                          });
                      return Curry._1(loaded.setTrue, undefined);
                    }
                    
                  }), (function (error) {
                  if (!didCancel.contents) {
                    console.error(error);
                    Localforage.clear();
                    Curry._1(dispatch, {
                          TAG: /* SetState */5,
                          _0: Data_Config$Coronate.$$default
                        });
                    Curry._1(loaded.setTrue, undefined);
                  }
                  return Promise.resolve(undefined);
                }));
          return (function (param) {
                    didCancel.contents = true;
                  });
        }), []);
  React.useEffect((function () {
          if (loaded.state) {
            LocalForage_Record$Coronate.set(configDb, config);
          }
          
        }), [
        config,
        loaded.state
      ]);
  return [
          config,
          dispatch
        ];
}

function authReducer(state, action) {
  if (typeof action === "number") {
    if (action === /* RemoveGistId */0) {
      return {
              github_token: state.github_token,
              github_gist_id: ""
            };
    } else {
      return Data_Auth$Coronate.$$default;
    }
  }
  switch (action.TAG | 0) {
    case /* SetGitHubToken */0 :
        return {
                github_token: action._0,
                github_gist_id: state.github_gist_id
              };
    case /* SetGistId */1 :
        return {
                github_token: state.github_token,
                github_gist_id: action._0
              };
    case /* SetState */2 :
        return action._0;
    
  }
}

function useAuth(param) {
  var match = React.useReducer(authReducer, Data_Auth$Coronate.$$default);
  var dispatch = match[1];
  var auth = match[0];
  var loaded = Hooks$Coronate.useBool(false);
  React.useEffect((function () {
          var didCancel = {
            contents: false
          };
          $$Promise.$$catch(LocalForage_Record$Coronate.get(authDb).then(function (values) {
                    if (!didCancel.contents) {
                      Curry._1(dispatch, {
                            TAG: /* SetState */2,
                            _0: values
                          });
                      return Curry._1(loaded.setTrue, undefined);
                    }
                    
                  }), (function (param) {
                  if (!didCancel.contents) {
                    Localforage.clear();
                    Curry._1(dispatch, {
                          TAG: /* SetState */2,
                          _0: Data_Auth$Coronate.$$default
                        });
                    Curry._1(loaded.setTrue, undefined);
                  }
                  return Promise.resolve(undefined);
                }));
          return (function (param) {
                    didCancel.contents = true;
                  });
        }), []);
  React.useEffect((function () {
          if (loaded.state) {
            LocalForage_Record$Coronate.set(authDb, auth);
          }
          
        }), [
        auth,
        loaded.state
      ]);
  return [
          auth,
          dispatch
        ];
}

export {
  loadDemoDB ,
  Config ,
  Tournament ,
  Player ,
  tournaments ,
  useAllPlayers ,
  useAllTournaments ,
  useConfig ,
  useAuth ,
}
/* Config Not a pure module */
