// abstract_features.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Image Pop-up (Lightbox) Functionality ---
    const lightbox = document.createElement('div');
    lightbox.id = 'imageLightbox';
    lightbox.style.display = 'none'; // Hidden by default
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-content" id="lightboxImg">
        <div id="lightboxCaption"></div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('.zoomable-image-container img.zoomable-image').forEach(image => {
        // Add a zoom icon overlay to the image container
        const zoomIcon = document.createElement('div');
        zoomIcon.classList.add('zoom-icon-overlay');
        zoomIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
                <path fill-rule="evenodd" d="M9 8.25a.75.75 0 01.75.75v2.25h2.25a.75.75 0 010 1.5H9.75v2.25a.75.75 0 01-1.5 0V12.75H6a.75.75 0 010-1.5h2.25V9a.75.75 0 01.75-.75z" clip-rule="evenodd" />
            </svg>
        `;
        // Ensure the image's parent container is positioned relatively for the icon
        if (image.parentElement && getComputedStyle(image.parentElement).position === 'static') {
            image.parentElement.style.position = 'relative';
        }
        image.parentElement.appendChild(zoomIcon);
        
        image.parentElement.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = image.src;
            lightboxCaption.textContent = image.alt || ''; // Use alt text as caption
            document.body.style.overflow = 'hidden'; // Prevent scrolling of background
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        lightboxImg.src = ""; // Clear image
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) { // Click on overlay itself
            lightbox.style.display = 'none';
            lightboxImg.src = "";
            document.body.style.overflow = 'auto';
        }
    });

    // --- Copy Reference to Clipboard Functionality ---
    const referenceSection = document.getElementById('referenceSectionContent'); // Target specific content
    const copyReferenceBtn = document.getElementById('copyReferenceBtn');

    if (copyReferenceBtn && referenceSection) {
        copyReferenceBtn.addEventListener('click', () => {
            const referenceText = referenceSection.innerText || referenceSection.textContent;
            navigator.clipboard.writeText(referenceText.trim()).then(() => {
                const originalText = copyReferenceBtn.innerHTML;
                copyReferenceBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 mr-1.5">
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                    </svg>
                    Copied!
                `;
                copyReferenceBtn.classList.add('copied');
                setTimeout(() => {
                    copyReferenceBtn.innerHTML = originalText;
                    copyReferenceBtn.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy reference: ', err);
                alert('Failed to copy reference.');
            });
        });
    }
});
