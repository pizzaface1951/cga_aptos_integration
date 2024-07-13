import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Alert } from 'react-bootstrap';
import ModelViewer from './ModelViewer';
import './UserDashboard.css'; // Custom CSS for additional styling

const defaultNft = {
  tokenAddress: "default-token-address",
  tokenName: "CGA-Cybersuit",
  description: "To keep the peace and uphold the law",
  imageUrl: '/images/defaultnft.png',
  unityAsset: {
    unityAssetRef: "default"
  }
};

const UserDashboard = () => {
  const [currentModel, setCurrentModel] = useState("models/default.glb");
  const [wallets, setWallets] = useState([]);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    fetch(`http://localhost:8080/api/wallet?email=${email}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setWallets(data);
        if (data.length > 0 && data[0].nfts.length > 0) {
          setCurrentModel(`models/${data[0].nfts[0].unityAsset.unityAssetRef}.glb`);
        }
      });
  }, []);

  const handleAddWallet = () => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8080/api/wallet?walletAddress=${walletAddress}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(newWallet => {
        if (newWallet.nfts && newWallet.nfts.length > 0) {
          setWallets([...wallets, newWallet]);
        } else {
          alert('This wallet has no NFTs or no CGA-compatible NFTs.');
        }
        setWalletAddress("");
      })
      .catch(error => {
        console.error('Error adding wallet:', error);
        alert('Failed to add wallet. Please check the wallet address and try again.');
      });
  };

  const handleDeleteWallet = (address) => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8080/api/wallet?walletAddress=${address}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        setWallets(wallets.filter(wallet => wallet.address !== address));
      })
      .catch(error => {
        console.error('Error deleting wallet:', error);
        alert('Failed to delete wallet. Please try again.');
      });
  };

  const handleViewAvatar = (unityAssetRef) => {
    setCurrentModel(`models/${unityAssetRef}.glb`);
  };

  const countCgaNfts = (wallet) => {
    return wallet.nfts.filter(nft => nft.unityAsset).length;
  };

  return (
    <Container fluid className="h-100 d-flex justify-content-center align-items-center user-dashboard-container">
      <Row className="w-100 h-100 user-dashboard-row">
        <Col xs={12} md={6} className="d-flex justify-content-center align-items-center mb-3 mb-md-0 h-100">
          <Card className="w-100 h-100 user-dashboard-card">
            <Card.Body className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100%' }}>
              <div style={{ width: '100%', height: '80%' }}>
                <ModelViewer modelUrl={currentModel} />
              </div>
              {wallets.length === 0 && (
                <Alert variant="info" className="mt-3 text-center">
                  No wallets found. Click "Add Wallet" to access more avatars.
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} className="d-flex flex-column justify-content-start align-items-center h-100">
          <Card className="w-100 h-100 user-dashboard-card">
            <Card.Body className="d-flex flex-column align-items-center justify-content-start w-100">
              <Card className="mb-3 w-100">
                <Card.Body>
                  <h3>Wallets</h3>
                  {wallets.length === 0 && (
                    <Alert variant="info" className="text-center">
                      No wallets available. Add a wallet to start collecting avatars.
                    </Alert>
                  )}
                  <ul className="list-group w-100 mb-3">
                    {wallets.map(wallet => (
                      <li key={wallet.address} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          {wallet.address} <br />
                          CGA NFTs: {countCgaNfts(wallet)}
                        </div>
                        <Button variant="danger" onClick={() => handleDeleteWallet(wallet.address)}>Delete</Button>
                      </li>
                    ))}
                  </ul>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Wallet Address"
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                    />
                    <Button variant="primary" onClick={handleAddWallet}>Add Wallet</Button>
                  </div>
                </Card.Body>
              </Card>
              <Card className="w-100">
                <Card.Body>
                  <h3>NFTs</h3>
                  {wallets.length > 0 ? (
                    <>
                      <Alert variant="info" className="text-center">
                        Click "View Avatar" to see your avatar.
                      </Alert>
                      <Row className="g-4">
                        {wallets.flatMap(wallet => wallet.nfts).concat(defaultNft).map(nft => (
                          <Col key={nft.tokenAddress} xs={12} sm={6} md={4}>
                            <Card className="nft-card">
                              <Card.Img variant="top" src={nft.imageUrl || '/images/defaultnft.png'} alt={nft.tokenName} />
                              <Card.Body>
                                {nft.tokenName && <Card.Title>{nft.tokenName}</Card.Title>}
                                {nft.description && <Card.Text>{nft.description}</Card.Text>}
                                <Card.Text><small>{nft.tokenAddress}</small></Card.Text>
                                <Card.Text><small>Asset Ref: {nft.unityAsset.unityAssetRef}</small></Card.Text>
                                <Button variant="primary" onClick={() => handleViewAvatar(nft.unityAsset.unityAssetRef)}>View Avatar</Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </>
                  ) : (
                    <Alert variant="info" className="text-center">
                      No NFTs available. Add wallets to see your NFTs here.
                    </Alert>
                  )}
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
