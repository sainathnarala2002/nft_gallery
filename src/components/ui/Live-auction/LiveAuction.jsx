import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import './live-auction.css';

import NftCard from '../Nft-card/NftCard';
import { NFT__DATA } from '../../../assets/data/data.js';

const LiveAuction = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg='12' className='mb-5'>
            <div className='live__auction__top d-flex align-items-center justify-content-between'>
              <h3>Live Auction</h3>
              <span><Link to='/market'>Explore More</Link></span>
            </div>
          </Col>
          {/* Ensure key is on the Col component */}
          {NFT__DATA.slice(0, 4).map((item) => (
            <Col key={item.id} lg='3' md='4' sm='6' className='mb-4'>
              <NftCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default LiveAuction;
