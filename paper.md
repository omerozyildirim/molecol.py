---
title: '﻿MoleCol.py: A Framework to Simulate Molecular Collisions'
tags:
- Molecular collision simulation
- Reaction prediction
- Reaction intermediate
- Python library
- Web-based user interface
authors:
- name: Ömer Özyıldırım
  orcid: 0000-0002-9965-683X
  affiliation: 1
affiliations:
- name: İstanbul Technical University - Faculty of Computer and Informatics Engineering, Türkiye
  index: 1
---
# MoleCol.py: A Framework to Simulate Molecular Collisions

# Summary

Although usually ignored for a more intuitive macroscopic understanding, molecular collisions are the foundation of almost every chemical event - from chemical reactions to transport phenomena. On the molecular level, a chemical reaction is an exchange (or sometimes knocking off) of atoms between molecules as a result of energetically significant collisions. The current simulation paradigm is based on simulating bulks of molecules, requiring high computational resources. In such simulations sometimes the molecules are not allowed to react, as in the case of classical MD, or require significant computational resources and time to conclude, as in the case of ab initio MD. Without any fine-tuning to allow a more outcome-oriented approach, the results of such simulations require even more computational resources and sometimes human effort to analyze for meaningful results.

To answer these limitations, a novel methodology is developed based on a more fine-tuned approach for simulations. Its Python implementation based on current state-of-the-art libraries and supporting applications based on globally accessible web technologies is presented as a software framework. MoleCol.py focuses on fine-tuning the collision parameters before running the simulation. Individual linear velocities, positions, and orientations of the molecules can be defined as well as the impact points on each molecule. Our framework is based on ASE - a computational chemistry library for Python. It also includes a web application serving as a UI, to design the collisions in detail.

# References
