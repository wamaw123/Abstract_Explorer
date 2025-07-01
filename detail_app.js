// detail_app.js
// Handles iframe content interaction for image lightbox and general comments with image pasting.
// Favorite (heart icon) is also managed here.
// Assumes 'studies' variable is loaded globally from 'studies_data.js'

const SESSION_FAVORITES_KEY_DETAIL = 'sessionFavoriteAbstractIds'; 
const ABSTRACT_COMMENTS_KEY_PREFIX = 'abstractComments_'; 

let currentStudyObjectOnDetail = null; 
let currentStudyIdOnDetail = null; 
let iframeDoc = null; 
let comments = [];
let pastedImageDataUrl = null; // To store base64 data URL of pasted image

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
    favoriteBtn.classList.toggle('saved', isFav);
    favoriteBtn.setAttribute('aria-label', isFav ? 'Remove from favorites' : 'Save to favorites');
    if(currentStudyObjectOnDetail) currentStudyObjectOnDetail.isFavorite = isFav;
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
    if(currentStudyObjectOnDetail) currentStudyObjectOnDetail.isFavorite = !isCurrentlyFavoriteInSession; 
    updateFavoriteButtonStateOnDetail();
    
    // Show toast notification if available
    if (typeof window.showToast === 'function') {
        if (!isCurrentlyFavoriteInSession) {
            window.showToast('Added to favorites', 'success', 2000);
        } else {
            window.showToast('Removed from favorites', 'info', 2000);
        }
    }
}

// --- Image Pop-up (Lightbox) Functionality for Iframe Images ---
function setupImageLightboxForIframe() {
    if (!iframeDoc) {
        console.warn("setupImageLightboxForIframe: iframeDoc is not available.");
        return;
    }
    const lightbox = document.getElementById('imageLightbox'); 
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    if (!lightbox || !lightboxImg || !lightboxCaption) {
        console.warn("Lightbox elements not found in study_detail.html for image pop-up.");
        return;
    }
    iframeDoc.querySelectorAll('.zoomable-image-container img.zoomable-image').forEach(image => {
        const parentContainer = image.closest('.zoomable-image-container');
        if (parentContainer && !parentContainer.querySelector('.zoom-icon-overlay')) {
            const zoomIcon = iframeDoc.createElement('div'); 
            zoomIcon.classList.add('zoom-icon-overlay'); 
            zoomIcon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style="width:1.5rem; height:1.5rem;">
                    <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
                    <path fill-rule="evenodd" d="M9 8.25a.75.75 0 01.75.75v2.25h2.25a.75.75 0 010 1.5H9.75v2.25a.75.75 0 01-1.5 0V12.75H6a.75.75 0 010-1.5h2.25V9a.75.75 0 01.75-.75z" clip-rule="evenodd" />
                </svg>
            `;
            if (iframeDoc.defaultView.getComputedStyle(parentContainer).position === 'static') {
                parentContainer.style.position = 'relative';
            }
            parentContainer.appendChild(zoomIcon);
        }
        const clickableElement = parentContainer || image;
        clickableElement.style.cursor = 'pointer'; 
        clickableElement.addEventListener('click', () => {
            lightbox.style.display = 'flex'; 
            lightboxImg.src = image.src; 
            lightboxCaption.textContent = image.alt || '';
            document.body.style.overflow = 'hidden'; 
        });
    });
    const closeLightboxBtn = document.querySelector('#imageLightbox .lightbox-close');
    if(closeLightboxBtn) {
        closeLightboxBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
            if(lightboxImg) lightboxImg.src = "";
            document.body.style.overflow = 'auto';
        });
    }
    if(lightbox) {
        lightbox.addEventListener('click', (e) => { 
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                if(lightboxImg) lightboxImg.src = "";
                document.body.style.overflow = 'auto';
            }
        });
    }
}


// --- General Commenting System with Image Paste ---
function setupCommentingSystem() {
    const commentsSidebar = document.getElementById('commentsSidebar'); 
    const toggleCommentsBtn = document.getElementById('toggleCommentsBtn');
    const addCommentBtn = document.getElementById('addCommentBtn'); // Changed ID

    if (!currentStudyIdOnDetail) { 
        console.warn('Study ID not available for commenting.');
        if(commentsSidebar) commentsSidebar.innerHTML = '<p class="p-4 text-sm text-gray-500">Commenting unavailable: Study ID missing.</p>';
        if(addCommentBtn) addCommentBtn.disabled = true;
        if(toggleCommentsBtn) toggleCommentsBtn.disabled = true;
        return;
    }
    
    if (!commentsSidebar || !toggleCommentsBtn || !addCommentBtn) {
        console.warn('Commenting system UI elements not found in parent.');
        return;
    }
    
    addCommentBtn.disabled = false; 

    if (!document.getElementById('commentInputDetail')) {
        commentsSidebar.innerHTML = `
            <div class="p-4 border-b border-[var(--sobi-border-color)]">
                <h3 class="text-lg font-semibold text-[var(--sobi-dark-blue)] mb-3">Abstract Comments</h3>
            </div>
            <div class="comment-input-area p-4 border-b border-[var(--sobi-border-color)]">
                <h4 class="text-md font-semibold text-[var(--sobi-dark-blue)] mb-2">Add New Comment</h4>
                <textarea id="commentInputDetail" class="w-full p-2 border border-[var(--sobi-border-color)] rounded mb-2 text-sm" rows="3" placeholder="Type your comment or paste an image..."></textarea>
                <div id="commentImagePreviewContainer" class="mb-2" style="display: none;">
                    <img id="commentImagePreview" src="#" alt="Pasted image preview" style="max-width: 100%; max-height: 150px; border-radius: 4px; border: 1px solid var(--sobi-border-color);"/>
                    <button id="removePastedImageBtn" class="text-xs text-red-500 hover:underline mt-1">Remove Image</button>
                </div>
                <button id="saveCommentBtnDetail" class="px-4 py-2 bg-[var(--sobi-teal)] text-white text-sm rounded hover:bg-[var(--sobi-teal-darker)] transition-colors w-full">Save Comment</button>
            </div>
            <div id="commentsListDetail" class="comments-list p-4 space-y-3 flex-grow overflow-y-auto"></div>
        `;
    }

    const commentInput = document.getElementById('commentInputDetail');
    const saveCommentBtn = document.getElementById('saveCommentBtnDetail');
    const imagePreviewContainer = document.getElementById('commentImagePreviewContainer');
    const imagePreview = document.getElementById('commentImagePreview');
    const removePastedImageBtn = document.getElementById('removePastedImageBtn');

    toggleCommentsBtn.removeEventListener('click', toggleCommentsSidebarVisibility); 
    toggleCommentsBtn.addEventListener('click', toggleCommentsSidebarVisibility);

    function toggleCommentsSidebarVisibility() {
        commentsSidebar.classList.toggle('open');
        toggleCommentsBtn.textContent = commentsSidebar.classList.contains('open') ? 'Hide Comments' : 'Show Comments';
    }

    addCommentBtn.addEventListener('click', () => {
        if(!commentsSidebar.classList.contains('open')){ 
            commentsSidebar.classList.add('open');
            toggleCommentsBtn.textContent = 'Hide Comments';
        }
        if(commentInput) commentInput.focus();
    });

    if (commentInput) {
        commentInput.addEventListener('paste', (event) => {
            const items = (event.clipboardData || event.originalEvent.clipboardData).items;
            for (const item of items) {
                if (item.type.indexOf('image') === 0) {
                    event.preventDefault(); // Prevent default paste behavior (e.g. pasting file path)
                    const file = item.getAsFile();
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        pastedImageDataUrl = e.target.result;
                        if(imagePreview) imagePreview.src = pastedImageDataUrl;
                        if(imagePreviewContainer) imagePreviewContainer.style.display = 'block';
                    };
                    reader.readAsDataURL(file);
                    break; 
                }
            }
        });
    }
    
    if(removePastedImageBtn) {
        removePastedImageBtn.addEventListener('click', () => {
            pastedImageDataUrl = null;
            if(imagePreview) imagePreview.src = "#";
            if(imagePreviewContainer) imagePreviewContainer.style.display = 'none';
        });
    }


    if(saveCommentBtn) {
        saveCommentBtn.removeEventListener('click', handleSaveGeneralComment); 
        saveCommentBtn.addEventListener('click', handleSaveGeneralComment);
    }
    
    function handleSaveGeneralComment() {
        const commentText = commentInput.value.trim();
        if (!commentText && !pastedImageDataUrl) { 
            alert('Please enter a comment or paste an image.'); 
            return; 
        }

        const newComment = {
            id: Date.now().toString(),
            abstractId: currentStudyIdOnDetail,
            commentText: commentText,
            imageDataUrl: pastedImageDataUrl, // Save image data
            timestamp: new Date().toISOString(),
        };

        comments.push(newComment);
        saveCommentsToLocalStorage();
        renderComments(); // Re-render the list

        commentInput.value = '';
        pastedImageDataUrl = null; // Reset pasted image
        if(imagePreview) imagePreview.src = "#";
        if(imagePreviewContainer) imagePreviewContainer.style.display = 'none';
    }
    loadAndRenderComments(); 
}


function loadAndRenderComments() {
    if (!currentStudyIdOnDetail) return;
    const storedComments = localStorage.getItem(ABSTRACT_COMMENTS_KEY_PREFIX + currentStudyIdOnDetail);
    comments = storedComments ? JSON.parse(storedComments) : [];
    renderComments();
}

function saveCommentsToLocalStorage() {
    if (!currentStudyIdOnDetail) return;
    localStorage.setItem(ABSTRACT_COMMENTS_KEY_PREFIX + currentStudyIdOnDetail, JSON.stringify(comments));
}

function renderComments() { // Renamed from renderCommentsForIframe
    const commentsList = document.getElementById('commentsListDetail'); 
    if (!commentsList) return;
    commentsList.innerHTML = ''; 

    if (comments.length === 0) {
        commentsList.innerHTML = '<p class="text-sm text-gray-500 p-4">No comments yet for this abstract.</p>';
        return;
    }
    comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); 

    comments.forEach(comment => {
        const commentEl = document.createElement('div');
        commentEl.classList.add('comment-item'); 
        commentEl.dataset.commentId = comment.id;
        
        let imageHTML = '';
        if (comment.imageDataUrl) {
            imageHTML = `<img src="${comment.imageDataUrl}" alt="Comment image" class="comment-image my-2 rounded border border-[var(--sobi-border-color)]" style="max-width: 100%; max-height: 200px; object-fit: contain;">`;
        }

        commentEl.innerHTML = `
            ${imageHTML}
            <p class="comment-text-content">${comment.commentText.replace(/\n/g, '<br>')}</p>
            <div class="comment-meta">${new Date(comment.timestamp).toLocaleString()}</div>
            <button class="delete-comment-btn" data-id="${comment.id}">&times; Delete</button>
        `;
        commentsList.appendChild(commentEl);
    });

    document.querySelectorAll('#commentsListDetail .delete-comment-btn').forEach(btn => {
        btn.removeEventListener('click', handleDeleteCommentEvent); 
        btn.addEventListener('click', handleDeleteCommentEvent);
    });
}
function handleDeleteCommentEvent() {
    deleteComment(this.dataset.id); // Renamed from deleteCommentForIframe
}

function deleteComment(commentId) { // Renamed from deleteCommentForIframe
    comments = comments.filter(c => c.id !== commentId);
    saveCommentsToLocalStorage();
    renderComments(); 
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
            // Handle GitHub Pages base URL for iframe source
            const baseUrl = window.baseUrl || './';
            const iframeSrc = studyFile.startsWith('./') ? studyFile : `./${studyFile}`;
            studyFrame.src = iframeSrc;
            studyFrame.onload = () => { 
                try {
                    iframeDoc = studyFrame.contentWindow.document; 
                    if (!iframeDoc || !iframeDoc.body) { 
                        throw new Error("iframeDoc or iframeDoc.body is null after load.");
                    }
                } catch (e) {
                    console.error("Error accessing iframe content (for lightbox). This might be a cross-origin issue.", e);
                }

                currentStudyObjectOnDetail = findStudyByFileNameOnDetail(studyFile); 
                if (currentStudyObjectOnDetail) {
                    currentStudyIdOnDetail = currentStudyObjectOnDetail.id;
                    
                    const sessionFavIds = getSessionFavoriteIdsOnDetail();
                    currentStudyObjectOnDetail.isFavorite = sessionFavIds.includes(currentStudyIdOnDetail);
                    
                    updateFavoriteButtonStateOnDetail();
                    if(iframeDoc) setupImageLightboxForIframe(); 
                    setupCommentingSystem(); 
                } else {
                    console.warn("Could not find study object for file:", studyFile);
                    if(favoriteBtn) favoriteBtn.style.display = 'none';
                    const cs = document.getElementById('commentsSidebar');
                    if(cs) cs.innerHTML = '<p class="p-4 text-sm text-gray-500">Study data not found for comments.</p>';
                }
            };
        }
    } else {
        const mainContent = document.querySelector('.content-wrapper');
        if (mainContent) {
            const baseUrl = window.baseUrl || './';
            mainContent.innerHTML = `<div class="text-center p-8"><h2 class="text-2xl font-semibold text-red-600 mb-4">Error: Abstract Not Found</h2><p class="text-sobi-medium-gray-text">The requested abstract file could not be loaded. Please return to the explorer and try again.</p> <a href="${baseUrl}Conference_Explorer.html" class="mt-6 btn btn-back inline-block">Return to Explorer</a></div>`;
        }
        if(favoriteBtn) favoriteBtn.style.display = 'none';
        const cs = document.getElementById('commentsSidebar');
        if(cs) cs.style.display = 'none';
        const addCommentBtn = document.getElementById('addCommentBtn'); // Use new ID
        if(addCommentBtn) addCommentBtn.style.display = 'none';
    }

    if (studyTitleFromParam) {
        const decodedTitle = decodeURIComponent(studyTitleFromParam);
        if(studyPageTitleEl) studyPageTitleEl.textContent = decodedTitle;
        if(studyPageTitleEl) studyPageTitleEl.title = decodedTitle; 
        document.title = decodedTitle + " - Abstract Details"; 
    } else {
         if(studyPageTitleEl) studyPageTitleEl.textContent = "Abstract Details"; 
    }

    if (favoriteBtn) { 
        favoriteBtn.addEventListener('click', toggleFavoriteOnDetail);
    }
});
