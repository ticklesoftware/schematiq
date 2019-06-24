"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.jsonShape = void 0;

var _react = _interopRequireDefault(require("react"));

var _jsonSchemaToYup = require("json-schema-to-yup");

var _formik = require("formik");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ItemField = function ItemField(_ref) {
  var field = _ref.field,
      repeater = _ref.repeater,
      index = _ref.index;
  return _react["default"].createElement("div", {
    className: "tickle__itemWrapper"
  }, _react["default"].createElement("label", {
    htmlFor: field.name
  }, field.label, " ", field.required && "*"), _react["default"].createElement(_formik.Field, {
    className: "tickle__item ".concat(field.className || ""),
    key: field.name,
    component: field.component || "input",
    options: field.options,
    name: repeater ? "".concat(repeater, ".").concat(index, ".").concat(field.name) : field.name,
    type: field.type,
    hasFeedback: true,
    placeholder: field.placeholder
  }, field.options && field.options.map(function (option) {
    return _react["default"].createElement("option", {
      value: option.value || option
    }, option.label || option);
  })), _react["default"].createElement("span", {
    className: "tickle__error"
  }, _react["default"].createElement(_formik.ErrorMessage, {
    name: field.name
  })));
};

var jsonShape = function jsonShape(fields, name) {
  var shape = {
    title: name,
    type: "object",
    log: true,
    required: [],
    properties: {}
  };
  var config = {
    errMessages: {}
  };
  fields.forEach(function (f) {
    console.log(f);
    var nullable = false;
    var name = f.verb ? "".concat(f.name, "__").concat(f.verb) : f.name;
    config.errMessages[name] = {};

    if (f.required) {
      shape.required.push(name);
      config.errMessages[name].required = "".concat(f.label, " is required");
      config.errMessages[name].string = "".concat(f.label, " is required");
    } else {
      nullable = true;
    }

    if (f.yup && f.yup.type) {
      shape.properties[name] = {
        type: f.yup.type
      };
      f.yup.checks.forEach(function (check) {
        shape.properties[name][check.key] = check.val;

        if (check.err) {
          config.errMessages[name][check.key] = check.err;
        }
      });
      shape.properties[name].nullable = nullable || false;
    }
  });
  console.log((0, _jsonSchemaToYup.buildYup)(shape, config));
  return (0, _jsonSchemaToYup.buildYup)(shape, config);
};

exports.jsonShape = jsonShape;
var _default = ItemField;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.jsonShape = void 0;

var _react = _interopRequireDefault(require("react"));

var _formik = require("formik");

var _jsonSchemaToYup = require("json-schema-to-yup");

require("./src/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ItemField = function ItemField(_ref) {
  var field = _ref.field,
      repeater = _ref.repeater,
      index = _ref.index;
  return _react["default"].createElement("div", {
    className: "tickle__itemWrapper"
  }, _react["default"].createElement("label", {
    htmlFor: field.name
  }, field.label, " ", field.required && "*"), _react["default"].createElement(_formik.Field, {
    className: "tickle__item ".concat(field.className || ""),
    key: field.name,
    component: field.component || "input",
    options: field.options,
    name: repeater ? "".concat(repeater, ".").concat(index, ".").concat(field.name) : field.name,
    type: field.type,
    hasFeedback: true,
    placeholder: field.placeholder
  }, field.options && field.options.map(function (option) {
    return _react["default"].createElement("option", {
      value: option.value || option
    }, option.label || option);
  })), _react["default"].createElement("span", {
    className: "tickle__error"
  }, _react["default"].createElement(_formik.ErrorMessage, {
    name: field.name
  })));
};

var jsonShape = function jsonShape(fields, name) {
  var shape = {
    title: name,
    type: "object",
    log: true,
    required: [],
    properties: {}
  };
  var config = {
    errMessages: {}
  };
  fields.forEach(function (f) {
    console.log(f);
    var nullable = false;
    var name = f.verb ? "".concat(f.name, "__").concat(f.verb) : f.name;
    config.errMessages[name] = {};

    if (f.required) {
      shape.required.push(name);
      config.errMessages[name].required = "".concat(f.label, " is required");
      config.errMessages[name].string = "".concat(f.label, " is required");
    } else {
      nullable = true;
    }

    if (f.yup && f.yup.type) {
      shape.properties[name] = {
        type: f.yup.type
      };
      f.yup.checks.forEach(function (check) {
        shape.properties[name][check.key] = check.val;

        if (check.err) {
          config.errMessages[name][check.key] = check.err;
        }
      });
      shape.properties[name].nullable = nullable || false;
    }
  });
  console.log((0, _jsonSchemaToYup.buildYup)(shape, config));
  return (0, _jsonSchemaToYup.buildYup)(shape, config);
};

exports.jsonShape = jsonShape;

var Schematiq = function Schematiq(_ref2) {
  var formTitle = _ref2.formTitle,
      handleSubmit = _ref2.handleSubmit,
      fields = _ref2.fields,
      submitLabel = _ref2.submitLabel,
      initialValues = _ref2.initialValues,
      Card = _ref2.card;
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("h1", null, formTitle), _react["default"].createElement(_formik.Formik, {
    initialValues: initialValues,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: jsonShape(fields),
    onSubmit: handleSubmit,
    render: function render(_ref3) {
      var handleSubmit = _ref3.handleSubmit,
          isSubmitting = _ref3.isSubmitting,
          status = _ref3.status,
          values = _ref3.values;
      return _react["default"].createElement(_formik.Form, {
        onSubmit: handleSubmit
      }, fields.map(function (field) {
        return field.object ? _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_formik.FieldArray, {
          name: field.name,
          render: function render(_ref4) {
            var insert = _ref4.insert,
                remove = _ref4.remove,
                push = _ref4.push;
            return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("label", {
              className: "tickle__label"
            }, field.label), values[field.name] && values[field.name].length > 0 && values[field.name].map(function (friend, index) {
              return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(Card, {
                key: index,
                className: "tickle__card"
              }, _react["default"].createElement("span", {
                className: "tickle__counter"
              }, "#".concat(index + 1)), field.object.map(function (repeaterField) {
                return _react["default"].createElement(ItemField, {
                  field: repeaterField,
                  repeater: field.name,
                  index: index
                });
              }), _react["default"].createElement("div", {
                className: "col"
              }, _react["default"].createElement("button", {
                className: "tickle__button tickle__remove",
                icon: "minus",
                onClick: function onClick() {
                  return remove(index);
                }
              }, field.removeLabel || "Remove"))));
            }), _react["default"].createElement("button", {
              type: "button",
              className: "tickle__button",
              icon: "plus",
              onClick: function onClick() {
                var object = {};
                field.object.map(function (repeaterField, i) {
                  object[repeaterField.name] = "";
                });
                push(object);
              }
            }, field.buttonLabel));
          }
        })) : _react["default"].createElement(ItemField, {
          field: field
        });
      }), status && status.msg && _react["default"].createElement("span", {
        className: "tickle__error"
      }, status.msg), _react["default"].createElement("button", {
        type: "submit",
        className: "tickle__button tickle__submit",
        disabled: isSubmitting
      }, submitLabel || "Submit"));
    }
  }));
};

var _default = Schematiq;
exports["default"] = _default;
