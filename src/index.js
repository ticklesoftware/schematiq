import React from "react";
import { Formik, Form, FieldArray } from "formik";
import { buildYup } from "json-schema-to-yup";
import { Field, ErrorMessage } from "formik";
import "./src/index.scss";

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

const Schematiq = ({
  formTitle,
  handleSubmit,
  fields,
  submitLabel,
  initialValues,
  card: Card
}) => {
  return (
    <>
      <h1>{formTitle}</h1>
      <Formik
        initialValues={initialValues}
        validateOnChange={true}
        validateOnBlur={true}
        validationSchema={jsonShape(fields)}
        onSubmit={handleSubmit}
        render={({ handleSubmit, isSubmitting, status, values }) => (
          <Form onSubmit={handleSubmit}>
            {fields.map(field => {
              return field.object ? (
                <>
                  {/* Repeater */}
                  <FieldArray
                    name={field.name}
                    render={({ insert, remove, push }) => (
                      <>
                        <label className="tickle__label">{field.label}</label>
                        {values[field.name] &&
                          values[field.name].length > 0 &&
                          values[field.name].map((friend, index) => (
                            <>
                              <Card key={index} className="tickle__card">
                                <span className="tickle__counter">{`#${index +
                                  1}`}</span>
                                {field.object.map(repeaterField => {
                                  return (
                                    <ItemField
                                      field={repeaterField}
                                      repeater={field.name}
                                      index={index}
                                    />
                                  );
                                })}

                                <div className="col">
                                  <button
                                    className="tickle__button tickle__remove"
                                    icon="minus"
                                    onClick={() => remove(index)}
                                  >
                                    {field.removeLabel || "Remove"}
                                  </button>
                                </div>
                              </Card>
                            </>
                          ))}
                        <button
                          type="button"
                          className="tickle__button"
                          icon="plus"
                          onClick={() => {
                            const object = {};
                            field.object.map((repeaterField, i) => {
                              object[repeaterField.name] = "";
                            });
                            push(object);
                          }}
                        >
                          {field.buttonLabel}
                        </button>
                      </>
                    )}
                  />
                </>
              ) : (
                <ItemField field={field} />
              );
            })}
            {status && status.msg && (
              <span className="tickle__error">{status.msg}</span>
            )}
            <button
              type="submit"
              className="tickle__button tickle__submit"
              disabled={isSubmitting}
            >
              {submitLabel || "Submit"}
            </button>
          </Form>
        )}
      />
    </>
  );
};

export default Schematiq;
