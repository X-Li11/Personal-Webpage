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
