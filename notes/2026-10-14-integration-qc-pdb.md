---
title: "Integration QC PDB"
date: 2026-10-14
tags: []
---

Build Children Structure
Ex:
Endcap Quadrant:
Environment sensors (TBD - not our responsibility)
2*Cooling Manifold
1*Barrel Cooling Manifold
Ring*8 (or 7 for 1 quadrant)
Bundle*8 (Bundle contains PP0 Type1 - existing?)

ANL responsibility - 
IS_PP1_MANIFOLD - Cooling manifold for PP1
IS Distribution Manifold - has 4 types now but maybe all inlet A side 4 C side 4

IS Barrel Half Assembly
IS Barrel Quadrant Assembly
IS Endcap Quadrant Assembly

IS_BCM defined
IS_PLR not defined

Determining Testing Stages:
1. Electrical Testing
2. Welding
3. Post Welding Physical QC (Leakage, Pressure being tests; can have extra one called Backup Welding used - related to the two welding available design)
4. post Welding Electrical testing (optional)
Some stages are there already; need synchronization with OB and OEC to avoid repeated definitions

Need Eric to add my permission
