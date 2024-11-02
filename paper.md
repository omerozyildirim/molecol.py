---
title: '﻿Collider.py: A Framework to Simulate Molecular Collisions'
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
# Collider.py: A Framework to Simulate Molecular Collisions

# Summary

Although usually ignored for a more intuitive macroscopic understanding, molecular collisions are the foundation of almost every chemical event - from chemical reactions to transport phenomena. On the molecular level, a chemical reaction is an exchange (or sometimes knocking off) of atoms between molecules as a result of energetically significant collisions. The current simulation paradigm is based on simulating bulks of molecules, requiring high computational resources. In such simulations sometimes the molecules are not allowed to react, as in the case of classical MD, or require significant computational resources and time to conclude, as in the case of ab initio MD. Without any fine-tuning to allow a more outcome-oriented approach, the results of such simulations require even more computational resources and sometimes human effort to analyze for meaningful results.

To answer these limitations, a novel methodology is developed based on a more fine-tuned approach for simulations. Its Python implementation based on current state-of-the-art libraries and supporting applications based on globally accessible web technologies is presented as a software framework. Collider.py focuses on fine-tuning the collision parameters before running the simulation. Individual linear velocities, positions, and orientations of the molecules can be defined as well as the impact points on each molecule. Our framework is based on ASE - a computational chemistry library for Python and consists of a web application to design the collisions in detail.

# References

1) Lu J, Zhang Y. Unified Deep Learning Model for Multitask Reaction Prediction with Explanation, J Chem Inf Model, 2022, 62, 1376−1387, https://doi.org/10.1021/acs.jcim.1c01467
2) Schwaller P, Vaucher AC, Laplaza R, Bunne C, Krause A, Corminboeuf C, et al. Machine intelligence for chemical reaction space, WIREs Comput Mol Sci. 2022;e1604, https://doi.org/10.1002/wcms.1604
3) Schwaller P, Vaucher C, Laino T, Reymond JL. Prediction of chemical reaction yields using deep learning, 2021 Mach. Learn.: Sci. Technol. 2021, 2, 015016, https://doi.org/10.1088/2632-2153/abc81d
4) Engkvist O, Norrby PO, Selmi N, Lam YH, Peng Z, Sherer EC, et al. Computational prediction of chemical reactions: current status and outlook, Drug Discovery Today 2018 Jun, 23(6), 1203-1219, https://doi.org/10.1016/j.drudis.2018.02.014
5) Segler HSM, Waller MP. Modelling Chemical Reasoning to Predict and Invent Reactions, Chem Eur J 2017, 23, 6118 – 6128, DOI: 10.1002/chem.201604556
6) Cramer CJ. Essentials of Computational Chemistry - Theories and Models. 2nd ed. West Sussex: John Wiley & Sons; 2004. 105 p.
7) Young DC. Computational Chemistry: A Practical Guide for Applying Techniques to Real-World Problems. New York: John Wiley & Sons; 2001. 19 p.
8) Lewars E, Computational Chemistry - Introduction to the Theory and Applications of Molecular and Quantum Mechanics. Dordrecht: Kluwer Academic Publishers; 2003. 81 p.
9) Trautz M. Das Gesetz der Reaktionsgeschwindigkeit und der Gleichgewichte in Gasen. Bestätigung der Additivität von C<sub>v</sub>-3/2R. Neue Bestimmung der Integrationskonstanten und der Moleküldurchmesser. Zeitschrift für anorganische und allgemeine Chemie, 1916 96(1), 1-28, https://doi.org/10.1002/zaac.19160960102
10) McNaught AD, Wilkinson A. Collision Theory. In: IUPAC, Compendium of Chemical Terminology, the Gold Book, 2nd ed. (1997). Online corrected version: (2006-), doi:10.1351/goldbook.C01170
11) Lewis WCMC. XLI.--Studies in catalysis. Part IX. The calculation in absolute measure of velocity constants and equilibrium constants in gaseous systems. J Chem Soc, Trans, 1918, 113, 471-492.
12) Larsen AH, Mortensen JJ, Blomqvist J, Castelli IE, Christensen R, Dulak M, et al. The atomic simulation environment—a Python library for working with atoms. J Phys Condens Matter, 2017 Jul, 29, 273002, doi: 10.1088/1361-648X/aa680e
13) Artzy R. Linear Geometry. Massachusetts: Addison-Wesley; 1965. 22 p.
14) Hirschfeld JWP. Projective Geometry over Finite Fields. Oxford: Clarendon Press; 1998. 31 p.
15) <https://github.com/omerozyildirim/collider.py>
16) Mortensen JJ, Hansen LB, Jacobsen KW. Real-space grid implementation of the projector augmented wave method, Phys Rev B 2005 Jan, 71, 035109, https://doi.org/10.1103/PhysRevB.71.035109
17) Enkovaara J, Rostgaard C, Mortensen JJ, Chen J, Dulak M, Ferrighi L, et al. Electronic structure calculations with GPAW: a real-space implementation of the projector augmented-wave method, J Phys Condens Matter 2010, 22, 253202, DOI: 10.1088/0953-8984/22/25/253202
18) <https://web.itu.edu.tr/omerozyildirim/collider.ui>
