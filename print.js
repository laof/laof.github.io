const DEFAULT_PRINT_WINDOW_ID = "react-to-print-iframe";

function generatePrintWindow() {
  const printWindow = document.createElement("iframe");
  printWindow.width = `${document.documentElement.clientWidth}px`;
  printWindow.height = `${document.documentElement.clientHeight}px`;
  printWindow.style.position = "absolute";
  printWindow.style.top = `-${document.documentElement.clientHeight + 100}px`;
  printWindow.style.left = `-${document.documentElement.clientWidth + 100}px`;
  printWindow.id = DEFAULT_PRINT_WINDOW_ID;
  // Ensure we set a DOCTYPE on the iframe's document
  // https://github.com/MatthewHerbst/react-to-print/issues/459
  printWindow.srcdoc = "<!DOCTYPE html>";

  return printWindow;
}

window.aaa = (dom) => {
  const printWindow = generatePrintWindow();
  // When the iframe loads, import/clone the provided node into the iframe's document
  // and then start the print process.
  printWindow.onload = () => {
    try {
      const doc = printWindow.contentDocument || printWindow.contentWindow?.document;
      if (!doc) {
        throw new Error('Unable to access iframe document');
      }

      // Ensure the iframe document has a <body> to append into. Some browsers may not have it
      // available immediately even with a srcdoc, so create a minimal structure if needed.
      if (!doc.body) {
        doc.open();
        doc.write('<!DOCTYPE html><html><head></head><body></body></html>');
        doc.close();
      }

      let nodeToAppend;
      // If `dom` is a Node from the parent document, import it into the iframe document.
      if (dom instanceof Node && doc.importNode) {
        nodeToAppend = doc.importNode(dom, true);
      } else if (dom instanceof Node) {
        // Fallback: clone into the same document (may be the same doc already)
        nodeToAppend = dom.cloneNode(true);
      } else {
        // If `dom` is a string or something else, convert to a text node.
        nodeToAppend = doc.createTextNode(String(dom));
      }

      doc.body.appendChild(nodeToAppend);
    } catch (err) {
      console.error('Failed to append DOM into print iframe:', err);
    }

    startPrint(printWindow);
  };

  console.log("printWindow", printWindow);

  // Append the iframe to the parent document so it actually exists in the DOM and can load.
  document.body.appendChild(printWindow);
};

/**
 * Starts the main printing process. This includes determining if we are running the default
 * printing process or using a custom `print` function, handling updating the print windows's title
 * if a `documentTitle` is set, calling `onAfterPrint`, and removing the print iframe based on the
 * value of `preserveAfterPrint`.
 */
function startPrint(printWindow, options = {}) {
  const {
    documentTitle,
    onAfterPrint,
    onPrintError,
    preserveAfterPrint,
    print,
    suppressErrors,
  } = options;

  // Some browsers such as Safari don't always behave well without this timeout
  setTimeout(() => {
    if (printWindow.contentWindow) {
      printWindow.contentWindow.focus(); // Needed for IE 11

      function handleAfterPrint() {
        onAfterPrint?.();
        document.body.removeChild(document.getElementById(DEFAULT_PRINT_WINDOW_ID));
      }

      if (print) {
        print(printWindow)
          .then(handleAfterPrint)
          .catch((error) => {
            if (onPrintError) {
              onPrintError("print", getErrorFromUnknown(error));
            } else {
              
            }
          });
      } else {
        // Some browsers do not have a `.print` available, even though they should
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (printWindow.contentWindow.print) {
          const tempContentDocumentTitle =
            printWindow.contentDocument?.title ?? "";
          const tempOwnerDocumentTitle = printWindow.ownerDocument.title;

          // Override page and various target content titles during print
          // NOTE: some browsers seem to take the print title from the highest level
          // title, while others take it from the lowest level title. So, we set the title
          // in a few places and hope the current browser takes one of them :pray:
          if (documentTitle) {
            // Print filename in Chrome
            printWindow.ownerDocument.title = documentTitle;

            // Print filename in Firefox, Safari
            if (printWindow.contentDocument) {
              printWindow.contentDocument.title = documentTitle;
            }
          }

          printWindow.contentWindow.print();

          // Restore the page's original title information
          if (documentTitle) {
            printWindow.ownerDocument.title = tempOwnerDocumentTitle;

            if (printWindow.contentDocument) {
              printWindow.contentDocument.title = tempContentDocumentTitle;
            }
          }
        } else {
        
        }

        /**
         * This workaround is implemented to prevent a bug on mobile browsers where `handleAfterPrint`
         * is called immediately, even before the print dialog opens. This issue is described in #187.
         *
         * On mobile devices, a delay is introduced using `setTimeout` to ensure the dialog has time to open.
         *
         * @see [Stack Overflow Reference](https://stackoverflow.com/q/77215077/4899926)
         */
        if (isMobileBrowser()) {
          setTimeout(handleAfterPrint, 500);
        } else {
          handleAfterPrint();
        }
      }
    } else {
      
    }
  }, 500);
}

/**
 * Determines if the current browser is a mobile browser by checking the `navigator.userAgent`
 * against a predefined list of common mobile browser identifiers.
 *
 * Note: This function is not exhaustive and may not detect all mobile browsers,
 * as it is designed to remain simple and lightweight.
 *
 * @see [Stack Overflow Reference](https://stackoverflow.com/a/11381730/4899926)
 */
function isMobileBrowser() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return (
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      (
        navigator.userAgent ??
        // Retained for compatibility with browsers that use `navigator.vendor` to identify the browser.
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        navigator.vendor ??
        // Retained for compatibility with older versions of Opera that use `window.opera`.
        ("opera" in window && window.opera)
      ).match(toMatchItem)
    );
  });
}
