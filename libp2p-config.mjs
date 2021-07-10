import fs from "fs";
import path from "path";
import Protector from 'libp2p/src/pnet/index.js';

export function libp2pConfig() {
    const swarmKeyPath = path.join(path.resolve(), 'swarm.key');
    const swarmKey = fs.readFileSync(swarmKeyPath);

    return {
        modules: {
            connProtector: new Protector(swarmKey)
        }
    }
}
