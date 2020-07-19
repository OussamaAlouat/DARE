import test from 'tape';
import { processDataUsingLimit } from '../src/utils/process-data';

test('-------- Process data using limit', (assert) => {
  const data = ['Test1', 'Test2', 'Test3'];
  const limit = 1;
  const processedData = processDataUsingLimit(limit, data);
  assert.equal(1, processedData.length);
  assert.deepEqual(data[0], processedData[0]);
  assert.end();
});
