// detail_app.js
// Handles iframe content interaction for comments, image lightbox, and copy reference.
// Assumes 'studies' variable is loaded globally from 'studies_data.js'

const SESSION_FAVORITES_KEY_DETAIL = 'sessionFavoriteAbstractIds'; // For heart icon
const ABSTRACT_COMMENTS_KEY_PREFIX = 'abstractComments_'; // For text comments

let currentStudyObjectOnDetail = null; 
let currentStudyIdOnDetail = null; // This is the 'id' from studies_data.js
let iframeDoc = null; // To store the iframe's document object
let comments = [];
let currentSelectionRange = null;

// --- Initialization and Utility Functions ---
function findStudyByFileNameOnDetail(fileName) {
    if (typeof studies === 'undefined' || !Array.isArray(studies)) {
        console.error("Master 'studies' array not found. Ensure studies_data.js is loaded.");
        return null;
    }
    return studies.find(s => s.fileName === fileName);
}

function getSessionFavoriteIdsOnDetail() {
    const saved = sessionStorage.getItem(SESSION_FAVORITES_KEY_DETAIL);
    return saved ? JSON.parse(saved) : [];
}

function saveSessionFavoriteIdsOnDetail(favoriteIdsArray) {
    sessionStorage.setItem(SESSION_FAVORITES_KEY_DETAIL, JSON.stringify(favoriteIdsArray));
}

// --- Favorite (Heart Icon) Functionality ---
function updateFavoriteButtonStateOnDetail() {
    const favoriteBtn = document.getElementById('favoriteBtnOnDetail');
    if (!favoriteBtn || !currentStudyIdOnDetail) return;

    const sessionFavIds = getSessionFavoriteIdsOnDetail();
    const isFav = sessionFavIds.includes(currentStudyIdOnDetail);

    if (isFav) {
        favoriteBtn.classList.add('saved');
        favoriteBtn.setAttribute('aria-label', 'Remove from favorites');
    } else {
        favoriteBtn.classList.remove('saved');
        favoriteBtn.setAttribute('aria-label', 'Save to favorites');
    }
    if(currentStudyObjectOnDetail) { // Update in-memory object too
        currentStudyObjectOnDetail.isFavorite = isFav;
    }
}

function toggleFavoriteOnDetail() {
    if (!currentStudyIdOnDetail) return;

    let sessionFavIds = getSessionFavoriteIdsOnDetail();
    const isCurrentlyFavoriteInSession = sessionFavIds.includes(currentStudyIdOnDetail);

    if (isCurrentlyFavoriteInSession) {
        sessionFavIds = sessionFavIds.filter(id => id !== currentStudyIdOnDetail);
    } else {
        sessionFavIds.push(currentStudyIdOnDetail);
    }
    saveSessionFavoriteIdsOnDetail(sessionFavIds);
    
    if(currentStudyObjectOnDetail){
        currentStudyObjectOnDetail.isFavorite = !isCurrentlyFavoriteInSession; 
    }
    updateFavoriteButtonStateOnDetail();
}

// --- Image Pop-up (Lightbox) Functionality for Iframe Images ---
function setupImageLightboxForIframe() {
    if (!iframeDoc) return;

    const lightbox = document.getElementById('imageLightbox'); // Lightbox is in parent (study_detail.html)
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    if (!lightbox || !lightboxImg || !lightboxCaption) {
        console.warn("Lightbox elements not found in study_detail.html");
        return;
    }

    iframeDoc.querySelectorAll('.zoomable-image-container img.zoomable-image').forEach(image => {
        // Add zoom icon if not already there (idempotent)
        const parentContainer = image.closest('.zoomable-image-container');
        if (parentContainer && !parentContainer.querySelector('.zoom-icon-overlay')) {
            const zoomIcon = document.createElement('div');
            zoomIcon.classList.add('zoom-icon-overlay'); // Style this in explorer_styles.css
            zoomIcon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style="width:1.5rem; height:1.5rem;">
                    <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
                    <path fill-rule="evenodd" d="M9 8.25a.75.75 0 01.75.75v2.25h2.25a.75.75 0 010 1.5H9.75v2.25a.75.75 0 01-1.5 0V12.75H6a.75.75 0 010-1.5h2.25V9a.75.75 0 01.75-.75z" clip-rule="evenodd" />
                </svg>
            `;
            if (getComputedStyle(parentContainer).position === 'static') {
                parentContainer.style.position = 'relative';
            }
            parentContainer.appendChild(zoomIcon);
        }
        
        // Use parentContainer for click if icon is added, otherwise image itself
        const clickableElement = parentContainer || image;
        clickableElement.style.cursor = 'pointer'; // Ensure cursor indicates clickability
        clickableElement.addEventListener('click', () => {
            lightbox.style.display = 'flex'; // Use flex for centering
            lightboxImg.src = image.src;
            lightboxCaption.textContent = image.alt || '';
            document.body.style.overflow = 'hidden'; // Prevent parent page scroll
        });
    });
}

// --- Copy Reference to Clipboard Functionality for Iframe Content ---
function setupCopyReferenceFromIframe() {
    const copyReferenceBtnParent = document.getElementById('copyReferenceBtnParent'); // Button is in parent
    
    if (copyReferenceBtnParent) {
        copyReferenceBtnParent.addEventListener('click', () => {
            if (!iframeDoc) {
                alert('Abstract content not loaded yet.');
                return;
            }
            const referenceSectionContent = iframeDoc.getElementById('referenceSectionContent'); // ID in abstract HTML
            if (referenceSectionContent) {
                const referenceText = referenceSectionContent.innerText || referenceSectionContent.textContent;
                navigator.clipboard.writeText(referenceText.trim()).then(() => {
                    const originalText = copyReferenceBtnParent.innerHTML;
                    copyReferenceBtnParent.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 mr-1.5">
                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                        </svg>
                        Copied!
                    `;
                    copyReferenceBtnParent.classList.add('copied');
                    setTimeout(() => {
                        copyReferenceBtnParent.innerHTML = originalText;
                        copyReferenceBtnParent.classList.remove('copied');
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy reference from iframe: ', err);
                    alert('Failed to copy reference.');
                });
            } else {
                alert('Reference content not found in the abstract.');
            }
        });
    }
}

// --- Commenting System for Iframe Content ---
function setupCommentingSystemForIframe() {
    if (!iframeDoc || !currentStudyIdOnDetail) {
        console.warn('Iframe document or Study ID not available for commenting.');
        const cs = document.getElementById('commentsSidebar');
        if(cs) cs.innerHTML = '<p class="p-4 text-sm text-gray-500">Commenting unavailable: Content or ID missing.</p>';
        return;
    }

    const abstractContentInIframe = iframeDoc.getElementById('abstractMainContent'); // ID in abstract HTML
    const commentsSidebar = document.getElementById('commentsSidebar'); // Sidebar is in parent
    
    if (!abstractContentInIframe || !commentsSidebar) {
        console.warn('Commenting system could not be initialized for iframe. Missing elements.');
        if(commentsSidebar) commentsSidebar.innerHTML = '<p class="p-4 text-sm text-gray-500">Commenting system elements missing.</p>';
        return;
    }

    commentsSidebar.innerHTML = `
        <div class="comment-input-area p-4 border-b border-[var(--sobi-border-color)]">
            <h3 class="text-md font-semibold text-[var(--sobi-dark-blue)] mb-2">Add Comment to Abstract</h3>
            <div id="selectedTextPreviewDetail" class="text-xs text-gray-500 italic mb-2 p-2 border border-dashed border-gray-300 rounded max-h-20 overflow-y-auto">Select text in the abstract to comment...</div>
            <textarea id="commentInputDetail" class="w-full p-2 border border-[var(--sobi-border-color)] rounded mb-2 text-sm" rows="3" placeholder="Type your comment..."></textarea>
            <button id="saveCommentBtnDetail" class="px-4 py-2 bg-[var(--sobi-teal)] text-white text-sm rounded hover:bg-[var(--sobi-teal-darker)] transition-colors">Save Comment</button>
        </div>
        <div id="commentsListDetail" class="comments-list p-4 space-y-3"></div>
    `;

    const commentInput = document.getElementById('commentInputDetail');
    const saveCommentBtn = document.getElementById('saveCommentBtnDetail');
    const selectedTextPreview = document.getElementById('selectedTextPreviewDetail');

    iframeDoc.body.addEventListener('mouseup', () => { // Listen on iframe's body
        const selection = iframeDoc.getSelection(); // Use iframe's selection
        if (selection && selection.toString().trim().length > 0) {
            currentSelectionRange = selection.getRangeAt(0);
            const selectedText = selection.toString().trim();
            if(selectedTextPreview) selectedTextPreview.textContent = `Selected: "${selectedText.substring(0, 100)}${selectedText.length > 100 ? '...' : ''}"`;
            if(commentInput) commentInput.focus();
        }
    });

    if(saveCommentBtn) {
        saveCommentBtn.addEventListener('click', () => {
            const commentText = commentInput.value.trim();
            if (!commentText) { alert('Please enter a comment.'); return; }
            if (!currentSelectionRange) { alert('Please select text in the abstract to comment on.'); return; }

            const selectedText = currentSelectionRange.toString().trim();
            const rangeStartContainerPath = getElementPathInIframe(currentSelectionRange.startContainer);
            const rangeEndContainerPath = getElementPathInIframe(currentSelectionRange.endContainer);

            const newComment = {
                id: Date.now().toString(),
                abstractId: currentStudyIdOnDetail,
                selectedText: selectedText,
                commentText: commentText,
                timestamp: new Date().toISOString(),
                selectionDetails: {
                    startContainerPath: rangeStartContainerPath,
                    startOffset: currentSelectionRange.startOffset,
                    endContainerPath: rangeEndContainerPath,
                    endOffset: currentSelectionRange.endOffset,
                }
            };

            comments.push(newComment);
            saveCommentsToLocalStorage();
            renderCommentsForIframe();
            highlightTextBasedOnCommentInIframe(newComment);

            commentInput.value = '';
            if(selectedTextPreview) selectedTextPreview.textContent = 'Select text in the abstract to comment...';
            currentSelectionRange = null;
        });
    }
    loadAndRenderCommentsForIframe();
}

function getElementPathInIframe(element) { // Operates within iframe context
    const path = [];
    while (element && element.nodeType === Node.ELEMENT_NODE && element !== iframeDoc.body) { // Stop at iframe body
        let selector = element.nodeName.toLowerCase();
        if (element.id) {
            selector += `#${element.id.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1")}`; // Escape special chars in ID
            path.unshift(selector);
            break; 
        } else {
            let sibling = element;
            let nth = 1;
            while (sibling = sibling.previousElementSibling) {
                if (sibling.nodeName.toLowerCase() === selector) nth++;
            }
            selector += `:nth-of-type(${nth})`;
        }
        path.unshift(selector);
        element = element.parentNode;
    }
    return path.join(' > ');
}

function findElementByPathInIframe(pathString) { // Operates within iframe context
    if (!iframeDoc || !pathString) return null;
    try {
        // If path starts from body, or is simple like #id, querySelector on iframeDoc should work.
        // For paths starting deeper, ensure they are relative to a known root like #abstractMainContent
        const mainContentInIframe = iframeDoc.getElementById('abstractMainContent');
        if (mainContentInIframe && !pathString.startsWith('#abstractMainContent')) {
             // Try to find within mainContent if path is not absolute from body
             const el = mainContentInIframe.querySelector(pathString);
             if (el) return el;
        }
        return iframeDoc.querySelector(pathString); // Fallback to document query
    } catch (e) {
        console.error("Error finding element by path in iframe:", pathString, e);
        return null;
    }
}

function loadAndRenderCommentsForIframe() {
    if (!currentStudyIdOnDetail) return;
    const storedComments = localStorage.getItem(ABSTRACT_COMMENTS_KEY_PREFIX + currentStudyIdOnDetail);
    comments = storedComments ? JSON.parse(storedComments) : [];
    renderCommentsForIframe();
    if (iframeDoc && iframeDoc.readyState === 'complete') {
        comments.forEach(highlightTextBasedOnCommentInIframe);
    } else if (iframeDoc) {
        iframeDoc.addEventListener('DOMContentLoaded', () => comments.forEach(highlightTextBasedOnCommentInIframe));
    }
}

function saveCommentsToLocalStorage() {
    if (!currentStudyIdOnDetail) return;
    localStorage.setItem(ABSTRACT_COMMENTS_KEY_PREFIX + currentStudyIdOnDetail, JSON.stringify(comments));
}

function renderCommentsForIframe() {
    const commentsList = document.getElementById('commentsListDetail'); // In parent document
    if (!commentsList) return;
    commentsList.innerHTML = ''; 

    if (comments.length === 0) {
        commentsList.innerHTML = '<p class="text-sm text-gray-500">No comments yet for this abstract.</p>';
        return;
    }
    comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); 

    comments.forEach(comment => {
        const commentEl = document.createElement('div');
        commentEl.classList.add('comment-item'); // Style this in explorer_styles.css
        commentEl.dataset.commentId = comment.id;
        commentEl.innerHTML = `
            <div class="comment-selected-text">"${comment.selectedText.substring(0, 50)}${comment.selectedText.length > 50 ? '...' : ''}"</div>
            <p class="comment-text-content">${comment.commentText.replace(/\n/g, '<br>')}</p>
            <div class="comment-meta">${new Date(comment.timestamp).toLocaleString()}</div>
            <button class="delete-comment-btn" data-id="${comment.id}">&times; Delete</button>
        `;
        commentsList.appendChild(commentEl);
    });

    document.querySelectorAll('#commentsListDetail .delete-comment-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            deleteCommentForIframe(this.dataset.id);
        });
    });
}

function deleteCommentForIframe(commentId) {
    const originalLength = comments.length;
    const commentToDelete = comments.find(c => c.id === commentId);
    comments = comments.filter(c => c.id !== commentId);

    if (comments.length < originalLength) {
        saveCommentsToLocalStorage();
        renderCommentsForIframe(); 
        
        if (iframeDoc && commentToDelete && commentToDelete.selectionDetails) {
             const spans = iframeDoc.querySelectorAll(`span.annotated-text[data-comment-id="${commentId}"]`);
             spans.forEach(span => {
                const parent = span.parentNode;
                while (span.firstChild) {
                    parent.insertBefore(span.firstChild, span);
                }
                parent.removeChild(span);
                if (parent.normalize) parent.normalize(); 
            });
        }
    }
}

function highlightTextBasedOnCommentInIframe(comment) {
    if (!iframeDoc || !comment.selectionDetails) return;

    const { startContainerPath, startOffset, endContainerPath, endOffset } = comment.selectionDetails;
    
    const startContainerParent = findElementByPathInIframe(startContainerPath);
    const endContainerParent = findElementByPathInIframe(endContainerPath);

    if (!startContainerParent || !endContainerParent) {
        console.warn("Highlight: Could not find container elements for comment:", comment.id, "Paths:", startContainerPath, endContainerPath);
        return;
    }

    // Attempt to find the correct text node within the parent elements
    // This is a simplified approach; robust text node finding can be complex
    let actualStartContainer = startContainerParent.firstChild; 
    while(actualStartContainer && actualStartContainer.nodeType !== Node.TEXT_NODE) actualStartContainer = actualStartContainer.nextSibling;
    
    let actualEndContainer = endContainerParent.firstChild;
    while(actualEndContainer && actualEndContainer.nodeType !== Node.TEXT_NODE) actualEndContainer = actualEndContainer.nextSibling;

    // If still not text nodes, or if they are null, we might have an issue or complex structure
    if (!actualStartContainer || actualStartContainer.nodeType !== Node.TEXT_NODE || 
        !actualEndContainer || actualEndContainer.nodeType !== Node.TEXT_NODE) {
        console.warn("Highlight: Could not resolve to text nodes for comment:", comment.id);
        return; 
    }
     // Basic offset validation
    if (startOffset > actualStartContainer.length || endOffset > actualEndContainer.length) {
        console.warn("Highlight: Offsets out of bounds for comment:", comment.id, `Start: ${startOffset}/${actualStartContainer.length}, End: ${endOffset}/${actualEndContainer.length}`);
        return;
    }


    try {
        const range = iframeDoc.createRange();
        range.setStart(actualStartContainer, startOffset);
        range.setEnd(actualEndContainer, endOffset);

        const rangeText = range.toString().trim();
        const commentText = comment.selectedText.trim();

        // Normalize whitespace for comparison as selection can sometimes include extra spaces
        const normalize = (str) => str.replace(/\s+/g, ' ');

        if (normalize(rangeText) === normalize(commentText)) {
            const span = iframeDoc.createElement('span');
            span.className = 'annotated-text'; // Style this in abstract_styles.css
            span.dataset.commentId = comment.id; 
            span.style.cursor = 'pointer'; 
            span.title = `Comment: ${comment.commentText.substring(0,30)}...`;
            
            span.addEventListener('click', () => {
                const commentItem = document.querySelector(`.comment-item[data-comment-id="${comment.id}"]`);
                if (commentItem) {
                    commentItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    commentItem.classList.add('highlighted-comment'); // Style in explorer_styles.css
                    setTimeout(() => commentItem.classList.remove('highlighted-comment'), 2000);
                }
            });
            range.surroundContents(span);
        } else {
             console.warn("Highlight: Stored selected text does not match current range for comment:", comment.id, `Expected: "${commentText}", Got: "${rangeText}"`);
        }
    } catch (e) {
        console.error("Error applying highlight in iframe for comment:", comment.id, e);
    }
}


// --- Main Initialization for study_detail.html ---
document.addEventListener('DOMContentLoaded', () => {
    const studyFrame = document.getElementById('studyFrame');
    const studyPageTitleEl = document.getElementById('studyPageTitle'); 
    const favoriteBtn = document.getElementById('favoriteBtnOnDetail');
    const params = new URLSearchParams(window.location.search);
    const studyFile = params.get('file');
    const studyTitleFromParam = params.get('title'); 

    if (studyFile) {
        if(studyFrame) {
            studyFrame.src = studyFile;
            studyFrame.onload = () => { // Wait for iframe to load
                iframeDoc = studyFrame.contentWindow.document;
                currentStudyObjectOnDetail = findStudyByFileNameOnDetail(studyFile); 
                if (currentStudyObjectOnDetail) {
                    currentStudyIdOnDetail = currentStudyObjectOnDetail.id;
                    
                    // Initialize isFavorite for the currentStudyObjectOnDetail based on session storage
                    const sessionFavIds = getSessionFavoriteIdsOnDetail();
                    currentStudyObjectOnDetail.isFavorite = sessionFavIds.includes(currentStudyIdOnDetail);
                    
                    updateFavoriteButtonStateOnDetail();
                    setupImageLightboxForIframe(); // Setup lightbox for iframe images
                    setupCommentingSystemForIframe(); // Setup comments for iframe content
                } else {
                    console.warn("Could not find study object for file:", studyFile);
                    if(favoriteBtn) favoriteBtn.style.display = 'none';
                    const cs = document.getElementById('commentsSidebar');
                    if(cs) cs.innerHTML = '<p class="p-4 text-sm text-gray-500">Study data not found.</p>';
                }
            };
        }
    } else {
        const mainContent = document.querySelector('.content-wrapper');
        if (mainContent) {
            mainContent.innerHTML = '<div class="text-center p-8"><h2 class="text-2xl font-semibold text-red-600 mb-4">Error: Abstract Not Found</h2><p class="text-sobi-medium-gray-text">The requested abstract file could not be loaded. Please return to the explorer and try again.</p> <a href="Conference_Explorer.html" class="mt-6 btn btn-back inline-block">Return to Explorer</a></div>';
        }
        if(favoriteBtn) favoriteBtn.style.display = 'none';
        const cs = document.getElementById('commentsSidebar');
        if(cs) cs.style.display = 'none';
    }

    if (studyTitleFromParam) {
        const decodedTitle = decodeURIComponent(studyTitleFromParam);
        if(studyPageTitleEl) studyPageTitleEl.textContent = decodedTitle;
        if(studyPageTitleEl) studyPageTitleEl.title = decodedTitle; 
        document.title = decodedTitle + " - Abstract Details"; 
    } else {
         if(studyPageTitleEl) studyPageTitleEl.textContent = "Abstract Details"; 
    }

    if (favoriteBtn) { // Attach listener regardless of currentStudyIdOnDetail, it will check inside
        favoriteBtn.addEventListener('click', toggleFavoriteOnDetail);
    }
    setupCopyReferenceFromIframe(); // Setup copy reference button for iframe
});
