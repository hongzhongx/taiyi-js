require('babel-polyfill');
import assert from 'assert';
import should from 'should';
import taiyi from '../src';
import api from '../src/api';

describe('taiyi.api:', function () {
  this.timeout(30 * 1000);

  describe('setOptions', () => {
    it('works', () => {
      let url = taiyi.config.get('url');
      if(! url) url = taiyi.config.get('uri');
      if(! url) url = taiyi.config.get('websocket');
      taiyi.api.setOptions({ url: url, useAppbaseApi: true });
    });
  });

  describe('streamBlockNumber', () => {
    it('streams taiyi transactions', (done) => {
      let i = 0;
      const release = taiyi.api.streamBlockNumber((err, block) => {
        should.exist(block);
        block.should.be.instanceOf(Number);
        i++;
        if (i === 2) {
          release();
          done();
        }
      });
    });
  });

  describe('streamBlock', () => {
    it('streams taiyi blocks', (done) => {
      let i = 0;
      const release = taiyi.api.streamBlock((err, block) => {
        try {
          should.exist(block);
          block.should.have.properties([
            'previous',
            'transactions',
            'timestamp',
          ]);
        } catch (err2) {
          release();
          done(err2);
          return;
        }

        i++;
        if (i === 2) {
          release();
          done();
        }
      });
    });
  });

  describe('streamTransactions', () => {
    it('streams taiyi transactions', (done) => {
      let i = 0;
      const release = taiyi.api.streamTransactions((err, transaction) => {
        try {
          should.exist(transaction);
          transaction.should.have.properties([
            'ref_block_num',
            'operations',
            'extensions',
          ]);
        } catch (err2) {
          release();
          done(err2);
          return;
        }

        i++;
        if (i === 2) {
          release();
          done();
        }
      });
    });
  });

  describe('streamOperations', () => {
    it('streams taiyi operations', (done) => {
      let i = 0;
      const release = taiyi.api.streamOperations((err, operation) => {
        try {
          should.exist(operation);
        } catch (err2) {
          release();
          done(err2);
          return;
        }

        i++;
        if (i === 2) {
          release();
          done();
        }
      });
    });
  });

  describe('with retry', () => {
    let taiyiApi;
    beforeEach(() => {
      taiyiApi = new api.Taiyi({});
    });

    it('works by default', async function() {
      let attempts = 0;
      taiyiApi.setOptions({
        url: 'http://127.0.0.1:8091',
        fetchMethod: (uri, req) => new Promise((res) => {
          const data = JSON.parse(req.body);
          res({
            ok: true,
            json: () => Promise.resolve({
              jsonrpc: '2.0',
              id: data.id,
              result: ['hongzhong'],
            }),
          });
          attempts++;
        }),
      });
      const result = await taiyiApi.getAccountsAsync(['hongzhong'])
      assert.equal(attempts, 1);
      assert.deepEqual(result, ['hongzhong']);
    });

    it('does not retry by default', async() => {
      let attempts = 0;
      taiyiApi.setOptions({
        url: 'http://127.0.0.1:8091',
        fetchMethod: (uri, req) => new Promise((res, rej) => {
          rej(new Error('Bad request'));
          attempts++;
        }),
      });

      let errored = false;
      try {
        await taiyiApi.getAccountsAsync(['hongzhong'])
      } catch (e) {
        errored = true;
      }
      assert.equal(attempts, 1);
      assert.equal(errored, true);
    });

    it('works with retry passed as a boolean', async() => {
      let attempts = 0;
      taiyiApi.setOptions({
        url: 'http://127.0.0.1:8091',
        fetchMethod: (uri, req) => new Promise((res) => {
          const data = JSON.parse(req.body);
          res({
            ok: true,
            json: () => Promise.resolve({
              jsonrpc: '2.0',
              id: data.id,
              result: ['hongzhong'],
            }),
          });
          attempts++;
        }),
      });

      const result = await taiyiApi.getAccountsAsync(['hongzhong'])
      assert.equal(attempts, 1);
      assert.deepEqual(result, ['hongzhong']);
    });

    it('retries with retry passed as a boolean', async() => {
      let attempts = 0;
      taiyiApi.setOptions({
        url: 'http://127.0.0.1:8091',
        retry: true,
        fetchMethod: (uri, req) => new Promise((res, rej) => {
          if (attempts < 1) {
            rej(new Error('Bad request'));
          } else {
            const data = JSON.parse(req.body);
            res({
              ok: true,
              json: () => Promise.resolve({
                jsonrpc: '2.0',
                id: data.id,
                result: ['hongzhong'],
              }),
            });
          }
          attempts++;
        }),
      });

      let result;
      let errored = false;
      try {
        result = await taiyiApi.getAccountsAsync(['hongzhong']);
      } catch (e) {
        errored = true;
      }
      assert.equal(attempts, 2);
      assert.equal(errored, false);
      assert.deepEqual(result, ['hongzhong']);
    });

    it('works with retry passed as an object', async() => {
      taiyiApi.setOptions({
        url: 'http://127.0.0.1:8091',
        retry: {
          retries: 3,
          minTimeout: 1, // 1ms
        },
        fetchMethod: (uri, req) => new Promise((res) => {
          const data = JSON.parse(req.body);
          res({
            ok: 'true',
            json: () => Promise.resolve({
              jsonrpc: '2.0',
              id: data.id,
              result: ['hongzhong'],
            }),
          });
        }),
      });

      const result = await taiyiApi.getAccountsAsync(['hongzhong']);
      assert.deepEqual(result, ['hongzhong']);
    });

    it('retries with retry passed as an object', async() => {
      let attempts = 0;
      taiyiApi.setOptions({
        url: 'http://127.0.0.1:8091',
        retry: {
          retries: 3,
          minTimeout: 1,
        },
        fetchMethod: (uri, req) => new Promise((res, rej) => {
          if (attempts < 1) {
            rej(new Error('Bad request'));
          } else {
            const data = JSON.parse(req.body);
            res({
              ok: true,
              json: () => Promise.resolve({
                jsonrpc: '2.0',
                id: data.id,
                result: ['hongzhong'],
              }),
            });
          }
          attempts++;
        }),
      });

      let result;
      let errored = false;
      try {
        result = await taiyiApi.getAccountsAsync(['hongzhong']);
      } catch (e) {
        errored = true;
      }
      assert.equal(attempts, 2);
      assert.equal(errored, false);
      assert.deepEqual(result, ['hongzhong']);
    });

    it('does not retry non-retriable operations');
  });

  describe('baiyujing_api', () => {
    let taiyiApi;
    beforeEach(() => {
      taiyiApi = new api.Taiyi({});
    });

    const mockRpc = (apiInstance) => {
      let callParams;
      apiInstance.setOptions({
        url: 'http://127.0.0.1:8091',
        fetchMethod: (uri, req) => {
          const data = JSON.parse(req.body);
          callParams = data;
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
              jsonrpc: '2.0',
              id: data.id,
              result: { success: true },
            }),
          });
        },
      });
      return () => callParams;
    };

    it('get_version works', async () => {
      const getParams = mockRpc(taiyiApi);
      await taiyiApi.getVersionAsync();
      const params = getParams();
      assert.equal(params.params[0], 'baiyujing_api');
      assert.equal(params.params[1], 'get_version');
    });

    it('get_state works', async () => {
        const getParams = mockRpc(taiyiApi);
        await taiyiApi.getStateAsync('/trending');
        const params = getParams();
        assert.equal(params.params[1], 'get_state');
        assert.deepEqual(params.params[2], ['/trending']);
    });

    it('find_actor works', async () => {
        const getParams = mockRpc(taiyiApi);
        await taiyiApi.findActorAsync('actor1');
        const params = getParams();
        assert.equal(params.params[1], 'find_actor');
        assert.deepEqual(params.params[2], ['actor1']);
    });

    it('find_nfa works', async () => {
        const getParams = mockRpc(taiyiApi);
        await taiyiApi.findNfaAsync(12345);
        const params = getParams();
        assert.equal(params.params[1], 'find_nfa');
        assert.deepEqual(params.params[2], [12345]);
    });

    it('eval_nfa_action works', async () => {
        const getParams = mockRpc(taiyiApi);
        await taiyiApi.evalNfaActionAsync(12345, 'use', [1, 2]);
        const params = getParams();
        assert.equal(params.params[1], 'eval_nfa_action');
        assert.deepEqual(params.params[2], [12345, 'use', [1, 2]]);
    });

    it('get_actor_needs works', async () => {
        const getParams = mockRpc(taiyiApi);
        await taiyiApi.getActorNeedsAsync('actor1');
        const params = getParams();
        assert.equal(params.params[1], 'get_actor_needs');
        assert.deepEqual(params.params[2], ['actor1']);
    });

    it('find_way_to_zone works', async () => {
        const getParams = mockRpc(taiyiApi);
        await taiyiApi.findWayToZoneAsync('zone1', 'zone2');
        const params = getParams();
        assert.equal(params.params[1], 'find_way_to_zone');
        assert.deepEqual(params.params[2], ['zone1', 'zone2']);
    });

    it('list_actor_friends works', async () => {
        const getParams = mockRpc(taiyiApi);
        await taiyiApi.listActorFriendsAsync('actor1', 50, true);
        const params = getParams();
        assert.equal(params.params[1], 'list_actor_friends');
        assert.deepEqual(params.params[2], ['actor1', 50, true]);
    });

    it('get_relation_from_to_actor works', async () => {
        const getParams = mockRpc(taiyiApi);
        await taiyiApi.getRelationFromToActorAsync('actorA', 'actorB');
        const params = getParams();
        assert.equal(params.params[1], 'get_relation_from_to_actor');
        assert.deepEqual(params.params[2], ['actorA', 'actorB']);
    });

    it('stat_people_by_zone works', async () => {
        const getParams = mockRpc(taiyiApi);
        await taiyiApi.statPeopleByZoneAsync('zone1');
        const params = getParams();
        assert.equal(params.params[1], 'stat_people_by_zone');
        assert.deepEqual(params.params[2], ['zone1']);
    });
  });
});
