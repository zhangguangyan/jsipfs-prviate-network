## Setup IPFS private network using js-ipfs
ipfs, js-ipfs, libp2p, private network, local network, swarm.key

### Step 1: Create two nodes

- Clone this repository and run `npm ci`
- Create node 1: `docker run --name n1 -it -v $(pwd):/workspace -w /workspace node /bin/bash`
- Create node 2: `docker run --name n2 -it -v $(pwd):/workspace -w /workspace node /bin/bash`

### Step 2: Initialize nodes

On both nodes run:

```bash
npx jsipfs init # By default js-ipfs places config at `~/.jsipfs` not `~/.ipfs`
npx jsipfs bootstrap rm --all # remove public bootstrap nodes
```
### Step 3: Bootstrap IPFS nodes

On node 1, get its ip and PeerId by running:

```
ip a
npx jsipfs id
```

On both nodes, run following command by replacing *ip* and *PeerId* with output from above commands

```
npx jsipfs bootstrap add /ip4/<ip>/tcp/4001/ipfs/<PeerId>
```

### Step 4: Generate swarm key
```
npx ipfs-swarm-key-gen swarm.key
```
The swarm.key gets ignored at the moment, so one has to configure it manually: <https://github.com/zhangguangyan/jsipfs-pnet/blob/88f48b1ee09a3722ff28d5d1c1d7753763bb1770/libp2p-config.mjs>

### Step 5: Start the network

On node 1, run:

```
node index.mjs
```
> **_NOTE_** when run with `LIBP2P_FORCE_PNET` enabled like `LIBP2P_FORCE_PNET=1 node index.mjs`, have to hack `ipfs-core` module otherwise get `Private network is enforced, but no protector was provided` error. The command is as follows:
>```
>sed -i -r 's/options: undefined/options/g' node_modules/ipfs-core/src/components/storage.js
>```
### Step 6 test

On node 2, run (cid is output from step 5):

```
node test.mjs <cid>
```

## Reference

- <https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#private-networks>
- <https://medium.com/@s_van_laar/deploy-a-private-ipfs-network-on-ubuntu-in-5-steps-5aad95f7261b>
- <https://github.com/ipfs/js-ipfs/issues/3482>
- <https://github.com/ipfs/js-ipfs/issues/1630>

### Common jsipfs commands

```
jsipfs bootstrap list
jsipfs bootstrap rm --all
jsipfs bootstrap add /ip4/<ip>/tcp/4001/ipfs/<peerId>
jsipfs id # show peerId
```