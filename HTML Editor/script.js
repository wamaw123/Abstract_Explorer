document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const editorBody = document.getElementById('editorBody');
    const mainHeader = document.getElementById('mainHeader');
    const mainContent = document.getElementById('mainContent');
    const mainFooter = document.getElementById('mainFooter');
    const editorWrapper = document.getElementById('editorWrapper');

    const fileInput = document.getElementById('fileInput');
    const loadButton = document.getElementById('loadButton');
    const saveButton = document.getElementById('saveButton');
    const editorFrame = document.getElementById('editorFrame');
    const toolbar = document.getElementById('toolbar');
    
    const htmlSourceViewContainer = document.getElementById('htmlSourceViewContainer');
    const htmlSourceView = document.getElementById('htmlSourceView'); 

    const toggleHtmlViewButton = document.getElementById('toggleHtmlView');
    const toggleFullScreenButton = document.getElementById('toggleFullScreen');
    const wordCountDisplay = document.getElementById('wordCount');

    // Modals & Modal Controls
    const modalOverlay = document.getElementById('modalOverlay');
    const linkModal = document.getElementById('linkModal');
    const linkModalTitle = document.getElementById('linkModalTitle');
    const linkUrlInput = document.getElementById('linkUrl');
    const linkTextInput = document.getElementById('linkText');
    const confirmLinkModal = document.getElementById('confirmLinkModal');
    const cancelLinkModal = document.getElementById('cancelLinkModal');
    
    const imageModal = document.getElementById('imageModal');
    const imageModalTitle = imageModal.querySelector('h3');
    const imageUrlInput = document.getElementById('imageUrl');
    const imageFileUploadInput = document.getElementById('imageFileUpload'); 
    const imageAltInput = document.getElementById('imageAlt');
    const imageWidthInput = document.getElementById('imageWidth');
    const imageHeightInput = document.getElementById('imageHeight');
    const confirmImageModal = document.getElementById('confirmImageModal');
    const cancelImageModal = document.getElementById('cancelImageModal');
    
    const tableModal = document.getElementById('tableModal');
    const tableRowsInput = document.getElementById('tableRows');
    const tableColsInput = document.getElementById('tableCols');
    const confirmTableModal = document.getElementById('confirmTableModal');
    const cancelTableModal = document.getElementById('cancelTableModal');

    // New Blocks Modal Elements
    const blocksModal = document.getElementById('blocksModal');
    const blocksGrid = document.getElementById('blocksGrid');
    const cancelBlocksModal = document.getElementById('cancelBlocksModal');


    const customContextMenu = document.getElementById('customContextMenu');
    const contextMenuItems = {
        copy: customContextMenu.querySelector('[data-action="context-copy"]'),
        pasteNormal: customContextMenu.querySelector('[data-action="context-paste-normal"]'),
        pastePlain: customContextMenu.querySelector('[data-action="context-paste-plain"]'),
        editImage: customContextMenu.querySelector('[data-action="context-edit-image"]'),
        editLink: customContextMenu.querySelector('[data-action="context-edit-link"]'),
        removeLink: customContextMenu.querySelector('[data-action="context-remove-link"]'),
    };

    let currentFileName = 'untitled.html';
    let isHtmlViewActive = false;
    let originalFileBasePath = '';
    let currentSelectionRange = null;
    let imageBeingEdited = null; 
    let linkBeingEdited = null;
    let contextMenuTargetElement = null;

    // --- Predefined Content Blocks ---
    const contentBlocks = [
        {
            name: "Heading & Text",
            icon: "fas fa-heading",
            html: "<div><h2>Section Title</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></div><p>&nbsp;</p>"
        },
        {
            name: "Image + Caption",
            icon: "far fa-image",
            html: "<figure style='margin: 1em 0; text-align: center;'><img src='https://placehold.co/600x400/777/eee?text=Placeholder' alt='Placeholder Image' style='max-width:100%; border-radius: 4px; margin-bottom: 0.5em;'><figcaption style='font-size: 0.9em; color: #94a3b8; font-style: italic;'>Image caption here</figcaption></figure><p>&nbsp;</p>"
        },
        {
            name: "Two Columns",
            icon: "fas fa-columns",
            html: "<div style='display: flex; gap: 20px; margin: 1em 0;'><div style='flex: 1; padding:10px; border:1px dashed #4A5568; border-radius:4px;'><p>Column 1 content...</p></div><div style='flex: 1; padding:10px; border:1px dashed #4A5568; border-radius:4px;'><p>Column 2 content...</p></div></div><p>&nbsp;</p>"
        },
        {
            name: "Call to Action",
            icon: "fas fa-mouse-pointer",
            html: "<div style='text-align: center; margin: 1.5em 0;'><a href='#' style='background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;'>Click Me!</a></div><p>&nbsp;</p>"
        },
        {
            name: "Quote Block",
            icon: "fas fa-quote-left",
            html: "<blockquote><p>This is an inspiring quote that stands out.</p><cite>- Author Name</cite></blockquote><p>&nbsp;</p>"
        }
    ];


    // --- Utility Functions ---
    function showMessage(message, type = 'info') { /* ... (same) ... */ 
        const container = document.createElement('div');
        container.textContent = message;
        let iconClass = 'fas fa-info-circle';
        let bgColor = 'bg-sky-600';
        if (type === 'success') { iconClass = 'fas fa-check-circle'; bgColor = 'bg-green-600'; }
        else if (type === 'error') { iconClass = 'fas fa-times-circle'; bgColor = 'bg-red-600'; }
        else if (type === 'warning') { iconClass = 'fas fa-exclamation-triangle'; bgColor = 'bg-yellow-500 text-slate-800'; }
        
        container.className = `fixed bottom-5 right-5 p-4 rounded-lg shadow-2xl text-white text-sm ${bgColor} z-[200] flex items-center transition-all duration-300 ease-out transform translate-x-full opacity-0`;
        container.innerHTML = `<i class="${iconClass} mr-3 text-lg"></i> ${message}`;
        
        document.body.appendChild(container);
        requestAnimationFrame(() => {
            container.classList.remove('translate-x-full', 'opacity-0');
            container.classList.add('translate-x-0', 'opacity-100');
        });

        setTimeout(() => {
            container.classList.remove('translate-x-0', 'opacity-100');
            container.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => container.parentNode?.removeChild(container), 300);
        }, 4000);
    }
    function updateWindowTitle() { document.title = `Editor - ${currentFileName}`; }
    function getEditorDocument() { /* ... (same) ... */
        try {
            return editorFrame.contentDocument || editorFrame.contentWindow?.document || null;
        } catch (e) {
            console.error("Error accessing iframe document:", e);
            showMessage("Cannot access iframe content.", "error");
            return null;
        }
     }
    function formatHtml(htmlString) { return htmlString; }

    function setupEditableIframe(htmlContent) { /* ... (same, ensure Prism highlighting for PRE in default styles) ... */
        const doc = getEditorDocument();
        if (!doc) { return; }
        doc.open();
        doc.write(htmlContent);
        doc.close();

        if (doc.body) {
            doc.body.contentEditable = "true";
            doc.body.classList.add('editable-iframe-body');
            
            const styleExists = doc.head.querySelector('#editor-default-styles');
            if (!styleExists) {
                const defaultStyles = doc.createElement('style');
                defaultStyles.id = 'editor-default-styles';
                defaultStyles.textContent = `
                    .editable-iframe-body { padding: 20px; line-height: 1.7; color: #cbd5e1; caret-color: #f0f9ff; min-height: 100%; box-sizing: border-box;}
                    .editable-iframe-body:focus { outline: none; }
                    .editable-iframe-body:empty:before { content: 'Load an HTML file or start typing here...'; color: #64748b; display: block; pointer-events: none; }
                    .editable-iframe-body pre { background-color: rgba(15, 23, 42, 0.85); color: #93c5fd; padding: 1em; border-radius: 0.375rem; overflow-x: auto; font-family: 'SF Mono', Consolas, Menlo, monospace; font-size: 0.9em; border: 1px solid rgba(51, 65, 85, 0.7); margin: 1em 0; white-space: pre-wrap; word-break: break-all; }
                    /* Added class for Prism highlighting inside pre */
                    .editable-iframe-body pre code[class*="language-"] { font-size: inherit; background: none; padding: 0; text-shadow: none; }
                    .editable-iframe-body blockquote { border-left: 4px solid #38bdf8; padding-left: 1em; margin-left: 0; font-style: italic; color: #94a3b8; margin: 1em 0; }
                    .editable-iframe-body table { border-collapse: collapse; width: auto; margin: 1em 0; color: #cbd5e1;}
                    .editable-iframe-body th, .editable-iframe-body td { border: 1px solid #475569; padding: 8px; text-align: left; }
                    .editable-iframe-body th { background-color: rgba(51, 65, 85, 0.7); font-weight: 600;}
                    .editable-iframe-body img { max-width: 100%; height: auto; cursor: default; border: 1px dashed rgba(100, 116, 139, 0.5); border-radius: 4px;}
                    .editable-iframe-body img.selected-for-edit { outline: 2px solid #38bdf8; outline-offset: 2px; }
                `;
                doc.head.appendChild(defaultStyles);
            }

            let debounceTimerForSync, debounceTimerForWordCount;
            doc.body.addEventListener('input', () => {
                if (!isHtmlViewActive) {
                    clearTimeout(debounceTimerForSync);
                    debounceTimerForSync = setTimeout(() => {
                        const currentIframeDoc = getEditorDocument();
                        if (currentIframeDoc?.documentElement) {
                           htmlSourceView.textContent = currentIframeDoc.documentElement.outerHTML; 
                           if (window.Prism && htmlSourceViewContainer.style.display !== 'none') {
                               Prism.highlightElement(htmlSourceView);
                           }
                        }
                    }, 750);
                }
                clearTimeout(debounceTimerForWordCount);
                debounceTimerForWordCount = setTimeout(updateWordCount, 500);
                updateToolbarStates(); 
            });
            
            doc.body.addEventListener('contextmenu', handleCustomContextMenu);
            doc.addEventListener('keydown', handleEditorKeyDown);
            doc.addEventListener('mouseup', updateToolbarStates); 
            doc.addEventListener('keyup', updateToolbarStates);   

            setTimeout(() => {
                doc.body.focus();
                updateWordCount(); 
                updateToolbarStates(); 
            }, 0);
        } else {
            showMessage('Error: Iframe body not found after writing content.', 'error');
        }
     }

    // --- Keyboard Shortcut Handler ---
    function handleEditorKeyDown(e) { /* ... (same) ... */
        const editorDoc = getEditorDocument();
        if (!editorDoc || isHtmlViewActive) return;

        let commandExecuted = false;
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
            e.preventDefault(); execCmd('undo'); commandExecuted = true;
        } else if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'y' || (e.key.toLowerCase() === 'z' && e.shiftKey))) {
            e.preventDefault(); execCmd('redo'); commandExecuted = true;
        } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
            e.preventDefault(); execCmd('bold'); commandExecuted = true;
        } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'i') {
            e.preventDefault(); execCmd('italic'); commandExecuted = true;
        } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
            e.preventDefault(); execCmd('underline'); commandExecuted = true;
        } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault(); execCmd('createLink'); commandExecuted = true; 
        }
        
        if(commandExecuted) {
            if (command !== 'createLink') { 
                 setTimeout(updateToolbarStates, 0); 
            }
        } else {
            setTimeout(updateToolbarStates, 0);
        }
     }

    // --- Custom Context Menu ---
    function handleCustomContextMenu(e) { /* ... (same) ... */
        e.preventDefault();
        hideCustomContextMenu(); 
        contextMenuTargetElement = e.target;

        const editorDoc = getEditorDocument();
        if (!editorDoc) return;

        const selection = editorDoc.getSelection();
        const isTextSelected = selection && selection.toString().length > 0;
        
        contextMenuItems.copy.style.display = isTextSelected ? 'flex' : 'none';
        contextMenuItems.pasteNormal.style.display = 'flex';
        contextMenuItems.pastePlain.style.display = 'flex';

        imageBeingEdited = contextMenuTargetElement.tagName === 'IMG' ? contextMenuTargetElement : null;
        linkBeingEdited = contextMenuTargetElement.closest('a');

        contextMenuItems.editImage.style.display = imageBeingEdited ? 'flex' : 'none';
        contextMenuItems.editLink.style.display = linkBeingEdited ? 'flex' : 'none';
        contextMenuItems.removeLink.style.display = linkBeingEdited ? 'flex' : 'none';
        
        const existingSelectedImages = editorDoc.querySelectorAll('img.selected-for-edit'); // Use editorDoc
        if(existingSelectedImages) existingSelectedImages.forEach(img => img.classList.remove('selected-for-edit'));
        if (imageBeingEdited) {
            imageBeingEdited.classList.add('selected-for-edit');
        }

        customContextMenu.style.top = `${e.clientY}px`;
        customContextMenu.style.left = `${e.clientX}px`;
        customContextMenu.classList.remove('hidden');

        document.addEventListener('click', hideCustomContextMenuOnClickOutside, { once: true });
     }
    function hideCustomContextMenu() { /* ... (same) ... */
        customContextMenu.classList.add('hidden');
        const editorDoc = getEditorDocument();
        if (editorDoc) {
             const existingSelectedImages = editorDoc.querySelectorAll('img.selected-for-edit');
             if(existingSelectedImages) existingSelectedImages.forEach(img => img.classList.remove('selected-for-edit'));
        }
        contextMenuTargetElement = null;
     }
    function hideCustomContextMenuOnClickOutside(e) { /* ... (same) ... */
        if (!customContextMenu.contains(e.target)) {
            hideCustomContextMenu();
        } else {
            document.addEventListener('click', hideCustomContextMenuOnClickOutside, { once: true });
        }
     }

    customContextMenu.addEventListener('click', async (e) => { /* ... (same) ... */
        const actionButton = e.target.closest('button[data-action]');
        if (!actionButton) return;

        const action = actionButton.dataset.action;
        const editorDoc = getEditorDocument();
        if (!editorDoc) return;

        hideCustomContextMenu(); 

        switch (action) {
            case 'context-copy':
                editorDoc.execCommand('copy');
                break;
            case 'context-paste-normal':
                editorDoc.body.focus(); 
                try {
                    const clipboardItems = await navigator.clipboard.read();
                    for (const item of clipboardItems) {
                        if (item.types.includes("text/html")) {
                            const blob = await item.getType("text/html");
                            const htmlText = await blob.text();
                            editorDoc.execCommand('insertHTML', false, htmlText);
                            return; 
                        } else if (item.types.includes("text/plain")) {
                             const blob = await item.getType("text/plain");
                             const plainText = await blob.text();
                             editorDoc.execCommand('insertText', false, plainText);
                             return; 
                        }
                    }
                } catch (err) {
                    console.warn("Clipboard API paste failed or not supported/permitted, relying on execCommand or user Ctrl+V:", err);
                     showMessage('Paste using Ctrl+V or Cmd+V.', 'info');
                }
                break;
            case 'context-paste-plain':
                editorDoc.body.focus();
                try {
                    const text = await navigator.clipboard.readText();
                    if (text) {
                        const sanitizedText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                        editorDoc.execCommand('insertText', false, sanitizedText);
                    }
                } catch (err) {
                    console.warn("Clipboard API readText failed or not supported/permitted:", err);
                    showMessage('Could not paste as plain text. Try Ctrl+Shift+V.', 'warning');
                }
                break;
            case 'context-edit-image':
                if (imageBeingEdited) {
                    imageModalTitle.textContent = "Edit Image";
                    confirmImageModal.textContent = "Update Image";
                    imageUrlInput.value = imageBeingEdited.getAttribute('src') || ''; 
                    imageAltInput.value = imageBeingEdited.alt;
                    imageWidthInput.value = imageBeingEdited.style.width || imageBeingEdited.getAttribute('width') || '';
                    imageHeightInput.value = imageBeingEdited.style.height || imageBeingEdited.getAttribute('height') || '';
                    imageFileUploadInput.value = ''; 
                    openModal(imageModal);
                }
                break;
            case 'context-edit-link':
                if (linkBeingEdited) {
                    linkModalTitle.textContent = "Edit Link";
                    confirmLinkModal.textContent = "Update Link";
                    linkUrlInput.value = linkBeingEdited.getAttribute('href') || '';
                    linkTextInput.value = linkBeingEdited.textContent;
                    openModal(linkModal);
                }
                break;
            case 'context-remove-link':
                 if (linkBeingEdited) {
                    editorDoc.body.focus();
                    const selection = editorDoc.getSelection();
                    const range = editorDoc.createRange();
                    range.selectNodeContents(linkBeingEdited);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    editorDoc.execCommand('unlink', false, null);
                    linkBeingEdited = null; 
                    updateToolbarStates();
                }
                break;
        }
     });


    // --- Modal Handling ---
    function openModal(modalElement) { /* ... (same) ... */
        const editorDoc = getEditorDocument();
        if (editorDoc && editorDoc.getSelection && !imageBeingEdited && !linkBeingEdited) {
            currentSelectionRange = editorDoc.getSelection().rangeCount > 0 ? editorDoc.getSelection().getRangeAt(0) : null;
        }
        modalOverlay.classList.remove('hidden');
        modalElement.classList.remove('hidden');
        const firstInput = modalElement.querySelector('input:not([type="hidden"]), select, textarea');
        firstInput?.focus();
     }
    function closeModal() { /* ... (same, ensure blocksModal is handled) ... */
        modalOverlay.classList.add('hidden');
        linkModal.classList.add('hidden');
        imageModal.classList.add('hidden');
        tableModal.classList.add('hidden');
        blocksModal.classList.add('hidden'); // Hide blocks modal
        
        imageModalTitle.textContent = "Insert Image";
        confirmImageModal.textContent = "Insert Image";
        imageBeingEdited = null;
        imageUrlInput.value = ''; imageAltInput.value = ''; imageWidthInput.value = ''; imageHeightInput.value = '';
        imageFileUploadInput.value = ''; 

        linkModalTitle.textContent = "Insert Link";
        confirmLinkModal.textContent = "Insert Link";
        linkBeingEdited = null;
        linkUrlInput.value = ''; linkTextInput.value = '';

        const editorDoc = getEditorDocument();
        if (editorDoc?.body) editorDoc.body.focus();
     }
    modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
    cancelLinkModal.addEventListener('click', closeModal);
    cancelImageModal.addEventListener('click', closeModal);
    cancelTableModal.addEventListener('click', closeModal);
    cancelBlocksModal.addEventListener('click', closeModal); // New cancel for blocks modal


    // --- File Handling & CSS Processing ---
    async function fetchCss(url) { /* ... (same) ... */ 
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status} for ${url}`);
            return await response.text();
        } catch (error) {
            console.error('Failed to fetch CSS:', error);
            showMessage(`Could not load CSS: ${url.substring(0,100)}. ${error.message}`, 'warning');
            return '';
        }
    }
    async function processHtmlWithCss(htmlString, basePath) { /* ... (same) ... */
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const head = doc.head;
        let newHeadContent = '';

        if (head) {
            head.childNodes.forEach(node => {
                if (node.nodeName.toLowerCase() !== 'link' || node.getAttribute('rel')?.toLowerCase() !== 'stylesheet') {
                    newHeadContent += node.outerHTML || (node.nodeValue || '');
                }
            });
            const linkElements = Array.from(head.querySelectorAll('link[rel="stylesheet"]'));
            for (const link of linkElements) {
                let href = link.getAttribute('href');
                if (href) {
                    const cssUrl = new URL(href, basePath).href;
                    const cssContent = await fetchCss(cssUrl);
                    if (cssContent) {
                        newHeadContent += `<style data-original-href="${href}">\n${cssContent}\n</style>\n`;
                    }
                }
            }
        } else {
            newHeadContent = `<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>${currentFileName.replace(/\.[^/.]+$/, "") || 'Document'}</title>\n`;
        }
        const bodyHtml = doc.body ? doc.body.innerHTML : '';
        return `<!DOCTYPE html>\n<html lang="${doc.documentElement.lang || 'en'}">\n<head>\n${newHeadContent}\n</head>\n<body>${bodyHtml}</body>\n</html>`;
     }

    // --- Toolbar Command Execution & State ---
    function execCmd(command, value = null) { /* ... (updated for insertBlock) ... */
        const editorDoc = getEditorDocument();
        if (!editorDoc || isHtmlViewActive) return;
        
        editorDoc.body.focus(); 
        
        if (currentSelectionRange && editorDoc.getSelection && !imageBeingEdited && !linkBeingEdited) {
            const selection = editorDoc.getSelection();
            selection.removeAllRanges();
            selection.addRange(currentSelectionRange);
        }

        try {
            if (command === 'createLink') {
                const selection = editorDoc.getSelection();
                const range = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
                const commonAncestor = range ? range.commonAncestorContainer : null;
                const existingLink = findAncestor(commonAncestor, 'A');

                if (existingLink) {
                    linkBeingEdited = existingLink;
                    linkModalTitle.textContent = "Edit Link";
                    confirmLinkModal.textContent = "Update Link";
                    linkUrlInput.value = linkBeingEdited.getAttribute('href') || '';
                    linkTextInput.value = linkBeingEdited.textContent || '';
                } else {
                    linkBeingEdited = null;
                    linkModalTitle.textContent = "Insert Link";
                    confirmLinkModal.textContent = "Insert Link";
                    linkUrlInput.value = '';
                    linkTextInput.value = range ? range.toString() : '';
                }
                openModal(linkModal); 
                return;
            }
            if (command === 'insertImage') {
                imageModalTitle.textContent = "Insert Image";
                confirmImageModal.textContent = "Insert Image";
                imageBeingEdited = null; 
                imageUrlInput.value = ''; imageAltInput.value = ''; imageWidthInput.value = ''; imageHeightInput.value = '';
                imageFileUploadInput.value = ''; 
                openModal(imageModal); 
                return;
            }
            if (command === 'insertTable') {
                openModal(tableModal); 
                return;
            }
            if (command === 'insertBlock') { // New command
                populateBlocksModal();
                openModal(blocksModal);
                return;
            }
            if (command === 'formatBlock' && value === 'PRE') {
                const selection = editorDoc.getSelection();
                if (selection && selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    const selectedText = range.toString();
                    const pre = editorDoc.createElement('pre');
                    const code = editorDoc.createElement('code');
                    code.className = 'language-html'; // Default for Prism
                    code.textContent = selectedText || '\n'; 
                    pre.appendChild(code);
                    range.deleteContents();
                    range.insertNode(pre);
                    
                    // Highlight the newly inserted pre block if Prism is available
                    if (window.Prism) {
                        Prism.highlightElement(code);
                    }

                    const newRange = editorDoc.createRange();
                    newRange.selectNodeContents(code); 
                    newRange.collapse(false); 
                    selection.removeAllRanges();
                    selection.addRange(newRange);
                } else {
                    editorDoc.execCommand('insertHTML', false, '<pre><code class="language-html">\n</code></pre>');
                    // Could try to find and highlight this too
                }
                return; 
            }

            editorDoc.execCommand(command, false, value);
        } catch (ex) {
            console.error(`Error executing command ${command}:`, ex);
            showMessage(`Could not execute: ${command}`, 'error');
        }
        
        if (command !== 'createLink' && command !== 'insertImage' && command !== 'insertTable' && command !== 'insertBlock') {
            currentSelectionRange = null;
        }
        
        if (!isHtmlViewActive && editorDoc?.documentElement) {
            htmlSourceView.textContent = editorDoc.documentElement.outerHTML;
            if (window.Prism && htmlSourceViewContainer.style.display !== 'none') {
                Prism.highlightElement(htmlSourceView);
            }
        }
        setTimeout(updateToolbarStates, 0); 
     }

    function updateToolbarStates() { /* ... (same) ... */
        const editorDoc = getEditorDocument();
        if (!editorDoc || isHtmlViewActive) return;

        const commandsToQuery = ['bold', 'italic', 'underline', 'strikeThrough', 
                                 'insertUnorderedList', 'insertOrderedList',
                                 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'];
        
        commandsToQuery.forEach(command => {
            const button = toolbar.querySelector(`button[data-command="${command}"]`);
            if (button) {
                try {
                    if (editorDoc.queryCommandState(command)) {
                        button.classList.add('active');
                    } else {
                        button.classList.remove('active');
                    }
                } catch (e) {
                    button.classList.remove('active');
                }
            }
        });

        try {
            const fontName = editorDoc.queryCommandValue('fontName').replace(/['"]/g, ''); 
            const fontSize = editorDoc.queryCommandValue('fontSize');
            
            const fontNameSelect = toolbar.querySelector('select[data-command="fontName"]');
            if (fontNameSelect) fontNameSelect.value = fontName || 'Arial'; 

            const fontSizeSelect = toolbar.querySelector('select[data-command="fontSize"]');
            if (fontSizeSelect) fontSizeSelect.value = fontSize || '3'; 

            const formatBlockValue = editorDoc.queryCommandValue('formatBlock').toUpperCase();
            const formatBlockSelect = toolbar.querySelector('select[data-command="formatBlock"]');
            if (formatBlockSelect) {
                const currentBlock = formatBlockValue || 'P';
                formatBlockSelect.value = currentBlock;
            }

        } catch (e) {
            // console.warn("Could not query font/format states:", e);
        }
     }
    
    function findAncestor(el, tagName) { /* ... (same) ... */
        tagName = tagName.toUpperCase();
        while (el && el.parentNode) {
             if (el.nodeName === '#document') return null; 
            if (el.tagName === tagName) return el;
            el = el.parentNode;
        }
        return null;
     }

    // --- Populate and Handle Blocks Modal ---
    function populateBlocksModal() {
        blocksGrid.innerHTML = ''; // Clear existing blocks
        contentBlocks.forEach(block => {
            const blockDiv = document.createElement('div');
            blockDiv.className = 'block-preview';
            blockDiv.title = `Insert ${block.name}`;
            
            // Create a more structured preview
            let previewHTML = `<h4><i class="${block.icon} mr-2 opacity-70"></i>${block.name}</h4>`;
            if (block.name === "Heading & Text") {
                previewHTML += `<p class="preview-heading">Title</p><p class="preview-paragraph">Some text...</p>`;
            } else if (block.name === "Image + Caption") {
                previewHTML += `<div class="preview-image-placeholder"><i class="fas fa-image text-2xl"></i></div><p class="preview-caption">Caption</p>`;
            } else if (block.name === "Two Columns") {
                previewHTML += `<div class="preview-columns"><div class="preview-column"></div><div class="preview-column"></div></div>`;
            } else if (block.name === "Call to Action") {
                previewHTML += `<div class="preview-button">Button</div>`;
            } else if (block.name === "Quote Block") {
                previewHTML += `<p class="preview-paragraph" style="font-style: italic;">"A quote..."</p>`;
            }

            blockDiv.innerHTML = previewHTML;
            blockDiv.addEventListener('click', () => {
                execCmd('insertHTML', block.html);
                closeModal();
            });
            blocksGrid.appendChild(blockDiv);
        });
    }


    // --- Event Listeners ---
    loadButton.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', async (event) => { /* ... (same) ... */ 
        const file = event.target.files[0];
        if (file) {
            if (file.type === "text/html" || file.name.toLowerCase().endsWith('.html') || file.name.toLowerCase().endsWith('.htm')) {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    try {
                        const rawHtmlContent = e.target.result;
                        const tempFileUrl = URL.createObjectURL(file);
                        originalFileBasePath = tempFileUrl.substring(0, tempFileUrl.lastIndexOf('/') + 1);
                        
                        showMessage('Processing HTML and linked CSS...', 'info');
                        const processedHtml = await processHtmlWithCss(rawHtmlContent, originalFileBasePath);
                        URL.revokeObjectURL(tempFileUrl);

                        if (isHtmlViewActive) {
                            htmlSourceView.textContent = processedHtml; 
                            if(window.Prism) Prism.highlightElement(htmlSourceView);
                            setupEditableIframe(processedHtml);
                        } else {
                            setupEditableIframe(processedHtml);
                            htmlSourceView.textContent = processedHtml;
                             if(window.Prism && htmlSourceViewContainer.style.display !== 'none') Prism.highlightElement(htmlSourceView); 
                        }
                        currentFileName = file.name;
                        updateWindowTitle();
                        showMessage('File loaded!', 'success');
                    } catch (err) {
                        console.error("Error processing HTML file:", err);
                        showMessage(`Error processing HTML: ${err.message}. Loading raw.`, 'error');
                        setupEditableIframe(e.target.result); 
                        htmlSourceView.textContent = e.target.result;
                        if(window.Prism && htmlSourceViewContainer.style.display !== 'none') Prism.highlightElement(htmlSourceView);
                        currentFileName = file.name;
                        updateWindowTitle();
                    }
                };
                reader.onerror = (e) => { showMessage('Error reading file.', 'error'); };
                reader.readAsText(file);
            } else { showMessage('Please select a valid .html file.', 'warning'); }
            fileInput.value = null;
        }
    });
    saveButton.addEventListener('click', () => { /* ... (same) ... */ 
        const editorDoc = getEditorDocument();
        let finalHtmlContent;
        if (isHtmlViewActive) {
            finalHtmlContent = htmlSourceView.textContent; 
        } else {
            if (!editorDoc?.documentElement) {
                showMessage('Editor content not accessible.', 'error'); return;
            }
            finalHtmlContent = editorDoc.documentElement.outerHTML;
        }
        const contentToSave = finalHtmlContent; 
        const blob = new Blob([contentToSave], { type: 'text/html;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = currentFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        showMessage('File download initiated.', 'success');
    });

    toolbar.addEventListener('click', (event) => { /* ... (same) ... */
        const button = event.target.closest('button[data-command]');
        if (button) {
            const command = button.dataset.command;
            execCmd(command); 
        }
     });
    toolbar.querySelectorAll('select[data-command]').forEach(select => { /* ... (same) ... */ 
        select.addEventListener('change', (event) => {
            const command = event.target.dataset.command;
            const value = event.target.value;
            if (value) execCmd(command, value);
        });
    });
    toolbar.querySelectorAll('input[type="color"][data-command]').forEach(picker => { /* ... (same) ... */
        picker.addEventListener('input', (event) => { 
            const command = event.target.dataset.command;
            const value = event.target.value;
            execCmd(command, value);
        });
     });

    // Modal Confirmations
    confirmLinkModal.addEventListener('click', () => { /* ... (same) ... */
        const url = linkUrlInput.value.trim();
        const text = linkTextInput.value.trim();
        const editorDoc = getEditorDocument();

        if (url && editorDoc) {
            editorDoc.body.focus(); 
            if (linkBeingEdited) { 
                linkBeingEdited.href = url;
                if (text) linkBeingEdited.textContent = text;
                else if (linkBeingEdited.textContent.trim() === '') linkBeingEdited.textContent = url; 
                linkBeingEdited = null; 
            } else { 
                if (currentSelectionRange) {
                    const selection = editorDoc.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(currentSelectionRange);
                }
                const linkHtml = `<a href="${encodeURI(url)}">${text || url}</a>`;
                editorDoc.execCommand('insertHTML', false, linkHtml);
            }
            editorDoc.body.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
        }
        closeModal();
        currentSelectionRange = null;
     });

    confirmImageModal.addEventListener('click', () => { /* ... (same) ... */
        const imageUrl = imageUrlInput.value.trim();
        const alt = imageAltInput.value.trim();
        const width = imageWidthInput.value.trim();
        const height = imageHeightInput.value.trim();
        const localFile = imageFileUploadInput.files[0];

        const processAndInsertImage = (srcUrl) => {
            if (imageBeingEdited) { 
                imageBeingEdited.src = srcUrl;
                imageBeingEdited.alt = alt;
                imageBeingEdited.style.width = width || '';
                imageBeingEdited.style.height = height || '';
                if (!width) imageBeingEdited.removeAttribute('width'); 
                if (!height) imageBeingEdited.removeAttribute('height');

                const editorDoc = getEditorDocument();
                if (editorDoc?.body) {
                    editorDoc.body.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
                }
            } else { 
                let styleAttr = '';
                if (width) styleAttr += `width: ${width};`;
                if (height) styleAttr += `height: ${height};`;
                if (!width && !height && !srcUrl.startsWith('data:')) styleAttr += 'max-width: 100%;'; 

                const imgHtml = `<img src="${encodeURI(srcUrl)}" alt="${alt}" style="${styleAttr}">`;
                execCmd('insertHTML', imgHtml);
            }
            closeModal();
            currentSelectionRange = null;
        };

        if (localFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                processAndInsertImage(e.target.result); 
            };
            reader.onerror = () => {
                showMessage('Error reading local image file.', 'error');
                closeModal();
            };
            reader.readAsDataURL(localFile);
        } else if (imageUrl) {
            processAndInsertImage(imageUrl);
        } else {
            showMessage('Please provide an image URL or select a local file.', 'warning');
        }
     });
    confirmTableModal.addEventListener('click', () => { /* ... (same) ... */ 
        const rows = parseInt(tableRowsInput.value) || 2;
        const cols = parseInt(tableColsInput.value) || 2;
        let tableHtml = '<table><tbody>'; 
        for (let r = 0; r < rows; r++) {
            tableHtml += '<tr>';
            for (let c = 0; c < cols; c++) {
                tableHtml += '<td>&nbsp;</td>'; 
            }
            tableHtml += '</tr>';
        }
        tableHtml += '</tbody></table><p>&nbsp;</p>'; 
        execCmd('insertHTML', tableHtml);
        closeModal();
        currentSelectionRange = null;
    });

    toggleHtmlViewButton.addEventListener('click', () => { /* ... (updated for Prism.js) ... */ 
        isHtmlViewActive = !isHtmlViewActive;
        const editorDoc = getEditorDocument();
        if (isHtmlViewActive) {
            if (editorDoc?.documentElement) {
                htmlSourceView.textContent = editorDoc.documentElement.outerHTML; 
                if (window.Prism) {
                    Prism.highlightElement(htmlSourceView);
                }
            }
            editorFrame.classList.add('hidden');
            htmlSourceViewContainer.classList.remove('hidden'); 
            htmlSourceView.focus(); 
            toggleHtmlViewButton.innerHTML = '<i class="fas fa-eye"></i>';
            toggleHtmlViewButton.title = "Toggle Visual Editor View";
            showMessage('Switched to HTML Source View.', 'info');
        } else {
            setupEditableIframe(htmlSourceView.textContent); 
            editorFrame.classList.remove('hidden');
            htmlSourceViewContainer.classList.add('hidden'); 
            toggleHtmlViewButton.innerHTML = '<i class="fas fa-code"></i>';
            toggleHtmlViewButton.title = "Toggle HTML Source View";
            showMessage('Switched to Visual Editor View.', 'info');
        }
    });
    
    toggleFullScreenButton.addEventListener('click', () => { /* ... (same) ... */
        editorBody.classList.toggle('fullscreen-editor');
        const icon = toggleFullScreenButton.querySelector('i');
        if (editorBody.classList.contains('fullscreen-editor')) {
            icon.classList.remove('fa-expand');
            icon.classList.add('fa-compress');
            toggleFullScreenButton.title = "Exit Full Screen";
        } else {
            icon.classList.remove('fa-compress');
            icon.classList.add('fa-expand');
            toggleFullScreenButton.title = "Toggle Full Screen";
        }
     });

    function updateWordCount() { /* ... (same) ... */
        const editorDoc = getEditorDocument();
        if (editorDoc && editorDoc.body && !isHtmlViewActive) {
            const text = editorDoc.body.textContent || editorDoc.body.innerText || "";
            const words = text.trim().split(/\s+/).filter(word => word.length > 0);
            wordCountDisplay.textContent = words.length;
        } else {
            wordCountDisplay.textContent = "0";
        }
     }

    // --- Initial Setup ---
    const initialEmptyHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>untitled</title>
</head>
<body><p>Welcome! Start typing or load an HTML file.</p></body>
</html>`;
    
    editorFrame.addEventListener('load', () => { /* ... (same) ... */
        const doc = getEditorDocument();
        if (doc?.body && !isHtmlViewActive) {
            doc.body.contentEditable = "true";
            doc.removeEventListener('keydown', handleEditorKeyDown); 
            doc.addEventListener('keydown', handleEditorKeyDown);
            doc.removeEventListener('mouseup', updateToolbarStates);
            doc.addEventListener('mouseup', updateToolbarStates);
            doc.removeEventListener('keyup', updateToolbarStates);
            doc.addEventListener('keyup', updateToolbarStates);
            doc.removeEventListener('contextmenu', handleCustomContextMenu);
            doc.addEventListener('contextmenu', handleCustomContextMenu);
            updateWordCount();
            updateToolbarStates();
        }
     });

    setupEditableIframe(initialEmptyHtml); 
    htmlSourceView.textContent = initialEmptyHtml; 
    if (window.Prism && htmlSourceViewContainer.style.display !== 'none') { 
        Prism.highlightElement(htmlSourceView);
    }
    updateWindowTitle();

    htmlSourceView.addEventListener('input', () => {
        // No need for live Prism re-highlighting on input for performance.
        // It will re-highlight on blur or when switching views.
    });
     htmlSourceView.addEventListener('blur', () => { 
        if (isHtmlViewActive && window.Prism) {
            Prism.highlightElement(htmlSourceView);
        }
    });
});
