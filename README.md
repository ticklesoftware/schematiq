# schematiq
Generate Formik React forms via JSON schema with Yup validation

## How to install

The package is installable using the following commands: 
```npm install schematiq```

## Example of use 

```jsx
<Schematiq fields={schema} />
```
  

## Building your schema
Coming soon

## Schema API
### Syntax
| Field  | Default | Example | Description |
|---|---|---|---|
 `name` | none | options |Name of the field, this is how it will be saved in the state management  |
 `label` | none | Options | Label title |
 `type` | text | select  | If `component` is `input` the type can be any HTML like input type |
 `component` | input | select | HTML . Custom components *not* supported but on the list. |
 `required` | false | true | Whether the field is required |
 `yup` | false | Object | Yup object that gets parsed |

### Yup object
| Field  | Options | Description |
|---|---|---|
type | ["string", "email", "number", "boolean", "array"] | Validation type - check [yup requirements](https://github.com/jquense/yup#api)
checks | Array | Array of objects for all the validation rules. All objects have to have a key and a value. Check [yup requirements](https://github.com/jquense/yup#api) for more options |


## Example of schema
```jsx
const schema = [
  {
    name: "title",
    label: "Title",
    type: "input",
    component: "input",
    required: true,
    yup: {
      type: "string",
      checks: [
        {
          key: "minLength",
          val: 5
        },
        {
          key: "maxLength",
          val: 100
        }
      ]
    }
  },
  {
    name: "file",
    label: "File",
    type: "file",
    component: "input"
  },
  {
    name: "select",
    label: "Select",
    type: "select",
    component: "select",
    options: [1, { label: "two", value: 2 }, 3, 4, 5, 6]
  },
  {
    name: "checkbox",
    label: "Checkbox",
    type: "checkbox"
  },

  {
    name: "email",
    label: "Email address",
    type: "input",
    required: true,
    validation: {
      type: "string",
      checks: [
        {
          key: "email",
          val: true
        }
      ]
    }
  },
  {
    name: "about",
    label: "About",
    type: "textarea"
  },
  {
    name: "openingTimes",
    label: "Opening Times",
    object: [
      {
        name: "day",
        label: "Day",
        type: "select",
        component: "select",
        options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
      },
      {
        name: "time",
        label: "Time range",
      }
    ],
    buttonLabel: "Add opening time"
  }
];
```
