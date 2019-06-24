import React from "react";
import { buildYup } from "json-schema-to-yup";

import { Field, ErrorMessage } from "formik";

const ItemField = ({ field, repeater, index }) => {
  return (
    <div className="tickle__itemWrapper">
      <label htmlFor={field.name}>
        {field.label} {field.required && "*"}
      </label>
      <Field
        className={`tickle__item ${field.className || ""}`}
        key={field.name}
        component={field.component || "input"}
        options={field.options}
        name={repeater ? `${repeater}.${index}.${field.name}` : field.name}
        type={field.type}
        hasFeedback
        placeholder={field.placeholder}
      >
        {field.options &&
          field.options.map(option => (
            <option value={option.value || option}>
              {option.label || option}
            </option>
          ))}
      </Field>
      <span className="tickle__error">
        <ErrorMessage name={field.name} />
      </span>
    </div>
  );
};

export const jsonShape = (fields, name) => {
  const shape = {
    title: name,
    type: "object",
    log: true,
    required: [],
    properties: {}
  };
  const config = { errMessages: {} };
  fields.forEach(f => {
    console.log(f);
    let nullable = false;
    const name = f.verb ? `${f.name}__${f.verb}` : f.name;
    config.errMessages[name] = {};
    if (f.required) {
      shape.required.push(name);
      config.errMessages[name].required = `${f.label} is required`;
      config.errMessages[name].string = `${f.label} is required`;
    } else {
      nullable = true;
    }
    if (f.yup && f.yup.type) {
      shape.properties[name] = { type: f.yup.type };
      f.yup.checks.forEach(check => {
        shape.properties[name][check.key] = check.val;
        if (check.err) {
          config.errMessages[name][check.key] = check.err;
        }
      });
      shape.properties[name].nullable = nullable || false;
    }
  });
  console.log(buildYup(shape, config));
  return buildYup(shape, config);
};

export default ItemField;
