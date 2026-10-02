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

Problem X:
Symptom: After the driver update, `fflashprog` gives "command not found" even after sourcing felix-distribution/setup.sh.
Hypothesis: The local FELIX software is outdated or missing tools, so it needs updating (or use the Docker container).
Actual Cause: Wrong setup script. The top-level felix-distribution/setup.sh is the build/developer setup. It adds x86_64-el9-gcc15-opt/<pkg> directories to PATH, but those don't exist (build outputs are under _deps/*-build/). The runnable tools, including fflashprog, are in installed/bin, which only installed/setup.sh adds to PATH. Sourcing the top-level script more than once just stacked useless PATH entries. The software (felix-05-02-01) was fine and works with driver 5.0.1 (checked with read-only flx-info).
Potential Fix: Source installed/setup.sh, or call fflashprog by its full path. Avoid `bash setup.sh` (runs in a subshell) and `sudo` (resets PATH).
Fix: Opened a fresh terminal, ran `source /home/atlas/daq/felix-sw/felix-distribution/installed/setup.sh`, and `which fflashprog` then found installed/bin/fflashprog. No software update needed.
