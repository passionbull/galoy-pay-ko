import { QRCode } from "react-qrcode-logo"
import Image from "react-bootstrap/Image"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import { getOS, playStoreLink, appStoreLink, apkLink } from "../lib/download"

function DownloadApp() {

  const readNFC = async () =>{
    window.alert('read');
    const ndef = new NDEFReader();
    await ndef.scan();    
  }


  return (
    <Container>
      <br />
      <h3>Download the Bitcoin Beach Wallet</h3>
      <br />
      <Row>
        <Col>
        <Button onClick={() => {readNFC()}}> 
              볼트카드 결제하기</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default DownloadApp
