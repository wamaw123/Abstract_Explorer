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





];
