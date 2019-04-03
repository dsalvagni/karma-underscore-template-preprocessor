# karma-underscore-template-preprocessor

Enables support the underscore.js template system.

# Usage

```
npm install karma-underscore-template-preprocessor --save-dev
```

karma.conf.js

```

files: ["underscore.min.js","**/*.jst"],

preprocessors: {
    "**/*.jst": ["underscoreTemplate"]
},

underscoreTemplatePreprocessor: {
    beforeScript: "window.Namespace = window.Namespace || {}; Namespace.templates = Namespace.templates || {};",
    globalTemplateVariable: "Namespace.templates"
},
```

`globalTemplateVariable` will set the global variable that's used to hold your compiled templates.
`beforeScript` will be execute before compiling each template file.


# Result on your test files
For a given template file locate in: `folder/templates/meeting/item.jst` > `Namespace.templates.meetingItem()`;
For a given templatee located on template root folder: `folder/templates/item.jst` > `Namespace.templates.item()`;
