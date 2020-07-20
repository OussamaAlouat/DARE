import test from 'tape';
import { processDataUsingLimit } from '../src/utils/process-data.util';

test('-------- Process data using limit', (assert) => {
  const data = ['Test1', 'Test2', 'Test3'];
  const limit = 1;
  const processedData = processDataUsingLimit(limit, data);
  assert.equal(1, processedData.length);
  assert.deepEqual(data[0], processedData[0]);
  assert.end();
});

test('-------- Process data using limit (limit is higger tha data length)', (assert) => {
  const data = ['Test1', 'Test2', 'Test3'];
  const limit = 10;
  const processedData = processDataUsingLimit(limit, data);
  assert.equal(data.length, processedData.length);
  assert.deepEqual(data, processedData);
  assert.end();
});
