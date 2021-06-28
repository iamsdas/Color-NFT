import { useEffect, useState } from 'react';
import Color from './abi/Color.json';
import Web3 from 'web3';

function App() {
  const [state, setState] = useState({
    web3: null,
    address: '',
    account: '',
    contract: null,
    colors: [],
  });

  const [newCol, setNewCol] = useState('');

  useEffect(() => {
    const initWeb3 = async () => {
      let colors = [];
      if (window.ethereum) {
        await window.ethereum.send('eth_requestAccounts');
        try {
          const web3 = new Web3(window.ethereum);
          const account = (await web3.eth.getAccounts())[0];
          const netId = await web3.eth.net.getId();
          const address = Color.networks[netId].address;
          const contract = new web3.eth.Contract(Color.abi, address);
          const supply = await contract.methods.totalSupply().call();
          for (let i = 0; i < supply; i++) {
            const col = await contract.methods.colors(i).call();
            colors.push(col);
          }
          setState({ web3, contract, account, colors });
        } catch (e) {
          alert(e);
        }
      } else {
        alert('web3 not detected');
      }
    };

    initWeb3();
  }, []);

  const addColor = async (color) => {
    state.contract.methods
      .mint(color)
      .send({ from: state.account })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => alert(e));
  };

  return (
    <div className='App'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addColor();
        }}>
        <input
          type='text'
          value={newCol}
          onChange={(e) => {
            setNewCol(e.target.value);
          }}
        />
        <button type='submit'>add</button>
      </form>
      <button onClick={() => addColor(newCol)}>add</button>
      {state.colors.map((color, index) => (
        <div
          key={index}
          style={{ backgroundColor: color, color: 'grey', padding: '30px' }}>
          {color}
        </div>
      ))}
    </div>
  );
}

export default App;
