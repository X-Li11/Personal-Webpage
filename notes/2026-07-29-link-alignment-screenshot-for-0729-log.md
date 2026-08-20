---
title: "FELIX Triplet Testing Summary"
date: 2026-07-31
tags: [DAQ]
---

## Link to Progress report
https://docs.google.com/presentation/d/1fG0iR9hZy2R5pW_s3uivbrxzRLw8J_8iBMePG8ditZE/edit?usp=sharing

**Different Ports trial with Chip 1 with Digital Scan to configure the module**

| Test Case | Enabled Chip(s) | Connected DP Port | RX | TX | AuroraActiveLane | SerEnLane | Expectation | Result |
|-----------|-----------------|-----------------|----|----|------------------|-----------|-----------|--------|
| 1 | Chip 1 only | 1 | 76 | 6 | 1 | 1  |  | No data read back; have 1 link aligned at 3rd row (see screenshot in notes) |
| 2 | Chip 1 only | 1 | 72 | 6 | 1 | 2  |  | No data read back; have 1 link aligned at 3rd row (see screenshot in notes) |
| 3 | Chip 1 only | 1 | 72 | 6 | 1 | 7  |  | No data read back; have 3 links aligned at 3rd row (see screenshot in notes) |
| 4 | Chip 1 only | 3 | 132 | 0 | 1 | 7  |  | no communication; link at row 1 position 0 |
| 5 | Chip 1 only | 3 | 132 | 2 | 1 | 7 |  | no communication; link at row 0 position 20; row 1 position 0 and position 4|

Swapped row 1 and row 2 by swapping the fibers to let row2 being lpGBT3
DP Port 3:
UPLINK 4, 5, 12, 13. RX 16, 20, 128, 132.

| Test Case | Enabled Chip(s) | Connected DP Port | RX | TX | AuroraActiveLane | SerEnLane | Expectation | Result |
|-----------|-----------------|-----------------|----|----|------------------|-----------|-----------|--------|
| 6 | Chip 1 only | 3 | 132 | 2 | 1 | 1 |  | Good communication! ; link at row 2 position 4 |
| 7 | Chip 1 only | 3 | 128 | 2 | 2 | 1 |  | Good communication! ; link at row 2 position 0 |
| 8 | Chip 1 only | 3 | 20 | 2 | 4 | 1 |  | Good communication! ; link at row 0 position 20 |
| 9 | Chip 1 only | 3 | 20 | 2 | 7 | 1 |  | Good communication! ; link at all three above |

From case (6, 7, 8), we see row 2 position 0 is 128, row 2 position 4 is 132. row 0 position 20 is 20.

DP Port 4:
UPLINK 10, 11, 18, 19. RX 80, 84, 192, 196. 
DOWNLINK 2 TX=4/6? TX=4

| Test Case | Enabled Chip(s) | Connected DP Port | RX | TX | AuroraActiveLane | SerEnLane | Expectation | Result |
|-----------|-----------------|-----------------|----|----|------------------|-----------|-----------|--------|
| 10 | Chip 1 only | 4 | 196 | 4 | 1 | 1 |  | Have Communication but bad (with many errors) need to retry; see link on row 3 position 4 |
| 11 | Chip 1 only | 4 | 196 | 4 | 1 | 1 |  | Same as above |
| 12 | Chip 1 only | 4 | 196 | 6 | 1 | 1 |  | No communication at all |
| 13 | Chip 1 only | 4 | 192 | 4 | 2 | 1 |  | Good communication! ; no error; link on row 3 position 0|
| 14 | Chip 1 only | 4 | 84 | 4 | 4 | 1 |  | Good communication! ; see link on row 1 position 20 |
| 15 | Chip 1 only | 4 | 84 | 4 | 7 | 1 |  | Good communication! ; see link on all three above|

Confirmed TX has to swap within each lpGBT from the table we have
Row 3 position 4 is 196; row 3 position 0 is 192; row 1 position 20 is 84.
DP port first lane may be problematic

DP Port 1:
UPLINK 6, 7, 8, 9. RX 64, 68, 72, 76. 
DOWNLINK 6 = TX 6

| Test Case | Enabled Chip(s) | Connected DP Port | RX | TX | AuroraActiveLane | SerEnLane | Expectation | Result |
|-----------|-----------------|-----------------|----|----|------------------|-----------|-----------|--------|
| 16 | Chip 1 only | 1 | 76 | 6 | 1 | 1 |  | No communication |
| 17 | Chip 1 only | 1 | 72 | 6 | 1 | 2 |  | Good Communication; link seen on row 1 position 8 |
| 18 | Chip 1 only | 1 | 68 | 6 | 1 | 4 |  | No communication |

DP Port 1 lane 1 and 3 may be broken.
row 1 position 12 is 76 (? may be broken). row 1 position 8 is 72. row 1 position 4 is 68 (? may be broken)

DP Port 5:
UPLINK 20 21 22 23. RX 200 204 208 212. 
DOWNLINK 7 = TX 14

| Test Case | Enabled Chip(s) | Connected DP Port | RX | TX | AuroraActiveLane | SerEnLane | Expectation | Result |
|-----------|-----------------|-----------------|----|----|------------------|-----------|-----------|--------|
| 19 | Chip 1 only | 5 | 212 | 14 | 1 | 1 |  | No communication |
| 20 | Chip 1 only | 5 | 208 | 14 | 1 | 2 |  | No communication |
| 21 | Chip 1 only | 5 | 204 | 14 | 1 | 4 |  | Bad but we see communication; link on row 3 position 12 as expected |

DP Port 6:
UPLINK 14 15 16 17. RX 136 140 144 148. 
DOWNLINK 5 = TX 10

| Test Case | Enabled Chip(s) | Connected DP Port | RX | TX | AuroraActiveLane | SerEnLane | Expectation | Result |
|-----------|-----------------|-----------------|----|----|------------------|-----------|-----------|--------|
| 22 | Chip 1 only | 6 | 148 | 10 | 1 | 1 |  | Bad but have communication; link on row 2 position 0 (?? That's RX128 not 148 in principle) |
| 23 | Chip 1 only | 6 | 144 | 10 | 1 | 2 |  | Bad but have communication; link on row 2 position 16 as expected but also extra row 2 position 0 (same as above) |
| 24 | Chip 1 only | 6 | 140 | 10 | 1 | 4 |  | No communication; still see link on row 2 position 0 |

DP Port 6: nothing against the pattern we saw; just overall bad connections.

# Summary 
each lpGBT corresponds to each row in elink check (order is correct now with fiber order white/grey/brown/green). 

With a given DP connected, we define which data lane we write out with SerEnLane. The 1/2/4 represents the Lane (line) 3/2/1 in Table 1. And use Table 1, we find what UPLINK and DOWNLINK we have with the data lane. And use our own table to translate UPLINK DOWNLINK to RX TX to write to the connectivity file. For TX, note that the order in our table is swapped within each lpGBT, but that's WRONG. Don't swap. So, DOWNLINK 0/1/2/3/4/5/6/7/ = TX 0/2/4/6/8/10/12/14.

And we have many lanes having problem. As we keep using the same DP cable from the same chip 1, the problem is must be on DP-ERF8 adapter or Optoboard side (less likely). Problematic ones are DP Port 1 lane 1 and 3; DP Port 5 lane 1 and 2; DP Port 6 all three lanes have some problems 

![](images/2026-07-31-veu8t9.png)

![](images/2026-07-31-ct8jdx.png)



Now, try multiple DP cables.

| Test Case | Enabled Chip(s) | Connected DP Port | RX | TX | AuroraActiveLane | SerEnLane | Expectation | Result |
|-----------|-----------------|-----------------|----|----|------------------|-----------|-----------|--------|
| 1 | Chip 1 and Chip 2 | Port 2 / 3 | RX 12 / 132 | TX 0 / 2 | 1 | 1 / 1 | Have communication at row 0 positon 12 and row 2 position 4 | problem (not sure if related to using RX 12 which has errors) |
| 2 | Chip 1 and Chip 2 (plugged not not enabled) | Port 2 / 3 | RX 8 / 132 | TX 0 / 2 | 1 | 2 / 1 | Have communication at row 0 positon 12 and row 2 position 4 | Good as normal chip 1 only |
| 3 | Chip 1 and Chip 2 (enabled) | Port 2 / 3 | RX 8 / 132 | TX 0 / 2 | 1 | 2 / 1 | Have communication at row 0 positon 12 and row 2 position 4 | No communication |
| 4 | Chip 1 and Chip 2 (enabled) | Port 2 / 3 | RX 8 / 132 | TX 0 / 0 | 1 | 2 / 1 | Have communication at row 0 positon 12 and row 2 position 4 | No communication |
| 5 | Chip 1 and Chip 2 (enabled) | Port 4 / 3 | RX 192 / 132 | TX 4 / 2 | 1 | 2 / 1 | | Same failure as before |
| 6 | Chip 1 and Chip 2 (enabled) | Port 4 / 3 | RX 192 / 132 | TX 4 / 2 | 1 | 2 / 1 | | Same failure as before |
| 7 | Chip 1 and Chip 2 (enabled) | Port 4 / 3 | RX 192 / 128 | TX 4 / 2 | 1 | 2 / 2 | | Same failure as before |
| 8 | Chip 1 and Chip 3 (enabled) | Port 4 / 3 | RX 192 / 128 | TX 4 / 2 | 1 | 2 / 2 | | Same failure as above |

![](images/2026-07-31-oaaow0.png)


# Threshold scan parameters 
double V = (m_vcalPar[1]*vcal*Unit::Milli)/Physics::ElectronCharge;
return V*m_injCap*Unit::Femto;

Q=CV
V/Q = 1/C
0.2*vcal*10^{-3}/(1.602*10^{-19}) = unit of 1/F
m_injCap * Unit::Femto = 7.902*10^{-15} = unit of F
InjCap = 7.902
- Number of e- = vcal * 0.2/1.602*7.902*10 ~ 10*vcal

Index used by BERT scan:
FD_OL_ChipNumber_EG: 
FELIX DEVICE _ Optical link (from FELIX perspective) _ Chip number (FELIX doesn't care; so dropped when running Felix scripts) _ EGROUP (EGROUP 0-5 within each lpGBT)


# Continuation of FELIX test with Zaza Board
https://docs.google.com/spreadsheets/d/1JZ3dQQYu6x9h4FR9W1P30Yhx-7oqX5if51dmEP0GThc/edit?usp=sharing

Understand the downlink to DP cable mapping better. Uplinks look correct.

# Testing DP Line - Downlink - TX Mapping

| Test Case | Enabled Chip(s) | Connected DP Port | RX | TX | SerEnLane | Result |
|-----------|-----------------|-----------------|----|----|-----------|--------|
| 1 | Chip 1 | DP 4 | 196 (UPLINK 19)  | 4  | 1 (Line3 DP) | No communication |
| 2 | Chip 1 | DP 4 | 196 (UPLINK 19)  | 6  | 1 (Line3 DP) | No communication |
| 3 | Chip 1 | DP 4 | 192 (UPLINK 18)  | 4 | 2 (Line2 DP) | Correct communication |
| 4 | Chip 1 | DP 4 | 192 (UPLINK 18)  | 6 | 2 (Line2 DP) | No communication |
| 5 | Chip 1 | DP 4 | 196 (UPLINK 19)  | 4 | 1 (Line3 DP) | Correct but bad communication |
| 6 | Chip 1 | DP 4 | 84 (UPLINK 11)  | 4 | 4 (Line1 DP) | Correct communication |
| 7 | Chip 1 | DP 4 | 80 (UPLINK 10)  | 4 | 8 (Line0 DP) | No Communication |
| 8 | Chip 1 | DP 3 | 132 (UPLINK 13)  | 2 | 1 (Line3 DP) | Correct communication |
| 9 | Chip 1 | DP 3 | 132 (UPLINK 13)  | 0 | 1 (Line3 DP) | No communication |
| 10 | Chip 1 | DP 2 | 12 (UPLINK 3)  | 0 | 1 (Line3 DP) | Correct communication |
| 11 | Chip 1 | DP 1 | 76 (UPLINK 9)  | 6 | 1 (Line3 DP) | Correct communication |
| 12 | Chip 1 | DP 5 | 212 (UPLINK 23)  | 14 | 1 (Line3 DP) | No communication |
| 13 | Chip 1 | DP 5 | 212 (UPLINK 23)  | 12 | 1 (Line3 DP) | failed starting TX12 is not defined |
| 14 | Chip 1 | DP 5 | 212 (UPLINK 23)  | 10 | 1 (Line3 DP) | No Communication |
| 15 | Chip 1 | DP 6 | 148 (UPLINK 17)  | 8 | 1 (Line3 DP) |  failed starting TX8 is not defined |
| 15 | Chip 1 | DP 6 | 148 (UPLINK 17)  | 10 | 1 (Line3 DP) |  Correct but Bad Communication |

Confirmed Summary: 

| DP Port | TX | 
|---------|----|
| 1 | 6 |
| 2 | 0 |
| 3 | 2 |
| 4 | 4 |
| 5 | ? |
| 6 | 10 |

If we use TX 0/2/4/6/8/10/12/14 = DOWNLINK 0/1/2/3/4/5/6/7
Then we have this mapping:

| DP Port | DOWNLINK on ERF8 |  Match with "Straight Mapping" |
|---------|----|----------|
| 1 | 3 | Y |
| 2 | 0 | N |
| 3 | 1 | N |
| 4 | 2 | Y |
| 5 | ? | |
| 6 | 5 | N |

If we use TX 0/2/4/6/8/10/12/14 = DOWNLINK 1/0/3/2/5/4/7/6
Then we have this mapping:

| DP Port | DOWNLINK on ERF8 |  Match with "Straight Mapping" |
|---------|----| ----------|
| 1 | 2 | N | 
| 2 | 1 | Y |
| 3 | 0 | Y |
| 4 | 3 | N |
| 5 | ? | |
| 6 | 4 | Y |

DP 5 is TX=12?? 12 is not defined in felix_config.json

# Test Threshold scan/Analog Scan error rate dependence on threshold settings
| Test Case | Enabled Chip(s) | Connected DP Port | RX | TX | SerEnLane | Scan Type | Error Rate |
|-----------|-----------------|-----------------|----|----|-----------|--------|--------|
| 1 | Chip 1 | 2 | 12 (UPLINK 3) | 0 | 1 | Threshold scan with 300 InjV and 100 for wait time | Split events count: 42299 |
| 2 | Chip 1 | 2 | 12 (UPLINK 3) | 0 | 1 | Threshold scan with 100 InjV and 100 for wait time | Split events count: 1 |
| 3 | Chip 1 | 2 | 12 (UPLINK 3) | 0 | 1 | Threshold scan with 100 InjV and 10 for wait time | Split events count: 1 |
| 4 | Chip 1 | 2 | 12 (UPLINK 3) | 0 | 1 | Threshold scan with 200 InjV and 10 for wait time | Split events count: 14752 |


 
Swapped DP cable for Chip1 (to the short mini DP)
first confirmed digital scan is good with setup chip 1 through 

| Test Case | Enabled Chip(s) | Connected DP Port | RX | TX | SerEnLane | Result |
|-----------|-----------------|-----------------|----|----|-----------|--------|
| 1 | Chip 1 | DP 2 | 12 (UPLINK 3)  | 0 | 1 (Line3 DP) | bad but exist communication |
| 2 | Chip 1 | DP 2 | 8 (UPLINK 2)  | 0 | 2 (Line2 DP) | ok but exist communication |
| 3 | Chip 1 | DP 2 | 4 (UPLINK 1)  | 0 | 4 (Line1 DP) | ok but exist communication |

case 1 was good before with the long DP cable. 
Case 1 error counts now (case 3 is similar):
```
2:39:32:044][  info  ][Itkpixv2DataProcessor][106649]: [0x237b4] Finished raw data processor thread
[22:39:32:044][  info  ][Itkpixv2DataProcessor][106649]: [0x237b4]             Chip tag bitflips: 1
[22:39:32:044][  info  ][Itkpixv2DataProcessor][106649]: [0x237b4]        Chip unrecognized tags: 0
[22:39:32:044][  info  ][Itkpixv2DataProcessor][106649]: [0x237b4]   Unfinished streams (no EOS): 433
[22:39:32:044][  info  ][Itkpixv2DataProcessor][106649]: [0x237b4]   Unfinished streams (w/ EOS): 7
[22:39:32:044][  info  ][Itkpixv2DataProcessor][106649]: [0x237b4]               Corrupt streams: 1357
[22:39:32:044][  info  ][Itkpixv2DataProcessor][106649]: [0x237b4]            Split events count: 139
```
case 2 error counts (retry appears the same level):
```
22:43:50:848][  info  ][Itkpixv2DataProcessor][106994]: [0x237b4]             Chip tag bitflips: 0
[22:43:50:848][  info  ][Itkpixv2DataProcessor][106994]: [0x237b4]        Chip unrecognized tags: 0
[22:43:50:848][  info  ][Itkpixv2DataProcessor][106994]: [0x237b4]   Unfinished streams (no EOS): 6
[22:43:50:848][  info  ][Itkpixv2DataProcessor][106994]: [0x237b4]   Unfinished streams (w/ EOS): 0
[22:43:50:848][  info  ][Itkpixv2DataProcessor][106994]: [0x237b4]               Corrupt streams: 22
[22:43:50:848][  info  ][Itkpixv2DataProcessor][106994]: [0x237b4]            Split events count: 2
```


# Note on elink egroup numbering

- elink/RX is FELIX language we have 4 elinks per egroup (and 6 egroup per lpGBT). 
- We only use the first elink to carry data, so on lpGBT/GBCR level, elink and egroup is same thing.
- As we skip elink 1-3, we have RX 0, 4, 8, 12 etc
