const Color = artifacts.require('./Color');

contract('Color', (accounts) => {
  let contract;

  before(async () => {
    contract = await Color.deployed();
  });

  it('creates a new token', async () => {
    const result = await contract.mint('#EC058E');
    const total_supply = await contract.totalSupply();
    assert.equal(total_supply, 1);
    console.log(result);
  });
});
