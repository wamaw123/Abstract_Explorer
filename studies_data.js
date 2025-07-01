// studies_data.js
// Ensure 'isFavorite: false' is present in each study object if you haven't added it yet.

const studies = [
    {
        id: 'r-pola-glo',
        title: 'S248 - R-POLA-GLO Trial: Phase II Results Summary in Elderly/Unfit Aggressive Lymphoma',
        fileName: 'Abstracts/R-POLA-GLO.html', 
        cancerTypes: ['DLBCL', 'B-NHL', 'Aggressive Lymphoma'], 
        lineOfTherapy: '1L',
        evidenceType: 'Clinical trial',
        drugs: ['ADC', 'Polatuzumab Vedotin', 'Bispecific antibodies', 'Glofitamab', 'Rituximab'],
        isFavorite: false 
    },
    {
        id: 'lotis-7',
        title: 'PS1911 - LOTIS-7: Loncastuximab Tesirine + Glofitamab in R/R DLBCL',
        fileName: 'Abstracts/LOTIS-7.html', 
        cancerTypes: ['DLBCL', 'Follicular Lymphoma', 'Marginal zone lymphoma', 'B-NHL'], 
        lineOfTherapy: '2L', 
        evidenceType: 'Clinical trial',
        drugs: ['ADC', 'Loncastuximab Tesirine', 'Bispecific antibodies', 'Glofitamab'],
        isFavorite: false 
    },
    {
        id: 'lotis-5',
        title: 'PS1957 - LOTIS-5: Loncastuximab Tesirine + Rituximab in R/R DLBCL/HGBL',
        fileName: 'Abstracts/LOTIS-5.html', 
        cancerTypes: ['DLBCL', 'HGBL', 'B-NHL'], 
        lineOfTherapy: '2L', 
        evidenceType: 'Clinical trial',
        drugs: ['ADC', 'Loncastuximab Tesirine', 'Monoclonal Antibody', 'Rituximab'],
        isFavorite: false 
    },
    {
        id: 'bs-ab-bridge-cart',
        title: 'PF944 - Bispecific Antibodies as Bridging/Holding Before CAR-T in LBCL',
        fileName: 'Abstracts/bs-Ab_abstract.html', 
        cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'], 
        lineOfTherapy: '3L+', 
        evidenceType: 'Clinical trial', 
        drugs: ['Bispecific antibodies', 'CAR-T cells', 'Glofitamab', 'Epcoritamab'],
        isFavorite: false 
    },
    {
        id: 'epcore-nhl5-kerr',
        title: 'S247 - EPCORE NHL-5: Epcoritamab + Pola-R-CHP for 1L DLBCL',
        fileName: 'Abstracts/EPCORE-NHL-5.html', 
        cancerTypes: ['DLBCL', 'HGBL', 'B-NHL', 'FL G3B'], // Added FL G3B from abstract content
        lineOfTherapy: '1L',
        evidenceType: 'Clinical trial', 
        drugs: ['Epcoritamab', 'Polatuzumab Vedotin', 'Rituximab', 'CIT', 'Bispecific antibodies', 'ADC', 'Monoclonal Antibody'],
        isFavorite: false 
    },
    {
        id: 'glofitamab-tp53-rrdlbcl-zhao',
        title: 'PB3271 - Glofitamab Chemo-Free Regimens in TP53-mutated R/R DLBCL (Real-World)',
        fileName: 'Abstracts/GLOFITAMAB-TP53-RRDLBCL-ZHAO.html', 
        cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
        lineOfTherapy: '3L+', 
        evidenceType: 'Real-world evidence',
        drugs: ['Glofitamab', 'Bispecific antibodies', 'Acalabrutinib', 'Zanubrutinib', 'Obutinib', 'BTK inhibitors', 'Sintilimab', 'PD-1 inhibitor', 'Lenalidomide', 'Immunomodulatory drugs', 'Polatuzumab Vedotin', 'ADC'],
        isFavorite: false 
    },
    {
    id: 'dr-pola-r-chp-shah',
    title: 'PB3250 - Dose-reduced Pola-R-CHP for frontline treatment of diffuse large B-cell lymphoma in elderly and comorbid patients',
    fileName: 'Abstracts/DR-POLA-R-CHP-SHAH.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'], // Based on abstract content and approved list
    lineOfTherapy: '1L',
    evidenceType: 'Real-world evidence', // Based on "retrospective analysis"
    drugs: ['Polatuzumab Vedotin', 'Rituximab', 'ADC', 'Monoclonal Antibody', 'Chemotherapy', 'CIT', 'Pola-R-CHP'], // R-miniCVP components covered by Chemotherapy & CIT
    isFavorite: false
    },
    {
    id: 'pola-r-chp-pgi-dlbcl-zhao',
    title: 'PB3309 - Pola-R-CHP regimen demonstrates high efficacy and manageable safety in newly diagnosed primary gastrointestinal diffuse large B-cell lymphoma',
    fileName: 'Abstracts/POLARCHP-PGI-DLBCL-ZHAO.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'], // PGI-DLBCL is a DLBCL
    lineOfTherapy: '1L',
    evidenceType: 'Real-world evidence', // Retrospective
    drugs: ['Polatuzumab Vedotin', 'Rituximab', 'ADC', 'Monoclonal Antibody', 'Chemotherapy', 'CIT', 'Pola-R-CHP'],
    isFavorite: false
    },
    {
    id: 'pola-rchp-hlh-dlbcl-sun',
    title: 'PB3323 - A single-center pilot study of Pola-RCHP for treating newly diagnosed diffuse large B-cell lymphoma with hemophagocytic lymphohistiocytosis',
    fileName: 'Abstracts/POLA-RCHP-HLH-DLBCL-SUN.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '1L',
    evidenceType: 'Clinical trial', // Pilot study
    drugs: ['Polatuzumab Vedotin', 'ADC', 'Rituximab', 'Monoclonal Antibody', 'Chemotherapy', 'CIT', 'Pola-RCHP', 'Ruxolitinib'],
    isFavorite: false
    },
    {
    id: 'pola-rchp-elderly-dlbcl-nos-magomedova',
    title: 'PB3324 - Pola-R-CHP protocol in the treatment of elderly patients with diffuse B-cell large cell lymphoma, not otherwise specified.',
    fileName: 'Abstracts/POLA-RCHP-ELDERLY-DLBCL-NOS-MAGOMEDOVA.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '1L',
    evidenceType: 'Clinical trial',
    drugs: ['Polatuzumab Vedotin', 'ADC', 'Rituximab', 'Monoclonal Antibody', 'Chemotherapy', 'CIT', 'Pola-RCHP', 'Lenalidomide', 'Immunomodulatory drugs', 'Ibrutinib', 'BTK inhibitors'],
    isFavorite: false
    },
    {
    id: 'pola-rchp-low-risk-dlbcl-ren',
    title: 'PS1967 - Effectiveness and safety of Pola-R-CHP regimen in previously untreated low-risk DLBCL: A nationwide multicenter retrospective study of IPI 0-1 patients in China',
    fileName: 'Abstracts/POLA-RCHP-LOW-RISK-DLBCL-REN.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '1L',
    evidenceType: 'Real-world evidence', // Retrospective study
    drugs: ['Polatuzumab Vedotin', 'ADC', 'Rituximab', 'Monoclonal Antibody', 'Chemotherapy', 'CIT', 'Pola-RCHP'],
    isFavorite: false
    },
    {
    id: 'pola-rchp-polarix-ineligible-low-risk-dlbcl-ren-pf984',
    title: 'PF984 - Pola-R-CHP performed well in POLARIX trial-ineligible and low risk (IPI 0-1) patients with previously untreated DLBCL: A prospective observational study',
    fileName: 'Abstracts/POLA-RCHP-POLARIX-INELIGIBLE-LOW-RISK-DLBCL-REN-PF984.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '1L',
    evidenceType: 'Clinical trial', // Prospective observational study
    drugs: ['Polatuzumab Vedotin', 'ADC', 'Rituximab', 'Monoclonal Antibody', 'Chemotherapy', 'CIT', 'Pola-RCHP'],
    isFavorite: false
    },
    {
    id: 'rchop-len-ibr-elderly-dlbcl-nos-magomedova',
    title: 'PB3301 - The R-CHOP-Lenalidomide-Ibrutinib protocol in the treatment of elderly patients with diffuse B-cell large cell lymphoma, not otherwise specified.',
    fileName: 'Abstracts/RCHOP-LEN-IBR-ELDERLY-DLBCL-NOS-MAGOMEDOVA.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '1L',
    evidenceType: 'Clinical trial',
    drugs: ['Rituximab', 'Monoclonal Antibody', 'Cyclophosphamide', 'Doxorubicin', 'Vincristine', 'Prednisone', 'Chemotherapy', 'CIT', 'Lenalidomide', 'Immunomodulatory drugs', 'Ibrutinib', 'BTK inhibitors'],
    isFavorite: false
    },
{
    id: 'rcdop-rcmop-low-risk-bulky-dlbcl-gu',
    title: 'PB3304 - Efficacy and safety of sequential R-CDOP and R-CMOP regimens in DLBCL patients with IPI score 0-1 and bulky mass: A retrospective analysis',
    fileName: 'Abstracts/RCDOP-RCMOP-LOW-RISK-BULKY-DLBCL-GU.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '1L', // Sequential therapy within a 1L strategy
    evidenceType: 'Real-world evidence', // Retrospective analysis
    drugs: ['Rituximab', 'Monoclonal Antibody', 'Cyclophosphamide', 'Cisplatin', 'Vincristine', 'Prednisone', 'Liposomal Mitoxantrone', 'Chemotherapy', 'CIT'],
    isFavorite: false
},
{
    id: 'intensive-chemo-asct-hr-dlbcl-yan',
    title: 'PB3322 - Efficacy and safety of sequential intensive chemotherapy and autologous hematopoietic stem cell transplantation in the treatment of high-intermediate- or high-risk diffuse large B-cell lymphoma',
    fileName: 'Abstracts/INTENSIVE-CHEMO-ASCT-HR-DLBCL-YAN.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '1L',
    evidenceType: 'Clinical trial', // Prospective, open, multicenter, single-arm
    drugs: ['Rituximab', 'Monoclonal Antibody', 'Chemotherapy', 'CIT', 'R-HyperCVAD', 'R-DICE'], // Specific components of R-HyperCVAD/R-DICE are not detailed in the abstract text.
    isFavorite: false
},
{
    id: 'selinexor-rchop-ebv-dlbcl-cai',
    title: 'PB3231 - First-line Selinexor in combination with R-CHOP for EBV-positive diffuse large B-cell lymphoma (XPLORE): A single-arm, phase Ib/II trial',
    fileName: 'Abstracts/SELINEXOR-RCHOP-EBV-DLBCL-CAI.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'], // EBV-positive DLBCL
    lineOfTherapy: '1L',
    evidenceType: 'Clinical trial', // Phase Ib/II trial
    drugs: ['Selinexor', 'XPO1 inhibitor', 'Rituximab', 'Monoclonal Antibody', 'Cyclophosphamide', 'Doxorubicin', 'Vincristine', 'Prednisone', 'Chemotherapy', 'CIT', 'R-CHOP'],
    isFavorite: false
},
{
    id: 'immune-dysreg-dlbcl-hgbl-castillo',
    title: 'PB3210 - Immune dysregulation in DLBCL and HGBL with MYC, BCL2, and/or BCL6 rearrangements: A comparative analysis of R-CHOP versus R-DA-EPOCH regimens.',
    fileName: 'Abstracts/IMMUNE-DYSREG-DLBCL-HGBL-RCHOP-RDAEPOCH-CASTILLO.html',
    cancerTypes: ['DLBCL', 'HGBL', 'LBCL', 'B-NHL'], // HGBL is a B-NHL. DLBCL is an LBCL and B-NHL
    lineOfTherapy: '1L', // Inferred as standard induction regimens being compared
    evidenceType: 'Real-world evidence', // Retrospective study
    drugs: ['Rituximab', 'Monoclonal Antibody', 'Cyclophosphamide', 'Doxorubicin', 'Vincristine', 'Prednisone', 'Etoposide', 'Chemotherapy', 'CIT', 'R-CHOP', 'R-DA-EPOCH'],
    isFavorite: false
},
{
    id: 'selinexor-repoch-hiv-dlbcl-wang',
    title: 'PB3227 - Selinexor in combination with R-EPOCH for patients with previously untreated HIV-associated DLBCL: A single-center, prospective, single-arm trial',
    fileName: 'Abstracts/SELINEXOR-REPOCH-HIV-DLBCL-WANG.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'], // HIV-Associated DLBCL
    lineOfTherapy: '1L',
    evidenceType: 'Clinical trial', // Prospective, single-arm trial
    drugs: ['Selinexor', 'XPO1 inhibitor', 'Rituximab', 'Monoclonal Antibody', 'Etoposide', 'Doxorubicin', 'Vinblastine', 'Prednisone', 'Cyclophosphamide', 'Chemotherapy', 'CIT', 'R-EPOCH', 'cART'],
    isFavorite: false
},
{
    id: 'rchop-mtx-cns-prophylaxis-dlbcl-lang',
    title: 'PF955 - Intravenous middle-dose methotrexate incorporated into R-CHOP prevented central nervous system relapse in high-risk diffuse large B-cell lymphoma patients: A single-center retrospective study',
    fileName: 'Abstracts/RCHOP-MTX-CNS-PROPHYLAXIS-DLBCL-LANG.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '1L', // R-CHOP is 1L, MTX is prophylactic addition
    evidenceType: 'Real-world evidence', // Retrospective study
    drugs: ['Methotrexate', 'MTX', 'Rituximab', 'Monoclonal Antibody', 'Cyclophosphamide', 'Doxorubicin', 'Vincristine', 'Prednisone', 'Chemotherapy', 'CIT', 'R-CHOP'],
    isFavorite: false
},
{
    id: 'pet-adapted-low-risk-dlbcl-shi',
    title: 'PF916 - Positron emission tomography-adapted therapy in low-risk diffuse large B-cell lymphoma: 4-year results of a randomized, phase III, non-inferiority trial',
    fileName: 'Abstracts/PET-ADAPTED-LOW-RISK-DLBCL-SHI.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '1L',
    evidenceType: 'Clinical trial', // Randomized, phase III, non-inferiority trial
    drugs: ['Rituximab', 'Monoclonal Antibody', 'Cyclophosphamide', 'Doxorubicin', 'Vincristine', 'Prednisone', 'Chemotherapy', 'CIT', 'R-CHOP'],
    isFavorite: false
},
{
    id: 'cmopr-1l-nhl-you',
    title: 'PB3264 - The CMOP±R regimen shows high efficacy as a first-line treatment for Non-Hodgkin\'s Lymphoma: A phase II clinical trial with matching-adjusted indirect treatment comparison (MAIC) analysis',
    fileName: 'Abstracts/CMOPR-1L-NHL-YOU.html',
    cancerTypes: ['DLBCL', 'PTCL', 'B-NHL', 'T-NHL', 'NHL'], // Includes broader NHL and specific subtypes mentioned
    lineOfTherapy: '1L',
    evidenceType: 'Clinical trial', // Phase II clinical trial
    drugs: ['Cyclophosphamide', 'Mitoxantrone', 'Liposomal Mitoxantrone', 'Vincristine', 'Prednisone', 'Rituximab', 'Monoclonal Antibody', 'Chemotherapy', 'CIT', 'CMOP', 'R-CMOP'],
    isFavorite: false
},
{
    id: 'pola-1l-advanced-dlbcl-he',
    title: 'PB3280 - First-line treatment with Polatuzumab Vedotin improves efficacy and survival in patients with newly diagnosed advanced diffuse large B-cell lymphoma: A multicenter retrospective analysis',
    fileName: 'Abstracts/POLA-1L-ADVANCED-DLBCL-HE.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '1L',
    evidenceType: 'Real-world evidence', // Multicenter retrospective analysis
    drugs: ['Polatuzumab Vedotin', 'ADC', 'Rituximab', 'Monoclonal Antibody', 'Cyclophosphamide', 'Doxorubicin', 'Vincristine', 'Prednisone', 'Chemotherapy', 'CIT', 'R-CHOP', 'Pola-R-CHP'],
    isFavorite: false
},
{
    id: 'pola-rchop-tp53-dlbcl-liu',
    title: 'PS1947 - Effectiveness and gene profile of front-line Pola-based regimen for Diffuse Large B-Cell Lymphoma (DLBCL): A real-world, single-center study including data on TP53 mutated patients',
    fileName: 'Abstracts/POLA-RCHOP-TP53-DLBCL-LIU.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '1L',
    evidenceType: 'Real-world evidence', // Retrospective study
    drugs: ['Polatuzumab Vedotin', 'ADC', 'Rituximab', 'Monoclonal Antibody', 'Cyclophosphamide', 'Doxorubicin', 'Vincristine', 'Prednisone', 'Chemotherapy', 'CIT', 'Pola-R-CHP', 'Methotrexate', 'MTX', 'Zanubrutinib', 'BTK inhibitors', 'Bendamustine'], // Includes components of various Pola-based regimens mentioned
    isFavorite: false
},
{
    id: 'pola-rchp-1l-dlbcl-thiruvengadam',
    title: 'PS1914 - Multicenter real-world outcomes of frontline Pola-R-CHP in treatment naïve DLBCL',
    fileName: 'Abstracts/POLA-RCHP-1L-DLBCL-THIRUVENGADAM.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '1L',
    evidenceType: 'Real-world evidence', // Multicenter retrospective study
    drugs: ['Polatuzumab Vedotin', 'ADC', 'Rituximab', 'Monoclonal Antibody', 'Cyclophosphamide', 'Doxorubicin', 'Prednisone', 'Chemotherapy', 'CIT', 'Pola-R-CHP'], // Vincristine is omitted in R-CHP
    isFavorite: false
},
{
    id: 'pola-rchp-1l-dlbcl-bobes',
    title: 'PB3252 - Polatuzumab-R-CHP in previously untreated diffuse large B-cell lymphoma. A retrospective study.',
    fileName: 'Abstracts/POLA-RCHP-1L-DLBCL-BOBES.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '1L',
    evidenceType: 'Real-world evidence', // Retrospective study
    drugs: ['Polatuzumab Vedotin', 'ADC', 'Rituximab', 'Monoclonal Antibody', 'Cyclophosphamide', 'Doxorubicin', 'Prednisone', 'Chemotherapy', 'CIT', 'Pola-RCHP'], // Vincristine is omitted in R-CHP
    isFavorite: false
},
{
    id: 'pola-rchp-1l-dlbcl-kuwait-hamed',
    title: 'PB3294 - Pola-R-CHP in 1st line treatment DLBCL. Kuwait Cancer Center experience',
    fileName: 'Abstracts/POLA-RCHP-1L-DLBCL-KUWAIT-HAMED.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '1L',
    evidenceType: 'Real-world evidence', // Retrospective data
    drugs: ['Polatuzumab Vedotin', 'ADC', 'Rituximab', 'Monoclonal Antibody', 'Cyclophosphamide', 'Doxorubicin', 'Prednisone', 'Chemotherapy', 'CIT', 'Pola-R-CHP'],
    isFavorite: false
},
{
    id: 'dlbcl-bulgaria-davidkova',
    title: 'PB3326 - Diffuse Large B-Cell Lymphoma - Single center experience in Bulgaria',
    fileName: 'Abstracts/DLBCL-BULGARIA-DAVIDKOVA.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '1L',
    evidenceType: 'Real-world evidence', // Single-center experience
    drugs: ['Rituximab', 'Monoclonal Antibody', 'Cyclophosphamide', 'Doxorubicin', 'Vincristine', 'Prednisone', 'Etoposide', 'Polatuzumab Vedotin', 'ADC', 'Chemotherapy', 'CIT', 'R-CHOP', 'R-DA-EPOCH', 'Pola-R-CHP'],
    isFavorite: false
},
{
    id: 'axicel-crs-icans-lymphoma-dodero',
    title: 'PF957 - Cytokine release syndrome (CRS) and immune effector cell-associated neurotoxicity syndrome (ICANS) in lymphoma patients receiving Axicabtagene ciloleucel: Analysis by year of treatment and indications',
    fileName: 'Abstracts/AXICEL-CRS-ICANS-LYMPHOMA-DODERO.html',
    cancerTypes: ['DLBCL', 'HGBL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '2L+',
    evidenceType: 'Clinical trial',
    drugs: ['Axicabtagene ciloleucel', 'CAR-T cell therapy', 'Tocilizumab', 'Monoclonal Antibody', 'Steroids', 'Anakinra'],
    isFavorite: false
},
{
    id: 'auc-fluda-product-crs-icans-hoerster',
    title: 'PS2144 - AUC fludarabine and product choice are main predictors of CRS/ICANS after CAR T cell therapy: Generation of an improved model',
    fileName: 'Abstracts/AUC-FLUD-PRODUCT-CRS-ICANS-HOERSTER.html',
    cancerTypes: ['B-NHL', 'LBCL'],
    lineOfTherapy: '2L+',
    evidenceType: 'Real-world evidence',
    drugs: ['Fludarabine', 'Tisagenlecleucel', 'Axicabtagene ciloleucel', 'Lisocabtagene maraleucel', 'Brexucabtagene autoleucel', 'CAR-T cell therapy'],
    isFavorite: false
},
{
    id: 'icaht-scoring-comparison-zhang',
    title: 'PB3488 - Can one scoring system fit all? A comparative evaluation of CAR-HEMATOTOX, ALL-HT, and EIPM for predicting immune effector cell-associated hematotoxicity (ICAHT) after CAR-T in hematological malignancies',
    fileName: 'Abstracts/ICAHT-SCORING-COMPARISON-ZHANG.html',
    cancerTypes: ['B-NHL'], // LBL is a type of NHL; B-ALL involves B-cells. This is the closest mapping to the approved list. AML and MM are not directly mappable to the lymphoma-specific list.
    lineOfTherapy: '2L+', // CAR-T therapy is generally for relapsed/refractory patients.
    evidenceType: 'Clinical trial', // Based on "prospective analysis" of enrolled patients.
    drugs: ['CAR-T cell therapy', 'Axicabtagene ciloleucel'], // KTE-19 is Axicabtagene ciloleucel. Other CAR-Ts are described by target/type.
    isFavorite: false
},
{
    id: 'persisting-thrombocytopenia-lbcl-behringer',
    title: 'PS1948 - Persisting thrombocytopenia after CD19-directed CAR-T cell therapy is a predictor of worse survival in relapsed / refractory LBCL patients',
    fileName: 'Abstracts/PERSISTING-THROMBOCYTOPENIA-LBCL-BEHRINGER.html',
    cancerTypes: ['LBCL', 'DLBCL', 'B-NHL'],
    lineOfTherapy: '2L+',
    evidenceType: 'Real-world evidence',
    drugs: ['Axicabtagene ciloleucel', 'Tisagenlecleucel', 'Lisocabtagene maraleucel', 'CAR-T cell therapy'],
    isFavorite: false
},
{
    id: 'mn-post-cart-prior-therapies-hammond',
    title: 'PF628 - Myeloid neoplasms following CAR T-cell therapy: The role of prior therapies and clonal evolution',
    fileName: 'Abstracts/MN-POST-CART-PRIOR-THERAPIES-HAMMOND.html',
    cancerTypes: ['B-NHL'], // Primary malignancies treated with CAR-T were NHL (79%) or MM (21%). MN are secondary. B-NHL is on the approved list.
    lineOfTherapy: '2L+', // Median of 5 prior LoT before CAR-T.
    evidenceType: 'Real-world evidence', // Retrospective review of cases.
    drugs: ['CAR-T cell therapy', 'Fludarabine', 'Cyclophosphamide', 'Chemotherapy', 'Lenalidomide', 'Alkylating agents', 'Hypomethylating agents'], // Includes CAR-T, lymphodepletion, key prior therapies, and MN treatments.
    isFavorite: false
},
{
    id: 'epcor-rice-rrdlbcl-cordoba',
    title: 'S245 - First disclosure of Epcoritamab + R-ICE in patients with relapsed/refractory diffuse large B-cell lymphoma (R/R DLBCL) eligible for autologous stem cell transplantation (ASCT): EPCORE NHL-2',
    fileName: 'Abstracts/EPCOR-RICE-RRDLBCL-CORDOBA.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '2L',
    evidenceType: 'Clinical trial',
    drugs: ['Epcoritamab', 'Bispecific antibodies', 'Rituximab', 'Monoclonal Antibody', 'Ifosfamide', 'Carboplatin', 'Etoposide', 'Chemotherapy', 'CIT', 'R-ICE'],
    isFavorite: false
},
{
    id: 'epcor-mono-3y-rrlbcl-cheah',
    title: 'PF920 - Sustained remission in relapsed or refractory diffuse large B-cell lymphoma with Epcoritamab monotherapy: EPCORE NHL-1 3-Y results and novel subgroup analyses in patients with complete response at 2 Y',
    fileName: 'Abstracts/EPCOR-MONO-3Y-RRLBCL-CHEAH.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '3L+',
    evidenceType: 'Clinical trial',
    drugs: ['Epcoritamab', 'Bispecific antibodies'],
    isFavorite: false
},
{
    id: 'tirabrutinib-pcnsl-prospect-nayak',
    title: 'PS1919 - Tirabrutinib for the treatment of relapsed or refractory primary central nervous system lymphoma: Efficacy and safety from the Phase II PROSPECT study',
    fileName: 'Abstracts/TIRABRUTINIB-PCNSL-PROSPECT-NAYAK-PS1919.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '2L+',
    evidenceType: 'Clinical trial',
    drugs: ['Tirabrutinib', 'BTK inhibitor'],
    isFavorite: false
},
{
    id: 'ctdna-cd20-baff-odronextamab-luminari',
    title: 'PF999 - Longitudinal targeted ctDNA analysis to assess CD20 and BAFF mutations in patients (pts) with relapsed/refractory (R/R) FL or DLBCL progressing on Odronextamab treatment in the ELM-2 study',
    fileName: 'Abstracts/CTDNA-CD20-BAFF-ODRONEXTAMAB-LUMINARI-PF999.html',
    cancerTypes: ['FL', 'DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '2L+',
    evidenceType: 'Clinical trial',
    drugs: ['Odronextamab', 'Bispecific antibodies', 'Anti-CD20 antibody'],
    isFavorite: false
},
{
    id: 'liso-cel-post-cart-monitoring-kamdar-lunning',
    title: 'PS1916 - Optimizing post-chimeric antigen receptor T cell monitoring: Evidence across lisocabtagene maraleucel pivotal clinical trials and real-world experience',
    fileName: 'Abstracts/LISO-CEL-POST-CART-MONITORING-LUNNING-PS1916.html',
    cancerTypes: ['LBCL', 'FL', 'B-NHL'], // Liso-cel indications include LBCL, FL, CLL/SLL, MCL. These are mapped to the approved list.
    lineOfTherapy: '2L+', // R/R indications for various B-cell NHLs.
    evidenceType: 'Clinical trial', // Data from pivotal clinical trials and CIBMTR registry analysis.
    drugs: ['Lisocabtagene maraleucel', 'CAR-T cell therapy'],
    isFavorite: false
},
{
    id: 'starglo-glofit-gemox-rrdlbcl-gregory',
    title: 'PS1909 - Glofitamab plus gemcitabine and oxaliplatin (Glofit-GemOx) in patients with relapsed/refractory (R/R) diffuse large B-cell lymphoma (DLBCL): 2-year follow-up of STARGLO',
    fileName: 'Abstracts/STARGLO-GLOFIT-GEMOX-RRDLBCL-GREGORY-PS1909.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '2L+', // After >=1 prior LOT
    evidenceType: 'Clinical trial', // Phase III randomized trial
    drugs: ['Glofitamab', 'Bispecific antibodies', 'Gemcitabine', 'Oxaliplatin', 'Chemotherapy', 'Rituximab', 'Monoclonal Antibody', 'Obinutuzumab', 'CIT', 'Glofit-GemOx', 'R-GemOx'],
    isFavorite: false
},
{
    id: 'epco-gdp-rrlbcl-modi',
    title: 'PS1979 - Epcoritamab with gemcitabine, dexamethasone, and cisplatin (Epco-GDP) in relapsed refractory large B-cell lymphoma- An interim analysis of Phase II multicenter investigated-initiated trial',
    fileName: 'Abstracts/EPCO-GDP-RRLBCL-MODI-PS1979.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '2L+',
    evidenceType: 'Clinical trial',
    drugs: ['Epcoritamab', 'Bispecific antibodies', 'Gemcitabine', 'Dexamethasone', 'Cisplatin', 'Chemotherapy', 'Anti-CD20 antibody', 'CAR-T cell therapy', 'Autologous Stem Cell Transplant'],
    isFavorite: false
},
{
    id: 'epcor-rdhaxc-rice-maic-darrah',
    title: 'PS1968 - Match-adjusted comparative analysis of Epcoritamab + R-DHAX/C or R-ICE vs R-DHAX/C or R-ICE in 2L+ transplant-eligible patients with diffuse large B-cell lymphoma',
    fileName: 'Abstracts/EPCOR-RDHAXC-RICE-MAIC-DARRAH-PS1968.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '2L+',
    evidenceType: 'Clinical trial',
    drugs: ['Epcoritamab', 'Bispecific antibodies', 'Rituximab', 'Monoclonal Antibody', 'Dexamethasone', 'Cytarabine', 'Oxaliplatin', 'Carboplatin', 'Ifosfamide', 'Etoposide', 'Chemotherapy', 'CIT', 'R-DHAX/C', 'R-ICE'],
    isFavorite: false
},
{
    id: 'glofit-tisli-rrdlbcl-zhou',
    title: 'PB3225 - Efficacy and safety of Glofitamab combined with Tislelizumab in relapsed/refractory diffuse large B-cell lymphoma: A pilot study in China',
    fileName: 'Abstracts/GLOFIT-TISLI-RRDLBCL-ZHOU-PB3225.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '3L+',
    evidenceType: 'Clinical trial',
    drugs: ['Glofitamab', 'Bispecific antibodies', 'Tislelizumab', 'PD-1 inhibitor', 'Obinutuzumab', 'Monoclonal Antibody'],
    isFavorite: false
},
{
    id: 'pr-ice-rrdlbcl-pride-zhao',
    title: 'PS1956 - Interim analysis of Pomalidomide plus Rituximab, Ifosfamide, Carboplatin, and Etoposide (PR-ICE) in relapsed/refractory diffuse large B-cell lymphoma: A Phase I/II study (PRIDE Study)',
    fileName: 'Abstracts/PR-ICE-RRDLBCL-PRIDE-ZHAO-PS1956.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'], // PCNSL mentioned as context for Pomalidomide, but study is in DLBCL.
    lineOfTherapy: '2L', // For first-relapse or primary refractory DLBCL.
    evidenceType: 'Clinical trial', // Phase I/II study
    drugs: ['Pomalidomide', 'Immunomodulatory drugs', 'Rituximab', 'Monoclonal Antibody', 'Ifosfamide', 'Carboplatin', 'Etoposide', 'Chemotherapy', 'CIT', 'R-ICE'],
    isFavorite: false
},
{
    id: 'r-tp-pcnsl-zhao',
    title: 'PB3233 - High-dose Thiotepa combined with Rituximab and Pomalidomide is a perfect alternative chemotherapy regimen for relapsed/refractory primary central nervous system diffuse large B cell lymphoma',
    fileName: 'Abstracts/R-TP-PCNS-DLBCL-ZHAO-PB3233.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'], // PCNS-DLBCL is a DLBCL variant
    lineOfTherapy: '2L+', // For relapsed/refractory patients after first-line chemotherapy
    evidenceType: 'Clinical trial', // Implied by "enrolled patients" and evaluation of a regimen
    drugs: ['Thiotepa', 'Rituximab', 'Monoclonal Antibody', 'Pomalidomide', 'Immunomodulatory drugs', 'Chemotherapy', 'CIT', 'High-dose Methotrexate'], // MTX mentioned as first-line
    isFavorite: false
},
{
    id: 'genomic-testing-bsabs-lbcl-fl-tavarozzi',
    title: 'PS2007 - Genomic testing in patients with large cell and follicular lymphoma treated with T-cell engagers bi-specific antibodies and correlation with treatment response',
    fileName: 'Abstracts/GENOMIC-TESTING-BSABS-LBCL-FL-TAVAROZZI-PS2007.html',
    cancerTypes: ['DLBCL', 'FL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '3L+', // Median of 4 prior PTL, all R/R after immunotherapy
    evidenceType: 'Real-world evidence', // Retrospective, single-center study
    drugs: ['Bispecific antibodies', 'Epcoritamab', 'Glofitamab', 'Mosunetuzumab', 'CAR-T cell therapy'], // Commercial bsAbs, CAR-T mentioned as prior
    isFavorite: false
},
{
    id: 'cd20neg-rrbnhl-vinti',
    title: 'PB3356 - CD20-negative relapsed/refractory mature B-cell non-Hodgkin lymphomas (B-NHLs) and mature B-cell leukemia in children, adolescents, and young adults: A retrospective review',
    fileName: 'Abstracts/CD20NEG-RRBNHL-VINTI-PB3356.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '2L+',
    evidenceType: 'Real-world evidence',
    drugs: ['Rituximab', 'Monoclonal Antibody', 'Chemotherapy', 'CIT', 'Bispecific antibodies'],
    isFavorite: false
},
{
    id: 'cd30-dlbcl-tme-naganuma-pf1018',
    title: 'PF1018 - Diffuse large B-cell lymphoma (DLBCL): Prognostic impact of CD30 expression and its association with the tumor microenvironment',
    fileName: 'Abstracts/CD30-DLBCL-TME-NAGANUMA-PF1018.html',
    cancerTypes: ['DLBCL', 'HGBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '1L', // Context of DLBCL prognosis, R-CHOP is standard 1L
    evidenceType: 'Real-world evidence', // Analysis of existing datasets and institutional cases
    drugs: [
        'Brentuximab Vedotin', 
        'ADC', 
        'Rituximab', // Component of R-CHOP
        'Monoclonal Antibody', 
        'Chemotherapy', // R-CHOP components
        'CIT', // R-CHOP is CIT
        'R-CHOP', // Mentioned as standard treatment
        'Bispecific antibodies', // Mentioned for future combination
        'Lenalidomide', // Mentioned for future combination
        'Immune checkpoint inhibitors' // Mentioned for future combination
    ],
    isFavorite: false
},
{
    id: 'spectral-flow-cart-retr-zhang-pf1318',
    title: 'PF1318 - Spectral flow cytometry-guided selection of alternative tumor-associated membrane expression antigens for CAR-T cell re-treatment in relapsed/refractory B-cell malignancies',
    fileName: 'Abstracts/SPECTRAL-FLOW-CART-RETR-ZHANG-PF1318.html',
    cancerTypes: ['DLBCL', 'FL', 'LBCL', 'B-NHL'], // Based on diagnoses DLBCL, FL, MCL (MCL is B-NHL). MM is a B-cell malignancy but not on the lymphoma-specific approved list.
    lineOfTherapy: '3L+', // Re-treatment after prior CAR-T therapy
    evidenceType: 'Real-world evidence', // Retrospective study
    drugs: ['CAR-T cell therapy'], // General class for CAR-T cells targeting various alternative antigens
    isFavorite: false
},
{
    id: 'cd47-inflammation-dlbcl-siregar-pb3312',
    title: 'PB3312 - Association of CD47 expression and systemic inflammation in diffuse large B-cell lymphoma patients',
    fileName: 'Abstracts/CD47-INFLAMMATION-DLBCL-SIREGAR-PB3312.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: 'Not Specified', // Study on DLBCL patients, treatment response assessed but line not specified for the cohort's analysis focus.
    evidenceType: 'Real-world evidence', // Retrospective cohort study
    drugs: [], // Study is about CD47 expression and inflammation, not a specific drug intervention for the cohort.
    isFavorite: false
},
{
    id: 'cd19-tafa-inmind-alvarez-arias-pf1006',
    title: 'PF1006 - CD19 expression is retained in patients with relapsed/refractory follicular or marginal zone lymphoma after receiving tafasitamab, lenalidomide and rituximab in the inMIND study',
    fileName: 'Abstracts/CD19-TAFA-INMIND-ALVAREZ-ARIAS-PF1006.html',
    cancerTypes: ['FL', 'MZL', 'B-NHL'], // Follicular Lymphoma, Marginal Zone Lymphoma are B-NHLs
    lineOfTherapy: '2L+', // Relapsed/Refractory setting
    evidenceType: 'Clinical trial', // Sub-analysis of a Phase 3 trial
    drugs: [
        'Tafasitamab', 
        'Lenalidomide', 
        'Rituximab', 
        'Monoclonal Antibody', // Tafasitamab, Rituximab
        'Immunomodulatory drugs', // Lenalidomide
        'CIT' // Combination of mAb and immunomodulator/chemo-like agent
    ],
    isFavorite: false
},
{
    id: 'os-improvement-rrdlbcl-2021-trneny-pf939',
    title: 'PF939 - Overall survival improvement of the R/R DLBCL patient population treated in the year 2021 and beyond',
    fileName: 'Abstracts/OS-IMPROVEMENT-RRDLBCL-2021-TRNENY-PF939.html',
    cancerTypes: ['DLBCL', 'HGBCL', 'LBCL', 'B-NHL'], // DLBCL is primary, HGBCL from "High-grade non-Hodgkins-lymphoma" keyword, LBCL & B-NHL are parent categories.
    lineOfTherapy: '3L+', // L3 and beyond
    evidenceType: 'Real-world evidence', // Analysis of prospective registry data
    drugs: [
        'CAR-T cell therapy', 
        'Bispecific antibodies', 
        'ADC', // General class of innovative therapies
        'Polatuzumab Vedotin', // Component of Pola-BR
        'Bendamustine', // Component of Pola-BR
        'Rituximab', // Component of Pola-BR & R-CHOP
        'Monoclonal Antibody', // Rituximab, other potential innovative mAbs
        'Chemotherapy', // Backbone for R-CHOP, components of Pola-BR
        'CIT' // R-CHOP, Pola-BR
    ],
    isFavorite: false
},
{
    id: 'ctdna-mrd-phasedseq-dlbcl-chamuleau',
    title: 'S240 - Prospective validation of end of treatment ctDNA-MRD by PhasED-Seq in DLBCL patients from a national HOVON trial',
    fileName: 'Abstracts/CTDNA-MRD-PHASEDSEQ-DLBCL-CHAMULEAU-S240.html',
    cancerTypes: ['DLBCL', 'HGBL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '1L',
    evidenceType: 'Real-world evidence', // Based on "real-world observational cohort"
    drugs: ['Rituximab', 'Monoclonal Antibody', 'Chemotherapy', 'CIT'],
    isFavorite: false
},
{
    id: 'epcor-rminichop-maic-1ldlbcl-darrah-ps1942',
    title: 'PS1942 - Epcor + R-miniCHOP vs R-miniCHOP in 1L DLBCL (MAIC)',
    fileName: 'Abstracts/EPCOR-RMINICHOP-MAIC-1LDLBCL-DARRAH-PS1942.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '1L',
    evidenceType: 'Clinical trial', // Analysis based on Clinical Trial (EPCORE NHL-2) and RWD (COTA)
    drugs: ['Epcoritamab', 'Bispecific antibodies', 'Rituximab', 'Monoclonal Antibody', 'Cyclophosphamide', 'Doxorubicin', 'Vincristine', 'Prednisone', 'Chemotherapy', 'CIT'], // R-miniCHOP components listed
    isFavorite: false
},
{
    id: 'pegfilgrastim-vs-filgrastim-polarchp-dlbcl-kabasawa-ps1965',
    title: 'PS1965 - Pegfilgrastim vs Filgrastim for FN Prevention in 1L DLBCL (Pola-R-CHP)',
    fileName: 'Abstracts/PEGFILGRASTIM-VS-FILGRASTIM-POLARCHP-DLBCL-KABASAWA-PS1965.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '1L',
    evidenceType: 'Real-world evidence',
    drugs: ['Pegfilgrastim', 'Filgrastim', 'G-CSF', 'Polatuzumab Vedotin', 'ADC', 'Rituximab', 'Monoclonal Antibody', 'Chemotherapy', 'CIT', 'Pola-R-CHP'],
    isFavorite: false
},
{
    id: 'pola-r-chp-cd5-dlbcl-xu-pf980',
    title: 'PF980 - Efficacy of Pola-R-CHP in 1L CD5-Positive DLBCL',
    fileName: 'Abstracts/POLA-R-CHP-CD5-DLBCL-XU-PF980.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '1L',
    evidenceType: 'Real-world evidence',
    drugs: ['Polatuzumab Vedotin', 'ADC', 'Rituximab', 'Monoclonal Antibody', 'Cyclophosphamide', 'Doxorubicin', 'Vincristine', 'Prednisone', 'Chemotherapy', 'CIT', 'Pola-R-CHP', 'R-CHOP', 'CAR-T cell therapy', 'Bispecific antibodies'],
    isFavorite: false
},
{
    id: '1l-asct-vs-chemo-hr-dlbcl-psm-jing-ps2077',
    title: 'PS2077 - Using PSM comparing first-line ASCT vs chemotherapy alone in newly diagnosed DLBCL with IPI ≥3',
    fileName: 'Abstracts/1L-ASCT-VS-CHEMO-HR-DLBCL-PSM-JING-PS2077.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '1L',
    evidenceType: 'Real-world evidence',
    drugs: ['Autologous Stem Cell Transplant', 'Chemotherapy', 'Radiotherapy'],
    isFavorite: false
},
{
    id: 'daddona-rchop-mt-dlbcl-pb3293',
    title: 'PB3293 - Rituximab Maintenance PET-Oriented Post R-CHOP in Aggressive B-NHL',
    fileName: 'Abstracts/DADDONA-RCHOP-MT-DLBCL-PB3293.html',
    cancerTypes: ['DLBCL', 'B-NHL'], // "Aggressive B Non Hodgkin Lymphoma" mapped to DLBCL (most common aggressive) and B-NHL.
    lineOfTherapy: '1L', // R-CHOP induction followed by maintenance.
    evidenceType: 'Real-world evidence', // Retrospective study
    drugs: ['Rituximab', 'Monoclonal Antibody', 'Chemotherapy', 'CIT', 'R-CHOP'], // R-CHOP components covered by Chemo/CIT, Rituximab listed for maintenance.
    isFavorite: false
},
{
    id: 'rapid-ramp-up-bsab-wang-ps1949',
    title: 'PS1949 - Rapid ramp-up of bi-specific antibodies in R/R LBCL',
    fileName: 'Abstracts/PS1949-RapidRampUp-BsAb-Wang.html',
    cancerTypes: ['DLBCL', 'HGBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '3L+',
    evidenceType: 'Real-world evidence',
    drugs: ['Epcoritamab', 'Glofitamab', 'Bispecific antibodies', 'Obinutuzumab', 'Monoclonal Antibody'],
    isFavorite: false
},
{
    id: 'epcart-ctdna-epcor-dowling-ps1912',
    title: 'PS1912 - ctDNA-directed Epcoritamab in post-CAR-T LBCL (EpLCART)',
    fileName: 'Abstracts/PS1912-EpLCART-ctDNA-Epcor-Dowling.html',
    cancerTypes: ['LBCL', 'DLBCL', 'B-NHL'],
    lineOfTherapy: '3L+',
    evidenceType: 'Clinical trial',
    drugs: ['Epcoritamab', 'Bispecific antibodies', 'Lenalidomide', 'Immunomodulatory drugs', 'Rituximab', 'Monoclonal Antibody', 'CAR-T cell therapy'],
    isFavorite: false
},
{
    id: 'ctdna-glofitamab-rrlbcl-signori-ps1991',
    title: 'PS1991 - ctDNA for response prediction/genetics in R/R LBCL with Glofitamab',
    fileName: 'Abstracts/PS1991-ctDNA-Glofitamab-Signori.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '2L+',
    evidenceType: 'Clinical trial',
    drugs: ['Glofitamab', 'Bispecific antibodies'],
    isFavorite: false
},
{
    id: 'glofitamab-tp53-rrdlbcl-zhao-pb3271',
    title: 'PB3271 - Glofitamab chemo-free regimens in TP53-mutated R/R DLBCL',
    fileName: 'Abstracts/PB3271-Glofitamab-TP53-RRDLBCL-Zhao.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '3L+',
    evidenceType: 'Real-world evidence',
    drugs: ['Glofitamab', 'Bispecific antibodies', 'Acalabrutinib', 'Zanubrutinib', 'Obutinib', 'BTK inhibitors', 'Sintilimab', 'PD-1 inhibitor', 'Lenalidomide', 'Immunomodulatory drugs', 'Polatuzumab Vedotin', 'ADC'],
    isFavorite: false
},
{
    id: 'glofitamab-salvage-rrdlbcl-huang-ps1963',
    title: 'PS1963 - Glofitamab + salvage therapy in R/R DLBCL (Real-World)',
    fileName: 'Abstracts/PS1963-Glofitamab-Salvage-RRDLBCL-Huang.html',
    cancerTypes: ['DLBCL', 'HGBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '2L+',
    evidenceType: 'Real-world evidence',
    drugs: ['Glofitamab', 'Bispecific antibodies', 'Obinutuzumab', 'Monoclonal Antibody', 'Rituximab', 'Chemotherapy', 'CIT', 'DHAP', 'GemOx', 'EPOCH'],
    isFavorite: false
},
{
    id: 'dlbcl-bulgaria-davidkova',
    title: 'PB3326 - Diffuse Large B-Cell Lymphoma - Single center experience in Bulgaria',
    fileName: 'Abstracts/DLBCL-BULGARIA-DAVIDKOVA.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '1L',
    evidenceType: 'Real-world evidence',
    drugs: ['Rituximab', 'Monoclonal Antibody', 'Polatuzumab Vedotin', 'ADC', 'Etoposide', 'Chemotherapy', 'CIT', 'R-CHOP', 'R-DA-EPOCH', 'Pola-R-CHP'],
    isFavorite: false
},
{
    id: 'pola-zr-chp-en-dlbcl-li',
    title: 'PB3267 - Pola-ZR-CHP in Extranodal DLBCL',
    fileName: 'Abstracts/POLA-ZR-CHP-EN-DLBCL-LI-PB3267.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '1L/2L',
    evidenceType: 'Real-world evidence',
    drugs: ['Polatuzumab Vedotin', 'ADC', 'Zanubrutinib', 'BTK inhibitor', 'Rituximab', 'Monoclonal Antibody', 'Chemotherapy', 'CIT', 'Pola-ZR-CHP'],
    isFavorite: false
},
{
    id: 'prognostic-indices-rrdlbcl-almeida-pais',
    title: 'PB3310 - Prognostic indices in R/R DLBCL: Identifying the best index for first relapse assessment',
    fileName: 'Abstracts/PB3310-PROGNOSTIC-INDICES-RRDLBCL-ALMEIDA-PAIS.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '2L+',
    evidenceType: 'Real-world evidence',
    drugs: ['Rituximab', 'Chemotherapy', 'CIT', 'CAR-T cell therapy'],
    isFavorite: false
},
{
    id: 'lymphovista-mrd-mattlener-pf1319',
    title: 'PF1319 - LYMPHOVISTA - A validated platform for genotyping and MRD assessment in different types of lymphoma',
    fileName: 'Abstracts/LYMPHOVISTA-MRD-MATTLENER-PF1319.html',
    cancerTypes: ['FL', 'MZL', 'LBCL', 'B-NHL'], // Based on "follicular lymphoma (FL)", "marginal zone lymphoma (MZL)", "large B-cell Lymphoma (LBCL)". HL is mentioned but not on the approved list, these are the closest B-cell types.
    lineOfTherapy: 'Not Specified', // Not specified for the overall platform, clinical validation in HD21 (likely 1L context for MRD assessment)
    evidenceType: 'Clinical trial', // Validation study within HD21 trial context
    drugs: [], // The abstract focuses on a diagnostic platform, not a specific drug intervention for the primary analysis.
    isFavorite: false
},
{
    id: 'lymphopath-ai-dlbcl-mosqueira-pf1311',
    title: 'PF1311 - LymphoPath: AI-driven digital pathology platform for risk stratification in DLBCL',
    fileName: 'Abstracts/LYMPHOPATH-AI-DLBCL-MOSQUEIRA-PF1311.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '1L',
    evidenceType: 'Real-world evidence',
    drugs: ['Rituximab', 'Monoclonal Antibody', 'Chemotherapy', 'CIT', 'R-CHOP', 'Artificial Intelligence'],
    isFavorite: false
},
{
    id: 'eha2025-s240-chamuleau-ctdna-dlbcl',
    title: 'S240 - ctDNA-MRD by PhasED-Seq in 1L DLBCL (HOVON-902)',
    fileName: 'Abstracts/EHA2025_S240_Chamuleau_ctDNA_DLBCL.html',
    cancerTypes: ['DLBCL', 'HGBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '1L',
    evidenceType: 'Real-world evidence',
    drugs: ['Rituximab', 'Monoclonal Antibody', 'Chemotherapy', 'CIT'],
    isFavorite: false
},
{
    id: 'loncastuximab-mzl-lossos-eha2025',
    title: 'PXXX - Updated analysis of a phase 2 multicenter study of loncastuximab in relapsed/refractory marginal zone lymphoma demonstrates high rate of complete responses',
    fileName: 'Abstracts/Loncastuximab-MZL-Lossos-EHA2025.html',
    cancerTypes: ['MZL', 'B-NHL'],
    lineOfTherapy: '2L+',
    evidenceType: 'Clinical trial',
    drugs: ['Loncastuximab tesirine', 'ADC'],
    isFavorite: false
},

{
    id: 'pola-glofit-bridge-talicel-eipe',
    title: 'PF1167 - Safety and efficacy of Polatuzumab vedotin plus Glofitamab as bridging therapy prior to Talicabtagene autoleucel for relapsed/ refractory B-cell lymphoma',
    fileName: 'Abstracts/POLA-GLOFIT-BRIDGE-TALICEL-EIPE-PF1167.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '2L+',
    evidenceType: 'Real-world evidence',
    drugs: ['Polatuzumab Vedotin', 'ADC', 'Glofitamab', 'Bispecific antibodies', 'Talicabtagene autoleucel', 'CAR-T cell therapy', 'Obinutuzumab', 'Rituximab', 'Monoclonal Antibody', 'Fludarabine', 'Cyclophosphamide', 'Chemotherapy', 'Tocilizumab'],
    isFavorite: false
},

{
    id: 'polargo-rrdlbcl-matasar',
    title: 'S101 - Polatuzumab Vedotin, Rituximab, Gemcitabine and Oxaliplatin (Pola-R-GemOx) for R/R DLBCL: Results from the Phase III POLARGO Trial',
    fileName: 'Abstracts/POLARGO-RRDLBCL-MATASAR-S101.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '2L+',
    evidenceType: 'Clinical trial',
    drugs: ['Polatuzumab Vedotin', 'ADC', 'Rituximab', 'Monoclonal Antibody', 'Gemcitabine', 'Oxaliplatin', 'Chemotherapy', 'CIT', 'Pola-R-GemOx', 'R-GemOx'],
    isFavorite: false
},

{
    id: 'efficace-pro-cart-gimema',
    title: 'PF1285 - Patient-Reported Outcomes by CAR-T Product in Aggressive B-Cell Lymphomas',
    fileName: 'Abstracts/EFFICACE-PRO-CART-GIMEMA-PF1285.html',
    cancerTypes: ['DLBCL', 'HGBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '2L+',
    evidenceType: 'Real-world evidence',
    drugs: ['CAR-T cell therapy', 'Axicabtagene ciloleucel', 'Tisagenlecleucel', 'Brexucabtagene autoleucel', 'Lisocabtagene maraleucel'],
    isFavorite: false
},

{
    id: 'waveline003-zilovertamab-rrdlbcl-pinto',
    title: 'PS1924 - Zilovertamab vedotin plus standard of care in relapsed/refractory diffuse large B-cell lymphoma: Results from the Phase 2/3 WAVELINE-003 study',
    fileName: 'Abstracts/WAVELINE003-ZILOVERTAMAB-RRDLBCL-PINTO-PS1924.html',
    cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
    lineOfTherapy: '2L+',
    evidenceType: 'Clinical trial',
    drugs: ['Zilovertamab vedotin', 'ADC', 'Rituximab', 'Monoclonal Antibody', 'Gemcitabine', 'Oxaliplatin', 'Chemotherapy', 'CIT', 'R-GemOx'],
    isFavorite: false
},
{
    id: 'de-bernardis-cd19-cart',
    title: 'PF942: Impact of pre-infusion CD19 expression on CAR T-cell expansion and clinical outcomes in R/R B-cell lymphoma',
    fileName: 'Abstracts/DeBernardis_EHA2025_PF942.html',
    cancerTypes: ['LBCL', 'FL', 'B-NHL'],
    lineOfTherapy: '3L+',
    evidenceType: 'Real-world evidence',
    drugs: ['CAR-T cells', 'Axi-cel', 'Tisa-cel', 'Brexu-cel'],
    isFavorite: false
},
 {
        id: 'sakk-38-19',
        title: 'Oral 006 - SAKK 38/19: ctDNA and PET guided therapy in untreated DLBCL',
        fileName: 'Abstracts/SAKK-38-19.html',
        cancerTypes: ['DLBCL', 'LBCL', 'B-NHL'],
        lineOfTherapy: '1L',
        evidenceType: 'Clinical trial',
        drugs: ['Acalabrutinib', 'BTK inhibitor', 'Rituximab', 'Monoclonal Antibody', 'Chemotherapy'],
        isFavorite: false
    }



];
