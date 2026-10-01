---
title: "DAQ test Debug Guide"
date: 2026-10-01
tags: []
---

Problem 1: 
Symptom: can't start Felix stars using old way
Actual cause: the Felix stars are running on a different user/disk by microservices
fix: stop that Felix stars before start new ones

Problem 2:
Symptom: Optoboards not able to be configured through Microservices' GUI
Actual Cause: Unknown
Fix: flpgbt to wake the Optoboard up using the old way; then they are reachable through Microservices

Problem 3:
Symptom: Not able to run digital scan (with Aurora data frame) always show no communication. Could turn off link alignment through setting PRBS7 and configure module - (need direct proof, only did module level all turn off, can try turn off part of the chips) - in principle should confirm rx tx link settings?
Hypothesis: RX Polarity wrong - only checked by swapping polarity through Microservices UI
Actual Cause:
Potential Fix: Check RX Polarity by PRBS7 Pattern check
Fix:
