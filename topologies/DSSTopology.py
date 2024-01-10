#!/usr/bin/python

from mininet.net import Mininet
from mininet.node import Controller, RemoteController, OVSController
from mininet.node import CPULimitedHost, Host, Node
from mininet.node import OVSKernelSwitch, UserSwitch
from mininet.node import IVSSwitch
from mininet.cli import CLI
from mininet.log import setLogLevel, info
from mininet.link import TCLink, Intf
from subprocess import call
import time 

def interSecureModelNetwork():

    net = Mininet( topo=None,
                   build=False,
                   ipBase='1.0.0.0/8')

    info( '\n*** ***************************************** *** \n' )
    info( '*** Starting InterSecure DSS Simulation Model *** \n' )
    info( '*** Topology: 2xDSS + Control Center \n' )
    info( '*** Version: 220630 \n' )
    info( '*** Author: filip.holik@ntnu.no  \n' )
    info( '*** ***************************************** *** \n' )
    info( '*** Adding controller\n' )
    c0=net.addController(name='c0',
                      controller=OVSController,
                      protocol='tcp',
                      port=6633)

    switchType = OVSKernelSwitch; 

    info( '*** Starting networking devices\n')
    DSS1GW = net.addSwitch('DSS1GW', cls=switchType, dpid='1',failMode='standalone')    
    DSS2GW = net.addSwitch('DSS2GW', cls=switchType, dpid='2',failMode='standalone')    
    WANR1 = net.addSwitch('WANR1', cls=switchType, dpid='3',failMode='standalone')
    WANR2 = net.addSwitch('WANR2', cls=switchType, dpid='4',failMode='standalone') 
    CONTROLSW = net.addSwitch('CONTROLSW', cls=switchType, dpid='5',failMode='standalone') 

    info( '*** Starting external connection\n')
    DSS1ASW = net.addSwitch('DSS1ASW', cls=switchType, dpid='6',failMode='standalone') 
    DSS2ASW = net.addSwitch('DSS2ASW', cls=switchType, dpid='7',failMode='standalone') 
    Intf( 'enp0s3', node=DSS1ASW )
    Intf( 'enp0s8', node=DSS2ASW )

    info( '*** Starting hosts \n')
    DSS1RTU = net.addHost('DSS1RTU', cls=Host, ip='1.1.1.1', defaultRoute='1.1.10.10',mac='00:00:00:00:00:01')
    DSS2RTU = net.addHost('DSS2RTU', cls=Host, ip='1.1.2.1', defaultRoute='1.1.10.10',mac='00:00:00:00:00:02')
    CONTROL = net.addHost('CONTROL', cls=Host, ip='1.1.10.10', defaultRoute='1.1.1.1',mac='00:00:00:00:00:03')

    info( '*** Setting link parameters\n')
    #WAN1 = {'bw':1000,'delay':'20ms','loss':1,'jitter':'10ms'} 
    #GBPS = {'delay':'18ms'} 
    MBPS = {'bw':10} 

    info( '*** Adding links\n')
    net.addLink(WANR2, CONTROLSW)
    net.addLink(WANR1, CONTROLSW)
    net.addLink(CONTROLSW, CONTROL)
    net.addLink(WANR1, DSS1GW, cls=TCLink , **MBPS)
    net.addLink(WANR2, DSS2GW, cls=TCLink , **MBPS)
    info( '\n')

    info( '*** Adding redundant links\n')
    #net.addLink(WANR2, DSS1GW, cls=TCLink , **GBPS)
    #net.addLink(WANR1, DSS2GW, cls=TCLink , **GBPS)
    #net.addLink(DSS1GW, DSS1RTU)
    #net.addLink(DSS2GW, DSS2RTU)

    info( '*** Adding links for external connections \n')
    net.addLink(DSS1RTU, DSS1ASW)
    net.addLink(DSS1ASW, DSS1GW)
    net.addLink(DSS2RTU, DSS2ASW)
    net.addLink(DSS2ASW, DSS2GW)

    info( '*** Starting network\n')
    net.build()
    info( '*** Starting controllers\n')
    for controller in net.controllers:
        controller.start()

    info( '*** Starting networking devices \n')
    net.get('DSS1GW').start([])
    net.get('DSS2GW').start([])
    net.get('WANR1').start([])
    net.get('WANR2').start([])
    net.get('CONTROLSW').start([])
    net.get('DSS1ASW').start([])
    net.get('DSS2ASW').start([])
    info( '\n')

    info( '*** Preparing custom sgsim scripts \n')
    CLI.do_sgsim_startcom_104 = sgsim_startcom_104
    CLI.do_sgsim_startperfmon = sgsim_startperfmon
    CLI.do_sgsim_attackmirror = sgsim_attackmirror
    info( '*** InterSecure Simulation Model Started *** \n' )
    CLI(net)

    net.stop()

def sgsim_startcom_104(self, line):
    "Starts the IEC104 communication (periodical and read requests) for both secondary substations." 
    net = self.mn   
    info('Starting IEC104 communication... \n')    
    info('Starting DSS1RTU communication... \n')    
    net.get('DSS1RTU').cmdPrint('xterm -geometry 90x30+10+10 -fa "Monospace" -fs 12 -T "DSS1RTU" -e "cd /home/sgsim/SmartGridSim/comlib_dss/sgdevices/RTU/;./rtu;bash"&') 
    time.sleep(0.5)
    info('Starting DSS2RTU communication... \n')    
    net.get('DSS2RTU').cmdPrint('xterm -geometry 90x30+30+30 -fa "Monospace" -fs 12 -T "DSS2RTU" -e "cd /home/sgsim/SmartGridSim/comlib_dss/sgdevices/RTU/;./rtu;bash"&') 
    time.sleep(0.5)
    info('Starting CONTROL communication with DSS1... \n')    
    net.get('CONTROL').cmdPrint('xterm -geometry 90x30+50+50 -fa "Monospace" -fs 12 -T "CONTROL - DSS1 Monitoring" -e "cd /home/sgsim/SmartGridSim/comlib_dss/sgdevices/CONTROL/;sleep 1;./control 1.1.1.1;bash"&') 
    time.sleep(0.5)
    info('Starting CONTROL communication with DSS2... \n')  
    net.get('CONTROL').cmdPrint('xterm -geometry 90x30+70+70 -fa "Monospace" -fs 12 -T "CONTROL - DSS2 Monitoring" -e "cd /home/sgsim/SmartGridSim/comlib_dss/sgdevices/CONTROL/;sleep 1;./control 1.1.2.1;bash"&')
    info('IEC104 communication started... \n(Please close all the opened windows before exiting the Mininet.)  \n')   

def sgsim_startperfmon(self, line):
    "Starts the IEC104 communication (periodical and read requests) with performance monitoring." 
    net = self.mn   
    info('Starting IEC104 communication with performance monitoring... \n')    
    info('Starting DSS1RTU communication... \n')    
    net.get('DSS1RTU').cmdPrint('xterm -geometry 90x30+10+10 -fa "Monospace" -fs 12 -T "DSS1RTU" -e "cd /home/sgsim/SmartGridSim/comlib_dss/sgdevices/PERFSEND/;./perfsend;bash"&') 
    time.sleep(0.5)
    info('Starting DSS2RTU communication... \n')    
    net.get('DSS2RTU').cmdPrint('xterm -geometry 90x30+30+30 -fa "Monospace" -fs 12 -T "DSS2RTU" -e "cd /home/sgsim/SmartGridSim/comlib_dss/sgdevices/PERFSEND/;./perfsend;bash"&') 
    time.sleep(0.5)
    info('Starting CONTROL communication with DSS1... \n')    
    net.get('CONTROL').cmdPrint('xterm -geometry 90x30+50+50 -fa "Monospace" -fs 12 -T "CONTROL - DSS1 Monitoring" -e "cd /home/sgsim/SmartGridSim/comlib_dss/sgdevices/PERFMON/;sleep 1;./perfmon 1.1.1.1;bash"&') 
    time.sleep(0.5)
    info('Starting CONTROL communication with DSS2... \n')  
    net.get('CONTROL').cmdPrint('xterm -geometry 90x30+70+70 -fa "Monospace" -fs 12 -T "CONTROL - DSS2 Monitoring" -e "cd /home/sgsim/SmartGridSim/comlib_dss/sgdevices/PERFMON/;sleep 1;./perfmon 1.1.2.1;bash"&')
    info('IEC104 communication with performance monitoring started... \n(Please close all the opened windows before exiting the Mininet.)  \n')   

def sgsim_attackmirror(self, line):
    "Makes DSS ASW devices to mirror traffic to external connections. "
    net = self.mn   
    info('Inserting rules for DSS1 switch... \n')    
    net.get('DSS1ASW').cmdPrint('ovs-ofctl add-flow DSS1ASW in_port:2,action=1,3; ovs-ofctl add-flow DSS1ASW in_port:3,action=1,2') 
    #net.get('DSS1HUB').cmdPrint('xterm -geometry 90x30+70+70 -fa "Monospace" -fs 12 -T "DSS1HUB" -e "ovs-ofctl dump-flows DSS1HUB;bash"&')
    info('Inserting rules for DSS2 switch... \n')    
    net.get('DSS2ASW').cmdPrint('ovs-ofctl add-flow DSS2ASW in_port:2,action=1,3; ovs-ofctl add-flow DSS2ASW in_port:3,action=1,2') 
    #net.get('DSS2HUB').cmdPrint('xterm -geometry 90x30+70+70 -fa "Monospace" -fs 12 -T "DSS2HUB" -e "ovs-ofctl dump-flows DSS2HUB;bash"&')

if __name__ == '__main__':
    setLogLevel( 'info' )
    interSecureModelNetwork()





