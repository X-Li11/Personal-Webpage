---
title: "Config files"
date: 2026-10-09
tags: []
---

felix_config.json
contains all RX TX for all links (RX TX in elink)

lpGBT eLink = Channel + Group*4
FELIX eLink = LINK*64 + lpGBT eLink



bin/scanConsole -c /configs/modules/20UPIM04202209_TESTONWAFER/20UPIM04202209_R0_warm_test.json -r /configs/controller/controller_itkpixv2_dev0.json -s /configs/scans/itkpixv2/std_digitalscan.json -o /data/
