import IPFS from "ipfs"
import OrbitDB from "orbit-db";

const path = "/data";
const seed = process.env.SEED_NODE;

async function createOrbitInstance() {
    const ipfs = await IPFS.create({
        silent: false,
        repo: `${path}/ipfs`,
        EXPERIMENTAL: {
            pubsub: true
        }
    });

    const orbit = await OrbitDB.createInstance(ipfs, {
        directory: `${path}/orbitdb`
    });
    console.log(orbit.id);
    return { ipfs, orbit };
}

const { ipfs, orbit } = await createOrbitInstance();

const txStoreName = "transaction";
let txStore;
if (!seed) {
    txStore = await orbit.kvstore(txStoreName, {
        accessController: {
            write: ['*']
        }
    });
    console.log("created: ", txStore.address.toString());
} else {
    const storeAddr = `/orbitdb/${seed}/${txStoreName}`;
    console.log("open: ", storeAddr);
    txStore = await orbit.open(storeAddr);
}
await txStore.load();

const eventStore = await orbit.eventlog("event");
const viewStore = await orbit.docstore("view");

export { ipfs, txStore, eventStore, viewStore };
