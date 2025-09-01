# Smart Grid Simulator (SGSim) 

SGSim is a tool for simulation of communication and cyber attacks in digital primary and secondary substations.  

# Pre-requizites 

- `mininet`
- `sqlite3`

# Installation

- Extract comlib_dps.zip and comlib_dss.zip in the same folder

# Run

- Topology: ./StartSGTopology.sh
- Available commands: mininet> help (commands starting with sgsim_ were added to the Mininet, use help commnand for description)
- GUI: ./GUI/StartGUI.sh
- SCADA simulation: open webbrowser at localhost:8000

# Topology 
![SGSim topology](https://github.com/filipholik/SmartGridSim/blob/main/sgsim.png)

# SCADA Simulation 
![SCADA simulation](https://github.com/filipholik/SmartGridSim/blob/main/scada.png)

# Functionality

Functionality of SGSim was described in the article: [Emulation of Digital Substations Communication for Cyber Security Awareness](https://www.mdpi.com/2079-9292/13/12/2318)
