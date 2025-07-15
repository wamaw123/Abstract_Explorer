// competitor_intel_app.js
// Loads studies_data.js, parses abstracts for author/year, aggregates trends, and populates dashboard

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

    // Render charts/tables
    // 1. Trend chart
    const trendData = Object.entries(trendByYear).map(([year, count]) => ({ year, count })).sort((a,b) => a.year.localeCompare(b.year));
    d3.select('#trendChart').html('');
    if (trendData.length > 0) {
        const width = 600, height = 300, margin = {top: 30, right: 30, bottom: 40, left: 50};
        const svg = d3.select('#trendChart').append('svg').attr('width', width).attr('height', height);
        const x = d3.scaleBand().domain(trendData.map(d=>d.year)).range([margin.left, width-margin.right]).padding(0.2);
        const y = d3.scaleLinear().domain([0, d3.max(trendData, d=>d.count)]).nice().range([height-margin.bottom, margin.top]);
        svg.append('g').attr('transform',`translate(0,${height-margin.bottom})`).call(d3.axisBottom(x));
        svg.append('g').attr('transform',`translate(${margin.left},0)`).call(d3.axisLeft(y));
        svg.selectAll('.bar').data(trendData).enter().append('rect')
            .attr('class','bar').attr('x',d=>x(d.year)).attr('y',d=>y(d.count))
            .attr('width',x.bandwidth()).attr('height',d=>y(0)-y(d.count))
            .attr('fill','#0A2F5C');
        svg.append('text').attr('x',width/2).attr('y',margin.top-10).attr('text-anchor','middle').attr('font-size','16px').text('Abstracts per Year');
    } else {
        d3.select('#trendChart').text('No data available.');
    }

    // 2. Top Authors
    const topAuthors = topN(authorCounts, 10);
    d3.select('#topAuthors').html('<ol class="list-decimal ml-6">'+topAuthors.map(([a,c])=>`<li>${a} <span class="text-sobi-medium-gray-text">(${c})</span></li>`).join('')+'</ol>');

    // 3. Top Drugs
    const topDrugs = topN(drugCounts, 10);
    d3.select('#topDrugs').html('<ol class="list-decimal ml-6">'+topDrugs.map(([d,c])=>`<li>${d} <span class="text-sobi-medium-gray-text">(${c})</span></li>`).join('')+'</ol>');

    // 4. Cancer Type Chart
    const cancerTypeData = topN(cancerTypeCounts, 10);
    d3.select('#cancerTypeChart').html('<ol class="list-decimal ml-6">'+cancerTypeData.map(([t,c])=>`<li>${t} <span class="text-sobi-medium-gray-text">(${c})</span></li>`).join('')+'</ol>');

    // 5. Recent Abstracts (sorted by year desc, then title)
    recentAbstracts.sort((a,b) => (b.year||'').localeCompare(a.year||'') || a.title.localeCompare(b.title));
    d3.select('#recentAbstracts').html('<ul class="list-disc ml-6">'+recentAbstracts.slice(0,10).map(a=>`<li><a href="${a.fileName}" class="text-sobi-dark-blue hover:underline" target="_blank">${a.title}</a> <span class="text-sobi-medium-gray-text">(${a.year})</span></li>`).join('')+'</ul>');
})();