'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var name = "react-email-editor";
var version = "1.7.11";
var description = "Unlayer's Email Editor Component for React.js";
var main = "dist/index.js";
var typings = "dist/index.d.ts";
var files = [
	"dist"
];
var engines = {
	node: ">=10"
};
var scripts = {
	start: "tsdx watch",
	build: "tsdx build",
	test: "tsdx test",
	"test:watch": "tsdx test --watch",
	"test:coverage": "tsdx test --coverage",
	lint: "tsdx lint",
	prepare: "tsdx build",
	release: "npm run build && npm publish",
	"netlify-build": "cd demo && npm install && npm run build"
};
var peerDependencies = {
	react: ">=15"
};
var husky = {
	hooks: {
		"pre-commit": "tsdx lint"
	}
};
var dependencies = {
	"unlayer-types": "latest"
};
var devDependencies = {
	"@rollup/plugin-replace": "^5.0.2",
	"@testing-library/react": "^13.4.0",
	"@types/react": "^18.0.27",
	"@types/react-dom": "^18.0.10",
	husky: "^8.0.3",
	react: "^18.2.0",
	"react-dom": "^18.2.0",
	"rollup-plugin-copy": "^3.4.0",
	tsdx: "^0.14.1",
	tslib: "^2.4.1",
	typescript: "^4.9.4"
};
var author = "";
var homepage = "https://github.com/unlayer/react-email-editor#readme";
var license = "MIT";
var repository = "https://github.com/unlayer/react-email-editor.git";
var keywords = [
	"react-component"
];
var pkg = {
	name: name,
	version: version,
	description: description,
	main: main,
	typings: typings,
	files: files,
	engines: engines,
	scripts: scripts,
	peerDependencies: peerDependencies,
	husky: husky,
	dependencies: dependencies,
	devDependencies: devDependencies,
	author: author,
	homepage: homepage,
	license: license,
	repository: repository,
	keywords: keywords
};

var defaultScriptUrl = 'https://editor.unlayer.com/embed.js?2';
var callbacks = [];
var loaded = false;
var isScriptInjected = function isScriptInjected(scriptUrl) {
  var scripts = document.querySelectorAll('script');
  var injected = false;
  scripts.forEach(function (script) {
    if (script.src.includes(scriptUrl)) {
      injected = true;
    }
  });
  return injected;
};
var addCallback = function addCallback(callback) {
  callbacks.push(callback);
};
var runCallbacks = function runCallbacks() {
  if (loaded) {
    var callback;
    while (callback = callbacks.shift()) {
      callback();
    }
  }
};
var loadScript = function loadScript(callback, scriptUrl) {
  if (scriptUrl === void 0) {
    scriptUrl = defaultScriptUrl;
  }
  addCallback(callback);
  if (!isScriptInjected(scriptUrl)) {
    var embedScript = document.createElement('script');
    embedScript.setAttribute('src', scriptUrl);
    embedScript.onload = function () {
      loaded = true;
      runCallbacks();
    };
    document.head.appendChild(embedScript);
  } else {
    runCallbacks();
  }
};

var win = typeof window === 'undefined' ? {
  __unlayer_lastEditorId: 0
} : window;
win.__unlayer_lastEditorId = win.__unlayer_lastEditorId || 0;
var EmailEditor = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  var _props$appearance, _props$options, _props$options2, _props$locale, _props$options3, _props$projectId, _props$options4, _props$tools, _props$options5;
  var onLoad = props.onLoad,
    onReady = props.onReady,
    scriptUrl = props.scriptUrl,
    _props$minHeight = props.minHeight,
    minHeight = _props$minHeight === void 0 ? 500 : _props$minHeight,
    _props$style = props.style,
    style = _props$style === void 0 ? {} : _props$style;
  var _useState = React.useState(null),
    editor = _useState[0],
    setEditor = _useState[1];
  var _useState2 = React.useState(false),
    hasLoadedEmbedScript = _useState2[0],
    setHasLoadedEmbedScript = _useState2[1];
  var editorId = React.useMemo(function () {
    return props.editorId || "editor-" + ++win.__unlayer_lastEditorId;
  }, [props.editorId]);
  var options = _extends({}, props.options || {}, {
    appearance: (_props$appearance = props.appearance) != null ? _props$appearance : (_props$options = props.options) == null ? void 0 : _props$options.appearance,
    displayMode: (props == null ? void 0 : props.displayMode) || ((_props$options2 = props.options) == null ? void 0 : _props$options2.displayMode) || 'email',
    locale: (_props$locale = props.locale) != null ? _props$locale : (_props$options3 = props.options) == null ? void 0 : _props$options3.locale,
    projectId: (_props$projectId = props.projectId) != null ? _props$projectId : (_props$options4 = props.options) == null ? void 0 : _props$options4.projectId,
    tools: (_props$tools = props.tools) != null ? _props$tools : (_props$options5 = props.options) == null ? void 0 : _props$options5.tools,
    id: editorId,
    source: {
      name: pkg.name,
      version: pkg.version
    }
  });
  React.useImperativeHandle(ref, function () {
    return {
      editor: editor
    };
  }, [editor]);
  React.useEffect(function () {
    return function () {
      editor == null ? void 0 : editor.destroy();
    };
  }, []);
  React.useEffect(function () {
    setHasLoadedEmbedScript(false);
    loadScript(function () {
      return setHasLoadedEmbedScript(true);
    }, scriptUrl);
  }, [scriptUrl]);
  React.useEffect(function () {
    if (!hasLoadedEmbedScript) return;
    editor == null ? void 0 : editor.destroy();
    setEditor(unlayer.createEditor(options));
  }, [JSON.stringify(options), hasLoadedEmbedScript]);
  var methodProps = Object.keys(props).filter(function (propName) {
    return /^on/.test(propName);
  });
  React.useEffect(function () {
    if (!editor) return;
    onLoad == null ? void 0 : onLoad(editor);
    // All properties starting with on[Name] are registered as event listeners.
    methodProps.forEach(function (methodProp) {
      if (/^on/.test(methodProp) && methodProp !== 'onLoad' && methodProp !== 'onReady' && typeof props[methodProp] === 'function') {
        editor.addEventListener(methodProp, props[methodProp]);
      }
    });
    if (onReady) {
      editor.addEventListener('editor:ready', function () {
        onReady(editor);
      });
    }
  }, [editor, Object.keys(methodProps).join(',')]);
  return React__default.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      minHeight: minHeight
    }
  }, React__default.createElement("div", {
    id: editorId,
    style: _extends({}, style, {
      flex: 1
    })
  }));
});

exports.EmailEditor = EmailEditor;
exports.default = EmailEditor;
//# sourceMappingURL=react-email-editor.cjs.development.js.map
