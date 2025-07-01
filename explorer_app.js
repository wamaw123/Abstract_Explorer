// explorer_app.js
// Enhanced UI/UX version with improved functionality

// This script assumes 'studies' variable is loaded globally from 'studies_data.js'

const SESSION_FAVORITES_KEY = 'sessionFavoriteAbstractIds';
const SESSION_FILTERS_KEY = 'conferenceExplorerFilters';

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
const clearSearchBtnEl = document.getElementById('clearSearch');
const sortByEl = document.getElementById('sortBy');
const emptyStateEl = document.getElementById('emptyState');
const clearAllFiltersEl = document.getElementById('clearAllFilters');
const showAllAbstractsEl = document.getElementById('showAllAbstracts');
const loadingIndicatorEl = document.getElementById('loadingIndicator');

const B_NHL_SUBTYPES = ['B-NHL', 'DLBCL', 'LBCL', 'Follicular Lymphoma', 'Marginal zone lymphoma', 'HGBL', 'MCL']; 

let activeFilters = {
    cancerTypes: null, 
    lineOfTherapy: null, 
    evidenceType: null,  
    drugs: [],
    searchTerm: "",
    showFavoritesOnly: false,
    sortBy: "relevance"
};

let searchDebounceTimer;
let allStudies = []; // Cache of all studies for sorting/filtering

// Enhanced utility functions
function showLoading() {
    if (loadingIndicatorEl) {
        loadingIndicatorEl.style.display = 'flex';
    }
}

function hideLoading() {
    if (loadingIndicatorEl) {
        loadingIndicatorEl.style.display = 'none';
    }
}

function showToast(message, type = 'info', duration = 3000) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden transform transition-all duration-300 translate-x-full`;
    
    const bgColors = {
        success: 'bg-green-50 border-green-200',
        error: 'bg-red-50 border-red-200', 
        warning: 'bg-yellow-50 border-yellow-200',
        info: 'bg-blue-50 border-blue-200'
    };

    const iconColors = {
        success: 'text-green-400',
        error: 'text-red-400',
        warning: 'text-yellow-400', 
        info: 'text-blue-400'
    };

    const icons = {
        success: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>',
        error: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>',
        warning: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 8.5c-.77.833.192 2.5 1.732 2.5z"></path>',
        info: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>'
    };

    toast.innerHTML = `
        <div class="p-4 ${bgColors[type]} border ${bgColors[type].split(' ')[1]}">
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <svg class="h-5 w-5 ${iconColors[type]}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        ${icons[type]}
                    </svg>
                </div>
                <div class="ml-3 w-0 flex-1">
                    <p class="text-sm font-medium text-gray-900">${message}</p>
                </div>
                <div class="ml-4 flex-shrink-0 flex">
                    <button class="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none" onclick="this.closest('.transform').remove()">
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;

    toastContainer.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
        toast.classList.add('translate-x-0');
    }, 100);

    // Auto remove
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, duration);
}

function updateClearSearchButton() {
    if (!clearSearchBtnEl || !searchInputEl) return;
    
    if (searchInputEl.value.trim()) {
        clearSearchBtnEl.classList.remove('hidden');
    } else {
        clearSearchBtnEl.classList.add('hidden');
    }
}

function getSessionFavoriteIds() {
    const saved = sessionStorage.getItem(SESSION_FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
}

function saveSessionFavoriteIds(favoriteIdsArray) {
    sessionStorage.setItem(SESSION_FAVORITES_KEY, JSON.stringify(favoriteIdsArray));
}

function saveFiltersToSession() {
    sessionStorage.setItem(SESSION_FILTERS_KEY, JSON.stringify(activeFilters));
}

// Enhanced initialization function
function initializeApp() {
    showLoading();
    
    if (typeof studies === 'undefined' || !Array.isArray(studies) || studies.length === 0) {
        console.error("The 'studies' array is not loaded or is empty. Check 'studies_data.js'.");
        hideLoading();
        if(explorerContentEl) explorerContentEl.classList.add('hidden'); 
        if(initializationMessageEl) initializationMessageEl.classList.remove('hidden'); 
        return; 
    }
    
    // Cache all studies
    allStudies = [...studies];
    
    if(explorerContentEl) explorerContentEl.classList.remove('hidden'); 
    if(initializationMessageEl) initializationMessageEl.classList.add('hidden');

    // Sync in-memory 'isFavorite' with sessionStorage for studies
    const sessionFavoriteIds = getSessionFavoriteIds();
    studies.forEach(study => {
        study.isFavorite = sessionFavoriteIds.includes(study.id);
    });

    // Load saved filters
    const storedFilters = sessionStorage.getItem(SESSION_FILTERS_KEY);
    if (storedFilters) {
        const parsedStoredFilters = JSON.parse(storedFilters);
        activeFilters = {
            ...activeFilters,
            ...parsedStoredFilters,
            drugs: Array.isArray(parsedStoredFilters.drugs) ? parsedStoredFilters.drugs : [],
            searchTerm: parsedStoredFilters.searchTerm || "",
            showFavoritesOnly: parsedStoredFilters.showFavoritesOnly || false,
            sortBy: parsedStoredFilters.sortBy || "relevance"
        };
        
        if (searchInputEl) searchInputEl.value = activeFilters.searchTerm;
        if (sortByEl) sortByEl.value = activeFilters.sortBy;
        updateClearSearchButton();
    } else {
        activeFilters.drugs = [];
        activeFilters.searchTerm = "";
        activeFilters.showFavoritesOnly = false;
        activeFilters.sortBy = "relevance";
    }
    
    generateFilterButtons(); 
    updateButtonStatesFromActiveFilters(); 
    updateFavoritesFilterButtonsUI();
    setupEventListeners();
    
    if(currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
    
    hideLoading();
    applyFilters();
    
    showToast(`Loaded ${studies.length} abstracts successfully`, 'success');
}

function setupEventListeners() {
    // Reset filters button
    if(resetFiltersButtonEl) {
        resetFiltersButtonEl.addEventListener('click', resetAllFilters);
    }
    
    // Search input with enhanced functionality
    if (searchInputEl) {
        searchInputEl.addEventListener('input', () => {
            updateClearSearchButton();
            clearTimeout(searchDebounceTimer);
            searchDebounceTimer = setTimeout(() => {
                activeFilters.searchTerm = searchInputEl.value.trim();
                saveFiltersToSession();
                applyFilters();
            }, 300); 
        });
        
        // Enhanced search experience
        searchInputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                clearSearch();
            }
        });
    }
    
    // Clear search button
    if (clearSearchBtnEl) {
        clearSearchBtnEl.addEventListener('click', clearSearch);
    }
    
    // Sort dropdown
    if (sortByEl) {
        sortByEl.addEventListener('change', () => {
            activeFilters.sortBy = sortByEl.value;
            saveFiltersToSession();
            applyFilters();
            showToast(`Sorted by ${sortByEl.options[sortByEl.selectedIndex].text}`, 'info', 2000);
        });
    }
    
    // Favorites filter buttons
    if(showAllBtnEl) showAllBtnEl.addEventListener('click', () => {
        activeFilters.showFavoritesOnly = false;
        updateFavoritesFilterButtonsUI();
        saveFiltersToSession();
        applyFilters();
    });
    
    if(showFavoritesBtnEl) showFavoritesBtnEl.addEventListener('click', () => {
        activeFilters.showFavoritesOnly = true;
        updateFavoritesFilterButtonsUI();
        saveFiltersToSession();
        applyFilters();
    });
    
    // Empty state buttons
    if (clearAllFiltersEl) {
        clearAllFiltersEl.addEventListener('click', resetAllFilters);
    }
    
    if (showAllAbstractsEl) {
        showAllAbstractsEl.addEventListener('click', () => {
            activeFilters.showFavoritesOnly = false;
            updateFavoritesFilterButtonsUI();
            saveFiltersToSession();
            applyFilters();
        });
    }
}

function clearSearch() {
    if (searchInputEl) {
        searchInputEl.value = '';
        searchInputEl.focus();
    }
    activeFilters.searchTerm = '';
    updateClearSearchButton();
    saveFiltersToSession();
    applyFilters();
}

function updateFavoritesFilterButtonsUI() {
    if (!showAllBtnEl || !showFavoritesBtnEl) return;
    
    const heartIcon = showFavoritesBtnEl.querySelector('.heart-icon-fav-filter');
    
    if (activeFilters.showFavoritesOnly) {
        showAllBtnEl.classList.remove('active');
        showAllBtnEl.setAttribute('aria-pressed', 'false');
        showFavoritesBtnEl.classList.add('active');
        showFavoritesBtnEl.setAttribute('aria-pressed', 'true');
        if(heartIcon) heartIcon.style.color = 'var(--sobi-white)';
    } else {
        showAllBtnEl.classList.add('active');
        showAllBtnEl.setAttribute('aria-pressed', 'true');
        showFavoritesBtnEl.classList.remove('active');
        showFavoritesBtnEl.setAttribute('aria-pressed', 'false');
        if(heartIcon) heartIcon.style.color = 'currentColor';
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
    allButton.type = 'button';
    allButton.setAttribute('aria-pressed', 'false');
    allButton.addEventListener('click', () => {
        activeFilters[categoryKey] = null;
        updateButtonStatesFromActiveFilters(); 
        saveFiltersToSession();
        applyFilters();
        showToast(`Showing all ${categoryKey.replace(/([A-Z])/g, ' $1').toLowerCase()}`, 'info', 2000);
    });
    buttonContainer.appendChild(allButton);

    Array.from(categoryValues).sort().forEach(value => {
        const button = document.createElement('button');
        button.className = 'filter-button ' + (isSidebarButton ? 'filter-button-sidebar' : '');
        button.textContent = value;
        button.type = 'button';
        button.setAttribute('aria-pressed', 'false');
        button.addEventListener('click', () => {
            activeFilters[categoryKey] = value;
            updateButtonStatesFromActiveFilters(); 
            saveFiltersToSession();
            applyFilters();
            showToast(`Filtered by ${value}`, 'info', 2000);
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
    allButton.type = 'button';
    allButton.setAttribute('aria-pressed', 'false');
    allButton.addEventListener('click', () => {
        activeFilters[categoryKey] = []; 
        updateButtonStatesFromActiveFilters();
        saveFiltersToSession();
        applyFilters();
        showToast(`Showing all ${categoryKey}`, 'info', 2000);
    });
    buttonContainer.appendChild(allButton);

    Array.from(categoryValues).sort().forEach(value => {
        const button = document.createElement('button');
        button.className = 'filter-button ' + (isSidebarButton ? 'filter-button-sidebar' : '');
        button.textContent = value;
        button.type = 'button';
        button.setAttribute('aria-pressed', 'false');
        button.addEventListener('click', () => {
            const index = activeFilters[categoryKey].indexOf(value);
            if (index > -1) {
                activeFilters[categoryKey].splice(index, 1); 
                showToast(`Removed ${value} filter`, 'info', 2000);
            } else {
                activeFilters[categoryKey].push(value); 
                showToast(`Added ${value} filter`, 'info', 2000);
            }
            updateButtonStatesFromActiveFilters();
            saveFiltersToSession();
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
                const isActive = (activeFilters[categoryKey] === null && isAllButton) || (activeFilters[categoryKey] === btn.textContent && !isAllButton);
                
                btn.classList.toggle('active', isActive);
                btn.setAttribute('aria-pressed', isActive.toString());
            });
        }
    });

    const drugsContainer = document.querySelector('[data-filter-category="drugs"]');
    if (drugsContainer) {
        drugsContainer.querySelectorAll('.filter-button').forEach(btn => {
            const isAllButton = btn.textContent.startsWith('All ');
            let isActive = false;
            
            if (isAllButton) {
                isActive = activeFilters.drugs.length === 0;
            } else { 
                isActive = activeFilters.drugs.includes(btn.textContent);
            }
            
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive.toString());
        });
    }
    updateFavoritesFilterButtonsUI(); 
}

// Enhanced sorting function
function sortStudies(studies, sortBy) {
    const sortedStudies = [...studies];
    
    switch (sortBy) {
        case 'title':
            return sortedStudies.sort((a, b) => a.title.localeCompare(b.title));
        case 'cancer-type':
            return sortedStudies.sort((a, b) => {
                const aType = Array.isArray(a.cancerTypes) ? a.cancerTypes[0] : a.cancerTypes || '';
                const bType = Array.isArray(b.cancerTypes) ? b.cancerTypes[0] : b.cancerTypes || '';
                return aType.localeCompare(bType);
            });
        case 'line-therapy':
            return sortedStudies.sort((a, b) => {
                const order = { '1L': 1, '2L': 2, '3L+': 3 };
                return (order[a.lineOfTherapy] || 999) - (order[b.lineOfTherapy] || 999);
            });
        case 'relevance':
        default:
            // For relevance, prioritize exact matches in title, then favorites
            return sortedStudies.sort((a, b) => {
                const searchTerm = activeFilters.searchTerm.toLowerCase();
                if (searchTerm) {
                    const aTitle = a.title.toLowerCase();
                    const bTitle = b.title.toLowerCase();
                    const aExactMatch = aTitle.includes(searchTerm);
                    const bExactMatch = bTitle.includes(searchTerm);
                    
                    if (aExactMatch && !bExactMatch) return -1;
                    if (!aExactMatch && bExactMatch) return 1;
                }
                
                // Secondary sort by favorites
                if (a.isFavorite && !b.isFavorite) return -1;
                if (!a.isFavorite && b.isFavorite) return 1;
                
                return 0;
            });
    }
}

// Enhanced display function
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

    // Apply sorting
    finalFilteredStudies = sortStudies(finalFilteredStudies, activeFilters.sortBy);

    // Update results count and handle empty state
    const resultCount = finalFilteredStudies.length;
    if(resultsCountDisplayEl) {
        resultsCountDisplayEl.textContent = `Found ${resultCount} matching abstract${resultCount !== 1 ? 's' : ''}.`;
    }

    if(studyResultsContainerEl) studyResultsContainerEl.innerHTML = '';

    if (resultCount === 0) {
        if (emptyStateEl) emptyStateEl.classList.remove('hidden');
        if (studyResultsContainerEl) studyResultsContainerEl.style.display = 'none';
        return;
    } else {
        if (emptyStateEl) emptyStateEl.classList.add('hidden');
        if (studyResultsContainerEl) studyResultsContainerEl.style.display = 'grid';
    }

    // Render study cards with enhanced interaction
    finalFilteredStudies.forEach((study, index) => {
        const card = document.createElement('article'); // Semantic markup
        card.className = 'study-card p-5 flex flex-col justify-between'; 
        card.setAttribute('data-study-id', study.id);
        card.setAttribute('tabindex', '0'); // Make focusable
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `View details for ${study.title}`);
        
        const cancerTypesText = Array.isArray(study.cancerTypes) ? study.cancerTypes.join(', ') : (study.cancerTypes || 'N/A');
        const drugsText = Array.isArray(study.drugs) ? study.drugs.join(', ') : (study.drugs || 'N/A');

        const heartButtonHTML = `
            <button class="card-favorite-btn ${study.isFavorite ? 'saved' : ''}" 
                    data-study-id-heart="${study.id}" 
                    aria-label="${study.isFavorite ? 'Remove from favorites' : 'Save to favorites'}"
                    type="button">
                <svg class="w-5 h-5 heart-empty" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                <svg class="w-5 h-5 heart-filled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383-.218l-.022.012-.007.004-.004.001a.752.752 0 01-.704 0l-.004-.001z" />
                </svg>
            </button>
        `;

        card.innerHTML = `
            ${heartButtonHTML} 
            <div class="study-card-content flex-grow" data-filename="${study.fileName}" data-title="${encodeURIComponent(study.title)}">
                <h3 class="text-md font-semibold mb-2 text-sobi-dark-blue group-hover:text-sobi-orange transition-colors duration-200" title="${study.title}">
                    ${highlightSearchTerms(study.title, activeFilters.searchTerm)}
                </h3>
                <div class="space-y-1 text-xs">
                    <p><strong class="font-medium">Cancer Type(s):</strong> ${highlightSearchTerms(cancerTypesText, activeFilters.searchTerm)}</p>
                    <p><strong class="font-medium">Line of Therapy:</strong> ${highlightSearchTerms(study.lineOfTherapy || 'N/A', activeFilters.searchTerm)}</p>
                    <p><strong class="font-medium">Evidence Type:</strong> ${highlightSearchTerms(study.evidenceType || 'N/A', activeFilters.searchTerm)}</p>
                    <p><strong class="font-medium">Key Drugs/Classes:</strong> ${highlightSearchTerms(drugsText, activeFilters.searchTerm)}</p>
                </div>
            </div>
            <button class="mt-4 w-full text-xs btn bg-sobi-orange text-white hover:bg-sobi-orange-darker self-end view-details-btn" type="button">
                <span>View Details</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 ml-1.5" aria-hidden="true">
                  <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
                </svg>
            </button>
        `;
        
        // Enhanced favorite button functionality
        const cardHeartBtn = card.querySelector('.card-favorite-btn');
        if (cardHeartBtn) {
            cardHeartBtn.addEventListener('click', (e) => {
                e.stopPropagation(); 
                toggleFavorite(study, cardHeartBtn);
            });
        }

        // Enhanced card navigation
        const navigateToDetail = () => {
            sessionStorage.setItem(SESSION_FILTERS_KEY, JSON.stringify(activeFilters));
            const detailPageUrl = `study_detail.html?file=${encodeURIComponent(study.fileName)}&title=${encodeURIComponent(study.title)}`;
            window.location.href = detailPageUrl;
        };

        const cardContentArea = card.querySelector('.study-card-content');
        if(cardContentArea) {
            cardContentArea.addEventListener('click', navigateToDetail);
        }

        // Enhanced keyboard navigation
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigateToDetail();
            }
        });

        const viewDetailsButton = card.querySelector('.view-details-btn');
        if(viewDetailsButton) {
            viewDetailsButton.addEventListener('click', (e) => {
                e.stopPropagation(); 
                navigateToDetail();
            });
        }
        
        if(studyResultsContainerEl) studyResultsContainerEl.appendChild(card);
        
        // Add subtle animation delay for each card
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// Helper function to highlight search terms
function highlightSearchTerms(text, searchTerm) {
    if (!searchTerm || !text) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 text-yellow-900 rounded px-1">$1</mark>');
}

// Enhanced favorite toggle function
function toggleFavorite(study, buttonEl) {
    const studyIdToToggle = study.id;
    const studyToUpdate = studies.find(s => s.id === studyIdToToggle);
    
    if (studyToUpdate) {
        studyToUpdate.isFavorite = !studyToUpdate.isFavorite; 
        
        let sessionFavIds = getSessionFavoriteIds();
        if (studyToUpdate.isFavorite) {
            if (!sessionFavIds.includes(studyIdToToggle)) {
                sessionFavIds.push(studyIdToToggle);
            }
            showToast('Added to favorites', 'success', 2000);
        } else {
            sessionFavIds = sessionFavIds.filter(id => id !== studyIdToToggle);
            showToast('Removed from favorites', 'info', 2000);
        }
        
        saveSessionFavoriteIds(sessionFavIds);

        if (studyToUpdate.isFavorite) {
            buttonEl.classList.add('saved');
            buttonEl.setAttribute('aria-label', 'Remove from favorites');
        } else {
            buttonEl.classList.remove('saved');
            buttonEl.setAttribute('aria-label', 'Save to favorites');
        }
        
        if (activeFilters.showFavoritesOnly) {
            applyFilters(); 
        }
    }
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
        showFavoritesOnly: false,
        sortBy: "relevance"
    };
    
    if (searchInputEl) searchInputEl.value = ""; 
    if (sortByEl) sortByEl.value = "relevance";
    updateClearSearchButton();
    
    sessionStorage.removeItem(SESSION_FILTERS_KEY); 
    
    // Reset session favorites and update in-memory studies array accordingly
    saveSessionFavoriteIds([]); 
    studies.forEach(study => {
        const originalStudyData = studiesDataJsOriginal.find(s => s.id === study.id);
        study.isFavorite = originalStudyData ? originalStudyData.isFavorite : false;
    });

    updateButtonStatesFromActiveFilters(); 
    applyFilters();
    
    showToast('All filters and favorites cleared', 'success');
}

// Store original studies data to reset isFavorite on full reset
let studiesDataJsOriginal = [];

// Enhanced initialization with better error handling
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Deep clone studies_data.js to preserve original isFavorite states for full reset
        if (typeof studies !== 'undefined' && Array.isArray(studies)) {
            studiesDataJsOriginal = JSON.parse(JSON.stringify(studies));
        }
        
        initializeApp();
    } catch (error) {
        console.error('Error initializing app:', error);
        hideLoading();
        if(explorerContentEl) explorerContentEl.classList.add('hidden'); 
        if(initializationMessageEl) initializationMessageEl.classList.remove('hidden');
        showToast('Failed to initialize application', 'error');
    }
});

// Add CSS for card animation
const style = document.createElement('style');
style.textContent = `
    .study-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    mark {
        background-color: #fef3c7;
        color: #78350f;
        padding: 0.125rem 0.25rem;
        border-radius: 0.25rem;
        font-weight: 500;
    }
`;
document.head.appendChild(style);
