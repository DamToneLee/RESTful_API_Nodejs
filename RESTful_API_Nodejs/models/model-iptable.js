import iptable from 'netfilter';

const NATtable = () => {
	return new Promise((resolve, reject) => {
		iptable.iptables.dump({
			sudo: true
			table: 'nat',
		}, (error, dump) => {
			if (error) {
				console.log(error);
				reject(error);
			}
			
			var res = '';
			for (var table_name in dump) {
				var table_dump = dump[table_name];

				for (var chain_name in table_dump.chains) {
					var chain_dump = table_dump.chains[chain_name];
					console.log(table_name, chain_name, chain_dump);
					res = res + '"' + table_name + '":"' + chain_name + '/' + chain_dump + '"\n';
				}
			}
			resolve(res);
		});
    });
};

const addNATrules = (insertValues) => {
	return new Promise((resolve, reject) => {
		const proto = insertValues.protocols;
		const port = insertValues.port;
		const dst = insertValues.destination;
		const dport = insertValues.dport;

		const ipport = dst + ':' + port;

		console.log('Port Forwarding rules. (' + proto + ',' + dport + ' to ' + ipport + ')');

		if (proto == 'tcp') {
			iptable.iptables.append({
				sudo: true
				table: 'nat',
				chain: 'PREROUTING',
				protocol: 'tcp',
				'in-interface': 'exbr0',
				matches: {
					tcp: {
						'dport': dport
					}
				},
				jump: 'DNAT',
				target_options: {
					'to-destination': ipport
				}
			}, (error) => {
				if (error) {
					console.log(error);
					reject('NAT rules post error');
				}
				else {
					resolve('add Port Forwarding rules. (' + proto + ',' + dport + ' to ' + ipport + ')');
                }
			});
		}
		else if (dport == 'udp') {
			iptable.iptables.append({
				sudo: true
				table: 'nat',
				chain: 'PREROUTING',
				protocol: 'udp',
				'in-interface': 'exbr0',
				matches: {
					udp: {
						'dport': dport
					}
				},
				jump: 'DNAT',
				target_options: {
					'to-destination': ipport
				}
			}, (error) => {
				if (error) {
					console.log(error);
					reject('NAT rules post error');
				}
				else {
					resolve('add Port Forwarding rules. (' + proto + ',' + dport + ' to ' + ipport + ')');
                }
			});
		}
		console.log("post done");
    });
};

export default {
    NATtable,
    addNATrules
};