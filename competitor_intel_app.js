// competitor_intel_app.js
// Loads studies_data.js, parses abstracts for author/year, aggregates trends, and populates dashboard with styled, infographic-rich visuals

(async function() {
    // Utility to fetch and parse HTML for a given abstract file
    async function fetchAbstractMeta(fileName) {
        try {
            const res = await fetch(fileName);
            const html = await res.text();
            const doc = new DOMParser().parseFromString(html, 'text/html');
            // Try to extract year from meta or fallback to presentation/release date
            let year = null;
            const metaYear = doc.querySelector('meta[name="study:year"]');
            if (metaYear) {
                year = metaYear.getAttribute('content');
            } else {
                // Try to extract from presentation/release info
                const footer = doc.querySelector('.abstract-footer-info, .meta-info, .abstract-meta-info');
                if (footer) {
                    const match = footer.textContent.match(/(20\d{2})/);
                    if (match) year = match[1];
                }
            }
            // Extract authors from sub-header or meta
            let authors = [];
            const subHeader = doc.querySelector('.abstract-sub-header, .sub-header, .meta-info');
            if (subHeader) {
                // Split by comma, remove et al., trim
                authors = subHeader.textContent.replace(/et al\./i, '').split(',').map(a => a.trim()).filter(Boolean);
            }
            return { year, authors };
        } catch (e) {
            return { year: null, authors: [] };
        }
    }

    // Aggregate all data
    const trendByYear = {};
    const authorCounts = {};
    const drugCounts = {};
    const cancerTypeCounts = {};
    const recentAbstracts = [];
    const metaCache = {};

    // Helper: get year from study title if not in meta
    function guessYearFromTitle(title) {
        const m = title.match(/(20\d{2})/);
        return m ? m[1] : null;
    }

    // Fetch all meta in parallel
    await Promise.all(studies.map(async study => {
        const meta = await fetchAbstractMeta(study.fileName);
        metaCache[study.id] = meta;
        // Year
        let year = meta.year || guessYearFromTitle(study.title);
        if (!year) year = 'Unknown';
        trendByYear[year] = (trendByYear[year] || 0) + 1;
        // Authors
        meta.authors.forEach(author => {
            if (!author) return;
            authorCounts[author] = (authorCounts[author] || 0) + 1;
        });
        // Drugs
        (study.drugs || []).forEach(drug => {
            drugCounts[drug] = (drugCounts[drug] || 0) + 1;
        });
        // Cancer Types
        (study.cancerTypes || []).forEach(type => {
            cancerTypeCounts[type] = (cancerTypeCounts[type] || 0) + 1;
        });
        // Recent abstracts (collect with year for sorting)
        recentAbstracts.push({
            id: study.id,
            title: study.title,
            fileName: study.fileName,
            year,
            authors: meta.authors
        });
    }));

    // Sort for top authors/drugs/cancer types
    function topN(obj, n) {
        return Object.entries(obj).sort((a,b) => b[1]-a[1]).slice(0,n);
    }

    // 1. Trend chart (styled)
    const trendData = Object.entries(trendByYear).map(([year, count]) => ({ year, count })).sort((a,b) => a.year.localeCompare(b.year));
    d3.select('#trendChart').html('');
    if (trendData.length > 0) {
        const width = 420, height = 220, margin = {top: 30, right: 20, bottom: 40, left: 50};
        const svg = d3.select('#trendChart').append('svg').attr('width', width).attr('height', height);
        const x = d3.scaleBand().domain(trendData.map(d=>d.year)).range([margin.left, width-margin.right]).padding(0.2);
        const y = d3.scaleLinear().domain([0, d3.max(trendData, d=>d.count)]).nice().range([height-margin.bottom, margin.top]);
        svg.append('g').attr('transform',`translate(0,${height-margin.bottom})`).call(d3.axisBottom(x)).selectAll('text').attr('fill','var(--sobi-dark-blue)').attr('font-size','13px');
        svg.append('g').attr('transform',`translate(${margin.left},0)`).call(d3.axisLeft(y)).selectAll('text').attr('fill','var(--sobi-dark-blue)').attr('font-size','13px');
        svg.selectAll('.bar').data(trendData).enter().append('rect')
            .attr('class','bar').attr('x',d=>x(d.year)).attr('y',d=>y(d.count))
            .attr('width',x.bandwidth()).attr('height',d=>y(0)-y(d.count))
            .attr('fill','var(--sobi-orange)')
            .attr('rx',6)
            .on('mouseover', function() { d3.select(this).attr('fill','var(--sobi-teal)'); })
            .on('mouseout', function() { d3.select(this).attr('fill','var(--sobi-orange)'); });
        svg.append('text').attr('x',width/2).attr('y',margin.top-12).attr('text-anchor','middle').attr('font-size','16px').attr('fill','var(--sobi-dark-blue)').text('Abstracts per Year');
    } else {
        d3.select('#trendChart').text('No data available.');
    }

    // 2. Top Authors (infographic style)
    const topAuthors = topN(authorCounts, 5);
    d3.select('#topAuthors').html(
        topAuthors.map(([a,c],i)=>`
            <div class="infographic-item teal-theme" style="display:flex;align-items:center;gap:1rem;">
                <span style="font-size:2rem;">👤</span>
                <div>
                    <div class="infographic-value" style="font-size:1.5rem;">${c}</div>
                    <div class="infographic-label">${a}</div>
                </div>
            </div>
        `).join('')
    );

    // 3. Top Drugs (infographic style)
    const topDrugs = topN(drugCounts, 5);
    d3.select('#topDrugs').html(
        topDrugs.map(([d,c],i)=>`
            <div class="infographic-item orange-theme" style="display:flex;align-items:center;gap:1rem;">
                <span style="font-size:2rem;">💊</span>
                <div>
                    <div class="infographic-value" style="font-size:1.5rem;">${c}</div>
                    <div class="infographic-label">${d}</div>
                </div>
            </div>
        `).join('')
    );

    // 4. Cancer Type Chart (infographic style)
    const cancerTypeData = topN(cancerTypeCounts, 5);
    d3.select('#cancerTypeChart').html(
        cancerTypeData.map(([t,c],i)=>`
            <div class="infographic-item" style="display:flex;align-items:center;gap:1rem;">
                <span style="font-size:2rem;">🧬</span>
                <div>
                    <div class="infographic-value" style="font-size:1.5rem;">${c}</div>
                    <div class="infographic-label">${t}</div>
                </div>
            </div>
        `).join('')
    );

    // 5. Recent Abstracts (styled cards)
    recentAbstracts.sort((a,b) => (b.year||'').localeCompare(a.year||'') || a.title.localeCompare(b.title));
    d3.select('#recentAbstracts').html(
        '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">' +
        recentAbstracts.slice(0,8).map(a=>`
            <div class="card" style="margin-bottom:0;">
                <div class="meta-info" style="margin-bottom:0.5rem;color:var(--sobi-medium-gray-text);font-size:0.95rem;">${a.year} &mdash; ${a.authors.slice(0,2).join(', ')}${a.authors.length>2?", et al.":""}</div>
                <a href="${a.fileName}" class="text-sobi-dark-blue hover:underline" target="_blank" style="font-weight:600;font-size:1.1rem;">${a.title}</a>
            </div>
        `).join('') +
        '</div>'
    );

    // Animate infographic numbers (subtle pop-in)
    document.querySelectorAll('.infographic-value').forEach(el => {
        el.animate([
            { transform: 'scale(0.7)', opacity: 0.5 },
            { transform: 'scale(1.1)', opacity: 1 },
            { transform: 'scale(1)', opacity: 1 }
        ], {
            duration: 600,
            easing: 'cubic-bezier(.68,-0.55,.27,1.55)'
        });
    });
})();