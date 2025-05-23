// explorer_app.js

// This script assumes 'studies' variable is loaded globally from 'studies_data.js'

const SESSION_FAVORITES_KEY = 'sessionFavoriteAbstractIds';
const SESSION_FILTERS_KEY = 'conferenceExplorerFilters'; // For main filters

// DOM element references (ensure these IDs exist in Conference_Explorer.html)
const initializationMessageEl = document.getElementById('initializationMessage');
const explorerContentEl = document.getElementById('explorerContent');
const searchInputEl = document.getElementById('searchInput'); 
const studyResultsContainerEl = document.getElementById('studyResults');
const resultsCountDisplayEl = document.getElementById('resultsCount');
const resetFiltersButtonEl = document.getElementById('resetFilters');
const currentYearEl = document.getElementById('currentYear');
const showAllBtnEl = document.getElementById('showAllBtn');
const showFavoritesBtnEl = document.getElementById('showFavoritesBtn');

const B_NHL_SUBTYPES = ['B-NHL', 'DLBCL', 'LBCL', 'Follicular Lymphoma', 'Marginal zone lymphoma', 'HGBL', 'MCL']; 

let activeFilters = {
    cancerTypes: null, 
    lineOfTherapy: null, 
    evidenceType: null,  
    drugs: [],
    searchTerm: "",
    showFavoritesOnly: false 
};

let searchDebounceTimer;

function getSessionFavoriteIds() {
    const saved = sessionStorage.getItem(SESSION_FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
}

function saveSessionFavoriteIds(favoriteIdsArray) {
    sessionStorage.setItem(SESSION_FAVORITES_KEY, JSON.stringify(favoriteIdsArray));
}

function initializeApp() {
    if (typeof studies === 'undefined' || !Array.isArray(studies) || studies.length === 0) {
        console.error("The 'studies' array is not loaded or is empty. Check 'studies_data.js'.");
        if(explorerContentEl) explorerContentEl.classList.add('hidden'); 
        if(initializationMessageEl) initializationMessageEl.classList.remove('hidden'); 
        return; 
    }
    if(explorerContentEl) explorerContentEl.classList.remove('hidden'); 
    if(initializationMessageEl) initializationMessageEl.classList.add('hidden');

    // Sync in-memory 'isFavorite' with sessionStorage for studies
    const sessionFavoriteIds = getSessionFavoriteIds();
    studies.forEach(study => {
        // Initialize isFavorite from studies_data.js (if present), then override by session
        study.isFavorite = (typeof study.isFavorite !== 'undefined' ? study.isFavorite : false);
        if (sessionFavoriteIds.includes(study.id)) {
            study.isFavorite = true;
        } else {
            // If not in session, and was true in studies_data, it remains true (manual permanent favorite)
            // If it was false in studies_data, and not in session, it remains false.
            // This logic ensures session can override studies_data for the session.
            // More accurately: if it's in session, it's true for the session. If not, it's what studies_data says.
            // Corrected logic: session is the override for the session.
            study.isFavorite = sessionFavoriteIds.includes(study.id);
        }
    });

    const storedFilters = sessionStorage.getItem(SESSION_FILTERS_KEY);
    if (storedFilters) {
        const parsedStoredFilters = JSON.parse(storedFilters);
        activeFilters = {
            ...activeFilters, // Keep defaults for any missing keys
            ...parsedStoredFilters,
            drugs: Array.isArray(parsedStoredFilters.drugs) ? parsedStoredFilters.drugs : [],
            searchTerm: parsedStoredFilters.searchTerm || "",
            showFavoritesOnly: parsedStoredFilters.showFavoritesOnly || false 
        };
        if (searchInputEl) searchInputEl.value = activeFilters.searchTerm; 
    } else {
        // Initialize with defaults if nothing in session storage
        activeFilters.drugs = [];
        activeFilters.searchTerm = "";
        activeFilters.showFavoritesOnly = false;
    }
    
    generateFilterButtons(); 
    updateButtonStatesFromActiveFilters(); 
    updateFavoritesFilterButtonsUI(); // Renamed for clarity
    
    if(resetFiltersButtonEl) {
        resetFiltersButtonEl.addEventListener('click', resetAllFilters);
    }
    if (searchInputEl) {
        searchInputEl.addEventListener('input', () => {
            clearTimeout(searchDebounceTimer);
            searchDebounceTimer = setTimeout(() => {
                activeFilters.searchTerm = searchInputEl.value.trim();
                applyFilters();
            }, 300); 
        });
    }
    if(showAllBtnEl) showAllBtnEl.addEventListener('click', () => {
        activeFilters.showFavoritesOnly = false;
        updateFavoritesFilterButtonsUI();
        applyFilters();
    });
    if(showFavoritesBtnEl) showFavoritesBtnEl.addEventListener('click', () => {
        activeFilters.showFavoritesOnly = true;
        updateFavoritesFilterButtonsUI();
        applyFilters();
    });

    if(currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
    applyFilters(); 
}

function updateFavoritesFilterButtonsUI() {
    if (!showAllBtnEl || !showFavoritesBtnEl) return;
    const heartIcon = showFavoritesBtnEl.querySelector('.heart-icon-fav-filter');
    if (activeFilters.showFavoritesOnly) {
        showAllBtnEl.classList.remove('active');
        showFavoritesBtnEl.classList.add('active');
        if(heartIcon) heartIcon.style.color = 'var(--sobi-white)';
    } else {
        showAllBtnEl.classList.add('active');
        showFavoritesBtnEl.classList.remove('active');
        if(heartIcon) heartIcon.style.color = 'currentColor'; // Or var(--sobi-icon-gray) if it's not inheriting properly
    }
}

function generateFilterButtons() {
    generateSingleSelectFilterButtons('cancerTypes', document.querySelector('#cancerTypeFilterGroupTop [data-filter-category="cancerTypes"]'), 'All Types', false); 
    generateSingleSelectFilterButtons('lineOfTherapy', document.querySelector('#therapyLineFilterGroupLeft [data-filter-category="lineOfTherapy"]'), 'All Lines', true); 
    generateSingleSelectFilterButtons('evidenceType', document.querySelector('#evidenceTypeFilterGroupLeft [data-filter-category="evidenceType"]'), 'All Evidence', true); 
    generateMultiSelectFilterButtons('drugs', document.querySelector('#drugFilterGroupRight [data-filter-category="drugs"]'), 'All Drugs/Classes', true);
}

function generateSingleSelectFilterButtons(categoryKey, buttonContainer, allText, isSidebarButton) {
    if (!buttonContainer) return;
    buttonContainer.innerHTML = ''; 
    const categoryValues = new Set();
    studies.forEach(study => {
        const value = study[categoryKey];
        if (Array.isArray(value)) { 
            value.forEach(item => categoryValues.add(item));
        } else if (value) { 
            categoryValues.add(value);
        }
    });

    const allButton = document.createElement('button');
    allButton.className = 'filter-button ' + (isSidebarButton ? 'filter-button-sidebar' : ''); 
    allButton.textContent = allText;
    allButton.addEventListener('click', () => {
        activeFilters[categoryKey] = null;
        updateButtonStatesFromActiveFilters(); 
        applyFilters();
    });
    buttonContainer.appendChild(allButton);

    Array.from(categoryValues).sort().forEach(value => {
        const button = document.createElement('button');
        button.className = 'filter-button ' + (isSidebarButton ? 'filter-button-sidebar' : '');
        button.textContent = value;
        button.addEventListener('click', () => {
            activeFilters[categoryKey] = value;
            updateButtonStatesFromActiveFilters(); 
            applyFilters();
        });
        buttonContainer.appendChild(button);
    });
}

function generateMultiSelectFilterButtons(categoryKey, buttonContainer, allText, isSidebarButton) {
    if (!buttonContainer) return;
    buttonContainer.innerHTML = '';
    const categoryValues = new Set();
    studies.forEach(study => {
        if (study[categoryKey] && Array.isArray(study[categoryKey])) {
            study[categoryKey].forEach(item => categoryValues.add(item));
        }
    });

    const allButton = document.createElement('button');
    allButton.className = 'filter-button ' + (isSidebarButton ? 'filter-button-sidebar' : ''); 
    allButton.textContent = allText;
    allButton.addEventListener('click', () => {
        activeFilters[categoryKey] = []; 
        updateButtonStatesFromActiveFilters();
        applyFilters();
    });
    buttonContainer.appendChild(allButton);

    Array.from(categoryValues).sort().forEach(value => {
        const button = document.createElement('button');
        button.className = 'filter-button ' + (isSidebarButton ? 'filter-button-sidebar' : '');
        button.textContent = value;
        button.addEventListener('click', () => {
            const index = activeFilters[categoryKey].indexOf(value);
            if (index > -1) {
                activeFilters[categoryKey].splice(index, 1); 
            } else {
                activeFilters[categoryKey].push(value); 
            }
            updateButtonStatesFromActiveFilters();
            applyFilters();
        });
        buttonContainer.appendChild(button);
    });
}

function updateButtonStatesFromActiveFilters() {
    ['cancerTypes', 'lineOfTherapy', 'evidenceType'].forEach(categoryKey => {
        const container = document.querySelector('[data-filter-category="' + categoryKey + '"]');
        if (container) {
            container.querySelectorAll('.filter-button').forEach(btn => {
                const isAllButton = btn.textContent.startsWith('All ');
                if ((activeFilters[categoryKey] === null && isAllButton) || (activeFilters[categoryKey] === btn.textContent && !isAllButton)) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
    });

    const drugsContainer = document.querySelector('[data-filter-category="drugs"]');
    if (drugsContainer) {
        drugsContainer.querySelectorAll('.filter-button').forEach(btn => {
            const isAllButton = btn.textContent.startsWith('All ');
            if (isAllButton) {
                if (activeFilters.drugs.length === 0) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            } else { 
                if (activeFilters.drugs.includes(btn.textContent)) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            }
        });
    }
    updateFavoritesFilterButtonsUI(); 
}

function displayStudies() {
    if (typeof studies === 'undefined' || !Array.isArray(studies)) {
        if(resultsCountDisplayEl) resultsCountDisplayEl.textContent = "Error: Abstract data not loaded.";
        return;
    }

    let preFilteredStudies = studies;
    if (activeFilters.showFavoritesOnly) {
        preFilteredStudies = studies.filter(study => study.isFavorite === true);
    }

    let studiesAfterButtonFilters = preFilteredStudies.filter(study => {
        let cancerMatch = true;
        if (activeFilters.cancerTypes) { 
            if (activeFilters.cancerTypes === 'B-NHL') {
                cancerMatch = study.cancerTypes && study.cancerTypes.some(ct => B_NHL_SUBTYPES.includes(ct));
            } else {
                cancerMatch = study.cancerTypes && study.cancerTypes.includes(activeFilters.cancerTypes);
            }
        }

        const therapyMatch = !activeFilters.lineOfTherapy || study.lineOfTherapy === activeFilters.lineOfTherapy;
        const evidenceMatch = !activeFilters.evidenceType || study.evidenceType === activeFilters.evidenceType;
        
        let drugMatch = true;
        if (activeFilters.drugs && activeFilters.drugs.length > 0) { 
            drugMatch = activeFilters.drugs.every(filterDrug => study.drugs && study.drugs.includes(filterDrug));
        }
        return cancerMatch && therapyMatch && evidenceMatch && drugMatch;
    });

    const searchTerm = activeFilters.searchTerm.toLowerCase();
    let finalFilteredStudies = studiesAfterButtonFilters;

    if (searchTerm) {
        finalFilteredStudies = studiesAfterButtonFilters.filter(study => {
            const titleMatch = study.title && study.title.toLowerCase().includes(searchTerm);
            const cancerTypesMatch = study.cancerTypes && study.cancerTypes.some(ct => ct.toLowerCase().includes(searchTerm));
            const lineOfTherapyMatch = study.lineOfTherapy && study.lineOfTherapy.toLowerCase().includes(searchTerm);
            const evidenceTypeMatch = study.evidenceType && study.evidenceType.toLowerCase().includes(searchTerm);
            const drugsMatch = study.drugs && study.drugs.some(drug => drug.toLowerCase().includes(searchTerm));
            
            return titleMatch || cancerTypesMatch || lineOfTherapyMatch || evidenceTypeMatch || drugsMatch;
        });
    }

    if(studyResultsContainerEl) studyResultsContainerEl.innerHTML = ''; 
    if(resultsCountDisplayEl) resultsCountDisplayEl.textContent = `Found ${finalFilteredStudies.length} matching abstract(s).`;

    if (finalFilteredStudies.length === 0) {
        if(studyResultsContainerEl) studyResultsContainerEl.innerHTML = `<div class="col-span-full text-center py-10"><p class="text-sobi-medium-gray-text text-lg">No abstracts match the current filter criteria.</p> <p class="text-sobi-light-gray-text mt-2">Try adjusting your filters or click 'Reset All Filters'.</p></div>`;
        return;
    }

    finalFilteredStudies.forEach(study => {
        const card = document.createElement('div');
        card.className = 'study-card p-5 flex flex-col justify-between'; 
        card.setAttribute('data-study-id', study.id);
        const cancerTypesText = Array.isArray(study.cancerTypes) ? study.cancerTypes.join(', ') : (study.cancerTypes || 'N/A');
        const drugsText = Array.isArray(study.drugs) ? study.drugs.join(', ') : (study.drugs || 'N/A');

        const heartButtonHTML = `
            <button class="card-favorite-btn ${study.isFavorite ? 'saved' : ''}" data-study-id-heart="${study.id}" aria-label="${study.isFavorite ? 'Remove from favorites' : 'Save to favorites'}">
                <svg class="w-5 h-5 heart-empty" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                <svg class="w-5 h-5 heart-filled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383-.218l-.022.012-.007.004-.004.001a.752.752 0 01-.704 0l-.004-.001z" />
                </svg>
            </button>
        `;

        card.innerHTML = `
            ${heartButtonHTML} 
            <div class="study-card-content flex-grow" data-filename="${study.fileName}" data-title="${encodeURIComponent(study.title)}">
                <h3 class="text-md font-semibold mb-2 text-sobi-dark-blue group-hover:text-sobi-orange transition-colors duration-200" title="${study.title}">${study.title}</h3>
                <div class="space-y-1 text-xs">
                    <p><strong class="font-medium">Cancer Type(s):</strong> ${cancerTypesText}</p>
                    <p><strong class="font-medium">Line of Therapy:</strong> ${study.lineOfTherapy || 'N/A'}</p>
                    <p><strong class="font-medium">Evidence Type:</strong> ${study.evidenceType || 'N/A'}</p>
                    <p><strong class="font-medium">Key Drugs/Classes:</strong> ${drugsText}</p>
                </div>
            </div>
            <button class="mt-4 w-full text-xs btn bg-sobi-orange text-white hover:bg-sobi-orange-darker self-end view-details-btn">
                View Details
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 ml-1.5">
                  <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
                </svg>
            </button>
        `;
        
        const cardHeartBtn = card.querySelector('.card-favorite-btn');
        if (cardHeartBtn) {
            cardHeartBtn.addEventListener('click', (e) => {
                e.stopPropagation(); 
                const studyIdToToggle = cardHeartBtn.dataset.studyIdHeart;
                const studyToUpdate = studies.find(s => s.id === studyIdToToggle);
                if (studyToUpdate) {
                    studyToUpdate.isFavorite = !studyToUpdate.isFavorite; 
                    
                    let sessionFavIds = getSessionFavoriteIds();
                    if (studyToUpdate.isFavorite) {
                        if (!sessionFavIds.includes(studyIdToToggle)) {
                            sessionFavIds.push(studyIdToToggle);
                        }
                    } else {
                        sessionFavIds = sessionFavIds.filter(id => id !== studyIdToToggle);
                    }
                    saveSessionFavoriteIds(sessionFavIds);

                    if (studyToUpdate.isFavorite) {
                        cardHeartBtn.classList.add('saved');
                        cardHeartBtn.setAttribute('aria-label', 'Remove from favorites');
                    } else {
                        cardHeartBtn.classList.remove('saved');
                        cardHeartBtn.setAttribute('aria-label', 'Save to favorites');
                    }
                    if (activeFilters.showFavoritesOnly) {
                        applyFilters(); 
                    }
                }
            });
        }

        const cardContentArea = card.querySelector('.study-card-content');
         if(cardContentArea) {
            cardContentArea.addEventListener('click', () => {
                sessionStorage.setItem(SESSION_FILTERS_KEY, JSON.stringify(activeFilters));
                const detailPageUrl = `study_detail.html?file=${encodeURIComponent(study.fileName)}&title=${encodeURIComponent(study.title)}`;
                window.location.href = detailPageUrl;
            });
        }

        const viewDetailsButton = card.querySelector('.view-details-btn');
        if(viewDetailsButton) {
            viewDetailsButton.addEventListener('click', (e) => {
                e.stopPropagation(); 
                sessionStorage.setItem(SESSION_FILTERS_KEY, JSON.stringify(activeFilters));
                const detailPageUrl = `study_detail.html?file=${encodeURIComponent(study.fileName)}&title=${encodeURIComponent(study.title)}`;
                window.location.href = detailPageUrl;
            });
        }
        if(studyResultsContainerEl) studyResultsContainerEl.appendChild(card);
    });
}

function applyFilters() {
    displayStudies();
}

function resetAllFilters() {
    activeFilters = {
        cancerTypes: null,
        lineOfTherapy: null,
        evidenceType: null,
        drugs: [],
        searchTerm: "",
        showFavoritesOnly: false 
    };
    if (searchInputEl) searchInputEl.value = ""; 
    sessionStorage.removeItem(SESSION_FILTERS_KEY); 
    
    // Reset session favorites and update in-memory studies array accordingly
    saveSessionFavoriteIds([]); 
    studies.forEach(study => {
        // Reset to the value from studies_data.js (which is likely false unless manually edited)
        const originalStudyData = studiesDataJsOriginal.find(s => s.id === study.id);
        study.isFavorite = originalStudyData ? originalStudyData.isFavorite : false;
    });

    updateButtonStatesFromActiveFilters(); 
    applyFilters();
}

// Store original studies data to reset isFavorite on full reset
let studiesDataJsOriginal = [];

document.addEventListener('DOMContentLoaded', () => {
    // Deep clone studies_data.js to preserve original isFavorite states for full reset
    if (typeof studies !== 'undefined' && Array.isArray(studies)) {
        studiesDataJsOriginal = JSON.parse(JSON.stringify(studies));
    }
    initializeApp();
});
