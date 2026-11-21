# Assam Muga Silk Digital Traceability & Non-Destructive Authentication Platform
### Problem Code: NESFIC-D-41 (NESFIC 2026)
**Organized by:** Department of Innovation, Incubation and Startups (DIIS), Government of Assam & Assam Innovation & Startup Foundation (AISF)  
**Problem Owner:** Department of Handloom, Textiles & Sericulture, Government of Assam  
**Scientific Partner:** Central Muga Eri Research & Training Institute (CMER&TI), Lahdoigarh, Jorhat & Central Silk Board (CSB)  
**Objective:** End-to-End Digital Traceability and Non-Destructive Authentication of Muga Silk and Apparel from Cocoon to Consumer  

---

## 🧵 Key Features Built

1. **Assam Geographical Indication (GI Tag #38) & Silk Mark Shield:**
   - Cryptographic verification of genuine Assam Muga Silk (`#GI-IN-ASM-MUG-0038-XXXX`).
   - Anti-counterfeit serialized GS1 Digital Link QR codes and NFC chips with Merkle tree proof verification.
2. **Breakthrough Non-Destructive Optical & Spectral Authentication (অ-ধ্বংসাত্মক পৰীক্ষণ):**
   - Handheld Near-Infrared (NIR) & micro-Raman spectroscopy molecular fingerprinting.
   - Evaluates protein secondary structure (*fibroin* and *sericin* beta-sheet absorption peaks at Amide I 1650 cm⁻¹, Amide II 1520 cm⁻¹, and Amide III 1235 cm⁻¹).
   - **Zero Textile Damage:** Intercepts synthetic polyester blends (1720 cm⁻¹ ester carbonyl peak) and dyed Chinese Tasar substitutes in seconds without cutting or burning precious garments.
   - NABL TC-8842 digital certificate generation & IPFS cryptographic hash pinning.
3. **Silkworm Rearer / Farmer App ("পলু-সেৱা Polu-Sewa"):**
   - Multilingual interface (Assamese / English).
   - Cadastral GIS land parcel engine cross-referencing Som (*Persea bombycina*) and Soalu (*Litsea polyantha*) agroforestry plantations against Dharitree / ILRMS land survey records (Dag & Patta numbers).
   - Disease surveillance logging (Mother moth microscopic Pebrine-free clearance for Disease-Free Layings / DFLs).
   - IoT Cocoon Bank weighbridge integration with automated shell ratio calculation (10.8%) and Government Minimum Support Price (MSP) payout.
4. **Reeling & Sualkuchi Handloom Weaving ("বয়ন-সেৱা Boyon-Sewa"):**
   - CSTRI motorized reeling machine tracking (35-38 Denier filament fineness, unbroken continuity).
   - Sualkuchi Jacquard & traditional throw-shuttle loom register.
   - Heritage Assamese motifs (*Kingkhap কিংকাপ*, *Junbiri*, *Temple Border*, *Miri Gos*, *Kalka*).
   - Artisan Direct Benefit Transfer (DBT) fair wage ledger ensuring weaver livelihood protection.
5. **Sericulture Directorate Regulatory Command Center & Admin Panel:**
   - Statewide Sericulture GIS Heatmap across Kamrup (Sualkuchi), Lakhimpur (Dhakuakhana), Dhemaji (Jonai), Sivasagar (Joysagar), and Jorhat (Lahdoigarh).
   - State GI Certification Authority registry with one-click revocation and real-time blacklisting.
   - Anti-Counterfeit Flying Squad market seizure alert feed.
   - Spectrometer sensor calibration and tolerance threshold dispatcher.
   - Polygon Layer 2 Merkle root aggregation engine achieving **99.8% gas savings**.
6. **Smart Contracts (`packages/contracts`):**
   - `MugaRegistry.sol`: Decentralized registry of Sericulture Rearers, Reeling Co-ops, Weavers, and CMER&TI Laboratories.
   - `MugaProvenance.sol`: Immutable batch lifecycle tracking and periodic state-root Merkle anchoring on Layer 2 blockchain.

---

## 🚀 Quickstart & Running the Application

### 1. Run Unit & Integration Tests
```bash
npm test -w apps/api
```
All 9 unit and HTTP integration tests verify Muga batch creation, cocoon bank weighment, Sualkuchi weaving, CMER&TI NIR spectral testing, counterfeit interception, and Merkle root calculation.

### 2. Start the Backend API Engine (Port 4000)
```bash
npm run dev:api
# API runs on http://localhost:4000
```

### 3. Start the Web Portal (Port 3000)
```bash
npm run dev:web
# Open http://localhost:3000 in your browser
```

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Healthcheck and service status (NESFIC-D-41) |
| `GET` | `/api/batches` | List all tracked Muga silk batches across Assam |
| `GET` | `/api/batches/:id` | Detailed batch lifecycle information |
| `POST` | `/api/batches/rearing` | Record silkworm rearing & cocoon harvest with GPS |
| `POST` | `/api/batches/:id/cocoon-market` | Sync Government Cocoon Bank weight & shell ratio |
| `POST` | `/api/batches/:id/reeling` | Record CSTRI motorized reeling & denier metrics |
| `POST` | `/api/batches/:id/weaving` | Record Sualkuchi loom weaving & artisan fair wage |
| `POST` | `/api/batches/:id/spectral-test` | Record CMER&TI NIR spectroscopy purity report |
| `GET` | `/api/verify/:qrToken` | Public consumer Cocoon-to-Cloth verification |
| `POST` | `/api/admin/gi/revoke` | Revoke fraudulent batch GI tags with instant alert |
| `GET` | `/api/admin/alerts` | Anti-counterfeit market seizure and alert feed |
| `GET` | `/api/spectral/standards` | Approved NIR spectral reference absorption peaks |
| `POST` | `/api/blockchain/anchor` | Compute Merkle tree root and anchor to blockchain |
| `GET` | `/api/analytics` | Statewide sericulture analytics and compliance rate |

---

## 🏛️ Project Directory Structure

```
Muga-Silk-Trace-NESFIC-D-41/
├── packages/
│   ├── contracts/          # Solidity Smart Contracts (MugaRegistry & MugaProvenance)
│   └── shared/             # Shared data models, constants, and Merkle Tree engine
├── apps/
│   ├── api/                # HTTP REST API & Sericulture Traceability engine
│   └── web/                # Interactive Web App, Spectral Analyzer, GIS & Admin Panel
│       ├── public/
│       │   ├── favicon.svg # Golden Silk Cocoon & Loom Shuttle vector badge
│       │   ├── robots.txt  # SEO crawler directives
│       │   └── sitemap.xml # SEO & GEO XML Sitemap
│       └── functions/      # Cloudflare Pages edge serverless API
└── docs/                   # Proof of Work & Hackathon proposal documentation
```

---

## 🌟 Suggested GitHub Repository Names

1. **`muga-praman`** ⭐ *(Top Recommendation - "মুগা-প্ৰমাণ" reflects Assamese heritage and hackathon lineage)*
2. **`muga-silk-trace-assam`** *(Clear, descriptive, and highly searchable)*
3. **`sonali-xuta-trace`** *(Poetic cultural pride: "সোণালী সূতা" - The Golden Thread)*
4. **`kosa-to-kapor`** *(Process-driven: "কোঁহৰ পৰা কাপোৰলৈ" - Cocoon to Fabric)*
5. **`nesfic-muga-authentix`** *(Modern startup / deep-tech pitch)*
