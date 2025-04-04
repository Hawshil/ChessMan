// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as Belt_Map from "rescript/lib/es6/belt_Map.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Db$Coronate from "./Db.bs.js";
import * as ReactFeather from "react-feather";
import * as Hooks$Coronate from "./Hooks.bs.js";
import * as Utils$Coronate from "./Utils.bs.js";
import * as Router$Coronate from "./Router.bs.js";
import * as Window$Coronate from "./Window.bs.js";
import * as Data_Id$Coronate from "./Data/Data_Id.bs.js";
import * as Externals$Coronate from "./Externals/Externals.bs.js";
import * as HelpDialogs$Coronate from "./HelpDialogs.bs.js";
import VisuallyHidden from "@reach/visually-hidden";
import * as Data_Tournament$Coronate from "./Data/Data_Tournament.bs.js";

var dateSort = {
  TAG: /* GetDate */3,
  _0: (function (x) {
      return x.date;
    })
};

var nameSort = {
  TAG: /* GetString */0,
  _0: (function (x) {
      return x.name;
    })
};

function PageTournamentList(Props) {
  var windowDispatchOpt = Props.windowDispatch;
  var windowDispatch = windowDispatchOpt !== undefined ? windowDispatchOpt : (function (param) {
        
      });
  var match = Db$Coronate.useAllTournaments(undefined);
  var dispatch = match.dispatch;
  var tourneys = match.items;
  var match$1 = Hooks$Coronate.useSortedTable(Belt_Map.valuesToArray(tourneys), dateSort, true);
  var sortDispatch = match$1[1];
  var sorted = match$1[0];
  var match$2 = React.useState(function () {
        return "";
      });
  var setNewTourneyName = match$2[1];
  var newTourneyName = match$2[0];
  var newTourneyDialog = Hooks$Coronate.useBool(false);
  var helpDialog = Hooks$Coronate.useBool(false);
  React.useEffect((function () {
          Curry._1(windowDispatch, {
                TAG: /* SetTitle */2,
                _0: "Tournament list"
              });
          return (function (param) {
                    Curry._1(windowDispatch, {
                          TAG: /* SetTitle */2,
                          _0: ""
                        });
                  });
        }), [windowDispatch]);
  React.useEffect((function () {
          Curry._1(sortDispatch, {
                TAG: /* SetTable */2,
                _0: Belt_Map.valuesToArray(tourneys)
              });
        }), [
        tourneys,
        sortDispatch
      ]);
  var updateNewName = function ($$event) {
    Curry._1(setNewTourneyName, $$event.currentTarget.value);
  };
  var makeTournament = function ($$event) {
    $$event.preventDefault();
    var id = Data_Id$Coronate.random(undefined);
    Curry._1(dispatch, {
          TAG: /* Set */1,
          _0: id,
          _1: Data_Tournament$Coronate.make(id, newTourneyName)
        });
    Curry._1(setNewTourneyName, (function (param) {
            return "";
          }));
    Curry._1(newTourneyDialog.setFalse, undefined);
  };
  return React.createElement(Window$Coronate.Body.make, {
              children: React.createElement("div", {
                    className: "content-area"
                  }, React.createElement("div", {
                        className: "toolbar"
                      }, React.createElement("button", {
                            onClick: (function (param) {
                                Curry._1(newTourneyDialog.setTrue, undefined);
                              })
                          }, React.createElement(ReactFeather.Plus, {}), " Add tournament"), React.createElement("button", {
                            className: "button-ghost",
                            onClick: (function (param) {
                                Curry._1(helpDialog.setTrue, undefined);
                              })
                          }, React.createElement(ReactFeather.HelpCircle, {}), React.createElement(VisuallyHidden, {
                                children: " Tournament information"
                              }))), React.createElement(HelpDialogs$Coronate.SwissTournament.make, {
                        state: helpDialog,
                        ariaLabel: "Tournament information"
                      }), Belt_Map.isEmpty(tourneys) ? React.createElement("p", undefined, "No tournaments are added yet.") : React.createElement("table", undefined, React.createElement("caption", undefined, "Tournament list"), React.createElement("thead", undefined, React.createElement("tr", undefined, React.createElement("th", undefined, React.createElement(Hooks$Coronate.SortButton.make, {
                                          children: "Name",
                                          sortColumn: nameSort,
                                          data: sorted,
                                          dispatch: sortDispatch
                                        })), React.createElement("th", undefined, React.createElement(Hooks$Coronate.SortButton.make, {
                                          children: "Date",
                                          sortColumn: dateSort,
                                          data: sorted,
                                          dispatch: sortDispatch
                                        })), React.createElement("th", undefined, React.createElement(VisuallyHidden, {
                                          children: "Controls"
                                        })))), React.createElement("tbody", {
                              className: "content"
                            }, Belt_Array.map(sorted.table, (function (param) {
                                    var name = param.name;
                                    var id = param.id;
                                    return React.createElement("tr", {
                                                key: Data_Id$Coronate.toString(id)
                                              }, React.createElement("td", undefined, React.createElement(Router$Coronate.Link.make, {
                                                        children: name,
                                                        to_: {
                                                          TAG: /* Tournament */0,
                                                          _0: id,
                                                          _1: /* Players */0
                                                        }
                                                      })), React.createElement("td", undefined, React.createElement(Utils$Coronate.DateFormat.make, {
                                                        date: param.date
                                                      })), React.createElement("td", undefined, React.createElement("button", {
                                                        "aria-label": "Delete “" + name + "”",
                                                        className: "danger button-ghost",
                                                        title: "Delete " + name,
                                                        onClick: (function (param) {
                                                            var message = "Are you sure you want to delete “" + name + "”?";
                                                            if (window.confirm(message)) {
                                                              return Curry._1(dispatch, {
                                                                          TAG: /* Del */0,
                                                                          _0: id
                                                                        });
                                                            }
                                                            
                                                          })
                                                      }, React.createElement(ReactFeather.Trash2, {}))));
                                  })))), React.createElement(Externals$Coronate.Dialog.make, {
                        isOpen: newTourneyDialog.state,
                        onDismiss: newTourneyDialog.setFalse,
                        ariaLabel: "Create new tournament",
                        children: null,
                        className: ""
                      }, React.createElement("button", {
                            className: "button-micro",
                            onClick: (function (param) {
                                Curry._1(newTourneyDialog.setFalse, undefined);
                              })
                          }, "Close"), React.createElement("form", {
                            onSubmit: makeTournament
                          }, React.createElement("fieldset", undefined, React.createElement("legend", undefined, "Make a new tournament"), React.createElement("p", undefined, React.createElement("label", {
                                        htmlFor: "tourney-name"
                                      }, "Name:"), React.createElement("input", {
                                        id: "tourney-name",
                                        name: "tourney-name",
                                        placeholder: "tournament name",
                                        required: true,
                                        type: "text",
                                        value: newTourneyName,
                                        onChange: updateNewName
                                      })), React.createElement("p", undefined, React.createElement("input", {
                                        className: "button-primary",
                                        type: "submit",
                                        value: "Create"
                                      })))))),
              windowDispatch: windowDispatch
            });
}

var make = PageTournamentList;

export {
  make ,
}
/* react Not a pure module */
