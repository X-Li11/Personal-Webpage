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

Problem X:
Symptom: After installing felix-drivers-5.0.1-dkms, `sudo /etc/init.d/drivers_flx start` fails with "command not found". The flx-drivers service also reported success, but /proc/flx still showed the old driver (felix-drivers-04-22-00).
Hypothesis: The install instructions are out of date. The 5.x RPM uses a systemd service instead of the old init.d script.
Actual Cause: (1) The 5.x package installs /etc/systemd/system/flx-drivers.service and /sbin/flx-drivers, not /etc/init.d/drivers_flx. (2) felix-tohost and felix-toflx were still running and holding /dev/flx*, so the old flx module stayed loaded. `modprobe` does nothing when a module is already loaded, so the new DKMS module never replaced it (loaded srcversion D9402C… vs installed 86114F…).
Potential Fix: Use `systemctl start/stop flx-drivers` in place of the init.d script. Stop all FELIX processes before reloading the drivers.
Fix: Stopped felix-tohost and felix-toflx, then ran `sudo systemctl stop flx-drivers` and `sudo systemctl start flx-drivers`. Confirmed /proc/flx now shows the 5.x driver.
