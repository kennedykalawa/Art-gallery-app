import artworks from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const featuredGrid = document.getElementById('featured-grid');
    const galleryGrid = document.getElementById('gallery-grid');
    const detailContainer = document.getElementById('detail-view');

    // Helper to create art cards
    const createArtCard = (art) => {
        return `
            <a href="detail.html?id=${art.id}" class="art-card">
                <img src="${art.image}" alt="${art.title}" loading="lazy">
                <div class="art-info">
                    <h3>${art.title}</h3>
                    <p>${art.artist}, ${art.year}</p>
                </div>
            </a>
        `;
    };

    // Render Featured Grid (Landing Page)
    if (featuredGrid) {
        featuredGrid.innerHTML = artworks.slice(0, 3).map(createArtCard).join('');
    }

    // Render Full Gallery
    if (galleryGrid) {
        const renderGallery = (filteredArt) => {
            galleryGrid.innerHTML = filteredArt.map(createArtCard).join('');
        };

        renderGallery(artworks);

        // Filter functionality
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                if (category === 'all') {
                    renderGallery(artworks);
                } else {
                    const filtered = artworks.filter(a => a.category === category);
                    renderGallery(filtered);
                }
            });
        });
    }

    // Render Detail View
    if (detailContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const artId = parseInt(urlParams.get('id'));
        const art = artworks.find(a => a.id === artId);

        if (art) {
            detailContainer.innerHTML = `
                <div class="detail-container">
                    <div class="detail-image">
                        <img src="${art.image}" alt="${art.title}">
                    </div>
                    <div class="detail-content">
                        <h1>${art.title}</h1>
                        <div class="detail-meta">
                            <span>Artist<br>${art.artist}</span>
                            <span>Year<br>${art.year}</span>
                            <span>Medium<br>${art.category.charAt(0).toUpperCase() + art.category.slice(1)}</span>
                        </div>
                        <p>${art.description}</p>
                        <a href="gallery.html" class="back-btn">Back to Gallery</a>
                    </div>
                </div>
            `;
            document.title = `${art.title} | Vanguard Gallery`;
        } else {
            detailContainer.innerHTML = `<p>Artwork not found. <a href="gallery.html">Return to Gallery</a></p>`;
        }
    }
});
