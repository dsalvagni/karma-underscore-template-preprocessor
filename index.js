var _, createUnderscorePreprocessor, createTemplateName;
_ = require("underscore");

createTemplateName = function(file, log) {
  var path = file.originalPath,
    folders = path.split("/"),
    lastFolder = folders[folders.length - 2].toLowerCase(),
    folder = lastFolder === "templates" ? "" : lastFolder,
    fullFileName = folders[folders.length - 1],
    fileNameParts = fullFileName.split("."),
    fileName = fileNameParts[0];

  log.debug('Processing "%s".', folder + fileName);

  return folder + fileName;
};

createUnderscorePreprocessor = function(args, config, logger) {
  "use strict";

  config = config || {};

  var log = logger.create("preprocessor.underscoreTemplate"),
    options = _.extend(args.options || {}, config.options || {}),
    globalTemplateVariable =
      args.globalTemplateVariable ||
      config.globalTemplateVariable ||
      "___templates___",
    beforeScript = args.beforeScript || config.beforeScript || "";

  return function(content, file, done) {
    var processed = null;

    var templateName = createTemplateName(file, log);

    log.debug('Processing "%s".', templateName);

    try {
      processed =
        "\
		(function() { " +
        beforeScript +
        "}).call(this);(function(_) {\
                this." +
        globalTemplateVariable +
        " = this." +
        globalTemplateVariable +
        " = this." +
        globalTemplateVariable +
        " || {} ;\
                this." +
        globalTemplateVariable +
        "['" +
        templateName +
        "'] = " +
        _.template(content).source +
        "}).call(this, _);";
    } catch (e) {
      log.error("%s\n  at %s", e.message, content);
    }

    done(processed);
  };
};

createUnderscorePreprocessor.$inject = [
  "args",
  "config.underscoreTemplatePreprocessor",
  "logger"
];

module.exports = {
  "preprocessor:underscoreTemplate": ["factory", createUnderscorePreprocessor]
};
