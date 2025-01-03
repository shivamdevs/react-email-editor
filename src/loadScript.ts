const defaultScriptUrl = 'https://editor.unlayer.com/embed.js?2';
const callbacks: Function[] = [];
let loaded = false;

const isScriptInjected = (scriptUrl: string) => {
  const scripts = document.querySelectorAll('script');
  let injected = false;

  scripts.forEach((script) => {
    if (script.src.includes(scriptUrl)) {
      injected = true;
    }
  });

  return injected;
};

const overrideWindowLocation = () => {
  const originalLocation = window.location;

  Object.defineProperty(window, 'location', {
    configurable: true,
    enumerable: true,
    get: function() {
      // Provide a fake location for the target script
      return {
        href: 'https://fake-url-for-script.com',
        protocol: 'https:',
        host: 'fake-url-for-script.com',
        hostname: 'fake-url-for-script.com',
        pathname: '/',
        search: '',
        hash: '',
      };
    },
    set: function(newValue) {
      originalLocation.href = newValue; // Allow regular behavior for other scripts
    },
  });

  return () => {
    // Restore the original window.location
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: originalLocation,
    });
  };
};

const addCallback = (callback: Function) => {
  callbacks.push(callback);
};

const runCallbacks = () => {
  if (loaded) {
    let callback;

    while ((callback = callbacks.shift())) {
      callback();
    }
  }
};

export const loadScript = (
  callback: Function,
  scriptUrl = defaultScriptUrl
) => {
  addCallback(callback);

  if (!isScriptInjected(scriptUrl)) {
    const cleanup = overrideWindowLocation();
    const embedScript = document.createElement('script');
    embedScript.setAttribute('src', scriptUrl);
    embedScript.onload = () => {
      loaded = true;
      cleanup();
      runCallbacks();
    };
    document.head.appendChild(embedScript);
  } else {
    runCallbacks();
  }
};
